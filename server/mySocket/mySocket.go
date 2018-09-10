package mySocket

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gorilla/websocket"
)

// var clients = make(map[*websocket.Conn]bool) // connected clients
// var broadcast = make(chan Message)           // broadcast channel

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,

	CheckOrigin: func(r *http.Request) bool {
		//fmt.Println(r)
		return true
	},
}

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan []byte)

type Message struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

func WsHandler(c *gin.Context) {
	w := c.Writer
	r := c.Request
	//fmt.Println("in handle connections")

	var conn, err = upgrader.Upgrade(w, r, nil)

	if err != nil {

		log.Fatal(err)
	}

	clients[conn] = true
	fmt.Println("Client subscribed")

	HandleMessages(conn)

	defer conn.Close()
}

func HandleMessages(conn *websocket.Conn) {
	for {
		// var msg string
		// fmt.Println(msg)
		var msg string

		err := conn.ReadJSON(&msg)
		//fmt.Println(msg)

		//fmt.Println(mType, msg)
		if err != nil {
			log.Printf("error: %w", err)
			delete(clients, conn)
			fmt.Println("client deleted")
			break
		}
		// fmt.Println("BEFORE broadcasted ")
		// broadcast <- msg
		// fmt.Println("it was broadcasted ")

		//Send it out to every client that is currently connected

		for client := range clients {
			//m, _ := json.Marshal(msg)
			// s := string(msg)
			// fmt.Println(s)

			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %w", err)
				client.Close()
				delete(clients, client)
				fmt.Println("client deleted")
			}
		}
	}
}
