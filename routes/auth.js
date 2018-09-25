const express = require("express");
const router = express.Router();

/* GET users listing. */
// router.get("/", (req, res) => {
//   res.send("respond with a resource");
// });

// Login API
router.post("/login", (req, res) => {
  let db = req.con,
    jsonData = req.body,
    getID = jsonData.user_id,
    getPW = jsonData.user_pw,
    sql = `
    SELECT
      id, COUNT(*) as total, first_name, last_name
    FROM
      users
    WHERE
      first_name = '${getID}'
      AND  password = MD5('${getPW}')
    GROUP BY
      id;
  `;

  db.query(sql, (err, results) => {
    errHandler(err);
    if (results[0] === 0) {
      res.send("User Login failed, please try again.");
      res.status(401).end();
      return;
    }
    res.cookie("user_name", `${results[0].first_name}_${results[0].last_name}`);
    res.send("You have logined!");
  });
});

// Logout API
router.get("/logout", (req, res) => {
  // res.clearCookie("first_name", { path: "/" });
  // res.clearCookie("last_name", { path: "/" });
  res.clearCookie("user_name");
  res.send("User cookie delete!");
});



// Error handler
function errHandler(err) {
  if (err) {
    throw err;
  }
}

module.exports = router;
