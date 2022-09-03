"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var orwell = new index_1["default"]();
var custOrmwell = new index_1["default"]({
    appName: "Orwell",
    logLevel: "debug",
    version: "0.0.1",
    logging: true,
    callBack: function (data) {
        console.log("SENDING TO SERVER");
        console.log("test data : ", data);
        console.log("SERVER RECEIVED !");
    }
});
// custOrmwell.listen( () => {
//     console.log( "Minding my own business..." );
//     console.log( "BAM ! Crash !" );
//     throw new Error( "HOW COULD THIS HAPPEN TO ME" );
// } );
