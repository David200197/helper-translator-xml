package main

import (
	"net/http"
)

type userHandler struct{}

func (handler *userHandler) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	// all users request are going to be routed here
}

func main() {
	mux := http.NewServeMux()
	mux.Handle("/api/users/", &userHandler{})
	http.ListenAndServe(":8080", mux)
}
