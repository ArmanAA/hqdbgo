package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	_ "github.com/lib/pq"
)

//initialize database connection
func InitializeDB() gorm.DB {

	db, err := gorm.Open("sqlite3", "./gorm.db")
	//"root:root@/gohqdb?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err.Error())

	}

	err = db.DB().Ping()
	db.DropTableIfExists(&User{})
	db.CreateTable(&User{})

	//defer db.Close()
	return *db
}
