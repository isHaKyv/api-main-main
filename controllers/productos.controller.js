const Producto = require("../models/productos.model.js");

// Crear y guardar un nuevo Producto
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío",
    });
  }

  // Crear un Producto
  const producto = new Producto({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
    det: req.body.det,
    seccion: req.body.seccion,
    cantidad: req.body.cantidad,
  });

  // Guardar el Producto en la base de datos
  Producto.create(producto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear el Producto.",
      });
    else res.send(data);
  });
};

// Obtener todos los Productos desde la base de datos (con condición).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Producto.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió algún error al recuperar los Productos.",
      });
    else res.send(data);
  });
};

// Encontrar un solo Producto por ID
exports.findOne = (req, res) => {
  Producto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró Producto con ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar Producto con ID " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Actualizar un Producto identificado por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío",
    });
  }

  Producto.updateById(req.params.id, new Producto(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró Producto con ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al actualizar Producto con ID " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Eliminar un Producto con el ID especificado en la solicitud
exports.delete = (req, res) => {
  Producto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró Producto con ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar Producto con ID " + req.params.id,
        });
      }
    } else res.send({ message: `Producto eliminado exitosamente.` });
  });
};

// Eliminar todos los Productos desde la base de datos.
exports.deleteAll = (req, res) => {
  Producto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al eliminar todos los Productos.",
      });
    else res.send({ message: `Todos los Productos fueron eliminados exitosamente.` });
  });
};
