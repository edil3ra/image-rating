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


var cleanFolder = function (folderPath) {
    del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

var serializeLoki = function(item) {
	item['id'] = item['$loki']
	delete item['$loki']
	delete item['meta']
	return item
}


module.exports = {
	loadCollection: loadCollection,
	imageFilter: imageFilter,
	cleanFolder: cleanFolder,
	serializeLoki: serializeLoki,
}

