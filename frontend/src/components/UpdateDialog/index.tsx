import React from 'react';
import useUpdater from '../../hooks/useUpdater';
import './index.css';

const UpdateDialog: React.FC = () => {
  const {
    updateStatus,
    showDialog,
    isDownloading,
    downloadProgress,
    updateError,
    isInstalling,
    checkForUpdate,
    downloadAndInstallUpdate,
    restartApp,
    closeDialog,
  } = useUpdater();

  const handleDownloadUpdate = async () => {
    if (!updateStatus) return;
    await downloadAndInstallUpdate(updateStatus.download_url);
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
          onClick={checkForUpdate}
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
              <h3>
                {updateError ? '更新错误' :
                  updateStatus?.available ? '发现新版本' : '检查更新'}
              </h3>
              {!isDownloading && !isInstalling && (
                <button className="btn-close" onClick={closeDialog}>×</button>
              )}
            </div>

            <div className="update-dialog-content">
              {/* 错误信息优先显示 */}
              {updateError && (
                <div className="error-message">
                  <div className="error-icon">❌</div>
                  <div className="error-text">
                    <p><strong>发生错误:</strong></p>
                    <p>{updateError}</p>
                  </div>
                </div>
              )}

              {/* 只有在没有错误时才显示更新内容 */}
              {!updateError && updateStatus && (
                <>
                  {updateStatus.available ? (
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
                    </>
                  ) : (
                    <div className="no-update-message">
                      <div className="success-icon">✅</div>
                      <p>当前已是最新版本！</p>
                      <p><strong>当前版本:</strong> {updateStatus.current_version}</p>
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
                      <div className="macos-permission-notice">
                        <p>💡 <strong>macOS 用户注意:</strong></p>
                        <p>安装过程中可能需要输入管理员密码以完成更新</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="update-dialog-actions">
              {updateError ? (
                // 错误状态：只显示关闭按钮
                <button
                  className="btn-primary"
                  onClick={closeDialog}
                >
                  关闭
                </button>
              ) : !updateStatus?.available ? (
                // 无更新状态：只显示关闭按钮
                <button
                  className="btn-primary"
                  onClick={closeDialog}
                >
                  关闭
                </button>
              ) : !isDownloading && !isInstalling ? (
                // 有更新且未在处理：显示稍后提醒和立即更新
                <>
                  <button
                    className="btn-secondary"
                    onClick={closeDialog}
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
              ) : isInstalling ? (
                // 安装完成：显示重启按钮
                <button
                  className="btn-primary"
                  onClick={restartApp}
                >
                  重启应用
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateDialog;