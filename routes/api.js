const express = require("express");
const router = express.Router();
const crypto = require('crypto');

/* GET users API listing. */
router.get("/users", (req, res) => {
  // Here to check login
  // userCheck(req, res, () => {
  // if user has cookie then get all user data
  let db = req.con,
    getAllUsers = `
        SELECT
          id, first_name, last_name, email,
          date_format(created_time, '%Y-%m-%d %H:%i:%s') as created_time,
          date_format(updated_time, '%Y-%m-%d %H:%i:%s') as updated_time
          
        FROM
          users;
      `;

  db.query(getAllUsers, (err, rows) => {
    errHandler(err);
    let data = rows;
    res.json(data);
  });
  // });
});

// Create users API listing
router.post("/users", (req, res) => {
  // userCheck(req, res, () => {
  let db = req.con,
    jsonData = req.body,
    first_name = jsonData.first_name,
    last_name = jsonData.last_name,
    password = jsonData.password,
    email = jsonData.email,

    sql = `
        INSERT INTO users (
          first_name,
          last_name,
          password,
          email
        )
        VALUES (
          '${first_name}',
          '${last_name}',
          MD5('${password}'),
          '${email}'
        );
      `;

  db.query(sql, (err, results) => {
    if (!err) {
      res.send(results);
    } else {
      res.status(400);
      console.log(111, err)
      res.send("something is wrong!");
    }
    // errHandler(err);
    // res.send(results);
  });
  // });
});

// Patch(update) user API
router.patch("/users/:id", (req, res) => {
  userCheck(req, res, () => {
    let db = req.con,
      jsonData = req.body,
      first_name = jsonData.first_name,
      last_name = jsonData.last_name,
      email = jsonData.email,
      is_user_manager = jsonData.is_user_manager,
      sql = `
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
      errHandler(err);
      res.send("User has been updated");
    });
  });
});

/* GET one user API listing. */
router.get("/users/:id", (req, res) => {
  // Here to check login
  // userCheck(req, res, () => {
  // if user has cookie then get all user data
  let db = req.con,
    getUser = `
        SELECT
          *
        FROM
          users
        WHERE
          id = ${req.params.id};
      `;

  db.query(getUser, (err, rows) => {
    errHandler(err);
    let data = rows;
    // res.set("Access-Control-Allow-Origin", "*");
    res.json(data);
  });
  // });
});

// Edit user API
router.put("/users/:id", (req, res, next) => {
  // userCheck(req, res, () => {
  let db = req.con,
    jsonData = req.body,
    first_name = jsonData.first_name,
    last_name = jsonData.last_name,
    password = jsonData.password,
    email = jsonData.email,
    sqlWithPW = `
        UPDATE
          users
        SET
          first_name = '${first_name}',
          last_name = '${last_name}',
          password = MD5('${password}'),
          email ='${email}'
        WHERE
          id = ${req.params.id};
      `,
    sqlWithoutPW = `
        UPDATE
          users
        SET
          first_name = '${first_name}',
          last_name = '${last_name}',
          email ='${email}'
        WHERE
          id = ${req.params.id};
      `,
    sql = password === undefined ? sqlWithoutPW : sqlWithPW;

  db.query(sql, err => {
    errHandler(err);
    res.send("User data has been updated too");
  });

  // });
});

// Delete user API
router.delete("/users/:id", (req, res, next) => {
  // userCheck(req, res, () => {
  let db = req.con,
    sql = `
        DELETE FROM users
        WHERE id = ${req.params.id};
      `;

  db.query(sql, err => {
    errHandler(err);
    res.send("User has been deleted");
  });
  // });
});

// Error handler
function errHandler(err) {
  if (err) throw err;
}

// if (!err) {
//   res.send(results);
// } else {
//   res.status(400);
//   res.send("something is wrong!");
// }

// user login check
function userCheck(req, res, cb) {
  let getCookieUser = req.cookies.first_name;
  if (!getCookieUser) return res.send("Please Login").end();
  cb();
}

module.exports = router;
