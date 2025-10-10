import { Request, Response } from "express";
import { PostService } from "./post.service";

export const PostController = {
    getAllPosts: async (req: Request, res: Response): Promise<void> => {
        try {
            const { skip, take } = req.query;

            // Проста перевірка - якщо передано параметр, але він не число
            if (skip && isNaN(Number(skip))) {
                res.status(400).json({ error: "Skip must be a number" });
                return;
            }

            if (take && isNaN(Number(take))) {
                res.status(400).json({ error: "Take must be a number" });
                return;
            }

            const skipNumber = skip ? Number(skip) : 0;
            const takeNumber = take ? Number(take) : undefined;

            const posts = await PostService.getAllPosts(skipNumber, takeNumber);
            res.status(200).json(posts);
        } catch (err) {
            res.status(500).json({ error: "Error loading posts" });
        }
    },

    getPostById: async (req: Request, res: Response): Promise<void> => {
        try {
            const idParam = req.params.id;
            const id = Number(idParam);

            if (isNaN(id)) {
                res.status(400).json({ error: "ID must be a number" });
                return;
            }

            const post = await PostService.getPostById(id);

            if (!post) {
                res.status(404).json({ error: "Post not found" });
                return;
            }

            res.status(200).json(post);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    },

    createPost: async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, description, image, likes } = req.body;

            if (!title) {
                res.status(422).json({ error: "Title is required" });
                return;
            }
            if (!description) {
                res.status(422).json({ error: "Description is required" });
                return;
            }
            if (!image) {
                res.status(422).json({ error: "Image is required" });
                return;
            }

            const newPost = await PostService.createPost({ title, description, image, likes });

            if (!newPost) {
                res.status(500).json({ error: "Failed to create post" });
                return;
            }

            res.status(201).json(newPost);
        } catch (err) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};