import MetarriApp from "./util/MetarriApp";
import MetaddiAppOptions from "./util/MetarriAppOptions";

const metarriAppLoader = (app: MetarriApp, options: MetaddiAppOptions) => {
    app(options);
};

export default metarriAppLoader;
