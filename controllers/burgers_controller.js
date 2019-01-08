var express = require("express");

var router = express.Router();

var burger = require("../models/burger");

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

var burgerImgArray = [
    "assets/img/burger-4.jpg",
    "assets/img/burger-5.jpg",
    "assets/img/burger-6.jpg",
    "assets/img/burger-7.jpg",
    "assets/img/burger-8.jpg",
    "assets/img/burger-9.jpg",
    "assets/img/burger-10.jpg",
    "assets/img/burger-11.jpg",
    "assets/img/burger-12.jpg",
    "assets/img/burger-13.jpg",
    "assets/img/burger-14.jpg",
];

router.post("/api/burgers", function (req, res) {
    burger.insertOne([
        "burger_name", "img"
    ], [
            req.body.burger_name,
            burgerImgArray.shift()
        ], function (result) {
            res.json({ id: result.insertId });
        });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = `id = ${req.params.id}`;

    console.log(`condition`, condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changeRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


module.exports = router;