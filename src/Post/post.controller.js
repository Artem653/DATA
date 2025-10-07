const PostService = require('./post.service');

const PostController = {
    getAllPosts: async (req, res) => {
        try {
            console.log('GET /posts query:', req.query); // Лог запиту
            
            const { skip, take } = req.query;

            if (skip !== undefined && isNaN(+skip)) {
                res.status(400).json({ error: "Skip must be a number" })
                return;
            }

            if (take !== undefined && isNaN(+take)) {
                res.status(400).json({ error: "Take must be a number" })
                return;
            }

            const posts = await PostService.getAllPosts(+skip, +take);
            console.log('Sending posts:', posts); // Лог перед відправкою
            
            res.status(200).json(posts);
        } catch (err) {
            console.error('Error in getAllPosts:', err);
            res.status(500).json({ error: "Error loading posts" });
        }
    },

    getPostById: async (req, res) => {
        try {
            console.log('GET /posts/:id params:', req.params); // Лог
            
            const id = +req.params.id;

            if (isNaN(id)) {
                res.status(400).json({ error: "ID must be a number" })
                return;
            }

            const post = await PostService.getPostById(id);

            if (!post) {
                res.status(404).json({ error: "Post not found" })
                return;
            }

            res.status(200).json(post);
        } catch (err) {
            console.error('Error in getPostById:', err);
            res.status(500).json({ error: "Server error" });
        }
    },

    createPost: async (req, res) => {
        try {
            const { title, description, image, likes } = req.body;

            if (!title) {
                res.status(422).json({ error: "Title is required" })
                return;
            }
            if (!description) {
                res.status(422).json({ error: "Description is required" })
                return;
            }
            if (!image) {
                res.status(422).json({ error: "Image is required" })
                return;
            }

            const newPost = await PostService.createPost({ title, description, image, likes });

            if (!newPost) {
                res.status(500).json({ error: "Failed to create post" })
                return;
            }

            res.status(201).json(newPost);
        } catch (err) {
            console.error('Error in createPost:', err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = PostController;