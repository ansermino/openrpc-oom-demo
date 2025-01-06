import {parseOpenRPCDocument} from "@open-rpc/schema-utils-js";
import {program} from "commander";
import fs from 'fs';
import $RefParser from "@apidevtools/json-schema-ref-parser";
import {OpenrpcDocument} from "@open-rpc/meta-schema";

const DEFAULT_PATH = './demo.json'

const loadDoc = async (path: string) => {
    console.log(`Loading ${path}...`)
    const doc = await parseOpenRPCDocument(path);
    console.log(`Successfully loaded OpenRPC document ${path} with ${doc.methods.length} methods`)
}

const loadDocJsonParser = async (path: string) => {
    console.log(`Loading ${path}...`)
    let schema = await $RefParser.dereference(path);
    console.log(`Dereferenced schema`)
}

program.name('demo')
    .option('-f, --file <file>', 'Specify file', DEFAULT_PATH)
    .action(async (options) => {
    try {
        await loadDoc(options.file)
    } catch (e) {
        console.log(e.message)
    }
});

program.command('ref-parse')
    .option('-f, --file <file>', 'Specify file', DEFAULT_PATH)
    .action(async (options) => {
        try {
            await loadDocJsonParser(options.file)
        } catch (e) {
            console.log(e)
        }
    });

program.parse()
