import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
});

export async function getBlogs(title?: string) {
  let sql = "SELECT * FROM blogs";
  const values = [];

  if (title) {
    sql += " WHERE title LIKE ?";
    values.push(`%${title}%`);
  }

  const [blogs] = await pool.query(sql, values);
  return blogs;
}

export async function getBlogById(id: number) {
  const [result] = await pool.query("SELECT * FROM blogs WHERE id = ?", [id]);
  const blog = (result as any[])[0];
  if (!blog) {
    throw new Error("Blog not found");
  }
  return blog;
}

export async function createBlog(title: string, contents: string) {
  const [result] = await pool.query(
    "INSERT INTO blogs (title, contents) VALUES (?, ?)",
    [title, contents]
  );
  const insertId = (result as mysql.ResultSetHeader).insertId;
  const newBlog = await getBlogById(insertId);
  if (!newBlog) {
    throw new Error("Failed to create blog");
  }
  return newBlog;
}

export async function updateBlog(id: number, title: string, contents: string) {
  const blog = await getBlogById(id);
  await pool.query("UPDATE blogs SET title = ?, contents = ? WHERE id = ?", [
    title ?? blog.title,
    contents ?? blog.contents,
    id,
  ]);
  const updatedBlog = await getBlogById(id);
  return updatedBlog;
}

export async function deleteBlog(id: number) {
  await getBlogById(id);
  await pool.query("DELETE FROM blogs WHERE id = ?", [id]);
  return { message: `blog with id ${id} deleted` };
}
