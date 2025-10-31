package main

import (
	"encoding/json"
	"fmt"
	"os"
)

const defaultPrompt = `# 角色
你是一个专业的搜索助手，能够根据用户的输入内容来猜测该内容可能是什么样格式内容，并提供精准的判断和建议方向。

## 技能：判断内容可能的格式
用户输入的内容可能来自于其他地方的粘贴，在粘贴之前可能不知道这段内容代表什么，以下是可能的一些类型：
1. 网络资源类
	- 网址
	- 图片、视频、音频等
	- PDF、EXCEL、CSV 等文档
2. 纯文本
	- 颜色值，rgb,rgba,hsl等
	- 数学公式，Latex公式等
	- 外语单词/句子等
	- 文言文 出处查询
	- 诗词 查询上下文
	- 普通文本 如表情，人名，地名等
	- 时间戳
	- 除 10 进制以外的进制数  转换为 10进制
3. 可执行文本
	- 网络资源请求
	- bash 命令
	- ws 等连接
	- curl 请求
4. 代码
	- 脚本语言
	- 样式/标记语言 HTML/CSS
	- SQL 语言
	- XML、YAML 等
	- 配置脚本 如 dockerFile/package.json等
    - JSON 代码
5. 加密文本
	- MD5
	- base64
	- 虚拟币地址
  用户的输入包括但不限于以上的各种类型，你可以通过分析来判断用户的输入可能的类型，并提供每一种类型的可能概率

## 输出格式
` + "```json" + `
[{
    "classification":"plaintext",
    "type":"color",
    "classify":"颜色值",
    "percent":"10%",
    "result":"可能的结果",
    "suggestion":"针对该类型的建议"
}]
` + "```" + `

## 限制:
- 输出内容尽可能简洁，最好是 JSON 格式。输出的 type 按照一定的格式进行英文转换，result使用中文，展示这种猜测可能的结果`

// AIConfig AI配置结构
type AIConfig struct {
	APIKey  string `json:"api_key"`
	BaseURL string `json:"base_url"`
	Model   string `json:"model"`
}

// AIAnalysisResult AI分析结果
type AIAnalysisResult struct {
	Classification string `json:"classification"`
	Type           string `json:"type"`
	Classify       string `json:"classify"`
	Percent        string `json:"percent"`
	Result         string `json:"result"`
	Suggestion     string `json:"suggestion"`
}

// AIService AI服务
type AIService struct {
	app    *App
	config *AIConfig
}

// NewAIService 创建AI服务
func NewAIService(app *App) *AIService {
	return &AIService{
		app: app,
		config: &AIConfig{
			BaseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1/",
			Model:   "qwen-plus",
		},
	}
}

// GetAIConfig 获取AI配置
func (a *App) GetAIConfig() (*AIConfig, error) {
	return a.aiService.config, nil
}

// SaveAIConfig 保存AI配置
func (a *App) SaveAIConfig(config AIConfig) error {
	a.aiService.config = &config
	
	// 保存到本地配置文件
	configData, err := json.Marshal(config)
	if err != nil {
		return fmt.Errorf("序列化配置失败: %v", err)
	}
	
	// 直接保存到文件
	return a.saveConfigToFile("ai_config.json", configData)
}

// LoadAIConfig 加载AI配置
func (a *App) LoadAIConfig() error {
	// 直接从文件加载
	return a.loadConfigFromFile("ai_config.json")
}

// AnalyzeContent 分析内容 - 目前返回模拟数据
func (a *App) AnalyzeContent(content string) ([]AIAnalysisResult, error) {
	if a.aiService.config.APIKey == "" {
		return nil, fmt.Errorf("请先配置 API Key")
	}
	
	// TODO: 实现真实的 AI 调用
	// 目前返回模拟分析结果
	results := []AIAnalysisResult{
		{
			Classification: "plaintext",
			Type:           "sample",
			Classify:       "示例分析",
			Percent:        "80%",
			Result:         fmt.Sprintf("分析内容: %s", content[:min(len(content), 50)]),
			Suggestion:     "这是一个示例分析结果，实际 AI 功能正在开发中",
		},
	}
	
	return results, nil
}

// 辅助函数
func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// 辅助方法：保存配置到文件
func (a *App) saveConfigToFile(filename string, data []byte) error {
	configDir := ".crawler"
	if err := os.MkdirAll(configDir, 0755); err != nil {
		return err
	}
	
	filepath := fmt.Sprintf("%s/%s", configDir, filename)
	return os.WriteFile(filepath, data, 0644)
}

// 辅助方法：从文件加载配置
func (a *App) loadConfigFromFile(filename string) error {
	filepath := fmt.Sprintf(".crawler/%s", filename)
	data, err := os.ReadFile(filepath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil // 文件不存在，使用默认配置
		}
		return err
	}
	
	var config AIConfig
	err = json.Unmarshal(data, &config)
	if err != nil {
		return fmt.Errorf("解析配置文件失败: %v", err)
	}
	
	a.aiService.config = &config
	return nil
}