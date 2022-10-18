# Chapter 1 : Orwellian

## Using Orwellian

Asimovian is mainly designed as a client-side tool, although compatible with backend node applications, to simplify your logging to a single function call, with a unified behaviour - such as uploading them to your distant server.

### Goals and practical use

Here is a simple implementation of an Orwellian instance :
```ts
import Orwellian from "orwellian";

const options = {

    // This is the same as the default values : 
    appName: string = "default";  //  |
    version: string = "0.0.0";    //  | 
    type: string = "development"; //  | These three values can be anything you'd like, they'll be logged and/or sent back to you on use. It can prove useful to keep it tidy or automatically linked to your development version, so you can make sure reported errors are linked to your production version.


    callBack: function;           // A callback that'll be fed the data generated from the listener.
    logging: boolean = true;      // Activates or deactivates the logging to the console.
    logLevel: logLevel = 'debug';  //  'debug' | 'error' | 'silent' ; If "logging" is activated, you can choose to log every event fired, only errors, or none of them to the console.
} 
const orwellian = new Orwellian(options)

```
Once initialized, the instance gives us access to informations and methods to record data on the fly.

```js
orwellian.listen("I can handle text, but also errors !")
orwellian.listen(() => throw new Error("Record this !"))
process.on("exit", (something) => orwellian.listen(something))
```
One handy way to use these property is defining a singleton of an Orwellian instance, and feed it information through an exported function.

```js
const orwellian = new Orwellian(options)

export default orwellian.listen;
```
Or through a customized function depending on your needs : 

```js
const orwellian = new Orwellian(options)

export default function customListener(data) {
    orwellian.listen(data);
    return data.id;
    }
export function customErrorListener(fn) {
    orwellian.listen(fn, "my function arguments", ["can go here"])
}
```
## The options object

Orwellian uses a few properties to identify itself, mostly to be able to format logging messages in a convenient way.
These will allow you to more easily define different areas where you can use your tracking.

The following example :
```js
import Orwellian from "orwellian";

const options = {

} 
options.appName = "Orwellian Example"
options.version = "0.0.1"
options.type = "development"
const orwellian = new Orwellian(options)
// Event fired at 12:00 GMT
const collectedData = orwellian.listen({hello:"world"}); 
// collectedData = {
//   timestamp: 'Tue, 18 Oct 2022 12:00:00 GMT',
//   appName: 'Orwellian Example',
//   version: '0.0.1',
//   type: 'development',
//   event: { Hello: 'world' },
//   isError: false
// }
```
Would output this to the console (and to your callback if provided)  :

`{"timestamp":"Tue, 18 Oct 2022 12:00:00 GMT","appName":"Orwellian Example","version":"0.0.1","type":"development","event":{"Hello":"world"},"isError":false}`

#  Chapter 2 : Asimovian

## Using Asimovian

Asimovian is mainly designed as a server-side tool to record your logs in an unified manner, and write or stock them.

### Goals and practical use

```js
import {Asimovian} from "orwellian";
const options = {

} 
const asimovian = new Asimovian(options)

```

### Lorem ipsum

## Lorem ipsum
### Lorem ipsum

# Lorem Ipsum
## Lorem ipsum
### Lorem ipsum

## Lorem ipsum


# Current limitations
