export namespace main {
	
	export class AIAnalysisResult {
	    classification: string;
	    type: string;
	    classify: string;
	    percent: string;
	    result: string;
	    suggestion: string;
	
	    static createFrom(source: any = {}) {
	        return new AIAnalysisResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.classification = source["classification"];
	        this.type = source["type"];
	        this.classify = source["classify"];
	        this.percent = source["percent"];
	        this.result = source["result"];
	        this.suggestion = source["suggestion"];
	    }
	}
	export class AIConfig {
	    api_key: string;
	    base_url: string;
	    model: string;
	
	    static createFrom(source: any = {}) {
	        return new AIConfig(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.api_key = source["api_key"];
	        this.base_url = source["base_url"];
	        this.model = source["model"];
	    }
	}
	export class UpdateConfig {
	    auto_check: boolean;
	    check_interval: number;
	    update_url: string;
	    skip_version: string;
	    last_check: number;
	    update_channel: string;
	
	    static createFrom(source: any = {}) {
	        return new UpdateConfig(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.auto_check = source["auto_check"];
	        this.check_interval = source["check_interval"];
	        this.update_url = source["update_url"];
	        this.skip_version = source["skip_version"];
	        this.last_check = source["last_check"];
	        this.update_channel = source["update_channel"];
	    }
	}
	export class UpdateStatus {
	    available: boolean;
	    current_version: string;
	    latest_version: string;
	    download_url: string;
	    changelog: string;
	    required: boolean;
	
	    static createFrom(source: any = {}) {
	        return new UpdateStatus(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.available = source["available"];
	        this.current_version = source["current_version"];
	        this.latest_version = source["latest_version"];
	        this.download_url = source["download_url"];
	        this.changelog = source["changelog"];
	        this.required = source["required"];
	    }
	}

}

