# Makefile for Crawler App
.PHONY: help build-windows build-darwin build-all clean dev install

# 版本信息
VERSION ?= $(shell git describe --tags --abbrev=0 2>/dev/null || echo "1.0.0")
BUILD_TIME := $(shell date -u '+%Y-%m-%d %H:%M:%S UTC')
GIT_COMMIT := $(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")

# 构建标志
LDFLAGS := -ldflags "-X 'main.Version=$(VERSION)' -X 'main.BuildTime=$(BUILD_TIME)' -X 'main.GitCommit=$(GIT_COMMIT)'"

# 默认目标
help:
	@echo "可用命令:"
	@echo "  build-windows  - 构建 Windows exe 文件"
	@echo "  build-darwin   - 构建 macOS 应用"
	@echo "  build-all      - 构建所有平台"
	@echo "  clean          - 清理构建文件"
	@echo "  dev            - 启动开发模式"
	@echo "  install        - 安装依赖"
	@echo ""
	@echo "版本信息:"
	@echo "  VERSION:    $(VERSION)"
	@echo "  BUILD_TIME: $(BUILD_TIME)"
	@echo "  GIT_COMMIT: $(GIT_COMMIT)"

# 构建 Windows 版本
build-windows:
	@echo "🚀 开始构建 Windows 版本..."
	@echo "版本: $(VERSION) | 提交: $(GIT_COMMIT)"
	@wails build -platform windows/amd64 -clean -o crawler-app.exe $(LDFLAGS)
	@echo "✅ Windows 构建完成: build/bin/crawler-app.exe"

# 构建 macOS 版本
build-darwin:
	@echo "🚀 开始构建 macOS 版本..."
	@echo "版本: $(VERSION) | 提交: $(GIT_COMMIT)"
	@wails build -platform darwin/amd64 -clean $(LDFLAGS)
	@echo "✅ macOS 构建完成: build/bin/crawler-app.app"

# 构建所有平台
build-all: build-windows build-darwin

# 清理构建文件
clean:
	@echo "🧹 清理构建文件..."
	@rm -rf build/bin/
	@rm -rf frontend/dist/
	@rm -rf frontend/node_modules/.vite/
	@echo "✅ 清理完成"

# 开发模式
dev:
	@echo "🔧 启动开发模式..."
	@wails dev

# 安装依赖
install:
	@echo "📦 安装 Go 依赖..."
	@go mod tidy
	@echo "📦 安装前端依赖..."
	@cd frontend && npm install
	@echo "✅ 依赖安装完成"

# 创建发布包
package-windows: build-windows
	@echo "📦 创建 Windows 发布包..."
	@mkdir -p release
	@cp build/bin/crawler-app.exe release/
	@echo "✅ Windows 发布包创建完成: release/crawler-app.exe"

# 显示版本信息
version:
	@echo "版本信息:"
	@echo "  VERSION:    $(VERSION)"
	@echo "  BUILD_TIME: $(BUILD_TIME)"
	@echo "  GIT_COMMIT: $(GIT_COMMIT)"