import express from "express";
import { PostRouter } from "./src/Post/post.router"; // named export

const app = express();
app.use(express.json());
app.use(PostRouter);

app.get("/timestamp", (_, res) => {
  res.json({ timestamp: new Date().toISOString() });
});

const HOST = "localhost"
const PORT = 8001


app.listen(PORT, HOST, ()=> {
    console.log("Server is running on http://localhost:8001")
})