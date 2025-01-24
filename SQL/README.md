# SQL

## Table of Contents

- [Data Query Language](#data-query-language)
- [SQL Queries](#sql-queries)
  - [COUNT Queries](#count-queries)
  - [FIND Queries](#find-queries)
  - [LIKE Queries (REGEX)](#like-queries-regex)
  - [UPDATE Queries](#update-queries)
  - [UPDATE multiple rows with different values in one query](#update-multiple-rows-with-different-values-in-one-query)
  - [Examples on a Table](#examples-on-a-table)
- [Leetcode Problems](#leetcode-problems)
  - [Second highest salary from the Employee table](#second-highest-salary-from-the-employee-table)
  - [Employees Earning More Than Their Managers](#employees-earning-more-than-their-managers)
  - [Customers Who Never Order](#customers-who-never-order)
- [Concepts](#concepts)
  - [Indexes](#indexes)
  - [Composite Indexes](#composite-indexes)
  - [Soft delete vs Hard delete](#soft-delete-vs-hard-delete)
  - [RAW Datatype](#raw-datatype)
  - [INSTR Function](#instr-function)
  - [HAVING Clause](#having-clause)
  - [Control Flow in SQL (CASE Statement)](#control-flow-in-sql-case-statement)
  - [Routines and Triggers](#routines-and-triggers)
- [SQL Joins](#sql-joins)
  - [Cross Join](#cross-join)
- [SQL vs NoSQL Implementation differences](#sql-vs-nosql-implementation-differences)
- [SQL Language Components](#sql-language-components)
  - [TCL (Transaction Control Language)](#tcl-transaction-control-language)
  - [DML (Data Manipulation Language)](#dml-data-manipulation-language)
  - [DDL (Data Definition Language)](#ddl-data-definition-language)
  - [DELETE vs DROP vs TRUNCATE](#delete-vs-drop-vs-truncate)
- [Can you not scale SQL databases?](../Databases/README.md#can-you-not-scale-sql-databases)
- [PostgreSQL](./PostgreSQL.md)

<br/>
<br/>
<br/>

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
## SQL Queries

### COUNT Queries

Count no of employees working in dept 'IT'
```sql
SELECT Conut(*) FROM Employees WHERE dept_name='IT';
```


### FIND Queries

Find details of employees whose salary is in between 10000 50000
```sql
SELECT * FROM Employees WHERE salary BETWEEN 10000 AND 50000;
```

### LIKE Queries (REGEX)

Find Names of employees starting with a
```sql
SELECT first_name FROM Employees WHERE first_name LIKE 'A%';
/* Here % means null or any number of characters */
```

Find details of employees whose first_name end in 'A' and has 6 letters
```sql
SELECT first_name FROM Employees WHERE first_name LIKE '_____A';
/* Here _ means exactly one characters */
```

### UPDATE Queries

Increase income of all employees by 5%
```sql
UPDATE Employees SET income = income + (income * 5/100);
```

Query an alphabetically ordered list of all names in OCCUPATIONS, immediately followed by the first letter of each profession as a parenthetical (i.e.: enclosed in parentheses)
For example: AnActorName(A), ADoctorName(D), AProfessorName(P), and ASingerName(S). Eg Ariel(A) Samantha(D)
```sql
select CONCAT(Name,"(",LEFT(Occupation,1),")") from Occupations order by name;
```

Query the number of ocurrences of each occupation in OCCUPATIONS. Sort the occurrences in ascending order, and output them in the following format: There are total 2 doctors
```sql
select CONCAT("There are total ", Count(Occupation), " ", LOWER(occupation), "s.") from Occupations Group by Occupation order by  Count(Occupation)
```

### UPDATE multiple rows with different values in one query

```sql
UPDATE table SET Col1 = CASE id 
                WHEN 1 THEN 1 
                WHEN 2 THEN 2 
                WHEN 4 THEN 10 
                ELSE Col1 
              END, 
        Col2 = CASE id 
                WHEN 3 THEN 3 
                WHEN 4 THEN 12 
                ELSE Col2 
              END
    WHERE id IN (1, 2, 3, 4);
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

### Second highest salary from the Employee table
  ``` sql
  Create table If Not Exists Employee (Id int, Salary int)
  Truncate table Employee
  insert into Employee (Id, Salary) values ('1', '100')
  insert into Employee (Id, Salary) values ('2', '200')
  insert into Employee (Id, Salary) values ('3', '300')

  Employee table:
  +----+--------+
  | id | salary |
  +----+--------+
  | 1  | 100    |
  | 2  | 200    |
  | 3  | 300    |
  +----+--------+
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

### Employees Earning More Than Their Managers
  ``` sql
  Employee table:
  +----+-------+--------+-----------+
  | Id | Name  | Salary | ManagerId |
  +----+-------+--------+-----------+
  | 1  | Joe   | 70000  | 3         |
  | 2  | Henry | 80000  | 4         |
  | 3  | Sam   | 60000  | NULL      |
  | 4  | Max   | 90000  | NULL      |
  +----+-------+--------+-----------+
  ```

  Write a solution to find the employees who earn more than their managers.
  Return the result table in any order.

  ```sql
  Output: 
  +----------+
  | Employee |
  +----------+
  | Joe      |
  +----------+
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

### Customers Who Never Order
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
  Write a solution to find all customers who never order anything.
  Return the result table in any order.

  ```sql
  Output: 
  +-----------+
  | Customers |
  +-----------+
  | Henry     |
  | Max       |
  +-----------+
  ```

  ``` sql
  SELECT * FROM Customers WHERE Id NOT IN (SELECT CustomerId FROM Orders); 

  SELECT Name As 'Customers' FROM Customers WHERE Id NOT IN (SELECT CustomerId FROM Orders);
  ```

### 

--- 

## Concepts 

### Indexes 
https://user3141592.medium.com/single-vs-composite-indexes-in-relational-databases-58d0eb045cbe

An index, or more specifically, an index on a column is an additional data structure of the table’s records sorted (typically via b-tree) only on that column. 
Each record in the index also includes a pointer to the original record in the table, 
such that finding records in the index is equivalent to finding records in the original table.

For example, suppose we had the following users table.

```sql
ID | first_name | last_name    | Class      | Position |  ssn | 
---------------------------------------------------------------
 1 | Teemo      | Shroomer     | Specialist | Top      | 2345 |
 2 | Cecil      | Heimerdinger | Specialist | Mid      | 5461 |
 3 | Annie      | Hastur       | Mage       | Mid      | 8784 |
```

If we create an index on users.first_name, CREATE INDEX first_name_index ON users (first_name) USING BTREE;

it would create a sorting of the users by their first_name with a pointer to their primary key, something like this:
Annie    -> 3
Cecil    -> 2
Teemo    -> 1

Then a query like
```sql
SELECT * FROM users WHERE first_name = 'Teemo';
```
would take only O(log_2(n)) // reads since the database can perform a binary search on this index, since it is sorted by first_name
 
O(n) to O(log base 2 (n))


Disadvantages of index
1. Additional storage space to store indexes
2. Indexes also need to be updated when state-changing queries like CREATE UPDATE and DELETE are made
As such, adding unnecessary indexes can actually degrade performance overall

<br/>

### Composite Indexes

In SQL databases, a composite index, also known as a compound index or multi-column index, is an index that involves more than one column in the index key. Unlike a single-column index that indexes only one column of a table, a composite index includes multiple columns.   
This type of index is beneficial when queries involve conditions or sorting based on multiple columns.   

**Interview question:**    
If i have an composite index on A-B-C-D, while fetching A-B will the composite index work, what about B-C-D?   
When you have a composite index on multiple columns (A-B-C-D), the effectiveness of the index in supporting queries depends on how the columns are used in the query conditions.   

* Queries that involve the leftmost columns of the composite index can efficiently use the index.   
  This includes queries on A, A-B, A-B-C, or A-B-C-D.

* Equality and range queries on the indexed columns can effectively use the composite index.   
  A query with conditions like A = value or A = value AND B > value2 can utilize the composite index.

* Queries involving sorting or grouping on the leftmost columns of the index can benefit from the index.   
  A query with ORDER BY A or GROUP BY A may leverage the composite index.

However, queries that involve columns beyond the leftmost part of the index may not fully benefit from the composite index

* If you have a query condition on B-C-D but not on A, the composite index (A-B-C-D) may not be as effective for that specific query. However, it could still be beneficial if the query involves a range condition or sorting on B.    
The decision on whether to use the composite index or perform a full table scan depends on the database's query optimizer. Modern database engines use sophisticated optimization strategies to determine the most efficient execution plan for a given query.



<br/>
<br/>

### Soft delete vs Hard delete

```
Soft deletes: marking data as deleted
Hard deletes: performing a DELETE on a table
```

Soft delete - implemented by adding a Boolean column 'deleted' in the DB and a timestamp of when it was “deleted”

### RAW Datatype:

- RAW datatype can store unstructured data in a column.
- Stores variable-length binary data that can be queried and inserted but not manipulated. Maximum length is 32767 bytes.

### INSTR Function:
- Searches the string for a substring and returns the numeric value of the specified character's first occurrence.

### HAVING Clause:
- Similar to WHERE clause but is used for groups rather than rows.

### Control Flow in SQL (CASE Statement)
- A control flow function that allows writing if-else or if-then-else logic in a SQL query. Validates various conditions and shows the output when the first condition is true, stopping the traversal. If no condition is true, it executes the else block, showing a null value if the else block is not found.

### Routines and Triggers:
- **Routines:** Group of multiple commands that can be called whenever required (also known as subroutines).
- **Triggers:** Special type of stored procedure containing SQL statements fired automatically whenever any database event occurs, residing in the system catalog.

---

## SQL Joins

<img src="https://i.stack.imgur.com/4zjxm.png" width="75%">

* **JOIN is same as INNER JOIN**
* We can also use LEFT OUTER JOIN instead of LEFT JOIN, both are same.
* RIGHT JOIN is also known as RIGHT OUTER JOIN

### Cross Join
* CROSS JOIN is used to generate a paired combination of each row of the first table with each row of the second table. This join type is also known as cartesian join
* The Cartesian Product is a multiplication operation in the set theory that generates all ordered pairs of the given sets. Suppose that, A is a set and elements are {a,b} and B is a set and elements are {1,2,3}. The Cartesian Product of these two A and B is denoted AxB and the result will be like the following.
* **Unlike the INNER JOIN, LEFT JOIN and FULL OUTER JOIN, the CROSS JOIN does not require a joining condition.**
* The SQL queries which contain the CROSS JOIN keyword can be **very costly**. We try to say that these queries have a high potential to consume more resources and can cause performance issues. 
* CROSS JOIN are implemented with **Nested Loops**,
* When WHERE condition is used, **this type of JOIN behaves as an INNER JOIN**, and when the WHERE condition is not present, it behaves like a CARTESIAN product
* syntax 
```sql
SELECT ColumnName_1, 
       ColumnName_2, 
       ColumnName_N
FROM [Table_1]
     CROSS JOIN [Table_2]

SELECT ColumnName_1, 
       ColumnName_2, 
       ColumnName_N
FROM [Table_1],[Table_2]
```

* What is a Natural Join and in which situations is a natural join used


```sql
-- create a table
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  name TEXT,
  customer_id INTEGER
);
CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  name TEXT
);

-- insert some values
INSERT INTO orders VALUES (1, 'one', 5);
INSERT INTO orders VALUES (2, 'two', 10);
INSERT INTO orders VALUES (3, 'three', 15);
INSERT INTO orders VALUES (4, 'four', 50);
INSERT INTO orders VALUES (5, 'five', 60);
INSERT INTO orders VALUES (6, 'six', 100);
INSERT INTO customers VALUES (5, 'mayur');
INSERT INTO customers VALUES (10, 'pooja');
INSERT INTO customers VALUES (15, 'bhai');
INSERT INTO customers VALUES (20, 'jay');
INSERT INTO customers VALUES (25, 'sumeet');

-- fetch some values
SELECT * FROM orders left join customers on orders.customer_id = customers.customer_id;
SELECT * FROM orders right join customers on orders.customer_id = customers.customer_id;
SELECT * FROM orders inner join customers on orders.customer_id = customers.customer_id;
SELECT * FROM orders full outer join customers on orders.customer_id = customers.customer_id;
SELECT * FROM orders left join customers on orders.customer_id = customers.customer_id where customers.customer_id is null;
SELECT * FROM orders right join customers on orders.customer_id = customers.customer_id where orders.customer_id is null;
SELECT * FROM orders full outer join customers on orders.customer_id = customers.customer_id where customers.customer_id is null or orders.customer_id is null;

```

</br>
</br>

---

## SQL vs NoSQL Implementation differences

### GroupBy
* In short - groupBy in mongo returns array of objects, group by in SQL returns first matching row
* In MongoDB, when you group by a field (e.g., customerId), you usually use the $group aggregation stage.    
This allows you to define how to aggregate the grouped data. For instance, you can collect all loans for a customer into an array or apply other aggregation functions
* This query returns all loans associated with each customerId, aggregated into an array
```mongo
db.loans.aggregate([
  {
    $group: {
      _id: "$customerId",
      loans: { $push: "$loanDetails" } // Collect all loans in an array
    }
  }
]);
```
* In SQL, GROUP BY is often used in conjunction with aggregate functions like SUM, COUNT, MAX, or MIN. However, if you don't use these explicitly and instead select columns not included in the GROUP BY, SQL usually picks the first row encountered for non-aggregated columns, which depends on the query's execution plan and is not guaranteed to be consistent unless explicitly defined.
* This would not work in strict SQL modes since loanDetails isn't part of the GROUP BY. If it does work, the database typically picks the loanDetails from the first row encountered for each customerId.
```sql
SELECT customerId, loanDetails
FROM loans
GROUP BY customerId;
```
* To mimic MongoDB's behavior in SQL (e.g., getting all loans per customer), you'd use GROUP_CONCAT (MySQL) or a similar function
This aggregates all loans for a customerId into a single string, separated by commas (or another delimiter).
```sql
SELECT customerId, GROUP_CONCAT(loanDetails) AS loans
FROM loans
GROUP BY customerId;
```

</br>
</br>

---

## SQL Language Components

### TCL (Transaction Control Language)

Transaction Control Language commands manages transactions within a database.   
It includes commands such as COMMIT, ROLLBACK, and SAVEPOINT to control the outcome of transactions by either making changes permanent (COMMIT), undoing changes (ROLLBACK), or establishing points within a transaction for potential rollbacks (SAVEPOINT).   
TCL commands ensure the consistency and integrity of data within a database during transactional processing.
   
      
TCL stands for Transaction Control Commands used for managing the changes made by DML commands like INSERT, DELETE, and UPDATE. The TCL commands are automatically committed in the database; that's why we cannot use them directly while creating tables or dropping them


* COMMIT Statement:   
Ends the current transaction and makes all changes performed in the transaction permanent.

* ROLLBACK Statement:   
Backs out or cancels the current transaction changes and restores changed data to its previous state.

* SAVEPOINT:   
Establishes a point within a transaction to which you can later roll back.

### DML (Data Manipulation Language)

* DML (Data Manipulation Language) commands are responsible for manipulating the data stored in the database.   
* Primarily used to interact with and manage the data stored in database tables.   
* They include operations such as SELECT, INSERT, UPDATE, and DELETE.
* Transaction Control - Typically used within transactions that can be committed or rolled back.

Note : A DML statement is not executed in the case of table deletion.   
DML statements are used to access and manipulate data in an existing table.

### DDL (Data Definition Language)

* DDL (Data Definition Language) commands are used to define, manage, and control the structure of the database. They involve operations that impact the schema and structure of the database.   
* Employed to define and manage the structure of the database, including tables, indexes, constraints, etc.  
* They include operations such as CREATE, ALTER, DROP
* Transaction Control - Often implicitly commits the transaction and may not be rolled back in some database systems.

### DELETE vs DROP vs TRUNCATE

DELETE:
- DML COMMAND
- Deletes rows from the table one by one
- Can use WHERE clause with DELETE to delete a single row
- Slower than TRUNCATE
- ROLLBACK is possible with DELETE

DROP:
- DDL COMMAND
- Deletes the entire structure or schema (Irrevocably removes the entire table and its associated structure)
- Cannot use WHERE clause with DROP
- Slower than DELETE & TRUNCATE
- ROLLBACK IS NOT POSSIBLE WITH DROP
- Frees up storage space immediately, Usually used cautiously, as it leads to permanent data loss

TRUNCATE:
- DDL COMMAND
- Deletes rows at one go
- Cannot use WHERE clause with Truncate
- Faster than both DELETE & DROP (because it doesn't log individual row deletions)
- Transaction-specific and can be rolled back
- Truncate statement removes all data from the table and frees the table's space
- DELETE statement removes all data but does not free the table's space

Summary
- Use DELETE when you need to selectively remove specific rows from a table.
- Use DROP when you want to permanently remove a table or other database object.
- Use TRUNCATE when you want to remove all rows from a table without deleting the table itself, and speed is crucial, especially for large datasets.
- Always exercise caution, especially with DROP, as it permanently removes data and structures, and the action cannot be undone. Always make sure to have backups before performing irreversible operations.

---



<!-- ## SQL queries dump

///////// sequlize 
https://stackoverflow.com/questions/35445849/sequelize-findone-latest-entry
https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm


// javascript array as a list of strings (preserving quotes)

var arr = ['item1','item2','item3','item4'];

var quotedAndCommaSeparated = "'" + arr.join("','") + "'";

// quotedAndCommaSeparated === "'item1','item2','item3','item4'"

// conversions

comma-separated string to an array
var array = string.split(',');



// update multiple rows 
update doctor_schedule set order_placed=1 where id in (${source_ids.join(',')})




//////// drawbacks
* ids are sequential, if i get one (1160) next ones can be predicted (1161,1162,1163)
in mongo its a 16 digit unique id
* arrays, objects,json not saved....save as '4,5,6,7' and '{a:b,c:d}'
* 

https://www.imaginarycloud.com/blog/mongodb-vs-mysql/




////////// FIND most common entries

// day on which most appointments were booked
SELECT *, COUNT(appointment_date) as mydate
FROM `doctor_schedule`
GROUP BY appointment_date
ORDER BY mydate DESC
LIMIT 1

// 2021-02-19, 2020-09-14, 2020-10-30

select * from doctor_schedule where appointment_date="2021-02-19".  // 53 entries
select * from doctor_schedule where appointment_date="2020-09-14".  // 32 entries



///////// Find rows that have the same value on a column in MySQL
// no unique constraint was set on this column. Now I need to find these rows and see if they should be removed

// This query will give you a list of email addresses and how many times they're used, with the most used addresses first.

SELECT email,
       count(*) AS c
FROM TABLE
GROUP BY email
HAVING c > 1
ORDER BY c DESC

// If you want the full rows:

select * from table where email in (
    select email from table
    group by email having count(*) > 1
)


select * from doctor_products where pid in (select pid from doctor_products group by pid having count(*) > 1)







///////////////////////////////////// QUERIES /////////////////////////////////////////

select cd.duration,a.doctor_id,a.doctor_name, b.appointment_date,b.nps_score,b.nps_irrelevant,b.on_time,b.reschedule_sent,b.prescription_generated,b.image_uploaded,b.image_upload_requested,b.from_time,b.to_time,b.email,b.phone,b.brand,b.id,b.category,b.source,b.confirmed,b.cancelled,b.prescription_order_ids,b.slot_start_time,b.slot_end_time,b.status,b.order_placed
case
  when source='performance_form' then 'SH'
  when source='hair_form' then 'HC'
  when source='order' then 'OF'
  when source='F' then 'F'
  when source='O' then 'O'
  when source='FU' then 'FU'
  ELSE source
  end as source,

  b.source_id,b.patient_name,
  b.status,
  b.prescription_order_ids,
  b.form_order_placed,b.order_id,
  case
  when rescheduled=1 then 'Priority'
  when rescheduled=0 then 'Normal'
  end as Rescheduled,
  b.schedule_token
  from doctor as a
  inner join
  doctor_schedule as b
  on a.doctor_id = b.doctor_id
  left join call_details as cd 
  on b.id= cd.appointment_id
  WHERE
  b.appointment_date between '2021-02-04' and '2021-02-04'
  and b. delete_flag = 0
  and a.doctor_id in (1,2,3,4,5,6,7,32,33,34,35,36)
  order by b.appointment_date,b.from_time,b.id;



////////////////////


UPDATE doctor_schedule set order_placed=1 where id ='1580'
select * from prescription where source_id='1582'
select prescription_id,pdf_key,source,source_id from prescription where patient_email ='pooja.patel@mosaicwellness.com' or patient_phone='8149878029' and created_dttm BETWEEN NOW() - INTERVAL 180 DAY AND NOW() order by prescription_id desc




SELECT * FROM doctor_schedule WHERE id IN ('1547', '1546')


SELECT * FROM prescription WHERE created_dttm between '2021-02-09 10:07:51'
SELECT CONVERT(date, GETDATE())
SELECT GETDATE();
SELECT CURRENT_TIMESTAMP;
SELECT CURDATE()
select NOW()
SELECT * FROM prescription WHERE created_dttm BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND NOW();
SELECT source,mail_sent FROM prescription WHERE (created_dttm BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND DATE_SUB(NOW(), INTERVAL 2 DAY)) AND source <> 'O' AND mail_sent <> 'no' ;




SELECT * from prescription,doctor_schedule where prescription.source_id=doctor_schedule.id
AND (prescription.created_dttm BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND DATE_SUB(NOW(), INTERVAL 2 DAY))
AND prescription.source <> 'O'
AND doctor_schedule.order_placed = '1'
AND prescription.mail_sent <> 'no';  


SELECT prescription_id from prescription,doctor_schedule where prescription.source_id=doctor_schedule.id
AND (prescription.created_dttm BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND DATE_SUB(NOW(), INTERVAL 2 DAY))
AND prescription.source <> 'O'
AND doctor_schedule.order_placed = '0'
AND prescription.mail_sent <> 'no';  

select * from doctor_schedule where id in (select source_id from prescription where prescription_id in (1696,1699,1705,1706,1708,1711,1720,1722,1723,1724,1725,1730,1734,1735,1737))

UPDATE doctor_schedule SET order_placed = '0' WHERE id in (select source_id from prescription where prescription_id in (1696,1699,1705,1706,1708,1711,1720,1722,1723,1724,1725,1730,1734,1735,1737))



SELECT DISTINCT prescription.source_id,prescription_id,prescription.patient_name,patient_email,patient_phone,mail_sent,prescription.source,order_placed,doctor_name,doctor_email from prescription,doctor_schedule,doctor where prescription.source_id=doctor_schedule.id AND prescription.doctor_id=doctor.doctor_id
  AND (prescription.created_dttm BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND DATE_SUB(NOW(), INTERVAL 2 DAY))
  AND prescription.source <> 'O'
  AND doctor_schedule.order_placed = '0'
  AND prescription.mail_sent <> 'no';


SELECT DISTINCT prescription.source_id,prescription_id,prescription.patient_name,patient_email,patient_phone,mail_sent,prescription.source,order_placed,doctor_name,doctor_email
FROM prescription,doctor_schedule,doctor
WHERE prescription.source_id=doctor_schedule.id AND prescription.doctor_id=doctor.doctor_id
AND (prescription.created_dttm BETWEEN DATE_SUB(NOW(), INTERVAL 4 DAY) AND DATE_SUB(NOW(), INTERVAL 3 DAY))
AND prescription.source <> 'O'
AND doctor_schedule.order_placed = '0'
AND prescription.mail_sent <> 'no'
GROUP BY prescription.source_id;


select prescription_items.prescription_items_id,prescription_items.prescription_id,prescription_items.product_id,prescription_items.product_name,prescription_items.unit,prescription_items.no_of_days,prescription_items.quantity,prescription_items.cart_quantity,prescription_items.fulfilled,prescription_items.invalidated,prescription_items.order_id from prescription_items,doctor_schedule,prescription
WHERE prescription_items.prescription_id=prescription.prescription_id AND prescription.source_id=doctor_schedule.id
AND doctor_schedule.brand = "MM"
AND prescription_items.prescription_id in ('1696','1708')






//////////

select count(doctor_id) from doctor_schedule where doctor_id=3

select appointment_date,id,duration,source from doctor_schedule where doctor_id=3 order by created_dttm desc

select appointment_date,id,duration,source from doctor_schedule where doctor_id=3 and source="F" order by created_dttm desc


select a.doctor_name, b.doctor_consulted, b.nps_score, b.source, b.brand, b.nps_irrelevant, b.duration,b.id from doctor as a 
      inner join
      doctor_schedule as b
      on a.doctor_id = b.doctor_consulted
      where b.appointment_date between '2021-01-01' and '2021-02-19' and b.doctor_consulted=2;
      
      
select * from doctor_schedule where appointment_date > NOW() AND phone = 9619550147 ORDER BY appointment_date DESC LIMIT 1

select * from doctor_schedule where phone =9619550147 

select * from doctor_schedule where appointment_date > "2021-02-19 12:43:16" AND phone = 9619550147 ORDER BY appointment_date DESC LIMIT 1

select * from doctor_schedule where appointment_date >= "2021-02-19" AND from_time>"12:43:16" AND phone = 9619550147




select * from prescription_remarks where created_dttm >="2020-05-19 00:00:00" AND created_dttm <="2020-05-19 23:55:55" 




SELECT *
FROM prescription_remarks,doctor_schedule
WHERE prescription_remarks.doctor_schedule_id=doctor_schedule.id



SELECT prescription_remarks.created_dttm,prescription_remarks.id,prescription_remarks.doctor_schedule_id,doctor_schedule.id
FROM prescription_remarks,doctor_schedule
WHERE prescription_remarks.doctor_schedule_id=doctor_schedule.id



SELECT *  FROM prescription_remarks,doctor_schedule WHERE prescription_remarks.doctor_schedule_id=doctor_schedule.id AND prescription_remarks.created_dttm >="2021-02-06 00:00:00" AND prescription_remarks.created_dttm <="2021-02-19 23:55:55" 


SELECT prescription_remarks.created_dttm,prescription_remarks.id,prescription_remarks.doctor_schedule_id,doctor_schedule.id,doctor_schedule.appointment_date,doctor_schedule.brand
FROM prescription_remarks,doctor_schedule
WHERE prescription_remarks.doctor_schedule_id=doctor_schedule.id
AND prescription_remarks.created_dttm >="2021-02-19 00:00:00" AND prescription_remarks.created_dttm <="2021-02-19 23:55:55" 
AND appointment_date < "2021-02-19 00:00:00"
GROUP by doctor_schedule_id


/////// create table

doctor_on_time with columns doctor_id,appointment_id,appointmen_date,on_time,brand

CREATE TABLE doctor_on_time (
  id int(11) NOT NULL,
  doctor_id int(11),
  appointment_id int(11),
  appointmen_date DATE,
  on_time TINYINT(2),
  brand TEXT,
  PRIMARY KEY (id)
);


SELECT * FROM doctor_schedule 
WHERE id="10199" AND doctor_id = "2" AND appointment_date = "2021-02-19"


SELECT * FROM doctor_on_time WHERE appointment_id="${appointment_details["id"]}"
AND doctor_id = "${appointment_details["doctor_id"]}" AND appointment_date = "${appointment_details["appointment_date"]}"


insert into doctor_on_time (doctor_id,appointment_id,appointmen_date,on_time,brand) values("2","1008","2021-02-19","0","MM")


insert into doctor_on_time (doctor_id,appointment_id,appointmen_date,on_time,brand) values("5","10202","2021-02-22","-1","BW")


and a.doctor_id in (${doctor_id_requested.join(",")})



SELECT doctor_id,appointment_date,brand,phone,id,source,status FROM doctor_schedule WHERE id="10090" 

select * from doctor_schedule where phone = "8149878029"

INSERT INTO prescription_remarks(doctor_schedule_id, doctor_id, status, remarks) VALUES (10090,3,"rs","Appointment rescheduled")

select * from prescription_remarks



SELECT * FROM doctor_schedule WHERE id="10214" 
AND doctor_id = "2" AND appointment_date = "2021-02-19"

SELECT doctor_id,appointment_date,brand,phone,id,source,status FROM doctor_schedule WHERE id="10090" 

select * from doctor_schedule where phone = "8149878029"

INSERT INTO prescription_remarks(doctor_schedule_id, doctor_id, status, remarks) VALUES (10090,3,"rs","Appointment rescheduled")

select * from prescription_remarks

select * from doctor_schedule where id="10219"

select * from prescription where source_id="10219"

select * from doctor where doctor_id="3"


SELECT * FROM doctor_on_time WHERE appointment_id="${appointment_details["id"]}" AND doctor_id = "${appointment_details["doctor_id"]}" AND appointment_date = "${appointment_details["appointment_date"]}"

insert into doctor_on_time (doctor_id,appointment_id,appointment_date,on_time,brand) values("${appointment_details["doctor_id"]}","${appointment_details["id"]}","${appointment_details["appointment_date"]}","${on_time}","${appointment_details["brand"]}")

insert into doctor_on_time (doctor_id,appointment_id,appointment_date,on_time,brand) values("${customer.doctor_id}","${customer.id}","${customer.appointment_date}","0","${customer.brand}")




readTable = `select * from prescription_items where prescription_id = '${prescriptionId}' and product_id!="new";`;
select * from doctor_schedule where id="10219"
select prescription_id from prescription where source_id="10219" 

select * from prescription_items where prescription_id in ('10','15')
select * from prescription_items where prescription_id in (select prescription_id from prescription where source_id="10219" )



(appointment_id | recommended_products (1605,1420,5431) | recommended_quantity(2,1,3) | prescribed_products | prescribed_quantity | final_order)

CREATE TABLE doctor_products_meta (
  id int(11) NOT NULL AUTO_INCREMENT,
  appointment_id int(11),
  recommended_products VARCHAR(255),
  recommended_quantity VARCHAR(255),
  prescribed_products VARCHAR(255),
  prescribed_quantity VARCHAR(255),
  final_order VARCHAR(255),
  PRIMARY KEY (id)
);

select * from doctor_schedule where id="10219"
select * from doctor_schedule where appointment_date >= "2021-02-25" and appointment_date <= "2021-02-26"
select * from doctor_products_meta where appointment_id in (10219)
select * from doctor_products_meta where appointment_id in (select id from doctor_schedule where appointment_date >= "2021-02-25" and appointment_date <= "2021-02-26")

select * from doctor_products_meta,doctor_schedule
where doctor_products_meta.appointment_id = doctor_schedule.id
and doctor_schedule.appointment_date >= "2021-02-25" and doctor_schedule.appointment_date <= "2021-02-26"
and doctor_schedule.brand = "MM"


select * from wp_usermeta where meta_value="9039824590"
select * from wp_users where id="455"
select * from wp_usermeta where user_id="489"
DELETE FROM wp_usermeta WHERE user_id="489"



const sourceIds = prescription_id.map(prescription => prescription.source_id);
const uniquesourceIds = [...new Set(sourceIds)];
console.log('---uniquesourceIds----', uniquesourceIds);
const updatedocProducts = `update doctor_products_meta set ordered_products="${orderedProducts.join(",")}",ordered_quantity="${orderedQuantity.join(",")}" where ordered_products is null and appointment_id in (${uniquesourceIds.join(",")})`;




update prescription_items set fulfilled= (fulfilled + 1) where product_id='1605'and prescription_id='1668';
update prescription_items set fulfilled= (fulfilled + 1) where product_id='1613'and prescription_id='1668';


update prescription set patient_email =null, patient_phone=null where (patient_email ='pooja@mosaicwellness.in' or patient_phone='8149878029') and prescription_id not in (1668,1695);


select
    doctor_schedule.id,doctor_schedule.appointment_date,doctor_schedule.schedule_token,doctor_schedule.slot_start_time,doctor_schedule.slot_end_time,doctor_schedule.brand,doctor_schedule.source,
    doctor.doctor_name,doctor.doctor_id,doctor.doctor_qualifications,
    prescription_remarks.created_dttm
    from doctor_schedule,doctor,prescription_remarks
    where doctor_schedule.doctor_id = doctor.doctor_id 
    and doctor_schedule.id=prescription_remarks.doctor_schedule_id
    and doctor_schedule.email = '${req.body.email}' or doctor_schedule.phone = '${req.body.phone}'
    GROUP by prescription_remarks.doctor_schedule_id
    order by doctor_schedule.appointment_date desc
// this query causes issues as  the or is not in brackets  (doctor_schedule.email = '${req.body.email}' or doctor_schedule.phone = '${req.body.phone}')



select   doctor_schedule.id,doctor_schedule.appointment_date,doctor_schedule.schedule_token,doctor_schedule.slot_start_time,doctor_schedule.slot_end_time,doctor_schedule.brand,doctor_schedule.source,doctor_schedule.status,
    doctor.doctor_name,doctor.doctor_id,doctor.doctor_qualifications
    from doctor_schedule,doctor
    where doctor_schedule.doctor_id = doctor.doctor_id 
    and (doctor_schedule.email = 'yash.bhardwaj@mosaicwellness.in' or doctor_schedule.phone = '8386915333') order by doctor_schedule.appointment_date desc 


INSERT INTO doctor_overbooked_appointment (id, req_data, booking_token)
VALUES
  (2, '{\"date\":\"Monday, 29 March 21\",\"slot\":\"11:00 AM-11:30 AM\",\"brand\":\"MM\",\"email\":\"cron.test@mosaicwellness.in\",\"phone\":\"8149878029\",\"category\":[\"is_hc\"],\"slot_time_period\":10,\"source\":\"O\",\"patient_name\":\"cron Test\",\"source_id\":\"454\"}', 'de3496e8-edac-4ced-8d7a-2ccde3db4b08');

INSERT INTO doctor_overbooked_appointment (req_data)
VALUES
  ('{\"date\":\"Monday, 29 March 21\",\"slot\":\"11:00 AM-11:30 AM\",\"brand\":\"MM\",\"email\":\"cron.test@mosaicwellness.in\",\"phone\":\"8149878029\",\"category\":[\"is_hc\"],\"slot_time_period\":10,\"source\":\"O\",\"patient_name\":\"cron Test\",\"source_id\":\"454\"}');


select * from doctor_schedule where phone='9873311623' or email = 'vibhor.sharma@mosaicwellness.in';

select * from doctor_schedule where email="cron.test@mosaicwellness.in";

select
doctor_schedule.id,doctor_schedule.appointment_date,doctor_schedule.schedule_token,doctor_schedule.slot_start_time,doctor_schedule.slot_end_time,doctor_schedule.brand,doctor_schedule.source,doctor_schedule.status,doctor_schedule.category,
    doctor.doctor_name,doctor.doctor_id,doctor.doctor_qualifications,created_dttm,doctor.doctor_img
    from doctor_schedule,doctor where doctor_schedule.doctor_id = doctor.doctor_id and (doctor_schedule.email = '${req.body.email}' or doctor_schedule.phone = '${req.body.phone}') order by doctor_schedule.appointment_date desc;
    
select * from doctor_hours where       doctor_id in (1,3,5,80) and brand = 'MM' and       weekday=4 and       from_time <= '11:30:00'  and       to_time >= '12:00:00';

INSERT INTO `doctor_hours` (`weekday`, `from_time`, `to_time`, `doctor_id`, `brand`)
VALUES (4, '10:00:10', '12:00:00', 3, 'MM');

select * from doctor_schedule where appointment_date="2021-03-25" and doctor_id=3;

update doctor_overbooked_appointment set booking_token=null where id=53;

select * from doctor_schedule where prescription_order_ids like "%,%";
select pid from doctor_products group by pid having count(*) > 1;

select * from doctor_products where pid in (select pid from doctor_products group by pid having count(*) > 1);

select * from doctor_schedule where phone="8149878029" and brand="MM" and prescription_order_ids is null and source="F";


select * from partners_links_earnings,partners_coupons_earnings where partners_links_earnings.orderDate >="2021-05-01" and partners_links_earnings.orderDate<="2021-05-30" GROUP BY partners_links_earnings.partnerId;


select partners_links_earnings.partnerId,
sum(partners_links_earnings.earning) as linkEarnings,
sum(partners_coupons_earnings.earning) as couponEarnings
from partners_links_earnings,partners_coupons_earnings
where partners_links_earnings.brand='MM'
and partners_links_earnings.orderDate >="2021-05-01" and partners_links_earnings.orderDate<="2021-05-30"
and partners_coupons_earnings.orderDate >="2021-05-01" and partners_coupons_earnings.orderDate<="2021-05-30"
group by partners_links_earnings.partnerId;
    
   
    
 select * from partners_links_earnings where brand="MM"
 group by partnerId;
 
 select * from partners_coupons_earnings where brand="MM"
 group by partnerId;




select partners_links_earnings.partnerId,firstName,lastName,
sum(partners_links_earnings.earning) as linkEarnings,
sum(partners_coupons_earnings.earning) as couponEarnings,
sum(partners_links_earnings.orderUnits) as linkOrderUnits,
sum(partners_coupons_earnings.orderUnits) as couponOrderUnits,
sum(partners_links_earnings.orderAmount) as linkOrderAmount,
sum(partners_coupons_earnings.orderAmount) as couponOrderAmount
from partners_links_earnings,partners_coupons_earnings,partners
where partners.id = partners_links_earnings.partnerId or partners.id=partners_coupons_earnings.partnerId
and partners_links_earnings.brand='MM'
and partners_coupons_earnings.brand = "MM"
and partners_links_earnings.orderDate >="2021-05-01" and partners_links_earnings.orderDate<="2021-05-30"
and partners_coupons_earnings.orderDate >="2021-05-01" and partners_coupons_earnings.orderDate<="2021-05-30"
group by partners_links_earnings.partnerId;






select *
from partners_links_earnings,partners_coupons_earnings,partners
where partners.id = partners_links_earnings.partnerId or partners.id=partners_coupons_earnings.partnerId
and partners_links_earnings.brand='MM'
and partners_coupons_earnings.brand = "MM"
and partners_links_earnings.orderDate >="2021-05-01" and partners_links_earnings.orderDate<="2021-05-30"
and partners_coupons_earnings.orderDate >="2021-05-01" and partners_coupons_earnings.orderDate<="2021-05-30";
group by partners_links_earnings.partnerId;



select partners_links_earnings.partnerId,firstName,lastName,
sum(partners_payout.payoutAmount) as totalPayout,
sum(partners_links_earnings.earning) as linkEarnings,
sum(partners_coupons_earnings.earning) as couponEarnings,
sum(partners_links_earnings.orderUnits) as linkOrderUnits,
sum(partners_coupons_earnings.orderUnits) as couponOrderUnits,
sum(partners_links_earnings.orderAmount) as linkOrderAmount,
sum(partners_coupons_earnings.orderAmount) as couponOrderAmount
from partners_links_earnings,partners_coupons_earnings,partners,partners_payout
where partners.id = partners_links_earnings.partnerId or partners.id=partners_coupons_earnings.partnerId
and partners.id=partners_payout.partnerId
and partners_links_earnings.brand='MM'
and partners_coupons_earnings.brand = "MM"
and partners_links_earnings.orderDate >="2021-05-01" and partners_links_earnings.orderDate<="2021-05-30"
and partners_coupons_earnings.orderDate >="2021-05-01" and partners_coupons_earnings.orderDate<="2021-05-30"
group by partners_links_earnings.partnerId;


select *
from partners_links_earnings,partners_coupons_earnings,partners,partners_payout
where partners.id = partners_links_earnings.partnerId or partners.id=partners_coupons_earnings.partnerId
and partners.id=partners_payout.partnerId
and partners_links_earnings.brand='MM'
and partners_coupons_earnings.brand = "MM"
and partners_links_earnings.orderDate >="2021-05-01" and partners_links_earnings.orderDate<="2021-05-30"
and partners_coupons_earnings.orderDate >="2021-05-01" and partners_coupons_earnings.orderDate<="2021-05-30";
group by partners_links_earnings.partnerId;


select * from partners where brand="MM" and id in (2, 4, 7, 137);

select * from partners_payout where brand="MM" and partnerId in (2, 4, 7, 137);

select * from partners_payout where brand="MM" and partnerId in (4);

select partners.id,active,firstName,lastName,instagram,youtube,sum(payoutAmount) as totalPayout from partners
left join partners_payout on partners.id = partners_payout.partnerId
where partners.brand = "MM" and partners.id in (2, 4, 7, 137)
group by partners.id;


select partners.id,active,firstName,lastName,instagram,youtube,sum(payoutAmount) as totalPayout from partners
left join partners_payout on partners.id = partners_payout.partnerId
where partners.brand = "MM" 
group by partners.id;

///// regex in sql 

select count(referral_id) as no_of_friends_referred,sum(points_amount) as referral_earnings from mst_rewards_referral where customer_id="808" and points_amount is not null;

select * from mst_rewards_referral where customer_id="808" and points_amount is not null;
select count(referral_id) as no_of_friends_referred from mst_rewards_referral where customer_id="808" and points_amount is not null;

select * from mst_rewards_transaction where customer_id="808" and amount > 0;
select * from mst_rewards_transaction where customer_id="808" and code REGEXP '^referred_customer_order' and amount > 0;
select sum(amount) as referral_earnings from mst_rewards_transaction where customer_id="808" and code REGEXP '^referred_customer_order' and amount > 0;

select count(referral_id) as no_of_friends_referred from mst_rewards_referral where customer_id="808" and points_amount is not null;
select sum(amount) as referral_earnings from mst_rewards_transaction where customer_id="808" and code REGEXP '^referred_customer_order' and amount > 0;






INSERT INTO doctor_out_of_clinic (doctor_id,date_time_from,date_time_to,approved_flag) VALUES
        (123,"2021-11-04T10:00:00","2021-11-04T10:30:00",2);

INSERT INTO doctor_out_of_clinic (doctor_id,date_time_from,date_time_to,approved_flag) VALUES
        (123,"2021-11-04T10:00:00","2021-11-04T10:30:00",2), (85,"2021-11-04T10:00:00","2021-11-04T10:30:00",2), (86,"2021-11-04T10:00:00","2021-11-04T10:30:00",2);
        
select * from doctor_out_of_clinic where doctor_id in ("123", "85", "86");
        
select * from doctor_schedule where doctor_id =123 AND CONCAT(appointment_date,"T",from_time) >= '2021-11-04T10:00:00' and CONCAT(appointment_date,"T",to_time) <= '2021-11-04T10:30:00' and status not in ("ni","ns","t","c","op","na","cn","otc","rf") and delete_flag=0;



if(bulkOoc && data.doctor_id && data.doctor_id.length){
          query = `INSERT INTO doctor_out_of_clinic (doctor_id,date_time_from,date_time_to,approved_flag) VALUES `
          data.doctor_id.forEach(() => {

          })
        }
        // (123,"2021-11-04T10:00:00","2021-11-04T10:30:00",2), (85,"2021-11-04T10:00:00","2021-11-04T10:30:00",2), (86,"2021-11-04T10:00:00","2021-11-04T10:30:00",2); -->
