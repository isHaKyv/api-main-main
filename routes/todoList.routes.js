module.exports = app => {
    const todoList = require("../controllers/todoList.controller.js");

    var router = require("express").Router();

    router.get("/completas/", todoList.completas)

    // Create a new task
    router.post("/", todoList.create);

    // Retrieve all tasks
    router.get("/", todoList.findAll);

    // Retrieve a single task with id
    router.get("/:id", todoList.findOne);

    // Update a task with id
    router.put("/:id", todoList.update);

    // Delete a task with id
    router.delete("/:id", todoList.delete);

    // Delete all tasks
    router.delete("/", todoList.deleteAll);


    app.use('/api/todo-list', router);
};
