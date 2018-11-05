package main

import (
	"reactDevGo/my-app/server/myDB"
	"reactDevGo/my-app/server/webapp"
)

func main() {
	db := myDB.InitializeDB()
	webapp.StartServer(db)

}
