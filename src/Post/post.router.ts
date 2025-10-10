import express from "express";
import { PostController } from "./post.controller"; 

const router = express.Router();

router.get("/posts", PostController.getAllPosts);
router.get("/posts/:id", PostController.getPostById);
router.post("/posts", PostController.createPost);

export default router;