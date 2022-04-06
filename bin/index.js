//  usr/bin/env node

const { program } = require('commander');
const { resolve } = require('path');
const fs = require('fs');

console.log('Running Metarri SDK Command Line Tool\r\n');

const VERSION = '0.0.1';

const printVersion = () => {
    console.log(`Metarri SDK Command Line Tool v${VERSION}`);
    return process.exit(0);
};

program
    .name('metarri-cli')
    .option('-v, --version', 'Prints the CLI version')
    .description('Command line tooling for the Metarri SDK')
    .version(VERSION, '-v');

program.command('package')
    .description('Packages an app into a .MTRI archive for uploading to Metarri Store')
    .argument('<path>', 'The relative or absolute path to the directory containing the apps soure files')
    .action((path, options) => {
        const absolutePath = resolve(path);
        console.log(`Begin: packaaging app at ${absolutePath}`);

        (async () => {

            /**
             * @type { path: string; data: string }
             */
            const files = [];

            const dirList = fs.readdirSync(absolutePath);

            const hashFile = (path) => {
                const fileContent = fs.readFileSync(path, 'utf8');

                files.push({
                    path: path,
                    data: fileContent
                });
            }

            const bundleDirectoryRecursively = (dirPath) => {
                for (const filePath of dirList) {
                    if (fs.statSync(filePath).isDirectory()) {
                        // is directory
                        bundleDirectoryRecursively(filePath);
                    } else {
                        // is file
                        hashFile(filePath);
                    }
                }
            };

        })();
    });

program.command('create')
    .description('Creates a new Metarri-Native app with the specified option, in the current directory')
    .argument('<app_name>', 'The app name')
    .action((app_name, options) => {
        // const path = resolve(app_name);
        fs.mkdir(app_name)
    });

program.command('version')
    .description('Prints the CLI version')
    .action((app_name, options) => {
        // 
    });

program.parse();

const options = program.opts();

if (options.version) {
    printVersion();
}
