var del = require('del')
var Loki = require('lokijs')


var loadCollection = function (colName, db) {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            var _collection = db.getCollection(colName) || db.addCollection(colName)
            resolve(_collection);
        })
    })
}


var imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
}


module.exports = {
	loadCollection: loadCollection,
	imageFilter: imageFilter,
}

