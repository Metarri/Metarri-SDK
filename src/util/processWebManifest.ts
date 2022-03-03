import { WebManifestOptions } from "./MetarriAppOptions";

const processWebManifest = (options: WebManifestOptions) => {
    const manifestString = JSON.stringify(options);
    const blob = new Blob([manifestString], { type: 'application/json' });
    const fileReader = new FileReader();
    fileReader.onload = () => {
        const dataUrl = fileReader.result as string;
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'manifest');
        linkElem.setAttribute('href', dataUrl);
        document.head.appendChild(linkElem);
    }
    fileReader.readAsDataURL(blob);
}

export default processWebManifest;