const sql = require("./db.js");

// constructor
const Address = function (address) {
  this.calle = address.calle;
  this.numero = address.numero;
  this.colonia = address.colonia;
  this.ciudad_o_municipio = address.ciudad_o_municipio;
  this.estado = address.estado;
  this.pais = address.pais;
  this.codigo_postal = address.codigo_postal;
  this.numero_de_telefono = address.numero_de_telefono;
};

Address.create = (newAddress, result) => {
  sql.query("INSERT INTO direccion SET ?", newAddress, (err, res) => {
    if (err) {
      console.error("Error creating address aqui:", err);
      result(err, null);
      return;
    }

    console.log("Created address: ", { codigo_postal: res.insertId, ...newAddress });
    result(null, { codigo_postal: res.insertId, ...newAddress });
    return;
  });
};

Address.findById = (codigcodigo_postal, result) => {
  sql.query(`SELECT * FROM direccion WHEREcodigo_postal = ${codigcodigo_postal}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found address: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Address with thecodigo_postal
    result({ kind: "not_found" }, null);
  });
};

Address.getAll = (nombre, result) => {
  let query = "SELECT * FROM direccion";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("direccion: ", res);
    result(null, res);
  });
};


Address.updateById = (codigcodigo_postal, address, result) => {
  sql.query(
    "UPDATE direccion SET nombre = ?, calle = ?, precio = ? WHEREcodigo_postal = ?",
    [address.nombre, address.calle, address.precio,codigo_postal],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Address with thecodigo_postal
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated address: ", {codigo_postal:codigo_postal, ...address });
      result(null, {codigo_postal:codigo_postal, ...address });
    }
  );
};

Address.remove = (codigo_postal, result) => {
  sql.query("DELETE FROM direccion WHERE codigo_postal = ?",codigo_postal, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Address with thecodigo_postal
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted address with codigo_postal: ",codigo_postal);
    result(null, res);
  });
};

Address.removeAll = result => {
  sql.query("DELETE FROM direccion", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} direccion`);
    result(null, res);
  });
};

module.exports = Address;
