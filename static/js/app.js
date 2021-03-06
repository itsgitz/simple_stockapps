// jQuery.3.2.1
var ws = new WebSocket('ws://10.24.24.76:8080/ws');
//var ws = new WebSocket('ws://localhost:8080/ws');
// all websocket request
const pickupRequest = "#001-pick-up";

// if browser support or not support
if (window.WebSocket) {
	console.log("Your web browser is support websocket");
} else {
	console.log("Your web browser doesn't support websocket");
}
ws.onopen = function() {
	console.log("WebSocket connection opened!");
	var greetingCard = "I'm connected with you :), My Platform: " + navigator.platform;
	ws.send(greetingCard);
}
ws.onclose = function() {
	console.log("WebSocket connection closed!");
	console.log("Ready: " + ws.readyState);
	console.log("WebSocket server connection is close... I'll try to reconnecting in 3s ... Or if I always try to reconnecting to websocket server, please clean the cookies and cache in your browser :) -AQX-");
	setTimeout(function() {
		window.location = "/";
	}, 3000);
	setTimeout(function() {
		console.log("Establish WebSocket server connection in 1s ... -AQX-")
		window.location = "/";
	}, 1000);
}
ws.onerror = function(error) {
	console.log(error);
}

// when websocket message arrive
ws.onmessage = function(e) {
	var tableBox = $("div#app-table-box");
	var sideNotificationBar = $("div#app-side-notif");
	console.log(window.location.hash);
	console.log("Pesan: "+ e.data);
	if (e.data) {
		switch(e.data) {
			case "#001-pick-up":
				tableBox.load(" #app-table-box", function() {
					appTableHandler();
					tableBox.hide();
					tableBox.fadeIn(300);
				});
				sideNotificationBar.load(" #app-side-notif", function() {
					appAjaxNotif();
					sideNotificationBar.hide();
					sideNotificationBar.fadeIn(300);
					if ($(window).width() < 750) {
						$("div#app-side-notif").css("display", "none");
					}
				});
			break;
			case "#002-edit-item":
				tableBox.load(" #app-table-box", function() {
					appTableHandler();
					tableBox.hide();
					tableBox.fadeIn(300);
				});
				sideNotificationBar.load(" #app-side-notif", function() {
					appAjaxNotif();
					sideNotificationBar.hide();
					sideNotificationBar.fadeIn(300);
					if ($(window).width() < 750) {
						$("div#app-side-notif").css("display", "none");
					}
				});
			break;
			case "#003-add-item":
				tableBox.load(" #app-table-box", function() {
					appTableHandler();
					tableBox.hide();
					tableBox.fadeIn(300);
				});
				sideNotificationBar.load(" #app-side-notif", function() {
					appAjaxNotif();
					sideNotificationBar.hide();
					sideNotificationBar.fadeIn(300);
					if ($(window).width() < 750) {
						$("div#app-side-notif").css("display", "none");
					}
				});
			break;
			case "#004-remove-item":
				tableBox.load(" #app-table-box", function() {
					appTableHandler();
					tableBox.hide();
					tableBox.fadeIn(300);
				});
				sideNotificationBar.load(" #app-side-notif", function() {
					appAjaxNotif();
					sideNotificationBar.hide();
					sideNotificationBar.fadeIn(300);
					if ($(window).width() < 750) {
						$("div#app-side-notif").css("display", "none");
					}
				});
			break;
			case "#005-update-item":
				tableBox.load(" #app-table-box", function() {
					appTableHandler();
					tableBox.hide();
					tableBox.fadeIn(300);
				});
				sideNotificationBar.load(" #app-side-notif", function() {
					appAjaxNotif();
					sideNotificationBar.hide();
					sideNotificationBar.fadeIn(300);
					if ($(window).width() < 750) {
						$("div#app-side-notif").css("display", "none");
					}
				});
			break;
			case "#006-cancel-pick-up":
				tableBox.load(" #app-table-box", function() {
					appTableHandler();
					tableBox.hide();
					tableBox.fadeIn(300);
				});
				sideNotificationBar.load(" #app-side-notif", function() {
					appAjaxNotif();
					sideNotificationBar.hide();
					sideNotificationBar.fadeIn(300);
					if ($(window).width() < 750) {
						$("div#app-side-notif").css("display", "none");
					}
				});
			break;
		}
	}
}
$(function() {
	////////// Main Page ///////////////////
	// login popup box function
	appLoginHandler();

	// table handler function
	// if when user load the browser and it has window hash location (#other_items), then
	// load other items in div#app-table-box
	var hashThisLocation = window.location.hash;
	switch(hashThisLocation) {
		case "#other_items": appAjaxLoad("/json_get_other_items"); break;
		case "#empty_items": appAjaxLoad("/json_get_empty_items"); break;
		default: appTableHandler();
	}

	appTableNavigation();
	appHomeSearchBar();
	appSideNotification();
});

