module.exports = app => {
    const direc = require("../controllers/address.controller.js");
  
    var router = require("express").Router();
  
    // Create a new direc
    router.post("/", direc.create);
  
    // Retrieve all Tutorials
    router.get("/", direc.findAll);
  
  
    // Retrieve a single direc with codigo_postal
    router.get("/:codigo_postal", direc.findOne);
  
    // Update a direc with codigo_postal
    router.put("/:codigo_postal", direc.update);
  
    // Delete a direc with codigo_postal
    router.delete("/:codigo_postal", direc.delete);
  
    // Delete all Tutorials
    router.delete("/", direc.deleteAll);
  
    app.use('/api/direc', router);
  };
  