[[ define "reports_layout" ]]
[[ template "script". ]]
<div id="app-ajax-reports">
	<h4 style="padding-left: 5px; color: #d63031;">History Dashboard</h4><hr>
	<div id="app-side-nav">
		<button class="history-all menu-button" href="javascript:void(0)">All History</button>&nbsp;
		<button class="history-my menu-button" href="javascript:void(0)">My History</button><br><br>
	</div>
	<div id="history-wrapper">
		[[ template "get_all_history". ]]
		[[ template "get_my_history". ]]
		[[ template "notes_popup". ]]
	</div>
</div>
[[ end ]]

[[ define "script" ]]
<script>
	var allHistoryButton = $("button.history-all");
	var myHistoryButton = $("button.history-my");
	var allHistoryBox = $("div#history-all-box");
	var myHistoryBox = $("div#history-my-box");
	var hashUrl = window.location.hash;

	// get partly string from hash url
	// : navbar?#navigate_link=/users#add, partly option string is "add"
	var getOptionFromHash = hashUrl.substring(24);

	$(function() {
		allHistoryBox.css("display", "block");
		switch (getOptionFromHash) {
			case "my":
				allHistoryBox.css("display", "none");
				myHistoryBox.css("display", "block");
				appGetMyHistory();
				$("title").text("My History - Simple StockApps");
			break;
		}
		appSubNavigationOnClick();
		appGetAllHistory();
		appGetMyHistory();
	});

	function appSubNavigationOnClick() {
		allHistoryButton.click(function() {
			var stateObj = {page: "reports"};
			history.pushState(stateObj, "reports", "/navbar?#navigate_link=/reports");
			allHistoryBox.css("display", "block");
			myHistoryBox.css("display", "none");
			$("title").text("History Dashboard - Simple StockApps");
			appGetAllHistory();
		});
		myHistoryButton.click(function() {
			var stateObj = {page: "reports"};
			history.pushState(stateObj, "reports", "/navbar?#navigate_link=/reports#my");
			allHistoryBox.css("display", "none");
			myHistoryBox.css("display", "block");
			$("title").text("My History - Simple StockApps");
			appGetMyHistory();
		});
	}
	function appGetAllHistory() {
		$.ajax({
			url: "/json_get_side_notification",
			async: true,
			success: function(res) {
				var respLength = res.length;
				var i;
				var resultHistory;
				resultHistory = "<br>";
				for (i=0; i<respLength; i++) {
					resultHistory += "<div class='history-content' data-by='"+res[i].history_by+"' data-notes='"+res[i].history_notes+"' title='Click for display notes'>";
					resultHistory += res[i].history_content;
					resultHistory += "</div>";
				}
				document.getElementById("history-all-box").innerHTML = resultHistory;

				var historyContent = $("div.history-content");
				// history content box
				historyContent.click(function() {
					var thisBy = $(this).attr("data-by");
					var thisNotes = $(this).attr("data-notes");
					var notes;
					var jqueryGetModal = $("div#history-modal");
					var getModal = document.getElementById("history-modal");
					var getContent = document.getElementById("history-modal-content");
					notes = "<h4>Notes</h4><hr>";
					notes += "<p><i>" + thisNotes + "</i></p>";
					notes += "<p> -"+ thisBy +"- </p>";
					notes += "<p style='text-align: center;'><button class='close-modal'>Close</button></p>";

					jqueryGetModal.fadeIn(300);
					window.onclick = function(e) {
						if (e.target == getModal) {
							jqueryGetModal.fadeOut(300);
						}
					}

					getContent.innerHTML = notes;
					$("button.close-modal").click(function() {
						jqueryGetModal.fadeOut(300);
					});
				});
			}
		});
	}
	function appGetMyHistory() {
		$.ajax({
			url: "/json_get_my_history",
			async: true,
			success: function(res) {
				var respLength = res.length;
				var i;
				var resultHistory;
				resultHistory = "<br>";
				for (i=0; i<respLength; i++) {
					resultHistory += "<div class='history-content' data-by='"+res[i].history_by+"' data-notes='"+res[i].history_notes+"' title='Click for display notes'>";
					resultHistory += res[i].history_content;
					resultHistory += "</div>";
				}
				document.getElementById("history-my-box").innerHTML = resultHistory;
				var historyContent = $("div.history-content");
				// history content box
				historyContent.click(function() {
					var thisBy = $(this).attr("data-by");
					var thisNotes = $(this).attr("data-notes");
					var notes;
					var jqueryGetModal = $("div#history-modal");
					var getModal = document.getElementById("history-modal");
					var getContent = document.getElementById("history-modal-content");
					notes = "<h4>Notes</h4><hr>";
					notes += "<p><i>" + thisNotes + "</i></p>";
					notes += "<p> -"+ thisBy +"- </p>";
					notes += "<p style='text-align: center;'><button class='close-modal'>Close</button></p>";

					jqueryGetModal.fadeIn(300);
					window.onclick = function(e) {
						if (e.target == getModal) {
							jqueryGetModal.fadeOut(300);
						}
					}

					getContent.innerHTML = notes;
					$("button.close-modal").click(function() {
						jqueryGetModal.fadeOut(300);
					});
				});
			}
		});
	}
</script>
[[ end ]]

[[ define "notes_popup" ]]
<div id="history-modal" class="modal">
	<div id="history-modal-content" class="modal-content"></div>
</div>
[[ end ]]

[[ define "get_all_history" ]]
<div id="history-all-box"></div>
[[ end ]]

[[ define "get_my_history" ]]
<div id="history-my-box"></div>
[[ end ]]