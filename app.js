import express from 'express'
import cors from 'cors'
import compression from 'compression'
import path from 'path'
import https from 'https'
import fs from 'fs'
import config from './config.js'

const app = express()

//app.use(compression())
//app.use('/files', express.static(path.join(path.resolve(), '..', 'files')))

app.use(express.json())
//app.use(cors())
// app.use(function (err, req, res, next) {
//     if (err instanceof multer.MulterError) res.send({ ok: false, err: err.message });
//     else next(err);
// })

app.use('/static', express.static(path.join(path.resolve(), './build/static')));
app.get('*', (req, res) => res.sendFile('index.html', { root: path.join(path.resolve(), './build/') }))

const server = https.createServer(
  {
  key: fs.readFileSync(config.key),
  cert: fs.readFileSync(config.cert)
}, 
app)

server.listen(443)

const http = express()
http.get('*', (req, res) => res.redirect(`https://${config.domain}${req.url}`))
http.listen(80)
