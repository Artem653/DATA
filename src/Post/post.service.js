const path = require('path');
const fs = require('fs/promises');

const postsPath = path.join(__dirname, '..', '..', 'posts.json');
console.log('Posts file path:', postsPath);

const PostService = {
    getAllPosts: async (skip = 0, take) => {
        try {
            console.log('Reading posts from:', postsPath);

            try {
                await fs.access(postsPath);
                console.log('Posts file exists');
            } catch (error) {
                console.error('Posts file does not exist:', postsPath);
                await fs.writeFile(postsPath, JSON.stringify([], null, 4));
                console.log('Created new posts file');
                return [];
            }

            const data = await fs.readFile(postsPath, 'utf-8');
            console.log('Raw data from file:', data);

            if (!data.trim()) {
                return [];
            }
            
            const posts = JSON.parse(data);
            console.log('Parsed posts:', posts);

            if (!take && skip) return posts.slice(skip);
            if (take && !skip) return posts.slice(0, take);
            if (take && skip) return posts.slice(skip, skip + take);

            return posts;
        } catch (error) {
            console.error('Error reading posts:', error);
            return [];
        }
    },

    getPostById: async (id) => {
        try {
            console.log('Getting post by ID:', id);
            
            const data = await fs.readFile(postsPath, 'utf-8');
            
            if (!data.trim()) {
                return null;
            }
            
            const posts = JSON.parse(data);
            const post = posts.find(p => p.id === id);
            
            console.log('Found post:', post);
            return post;
        } catch (error) {
            console.error('Error reading posts:', error);
            return null;
        }
    },

    createPost: async (postData) => {
        try {
            const data = await fs.readFile(postsPath, 'utf-8');
            let posts = [];
            
            if (data.trim()) {
                posts = JSON.parse(data);
            }

            const maxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;
            const newPost = {
                id: maxId + 1,
                ...postData,
                likes: postData.likes || 0
            };

            posts.push(newPost);
            await fs.writeFile(postsPath, JSON.stringify(posts, null, 4));

            return newPost;
        } catch (error) {
            console.error('Error creating post:', error);
            return null;
        }
    }
};

module.exports = PostService;