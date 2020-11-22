# SQL

### Some of The Most Important SQL Commands
* CREATE DATABASE - creates a new database
* ALTER DATABASE - modifies a database
* INSERT INTO - inserts new data into a database

* CREATE TABLE - creates a new table
* ALTER TABLE - modifies a table
* DROP TABLE - deletes a table

* SELECT - extracts data from a database
* UPDATE - updates data in a database
* DELETE - deletes data from a database

* CREATE INDEX - creates an index (search key)
* DROP INDEX - deletes an index

---
## Data Query Language
* It is used to extract the data from the relations. e.g.; SELECT
* A generic query to retrieve from a relational database is:
* Part of the query represented by statement 1 is compulsory

``` sql
SELECT [DISTINCT] Attribute_List FROM R1,R2….RM
[WHERE condition]
[GROUP BY (Attributes)[HAVING condition]]
[ORDER BY(Attributes)[DESC]];
```
---
## Basic SQL Queries

### COUNT Queries

Count no of employees working in dept 'IT'
```sql
SELECT Conut(*) FROM Employees WHERE dept_name='IT';
```

---
### FIND Queries

Find details of employees whose salary is in between 10000 50000
```sql
SELECT * FROM Employees WHERE salary BETWEEN 10000 AND 50000;
```
---
### LIKE Queris (REGEX)

Find Names of employees starting with a
```sql
SELECT first_name FROM Employees WHERE first_name LIKE 'A%';
/* Here % means null or any no for characters */
```

Find details of employees whose first_name end in 'A' and has 6 letters
```sql
SELECT first_name FROM Employees WHERE first_name LIKE '_____A';
/* Here _ means exactly one characters */
```
---
### UPDATE Queries

Increase income of all employees by 5%
```sql
UPDATE Employees SET income = income + (income * 5/100);
```

---
## Complex SQL commands
Query an alphabetically ordered list of all names in OCCUPATIONS, immediately followed by the first letter of each profession as a parenthetical (i.e.: enclosed in parentheses)
For example: AnActorName(A), ADoctorName(D), AProfessorName(P), and ASingerName(S). Eg Ariel(A) Samantha(D)
```sql
select CONCAT(Name,"(",LEFT(Occupation,1),")") from Occupations order by name;
```

Query the number of ocurrences of each occupation in OCCUPATIONS. Sort the occurrences in ascending order, and output them in the following format: There are total 2 doctors
```sql
select CONCAT("There are total ", Count(Occupation), " ", LOWER(occupation), "s.") from Occupations Group by Occupation order by  Count(Occupation)
```

---
### Examples on a Table

```sql
show tables;
```
```
SELECT * FROM Sales GROUP BY SalesPerson;
```

```sql
SELECT AVG(no_page) FROM book_mast;
```

```sql
SELECT MAX(Yearly_Income) AS `Maximum Income`
FROM customerdetails;
```
```sql
select name from employee where salary>2000 and months<10 order by employee_id;
```

Above SQL Query will group the Customers by their Education, and finds the highest Income in each group
```sql
SELECT  Education, MAX(Yearly_Income) FROM customerdetails GROUP BY Education;
```

Store MySQL query results in another Table
```sql
CREATE TABLE a SELECT SalesPerson,AVG(TotalSale) as b FROM Sales GROUP BY SalesPerson;
select * from a
select MAX(b) from a;
```
---

## Leetcode Problems

* Second highest salary from the Employee table
  ``` sql
  Create table If Not Exists Employee (Id int, Salary int)
  Truncate table Employee
  insert into Employee (Id, Salary) values ('1', '100')
  insert into Employee (Id, Salary) values ('2', '200')
  insert into Employee (Id, Salary) values ('3', '300')
  ```
  Given the above Employee table, the query should return 200 as the second highest salary. If there is no second highest salary, then the query should return null.
  ``` sql
  +---------------------+   
  | SecondHighestSalary |   
  +---------------------+   
  | 200                 |   
  +---------------------+   
  ```

  ``` sql
  /* To get the Higest Salary */
  SELECT MAX(Salary) AS HighestSalary FROM Employee;
  /* Sort salary in descend order and then utilize the OFFSET clause to get second highest and LIMIT clause to get one result */
  SELECT Salary AS SecondHighestSalary FROM Employee ORDER BY Salary DESC LIMIT 1 OFFSET 1
  /* To Handle one or no records use IFNULL, To Handle Duplicates use  DISTINCT*/
  SELECT IFNULL((SELECT DISTINCT Salary FROM Employee ORDER BY Salary DESC LIMIT 1 OFFSET 1), NULL) AS SecondHighestSalary;
  ```

* Employees Earning More Than Their Managers
  ``` sql
  +----+-------+--------+-----------+
  | Id | Name  | Salary | ManagerId |
  +----+-------+--------+-----------+
  | 1  | Joe   | 70000  | 3         |
  | 2  | Henry | 80000  | 4         |
  | 3  | Sam   | 60000  | NULL      |
  | 4  | Max   | 90000  | NULL      |
  +----+-------+--------+-----------+
  ```

  ``` sql
  SELECT a.Name AS 'Employee'
  FROM Employee AS a,Employee AS b
  WHERE a.ManagerId = b.Id AND a.Salary > b.Salary;
  ```

  ``` sql
  /* Using JOIN */
  SELECT a.Name AS 'Employee' FROM Employee AS a
  JOIN Employee as b
  ON a.ManagerId = b.id
  WHERE a.Salary > b.Salary;
  ```

* Customers Who Never Order
  ``` sql
  /* Customers */
  +----+-------+
  | Id | Name  |
  +----+-------+
  | 1  | Joe   |
  | 2  | Henry |
  | 3  | Sam   |
  | 4  | Max   |
  +----+-------+

  /* Orders */
  +----+------------+
  | Id | CustomerId |
  +----+------------+
  | 1  | 3          |
  | 2  | 1          |
  +----+------------+
  ```
  
  ``` sql
  SELECT * FROM Customers WHERE Id NOT IN (SELECT CustomerId FROM Orders); 

  SELECT Name As 'Customers' FROM Customers WHERE Id NOT IN (SELECT CustomerId FROM Orders);
  ```

* 