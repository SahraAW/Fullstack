DROP DATABASE IF EXISTS cafe_port;
CREATE DATABASE IF NOT EXISTS cafe_port;
use cafe_port;

CREATE TABLE cafes (
    cafe_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    wifi BOOLEAN DEFAULT FALSE,
    music VARCHAR(50),
    price_level ENUM('cheap', 'moderate', 'expensive'),
    has_food BOOLEAN DEFAULT FALSE,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    cafe_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (cafe_id) REFERENCES cafes(cafe_id) ON DELETE CASCADE
);

INSERT INTO cafes (name, city, wifi, price_level, has_food, latitude, longitude)
VALUES 
    ('Cafe Norden', 'Copenhagen', TRUE, 'expensive', TRUE, 55.6791, 12.5778),
    ('The Coffee Collective', 'Copenhagen', TRUE, 'moderate', TRUE, 55.6872, 12.5623),
    ('Paludan Bog & Café', 'Copenhagen', TRUE, 'cheap', TRUE, 55.6805, 12.5770),
    ('Atelier September', 'Copenhagen', TRUE, 'expensive', FALSE, 55.6803, 12.5858),
    ('Prolog Coffee Bar', 'Copenhagen', TRUE, 'moderate', FALSE, 55.6669, 12.5564),
    ('Democratic Coffee', 'Copenhagen', TRUE, 'moderate', TRUE, 55.6775, 12.5708),
    ('Sonny', 'Copenhagen', TRUE, 'expensive', TRUE, 55.6798, 12.5720),
    ('Rist Kaffebar', 'Copenhagen', TRUE, 'cheap', TRUE, 55.6804, 12.5638),
    ('Kaffekilden', 'Copenhagen', TRUE, 'cheap', FALSE, 55.6705, 12.5484),
    ('Original Coffee', 'Copenhagen', TRUE, 'moderate', TRUE, 55.6817, 12.5785),
    ('Kaffeplantagen', 'Copenhagen', TRUE, 'cheap', FALSE, 55.6857, 12.5613),
    ('Sweet Treat', 'Copenhagen', TRUE, 'moderate', TRUE, 55.6766, 12.5747),
    ('Cafe Dyrehaven', 'Copenhagen', TRUE, 'cheap', TRUE, 55.6627, 12.5568),
    ('Bastard Cafe', 'Copenhagen', TRUE, 'moderate', TRUE, 55.6732, 12.5686),
    ('Coffee Industry', 'Copenhagen', TRUE, 'expensive', TRUE, 55.6769, 12.5712),
    ('Kompa'' 9', 'Copenhagen', TRUE, 'cheap', TRUE, 55.6816, 12.5725),
    ('Tante T', 'Copenhagen', TRUE, 'moderate', FALSE, 55.6799, 12.5714),
    ('La Esquina', 'Copenhagen', TRUE, 'expensive', TRUE, 55.6787, 12.5741),
    ('Coffee Collective Jægersborggade', 'Copenhagen', TRUE, 'moderate', FALSE, 55.6918, 12.5554),
    ('Espresso House Nørreport', 'Copenhagen', TRUE, 'moderate', TRUE, 55.6837, 12.5712);

INSERT INTO users (username, email, password_hash)
VALUES 
    ('johndoe', 'johndoe@example.com', SHA2('password123', 256)),
    ('janedoe', 'janedoe@example.com', SHA2('securepass', 256)),
    ('alice', 'alice@example.com', SHA2('mypassword', 256)),
    ('bob', 'bob@example.com', SHA2('bobspassword', 256)),
    ('charlie', 'charlie@example.com', SHA2('charlie123', 256)),
    ('david', 'david@example.com', SHA2('davidssecret', 256)),
    ('eva', 'eva@example.com', SHA2('evapassword', 256)),
    ('frank', 'frank@example.com', SHA2('frankspass', 256)),
    ('grace', 'grace@example.com', SHA2('gracepass123', 256)),
    ('henry', 'henry@example.com', SHA2('henrypassword', 256)),
    ('mike', 'mike@example.com', SHA2('password123', 256)),
    ('sarah', 'sarah@example.com', SHA2('securepass', 256)),
    ('oliver', 'oliver@example.com', SHA2('mypassword', 256)),
    ('emily', 'emily@example.com', SHA2('emilypass123', 256)),
    ('liam', 'liam@example.com', SHA2('liampass', 256)),
    ('sophia', 'sophia@example.com', SHA2('sophiasecret', 256)),
    ('noah', 'noah@example.com', SHA2('noahspass', 256)),
    ('ava', 'ava@example.com', SHA2('avapassword', 256)),
    ('james', 'james@example.com', SHA2('jamespass123', 256)),
    ('mia', 'mia@example.com', SHA2('miapassword', 256)),
    ('william', 'william@example.com', SHA2('williampass', 256)),
    ('isabella', 'isabella@example.com', SHA2('isabellasecret', 256)),
    ('benjamin', 'benjamin@example.com', SHA2('benjaminpass', 256)),
    ('amelia', 'amelia@example.com', SHA2('ameliapassword', 256)),
    ('lucas', 'lucas@example.com', SHA2('lucassecret', 256)),
    ('harper', 'harper@example.com', SHA2('harperpass', 256)),
    ('evelyn', 'evelyn@example.com', SHA2('evelynpass123', 256)),
    ('alex', 'alex@example.com', SHA2('alexpass', 256)),
    ('ella', 'ella@example.com', SHA2('ellapassword', 256)),
    ('daniel', 'daniel@example.com', SHA2('danielpass', 256)),
    ('jackson', 'jackson@example.com', SHA2('jacksonpass', 256)),
    ('scarlett', 'scarlett@example.com', SHA2('scarlettpassword', 256)),
    ('sebastian', 'sebastian@example.com', SHA2('sebastianpass', 256)),
    ('zoe', 'zoe@example.com', SHA2('zoepassword', 256)),
    ('matthew', 'matthew@example.com', SHA2('matthewpass', 256)),
    ('victoria', 'victoria@example.com', SHA2('victoriapass123', 256)),
    ('lily', 'lily@example.com', SHA2('lilysecret', 256));

INSERT INTO favorites (user_id, cafe_id)
VALUES 
    (1, 2),  -- User 1 favorites Cafe 2
    (1, 5),  -- User 1 favorites Cafe 5
    (2, 3),  -- User 2 favorites Cafe 3
    (2, 7),  -- User 2 favorites Cafe 7
    (3, 1),  -- User 3 favorites Cafe 1
    (3, 4),  -- User 3 favorites Cafe 4
    (4, 2),  -- User 4 favorites Cafe 2
    (4, 6),  -- User 4 favorites Cafe 6
    (5, 3),  -- User 5 favorites Cafe 3
    (5, 8),  -- User 5 favorites Cafe 8
    (6, 9),  -- User 6 favorites Cafe 9
    (7, 2),  -- User 7 favorites Cafe 2
    (8, 10), -- User 8 favorites Cafe 10
    (9, 1),  -- User 9 favorites Cafe 1
    (9, 3),  -- User 9 favorites Cafe 3
    (10, 5); -- User 10 favorites Cafe 5
