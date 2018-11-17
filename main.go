package main

import (
	"reactDevGo/my-app/server/api"
	"reactDevGo/my-app/server/models"
)

func main() {
	db := models.InitializeDB()
	api.StartServer(db)
}
