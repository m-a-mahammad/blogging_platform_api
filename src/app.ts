import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./database.js";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/blogs", async (req: Request, res: Response) => {
  const title = req.query.title;
  const blogs = await getBlogs(title as string | undefined);
  res.json(blogs);
});

app.get("/blogs/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "");
  if (!id || id <= 0 || isNaN(id)) {
    res.status(400).json({ error: "Blog ID must be a valid number" });
    return;
  }
  const blog = await getBlogById(id);
  res.json(blog);
});

app.post("/blogs", async (req: Request, res: Response) => {
  const { title, contents } = req.body;
  const newBlog = await createBlog(title, contents);
  res.status(201).json(newBlog);
});

app.put("/blogs/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "");
  const { title, contents } = req.body;
  if (!id || id <= 0 || isNaN(id)) {
    res.status(400).json({ error: "Blog ID must be a valid number" });
    return;
  }
  const updatedBlog = await updateBlog(id, title, contents);
  res.json(updatedBlog);
});

app.delete("/blogs/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "");
  if (!id || id <= 0 || isNaN(id)) {
    res.status(400).json({ error: "Blog ID must be a valid number" });
    return;
  }
  await deleteBlog(id);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
