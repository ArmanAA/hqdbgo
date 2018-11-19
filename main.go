package main

import (
	"reactDevGo/my-app/server/api"
	"reactDevGo/my-app/server/models"
	"reactDevGo/my-app/server/seeder"
)

func main() {
	db := models.InitializeDB()
	// seeder.CreateSeedTables(db)
	seeder.SeedQuestions(db)
	seeder.SeedAnswers(db)
	api.StartServer(db)
}
