var Plantdb = require("../model/model");

// create and save new plant
exports.create = (req, res) => {
  //validate the request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // New plant
  const plant = new Plantdb({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    image: req.body.image,
  });

  // save plant in database

  plant
    .save(plant)
    .then(data => {
      res.redirect('/')
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured during creation",
      });
    });
};

//retrieve and return all plants / retrieve and return a single plant
exports.find = (req, res) => {
  Plantdb.find()
    .then(plant => {
      res.send(plant);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured during  showing",
      });
    });
};

//Update by plant id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;
  Plantdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot update plant with ${id}. maybe plant not found`,
          });
      } else {
        console.log('data success : ',data);
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error update plant information -> ",err });
    });
};

//delete a plant by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Plantdb.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete with id ${id}` });
      } else {
        res.send({
          message: `Plant deleted successfully`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete this plant" });
    });
};
