import React, { useState, useEffect } from 'react';
import { EventsOn } from '../../wailsjs/runtime/runtime';
import { CheckForUpdate, DownloadAndInstallUpdate, RestartApp } from '../../wailsjs/go/main/App';
import './UpdateDialog.css';

interface UpdateStatus {
    available: boolean;
    current_version: string;
    latest_version: string;
    download_url: string;
    changelog: string;
    required: boolean;
}

interface UpdateProgress {
    percent: number;
    speed: string;
    eta: string;
    status: string;
    bytes_total: number;
    bytes_loaded: number;
}

const UpdateDialog: React.FC = () => {
    const [updateStatus, setUpdateStatus] = useState<UpdateStatus | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState<UpdateProgress | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [isInstalling, setIsInstalling] = useState(false);

    useEffect(() => {
        // 监听更新事件
        EventsOn('update:available', (data: UpdateStatus) => {
            setUpdateStatus(data);
            setShowDialog(true);
        });

        EventsOn('update:no-update', (data: UpdateStatus) => {
            console.log('应用已是最新版本:', data.current_version);
        });

        EventsOn('update:check:error', (data: { error: string }) => {
            console.error('检查更新失败:', data.error);
            setUpdateError(data.error);
        });

        EventsOn('update:download:start', (data: { status: string }) => {
            setIsDownloading(true);
            setDownloadProgress(null);
        });

        EventsOn('update:download:progress', (progress: UpdateProgress) => {
            setDownloadProgress(progress);
        });

        EventsOn('update:download:complete', (data: { status: string }) => {
            setIsDownloading(false);
            setIsInstalling(true);
            setDownloadProgress(null);
        });

        EventsOn('update:download:error', (data: { error: string }) => {
            setIsDownloading(false);
            setUpdateError(data.error);
        });

        return () => {
            // 清理事件监听器
            // EventsOff 在当前版本可能不可用，这里只是示例
        };
    }, []);

    const handleCheckUpdate = async () => {
        try {
            setUpdateError(null);
            const status = await CheckForUpdate();
            if (status.available) {
                setUpdateStatus(status);
                setShowDialog(true);
            } else {
                alert('当前已是最新版本！');
            }
        } catch (error) {
            setUpdateError(error as string);
        }
    };

    const handleDownloadUpdate = async () => {
        if (!updateStatus) return;

        try {
            setUpdateError(null);
            await DownloadAndInstallUpdate(updateStatus.download_url);
        } catch (error) {
            setUpdateError(error as string);
        }
    };

    const handleRestartApp = async () => {
        try {
            await RestartApp();
        } catch (error) {
            setUpdateError(error as string);
        }
    };

    const handleCloseDialog = () => {
        if (!isDownloading && !isInstalling) {
            setShowDialog(false);
            setUpdateStatus(null);
            setUpdateError(null);
        }
    };

    const formatBytes = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <>
            {/* 检查更新按钮 */}
            <div className="update-check-container">
                <button
                    className="btn-check-update"
                    onClick={handleCheckUpdate}
                    disabled={isDownloading || isInstalling}
                >
                    检查更新
                </button>
            </div>

            {/* 更新对话框 */}
            {showDialog && (
                <div className="update-dialog-overlay">
                    <div className="update-dialog">
                        <div className="update-dialog-header">
                            <h3>发现新版本</h3>
                            {!isDownloading && !isInstalling && (
                                <button className="btn-close" onClick={handleCloseDialog}>×</button>
                            )}
                        </div>

                        <div className="update-dialog-content">
                            {updateStatus && (
                                <>
                                    <div className="version-info">
                                        <p><strong>当前版本:</strong> {updateStatus.current_version}</p>
                                        <p><strong>最新版本:</strong> {updateStatus.latest_version}</p>
                                        {updateStatus.required && (
                                            <p className="required-update">⚠️ 这是一个必需的更新</p>
                                        )}
                                    </div>

                                    {updateStatus.changelog && (
                                        <div className="changelog">
                                            <h4>更新内容:</h4>
                                            <div className="changelog-content">
                                                {updateStatus.changelog.split('\n').map((line, index) => (
                                                    <p key={index}>{line}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {updateError && (
                                        <div className="error-message">
                                            <p>❌ 错误: {updateError}</p>
                                        </div>
                                    )}

                                    {isDownloading && downloadProgress && (
                                        <div className="download-progress">
                                            <p>正在下载更新...</p>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${downloadProgress.percent}%` }}
                                                ></div>
                                            </div>
                                            <div className="progress-info">
                                                <span>{downloadProgress.percent}%</span>
                                                <span>
                                                    {formatBytes(downloadProgress.bytes_loaded)} / {formatBytes(downloadProgress.bytes_total)}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {isInstalling && (
                                        <div className="installing-message">
                                            <p>🔄 正在安装更新，请稍候...</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="update-dialog-actions">
                            {!isDownloading && !isInstalling && (
                                <>
                                    <button
                                        className="btn-secondary"
                                        onClick={handleCloseDialog}
                                        disabled={updateStatus?.required}
                                    >
                                        稍后提醒
                                    </button>
                                    <button
                                        className="btn-primary"
                                        onClick={handleDownloadUpdate}
                                    >
                                        立即更新
                                    </button>
                                </>
                            )}

                            {isInstalling && (
                                <button
                                    className="btn-primary"
                                    onClick={handleRestartApp}
                                >
                                    重启应用
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateDialog;