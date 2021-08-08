const img = document.getElementById("image");
const imageFile = document.getElementById("image-file");
const colorIpnutContainer = document.getElementById("color-input-container")
const bgColor = document.getElementById("background-color");
const colorInput = document.getElementById("color-input");

imageFile.addEventListener("change", function (event) {
	var files = event.target && event.target.files;
	img.src = URL.createObjectURL(files[0]);
	colorIpnutContainer.className = colorIpnutContainer.className
		.split(" ")
		.filter(i => i != "hidden");
})

img.addEventListener("load", function (event) {
	bgColor.style.width = `${img.offsetWidth}px`;
	bgColor.style.height = `${img.offsetHeight}px`;
	bgColor.style.backgroundColor = colorInput.value;
})

colorInput.addEventListener("input", function (event) {
	bgColor.style.backgroundColor = event.target.value;
});