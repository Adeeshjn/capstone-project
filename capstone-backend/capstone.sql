create DATABASE IF NOT EXISTS `Capstone`;
use `Capstone`;
CREATE TABLE IF NOT EXISTS `Users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `uname` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `role` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS Coupons (
    id int(11) NOT NULL AUTO_INCREMENT,
    user_id int(11) NOT NULL KEY,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    `discount` varchar(500) NOT NULL,
    `code` varchar(255) NOT NULL,
    `expiry` date NOT NULL,
    PRIMARY KEY (`id`)
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) on delete cascade
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8;

