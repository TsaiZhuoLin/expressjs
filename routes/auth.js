var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

// Login API
router.post("/login", (req, res, next) => {
  let db = req.con;
  let jsonData = req.body;
  let getID = jsonData.user_id;
  let getPW = jsonData.user_pw;
  // console.log(`this is getID : ${getID}`);
  // console.log(`this is getPW : ${getPW}`);
  let msg = "login successfully";
  // var data;

  let sql = `
    SELECT COUNT(*) AS total
    FROM
      users
    WHERE
      first_name = '${getID}' AND password = '${getPW}';
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    if (results[0].total === 0) {
      return;
    } else {
      res.cookie("first_name", getID);
    }
    console.log(results[0].total);
    // return results;
    res.json(msg);
  });
});

// function dbQuery(req, res, sql, msg) {
//   let db = req.con;
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     return results;
//     //res.json(msg);
//   });
// }

module.exports = router;
