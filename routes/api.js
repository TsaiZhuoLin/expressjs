var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("default api route");
});

/* GET users API listing. */
router.get("/users", function(req, res, next) {
  var db = req.con;
  var data = "";

  db.query("SELECT * FROM users", function(err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;

    // use index.ejs
    res.json(data);
  });
});

// POST users API listing
router.post("/users", (req, res, next) => {
  let sql = `INSERT INTO users (first_name, last_name, email, is_user_manager)
    VALUES ('Max', 'Tsai', 'max@max.com', 1);`;
  let msg = "User updated";

  dbQuery(req, res, sql, msg);
});

// Patch(update) user API
router.patch("/users", (req, res, next) => {
  let sql = `
    UPDATE users
    SET first_name = 'Jamie', last_name = 'Lannister', email='jamielannister@gameofthrones'
    WHERE id = 1;
  `;
  let msg = "User updated";

  dbQuery(req, res, sql, msg);
});

// Delete user API
router.delete("/users", (req, res, next) => {
  let sql = `
    DELETE FROM users
    WHERE id = 6;
  `;
  let msg = "User deleted";

  dbQuery(req, res, sql, msg);
});

// Put user API
router.put("/users", (req, res, next) => {
  let sql = `
    UPDATE users
    SET first_name = 'Steve', last_name = 'Rogers',
      email = 'steverogers@marvel.com', is_user_manager = 1
    WHERE id = 8;
  `;
  let msg = "User has been put";

  dbQuery(req, res, sql, msg);
});

function dbQuery(req, res, sql, msg) {
  let db = req.con;
  db.query(sql, err => {
    if (err) {
      console.log(err);
    }
    res.json(msg);
  });
}

module.exports = router;
