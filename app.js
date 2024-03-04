const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/todo');

const trySchema =  new mongoose.Schema({
    name : {type: String, required: [true, 'Enter name of fruit']}, //this means that the field "name" must be of type string
});

const item = mongoose.model("task", trySchema);

//todo.save();
app.get("/", async (req, res) => {
    try {
      const foundItems = await item.find({});
      res.render("list", { tasks: foundItems });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error finding items");
    }
  });

  app.post("/", async (req, res) => {
    const itemName = req.body.e1e1.trim();
  
    if (!itemName) {
      // Return an error message if the item name is empty
      return res.status(400).send("Item name is required.");
    }
  
    try {
      const todo = new item({ name: itemName });
      await todo.save();
      res.redirect("/");
    } catch (err) {
      // Return an error message if there's a database error
      return res.status(500).send("Error saving item to database.");
    }
  });
app.listen("8000", function(){
    console.log("Server is running");
});


