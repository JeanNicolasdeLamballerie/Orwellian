import fs from 'fs';
import path from "path";
const p = ( require.main?.paths[ 0 ].split( 'node_modules' )[ 0 ].slice( 0, -1 ) );
const _dirPath = p ? p : null;
console.log( "marker" );
console.log( _dirPath );
console.log( require.main?.paths[ 0 ].split( 'node_modules' )[ 0 ] );
const generate = async ( path: string ) => {
    try
    {

        const isCreated = await createDirectories( path );
        if ( isCreated )
        {
            console.log( "--- Registering data to " + path + " ---" );
        }
    } catch ( e )
    {
        console.error( e );
    }
};


async function createDirectories ( pathname: string ) {
    const __dirname = path.resolve();
    return new Promise( ( resolve, reject ) => {

        pathname = pathname.replace( /^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, '' ); // Remove leading directory markers, and remove ending /file-name.extension
        fs.mkdir( path.resolve( __dirname, pathname ), { recursive: true }, e => {
            if ( e )
            {
                console.error( e );
                reject( e );

            } else
            {
                resolve( true );
            }
        } );
    } );
}

export default class Asimovian {
    relativePath: string = "logs";
    absolutePath: string = '';
    path: string = '';
    filename: string = "log.txt";
    appName: string = "default";
    version: string = "0.0.0";
    type: string = "development"; // "production";
    callBack: Function;
    logging: boolean = true;
    logLevel: logLevel = 'debug';
    deactivateFile: boolean = false;
    private idling: boolean = true;
    private queue: Array<string> = [];
    private defaultCallBack ( data: { event: any; isError: boolean; }, cb?: ( ( data: any ) => void ) | undefined ) {
        if ( data ) this._logger( typeof data.event === 'object' && !( data.event instanceof Error ) ? JSON.stringify( data ) : data, data.isError );
        else this._logger( 'No data... Callback occured at' + new Date().toUTCString(), true );
        // if the logger is setup with logging:true + a callback, the logging will happen before the callback
        if ( cb ) cb( data );
    }
    // logger : takes an error or a boolean value to signal an error
    private _logger = ( data: any, error?: boolean ) => {
        if ( this.logLevel == 'silent' ) return;

        if ( error ) console.error( data );
        if ( error && error !== true ) console.error( error );


        if ( !error && this.logLevel == 'debug' ) console.log( data );
    };

    constructor ( options?: ServerOptions ) {
        if ( !options?.absolutePath && !_dirPath )
        {
            throw new Error( 'Error setting a relative or automatic path, could not define current project position. Please provide an absolute path instead (options.absolutePath)' );
        }
        if ( options?.absolutePath ) this.absolutePath = options.absolutePath;
        if ( options?.relativePath ) this.relativePath = options.relativePath;
        const rPath = path.join( _dirPath as string, this.relativePath );
        this.path = this.absolutePath || ( rPath );
        generate( this.path );

        this.callBack = this.defaultCallBack;
        if ( options )
        {
            if ( options.filename ) this.filename = options.filename;
            if ( options.deactivateFile ) this.deactivateFile = options.deactivateFile;
            if ( options.appName ) this.appName = options.appName;
            if ( options.type ) this.type = options.type;
            if ( options.version ) this.version = options.version;

            if ( options.logging !== undefined && options.logging !== null )
            {
                this.logging = options.logging;
            }
            if ( options.callBack )
            {
                if ( this.logging ) this.callBack = ( data: any ) => this.defaultCallBack( data, options.callBack );
                else this.callBack = options.callBack;
            } else this.callBack = this.defaultCallBack;
            if ( options.logLevel )
            {
                switch ( options.logLevel )
                {
                    case 'debug':
                        this._logger( "--- Log level is debug. Information logs and errors will appear in the console. ---" );
                        this.logLevel = options.logLevel;
                        break;
                    case 'error':
                        this._logger( "--- Log level is error. Only errors will appear in the console. ---" );
                        this.logLevel = options.logLevel;
                        break;

                    case 'silent':
                        this.logLevel = options.logLevel;
                        break;
                    default:
                        this._logger( "--- Warning : the log level value is not supported. Defaulting to debug. ---", true );
                }
            }

        } else
        {
            this._logger( "--- Instance of Asimovian created with default parameters, as : " + this.type + " " + this.appName + " " + this.version + " / " + "log level : " + this.logLevel + ". Intercepted messages will be stored in " + this.path + " ---" );
        }

    }
    async append ( message: string ) {
        console.log( this.path + "/" + this.filename );
        try
        {

            await fs.promises.appendFile( this.path + "/" + this.filename, message );
        } catch ( err )
        {
            this.idling = true;
            this._logger( 'Error' );

            throw err;
        }
        this._logger( 'Saved!' );
        if ( this.queue.length )
        {
            const log: string = this.queue.reduce( ( totalData: string, data: string ) => (
                `


abc                        |-----------------------------------------------------------------------------------------------------
${ totalData } 
                        
abc                        |-----------------------------------------------------------------------------------------------------

${ data }

`
            )
            );
            console.log( "appending (queue)..." );

            this.queue = [];
            this.append( log );
        } else
        {

            this.idling = true;
        }
    }
    //todo : no queue (?) single files and aggregate ? only dev ?
    async record ( data: string | { event: any; } ) {
        let stringifiedData = data;
        let t = this;
        if ( !this.deactivateFile )
        {
            console.log( data );
            if ( typeof data !== "string" )
            {
                if ( data.event instanceof Error )
                {
                    console.log( "error detected" );
                    const holder = {
                        message: `${ data.event.message }`,
                        stack: `${ data.event.stack }`
                    };
                    data.event = holder;
                }
                stringifiedData = JSON.stringify( data );
            }


            else stringifiedData = data;
            const m =
                `
                
${ stringifiedData }
                
                        |-----------------------------------------------------------------------------------------------------
`;
            console.log( stringifiedData );
            const message: string = this.queue.length ? m + this.queue.reduce( ( totalData: string, d: string ) => (
                `
${ totalData } 
                        
                        |-----------------------------------------------------------------------------------------------------

${ d }

`
            )
            ) : m;
            this.queue = [];

            if ( this.idling )
            {
                this.idling = false;
                this.append( message );


            }
            else
            {
                this.queue.push( message );
            }


        }
        this.callBack( data );
    }

};