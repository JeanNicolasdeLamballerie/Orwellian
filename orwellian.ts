// type Options = any;


// Set additional data in the error thrown (try/catch will get it) or in the data object to be logged/sent
export default class Orwellian {
    appName: string = "default";
    version: string = "0.0.0";
    type: string = "development"; // "production";
    callBack: Function;
    logging: boolean = true;
    logLevel: logLevel = 'debug';
    // logger : takes an error or a boolean value to signal an error
    private _logger = ( data: any, error?: any ) => {
        if ( this.logLevel == 'silent' ) return;

        if ( error ) console.error( data );
        if ( error && error !== true ) console.error( error );


        if ( !error && this.logLevel == 'debug' ) console.log( data );
    };


    private defaultCallBack ( data: { event: any; isError: boolean; }, cb?: ( ( data: any ) => void ) | undefined ) {
        if ( data ) this._logger( typeof data.event === 'object' && !( data.event instanceof Error ) ? JSON.stringify( data ) : data, data.isError );
        else this._logger( 'No data... Callback occured at' + new Date().toUTCString(), true );
        // if the logger is setup with logging:true + a callback, the logging will happen before the callback
        if ( cb ) cb( data );
    }


    constructor ( options?: Options ) {
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
            this._logger( "--- Instance created with default parameters, as : " + this.type + " " + this.appName + " " + this.version + " / " + "log level : " + this.logLevel + " ---" );
        }

    }
    // If used by end user, no control over what data is included (might want to add defaults, eg. appName (/version ?))
    report ( data: { timestamp: string; appName: string; version: string; type: string; event: any; isError: boolean; } ) {
        this.callBack( data );
    }

    listen ( event: () => void ) {
        const timestamp = new Date().toUTCString();
        if ( typeof event === 'function' )
        {

            try
            {
                event();
            }
            catch ( error )
            {
                const informations = {
                    timestamp,
                    appName: this.appName,
                    version: this.version,
                    type: this.type,
                    event: error,
                    isError: true,
                };
                this.report( informations );
            }
        }
        else
        {
            const informations = {
                timestamp,
                appName: this.appName,
                version: this.version,
                type: this.type,
                event,
                isError: false,
            };
            this.report( informations );
        }
    }


};




