DELETE FROM verification_tokens;
DELETE FROM account;
-- SELECT * FROM account;
-- CREATE TABLE verification_tokens (
--     id SERIAL PRIMARY KEY,
--     email VARCHAR(255) NOT NULL,
--     token VARCHAR(255) NOT NULL,
--     used BOOLEAN DEFAULT false
-- );
-- CREATE TABLE adver_owner(
--     user_id SERIAL NOT NULL,
--     ad_id SERIAL NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES account(user_id),
--     FOREIGN KEY (ad_id) REFERENCES advert(ad_id)
-- );
-- CREATE TABLE favorites (
--     user_id SERIAL,
--     ad_id SERIAL,
--     FOREIGN KEY (user_id) REFERENCES "user" (user_id),
--     FOREIGN KEY (ad_id) REFERENCES advert (ad_id)
-- );
-- CREATE TABLE "advert"(
--     ad_id SERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     desc_id SERIAL NOT NULL,
--     cat_id SERIAL NOT NULL,
--     FOREIGN KEY (desc_id) REFERENCES description(desc_id),
--     FOREIGN KEY (cat_id) REFERENCES categories(cat_id)
-- );
-- CREATE TABLE "description"(
--     desc_id SERIAL PRIMARY KEY,
--     ad_date DATE NOT NULL,
--     price NUMERIC(10, 2),
--     ad_status BOOLEAN NOT NULL,
--     details VARCHAR(500) NOT NULL,
--     photo_id SERIAL NOT NULL,
--     FOREIGN KEY (photo_id) REFERENCES photos(photo_id)
-- );
-- CREATE TABLE "photos"(
--     photo_id SERIAL PRIMARY KEY,
--     photo_0 BYTEA NOT NULL,
--     photo_1 BYTEA,
--     photo_2 BYTEA,
--     photo_3 BYTEA
-- );
-- CREATE TABLE "categories"(
--     cat_id SERIAL PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     parent_cat_id SERIAL,
--     FOREIGN KEY (parent_cat_id) REFERENCES categories(cat_id)
-- );
-- CREATE TABLE account(
--     user_id SERIAL PRIMARY KEY,
--     name VARCHAR(30) NOT NULL,
--     surname VARCHAR(35) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     passwrd VARCHAR(255) NOT NULL
-- );