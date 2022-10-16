"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const index_2 = require("./index");
let received = "";
const asimov = new index_2.Asimovian();
const orwell = new index_1.default({
    appName: "Orwell",
    logLevel: "silent",
    version: "0.0.1",
    logging: true,
    callBack: (data) => {
        console.log("SENDING TO SERVER");
        received = data;
    }
});
orwell.listen(() => {
    throw new Error("HOW COULD THIS HAPPEN TO ME");
});
asimov.record(received);
orwell.listen(() => {
    throw new Error("Another error ?");
});
asimov.record(received);
orwell.listen(() => {
    throw new Error("still..");
});
asimov.record(received);
orwell.listen("Hello");
asimov.record(received);
orwell.listen({ Hello: "world" });
asimov.record(received);
