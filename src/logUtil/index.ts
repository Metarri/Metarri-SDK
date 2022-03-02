import error from "./error";
import info from "./info";
import warning from "./warning";
import IS_DEV from "../CONSTANTS/IS_DEV";

export enum LogLevels {
    ERROR = "ERROR",
    WARNING = "WARNING",
    INFO = "INFO",
    PRODUCTION = "PRODUCTION"
}

export interface LogEntry {
    logLevel: LogLevels;
    params: any[];
};

const registerLog = (entry: LogEntry) => {
    // (IS_DEV) && console.log()
};

const logUtil = {
    error: (...params: any[]) => {
        registerLog({ logLevel: LogLevels.ERROR, params });
        (IS_DEV) && error('iGamer-log-error: ', ...params);
    },
    warn: (...params: any[]) => {
        registerLog({ logLevel: LogLevels.WARNING, params });
        (IS_DEV) && warning('iGamer-log-warning: ', ...params);
    },
    info: (...params: any[]) => {
        registerLog({ logLevel: LogLevels.INFO, params });
        (IS_DEV) && info('iGamer-log-info: ', ...params);
    },
    showInProduction: (...params: any[]) => {
        registerLog({ logLevel: LogLevels.PRODUCTION, params });
        info('iGamer-log-info: ', ...params);
    },
};

export default logUtil;
