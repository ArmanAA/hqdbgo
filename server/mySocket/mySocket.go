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

type Message struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)

func HandleConnections(c *gin.Context) {
	w := c.Writer
	r := c.Request
	// Upgrade initial GET request to a websocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	// Make sure we close the connection when the function returns
	defer ws.Close()

	// Register our new client
	clients[ws] = true
	fmt.Println("Client Subbed")
	for {
		fmt.Println("IN LOOP")
		var msg Message
		// Read in a new message as JSON and map it to a Message object
		err := ws.ReadJSON(&msg)
		fmt.Println("Message READ:", msg.Message)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}
		//	fmt.Println("Message READ:")

		// Send the newly received message to the broadcast channel
		broadcast <- msg
		// amsg := <-broadcast
		fmt.Println("asdasdasd")
	}

}

func HandleMessages() {
	//msg := <-broadcast
	fmt.Println("In wrote message (Handle Message)")
	for {
		// Grab the next message from the broadcast channel
		msg := <-broadcast
		// Send it out to every client that is currently connected
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
	fmt.Println("in Handle")
}
