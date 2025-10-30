# PowerShell 构建脚本 - Windows 版本
# Build script for Windows

param(
    [switch]$Clean = $false,
    [switch]$Debug = $false
)

Write-Host "🚀 开始构建 Crawler App Windows 版本..." -ForegroundColor Green

# 检查 Wails CLI
if (-not (Get-Command "wails" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ 错误: 未找到 wails 命令" -ForegroundColor Red
    Write-Host "请先安装 Wails CLI: go install github.com/wailsapp/wails/v2/cmd/wails@latest" -ForegroundColor Yellow
    exit 1
}

# 清理选项
if ($Clean) {
    Write-Host "🧹 清理构建目录..." -ForegroundColor Yellow
    Remove-Item -Path "build/bin" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item -Path "frontend/dist" -Recurse -Force -ErrorAction SilentlyContinue
}

# 构建命令
$buildCmd = "wails build -platform windows/amd64"
if ($Clean) {
    $buildCmd += " -clean"
}
if ($Debug) {
    $buildCmd += " -debug"
}

Write-Host "📦 执行构建命令: $buildCmd" -ForegroundColor Cyan

# 执行构建
try {
    Invoke-Expression $buildCmd
    
    if (Test-Path "build/bin/crawler-app.exe") {
        Write-Host "✅ 构建成功!" -ForegroundColor Green
        Write-Host "📁 输出文件: build/bin/crawler-app.exe" -ForegroundColor Green
        
        # 显示文件信息
        $fileInfo = Get-Item "build/bin/crawler-app.exe"
        Write-Host "📊 文件大小: $([math]::Round($fileInfo.Length / 1MB, 2)) MB" -ForegroundColor Cyan
        Write-Host "🕒 创建时间: $($fileInfo.CreationTime)" -ForegroundColor Cyan
    } else {
        Write-Host "❌ 构建失败: 未找到输出文件" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ 构建过程中发生错误: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 构建完成!" -ForegroundColor Green