package questionSeed

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
)

type Question struct {
	gorm.Model
	Description string
	ChoiceOne   []ChoiceOne
	ChoiceTwo   []ChoiceTwo
	ChoiceThree []ChoiceThree
}
type ChoiceOne struct {
	gorm.Model
	Answer     string
	QuestionID uint
}
type ChoiceTwo struct {
	gorm.Model
	Answer     string
	QuestionID uint
}
type ChoiceThree struct {
	gorm.Model
	Answer     string
	QuestionID uint
}

var questions = []Question{
	Question{},
	Question{},
	Question{},
	Question{},
	Question{},
}
var Co = ChoiceOne{
	Answer: "what up G?",
}
