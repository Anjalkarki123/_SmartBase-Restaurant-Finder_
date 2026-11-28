-- Restaurants each user has saved.
-- Run once in phpMyAdmin after users.sql: select restaurant_db, open the SQL tab, paste, and click Go.
-- The primary key (user_id, restaurant_id) stops the same restaurant being saved twice by one user.

CREATE TABLE IF NOT EXISTS saved_restaurants (
  user_id        INT NOT NULL,
  restaurant_id  VARCHAR(20) NOT NULL,
  saved_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, restaurant_id),
  CONSTRAINT saved_user_fk FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON DELETE CASCADE,
  CONSTRAINT saved_restaurant_fk FOREIGN KEY (restaurant_id)
    REFERENCES restaurant (restaurant_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;