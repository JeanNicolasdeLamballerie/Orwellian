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
    appName: string;
    version: string;
    type: string;
    callBack: Function;
    logging: boolean;
    logLevel: logLevel;
    private _logger;
    private defaultCallBack;
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
    constructor(options?: OrwOptions);
    report(data: {
        timestamp: string;
        appName: string;
        version: string;
        type: string;
        event: any;
        isError: boolean;
    }): void;
    /**
 * @param {Function | any} event
 * @param {boolean} [isError]  Defaults to false
 * @since v1.0.0
 * @return Returns the function if it does not throw an error. If you'd like to use an asynchronous function or callback, wrap it in a promise and have it throw an error on failure. If the event is not a function, it'll return an
 */
    listen(event: ((args?: IArguments) => any) | string | object, isError?: boolean): any;
}
