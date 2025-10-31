package main

import (
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx           context.Context
	updateManager *UpdateManager
	aiService     *AIService
}

// NewApp creates a new App application struct
func NewApp() *App {
	app := &App{}
	app.updateManager = NewUpdateManager(app)
	app.aiService = NewAIService(app)
	return app
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	
	// 启动更新管理器
	a.updateManager.Start(ctx)
	
	// 加载AI配置
	if err := a.LoadAIConfig(); err != nil {
		fmt.Printf("加载AI配置失败: %v\n", err)
	}
}

// shutdown is called when the app is closing
func (a *App) shutdown(ctx context.Context) {
	// 停止更新管理器
	if a.updateManager != nil {
		a.updateManager.Stop()
	}
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
