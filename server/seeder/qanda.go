package seeder

import (
	"fmt"
	"reactDevGo/my-app/server/models"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
)

var questions = []models.Question{
	models.Question{Description: "What is 2*2?"},
	models.Question{Description: "Who is the president of USA"}}

var answers = []models.Answer{
	models.Answer{Description: "4", QuestionID: 1},
	models.Answer{Description: "42", QuestionID: 1},
	models.Answer{Description: "5", QuestionID: 1},
	models.Answer{Description: "Donald Trump", QuestionID: 2},
	models.Answer{Description: "Joe Rogan", QuestionID: 2},
	models.Answer{Description: "The Rock", QuestionID: 2}}

//SeedQuestions populates the DB with questions
func SeedQuestions(db gorm.DB) {
	fmt.Println("Seed Qs")
	for _, q := range questions {
		models.CreateQuestion(&q, db)

	}
}

//SeedAnswers populates the DB with answers
func SeedAnswers(db gorm.DB) {
	for _, a := range answers {
		models.CreateAnswer(&a, db)

	}
}
