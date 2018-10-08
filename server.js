require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const cluster = require('cluster');
const PORT = process.env.port || 3000;

if (cluster.isMaster) {
  const numCPUs = require('os').cpus().length;
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  var server = express();
  server.use(compression())
  server.use(bodyParser.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(express.static(path.join(__dirname, './'), { maxAge: '30 days' }));
  server.use(cors());

  // Albums & Player
  // server.get('/artists/albums/:artistID', (req, res) => {
  //   res.redirect('http://52.15.129.193' + req.url);
  // });

  // Related Artists
  server.get('/artists/relatedArtists/:id', (req, res) => {
    // res.redirect('http://18.206.245.56' + req.url);
    res.redirect('http://localhost:3002' + req.url);
  });

  // // Popular Songs
  // server.get('/artist/:id', (req, res) => {
  //   res.redirect('http://18.224.17.253' + req.url);
  // });

  // // Header
  // server.get('/artists/:artistID', (req, res) => {
  //    res.redirect('http://35.172.133.115' + req.url);
  // });

  server.listen(PORT, () => console.log(`${cluster.worker.id} is listening on ${PORT} broski`));

}

cluster.on('exit', (worker) => {
  console.log('mayday! mayday! worker', worker.id, ' is no more!')
  cluster.fork()
});