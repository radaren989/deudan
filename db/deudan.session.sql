DROP VIEW IF EXISTS advert_list_view;
-- Recreate the view with the new column
CREATE VIEW advert_list_view AS
SELECT ad.ad_id AS advert_id,
    ad.title AS advert_title,
    dc.price AS price,
    dc.details AS details,
    ph.photo_0 AS photo,
    categories.name AS category,
    dc.ad_date AS ad_date,
    ac.name AS user_name,
    ac.surname AS user_surname,
    ac.user_id AS user_id
FROM advert ad
    JOIN "description" dc ON ad.desc_id = dc.desc_id
    JOIN photos ph ON dc.photo_id = ph.photo_id
    JOIN advert_owner ac_o ON ad.ad_id = ac_o.ad_id
    JOIN account ac ON ac_o.user_id = ac.user_id
    JOIN categories ON ad.cat_id = categories.cat_id;
-- CREATE VIEW advert_view AS
-- SELECT
--     ad.ad_id AS advert_id,
--     ad.title AS advert_title,
--     dc.price AS price,
--     dc.details AS details,
--     ph.photo_0 AS photo_0,
--     ph.photo_1 AS photo_1,
--     ph.photo_2 AS photo_2,
--     ph.photo_3 AS photo_3,
--     categories.name AS category,
--     dc.ad_date AS ad_date,
--     ac.email AS user_email
-- FROM
--     advert ad
-- JOIN
--     "description" dc ON ad.desc_id = dc.desc_id
-- JOIN
--     photos ph ON dc.photo_id = ph.photo_id
-- JOIN
--     advert_owner ac_o ON ad.ad_id = ac_o.ad_id
-- JOIN
--     account ac ON ac_o.user_id = ac.user_id
-- JOIN
--     categories ON ad.cat_id = categories.cat_id;
-- SELECT * FROM advert_list_view;
-- -- Drop the existing view
-- CREATE TABLE "categories"(
--     cat_id SERIAL PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
-- );
-- Replace with your actual category column and table
-- DELETE FROM verification_tokens;
-- DELETE FROM account;
-- SELECT * FROM account;
-- CREATE TABLE verification_tokens (
--     id SERIAL PRIMARY KEY,
--     email VARCHAR(255) NOT NULL,
--     token VARCHAR(255) NOT NULL,
--     used BOOLEAN DEFAULT false
-- );
-- CREATE TABLE advert_owner(
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
--     ad_status BOOLEAN NOT NULL DEFAULT TRUE,
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
-- CREATE TABLE account(
--     user_id SERIAL PRIMARY KEY,
--     name VARCHAR(30) NOT NULL,
--     surname VARCHAR(35) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     passwrd VARCHAR(255) NOT NULL
-- );