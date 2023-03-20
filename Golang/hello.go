/*
To run a go file simply run
go run filename.go

To compile the file into an executable run
go build filename.go
or in program directory run
go build

To run the executable binary, run
./filename


Alternatively you can run
go install
this puts executable in the bin folder


var x int // default value assigned is zero value, each type has a zero value, for int its 0
for string zero value is ""
*/

// To tun file - go run Golang/hello.go

package main

import (
	"errors"
	"fmt"
)

type person struct {
	name string
	age int
}

func main() {
	// Short crash course - https://www.youtube.com/watch?v=C8LgvuEBraI
	/* Variables */
	fmt.Println("Hello again")

	var x int 

	fmt.Println("x :", x) // zero value for int is 0

	var y string

	fmt.Println("y :", y) // zero value for string is ""

	var a int = 5
	var b int = 10
	var sum int = a + b

	fmt.Println("sum :", sum) 

	c := 7 // short hant syntax, go infers the type
	fmt.Println("c :", c) 

	/* Conditional statements */
	if c > 2 {
		fmt.Println("c is greater then 2")
	} else {
		fmt.Println("c is smaller then 2")
	}

	/* Arrays */
	var myArray [5]int
	myArray[2] = 4
	fmt.Println("myArray: ", myArray) // myArray:  [0 0 4 0 0]

	myArray1 := [5]int{5,4,3,2,1}
	fmt.Println("myArray1: ", myArray1) // myArray:  [5 4 3 2 1]
	// arrays with fixed length are inconvenient, cant add 6th element to this array, to overcome this we can use slices

	/* Slices - slices dont have a fixed no of elements */
	mySlice1 := []int{5,4,3,2,1}
	fmt.Println("mySlice1: ", mySlice1) // mySlice1:  [5 4 3 2 1]

	// mySlice1[9] = 44 // panic: runtime error: index out of range [9] with length 5

	mySlice1 = append(mySlice1, 13) // append does not modify original slice, it returns a new one
	fmt.Println("mySlice1: ", mySlice1) // mySlice1:  [5 4 3 2 1 13]

	/*  Map - holds key value pairs */
	myMap := make(map[string]int)
	myMap["apple"] = 2
	myMap["grapes"] = 28
	myMap["banana"] = 5

	fmt.Println("myMap: ", myMap) // myMap:  map[apple:2 banana:5 grapes:28]
	fmt.Println(myMap["grapes"]) // 28

	delete(myMap, "banana")
	fmt.Println("myMap: ", myMap) // myMap:  map[apple:2 grapes:28]

	/* Loops */
	// Only type of loop in go is the for loop
	for i:=0; i< 5; i++ {
		fmt.Println("i in a loop: ", i) // i in a loop:  0
	}

	// to make it a while loop
	i:=0
	for i< 5{
		fmt.Println("i in a while loop: ", i) // i in a while loop:  0
		i++ 
	}

	// to loop over each element in array or slice
	testArray := [3]string {"dog", "cat", "goat"}
	for index,value := range(testArray) {
		fmt.Println("index: ", index, "value:", value) // index:  0 value: dog
	}

	// to loop over each element in a map
	testMap := make(map[string]string)
	testMap["dog"] = "bark"
	testMap["cat"] = "meow"
	testMap["goat"] = "meah"

	for key,value := range(testMap) {
		fmt.Println("key: ", key, "value:", value) // key:  dog value: bark
	}

	/* Functions */
	sumResult := sumNumbers(4,7)
	fmt.Println("sum : ", sumResult)

	// function with multiple return types
	voteResult1, voteError1 := vote(25)
	fmt.Println("voteResult1 : ", voteResult1, "voteError1", voteError1) // voteResult1 :  Thanks for voting voteError1 <nil>

	voteResult2, voteError2 := vote(15)
	fmt.Println("voteResult2 : ", voteResult2, "voteError2", voteError2) // voteResult2 :   voteError2 You cannot vote
	// go does not have exceptions like some other languages

	/* Struct */
	p := person{name: "Jack", age:30}
	fmt.Println("p : ", p) // p :  {Jack 30}

	/* Pointers */
	// use & to get memory address of a variable and * to get value at the memory address
	g := 7
	fmt.Println(g) // 7
	fmt.Println(&g) // 0xc000018138
	memoryLocation := &g
	fmt.Println(memoryLocation) // 0xc000018138
	fmt.Println(*memoryLocation) // 7

	incByValue(g)
	fmt.Println(g) // 7

	incByReference(&g)
	fmt.Println(g) // 8
}

func sumNumbers(a int, b int) int {
	return a + b
}

func vote(age int) (string, error) {
	if age<18 {
		return "", errors.New("You cannot vote")
	} else {
		return "Thanks for voting", nil
	}
}

func incByValue(x int) {
	x++
}

func incByReference(x *int) {
	*x++
}
