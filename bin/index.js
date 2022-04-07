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

program.command('package')
    .description('Packages an app into a .MTRI archive for uploading to Metarri Store')
    .argument('<path>', 'The relative or absolute path to the directory containing the apps soure files')
    .action((path, options) => {
        const absolutePath = resolve(path);
        console.log(`Begin: packaging app at ${absolutePath}`);

        (async () => {

            let bundleName = `${absolutePath.split('/').pop()}.MTRI`;
            fs.writeFileSync(bundleName, '');
            bundleName = resolve(bundleName);

            /**
             * @type {string} string
             */

            /**
             * 
             * @param {string} path 
             */
            const hashFile = (path) => {
                console.log('Adding ', path, ' to .MTRI bundle');

                const fileContent = fs.readFileSync(path).toString('base64url');

                const payload = JSON.stringify({
                    path: path.replace(`${absolutePath}/`, ''),
                    data: fileContent
                });

                fs.appendFileSync(bundleName, `${payload}\n`);
            }

            const bundleDirectoryRecursively = (dirPath) => {
                const dirList = fs.readdirSync(dirPath);

                for (const _filePath of dirList) {
                    const filePath = resolve(dirPath, _filePath);

                    /**
                     * @type {fs.Stats} fs.Stats
                     */
                    let stat;
                    try {
                        stat = fs.statSync(filePath);
                    } catch (error) {
                        console.log('There is an error with the file: ', path);
                        continue;
                    }

                    if (stat.isDirectory()) {
                        // is directory
                        bundleDirectoryRecursively(filePath);
                    } else if (stat.isFile()) {
                        // is file
                        hashFile(filePath);
                    }
                }
            };

            bundleDirectoryRecursively(absolutePath);

            console.log('\r\nFinished: packaging app at ', bundleName, '\r\n');

        })();
    });

program.command('create')
    .description('Creates a new Metarri app with the specified options, in the current directory')
    .argument('<app_name>', 'The app name')
    .action((app_name, options) => {
        // const path = resolve(app_name);
        console.log('Create');
        fs.mkdirSync(app_name);
    });

program.command('version')
    .description('Prints the CLI version')
    .action((app_name, options) => {
        printVersion();
    });

program.parse();

const options = program.opts();

if (options.version) {
    printVersion();
}
