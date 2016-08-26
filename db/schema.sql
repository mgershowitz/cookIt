DROP TABLE IF EXISTS favorite_recipes;
DROP TABLE if EXISTS users CASCADE;

CREATE TABLE users (
  user_id SERIAL unique PRIMARY KEY,
  username VARCHAR(50) unique,
  email VARCHAR(255) unique not null,
  password_digest TEXT not null,
  user_created TIMESTAMP not null DEFAULT now()
);
CREATE INDEX on users (username) ;
CREATE INDEX on users (email) ;



CREATE TABLE favorite_recipes (
favorites_id SERIAL PRIMARY KEY NOT NULL,
user_reference INTEGER REFERENCES users(user_id) NOT NULL,
recipe_id INT NOT NULL,
recipe_name TEXT,
recipe_url VARCHAR NOT NULL,
img_link TEXT NOT NULL
);


DROP TABLE IF EXISTS pantry_items;
CREATE TABLE pantry_items (
items_id SERIAL PRIMARY KEY NOT NULL,
user_reference INTEGER REFERENCES users(user_id) NOT NULL,
ingredient_name TEXT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT now()
);
