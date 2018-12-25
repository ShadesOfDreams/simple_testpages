/**
 * @description creates a radial menu, dependencies: isElement & CreateElement function is common.js
 * @param {*} param option with the array
 */
HTMLElement.prototype.radialMenu = function (options) {
	// TODO: ellipsis -> unequal space between elements

	// basic checking is parameters are OK
	if (!options.list) {
		console.log("required paramteres not set");
		return null;
	}

	// initialize the menu's object
	var radialMenu = {
		list: [],
		menu: "radial-menu",
		mainText: "Main menu",
		main: "main-menu",
		subList: "sub-menu-container",
		subItemClassName: "sub-menu-item",
		subItems: [], // upload later...
		subMenuWidth: 80,
		subMenuWidthUnit: "px",
		subMenuContainerPadding: 50,
		subMenuContainerPaddingUnit: "px",
		levels: 1,
		currentLevel: 1
	};

	// set menu's object with the parameters
	if (typeof options === "object") {
		radialMenu = Object.assign({}, radialMenu, options);
	} else if (typeof options === "array") {
		radialMenu.list = options;
	}

	// levels must be 1 or greater number
	if (!radialMenu.levels || isNaN(radialMenu.levels) || radialMenu.levels < 1) {
		radialMenu.levels = 1;
	}

	// currentLevel must be 1 or greater number
	if (!radialMenu.currentLevel || isNaN(radialMenu.currentLevel) || radialMenu.currentLevel < 1) {
		radialMenu.currentLevel = 1;
	}

	// create menu base HTML structure
	try {
		radialMenu.menu = CreateElement({
				tagName: "div",
				id: radialMenu.menu,
				className: "menu-container"
			},
			this
		);

		radialMenu.subList = CreateElement({
				tagName: "div",
				className: radialMenu.subList
			},
			radialMenu.menu
		);

		radialMenu.main = CreateElement({
				tagName: "div",
				className: radialMenu.main
			},
			radialMenu.menu
		);

		CreateElement({
				tagName: "span",
				innerText: radialMenu.mainText
			},
			radialMenu.main
		);
	} catch (error) {
		console.log(error);
	}

	// Submenu list upload
	radialMenu.list.forEach(function (elem) {
		if (typeof elem === "string") {
			elem = {
				title: elem
			}
		}
		let listItem = CreateElement({
				tagName: "div",
				className: radialMenu.subItemClassName + (elem.class ? " " + elem.class : "")
			},
			radialMenu.subList
		);
		let text = CreateElement({
				tagName: "span",
				innerText: elem.title
			},
			listItem
		);
		radialMenu.subList.appendChild(listItem);
		radialMenu.subItems.push(listItem);
	});

	/**
	 * 
	 * @param {Object} position Position object
	 * @param {Object} subMenu Current sugmenu DOM element
	 */
	function CalculateSubMenuPosition(position, subMenu) {
		// /x = r * cos(angle.rad) + center.hor
		// /y = r * sin(angle.rad) + center.k..
		subMenu.style.top =
			position.radiusLenght() * Math.cos(position.radian()) +
			position.origoPosition.y +
			radialMenu.subMenuWidth / 2 * -1 +
			"px";

		subMenu.style.left =
			position.radiusLenght() * Math.sin(position.radian()) +
			position.origoPosition.x +
			radialMenu.subMenuWidth / 2 * -1 +
			"px";

		position.degree = position.degree - position.stepInDegree;

		// set level
		radialMenu.currentLevel =
			radialMenu.levels > 1 ?
			radialMenu.currentLevel < radialMenu.levels ?
			++radialMenu.currentLevel :
			1 :
			1;
	}

	/**
	 * @description Resets the current submenu inline position
	 * @param {Object} subMenu Current submenu
	 */
	function ResetSubMenuPosition(subMenu) {
		subMenu.setAttribute("style", "");
	}

	/**
	 * @description Gets radius legnth of current degree
	 */
	function GetRadius() {
		var b =
			radialMenu.subList.offsetWidth / 2 / radialMenu.currentLevel -
			(radialMenu.currentLevel === 1 ? radialMenu.subMenuContainerPadding : 0);
		var a =
			radialMenu.subList.offsetHeight / 2 / radialMenu.currentLevel -
			(radialMenu.currentLevel === 1 ? radialMenu.subMenuContainerPadding : 0);
		return radius =
			a * 0
		b /
			Math.sqrt(
				Math.pow(a, 2) * Math.pow(Math.sin(this.radian()), 2) +
				Math.pow(b, 2) * Math.pow(Math.cos(this.radian()), 2)
			);
	}

	/**
	 * @description Open / close radial menu
	 * @param {Event} event 
	 */
	function ToggleRadialMenu(event) {
		// just in case - only if open
		if (!radialMenu.main.classList.contains("opened")) {
			radialMenu.main.classList.add("opened");
			// open submenu list
			radialMenu.subList.classList.add("opened");
			// Set subitems position
			var position = {
				degree: 180,
				radian: function () {
					return this.degree * (Math.PI / 180);
				},
				stepInDegree: 360 / radialMenu.subItems.length,
				// in case of unequal width and height length
				radiusLenght: radialMenu.menu.offsetHeight === radialMenu.menu.offsetWidth ?
					function () {
						return radialMenu.menu.offsetHeight / 2 -
							radialMenu.subMenuContainerPadding;
					} : GetRadius,
				origoPosition: {
					x: radialMenu.subList.offsetWidth / 2,
					y: radialMenu.subList.offsetHeight / 2
				}
			};
			radialMenu.subItems.forEach(
				CalculateSubMenuPosition.bind(null, position)
			);
		} else {
			radialMenu.main.classList.remove("opened");
			radialMenu.subList.classList.remove("opened");
			radialMenu.subItems.forEach(ResetSubMenuPosition);
		}
	}

	/**
	 * Closes radial menu
	 * @param {Event} event 
	 */
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
};