import React, { useState, useEffect } from 'react';
import './UpdateSettings.css';

interface UpdateConfig {
    auto_check: boolean;
    check_interval: number;
    update_url: string;
    skip_version: string;
    last_check: number;
    update_channel: string;
}

const UpdateSettings: React.FC = () => {
    const [config, setConfig] = useState<UpdateConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        try {
            const result = await (window as any).go.main.App.GetUpdateConfig();
            setConfig(result);
        } catch (error) {
            setMessage('加载配置失败: ' + error);
        } finally {
            setLoading(false);
        }
    };

    const saveConfig = async () => {
        if (!config) return;

        setSaving(true);
        try {
            await (window as any).go.main.App.SetUpdateConfig(config);
            setMessage('配置已保存');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('保存配置失败: ' + error);
        } finally {
            setSaving(false);
        }
    };

    const handleAutoUpdateChange = (enabled: boolean) => {
        if (config) {
            setConfig({ ...config, auto_check: enabled });
        }
    };

    const handleIntervalChange = (interval: number) => {
        if (config) {
            setConfig({ ...config, check_interval: interval });
        }
    };

    const handleChannelChange = (channel: string) => {
        if (config) {
            setConfig({ ...config, update_channel: channel });
        }
    };

    const resetSkipVersion = async () => {
        try {
            await (window as any).go.main.App.ResetSkipVersion();
            if (config) {
                setConfig({ ...config, skip_version: '' });
            }
            setMessage('已重置跳过版本设置');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('重置失败: ' + error);
        }
    };

    const formatLastCheck = (timestamp: number) => {
        if (timestamp === 0) return '从未检查';
        return new Date(timestamp * 1000).toLocaleString();
    };

    if (loading) {
        return <div className="update-settings-loading">加载中...</div>;
    }

    if (!config) {
        return <div className="update-settings-error">加载配置失败</div>;
    }

    return (
        <div className="update-settings">
            <h3>更新设置</h3>

            {message && (
                <div className={`update-settings-message ${message.includes('失败') ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}

            <div className="update-settings-section">
                <label className="update-settings-label">
                    <input
                        type="checkbox"
                        checked={config.auto_check}
                        onChange={(e) => handleAutoUpdateChange(e.target.checked)}
                    />
                    启用自动检查更新
                </label>
                <p className="update-settings-description">
                    应用会在后台自动检查是否有新版本可用
                </p>
            </div>

            {config.auto_check && (
                <div className="update-settings-section">
                    <label className="update-settings-label">
                        检查间隔
                        <select
                            value={config.check_interval}
                            onChange={(e) => handleIntervalChange(parseInt(e.target.value))}
                            className="update-settings-select"
                        >
                            <option value={1}>每小时</option>
                            <option value={6}>每6小时</option>
                            <option value={12}>每12小时</option>
                            <option value={24}>每24小时</option>
                            <option value={168}>每周</option>
                        </select>
                    </label>
                </div>
            )}

            <div className="update-settings-section">
                <label className="update-settings-label">
                    更新渠道
                    <select
                        value={config.update_channel}
                        onChange={(e) => handleChannelChange(e.target.value)}
                        className="update-settings-select"
                    >
                        <option value="stable">稳定版</option>
                        <option value="beta">测试版</option>
                        <option value="alpha">预览版</option>
                    </select>
                </label>
                <p className="update-settings-description">
                    选择接收更新的类型：稳定版推荐日常使用
                </p>
            </div>

            <div className="update-settings-section">
                <div className="update-settings-info">
                    <p><strong>上次检查:</strong> {formatLastCheck(config.last_check)}</p>
                    {config.skip_version && (
                        <p>
                            <strong>跳过版本:</strong> {config.skip_version}
                            <button
                                onClick={resetSkipVersion}
                                className="update-settings-button-link"
                            >
                                重置
                            </button>
                        </p>
                    )}
                </div>
            </div>

            <div className="update-settings-actions">
                <button
                    onClick={saveConfig}
                    disabled={saving}
                    className="update-settings-button primary"
                >
                    {saving ? '保存中...' : '保存设置'}
                </button>
            </div>
        </div>
    );
};

export default UpdateSettings;