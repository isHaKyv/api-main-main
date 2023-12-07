const TodoList = require("../models/todoList.model.js");

// Create and Save a new task
exports.create = (req, res) => {
    // Validate request
    if (!req.body || !req.body.title) {
      res.status(400).send({
        message: "Title cannot be empty!",
      });
      return;
    }
  
    // Create a task
    const task = new TodoList({
      title: req.body.title,
      isCompleted: req.body.isCompleted || false, // Assuming terminado is a boolean, default to false if not provided
    });
  
    // Save the task in the database
    TodoList.create(task, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the task.",
        });
      } else {
        res.send(data);
      }
    });
  };

// Retrieve all tasks from the database
exports.findAll = (req, res) => {
  TodoList.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    else res.send(data);
  });
};

// Find a single task by Id
exports.findOne = (req, res) => {
  TodoList.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving task with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a task identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  TodoList.updateById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating task with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a task with the specified id in the request
exports.delete = (req, res) => {
  TodoList.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete task with id " + req.params.id,
        });
      }
    } else res.send({ message: `Task was deleted successfully!` });
  });
};

// Delete all tasks from the database.
exports.deleteAll = (req, res) => {
  TodoList.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tasks.",
      });
    else res.send({ message: `All tasks were deleted successfully!` });
  });
};


exports.completas=(req, res) => {
    TodoList.completas((err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving tasks.",
          });
        else res.send(data);
      });
    };