const warning = (...message: any[]) => {
    return console.warn(`%c ${message} `, 'background: #0000ff; color: #ffffff');
};

export default warning;
