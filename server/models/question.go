package models

import "github.com/jinzhu/gorm"

type Question struct {
	gorm.Model
	Description string `json:"question"`
	Answers     []Answer
}

func CreateQuestion(q *Question, db gorm.DB) {

	db.Debug().Create(q)
}
