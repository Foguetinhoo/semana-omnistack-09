const { LocalStorage } = require('node-localstorage')

if (typeof localStorage === "undefined" || localStorage === null) {
    localStorage = new LocalStorage('./data');
}
module.exports = localStorage