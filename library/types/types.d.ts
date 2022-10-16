interface OrwOptions {
    appName?: string,
    callBack?: ( data: any ) => void;
    logging?: boolean; //(default to true)
    logLevel?: logLevel;
    type?: string;
    version?: string;
}
type logLevel = 'silent' | 'error' | 'debug';

interface ServerOptions extends OrwOptions {
    path?: string;
    deactivateFile?: boolean;
    filename?: string;
}
