export namespace main {
	
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

