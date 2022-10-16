"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generate = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isCreated = yield createDirectories(path);
        if (isCreated) {
            console.log("--- Registering data to " + path + " ---");
        }
    }
    catch (e) {
        console.error(e);
    }
});
function createDirectories(pathname) {
    return __awaiter(this, void 0, void 0, function* () {
        const __dirname = path_1.default.resolve();
        return new Promise((resolve, reject) => {
            pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
            fs_1.default.mkdir(path_1.default.resolve(__dirname, pathname), { recursive: true }, e => {
                if (e) {
                    console.error(e);
                    reject(e);
                }
                else {
                    resolve(true);
                }
            });
        });
    });
}
class Asimovian {
    constructor(options) {
        this.path = "./logs";
        this.filename = "log.txt";
        this.appName = "default";
        this.version = "0.0.0";
        this.type = "development"; // "production";
        this.logging = true;
        this.logLevel = 'debug';
        this.deactivateFile = false;
        this.idling = true;
        this.queue = [];
        // logger : takes an error or a boolean value to signal an error
        this._logger = (data, error) => {
            if (this.logLevel == 'silent')
                return;
            if (error)
                console.error(data);
            if (error && error !== true)
                console.error(error);
            if (!error && this.logLevel == 'debug')
                console.log(data);
        };
        generate((options === null || options === void 0 ? void 0 : options.path) ? options.path : this.path);
        this.callBack = this.defaultCallBack;
        if (options) {
            if (options.filename)
                this.filename = options.filename;
            if (options.path)
                this.path = options.path;
            if (options.deactivateFile)
                this.deactivateFile = options.deactivateFile;
            if (options.appName)
                this.appName = options.appName;
            if (options.type)
                this.type = options.type;
            if (options.version)
                this.version = options.version;
            if (options.logging !== undefined && options.logging !== null) {
                this.logging = options.logging;
            }
            if (options.callBack) {
                if (this.logging)
                    this.callBack = (data) => this.defaultCallBack(data, options.callBack);
                else
                    this.callBack = options.callBack;
            }
            else
                this.callBack = this.defaultCallBack;
            if (options.logLevel) {
                switch (options.logLevel) {
                    case 'debug':
                        this._logger("--- Log level is debug. Information logs and errors will appear in the console. ---");
                        this.logLevel = options.logLevel;
                        break;
                    case 'error':
                        this._logger("--- Log level is error. Only errors will appear in the console. ---");
                        this.logLevel = options.logLevel;
                        break;
                    case 'silent':
                        this.logLevel = options.logLevel;
                        break;
                    default:
                        this._logger("--- Warning : the log level value is not supported. Defaulting to debug. ---", true);
                }
            }
        }
        else {
            this._logger("--- Instance of Asimovian created with default parameters, as : " + this.type + " " + this.appName + " " + this.version + " / " + "log level : " + this.logLevel + ". Intercepted messages will be stored in " + this.path + " ---");
        }
    }
    defaultCallBack(data, cb) {
        if (data)
            this._logger(typeof data.event === 'object' && !(data.event instanceof Error) ? JSON.stringify(data) : data, data.isError);
        else
            this._logger('No data... Callback occured at' + new Date().toUTCString(), true);
        // if the logger is setup with logging:true + a callback, the logging will happen before the callback
        if (cb)
            cb(data);
    }
    append(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.path + "/" + this.filename);
            try {
                yield fs_1.default.promises.appendFile(this.path + "/" + this.filename, message);
            }
            catch (err) {
                this.idling = true;
                this._logger('Error');
                throw err;
            }
            this._logger('Saved!');
            if (this.queue.length) {
                const log = this.queue.reduce((totalData, data) => (`


abc                        |-----------------------------------------------------------------------------------------------------
${totalData} 
                        
abc                        |-----------------------------------------------------------------------------------------------------

${data}

`));
                console.log("appending (queue)...");
                this.queue = [];
                this.append(log);
            }
            else {
                this.idling = true;
            }
        });
    }
    //todo : no queue (?) single files and aggregate ? only dev ?
    record(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let stringifiedData = data;
            let t = this;
            if (!this.deactivateFile) {
                console.log(data);
                if (typeof data !== "string") {
                    if (data.event instanceof Error) {
                        console.log("error detected");
                        const holder = {
                            message: `${data.event.message}`,
                            stack: `${data.event.stack}`
                        };
                        data.event = holder;
                    }
                    stringifiedData = JSON.stringify(data);
                }
                else
                    stringifiedData = data;
                const m = `
                
${stringifiedData}
                
                        |-----------------------------------------------------------------------------------------------------
`;
                console.log(stringifiedData);
                const message = this.queue.length ? m + this.queue.reduce((totalData, d) => (`
${totalData} 
                        
                        |-----------------------------------------------------------------------------------------------------

${d}

`)) : m;
                this.queue = [];
                if (this.idling) {
                    this.idling = false;
                    this.append(message);
                }
                else {
                    this.queue.push(message);
                }
            }
            this.callBack(data);
        });
    }
}
exports.default = Asimovian;
;
