## Python

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