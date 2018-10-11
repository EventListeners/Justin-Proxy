require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = process.env.port || 3000;

var server = express();
// server.use(bodyParser.json());
// server.use(express.urlencoded({ extended: true }));
server.use('/artists/:id', express.static(path.join(__dirname, './'), { maxAge: '30 days' }));
server.use(cors());

// Albums & Player
// server.get('/artists/albums/:artistID', (req, res) => {
//   res.redirect('http://52.15.129.193' + req.url);
// });

// Related Artists
server.get('/artists/relatedArtists/:id', (req, res) => {
  res.redirect('http://18.188.244.186:3002' + req.url);
});

// // Popular Songs
// server.get('/artist/:id', (req, res) => {
//   res.redirect('http://18.224.17.253' + req.url);
// });

// // Header
// server.get('/artists/:artistID', (req, res) => {
//    res.redirect('http://35.172.133.115' + req.url);
// });

server.listen(PORT, () => {
  //console.log(`${cluster.worker.id} is listening on ${PORT} broski`)
});