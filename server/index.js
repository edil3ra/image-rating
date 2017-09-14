var express = require('express')
var multer = require('multer')
var fs = require('fs')
var cors = require('cors')
var path = require('path')
var Loki = require('lokijs')
var utils = require('./utils')
var bodyParser = require('body-parser')




var DB_NAME = 'db.json'
var COLLECTION_IMAGE = 'images'
var UPLOAD_PATH = 'uploads'
var upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: utils.imageFilter })
var db = new Loki(`${DB_NAME}`, { persistenceMethod: 'fs' })



var app = express()
app.use(bodyParser.json())


app.get('/images', function(req, res) {
    try {
        utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection){
			res.send(collection.data.map(function(item) {
				return utils.serializeLoki(item)
			}));
		})
    } catch (err) {
        res.sendStatus(404);
    }
})



app.post('/images', function(req, res) {
	upload.single('image')(req, res, function(err) {
		if(err) {
			return res.sendStatus(400)
		}
		try {
			utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection){
				
				var dataToInsert = {
					filename: req.file.filename,
					originalName: req.file.originalname,
					mimetype: req.file.mimetype,
					scores: [],
				}
				var data = collection.insert(dataToInsert)
				db.saveDatabase()

				res.send(utils.serializeLoki(data))
			})
		} catch(err) {
			res.sendStatus(400)
		}		
	})
})


app.get('/images/:id', function(req, res) {
    try {
		utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection){
			const data = collection.get(req.params.id);
			if (!data) {
				res.sendStatus(404);
				return
			}
			res.send(utils.serializeLoki(data))
		})
    } catch (err) {
        res.sendStatus(400);
    }
})


app.delete('/images/:id', function(req, res) {
    try {
		utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection){
			const data = collection.get(req.params.id);
			if (!data) {
				res.sendStatus(404);
				return
			}
			collection.remove(data)
			db.saveDatabase()
			res.sendStatus(200)
		})
    } catch (err) {
        res.sendStatus(400);
    }
})


app.put('/images/:id', function(req, res) {
    try {
		utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection){
			const data = collection.get(req.params.id);
			if (!data) {
				res.sendStatus(404);
				return
			}
			console.log(data)
			console.log(req.body)
			
			if(req.body['originalName'] !== undefined && req.body['originalName'] !== null) {
				data['originalName'] = req.body['originalName']
			}
			
			if(req.body['scores'] !== undefined && req.body['scores'] !== null) {
				data['scores'] = req.body['scores']
			}
			

			db.saveDatabase() 
			res.sendStatus(200)
		})
    } catch (err) {
        res.sendStatus(400);
    }
})






app.get('/images/:id/stream', function(req, res) {
    try {
		utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection){
			const data = collection.get(req.params.id);
			if (!data) {
				res.sendStatus(404);
				return
			}
			res.setHeader('Content-Type', data.mimetype);
			fs.createReadStream(path.join(UPLOAD_PATH, data.filename)).pipe(res);
		})
    } catch (err) {
        res.sendStatus(400);
    }
})




app.listen(3000, function () {
    console.log('listening on port 3000!')
})



