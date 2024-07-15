package main

import (
	"fmt"
	"os"
)

func main() {
	data, error := os.ReadFile("./problems.csv")

	_ = error

	fmt.Println(string(data))
}
