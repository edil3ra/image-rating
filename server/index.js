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
var upload = multer({ dest: path.join(__dirname, UPLOAD_PATH), fileFilter: utils.imageFilter })
var db = new Loki(path.join(__dirname, DB_NAME), { persistenceMethod: 'fs' })

var app = express()

app.set('port', 8080)
app.use(bodyParser.json())
app.use(express.static('static'))



app.get('/api/images', function(req, res) {
    try {
        utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection) {
            res.send(
                collection.data.map(function(item) {
                    return utils.serializeLoki(item)
                })
            )
        })
    } catch (err) {
        res.sendStatus(404)
    }
})

app.post('/api/images', function(req, res) {
    upload.single('image')(req, res, function(err) {
        if (err) {
            return res.sendStatus(400)
        }
        try {
            utils
                .loadCollection(COLLECTION_IMAGE, db)
                .then(function(collection) {
                    var dataToInsert = {
                        filename: req.file.filename,
                        originalName: req.file.originalname,
                        mimetype: req.file.mimetype,
						timestamp: Date.now(),
                        rates: []
                    }
                    var data = collection.insert(dataToInsert)
                    db.saveDatabase()

                    res.send(utils.serializeLoki(data))
                })
        } catch (err) {
            res.sendStatus(400)
        }
    })
})

app.get('/api/images/:id', function(req, res) {
    try {
        utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection) {
            const data = collection.get(req.params.id)
            if (!data) {
                res.sendStatus(404)
                return
            }
            res.send(utils.serializeLoki(data))
        })
    } catch (err) {
        res.sendStatus(400)
    }
})

app.delete('/api/images/:id', function(req, res) {
    try {
        utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection) {
            const data = collection.get(req.params.id)
            if (!data) {
                res.sendStatus(404)
                return
            }
            collection.remove(data)
            db.saveDatabase()
            res.sendStatus(200)
        })
    } catch (err) {
        res.sendStatus(400)
    }
})

app.put('/api/images/:id', function(req, res) {
    try {
        utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection) {
            const data = collection.get(req.params.id)
            if (!data) {
                res.sendStatus(404)
                return
            }

            if (
                req.body['originalName'] !== undefined &&
                req.body['originalName'] !== null
            ) {
                data['originalName'] = req.body['originalName']
            }

            if (
                req.body['rates'] !== undefined &&
                req.body['rates'] !== null
            ) {
                data['rates'] = req.body['rates']
            }

            db.saveDatabase()
            res.sendStatus(200)
        })
    } catch (err) {
        res.sendStatus(400)
    }
})

app.get('/api/images/:id/stream', function(req, res) {
    try {
        utils.loadCollection(COLLECTION_IMAGE, db).then(function(collection) {
            const data = collection.get(req.params.id)
            if (!data) {
                res.sendStatus(404)
                return
            }
            res.setHeader('Content-Type', data.mimetype)
            fs.createReadStream(path.join(UPLOAD_PATH, data.filename)).pipe(res)
        })
    } catch (err) {
        res.sendStatus(400)
    }
})

app.listen(app.get('port'), function() {
    console.log('node app started at: ' + app.get('port'))
})