// Login popup box function
function appLoginHandler() {
	// login form variable element
	var loginForm = $("form.app-login-form");
	// login popup box
	var loginPopupBox = $("div#app-login-popup");
	// login button and close button
	var signButton = $("button.app-sign-btn");
	var closeButton = $("button.app-close-btn");

	// show login popup when sign button clicked
	signButton.click(function() {
		loginPopupBox.fadeIn(300);
	});
	// close login popup
	closeButton.click(function() {
		loginPopupBox.fadeOut(300);
		loginForm[0].reset();
		$("div.app-login-alert").hide();
	});

	// login form for prevent default
	loginForm.submit(function(e) {
		e.preventDefault();
		// username and password value
		var usernameValue = $("input.app-username").val();
		var passwordValue = $("input.app-password").val();

		// submit while value not null
		if (usernameValue && passwordValue) {
		// these values will send to server (login controller) using AJAX method
			$.ajax({
				url: "/login",	// send data to login handler on server
				async: true,
				data: {
					username: usernameValue,
					password: passwordValue
				},
				success: function(jsonLoginDataAuth) {
					// jsonLoginDataAuth --> JSON data that sended from login handler AppLogin
					if (jsonLoginDataAuth.Message) {
						window.location = jsonLoginDataAuth.Redirect_Url;
					} else {
						$("div.app-login-alert").html("<b>Incorrect username or password!</b><br><br>");
						$("div.app-login-alert").hide();
						$("div.app-login-alert").fadeIn("300");
					}
				}
			});
			loginForm[0].reset(); // reset (clearing) the login form after submit
		}
	});
}

// appTableHandler for handling table items
function appTableHandler() {
	// AJAX Request
	$.ajax({
		url: "/json_get_items",
		async: true,
		success: function(res) {
			appShowItemsTable(res);
			appPickupFunction();
			appAddQty();
			appSubQty();
		},
		beforeSend: function(res) {
			$("div#app-table-box").html("<h2 style='color: #7f8c8d; padding: 50px;'>Loading please wait ...</h2>");
		},
		error: function(res) {
			console.log(res.responseText);
			$("div#app-table-box").html("<p style='color: #7f8c8d; padding: 30px; text-align:left;'>"+res.responseText+"</p>");
		}
	});
}

