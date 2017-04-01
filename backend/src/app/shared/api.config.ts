export class ApiConfig {
    private static path: string = '//0.0.0.0:3000';
    private static fileServer: string = '//0.0.0.0:3000/media/public';
    private static defaultMediaUploadPath: string = '//0.0.0.0:3000/api/media/upload';
    private static defaultMediaUploadMaxFilesize: number = 50; //50MB
    private static version: string | number = 'api';
    private static authPrefix: string = '';
    private static debug: boolean = false;
    private static adminRoles: string[] = [
        'administrator'
    ];
    private static nodePublishedOptions: any[] = [
        {title: "Publish", status: 1},
        {title: "Unpublished", status: 0}
    ];

    public static getNodePublishedOptions(): any[] {

        return ApiConfig.nodePublishedOptions;
    }

    public static setApiVersion(version: string = 'api'): void {
        ApiConfig.version = version;
    }

    public static getApiVersion(): string | number {
        return ApiConfig.version;
    }

    public static setBaseURL(url: string = '/'): void {
        ApiConfig.path = url;
    }

    public static getPath(): string {
        return ApiConfig.path;
    }

    public static getFileServer(): string {
        return ApiConfig.fileServer;
    }

    public static setAuthPrefix(authPrefix: string = ''): void {
        ApiConfig.authPrefix = authPrefix;
    }

    public static getAuthPrefix(): string {
        return ApiConfig.authPrefix;
    }

    public static setDebugMode(isEnabled: boolean): void {
        ApiConfig.debug = isEnabled;
    }

    public static debuggable(): boolean {
        return ApiConfig.debug;
    }

    public static  getAdminRoles(): string[] {

        return ApiConfig.adminRoles;
    }

    public static getMediaUploadPath(): string {
        return ApiConfig.defaultMediaUploadPath;
    }

    public static getDefaultMediaUploadMaxFilesize(): number {

        return ApiConfig.defaultMediaUploadMaxFilesize;
    }

}