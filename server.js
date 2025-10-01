const express = require("express");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const app = express();
const PORT = 8001;

const productsPath = path.join(__dirname, "posts.json");
const posts = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

function getDate() {
  return moment().format("YYYY/MM/DD HH:mm:ss");
}

app.get("/timestamp", (req, res) => {
  res.json({ timestamp: getDate() });
});

app.get("/posts", (req, res) => {
  let { skip, take } = req.query;

  skip = Number(skip);
  take = Number(take);

  let result = posts;

  if (!isNaN(skip) && skip > 0) {
    result = result.slice(skip);
  }

  if (!isNaN(take) && take > 0) {
    result = result.slice(0, take);
  }

  res.json(result);
});

app.get("/posts/:id", (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(400).json("Id must be an Integer");
    return;
  }

  const post = posts.find((p) => p.id === id);

  if (!post) {
    res.status(404).json("Post not found");
    return;
  }

  res.status(200).json(post);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:8001`);
});