/**
 * @description creates a radial menu, dependencies: isElement & CreateElement function is common.js
 * @param {*} param option with the array
 */
function RadialMenu(param) {
	// basic checking is parameters are OK
	if (param.list && param.container && isElement(param.container)) {
		console.log("element not found, menu cannot be initialized");
		return null;
	}

	// initialize the menu's object
	var radialMenu = {
		list: [],
		container: null,
		menu: "radial-menu",
		mainText: "Main menu",
		main: "main-menu",
		subList: "sub-menu-container",
		subItemClassName: "sub-menu-item",
		subItems: [] // upload later...
	};

	// set menu's object with the parameters
	if (typeof param === "object") {
		radialMenu = Object.assign({}, radialMenu, param);
		if (typeof param.menu === "string") {
			radialMenu.menu = document.querySelector(param.menu);
		}
		if (typeof param.subList === "string") {
			radialMenu.subList = document.querySelector(param.subList);
		}
		if (typeof param.main === "string") {
			radialMenu.main = document.querySelector(param.main);
		}
	} else if (typeof param === "array") {
		radialMenu.list = param
	}

	// set the container element
	radialMenu.container = container ?
		(typeof container === "string" ?
			document.querySelector(container) : container) :
		(typeof param.container === "string" ?
			document.querySelector(param.container) : param.container);

	// create menu base HTML structure
	try {
		radialMenu.menu = CreateElement({
			tagName: "div",
			id: radialMenu.menu,
			className: "menu-container",
		}, radialMenu.container);

		radialMenu.subList = CreateElement({
			tagName: "div",
			className: radialMenu.subList
		}, radialMenu.menu);

		radialMenu.main = CreateElement({
			tagName: "div",
			className: radialMenu.main,
		}, radialMenu.menu);

		CreateElement({
			tagName: "span",
			innerText: radialMenu.mainText
		}, radialMenu.main)

	} catch (error) {
		console.log(error);
	}

	// Submenu list upload
	radialMenu.list.forEach(function (elem) {
		let listItem = CreateElement({
			tagName: "div",
			className: radialMenu.subItemClassName +
				(elem.class ? " " + elem.class : "")
		}, radialMenu.subList);
		// document.createElement("div");
		// listItem.classList.add(radialMenu.subItemClassName);
		// if (elem.class) {
		// 	listItem.classList.add(elem.class);
		// }
		let text = CreateElement({
			tagName: "span",
			innerText: elem.title
		}, listItem)
		//  document.createElement("span");
		// text.innerText = elem.title;
		// listItem.appendChild(text);
		// add to ul inside
		radialMenu.subList.appendChild(listItem);
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

	radialMenu.subItems.forEach(function (submenu) {
		submenu.addEventListener("click", function (event) {
			radialMenu.main.classList.remove("opened");
		});
	});

}