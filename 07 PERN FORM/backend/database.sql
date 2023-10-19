CREATE DATABASE formHandle;

CREATE TABLE users(
  id VARCHAR(255) PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255),
  age INTEGER,
  gender VARCHAR(7),
  framework VARCHAR(7)
);