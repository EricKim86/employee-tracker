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

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Luke", "Skywalker", 1),
       ("Boba", "Fett", 2),
       ("Darth", "Vader", 3),
       ("Kylo", "Ren", 3),
       ("Obi-Wan", "Kenobi", 2);
