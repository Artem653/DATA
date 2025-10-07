const express = require('express');
const PostRouter = require('./src/Post/post.router'); 

const app = express();
app.use(express.json());

app.use(PostRouter);

app.get('/timestamp', (req, res) => {
    const now = new Date().toISOString();
    res.status(200).json({ timestamp: now });
});

const PORT = 8001;
const HOST = 'localhost';


app.listen(PORT, HOST, () => {
    console.log(`Server running at http://localhost:8001`);
});