const IS_DEV = (process.env.HAS_SOURCE_MAP === 'true') ? true as const : false as const;

export default IS_DEV;
