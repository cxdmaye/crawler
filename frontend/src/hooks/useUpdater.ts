import { useEffect, useState } from 'react';
import { EventsOn } from '../../wailsjs/runtime/runtime';

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

export const useUpdater = () => {
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
  }, []);

  // 检查更新的函数
  const checkForUpdate = async () => {
    try {
      setUpdateError(null);
      // 使用 window.go 来调用后端方法
      const status = await (window as any).go.main.App.CheckForUpdate();
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

  // 下载并安装更新
  const downloadAndInstallUpdate = async (downloadURL: string) => {
    try {
      setUpdateError(null);
      await (window as any).go.main.App.DownloadAndInstallUpdate(downloadURL);
    } catch (error) {
      setUpdateError(error as string);
    }
  };

  // 重启应用
  const restartApp = async () => {
    try {
      await (window as any).go.main.App.RestartApp();
    } catch (error) {
      setUpdateError(error as string);
    }
  };

  // 关闭对话框
  const closeDialog = () => {
    if (!isDownloading && !isInstalling) {
      setShowDialog(false);
      setUpdateStatus(null);
      setUpdateError(null);
    }
  };

  return {
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
  };
};

export default useUpdater;