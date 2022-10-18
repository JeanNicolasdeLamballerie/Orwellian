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
    relativePath?: string;
    absolutePath?: string | null;
    deactivateFile?: boolean;
    filename?: string;
}