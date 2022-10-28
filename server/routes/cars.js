// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

const cars = require("../models/cars");

// define the car model
let car = require("../models/cars");

/* GET cars List page. READ */
router.get("/", (req, res, next) => {
  // find all cars in the cars collection
  car.find((err, cars) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("cars/index", {
        title: "Cars",
        cars: cars,
      });
    }
  });
});

//  GET the Car Details page in order to add a new Car
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   res.render("cars/add", { title: "Add New Car" });
});

// POST process the Car  Details page and create a new Car  - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

   let newcar = cars({
    Carname: req.body.Carname,
    Category: req.body.Category,
    Carmodel: req.body.Carmodel,
    Price: req.body.Price,
  });

  car.create(newcar, (err, cars) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the car-list
      res.redirect("/cars");
    }
  });
});

// GET the Car Details page in order to edit an existing Car
router.get("/edit/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id; //id of actual object

   cars.findById(id, (err, carstoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("cars/details", { title: "Edit Cars details", cars: carstoedit });
    }
  });

});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id; //id of actual object

   let updateCar = car({
     _id: id,
     Carname: req.body.Carname,
      Category: req.body.Category,
      Carmodel: req.body.Carmodel,
      Price: req.body.Price
   });
   car.updateOne({ _id: id }, updateCar, (err) => {
     if (err) {
       console.log(err);
       res.end(err);
     } else {
       //refresh the cars
       res.redirect("/cars");
     }
   });

});
  
  // GET - process the delete
  router.get("/delete/:price", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

   let price = req.params.price;

   car.remove(
    { Price: { $eq: price } }, 
    (err) => {
     if (err) {
       console.log(err);
       res.end(err);
     } else {
       //refresh car list
       res.redirect("/cars");
     }
   });

  });

module.exports = router;
