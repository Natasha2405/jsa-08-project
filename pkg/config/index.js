const fs = require('fs');

const configPath = `${__dirname}/../../config.json`;

let data = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(data);

const get = (section) => {
    if (config[section]) {
        return config[section];
    }
    return null;
};

module.exports = {
    get
};