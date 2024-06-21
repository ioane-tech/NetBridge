
--------------------------------------------create tables
--@block
CREATE TABLE IF NOT EXISTS community (
    id INT AUTO_INCREMENT NOT NULL,
    fullName VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    profileImg LONGBLOB,
    coverImg LONGBLOB,
    PRIMARY KEY (id)
);

--@block
CREATE TABLE IF NOT EXISTS friends (
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES community(id),
    FOREIGN KEY (friend_id) REFERENCES community(id),
    PRIMARY KEY (user_id, friend_id)
);

--@block
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT NOT NULL,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES community(id),
    FOREIGN KEY (receiver_id) REFERENCES community(id),
    PRIMARY KEY (id)
);



------------------------------------------select  tables

--@block
SELECT * from community

--@block
SELECT * from friends

--@block
SELECT * from messages



-----------------------------------------insert tables
--@block
INSERT INTO community(fullName, password)
VALUES (
    "ioane Turmanidze",
    SHA2('ioturman1234$',256)
)

--@block 
DELETE from  community;

--@block 
ALTER TABLE community AUTO_INCREMENT = 1;