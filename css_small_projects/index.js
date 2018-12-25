// Back button: 
Array.from(document.getElementsByClassName("forward")).forEach(function (item) {
	item.addEventListener("click", function (event) {
		window.location = event.currentTarget.getAttribute("url");
	});
});