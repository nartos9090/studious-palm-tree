CREATE TABLE IF NOT EXISTS class (
    `id` INT(2) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(5) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO class (`name`)
    VALUES
        ('1-A'),
        ('1-B'),
        ('1-C'),
        ('2-A'),
        ('2-B'),
        ('2-C'),
        ('3-A'),
        ('3-B'),
        ('3-C');

CREATE TABLE IF NOT EXISTS students (
    `id` INT(5) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `class_id` INT(2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (class_id) REFERENCES class(id)
);

CREATE TABLE IF NOT EXISTS payments (
    `id` INT(8) NOT NULL AUTO_INCREMENT,
    `student_id` INT(5) NOT NULL,
    `year` INT(4) NOT NULL,
    `month` INT(2) NOT NULL,
    `nominal` INT(10) NOT NULL,
    `paid` TINYINT(1) NOT NULL DEFAULT 0, 
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);