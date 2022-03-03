type MetarriAppOptions = {
    appName?: string;
    appType: 'react' | 'vue3' | 'vanilla' | 'iframe';
    rootSelector: string;
    webManifestoptions: WebManifestOptions,
    serviceWorkerOptions: ServiceWorkerOptions
};

export interface ServiceWorkerOptions {
    offlineAlways: (string | RegExp)[];
    onlineAlways: (string | RegExp)[];
    staleWhileRevalidate: (string | RegExp)[];
    onlineThencache: (string | RegExp)[];
}

export interface WebManifestOptions {
    $schema?: "https://json.schemastore.org/web-manifest-combined.json",
    name: string,
    short_name?: string,
    start_url: string,
    iarc_rating_id?: string,
    dir: "rtl" | "ltr" | "auto",
    display_override?: ("standalone" | "fullscreen" | "minimal-ui" | "browser")[]
    display: "standalone" | "fullscreen" | "minimal-ui" | "browser",
    background_color: string,
    theme_color?: string,
    description: string,
    categories?: string[],
    prefer_related_applications?: boolean,
    "protocol_handlers": {
        protocol: string,
        url: string
    }[],
    orientation: "any" | "natural" | "landscape" | "landscape-primary" | "landscape-secondary" | "portrait" | "portrait-primary" | "portrait-secondary",
    icons: [
        {
            src: string,
            sizes: "48x48",
            type: string,
            purpose?: "maskable" | "any"
        },
        {
            src: string,
            sizes: "72x72",
            type: string
            purpose?: "maskable" | "any"
        },
        {
            src: string,
            sizes: "96x96",
            type: string
            purpose?: "maskable" | "any"
        },
        {
            src: string,
            sizes: "144x144",
            type: string
            purpose?: "maskable" | "any"
        },
        {
            src: string,
            sizes: "168x168",
            type: string
            purpose?: "maskable" | "any"
        },
        {
            src: string,
            sizes: "192x192",
            type: string
            purpose?: "maskable" | "any"
        }
    ],
    related_applications?: {
        platform: string,
        url: string
    }[],
    shortcuts: {
        name: string,
        url: string,
        description?: string
    }[],
    screenshots: {
        src: string,
        sizes: string,
        type: string,
        platform: "wide" | "narrow" | "android" | "ios" | "chromeos" | "macos" | "windows" | "xbox" | "chrome_web_store" | "play" | "itunes" | "microsoft-inbox" | "microsoft-store",
        label: string
    }[]
}

export default MetarriAppOptions;
