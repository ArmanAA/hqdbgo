package api

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"reactDevGo/my-app/server/myDB"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type Token struct {
	Token string `json:"token"`
}
type loginData struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

const (
	privateKeyPath = "app.rsa"
	publicKeyPath  = "app.rsa.pub"
)

var VerifyKey, SignKey []byte

func initKeys() {
	var err error

	SignKey, err = ioutil.ReadFile(privateKeyPath)
	fmt.Printf(string(SignKey))
	if err != nil {
		log.Fatal("Error reading Private Key")
		return
	}

	VerifyKey, err = ioutil.ReadFile(publicKeyPath)
	if err != nil {
		log.Fatal("Error reading Public Key")
		return
	}

}
func StartServer(db gorm.DB) {
	// Set the router as the default one shipped
	initKeys()
	router := gin.Default()
	// router.Use(cors.Default())
	router.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "POST", "OPTIONS", "PUT"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "User-Agent", "Referrer", "Host", "Token"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowAllOrigins:  false,
		AllowOriginFunc:  func(origin string) bool { return true },
		MaxAge:           86400,
	}))

	api := router.Group("/api")

	api.GET("/game/:username", func(c *gin.Context) {

		var cookie, _ = c.Request.Cookie("token")
		var cookievalue = cookie.Value

		fmt.Println("Cookie value is:" + cookievalue)

		token, err := jwt.Parse(cookievalue, func(t *jwt.Token) (interface{}, error) {
			return SignKey, nil
		})
		if err == nil && token.Valid {
			fmt.Println("valid token")

		} else {
			fmt.Println(err)
			c.JSON(http.StatusUnauthorized, gin.H{})
		}
		//mySocket.WsHandler(c)

	})
	api.POST("/login", func(c *gin.Context) {
		var json loginData

		if err := c.BindJSON(&json); err == nil {
			if myDB.CheckCredentials(json.Username, json.Password, db) {
				//initialize token here

				token := jwt.New(jwt.SigningMethodHS256)
				claims := make(jwt.MapClaims)
				claims["exp"] = time.Now().Add(time.Second * 5).Unix()
				claims["iat"] = time.Now().Unix()
				claims["iss"] = "admin"

				token.Claims = claims

				tokenString, err := token.SignedString(SignKey)
				fmt.Println(tokenString)
				// Set user as authenticated
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{})
					//fmt.Fprintln(w, "Error while signing the token")
					log.Printf("Error signing token: %v\n", err)
				}
				response := Token{
					tokenString,
				}
				c.JSON(http.StatusAccepted, response)

			} else {
				c.JSON(http.StatusUnauthorized, gin.H{})
			}

		} else {
			c.JSON(http.StatusBadRequest, gin.H{})
		}

	})
	api.POST("/signup", func(c *gin.Context) {
		var json = new(myDB.User)
		if err := c.BindJSON(&json); err == nil {
			if myDB.CheckUsername(json.Username, db) {
				hash, err := bcrypt.GenerateFromPassword([]byte(json.Password), bcrypt.DefaultCost)
				if err != nil {
					log.Fatal(err)
				}
				json.Password = string(hash)
				myDB.CreateUser(json, db)
				c.JSON(http.StatusCreated, json)
			} else {
				c.JSON(http.StatusNotAcceptable, gin.H{})
			}

		} else {
			c.JSON(http.StatusBadRequest, gin.H{})
		}
		fmt.Println("params from post: ", *json)

	})

	// Start and run the server
	defer db.Close()
	router.Run(":8080")
	//}
}
