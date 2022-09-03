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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Asimovian = void 0;
// type Options = any;
var fs_1 = require("fs");
var path_1 = require("path");
function assign(options) {
    var _this = this;
    this.callBack = this.defaultCallBack;
    if (options) {
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
                this.callBack = function (data) { return _this.defaultCallBack(data, options.callBack); };
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
        this._logger("--- Instance created with default parameters, as : " + this.type + " " + this.appName + " " + this.version + " / " + "log level : " + this.logLevel + " ---");
    }
}
function createDirectories(pathname) {
    return __awaiter(this, void 0, void 0, function () {
        var __dirname;
        return __generator(this, function (_a) {
            __dirname = path_1["default"].resolve();
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
                    fs_1["default"].mkdir(path_1["default"].resolve(__dirname, pathname), { recursive: true }, function (e) {
                        if (e) {
                            console.error(e);
                            reject(e);
                        }
                        else {
                            resolve(true);
                        }
                    });
                })];
        });
    });
}
var Orwellian = /** @class */ (function () {
    function Orwellian(options) {
        var _this = this;
        this.appName = "default";
        this.version = "0.0.0";
        this.type = "development"; // "production";
        this.logging = true;
        this.logLevel = 'debug';
        // logger : takes an error or a boolean value to signal an error
        this._logger = function (data, error) {
            if (_this.logLevel == 'silent')
                return;
            if (error)
                console.error(data);
            if (error && error !== true)
                console.error(error);
            if (!error && _this.logLevel == 'debug')
                console.log(data);
        };
        this.callBack = this.defaultCallBack;
        assign.call(this, options);
        // if ( options )
        // {
        //     if ( options.appName ) this.appName = options.appName;
        //     if ( options.type ) this.type = options.type;
        //     if ( options.version ) this.version = options.version;
        //     if ( options.logging !== undefined && options.logging !== null )
        //     {
        //         this.logging = options.logging;
        //     }
        //     if ( options.callBack )
        //     {
        //         if ( this.logging ) this.callBack = ( data ) => this.defaultCallBack( data, options.callBack );
        //         else this.callBack = options.callBack;
        //     } else this.callBack = this.defaultCallBack;
        //     if ( options.logLevel )
        //     {
        //         switch ( options.logLevel )
        //         {
        //             case 'debug':
        //                 this._logger( "--- Log level is debug. Information logs and errors will appear in the console. ---" );
        //                 this.logLevel = options.logLevel;
        //                 break;
        //             case 'error':
        //                 this._logger( "--- Log level is error. Only errors will appear in the console. ---" );
        //                 this.logLevel = options.logLevel;
        //                 break;
        //             case 'silent':
        //                 this.logLevel = options.logLevel;
        //                 break;
        //             default:
        //                 this._logger( "--- Warning : the log level value is not supported. Defaulting to debug. ---", true );
        //         }
        //     }
        // } else
        // {
        //     this._logger( "--- Instance created with default parameters, as : " + this.type + " " + this.appName + " " + this.version + " / " + "log level : " + this.logLevel + " ---" );
        // }
    }
    Orwellian.prototype.defaultCallBack = function (data, cb) {
        if (data)
            this._logger(typeof data.event === 'object' && !(data.event instanceof Error) ? JSON.stringify(data) : data, data.isError);
        else
            this._logger('No data... Callback occured at' + new Date().toUTCString(), data.isError);
        // if the logger is setup with logging:true + a callback, the logging will happen before the callback
        if (cb)
            cb(data);
    };
    // If used by end user, no control over what data is included (might want to add defaults, eg. appName (/version ?))
    Orwellian.prototype.report = function (data) {
        this.callBack(data);
    };
    Orwellian.prototype.listen = function (event) {
        var timestamp = new Date().toUTCString();
        if (typeof event === 'function') {
            try {
                event();
            }
            catch (error) {
                var informations = {
                    timestamp: timestamp,
                    appName: this.appName,
                    version: this.version,
                    type: this.type,
                    event: error,
                    isError: true
                };
                this.report(informations);
            }
        }
        else {
            var informations = {
                timestamp: timestamp,
                appName: this.appName,
                version: this.version,
                type: this.type,
                event: event,
                isError: false
            };
            this.report(informations);
        }
    };
    return Orwellian;
}());
exports["default"] = Orwellian;
;
var generate = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var isCreated, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, createDirectories(path)];
            case 1:
                isCreated = _a.sent();
                if (isCreated) {
                    console.log("--- Registering data to " + path + " ---");
                }
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var Asimovian = /** @class */ (function () {
    function Asimovian(options) {
        var _this = this;
        this.path = "./logs/";
        this.appName = "default";
        this.version = "0.0.0";
        this.type = "development"; // "production";
        this.logging = true;
        this.logLevel = 'debug';
        // logger : takes an error or a boolean value to signal an error
        this._logger = function (data, error) {
            if (_this.logLevel == 'silent')
                return;
            if (error)
                console.error(data);
            if (error && error !== true)
                console.error(error);
            if (!error && _this.logLevel == 'debug')
                console.log(data);
        };
        if (options.path)
            this.path = options.path;
        generate(this.path);
    }
    Asimovian.prototype.record = function (data) {
    };
    return Asimovian;
}());
exports.Asimovian = Asimovian;
;
