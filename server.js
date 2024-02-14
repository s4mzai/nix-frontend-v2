import express from 'express'
const server = express()

server.use('/public', express.static('/public'))

server.get('/assets/*', (req, res) => {
  res.sendFile('/home/dvishal485/Projects/nix_frontend/dist/assets/' + req.params[0]);
})

server.get('/*', (req, res) => {
  res.sendFile('/home/dvishal485/Projects/nix_frontend/dist/index.html');
})

const port = 5173;
server.listen(port, function () {
  console.log('server listening on port ' + port)
})