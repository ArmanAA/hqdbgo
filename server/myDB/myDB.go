package myDB

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
)

type User struct {
	gorm.Model
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Username  string `json:"username"`
	Password  string `json:"hashPass"`
	Email     string `json:"email"`
	PhoneNum  string `json:phoneNum`
}

func CreateUser(user *User, db gorm.DB) {
	db.Debug().Create(user)
}
func CheckUsername(username string, db gorm.DB) bool {
	user := User{}
	db.Debug().Where("username = ?", username).First(&user)
	if (User{}) != user {
		return false
	} else {
		return true
	}
}
func InitializeDB() gorm.DB {
	db, err := gorm.Open("mysql", "root:root@/gohqdb?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err.Error())

	}

	err = db.DB().Ping()
	db.DropTableIfExists(&User{})
	db.CreateTable(&User{})

	//defer db.Close()
	return *db
}
