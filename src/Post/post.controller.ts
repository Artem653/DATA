import { Request, Response } from "express";
import { postService } from "./post.service";
import { PostControllerContract } from "./post.types";

export const postController: PostControllerContract = {
  getAll: async (_, res) => {
    const posts = await postService.getAll();
    res.json(posts);
  },

  getById: async (req, res) => {
    const id = Number(req.params.id);
    const post = await postService.getById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  },

  createPost: async (req, res) => {
    try {
      const newPost = await postService.createPost(req.body);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: "Error creating post" });
    }
  },

  updatePost: async (req, res) => {
    const id = Number(req.params.id);
    const updated = await postService.updatePost(id, req.body);
    if (!updated) return res.status(404).json({ message: "Post not found" });
    res.json(updated);
  },

  deletePost: async (req, res) => {
    const id = Number(req.params.id);
    const deleted = await postService.deletePost(id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    res.json(deleted);
  },
};