package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	goruntime "runtime"
	"time"

	"github.com/Masterminds/semver/v3"
	"github.com/inconshreveable/go-update"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// UpdateInfo 更新信息结构
type UpdateInfo struct {
	Version     string `json:"version"`
	DownloadURL string `json:"download_url"`
	Changelog   string `json:"changelog"`
	Required    bool   `json:"required"`
	PublishedAt string `json:"published_at"`
}

// UpdateStatus 更新状态
type UpdateStatus struct {
	Available   bool   `json:"available"`
	CurrentVer  string `json:"current_version"`
	LatestVer   string `json:"latest_version"`
	DownloadURL string `json:"download_url"`
	Changelog   string `json:"changelog"`
	Required    bool   `json:"required"`
}

// UpdateProgress 更新进度
type UpdateProgress struct {
	Percent     int    `json:"percent"`
	Speed       string `json:"speed"`
	ETA         string `json:"eta"`
	Status      string `json:"status"`
	BytesTotal  int64  `json:"bytes_total"`
	BytesLoaded int64  `json:"bytes_loaded"`
}

// Updater 更新器结构
type Updater struct {
	app        *App
	updateURL  string
	currentVer *semver.Version
}

// NewUpdater 创建新的更新器
func NewUpdater(app *App) *Updater {
	currentVer, err := semver.NewVersion(Version)
	if err != nil {
		// 如果版本格式不正确，使用默认版本
		currentVer = semver.MustParse("0.0.1")
	}
	
	return &Updater{
		app:        app,
		updateURL:  "https://api.github.com/repos/cxdmaye/crawler/releases/latest",
		currentVer: currentVer,
	}
}

// CheckForUpdate 检查更新
func (a *App) CheckForUpdate() (*UpdateStatus, error) {
	updater := NewUpdater(a)
	
	// 获取最新版本信息
	updateInfo, err := updater.fetchLatestVersion()
	if err != nil {
		return nil, fmt.Errorf("获取版本信息失败: %v", err)
	}
	
	// 比较版本
	latestVer, err := semver.NewVersion(updateInfo.Version)
	if err != nil {
		return nil, fmt.Errorf("解析版本号失败: %v", err)
	}
	
	available := latestVer.GreaterThan(updater.currentVer)
	
	return &UpdateStatus{
		Available:   available,
		CurrentVer:  updater.currentVer.String(),
		LatestVer:   latestVer.String(),
		DownloadURL: updateInfo.DownloadURL,
		Changelog:   updateInfo.Changelog,
		Required:    updateInfo.Required,
	}, nil
}

// DownloadAndInstallUpdate 下载并安装更新
func (a *App) DownloadAndInstallUpdate(downloadURL string) error {
	// 发送开始下载事件
	runtime.EventsEmit(a.ctx, "update:download:start", map[string]interface{}{
		"status": "开始下载更新...",
	})
	
	// 下载更新文件
	resp, err := http.Get(downloadURL)
	if err != nil {
		return fmt.Errorf("下载失败: %v", err)
	}
	defer resp.Body.Close()
	
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("下载失败，状态码: %d", resp.StatusCode)
	}
	
	// 创建进度读取器
	totalBytes := resp.ContentLength
	progressReader := &ProgressReader{
		Reader:     resp.Body,
		Total:      totalBytes,
		OnProgress: func(current, total int64, percent int) {
			runtime.EventsEmit(a.ctx, "update:download:progress", UpdateProgress{
				Percent:     percent,
				Status:      "正在下载...",
				BytesTotal:  total,
				BytesLoaded: current,
			})
		},
	}
	
	// 应用更新
	err = update.Apply(progressReader, update.Options{})
	if err != nil {
		runtime.EventsEmit(a.ctx, "update:download:error", map[string]interface{}{
			"error": err.Error(),
		})
		return fmt.Errorf("应用更新失败: %v", err)
	}
	
	// 发送完成事件
	runtime.EventsEmit(a.ctx, "update:download:complete", map[string]interface{}{
		"status": "更新下载完成，请重启应用",
	})
	
	return nil
}

