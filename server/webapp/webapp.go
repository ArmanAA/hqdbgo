package webapp

import (
	"fmt"
	"log"
	"net/http"
	"reactDevGo/my-app/server/models"
	"reactDevGo/my-app/server/mySocket"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type Person struct {
	Name string
	Age  int
}
type loginData struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func StartServer(db gorm.DB) {
	// Set the router as the default one shipped

	router := gin.Default()
	router.Use(cors.Default())
	api := router.Group("/api")

	api.GET("/ws", func(c *gin.Context) {

		mySocket.WsHandler(c)

	})
	api.PUT("/login", func(c *gin.Context) {
		var json loginData
		if err := c.BindJSON(&json); err == nil {
			if models.CheckCredentials(json.Username, json.Password, db) {
				c.JSON(http.StatusAccepted, json)
			} else {
				c.JSON(http.StatusUnauthorized, gin.H{})
			}

		} else {
			c.JSON(http.StatusBadRequest, gin.H{})
		}

	})
	api.POST("/signup", func(c *gin.Context) {
		var json *models.User = new(models.User)
		if err := c.BindJSON(&json); err == nil {
			if models.CheckDuplicateUsername(json.Username, db) {
				hash, err := bcrypt.GenerateFromPassword([]byte(json.Password), bcrypt.DefaultCost)
				if err != nil {
					log.Fatal(err)
				}
				json.Password = string(hash)
				models.CreateUser(json, db)
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