function appShowItemsTable(res) {
	var dataLength = res.length;
	var isLoggedIn = $("div#app-user-islogged-in").text();
	var isAdmin = $("div#app-user-is-admin").text();
	var tableMonitoring = "<table id='app-table' class='app-table' border='0' cellpadding='12' cellspacing='0'>";
	// window hash
	var windowHash = window.location.hash;
	tableMonitoring += "  <th>No.</th>";
	tableMonitoring += "  <th>Name</th>";
	tableMonitoring += "  <th>Model/Brand/Type</th>";
	tableMonitoring += "  <th>Quantity</th>";
	tableMonitoring += "  <th>Limitation</th>";
	tableMonitoring += "  <th>Used</th>";
	tableMonitoring += "  <th>Item Unit</th>";
	// window has "other_items" hash url, then show item owner column
	if (windowHash == "#other_items" || windowHash == "#empty_items") {
		tableMonitoring += "  <th>Owner</th>";
		tableMonitoring += "  <th>In</th>";
		tableMonitoring += "  <th>Time Period</th>";
		tableMonitoring += "  <th>Expired</th>";
	}
	tableMonitoring += "  <th>Location</th>";
	tableMonitoring += "  <th>Status</th>";
	
	if (isLoggedIn == "true") {
		tableMonitoring += "  <th colspan='3'>Action</th>";
	}

	// if data length (json) is exists or more than zero (0)
	if (dataLength > 0) {
		for (var i=0; i<dataLength; i++) {
			tableMonitoring += "  <tr>";
			tableMonitoring += "    <td>"+ (i+1) +"</td>";
			tableMonitoring += "    <td>"+ res[i].item_name +"</td>";
			tableMonitoring += "    <td>"+ res[i].item_model +"</td>";
			tableMonitoring += "    <td>"+ res[i].item_quantity +"</td>";
			tableMonitoring += "    <td>"+ res[i].item_limitation +"</td>";
			tableMonitoring += "    <td>"+ res[i].item_used +"</td>";
			tableMonitoring += "    <td>"+ res[i].item_unit +"</td>";
			if (windowHash == "#other_items" || windowHash == "#empty_items") {
				tableMonitoring += "     <td>"+res[i].item_owner+"</td>";
				tableMonitoring += "     <td>"+res[i].date_of_entry+"</td>";
				tableMonitoring += "     <td>"+res[i].item_time_period+"</td>";
				tableMonitoring += "     <td>"+res[i].item_expired+"</td>";
			}
			tableMonitoring += "    <td>"+res[i].item_location+"</td>";
			tableMonitoring += "    <td class='tb-status'>"+ res[i].item_status +"</td>";
			if (isLoggedIn == "true") {
				tableMonitoring += "    <td><a id='app-pick-btn' href='' data-item-id='"+res[i].item_id+"' data-item-name='"+res[i].item_name+"' data-item-quantity='"+res[i].item_quantity+"' data-item-limitation='"+res[i].item_limitation+"' data-item-owner='"+res[i].item_owner+"' data-item-unit='"+res[i].item_unit+"' data-location='"+res[i].item_location+"'>Pick Up</a></td>";
				if (isAdmin == "true") {
					tableMonitoring += "    <td><a id='app-add-qty-btn' href='' data-item-id='"+res[i].item_id+"' data-item-name='"+res[i].item_name+"' data-item-quantity='"+res[i].item_quantity+"' data-item-limitation='"+res[i].item_limitation+"' data-item-owner='"+res[i].item_owner+"' data-item-unit='"+res[i].item_unit+"' data-location='"+res[i].item_location+"'><img src='img/plus.svg' width='20px'></a></td>";
					tableMonitoring += "    <td><a id='app-sub-qty-btn' href='' data-item-id='"+res[i].item_id+"' data-item-name='"+res[i].item_name+"' data-item-quantity='"+res[i].item_quantity+"' data-item-limitation='"+res[i].item_limitation+"' data-item-owner='"+res[i].item_owner+"' data-item-unit='"+res[i].item_unit+"' data-location='"+res[i].item_location+"'><img src='img/minus-symbol.svg' width='20px'></a></td>";
				}
			}
			tableMonitoring += "  </tr>";
		}
	} else {
		tableMonitoring += "<tr>";
		tableMonitoring +=   "<td colspan='15'><h2>No Results have been found :(</h2></td>";
		tableMonitoring += "</tr>";
	}
	tableMonitoring += "</table>";

	// print the table in app-table-box
	document.getElementById("app-table-box").innerHTML = tableMonitoring;
}

