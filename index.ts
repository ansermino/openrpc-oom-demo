import {parseOpenRPCDocument} from "@open-rpc/schema-utils-js";
import {program} from "commander";
import $RefParser from "@apidevtools/json-schema-ref-parser";

const DEFAULT_PATH = './demo.json'

const loadDocOpenRpc = async (path: string) => {
    console.log(`Loading ${path}...`)
    const doc = await parseOpenRPCDocument(path);
    console.log(`Successfully loaded OpenRPC document ${path} with ${doc.methods.length} methods`)
}

const loadDocRefParse = async (path: string) => {
    console.log(`Loading ${path}...`)
    let schema = await $RefParser.dereference(path);
    console.log(`Dereferenced schema`)
}

program.name('demo')

program.command('openrpc')
    .option('-f, --file <file>', 'Specify file', DEFAULT_PATH)
    .action(async (options) => {
    try {
        await loadDocOpenRpc(options.file)
    } catch (e) {
        console.log(e.message)
    }
});

program.command('ref-parse')
    .option('-f, --file <file>', 'Specify file', DEFAULT_PATH)
    .action(async (options) => {
        try {
            await loadDocRefParse(options.file)
        } catch (e) {
            console.log(e)
        }
    });

program.parse()
