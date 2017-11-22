// Controller package for Main Controller object
// by: Anggit Muhamad Ginanjar
//     STM NEGERI PEMBANGUNAN BANDUNG
package controllers

import (
	"fmt"
	"log"
	"time"
	//"reflect"
	"net/http"
	"encoding/json"
	"html/template"
	"simple_stockapps/models"

	// http session using kataras
	"github.com/kataras/go-sessions"
	"github.com/gorilla/securecookie"
	"github.com/gorilla/websocket"
)

type MainController struct {
}

var (
	session = sessions.New(sessions.Config{
		Cookie: "simple_stockapps_session",
		Expires: time.Hour * 2,
		DisableSubdomainPersistence: false,
	})
)


// Main page controller
func (this *MainController) AppMainPage(w http.ResponseWriter, r *http.Request) {
	sess := session.Start(w, r)
	// get the sessions
	username_session := sess.GetString("user_name")	// get username session
	fmt.Println("Session:", username_session)

	// html template data
	html_data := struct{
		HtmlTitle             		string
		HtmlTableValueFromItems		[]models.Items_Columns
		HtmlUserSession				bool
	}{}

	html_data.HtmlTitle = "Simple StockApps"
	html_data.HtmlTableValueFromItems = models.ModelsSelectFromItems()

	//items := models.ModelsSelectFromItems()
	//log.Println(items[0].Item_name)
	//log.Println(reflect.TypeOf(items))

	// if username session is not null or user has already logged in into system
	if len(username_session) != 0 {
		html_data.HtmlUserSession = true
	} else {
		html_data.HtmlUserSession = false
	}

	// create function map for template
	// add `tambah` function for adding number (arithmetic)
	funcMap := template.FuncMap{
		"tambah": func(i int) int {
			return i + 1
		},
	}

	// template file
	tpl_filename := "views/main.tpl"
	tpl, err := template.New("").Funcs(funcMap).Delims("[[", "]]").ParseFiles(tpl_filename)
	if err != nil {
		log.Println("[!] ERROR:", err)
	}
	// execute template with the given value from html_data struct 
	err = tpl.ExecuteTemplate(w, "main_layout", html_data)
	if err != nil {
		log.Println("[!] ERROR:", err)
	}
}

//////////////////////////////////////////////////////////////////////////////////
// Web Socket
var upgrader = websocket.Upgrader{
	ReadBufferSize:		1024,
	WriteBufferSize:	1024,
}
func (this *MainController) AppWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("[!] ERROR: WebSocket", err)
	}

	// send and receive message using WebSocket (Server-side)
	for {
		message_type, p , err := conn.ReadMessage()
		if err != nil {
			log.Println("[!] ERROR: WebSocket", err)
		}
		if err := conn.WriteMessage(message_type, p); err != nil {
			log.Println("[!] ERROR: WebSocket", err)
		}
	}
}

// end of Web Socket
//////////////////////////////////////////////////////////////////////////////////

// login process handler
// custom login authentication
// checking if username and password is exists (matching)
func (this *MainController) AppLogin(w http.ResponseWriter, r *http.Request) {
	sess := session.Start(w, r)
	// set header as "application/json"
	w.Header().Set("Content-Type", "application/json")

	r.ParseForm()	// parsing form (data input)
	//log.Println(r.Form["username"])
	//log.Println(r.Form["password"])
	username := r.Form["username"][0]
	password := r.Form["password"][0]

	// check username and password in table
	// if exists then return true,
	// else, return false
	user_isExists := models.ModelsReadLogin(username, password) // print true / false
	// print testing
	//log.Println(user_isExists)

	// outgoingJSON for outgoing JSON data that send to web client
	// errJSON error
	var outgoingJSON []byte
	var errJSON error
	// for send JSON data as authentication message
	json_login_auth := struct {
		AuthLoginMessage    	bool	`json:"Message"`
		AuthRedirectUrl     	string	`json:"Redirect_Url"`
	}{}

	// authentication
	if user_isExists {
		json_login_auth.AuthLoginMessage = true
		json_login_auth.AuthRedirectUrl = "/"
		outgoingJSON, errJSON = json.Marshal(json_login_auth)

		// set secure cookie
		hash_key := []byte("rahasia")
		secure_cookie := securecookie.New(hash_key, nil)
		encoded_value, err := secure_cookie.Encode("simple_stockapps_login", username)
		if err != nil {
			log.Println("[!] ERROR:", err)
		}
		// set cookie and expiration
		cookie := &http.Cookie{
			Name:		"simple_stockapps_login",
			Value:		encoded_value,
			Path:		"/",
			Expires:	time.Now().Add(2 * time.Hour),
		}
		http.SetCookie(w, cookie)
		sess.Set("user_name", username)
	} else {
		json_login_auth.AuthLoginMessage = false
		json_login_auth.AuthRedirectUrl = "none"
		outgoingJSON, errJSON = json.Marshal(json_login_auth)
	}

	if errJSON != nil {
		log.Println(errJSON)
	}
	//fmt.Println(string(outgoingJSON))
	fmt.Fprint(w, string(outgoingJSON))	
}

// AppLogout for destroy all user login sessions
// User will logout
func (this *MainController) AppLogout(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	sess := session.Start(w, r)
	sess.Delete("user_name")
	session.Destroy(w, r)
	http.Redirect(w, r, "/", 302)
}