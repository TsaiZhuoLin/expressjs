var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  var db = req.con;
  var data = "";

  db.query("SELECT * FROM users", function (err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;

    // use index.ejs
    res.render("index", { title: "Users Information", data: data });
  });

  //res.render('index', { title: 'Express' });
});

module.exports = router;
