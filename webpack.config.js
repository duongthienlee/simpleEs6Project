const env = process.env.NODE_ENV || 'development';
let config = {};
console.info(`Build environment:${env}`);

switch (env) {
    case 'development': {
        config = require('./webpackConfig/development');
        break;
    }
    case 'production': {
        config = require('./webpackConfig/production');
        break;
    }
    default: {
        config = require('./webpackConfig/base');
        break;
    }
}


module.exports = config;