// substract the quantity function
function appSubQty() {
	var subButton = $("a#app-sub-qty-btn");

	subButton.click(function(e) {
		e.preventDefault();
		var modal = document.getElementById("app-sub-modal");
		var content = document.getElementById("app-sub-content");
		var jqModal = $("div#app-sub-modal");
		var jqContent = $("div#app-sub-content");

		var getId = $(this).attr("data-item-id");
		var getName = $(this).attr("data-item-name");
		var getQty = $(this).attr("data-item-quantity");

		// fill content
		var textContent = "<table class='sub-table-qty'>";
		textContent += "  <tr>";
		textContent += "      <td>Name</td>";
		textContent += "      <td>"+getName+"</td>"
		textContent += "  </tr>";
		textContent += "  <tr>";
		textContent += "      <td>Current Quantity</td>";
		textContent += "      <td>"+getQty+"</td>";
		textContent += "  </tr>";
		textContent += "  <tr>";
		textContent += "      <td><input class='subtracted-qty' type='number' placeholder='Input Quantity'></td>";
		textContent += "  </tr>";
		textContent += "</table>";
		textContent += "  <p><button class='sub-button-submit'>Add</button><button class='sub-close-button'>Close</button></p>";
		content.innerHTML = textContent;

		// show the popup
		jqModal.fadeIn(300);

		window.onclick = function(e) {
			if (e.target == modal) {
				jqModal.fadeOut(300);
			}
		}

		var subButtonSubmit = $("button.sub-button-submit");
		var subCloseButton = $("button.sub-close-button");

		// close button clicked
		subCloseButton.click(function() {
			jqModal.fadeOut(300);
		});

		// add button submit clicked
		subButtonSubmit.click(function() {
			var homeMuch = $("input.subtracted-qty");
		});
	});
}

// add quantity button
function appAddQty() {
	var addButton = $("a#app-add-qty-btn");

	addButton.click(function(e) {
		e.preventDefault();
		var modal = document.getElementById("app-add-modal");
		var content = document.getElementById("app-add-content");
		var jqModal = $("div#app-add-modal");
		var jqContent = $("div#app-add-content");

		// name
		var getId = $(this).attr("data-item-id");
		var getName = $(this).attr("data-item-name");
		var getQty = $(this).attr("data-item-quantity");

		// fill content
		var textContent = "<table class='add-table-qty'>";
		textContent += "  <tr>";
		textContent += "      <td>Name</td>";
		textContent += "      <td>"+getName+"</td>"
		textContent += "  </tr>";
		textContent += "  <tr>";
		textContent += "      <td>Current Quantity</td>";
		textContent += "      <td>"+getQty+"</td>";
		textContent += "  </tr>";
		textContent += "  <tr>";
		textContent += "      <td><br><input class='added-qty' type='number' placeholder='Input Quantity' min='0'></td>";
		textContent += "  </tr>";
		textContent += "</table>";
		textContent += "  <p><button class='add-button-submit'>Add</button>&nbsp;<button class='add-close-button'>Close</button></p>";
		content.innerHTML = textContent;

		// show the popup
		jqModal.fadeIn(300);

		window.onclick = function(e) {
			if (e.target == modal) {
				jqModal.fadeOut(300);
			}
		}

		var addButtonSubmit = $("button.add-button-submit");
		var addCloseButton = $("button.add-close-button");

		// close button clicked
		addCloseButton.click(function() {
			jqModal.fadeOut(300);
		});

		// add button submit clicked
		addButtonSubmit.click(function() {
			var addedItem = $("input.added-qty").val();
			var waktu = appGenerateDateTime();
			var jqAlertBox = $("div#app-addqty-alert");
			var alertBox = document.getElementById("app-addqty-alert");

			if (!parseInt(addedItem) || parseInt(addedItem) == 0) {
				jqAlertBox.fadeOut(300);
				jqAlertBox.fadeIn(300);
				alertBox.innerHTML = "<span class='close-alert-addqty'>&times;</span><p>Please fill the quantity!</p>";
			} else {
				console.log(getId, getName, addedItem, waktu);
				$.ajax({
					url: "/add_qty",
					async: true,
					method: "POST",
					data: {
						item_name: getName,
						item_id: getId,
						added_item: addedItem,
						in_date: waktu
					},
					success: function(res) {
						if (res.redirect) {
							alert("Session has timed out :(");
							window.location = "/";
						} else {
							content.innerHTML = "<p style='padding: 10px; font-weight: bold; color: #3498db;'>" + res.message + "</p>";
							setTimeout(function() {
								jqModal.fadeOut(300);
							}, 2000);

							window.onclick = function(e) {
								if (e.target == modal) {
									jqModal.css("display", "block");
								}
							}
							ws.send("#005-update-item");
							jqAlertBox.fadeOut(300);
						}
					}
				});
			}
			$("span.close-alert-addqty").click(function() {
				jqAlertBox.fadeOut(300);
			});
		});
	});
}

