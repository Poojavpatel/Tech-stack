## Python

---

### Template Iterals
You can go with f-strings since Python 3.6

```python
f"Hi {name}, you are {age}"
```
Or string formatting
```python
"Hi {}, you are {}".format(name, age)
"Hi {name}, you are {age}".format(name=name, age=age)
```
Or format specifiers
```python
"Hi %s, you are %d" % (name, age)
```

### String Concatenation

```python
x = "Python is "
y = "awesome"
z =  x + y
print(z)
```

### String join

```python
sentence = ['this','is','a','sentence']
'-'.join(sentence)
# 'this-is-a-sentence'
```

### Convert object to comma seperated values

```python
# {1: "gbh", 2: "tgyh", 3: "kjh"} ----->  1, 2, 3
', '.join([str(x) for x in list])
```
---

## Codes

### Create sqllite db in python

```python
# init_db.py
import os
from dotenv import load_dotenv
import asyncio
from databases import Database

# populate env and config variables
load_dotenv()
CAT_DOCUMENT_TABLE = os.getenv('CAT_DOCUMENT_TABLE')
DATABASE_NAME = os.getenv('DATABASE_NAME')
DATABASE_URL = os.getenv('DATABASE_URL')

async def main() -> None:
    database = Database(DATABASE_URL)
    await database.connect()

    query = f"CREATE TABLE IF NOT EXISTS {CAT_DOCUMENT_TABLE} (id INTEGER PRIMARY KEY, title VARCHAR(100), type VARCHAR(100), position INTEGER)"
    await database.execute(query=query)

    query = f"INSERT INTO {CAT_DOCUMENT_TABLE}(title, type, position) VALUES (:title, :type, :position)"
    values = [
        {"title": "Bank Draft", "type": "bank-draft", "position": 0},
        {"title": "Bill of Lading", "type": "bill-of-lading", "position": 1},
        {"title": "Invoice", "type": "invoice", "position": 2},
        {"title": "Bank Draft 2", "type": "bank-draft-2", "position": 3},
        {"title": "Bill of Lading 2", "type": "bill-of-lading-2", "position": 4},
    ]
    await database.execute_many(query=query, values=values)

    await database.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
```

### Endpoints using starlette
```python
import os
from dotenv import load_dotenv
from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.requests import Request
from starlette.routing import Route
from starlette.middleware.cors import CORSMiddleware
from databases import Database

# populate env and config variables
load_dotenv()
CAT_DOCUMENT_TABLE = os.getenv('CAT_DOCUMENT_TABLE')
DATABASE_NAME = os.getenv('DATABASE_NAME')
DATABASE_URL = os.getenv('DATABASE_URL')

# database connection
database = Database(DATABASE_URL)

async def homepage(request):
  return JSONResponse({'hello': 'world'})

async def getDocuments(request):
  query = f"SELECT * FROM {CAT_DOCUMENT_TABLE}"
  rows = await database.fetch_all(query=query)
  data = [dict(row) for row in rows]
  return JSONResponse(data)

async def addDocuments(request: Request):
  payload = await request.json()
  query = f"INSERT INTO {CAT_DOCUMENT_TABLE}(title, type, position) VALUES (:title, :type, :position)"
  await database.execute(query=query, values=payload)
  return JSONResponse({"message" : "Data inserted successfully"})

async def updateDocuments(request):
  try:
    payload = await request.json()
  except ValueError:
    return JSONResponse({'message': 'No data to update'})
  cases = ""
  for entry in payload:
    cases += f" WHEN {entry} THEN {payload[entry]}"
  query = f"UPDATE {CAT_DOCUMENT_TABLE} SET position = CASE id {cases} ELSE position END WHERE id IN ({', '.join([str(entry) for entry in payload])})"
  await database.execute(query=query)
  return JSONResponse({'message': 'Data updated successfully'})

# Define routes
app = Starlette(debug=True, routes=[
  Route('/', homepage),
  Route('/getDocuments', getDocuments),
  Route('/updateDocuments', updateDocuments, methods=['POST']),
  Route('/addDocuments', addDocuments, methods=['POST'])
])

app.add_middleware(CORSMiddleware, allow_origins=["*"])
```

---
### FizzBuzz using python
```python
t=int(input())
inps = input().split()
a=[]
for inp in inps:
  a.append(int(inp))


while(t):
  s=a[t*-1]
  for i in range(1,s+1):
    if( i%3==0 and i%5==0 ):
      print('FizzBuzz')
    elif( i%3==0 and i%5!=0 ):
      print('Fizz')
    elif( i%5==0 ):
      print('Buzz')
    else:
      print(i)
  t=t-1
```

--- 
### Scraping using Beautiful Soup
```python
import urllib.request, csv
from bs4 import BeautifulSoup

f = open('dataoutput.csv', 'w', newline = '')
writer = csv.writer(f)
writer.writerow(['name','link','What is?','Symptoms','Causes','Diagnosis','Treatment', 'Prevention','faq'])

soup = BeautifulSoup(urllib.request.urlopen("https://ada.com/conditions/"), 'html.parser')

links = soup.find_all('a', attrs={"class":"s1lrc7ah-2"})
links = [p for p in links]


def getData(soup2, myid):
    res=[]
    temp = soup2.find(attrs={"id": myid})
    if not temp:
        return res
    sibs = soup2.find(attrs={"id": myid}).next_siblings
    sibs = [sib for sib in sibs if sib != '\n']
    for sib in sibs:
        if(sib.name=='h2' or sib.name=='hr'):
            break
        else:
            res.append(sib.text.strip())
    res = ''.join(res)
    return res

for foo in links:
    link=foo["href"]
    soup2 = BeautifulSoup(urllib.request.urlopen(link), 'html.parser')
    # s1 = getData(soup2, "")
    s2 = getData(soup2, "symptoms")
    s3 = getData(soup2, "causes")
    s4 = getData(soup2, "diagnosis")
    s5 = getData(soup2, "treatment")
    s6 = getData(soup2, "prevention")
    s7 = getData(soup2, "faq")
    writer.writerow([foo.text.strip(),link,'',s2,s3,s4,s5,s6,s7])
```

## Using Starlette
https://github.com/jordaneremieff/starlette-svelte-example   
https://github.com/Poojavpatel/fabio-tests-nisargatman

To run the project 
```bash
python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt
python init_db.py

uvicorn app:app
```