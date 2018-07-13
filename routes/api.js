var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("default api route");
});

/* GET users API listing. */
router.get("/users", function(req, res, next) {
  let db = req.con;
  let data = "";

  db.query("SELECT * FROM users", function(err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;

    // use index.ejs
    res.json(data);
    console.log(rows);
  });
});

// POST users API listing
router.post("/users", (req, res, next) => {
  console.log(22, req.body);
  var jsonData = req.body;
  var first_name = jsonData.first_name;
  var last_name = jsonData.last_name;
  var email = jsonData.email;
  var is_manager = jsonData.is_manager;
  console.log(11, jsonData);

  let sql =
    `INSERT INTO
                          users 
              (first_name,
                last_name,
                email, 
                is_user_manager)
            VALUES 
              ('` +
    first_name +
    `',
                '` +
    last_name +
    `', 
                '` +
    email +
    `',
                '` +
    is_manager +
    `');`;
  let msg = "User posted";

  dbQuery(req, res, sql, msg);
});

// Patch(update) user API
router.patch("/users", (req, res, next) => {
  let sql = `
    UPDATE users
    SET email='thorodinson@marvel.com'
    WHERE id = 10;
  `;
  let msg = "User updated";

  dbQuery(req, res, sql, msg);
});

// Delete user API
router.delete("/users", (req, res, next) => {
  let sql = `
    DELETE FROM users
    WHERE id = 5;
  `;
  let msg = "User deleted";

  dbQuery(req, res, sql, msg);
});

// Put user API
router.put("/users", (req, res, next) => {
  let sql = `
    UPDATE users
    SET first_name = 'Loki',email = 'lokiodinson@marvel.com'
    WHERE id = 10;
  `;
  let msg = "User has been put";

  dbQuery(req, res, sql, msg);
});

function dbQuery(req, res, sql, msg) {
  let db = req.con;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.json(msg);
    console.log(rows);
  });
}

module.exports = router;
