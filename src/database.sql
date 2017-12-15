-- ** Create Database ** --
-- Make sure database already exists or create it
-- CREATE DATABASE mn-senate;


-- ** Drop Foreign Key Contraints



-- ** Drop Tables** --


-- ** Create Tables ** --

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

CREATE TABLE messages {
    id SERIAL PRIMARY KEY,
    message TEXT
};

CREATE TABLE districts {
    id SERIAL PRIMARY KEY,
    number INT
};

CREATE TABLE senators {
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    district_id
};

-- ** Add Foreign Key Constraints

-- constituents foreign keys
ALTER TABLE constituents
    ADD CONSTRAINT messages_fk
        FOREIGN KEY (messages_id)
        REFERENCES messages (id)