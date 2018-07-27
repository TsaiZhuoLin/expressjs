const express = require("express");
const router = express.Router();

/* GET users listing. */
// router.get("/", function(req, res) {
//   res.send("default api route");
// });

/* GET users API listing. */
router.get("/users", (req, res) => {
  // res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  // res.set("Access-Control-Allow-Credentials", true);
  // console.log("Cookies: ", req.cookies);
  // Here to check login
  //userCheck(req, res, () => {
  // if user has cookie then get all user data
  let db = req.con,
    getAllUsers = `
        SELECT
          *
        FROM
          users;
      `;

  db.query(getAllUsers, (err, rows) => {
    errHandler(err);
    let data = rows;
    res.json(data);
  });
  //});
});

// POST users API listing
router.post("/users", (req, res) => {
  // userCheck(req, res, () => {
  console.log(333, req.body);
  let db = req.con,
    jsonData = req.body,
    first_name = jsonData.first_name,
    last_name = jsonData.last_name,
    password = jsonData.password,
    email = jsonData.email,
    is_manager = jsonData.is_manager,
    sql = `
        INSERT INTO users (
          first_name,
          last_name,
          password,
          email,
          is_manager
        )
        VALUES (
          '${first_name}',
          '${last_name}',
          '${password}',
          '${email}',
          '${is_manager}'
        );
      `;

  db.query(sql, (err, results) => {
    if (!err) {
      res.send(results);
    } else {
      res.status(400);
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

/* GET users API listing. */
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

// Put user API
router.put("/users/:id", (req, res, next) => {
  // userCheck(req, res, () => {
  let db = req.con,
    jsonData = req.body,
    first_name = jsonData.first_name,
    last_name = jsonData.last_name,
    password = jsonData.password,
    email = jsonData.email,
    is_manager = jsonData.is_manager,
    sql = `
        UPDATE
          users
        SET
          first_name = '${first_name}',
          last_name = '${last_name}',
          password = '${password}',
          email ='${email}',
          is_manager = ${is_manager}
        WHERE
          id = ${req.params.id};
      `;

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
