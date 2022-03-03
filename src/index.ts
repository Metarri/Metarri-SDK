"use strict";

import expandAbbreviation from "emmet";
import MetarriApp from "./util/MetarriApp";
import MetarriAppOptions from "./util/MetarriAppOptions";
import ReactDOM from 'react-dom';
import processWebManifest from "./util/processWebManifest";
import processServiceWorker from "./util/processServiceWorker";

console.log('Running "Metarri SDK"');

const createMetarriApp: MetarriApp = (app: any, config: MetarriAppOptions) => {
    processWebManifest(config.webManifestoptions);
    processServiceWorker(config.serviceWorkerOptions);

    if (config.appName) {
        document.querySelector('title')!.textContent = config.appName;
    } else {
        document.querySelector('title')!.textContent = config.webManifestoptions.name;
    }

    // for react apps
    if (config.appType == 'react') {
        // render in a custom selector
        if (config.rootSelector) {
            const selectorHTML = expandAbbreviation(config.rootSelector);
            const holder = document.createElement('div');
            holder.innerHTML = selectorHTML;

            const mountElement = holder!?.firstElementChild!;
            document.querySelector('#metarri-host')?.appendChild(mountElement!);
            ReactDOM.render(app, mountElement);
        } else {
            // render in the default selector
            ReactDOM.render(app, document.querySelector('#metarri-host'));
        }
    }
    // for vue3 apps
    else if (config.appType == 'vue3') {
        // 
    }
    // for vue iframe
    else if (config.appType == 'iframe') {
        // 
    }
    // for vue vanilla
    else if (config.appType == 'vanilla') {
        // 
    }
}

export default createMetarriApp;
