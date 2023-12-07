const Address = require("../models/address.model.js");

// Create and Save a new Address
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).json({ message: "Content can not be empty!" });
  }

  // Create an Address
  const address = new Address({
    calle: req.body.street,
    numero: req.body.number,
    colonia: req.body.colony,
    ciudad_o_municipio: req.body.city,
    estado: req.body.state,
    pais: req.body.country,
    codigo_postal: req.body.code,
    numero_de_telefono: req.body.phone,
  });

  // Save Address in the database
  Address.create(address, (err, data) => {
    if (err) {
      console.error("Error creating Address:", err);
      return res.status(500).json({ message: "Error creating Address" });
    }
    res.status(201).json(data);
  });
};

// Retrieve all Address from the database (with condition).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Address.getAll(nombre, (err, data) => {
/*     console.log("Prueba"); */
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Address.",
      });
    else res.send(data);
  });
};

// Find a single Address by Id
exports.findOne = (req, res) => {
  Address.findById(req.params.codigo_postal, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Address with codigo_postal ${req.params.codigo_postal}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Address with codigo_postal " + req.params.codigo_postal,
        });
      }
    } else res.send(data);
  });
};


// Update a Address identified by the codigo_postal in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Address.updateById(req.params.codigo_postal, new Address(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Address with codigo_postal ${req.params.codigo_postal}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Address with codigo_postal " + req.params.codigo_postal,
        });
      }
    } else res.send(data);
  });
};

// Delete a Address with the specified codigo_postal in the request
exports.delete = (req, res) => {
  Address.remove(req.params.codigo_postal, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Address with codigo_postal ${req.params.codigo_postal}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Address with codigo_postal " + req.params.codigo_postal,
        });
      }
    } else res.send({ message: `Address was deleted successfully!` });
  });
};

// Delete all Address from the database.
exports.deleteAll = (req, res) => {
  Address.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Address.",
      });
    else res.send({ message: `All Address were deleted successfully!` });
  });
};
