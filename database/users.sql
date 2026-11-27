-- Run once in phpMyAdmin: select restaurant_db, open the SQL tab, paste, click Go.
CREATE TABLE IF NOT EXISTS users (
  user_id      INT AUTO_INCREMENT PRIMARY KEY,
  google_id    VARCHAR(255) NOT NULL UNIQUE,
  email        VARCHAR(255) NOT NULL,
  name         VARCHAR(150),
  picture_url  VARCHAR(500),
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login   TIMESTAMP NULL
);