import Orwellian from "./index";
import { Asimovian } from "./index";

let received = "";

const asimov = new Asimovian();
const orwell = new Orwellian( {
    appName: "Orwell",
    logLevel: "silent",
    version: "0.0.1",
    logging: true,
    callBack: ( data: string ) => {
        console.log( "SENDING TO SERVER" );
        received = data;

    }
} );

orwell.listen( () => {
    throw new Error( "HOW COULD THIS HAPPEN TO ME" );

} );

asimov.record( received );
orwell.listen( () => {
    throw new Error( "Another error ?" );

} );
asimov.record( received );

orwell.listen( () => {
    throw new Error( "still.." );

} );
asimov.record( received );

orwell.listen( "Hello" );
asimov.record( received );

orwell.listen( { Hello: "world" } );
asimov.record( received );
