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