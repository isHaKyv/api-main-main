const sql = require("./db.js");

// Constructor
const TodoList = function(task) {
  this.title = task.title;
  this.isCompleted = task.isCompleted;
};

TodoList.create = (newTask, result) => {
  sql.query("INSERT INTO todo_list SET ?", newTask, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created task: ", { id: res.insertId, ...newTask });
    result(null, { id: res.insertId, ...newTask });
  });
};

TodoList.findById = (id, result) => {
  sql.query(`SELECT * FROM todo_list WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found task: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found tasks with the id
    result({ kind: "not_found" }, null);
  });
};

TodoList.getAll = result => {
  sql.query("SELECT * FROM todo_list", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tasks: ", res);
    result(null, res);
  });
};

TodoList.updateById = (id, result) => {
  sql.query(
    "UPDATE todo_list SET isCompleted = 1 WHERE id = ?",
    [id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found tasks with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated task: ", { id: id});
      result(null, { id: id});
    }
  );
};

TodoList.remove = (id, result) => {
  sql.query("DELETE FROM todo_list WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found tasks with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted task with id: ", id);
    result(null, res);
  });
};

TodoList.removeAll = result => {
  sql.query("DELETE FROM todo_list", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tasks`);
    result(null, res);
  });
};

TodoList.completas = result => {
    sql.query("SELECT * FROM todo_list where isCompleted = 1", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("tasks: ", res);
        result(null, res);
      });
    };

module.exports = TodoList;
