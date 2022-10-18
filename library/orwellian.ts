// type Options = any;


// Set additional data in the error thrown (try/catch will get it) or in the data object to be logged/sent

/**
 * @options ```js
  const options = { 
    appName: string = "default",
    version: string = "0.0.0",
    type: string = "development", // "production";
    callBack: Function, // A callback to be executed on any execution of the listener.
     logging: boolean = true,
     logLevel: logLevel = 'debug', // The level of logging, e.g. "silent", "error" or "debug", respectively not logging to the console in any case, logging only errors to the console, and logging all fired events to the console.
  } 
 * ```
 * @hello 891
 * @since v1.0.0
 * @return A constructor for a new Orwellian instance. It accepts the listed `options`.
 */

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

    /**
     * @options ```js
      const options = { 
        appName: string = "default",
        version: string = "0.0.0",
        type: string = "development", // "production";
        callBack: Function, // A callback to be executed on any execution of the listener.
         logging: boolean = true,
         logLevel: logLevel = 'debug', // The level of logging, e.g. "silent", "error" or "debug", respectively not logging to the console in any case, logging only errors to the console, and logging all fired events to the console.
      } 
     * ```
     * @hello 891
     * @since v1.0.0
     * @return A constructor for a new Orwellian instance. It accepts the listed `options`.
     */
    constructor ( options?: OrwOptions ) {
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
            this._logger( "--- Instance of Orwellian created with default parameters, as : " + this.type + " " + this.appName + " " + this.version + " / " + "log level : " + this.logLevel + " ---" );
        }

    }
    // If used by end user, no control over what data is included (might want to add defaults, eg. appName (/version ?))
    report ( data: { timestamp: string; appName: string; version: string; type: string; event: any; isError: boolean; } ) {
        this.callBack( data );
    }



    /**
 * @param {Function | any} event
 * @param {boolean} [isError]  Defaults to false
 * @since v1.0.0
 * @return Returns the function if it does not throw an error. If you'd like to use an asynchronous function or callback, wrap it in a promise and have it throw an error on failure. If the event is not a function, it'll return an 
 */
    //todo Add versatility ? Use more than just string and objects ? Arrs should be ok, booleans too
    listen ( event: ( ( args?: IArguments ) => any ) | string | object, isError: boolean = false ) {
        const timestamp = new Date().toUTCString();
        if ( typeof event === 'function' )
        {

            try
            {
                return event( arguments );
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
                return informations;
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
                isError: isError,
            };
            this.report( informations );
            return informations;
        }
    }


};