function appPickupFunction() {
	// give style to status rows
	// if "Available" has blue background color
	// if "Limited" has orange background color
	$("div#app-table-box .tb-status").css("color", "#FFFFFF");
	$("div#app-table-box .tb-status").css("font-weight", "bolder");
	$("div#app-table-box .tb-status:contains(Available)").css("background-color", "#2980b9");
	$("div#app-table-box .tb-status:contains(Limited)").css("background-color", "#d35400");
	$("div#app-table-box .tb-status:contains(Not Available)").css("background-color", "#c0392b");

	var pickUpButton = $("a#app-pick-btn");

	pickUpButton.click(function(e) {
		e.preventDefault();
		var getItemId = $(this).attr("data-item-id");
		var getName = $(this).attr("data-item-name");
		var getQuantity = $(this).attr("data-item-quantity");
		var getUnit = $(this).attr("data-item-unit");
		var getLimitation = $(this).attr("data-item-limitation");
		var getOwner = $(this).attr("data-item-owner");
		var getLocation = $(this).attr("data-location");
				
		var pickupModalText;
		pickupModalText = "<div id='app-pickup-modal'>";
		pickupModalText += "   <div class='app-pickup-content'>";
		pickupModalText += "      <div id='tbl-input-content'>";
		pickupModalText += "         <table cellpadding='5px' cellspacing='0' style='border: solid 1px #ddd; font-size: 80%;'>";
		pickupModalText += "            <tr colspan='2'><td>Current Data</td></tr>";
		pickupModalText += "            <tr>";
		pickupModalText += "               <td>ID</td>";
		pickupModalText += "               <td>"+getItemId+"</td>";
		pickupModalText += "            </tr>";
		pickupModalText += "            <tr>";
		pickupModalText += "               <td>Name</td>";
		pickupModalText += "               <td>"+getName+"</td>";
		pickupModalText += "            </tr>";
		pickupModalText += "            <tr>";
		pickupModalText += "               <td>Owner</td>";
		pickupModalText += "               <td>"+getOwner+"</td>";
		pickupModalText += "            </tr>";
		pickupModalText += "            <tr>";
		pickupModalText += "               <td>Quantity</td>";
		pickupModalText += "               <td>"+getQuantity+"</td>";
		pickupModalText += "            </tr>";
		pickupModalText += "            <tr>";
		pickupModalText += "               <td>Unit</td>";
		pickupModalText += "               <td>"+getUnit+"</td>";
		pickupModalText += "            </tr>";
		pickupModalText += "            <tr>";
		pickupModalText += "               <td>Limitation</td>";
		pickupModalText += "               <td>"+getLimitation+"</td>";
		pickupModalText += "            </tr>";
		pickupModalText += "         </table>";
		pickupModalText += "         <br><label style='color: #27ae60; font-weight: bold;'>How much do you want to pick up?</label><br><br>";
		pickupModalText += "         <input class='app-howmuch' type='number' placeholder='Quantity'><br><br>";
		pickupModalText += "         <textarea class='text-notes' rows='5' cols='50' placeholder='Notes'></textarea>";				
		pickupModalText += "      </div>";
		pickupModalText += "      <div id='app-pickup-btn-box'>";
		pickupModalText += "         <br><button class='modal-button pickup-yes'>Pick up</button>&nbsp;<button class='modal-button pickup-close'>Close</button>";
		pickupModalText += "      </div>";
		pickupModalText += "   </div>";
		pickupModalText += "</div>";

		document.getElementById("app-modal-pickup-container").innerHTML = pickupModalText;

		// modal box
		var pickupModalBox = document.getElementById("app-pickup-modal");
		var closeBtn = document.getElementsByClassName("pickup-close")[0];
		var pickupYes = $("button.pickup-yes");

		// open modal
		var jqueryGetModalBox = $("div#app-pickup-modal");
		jqueryGetModalBox.fadeIn(300);

		// close modal if close button clicked
		var jqueryClose = $("button.pickup-close");
		jqueryClose.click(function() {
			jqueryGetModalBox.fadeOut(100);
			$("div#app-pickup-alert").fadeOut(300);
		});

		// if user clicks anywhere outside of the modal, then close it
		window.onclick = function(e) {
			if (e.target == pickupModalBox) {
				jqueryGetModalBox.fadeOut(100);
				$("div#app-pickup-alert").fadeOut(100);
			}
		}

		pickupYes.click(function () {
			// number of picked up by user
			var itemHowMuch = $("input.app-howmuch").val(); // a.k.a picked item

			var alertPickupMessage;
			var modalPickupAlert = document.getElementById("app-pickup-alert");
			var jqueryModalPickupAlert = $("div#app-pickup-alert");

			// user notes
			var textNotes = $("textarea.text-notes").val();

			var quantityToMin = parseInt(getQuantity - itemHowMuch);
			console.log(quantityToMin);
						
			if (parseInt(itemHowMuch)) {
				if (parseInt(itemHowMuch) < parseInt(getQuantity) && textNotes || parseInt(itemHowMuch) == parseInt(getQuantity)) {
					$.ajax({
						url: "/json_pickup_item",
						method: "POST",
						data: {
							item_id: getItemId,
							item_limitation: getLimitation,
							item_quantity_picked: quantityToMin,
							item_howmuch: itemHowMuch, // a.k.a picked item
							request: pickupRequest,
							notes: textNotes,
							item_unit: getUnit,
							item_name: getName,
							item_location: getLocation
						},
						async: true,
						success: function(res) {
							if (!res.Message_Timeout) {
								jqueryModalPickupAlert.fadeOut(300);
								$("div.app-pickup-content").html("<p style='padding: 10px; font-weight: bold; color: #3498db;'>"+res.Message+" Please wait ...</p>");
								$("div#app-pickup-btn-box").css("display", "none");
								setTimeout(function() {
									jqueryGetModalBox.fadeOut(300);
								}, 3000)
								// if user clicks anywhere outside of the modal
								window.onclick = function(e) {
									if (e.target == pickupModalBox) {
										$("div#app-pickup-modal").css("display", "block");
									}
								}
								// send websocket message
								ws.send(pickupRequest);
							} else {
								alert("Session has timed out :(");
								window.location = "/";
							}
						}
					});
				} else if (parseInt(itemHowMuch) > parseInt(getQuantity)) {
					alertPickupMessage = "<span class='close-alert'>&times;</span><br>";
					alertPickupMessage += "<p>The number of pick up is more than current quantity</p>";
					jqueryModalPickupAlert.html(alertPickupMessage);
					jqueryModalPickupAlert.fadeIn(300);
					$("span.close-alert").click(function() {
						jqueryModalPickupAlert.fadeOut(300);
					});
				} else if (!textNotes) {
					alertPickupMessage = "<span class='close-alert'>&times;</span><br>";
					alertPickupMessage += "<p>Notes is empty!</p>";
					jqueryModalPickupAlert.html(alertPickupMessage);
					jqueryModalPickupAlert.fadeIn(300);
					$("span.close-alert").click(function() {
						jqueryModalPickupAlert.fadeOut(300);
					});
				}
			} else {
				alertPickupMessage = "<span class='close-alert'>&times;</span><br>";
				alertPickupMessage += "<p>Please fill the quantity</p>";
				jqueryModalPickupAlert.html(alertPickupMessage);
				jqueryModalPickupAlert.fadeIn(300);
				$("span.close-alert").click(function() {
					jqueryModalPickupAlert.fadeOut(300);
				});
			}
		});
	});
}

