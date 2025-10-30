package main

import (
	"context"
	"log"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// UpdateManager 更新管理器
type UpdateManager struct {
	app    *App
	config *UpdateConfig
	ticker *time.Ticker
	ctx    context.Context
	cancel context.CancelFunc
}

// NewUpdateManager 创建更新管理器
func NewUpdateManager(app *App) *UpdateManager {
	config, err := LoadUpdateConfig()
	if err != nil {
		config = GetDefaultUpdateConfig()
		log.Printf("加载更新配置失败，使用默认配置: %v", err)
	}

	return &UpdateManager{
		app:    app,
		config: config,
	}
}

// Start 启动更新管理器
func (um *UpdateManager) Start(ctx context.Context) {
	um.ctx, um.cancel = context.WithCancel(ctx)
	
	// 立即检查是否需要更新
	go um.initialCheck()
	
	// 启动定时检查
	if um.config.AutoCheck {
		um.startPeriodicCheck()
	}
}

// Stop 停止更新管理器
func (um *UpdateManager) Stop() {
	if um.cancel != nil {
		um.cancel()
	}
	if um.ticker != nil {
		um.ticker.Stop()
	}
}

// initialCheck 初始检查
func (um *UpdateManager) initialCheck() {
	// 延迟检查，避免影响应用启动
	time.Sleep(5 * time.Second)
	
	if ShouldCheckUpdate(um.config) {
		um.performCheck()
	}
}

// startPeriodicCheck 启动定期检查
func (um *UpdateManager) startPeriodicCheck() {
	interval := time.Duration(um.config.CheckInterval) * time.Hour
	um.ticker = time.NewTicker(interval)
	
	go func() {
		for {
			select {
			case <-um.ctx.Done():
				return
			case <-um.ticker.C:
				if ShouldCheckUpdate(um.config) {
					um.performCheck()
				}
			}
		}
	}()
}

// performCheck 执行检查
func (um *UpdateManager) performCheck() {
	updateStatus, err := um.app.CheckForUpdate()
	if err != nil {
		log.Printf("检查更新失败: %v", err)
		runtime.EventsEmit(um.app.ctx, "update:check:error", map[string]interface{}{
			"error": err.Error(),
		})
		return
	}
	
	// 更新最后检查时间
	if err := UpdateLastCheckTime(um.config); err != nil {
		log.Printf("更新检查时间失败: %v", err)
	}
	
	// 如果有可用更新
	if updateStatus.Available {
		// 检查是否跳过此版本
		if um.config.SkipVersion != updateStatus.LatestVer {
			runtime.EventsEmit(um.app.ctx, "update:available", updateStatus)
		}
	} else {
		runtime.EventsEmit(um.app.ctx, "update:no-update", updateStatus)
	}
}

// SkipVersion 跳过当前版本
func (a *App) SkipVersion(version string) error {
	config, err := LoadUpdateConfig()
	if err != nil {
		return err
	}
	
	config.SkipVersion = version
	return SaveUpdateConfig(config)
}

// ResetSkipVersion 重置跳过版本
func (a *App) ResetSkipVersion() error {
	config, err := LoadUpdateConfig()
	if err != nil {
		return err
	}
	
	config.SkipVersion = ""
	return SaveUpdateConfig(config)
}

// SetAutoUpdate 设置自动更新
func (a *App) SetAutoUpdate(enabled bool) error {
	config, err := LoadUpdateConfig()
	if err != nil {
		return err
	}
	
	config.AutoCheck = enabled
	return SaveUpdateConfig(config)
}

// GetAutoUpdateEnabled 获取自动更新状态
func (a *App) GetAutoUpdateEnabled() (bool, error) {
	config, err := LoadUpdateConfig()
	if err != nil {
		return false, err
	}
	
	return config.AutoCheck, nil
}