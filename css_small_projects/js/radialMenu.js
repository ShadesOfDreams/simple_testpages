var radialMenu = {
	list: [
		{
			title: "SubElement 1"
		},
		{
			title: "SubElement 2"
		},
		{
			title: "SubElement 3"
		},
		{
			title: "SubElement 4"
		},
		{
			title: "SubElement 5"
		},
		{
			title: "SubElement 6"
		},
		{
			title: "SubElement 7"
		},
		{
			title: "SubElement 8"
		}
	],
	menu: document.getElementById("radial-menu"),
	main: document.querySelector("#radial-menu .main-menu"),
	subList: document.querySelector("#radial-menu .sub-menu-container"),
	subItems: [] // upload later...
};

// Submenu list upload
radialMenu.list.forEach(function(elem) {
	let listItem = document.createElement("li");
	listItem.classList.add("sub-menu-item");
	let text = document.createElement("span");
	text.innerText = elem.title;
	listItem.appendChild(text);
	// add to ul inside
	radialMenu.subList.firstElementChild.appendChild(listItem);
});

radialMenu.subItems = [
	...document.querySelectorAll("#radial-menu .sub-menu-item")
];

function CalculateSubMenuPosition(position, subMenu) {
	// /x = r * cos(angle.rad) + center.hor
	// /y = r * sin(angle.rad) + center.k..
	var radian = position.degree * (Math.PI / 180);
	subMenu.style.top =
		position.radiusLenght * Math.cos(radian) + position.origoPosition.y + "px";

	subMenu.style.left =
		position.radiusLenght * Math.sin(radian) + position.origoPosition.x + "px";

	position.degree = position.degree - position.stepInDegree;
}

function ResetSubMenuPosition(subMenu) {
	subMenu.setAttribute("style", "");
}

function ToggleRadialMenu(event) {
	// just in case - only if open
	if (!radialMenu.main.classList.contains("opened")) {
		radialMenu.main.classList.add("opened");
		// open submenu list
		radialMenu.subList.classList.add("opened");
		// Set subitems position
		var position = {
			degree: 180,
			stepInDegree: 360 / radialMenu.subItems.length,
			radiusLenght: radialMenu.menu.offsetHeight / 2 - 50,
			origoPosition: {
				x: radialMenu.subList.offsetWidth / 2,
				y: radialMenu.subList.offsetHeight / 2
			}
		};
		radialMenu.subItems.forEach(CalculateSubMenuPosition.bind(null, position));
	} else {
		radialMenu.main.classList.remove("opened");
		radialMenu.subList.classList.remove("opened");
		radialMenu.subItems.forEach(ResetSubMenuPosition);
	}
}

function CloseRadialMenu(event) {
	event.target.classList.remove("opened");
	// unsibscribe from event until opened again
	radialMenu.menu.removeEventListener("mouseleave", this);
}

// Open menu
radialMenu.main.addEventListener("click", ToggleRadialMenu);

radialMenu.subItems.forEach(function(submenu) {
	submenu.addEventListener("click", function(event) {
		radialMenu.main.classList.remove("opened");
	});
});
