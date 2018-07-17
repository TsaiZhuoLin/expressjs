const express = require("express");
const router = express.Router();

const errMsgs = "Something went wrong, please try again";

/* GET users listing. */
router.get("/", function(req, res) {
  res.send("default api route");
});

/* GET users API listing. */
router.get("/users", function(req, res) {
  // Here to check login
  let getCookieUser = req.cookies.first_name;

  if (!getCookieUser) {
    res.send("Please Login");
    res.end();
    return;
  }

  let db = req.con;
  let getAllUsers = `
    SELECT
      *
    FROM
      users;
  `;
  db.query(getAllUsers, (err, rows) => {
    if (err) {
      errHandler(errMsgs, err, res);
      return;
    }
    var data = rows;
    res.json(data);
  });
});

// POST users API listing
router.post("/users", (req, res, next) => {
  // check user if login or not
  let getCookieUser = req.cookies.first_name;
  if (!getCookieUser) {
    res.send("Please Login");
    res.end();
    return;
  }

  let db = req.con;
  let jsonData = req.body;
  let first_name = jsonData.first_name;
  let last_name = jsonData.last_name;
  let email = jsonData.email;
  let is_manager = jsonData.is_user_manager;
  let msg = "New User has bee created";
  let sql = `
    INSERT INTO users (
      first_name,
      last_name,
      email, 
      is_user_manager
    )
    VALUES (
      '${first_name}',
      '${last_name}', 
      '${email}',
      '${is_manager}'
    );
  `;

  db.query(sql, err => {
    if (err) {
      errHandler(errMsgs, err, res);
      return;
    }
    res.send(msg);
  });
});

// Patch(update) user API
router.patch("/users/:id", (req, res, next) => {
  // check user if login or not
  let getCookieUser = req.cookies.first_name;
  if (!getCookieUser) {
    res.send("Please Login");
    res.end();
    return;
  }

  let db = req.con;
  let jsonData = req.body;
  let first_name = jsonData.first_name;
  let last_name = jsonData.last_name;
  let email = jsonData.email;
  let is_user_manager = jsonData.is_user_manager;
  let sql = `
    UPDATE
      users
    SET
      first_name = '${first_name}',
      last_name = '${last_name}',
      email ='${email}',
      is_user_manager = ${is_user_manager}
    WHERE
      id = ${req.params.id};
  `;

  db.query(sql, err => {
    if (err) {
      errHandler(errMsgs, err, res);
      return;
    }
    res.send("User has been updated");
  });
});

// Delete user API
router.delete("/users/:id", (req, res, next) => {
  // check user if login or not
  let getCookieUser = req.cookies.first_name;
  if (!getCookieUser) {
    res.send("Please Login");
    res.end();
    return;
  }
  let db = req.con;
  let sql = `
    DELETE FROM users
    WHERE id = ${req.params.id};
  `;

  db.query(sql, err => {
    if (err) {
      errHandler(errMsgs, err, res);
      return;
    }
    res.send("User has been deleted");
  });
});

// Put user API
router.put("/users/:id", (req, res, next) => {
  // check user if login or not
  let getCookieUser = req.cookies.first_name;

  if (!getCookieUser) {
    res.send("Please Login");
    res.end();
    return;
  }

  let db = req.con;
  let jsonData = req.body;
  let first_name = jsonData.first_name;
  let last_name = jsonData.last_name;
  let password = jsonData.password;
  let email = jsonData.email;
  let is_user_manager = jsonData.is_user_manager;
  let sql = `
    UPDATE
      users
    SET
      first_name = '${first_name}',
      last_name = '${last_name}',
      password = '${password}',
      email ='${email}',
      is_user_manager = ${is_user_manager}
    WHERE
      id = ${req.params.id};
  `;

  db.query(sql, err => {
    if (err) {
      errHandler(errMsgs, err, res);
      return;
    }
    res.send("User data has been updated");
  });
});

function errHandler(errMsgs, err, res) {
  res.send([errMsgs, err]);
  res.end();
}

module.exports = router;
