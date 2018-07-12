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

module.exports = router;
