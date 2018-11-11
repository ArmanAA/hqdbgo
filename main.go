package main

import (
	"reactDevGo/my-app/server/api"
	"reactDevGo/my-app/server/myDB"
)

func main() {
	db := myDB.InitializeDB()
	api.StartServer(db)

}
