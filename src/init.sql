CREATE DATABASE blogging_platform_api;
USE blogging_platform_api;

CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO blogs (title, contents) VALUES
('First Blog Post', 'This is the content of the first blog post.'),
('Second Blog Post', 'This is the content of the second blog post.');