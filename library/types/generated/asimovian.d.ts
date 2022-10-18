export default class Asimovian {
    relativePath: string;
    absolutePath: string;
    path: string;
    filename: string;
    appName: string;
    version: string;
    type: string;
    callBack: Function;
    logging: boolean;
    logLevel: logLevel;
    deactivateFile: boolean;
    private idling;
    private queue;
    private defaultCallBack;
    private _logger;
    constructor(options?: ServerOptions);
    append(message: string): Promise<void>;
    record(data: string | {
        event: any;
    }): Promise<void>;
}
