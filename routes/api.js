var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("default api route");
});

/* GET users API listing. */
router.get("/users", function(req, res, next) {
  // Here to check login

  let db = req.con;
  let data = "";
  let jsonData = req.body;
  let filerID = req.id;
  let sql = `
    SELECT
      *
    FROM
      users;
    `;

  db.query(sql, function(err, rows) {
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
  console.log(req.body);
  let jsonData = req.body;
  let first_name = jsonData.first_name;
  let last_name = jsonData.last_name;
  let email = jsonData.email;
  let is_manager = jsonData.is_manager;

  let sql = `
    INSERT INTO users 
      (first_name,
        last_name,
        email, 
        is_user_manager)
    VALUES 
      ('${first_name}',
        '${last_name}', 
        '${email}',
        '${is_manager}');`;

  let msg = "User posted";

  dbQuery(req, res, sql, msg);
});

// Patch(update) user API
router.patch("/users/:id", (req, res, next) => {
  console.log(req);
  let jsonData = req.body;
  let first_name = jsonData.first_name;
  let last_name = jsonData.last_name;
  let email = jsonData.email;
  let idFilter = jsonData.id;

  let sql = `
    UPDATE users
    SET first_name = '${first_name}', last_name = '${last_name}', email ='${email}' 
    WHERE id = ${req.params.id};
  `;
  let msg = "User updated";

  dbQuery(req, res, sql, msg);
});

// Delete user API
router.delete("/users/:id", (req, res, next) => {
  let jsonData = req.body;
  let deleteID = jsonData.id;

  let sql = `
    DELETE FROM users
    WHERE id = ${req.params.id};
  `;
  let msg = "User deleted";

  dbQuery(req, res, sql, msg);
});

// Put user API
router.put("/users/:id", (req, res, next) => {
  let jsonData = req.body;
  // let filerID = jsonData.id;
  let first_name = jsonData.first_name;
  let last_name = jsonData.last_name;
  let email = jsonData.email;
  let is_user_manager = jsonData.is_user_manager;
  console.log(jsonData);

  let sql = `
    UPDATE users
    SET first_name = '${first_name}',
        last_name = '${last_name}',
        email ='${email}',
        is_user_manager = ${is_user_manager}
    WHERE id = ${req.params.id};
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
