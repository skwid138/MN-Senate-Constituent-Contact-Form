-- ** Create Database ** --
-- Make sure database already exists or create it
-- CREATE DATABASE mn-senate;


-- ** Drop Foreign Key Contraints ** --
ALTER TABLE IF EXISTS constituents
    DROP CONSTRAINT IF EXISTS messages_fk;
ALTER TABLE IF EXISTS senators
    DROP CONSTRAINT IF EXISTS districts_fk;


-- ** Drop Tables** --
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS districts;
DROP TABLE IF EXISTS senators;
DROP TABLE IF EXISTS constituents;

-- ** Create Tables ** --

-- messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    message TEXT
);

--districts
CREATE TABLE districts (
    id SERIAL PRIMARY KEY,
    number INT
);

-- constituents
CREATE TABLE constituents (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(20),
    address_one VARCHAR(200),
    address_two VARCHAR(200),
    city VARCHAR(200),
    state_abbr VARCHAR(5),
    zip VARCHAR(10),
    messages_id INT
); 

-- senators
CREATE TABLE senators (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    districts_id INT
);


-- ** Add Foreign Key Constraints ** --

-- constituents foreign key
ALTER TABLE constituents
    ADD CONSTRAINT messages_fk
        FOREIGN KEY (messages_id)
        REFERENCES messages (id)
;

-- senators foreign key
ALTER TABLE senators
    ADD CONSTRAINT districts_fk
        FOREIGN KEY (districts_id)
        REFERENCES districts (id)
;

-- ** Insert Mock Data ** --