package webapp

import (
	"fmt"
	"net/http"
	"reactDevGo/my-app/server/myDB"
	"reactDevGo/my-app/server/mySocket"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type Person struct {
	Name string
	Age  int
}

type Record struct {
	Id   int       `json:"id"`
	Name string    `json:"name"`
	Time time.Time `json:"time"`
}

func StartServer(db gorm.DB) {
	// Set the router as the default one shipped

	t := time.Now()
	rec := Record{1, "Arman", t}

	router := gin.Default()
	router.Use(cors.Default())
	api := router.Group("/api")
	// {
	api.GET("/data", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"data": rec,
		})
	})
	// })
	api.GET("/ws", func(c *gin.Context) {

		mySocket.WsHandler(c)

	})
	api.POST("/login", func(c *gin.Context) {
		var json loginData
		if err := c.BindJSON(&json); err == nil {

			c.JSON(http.StatusCreated, json)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{})
		}
		fmt.Println("params from post: ", json)

		//mySocket.WsHandler(c)

	})
	api.POST("/signup", func(c *gin.Context) {
		var json *myDB.User = new(myDB.User)
		if err := c.BindJSON(&json); err == nil {
			//obj := *json
			if myDB.CheckUsername(json.Username, db) {
				myDB.CreateUser(json, db)
				c.JSON(http.StatusCreated, json)
			} else {
				c.JSON(http.StatusNotAcceptable, gin.H{})
			}

		} else {
			c.JSON(http.StatusBadRequest, gin.H{})
		}
		//fmt.Println("params from post: ", *json)

	})

	// Start and run the server
	defer db.Close()
	router.Run(":8080")
	//}
}

type loginData struct {
	Username string `json:"username"`
	Password string `json:"hashPass"`
}
