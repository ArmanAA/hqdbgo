package main

import (
	"reactDevGo/my-app/server/myDB"
	"reactDevGo/my-app/server/webapp"
)

func main() {
	db := myDB.InitializeDB()
	webapp.StartServer(db)
	//fmt.Print(confirmEnding("arman", "asn"), "\n")

}

// func add(x int, y int) int {
// 	return x + y
// }

// func confirmEnding(str string, ends string) bool {
// 	var j = len(str) - 1
// 	for i := len(ends) - 1; i >= 0; i-- {
// 		if ends[i] != str[j] {
// 			return false
// 		}
// 		j = j - 1
// 	}
// 	return true
// }
