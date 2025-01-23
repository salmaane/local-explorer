import colors from 'colors';

const logger = (req, res, next) => {
    const logColors = {
        GET: 'green',
        POST: 'blue',
        PUT: 'yellow',
        DELETE: 'red'
    }

    const color = logColors[req.method] || colors.white

    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[color]);
    next();
}

export default logger;