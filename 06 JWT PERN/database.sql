CREATE DATABASE auth;

CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);


INSERT INTO users (user_name, user_email, user_password) VALUES ("biswash", "biswash@gmail.com", "12345");