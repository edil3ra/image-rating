var express = require('express')
var multer = require('multer')
var fs = require('fs')
var cors = require('cors')
var path = require('path')
var Loki = require('lokijs')
var utils = require('./utils')



var DB_NAME = 'db.json'
var COLLECTION_IMAGE = 'images'
var UPLOAD_PATH = 'uploads'
var upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: utils.imageFilter })
var db = new Loki(`${DB_NAME}`, { persistenceMethod: 'fs' })



var app = express()


// app.get('/images', function (req, res) => {
//     try {
//         const col = await loadCollection(COLLECTION_IMAGE, db);
//         res.send(col.data);
//     } catch (err) {
//         res.sendStatus(400);
//     }
// })



// app.post('/images', upload.single('image'), function(req, res) {
// 	try {
// 		console.log('on try')
// 		utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection){
// 			var data = collection.insert(req.file)
// 			console.log('i before after save database')
// 			db.saveDatabase()
// 			console.log('i passe after save database')
// 			res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname })
// 		})
// 	} catch(err) {
// 		console.log('on catch')
// 		res.sendStatus(400)
// 	}
// })


app.post('/images', function(req, res) {
	upload.single('image')(req, res, function(err) {
		if(err) {
			return res.sendStatus(400)
			
		}
		try {
			utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection){
				var data = collection.insert(req.file)
				db.saveDatabase()
				res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname })
			})
		} catch(err) {
			res.sendStatus(400)
		}		
	})
})






app.listen(3000, function () {
    console.log('listening on port 3000!')
})



