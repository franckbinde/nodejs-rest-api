// const express = require("express");
import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// Get all the posts

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// Add a new post

router.post("/", async (req, res) => {
  const { title, description, author } = req.body;

  const post = new Post({
    title,
    description,
    author
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

// Get a specific post

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});

// Delete a post
router.delete("/:postId", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.postId }, () => {
      res.send("Successfully deleted the post.");
    });
  } catch (error) {
    res.json({ message: error });
  }
});

// Update a post
router.patch("/:postId", async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title, author, description } }
    );
    res.send("Successfully updated the post.");
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;

// module.exports = router;
