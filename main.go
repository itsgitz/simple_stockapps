// Main package ...
// by: Anggit Muhamad Ginanjar
//     STM NEGERI PEMBANGUNAN BANDUNG
package main

import (
	"log"	// log	package
	"time"	// time package
	"net/http"	// http for http server handling
	"github.com/urfave/negroni"	// negroni HTTP Middleware
	"github.com/gorilla/mux"	// gorilla router handler
	"simple_stockapps/controllers"	// custom controllers
)

// main function
func main() {
	// router variable initialiation using mux gorilla package
	router := mux.NewRouter()
	// defining main controller object
	main_ctrl := new(controllers.MainController)

	// defining router handler function
	router.HandleFunc("/", main_ctrl.AppMainPage) // routing for "/" (root) handler
	router.HandleFunc("/login", main_ctrl.AppLogin) // routing for "/login" handler
	router.HandleFunc("/logout", main_ctrl.AppLogout) // routing for "/logout" handler

	// Websocket router/controllers
	router.HandleFunc("/ws", main_ctrl.AppWebSocket) // routing for web socket handler

	// ajax handler routers
	router.HandleFunc("/navbar", main_ctrl.AppNavbarMainPage)

	// ajax sub-url routers
	router.HandleFunc("/items", main_ctrl.AppItems)
	router.HandleFunc("/reports", main_ctrl.AppReports)
	router.HandleFunc("/users", main_ctrl.AppUsers)

	// JSON
	router.HandleFunc("/json_get_items", main_ctrl.AppJSONItemsData)
	router.HandleFunc("/json_search_items", main_ctrl.AppJSONSearchData)
	// remove item url
	router.HandleFunc("/json_remove_item", main_ctrl.AppJSONRemoveItem)

	// defining http middleware using negroni method
	middleware := negroni.Classic()
	middleware.Use(negroni.NewStatic(http.Dir("static"))) // initialization static file
	middleware.UseHandler(router) // using gorilla mux router inside negroni middleware

	// initialization http server
	HttpServer := &http.Server{
		Addr:			":8080", // http port that used by web server
		Handler:		middleware, // using handler as http middleware
		ReadTimeout:	time.Second * 10,
		WriteTimeout:	time.Second * 10,
	}


	// log will tell web server has already opening on port :8080
	log.Println("[*] Web server is running on port :8080")
	HttpError := HttpServer.ListenAndServe()

	// catch the error log if any error outhere
	if HttpError != nil {
		log.Println("HttpError:", HttpError)
	}
}