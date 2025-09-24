const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8001;

app.get("/posts", (req, res) => {
  const filePath = path.join(__dirname, "posts.json");
  const data = fs.readFileSync(filePath, "utf8"); 
  const posts = JSON.parse(data); 
  res.json(posts); 
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:8001`);
});