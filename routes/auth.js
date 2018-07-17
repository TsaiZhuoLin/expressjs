const express = require("express");
const router = express.Router();
const errMsgs = "Something went wrong, please try again";

/* GET users listing. */
router.get("/", (req, res) => {
  res.send("respond with a resource");
});

// Login API
router.post("/login", (req, res) => {
  let db = req.con;
  let jsonData = req.body;
  let getID = jsonData.user_id;
  let getPW = jsonData.user_pw;

  let sql = `
    SELECT COUNT(*) AS total
    FROM
      users
    WHERE
      first_name = '${getID}' AND
      password = '${getPW}';
  `;

  db.query(sql, (err, results) => {
    if (err) {
      errHandler(errMsgs, err, res);
      return;
    }

    if (results[0].total === 0) {
      return res.send("User Login failed, please try again.");
    } else {
      res.cookie("first_name", getID);
    }
    res.send("You have logined successfully");
  });
});

// Logout API
router.get("/logout", (req, res) => {
  res.clearCookie("first_name", { path: "/" });
  res.send("User cookie delete!");
});

// Error handler
function errHandler(errMsgs, err, res) {
  res.send([errMsgs, err]);
  res.end();
}

module.exports = router;
