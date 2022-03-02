const error = (...message: any[]) => {
    return console.error(`%c ${message} `, 'background: #ff0000; color: #ffffff');
};

export default error;
