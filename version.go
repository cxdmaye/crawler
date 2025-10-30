package main

import (
	"runtime"
)

var (
	// Version 应用版本号
	Version = "0.0.1"
	
	// BuildTime 构建时间
	BuildTime = "unknown"
	
	// GitCommit Git 提交哈希
	GitCommit = "unknown"
	
	// GoVersion Go 版本
	GoVersion = runtime.Version()
	
	// Platform 平台信息
	Platform = runtime.GOOS + "/" + runtime.GOARCH
)

// VersionInfo 返回版本信息
func (a *App) GetVersionInfo() map[string]string {
	return map[string]string{
		"version":   Version,
		"buildTime": BuildTime,
		"gitCommit": GitCommit,
		"goVersion": GoVersion,
		"platform":  Platform,
	}
}