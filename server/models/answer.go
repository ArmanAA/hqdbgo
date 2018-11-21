package models

import "github.com/jinzhu/gorm"

type Answer struct {
	gorm.Model
	Description string `json:"answer"`
	QuestionID  uint   `sql:"index"`
}

func CreateAnswer(a *Answer, db gorm.DB) {
	db.Debug().Create(a)
}
