USE employee_db;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Marketing');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Manager', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Full-Stack Developer', 90000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 140000, 3),
    ('Accountant', 110000, 3),
    ('Marketing Coordinator', 100000, 4),
    ('Director of Marketing', 180000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Andrew', 'Popp', 1, NULL),
    ('Mikey', 'John', 2, 1),
    ('Susan', 'Banana', 3, NULL),
    ('Joey', 'Joseph', 4, 3),
    ('Mike', 'Jordan', 5, NULL),
    ('Kobe', 'Bryant', 6, 5),
    ('Lionel', 'Messi', 7, NULL),
    ('Kelsey', 'Allen', 8, 7);