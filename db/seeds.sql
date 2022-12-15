INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales"),
       ("Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 100000, 1),
       ("Software Engineer", 80000, 1),
       ("Account Manager", 120000, 2),
       ("Accountant", 75000, 2),
       ("Legal Team Lead", 150000, 3),
       ("Lawyer", 90000, 3),
       ("Sales Lead", 80000, 4),
       ("Sales Person", 60000, 4),
       ("Customer Service", 50000, 5);   

INSERT INTO manager (mgrName)
VALUES ("R2-D2"),
       ("BB-8"),
       ("C-3PO"),
       ("D-O"),
       ("R5-D4");      

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luke", "Skywalker", 1, 1),
       ("Boba", "Fett", 2, 1),
       ("Han", "Solo", 2, 1),
       ("Darth", "Vader", 3, 2),
       ("Kylo", "Ren", 4, 2), 
       ("Lando", "Calrissian", 4, 2),
       ("Obi-Wan", "Kenobi", 5, 3),
       ("Jango", "Fett", 6, 3),
       ("Jabba The", "Hutt", 6, 3),
       ("Qui-Gon", "Jinn", 7, 4),
       ("Sheev", "Palpatine", 8, 4),
       ("Padme", "Amidala", 8, 4),
       ("Jar Jar", "Binks", 9, 5),
       ("Bo-Katan", "Kryze", 9, 5);
