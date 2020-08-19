## SQL

### Basic SQL commands
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
### Complex SQL commands
Query an alphabetically ordered list of all names in OCCUPATIONS, immediately followed by the first letter of each profession as a parenthetical (i.e.: enclosed in parentheses)
For example: AnActorName(A), ADoctorName(D), AProfessorName(P), and ASingerName(S). Eg Ariel(A) Samantha(D)
```sql
select CONCAT(Name,"(",LEFT(Occupation,1),")") from Occupations order by name;
```

Query the number of ocurrences of each occupation in OCCUPATIONS. Sort the occurrences in ascending order, and output them in the following format: There are total 2 doctors
```sql
select CONCAT("There are total ", Count(Occupation), " ", LOWER(occupation), "s.") from Occupations Group by Occupation order by  Count(Occupation)
```