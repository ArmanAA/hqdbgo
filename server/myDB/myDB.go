package myDB

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	gorm.Model
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	Email     string `json:"email"`
	PhoneNum  string `json:phoneNum`
}

func CreateUser(user *User, db gorm.DB) {
	db.Debug().Create(user)
}
func CheckCredentials(username string, password string, db gorm.DB) bool {
	user := User{}
	db.Debug().Where("username = ? ", username).Find(&user)

	if "" != user.Username {
		hashFromDatabase := []byte(user.Password)
		// Comparing the password with the hash
		if err := bcrypt.CompareHashAndPassword(hashFromDatabase, []byte(password)); err != nil {
			return false
		} else {
			return true
		}
	} else {
		return false
	}

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
