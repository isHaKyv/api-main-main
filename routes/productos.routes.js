module.exports = (app) => {
  const producto = require("../controllers/productos.controller.js");

  var router = require("express").Router();

  // Crear un nuevo Producto
  router.post("/", producto.create);

  // Obtener todos los Productos
  router.get("/", producto.findAll);

  // Obtener un solo Producto con ID
  router.get("/:id", producto.findOne);

  // Actualizar un Producto con ID
  router.put("/:id", producto.update);

  // Eliminar un Producto con ID
  router.delete("/:id", producto.delete);

  // Eliminar todos los Productos
  router.delete("/", producto.deleteAll);

  app.use('/api/productos', router);
};
