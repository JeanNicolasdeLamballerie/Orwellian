import fs from 'fs';
import path from "path";

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
    path: string = "./logs/";
    appName: string = "default";
    version: string = "0.0.0";
    type: string = "development"; // "production";
    callBack: Function;
    logging: boolean = true;
    logLevel: logLevel = 'debug';
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

    constructor ( options: ServerOptions ) {
        if ( options.path ) this.path = options.path;

        generate( this.path );
        this.callBack = this.defaultCallBack;
        if ( options )
        {
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
            this._logger( "--- Instance created with default parameters, as : " + this.type + " " + this.appName + " " + this.version + " / " + "log level : " + this.logLevel + ". Intercepted messages will be stored in " + this.path + " ---" );
        }

    }

    private record ( data: any ) {
        if ( typeof data !== "string" )
        {
            data = JSON.stringify( data );
        }
    }

};