function appTableNavigation() {
	var ourItemsButton = $("button.our-data");
	var otherItemsButton = $("button.other-data");
	var emptyItemsButton = $("button.empty-data");

	// when our items button is clicked
	ourItemsButton.click(function() {
		var stateObj = {page: "main"};
		history.pushState(stateObj, "main", "/");
		appAjaxLoad("/json_get_items");
	});
	// when other items button is clicked
	otherItemsButton.click(function() {
		// push history popstate
		var stateObj = {page: "other_items"};
		history.pushState(stateObj, "other_items", "#other_items");
		appAjaxLoad("/json_get_other_items");
	});
	// when empty items button is clicked
	emptyItemsButton.click(function() {
		var stateObj = {page: "empty_items"};
		history.pushState(stateObj, "empty_items", "#empty_items");
		appAjaxLoad("/json_get_empty_items");
	});
}

// Ajax Load Div
function appAjaxLoad(myUrl) {
	$.ajax({
		url: myUrl,
		async: true,
		success: function(res) {
			appShowItemsTable(res);
			appPickupFunction();
		},
		beforeSend: function(res) {
			$("div#app-table-box").html("<h2 style='color: #7f8c8d; padding: 50px;'>Loading please wait ...</h2>");
		}
	});
}

// showing side notification
function appSideNotification() {
	var navigationBar = document.getElementById("app-navbar");
	var jqueryGetSideNotificationBar = $("div#app-side-notif");
	var jqueryGetTableBox = $("div#app-table-box");
	var jqueryGetAppTableNav = $("div#app-table-nav");
	var jqueryHomeSearchBar = $("div#app-home-searchbar");
	
	if (navigationBar) {
		jqueryGetSideNotificationBar.css("top", "250px");
		jqueryGetTableBox.css("top", "300px");
		jqueryGetAppTableNav.css("top", "230px");
	}
	appAjaxNotif();
}
// get notification using ajax
function appAjaxNotif() {
	$.ajax({
		url: "/json_get_side_notification",
		async: true,
		success: function(res) {
			var i;
			var dataLength = res.length;
			var notificationText = "";

			if (dataLength != 0) {
				for (i=0; i<dataLength; i++) {
					notificationText += "<p class='notif-text'>"+res[i].history_content+"</p>";
				}
			} else {
				notificationText = "<h3	style='color: #27ae60; padding: 30px;'>Currently there is no recent activity in here</h3>";
			}

			document.getElementById("app-side-notif").innerHTML = notificationText;
		}
	});
}

