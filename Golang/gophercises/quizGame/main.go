/*
Create a quiz application
The program will ask math questions to user from a csv file and take answer as input from user
match answer with answer in csv and calculate score
Add timer to the quiz app, take max quiz time as input from user
Terminate quiz once time passes and return score
*/
/*
To run the program
cd Golang/gophercises/quizGame
go build main.go && go run main.go
*/

package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"
)

func main() {
	// records, error := os.ReadFile("./problems.csv")
	// _ = error

	// open file
	f, err := os.Open("problems.csv")
	if err != nil {
		log.Fatal(err)
	}

	// remember to close the file at the end of the program
	defer f.Close()

	// read csv values using csv.Reader
	csvReader := csv.NewReader(f)
	records, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("len(data)", len(records))

	// for i := 0; i < len(data); i++ {
	// 	question := "Question " + string(i) + "" + string(data[i])
	// 	fmt.Println(question)
	// }

	// for value := range records {
	// 	fmt.Printf("  %v\n", records[value])
	// }

	for i, line := range records {
		_ = i
		for j, field := range line {
			_ = j
			fmt.Println("field : ", field)
		}
	}
}
