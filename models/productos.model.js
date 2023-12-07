const sql = require("./db.js");

// Constructor
const Producto = function (producto) {
  this.id = producto.id;
  this.name = producto.name;
  this.price = producto.price;
  this.image = producto.image;
  this.category = producto.category;
  this.det = producto.det;
  this.seccion = producto.seccion;
  this.cantidad = producto.cantidad;
};

// Crear un nuevo Producto
Producto.create = (nuevoProducto, resultado) => {
  sql.query("INSERT INTO productos SET ?", nuevoProducto, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(err, null);
      return;
    }

    console.log("Producto creado: ", { id: res.insertId, ...nuevoProducto });
    resultado(null, { id: res.insertId, ...nuevoProducto });
  });
};

// Obtener todos los Productos
Producto.getAll = (nombre, resultado) => {
  let query = "SELECT * FROM productos";

  if (nombre) {
    query += ` WHERE name LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(null, err);
      return;
    }

    console.log("Productos: ", res);
    resultado(null, res);
  });
};

// Obtener un solo Producto por ID
Producto.findById = (id, resultado) => {
  sql.query(`SELECT * FROM productos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(err, null);
      return;
    }

    if (res.length) {
      console.log("Producto encontrado: ", res[0]);
      resultado(null, res[0]);
      return;
    }

    // No se encontraron Productos con el ID proporcionado
    resultado({ kind: "not_found" }, null);
  });
};

// Actualizar un Producto por ID
Producto.updateById = (id, producto, resultado) => {
  sql.query(
    "UPDATE productos SET name = ?, price = ?, image = ?, category = ?, det = ?, seccion = ?, cantidad = ? WHERE id = ?",
    [producto.name, producto.price, producto.image, producto.category, producto.det, producto.seccion, producto.cantidad, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        resultado(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // No se encontró un Producto con el ID proporcionado
        resultado({ kind: "not_found" }, null);
        return;
      }

      console.log("Producto actualizado: ", { id: id, ...producto });
      resultado(null, { id: id, ...producto });
    }
  );
};

// Eliminar un Producto por ID
Producto.remove = (id, resultado) => {
  sql.query("DELETE FROM productos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // No se encontró un Producto con el ID proporcionado
      resultado({ kind: "not_found" }, null);
      return;
    }

    console.log("Producto eliminado con ID: ", id);
    resultado(null, res);
  });
};

// Eliminar todos los Productos
Producto.removeAll = (resultado) => {
  sql.query("DELETE FROM productos", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(null, err);
      return;
    }

    console.log(`Eliminados ${res.affectedRows} productos`);
    resultado(null, res);
  });
};

module.exports = Producto;
