-- INSERT INTO users (username, email, password_digest)
--  VALUES
--   ( 'Matt', 'mattg@gmail.com', 'ptest3')



INSERT INTO favorite_recipes (user_reference, recipe_id, recipe_name, recipe_url, img_link) VALUES

  (1, '562994', 'Char grilled beef', 'http://www.epicurious.com/recipes/food/views/Char-Grilled-Beef-Tenderloin-with-Three-Herb-Chimichurri-235342', 'https://spoonacular.com/recipeImages/char-grilled-beef-tenderloin-with-three-herb-chimichurri-156992.jpg');


INSERT INTO pantry_items ( user_reference, ingredient_name) VALUES

  (1, 'Tomatoe'),
  (1, 'Apple'),
  (1, 'Potatoe'),
  (1, 'Beef'),
  (1, 'Big Sausage');
