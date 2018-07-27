const express = require("express");
const router = express.Router();

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
    errHandler(err);
    if (results[0].total === 0) {
      // res.redirect("/");
      // res.send("User Login failed, please try again.");
      res.status(401).end();
      return;
    }
    // res.cookie("first_name", getID, { maxAge: 900000, httpOnly: true });
    res.status(200).send("You have logined successfully");
  });
});

// Logout API
router.get("/logout", (req, res) => {
  res.clearCookie("first_name", { path: "/" });
  res.send("User cookie delete!");
});

// Error handler
function errHandler(err) {
  if (err) {
    throw err;
  }
}

module.exports = router;
