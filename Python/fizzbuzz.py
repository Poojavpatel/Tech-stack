# Suppose we have a number n. We have to display a string representation of all numbers from 1 to n,
# If the number is divisible by 3, write Fizz instead of the number
# If the number is divisible by 5, write Buzz instead of the number
# If the number is divisible by 3 and 5 both, write FizzBuzz instead of the number


# t=int(input())
# inps = input().split()

def fizzbuzz(inputValue): 
  inps = inputValue.split()
  a=[]
  for inp in inps:
    a.append(int(inp))
  t=1
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

# checking till 20
print(fizzbuzz('20'))