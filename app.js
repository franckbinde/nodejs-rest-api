// const express = require("express");
import express from "express";
// const mongoose = require("mongoose");
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
// require("dotenv/config");
import "dotenv/config.js";
import postsRoute from "./routes/posts.js";

//requiring path and fs modules
import path from "path";
import fs from "fs";
//joining path of directory
var results;
const directoryPath = "target";
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  var filenames = [];
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    // console.log(file);
    filenames.push(file);
  });
  console.log(filenames);
  results = filenames;
});

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use("/posts", postsRoute);

// ROUTES
app.get("/", (req, res) => {
  res.send("We are on the homepage");
});

app.get("/target", (req, res) => {
  res.send(results);
});

// Connect To DB
const CONNECTION_URL = process.env.DB_CONNECTION;

mongoose.connect(
  CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to the db...")
);

// How to start listening to the server

app.listen(3000, () => console.log("Server running on port 3000"));
