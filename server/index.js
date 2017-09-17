var express = require('express')
var multer = require('multer')
var fs = require('fs')
var cors = require('cors')
var path = require('path')
var Loki = require('lokijs')
var utils = require('./utils')
var bodyParser = require('body-parser')
var process = require('process')

var DB_NAME = 'db.json'
var COLLECTION_IMAGE = 'images'
var UPLOAD_NAME = 'upload'
var STATIC_NAME = 'static'

var DB_PATH = path.join(__dirname, DB_NAME)
var STATIC_PATH = path.join(__dirname, STATIC_NAME)
var UPLOAD_PATH = path.join(__dirname, UPLOAD_NAME)

var upload = multer({
    dest: UPLOAD_PATH,
    fileFilter: utils.imageFilter
})
var db = new Loki(DB_PATH, { persistenceMethod: 'fs' })
var app = express()

app.set('port', process.env.PORT || 8080)

app.use(bodyParser.json())
app.use(express.static(STATIC_PATH))
app.use('/upload', express.static(UPLOAD_PATH))

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
                        originalname: req.file.originalname,
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
                req.body['originalname'] !== undefined &&
                req.body['originalname'] !== null
            ) {
                data['originalname'] = req.body['originalname']
            }

            if (req.body['rates'] !== undefined && req.body['rates'] !== null) {
                data['rates'] = req.body['rates']
            }

            db.saveDatabase()
            res.send(utils.serializeLoki(data))
            // res.sendStatus(200)
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