function appHomeSearchBar() {
	var isLoggedIn = $("div#app-user-islogged-in").text();
	var homeSearchBar = $("input#app-home-searchbar");
	if (isLoggedIn == "true") {
		homeSearchBar.css("top", "20px");
	}
}

// Date and time
function appGenerateDateTime() {
	// Date and time variable
	// using current date and time on "date-of-entry" value when loaded
	var waktuBaru = new Date();	// new date object
	var tahun = waktuBaru.getFullYear(),	// full year (ex: 2017)
		bulan = waktuBaru.getMonth() + 1,		// month (ex: 10)
		tanggal = waktuBaru.getDate()		// date (ex: 01 or 12)
	var jam = waktuBaru.getHours(),
		menit = waktuBaru.getMinutes(),
		detik = waktuBaru.getSeconds();

	if (bulan < 10) {
		bulan = "0" + bulan;
	}

	if (tanggal < 10) {
		tanggal = "0" + tanggal;
	}

	if (jam < 10) {
		jam = "0" + jam;
	}

	if (menit < 10) {
		menit = "0" + menit;
	}

	if (detik < 10) {
		detik = "0" + detik;
	}
	var currentJam = jam + ":" + menit + ":" + detik;
	var currentTanggal = tahun + "-" + bulan + "-" + tanggal; //

	currentTime = currentTanggal + " " + currentJam;
	return currentTime;
}
