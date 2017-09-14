var express = require('express')
var multer = require('multer')
var fs = require('fs')
var cors = require('cors')
var path = require('path')
var Loki = require('lokijs')
var utils = require('./utils')



var DB_NAME = 'db.json'
var COLLECTION_NAME = 'images'
var UPLOAD_PATH = 'uploads'
var upload = multer({ dest: `${UPLOAD_PATH}/` })
var db = new Loki(`${DB_NAME}`, { persistenceMethod: 'fs' })



var app = express()


app.post('/images', upload.single('image'), function(req, res) {
    utils.loadCollection(COLLECTION_NAME, db).then(function(collection){
		var data = collection.insert(req.file)
		db.saveDatabase()
		try {
			res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname })
		} catch(err) {
			res.sendStatus(400)
		}
	})
})



app.listen(3000, function () {
    console.log('listening on port 3000!')
})



