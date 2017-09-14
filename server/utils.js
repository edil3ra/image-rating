var del = require('del')
var Loki = require('lokijs')


const loadCollection = function (colName, db) {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colName) || db.addCollection(colName)
            resolve(_collection);
        })
    })
}

module.exports.loadCollection = loadCollection
