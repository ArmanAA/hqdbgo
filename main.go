package main

import (
	"reactDevGo/my-app/server/models"
	"reactDevGo/my-app/server/webapp"
)

func main() {
	db := models.InitializeDB()
	webapp.StartServer(db)

}
