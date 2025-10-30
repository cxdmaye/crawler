# Crawler App

一个基于 Wails 框架的现代化网络爬虫应用程序。

## 关于项目

这是一个使用 Wails v2 + React + TypeScript 构建的桌面应用程序，提供强大的网络爬虫功能。

项目配置可以通过编辑 `wails.json` 文件进行调整。更多项目设置信息请参考：https://wails.io/docs/reference/project-config

## 开发模式

要在实时开发模式下运行，请在项目目录中运行 `wails dev`。这将启动一个 Vite 开发服务器，提供前端代码的快速热重载。

如果你想在浏览器中开发并访问 Go 方法，还有一个运行在 http://localhost:34115 的开发服务器。在浏览器中连接到此地址，你可以从开发工具调用 Go 代码。

## 构建

### 快速构建

使用 Makefile 命令（推荐）：

```bash
# 构建 Windows exe 文件
make build-windows

# 构建 macOS 应用
make build-darwin

# 构建所有平台
make build-all

# 清理构建文件
make clean

# 启动开发模式
make dev
```

### 手动构建

#### Windows 版本

**在 macOS/Linux 上交叉编译：**

```bash
# 使用构建脚本
./build-windows.sh

# 或者直接使用 wails 命令
wails build -platform windows/amd64 -clean -o crawler-app.exe
```

**在 Windows 上构建：**

```powershell
# 使用 PowerShell 脚本
.\build-windows.ps1

# 或者使用参数
.\build-windows.ps1 -Clean -Debug

# 或者直接使用 wails 命令
wails build -platform windows/amd64 -clean
```

#### macOS 版本

```bash
wails build -platform darwin/amd64 -clean
```

#### Linux 版本

```bash
wails build -platform linux/amd64 -clean
```

## 输出文件

- **Windows**: `build/bin/crawler-app.exe`
- **macOS**: `build/bin/crawler-app.app`
- **Linux**: `build/bin/crawler-app`

## 依赖安装

```bash
# 安装所有依赖
make install

# 或者手动安装
go mod tidy
cd frontend && npm install
```

## 系统要求

- Go 1.23+
- Node.js 16+
- Wails CLI v2.x

## 安装 Wails CLI

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

## 特性

- 🚀 现代化的 React + TypeScript 前端
- ⚡ 高性能的 Go 后端
- 🎨 原生桌面应用体验
- 📦 一键打包多平台应用
- 🔧 热重载开发模式
