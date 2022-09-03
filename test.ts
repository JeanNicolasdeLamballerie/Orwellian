import Orwellian from "./index";

const orwell = new Orwellian();

const custOrmwell = new Orwellian( {
    appName: "Orwell",
    logLevel: "debug",
    version: "0.0.1",
    logging: true,
    callBack: ( data ) => {
        console.log( "SENDING TO SERVER" );
        console.log( "test data : ", data );
        console.log( "SERVER RECEIVED !" );

    }
} );

// custOrmwell.listen( () => {
//     console.log( "Minding my own business..." );
//     console.log( "BAM ! Crash !" );
//     throw new Error( "HOW COULD THIS HAPPEN TO ME" );

// } );