// AutoCheckUpdate 自动检查更新
func (a *App) AutoCheckUpdate() {
	go func() {
		// 延迟5秒后开始检查，避免影响应用启动
		time.Sleep(5 * time.Second)
		
		updateStatus, err := a.CheckForUpdate()
		if err != nil {
			runtime.EventsEmit(a.ctx, "update:check:error", map[string]interface{}{
				"error": err.Error(),
			})
			return
		}
		
		if updateStatus.Available {
			runtime.EventsEmit(a.ctx, "update:available", updateStatus)
		} else {
			runtime.EventsEmit(a.ctx, "update:no-update", updateStatus)
		}
	}()
}

// RestartApp 重启应用
func (a *App) RestartApp() error {
	// 获取当前执行文件路径
	executable, err := os.Executable()
	if err != nil {
		return fmt.Errorf("获取执行文件路径失败: %v", err)
	}
	
	// 启动新进程
	_, err = os.StartProcess(executable, os.Args, &os.ProcAttr{
		Files: []*os.File{os.Stdin, os.Stdout, os.Stderr},
	})
	if err != nil {
		return fmt.Errorf("重启应用失败: %v", err)
	}
	
	// 退出当前进程
	runtime.Quit(a.ctx)
	return nil
}

// fetchLatestVersion 获取最新版本信息
func (u *Updater) fetchLatestVersion() (*UpdateInfo, error) {
	client := &http.Client{
		Timeout: 30 * time.Second,
	}
	
	resp, err := client.Get(u.updateURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API请求失败，状态码: %d", resp.StatusCode)
	}
	
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	
	// 解析GitHub API响应
	var release struct {
		TagName     string `json:"tag_name"`
		Body        string `json:"body"`
		Assets      []struct {
			Name               string `json:"name"`
			BrowserDownloadURL string `json:"browser_download_url"`
		} `json:"assets"`
		PublishedAt string `json:"published_at"`
		Prerelease  bool   `json:"prerelease"`
	}
	
	err = json.Unmarshal(body, &release)
	if err != nil {
		return nil, err
	}
	
	// 查找对应平台的下载链接
	var downloadURL string
	platform := goruntime.GOOS
	
	for _, asset := range release.Assets {
		if platform == "windows" && (asset.Name == "crawler-app.exe" || 
			fmt.Sprintf("crawler-app-%s.exe", platform) == asset.Name) {
			downloadURL = asset.BrowserDownloadURL
			break
		} else if platform == "darwin" && (asset.Name == "crawler-app.app" ||
			fmt.Sprintf("crawler-app-%s.app", platform) == asset.Name) {
			downloadURL = asset.BrowserDownloadURL
			break
		} else if platform == "linux" && (asset.Name == "crawler-app" ||
			fmt.Sprintf("crawler-app-%s", platform) == asset.Name) {
			downloadURL = asset.BrowserDownloadURL
			break
		}
	}
	
	if downloadURL == "" {
		return nil, fmt.Errorf("未找到适用于 %s 平台的更新文件", platform)
	}
	
	// 移除版本号前的 'v' 前缀（如果存在）
	version := release.TagName
	if len(version) > 0 && version[0] == 'v' {
		version = version[1:]
	}
	
	return &UpdateInfo{
		Version:     version,
		DownloadURL: downloadURL,
		Changelog:   release.Body,
		Required:    false, // 可以根据需要设置为强制更新
		PublishedAt: release.PublishedAt,
	}, nil
}

// ProgressReader 进度读取器
type ProgressReader struct {
	io.Reader
	Total      int64
	Current    int64
	OnProgress func(current, total int64, percent int)
}

func (pr *ProgressReader) Read(p []byte) (n int, err error) {
	n, err = pr.Reader.Read(p)
	pr.Current += int64(n)
	
	if pr.OnProgress != nil && pr.Total > 0 {
		percent := int((pr.Current * 100) / pr.Total)
		if percent > 100 {
			percent = 100
		}
		pr.OnProgress(pr.Current, pr.Total, percent)
	}
	
	return
}