import React, { useState, useEffect } from 'react'
import { GetAIConfig, SaveAIConfig } from '../../../wailsjs/go/main/App'
import { main } from '../../../wailsjs/go/models'
import './SettingsPage.css'
import UpdateDialog from '@/components/UpdateDialog';

const SettingsPage: React.FC = () => {
    const [config, setConfig] = useState<main.AIConfig>(new main.AIConfig())
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

    useEffect(() => {
        loadConfig()
    }, [])

    const loadConfig = async () => {
        try {
            const savedConfig = await GetAIConfig()
            setConfig(savedConfig)
        } catch (err) {
            showMessage(`加载配置失败: ${err}`, 'error')
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await SaveAIConfig(config)
            showMessage('配置保存成功', 'success')
        } catch (err) {
            showMessage(`保存失败: ${err}`, 'error')
        } finally {
            setIsSaving(false)
        }
    }

    const showMessage = (msg: string, type: 'success' | 'error') => {
        setMessage(msg)
        setMessageType(type)
        setTimeout(() => {
            setMessage('')
            setMessageType('')
        }, 3000)
    }

    const handleInputChange = (field: keyof main.AIConfig, value: string) => {
        setConfig(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <div className="settings-page">
            <div>
                <UpdateDialog />

            </div>
            <div className="page-header">
                <h1>AI 配置</h1>
                <p>配置 AI 服务的相关参数</p>
            </div>

            <div className="settings-form">
                <div className="form-group">
                    <label htmlFor="api-key">API Key *</label>
                    <input
                        id="api-key"
                        type="password"
                        value={config.api_key}
                        onChange={(e) => handleInputChange('api_key', e.target.value)}
                        placeholder="请输入 OpenAI API Key"
                        disabled={isSaving}
                    />
                    <small>用于访问 AI 服务的 API 密钥</small>
                </div>

                <div className="form-group">
                    <label htmlFor="base-url">Base URL</label>
                    <input
                        id="base-url"
                        type="url"
                        value={config.base_url}
                        onChange={(e) => handleInputChange('base_url', e.target.value)}
                        placeholder="https://api.openai.com/v1"
                        disabled={isSaving}
                    />
                    <small>API 服务的基础 URL，留空使用默认值</small>
                </div>

                <div className="form-group">
                    <label htmlFor="model">模型</label>
                    <input
                        id="base-url"
                        type="url"
                        value={config.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                        placeholder="qwen3-max"
                        disabled={isSaving}
                    />
                    <small>选择要使用的 AI 模型</small>
                </div>

                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}

                <div className="form-actions">
                    <button
                        onClick={handleSave}
                        disabled={isSaving || !config.api_key}
                        className="save-button"
                    >
                        {isSaving ? '保存中...' : '保存配置'}
                    </button>
                </div>
            </div>

            <div className="settings-info">
                <h3>配置说明</h3>
                <ul>
                    <li><strong>API Key：</strong>必填项，用于验证和访问 AI 服务</li>
                    <li><strong>Base URL：</strong>可选项，如果使用第三方代理或自建服务可以修改</li>
                    <li><strong>模型：</strong>选择适合的 AI 模型，不同模型性能和成本不同</li>
                </ul>
                <p className="privacy-notice">
                    <strong>隐私说明：</strong>配置信息仅保存在本地，不会上传到任何服务器。
                </p>
            </div>
        </div>
    )
}

export default SettingsPage