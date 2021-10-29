const express = require ('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');
// const multer  = require('multer');
// const upload = multer({ dest: 'assets/img' });

//
route.get("/", services.homeRoutes);
route.get("/add_plant", services.add_plant);
route.get("/update_plant", services.update_plant);

// API
route.post('/api/plants', controller.create);
route.get('/api/plants', controller.find);
route.put('/api/plants/:id', controller.update);
route.delete('/api/plants/:id', controller.delete);


module.exports = route