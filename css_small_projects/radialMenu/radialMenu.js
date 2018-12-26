/**
 * @description creates a radial menu, dependencies: isElement & CreateElement function is common.js
 * @param {*} param option with the array
 */
HTMLElement.prototype.radialMenu = function (options) {
	// TODO: ellipsis -> unequal space between elements
	// TODO: nyitva maradt menü eset: main katt nyitott állapotban...

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
		subItemsPosition: [],
		subMenuWidth: 80,
		subMenuWidthUnit: "px",
		subMenuContainerPadding: 50,
		// TODO unused
		subMenuContainerPaddingUnit: "px",
		levels: 1,
		currentLevel: undefined,
		closeOnMouseleave: true,
		openOnMouseenter: true
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
	if (
		!radialMenu.currentLevel ||
		isNaN(radialMenu.currentLevel) ||
		radialMenu.currentLevel < 1
	) {
		radialMenu.currentLevel = 1;
	}

	// create menu base HTML structure
	try {
		radialMenu.menu = CreateElement({
				tagName: "div",
				id: radialMenu.menu,
				className: "radial-menu-container"
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

	// add sublist's background
	CreateElement({
			tagName: "div",
			className: "sub-menu-container-background"
		},
		radialMenu.subList
	);

	// Submenu list upload
	radialMenu.list.forEach(function (elem) {
		if (typeof elem === "string") {
			elem = {
				title: elem
			};
		}
		let listItem = CreateElement({
				tagName: "div",
				className: radialMenu.subItemClassName + (elem.class ? " " + elem.class : "")
			},
			radialMenu.subList
		);
		listItem.addEventListener("click", function (event) {
			if (this.getAttribute("url")) {
				window.location = this.getAttribute("url");
			} else {
				CloseRadialMenu();
			}
		});
		let text = CreateElement({
				tagName: "span",
				innerText: elem.title
			},
			listItem
		);
		radialMenu.subList.appendChild(listItem);
		radialMenu.subItems.push(listItem);
	});

	// TODO calculate only once

	/**
	 * 
	 * @param {Object} position Position object
	 * @param {Object} subMenu Current sugmenu DOM element
	 */
	function CalculateSubMenuPosition(position, subMenu) {
		// /x = r * cos(angle.rad) + center.hor
		// /y = r * sin(angle.rad) + center.k..
		radialMenu.subItemsPosition.push({
			top: position.radiusLenght() * Math.cos(position.radian()) +
				position.origoPosition.y +
				radialMenu.subMenuWidthUnit,
			left: position.radiusLenght() * Math.sin(position.radian()) +
				position.origoPosition.x +
				radialMenu.subMenuWidthUnit
		});
		if (radialMenu.currentLevel === radialMenu.levels) {
			position.degree = position.degree - position.stepInDegree;
		}

		// set level
		radialMenu.currentLevel =
			radialMenu.levels > 1 ?
			radialMenu.currentLevel === radialMenu.levels ?
			1 :
			++radialMenu.currentLevel :
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
		var b = radialMenu.subList.offsetWidth / 2;
		var a = radialMenu.subList.offsetHeight / 2;
		if (radialMenu.levels > 1) {
			a =
				a * radialMenu.currentLevel / radialMenu.levels -
				(radialMenu.currentLevel === radialMenu.levels ?
					radialMenu.subMenuContainerPadding :
					radialMenu.subItems[0].offsetHeight / 2);
			b =
				b * radialMenu.currentLevel / radialMenu.levels -
				(radialMenu.currentLevel === radialMenu.levels ?
					radialMenu.subMenuContainerPadding :
					radialMenu.subItems[0].offsetHeight / 2);
		}
		return (
			a *
			b /
			Math.sqrt(
				Math.pow(a, 2) * Math.pow(Math.sin(this.radian()), 2) +
				Math.pow(b, 2) * Math.pow(Math.cos(this.radian()), 2)
			)
		);
	}

	/**
	 * @description Open / close radial menu
	 * @param {Boolean} openMenu Toggle menu manually - open or close?
	 */
	function ToggleRadialMenu(openMenu) {
		// just in case - only if open
		if (!radialMenu.main.classList.contains("opened") || openMenu === true) {
			radialMenu.main.classList.add("opened");
			// open submenu list
			radialMenu.subList.classList.add("opened");
			for (let index = 0; index < radialMenu.subItems.length; index++) {
				radialMenu.subItems[index].style.top =
					radialMenu.subItemsPosition[index].top;
				radialMenu.subItems[index].style.left =
					radialMenu.subItemsPosition[index].left;
			}
			// cose if mouse leaves menu - hover effect
			if (radialMenu.closeOnMouseleave) {
				radialMenu.menu.addEventListener("mouseleave", CloseRadialMenu);
			}
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
		ToggleRadialMenu(false);
		if (radialMenu.closeOnMouseleave) {
			// unsibscribe from event until opened again
			radialMenu.menu.removeEventListener("mouseleave", CloseRadialMenu);
		}
	}

	// Initialize
	(function () {
		// Set subitems position
		var position = {
			degree: 180,
			radian: function () {
				return this.degree * (Math.PI / 180);
			},
			stepInDegree: 360 / (radialMenu.levels > 1 ?
				Math.ceil(radialMenu.subItems.length / radialMenu.levels) : radialMenu.subItems.length),
			// in case of unequal width and height length
			radiusLenght: radialMenu.menu.offsetHeight === radialMenu.menu.offsetWidth ?
				function () {
					return (
						radialMenu.menu.offsetHeight / 2 -
						radialMenu.subMenuContainerPadding
					);
				} : GetRadius,
			origoPosition: {
				x: radialMenu.subList.offsetWidth / 2,
				y: radialMenu.subList.offsetHeight / 2
			}
		};
		radialMenu.subItems.forEach(CalculateSubMenuPosition.bind(null, position));
	})();

	// Open menu
	radialMenu.main.addEventListener("click", ToggleRadialMenu);

	// add mouseenter event, if default value is not overwritten with false
	if (radialMenu.openOnMouseenter) {
		radialMenu.main.addEventListener(
			"mouseenter",
			ToggleRadialMenu.bind(null, true)
		);
	}
};