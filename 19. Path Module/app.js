import express from "express";
const app = express();
import path from "path";

import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Public folder to serve static files
app.use(express.static(path.join(__dirname , "public")));


app.get("/" , (req , res) => {
  const filePath = "/docs/js/webdev/express-js/19. Path Module/index.html";

  const baseName = path.basename(filePath);
  console.log("Base Name: " + baseName);
  const dirName = path.dirname(filePath);
  console.log("Directory Name: " + dirName);
  const extName = path.extname(filePath);
  console.log("Extension Name: " + extName);

  const parsedPath = path.parse(filePath);
  console.log(parsedPath);

  res.send("Check the console for path module output");
})

app.get("/full-path" , (req , res) => {
  const fullPath = path.join(__dirname , "public" , "index.html");
  console.log("Full Path: " + fullPath);
  res.send("Full Path logged to console");
})

app.get("/absolute-path" , (req , res) => {
  const absolutePath = path.resolve("public" , "index.html");
  console.log("Absolute Path: " + absolutePath);
  res.send("Absolute Path logged to console");
})

app.listen(3000 , () => {
    console.log("Server Running on port 3000")
});