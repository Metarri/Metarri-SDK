const info = (...message: any[]) => {
    // console.info(`%c ${message} `, 'background: #0000ff; color: #ffffff');
    console.info(...message);
};

export default info;
