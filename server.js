const express = require('express');
const app = express();

app.use(express.json());

const path = require('path');
const fsPromises = require('fs/promises');
const fs = require('fs');

const HOST = "localhost";
const PORT = 8001;
const postsPath = path.join(__dirname, "posts.json");

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

app.get('/', (req, res) => {
    res.json('Hello world');
});

app.get('/posts', (req, res) => {
    let { skip, take } = req.query;

    skip = Number(skip);
    take = Number(take);

    let result = posts;

    if (!isNaN(skip) && skip > 0) result = result.slice(skip);
    if (!isNaN(take) && take > 0) result = result.slice(0, take);

    res.json(result);
});

app.get('/posts/:id', (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        res.status(400).json("Id must be an Integer");
        return;
    }

    const post = posts.find(p => p.id === id);
    if (!post) {
        res.status(404).json("Post not found");
        return;
    }

    res.json(post);
});

app.post('/posts', async (req, res) => {
    const body = req.body;

    if (!body) {
        res.status(422).json('Body is required!');
        return;
    }

    const newPost = { ...body, id: posts.length };

    if (!newPost.title) {
        res.status(422).json('Title is required!');
        return;
    }
    if (!newPost.description) {
        res.status(422).json('Description is required!');
        return;
    }
    if (!newPost.image) {
        res.status(422).json('Image is required!');
        return;
    }

    try {
        posts.push(newPost);
        await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 4));
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json("Post creation failed");
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://localhost:8001`);
});