var radialList = [{
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
];

function ArrayGenerator(text, length) {
	let arr = [];
	for (var l = 0; l < length; l++) {
		arr.push({
			title: text + " " + l
		});
	}
	return arr;
}

document.querySelector(".radial-menu-container").radialMenu({
	list: radialList,
	mainText: "My main"
});

document.querySelector(".radial-menu-container-2").radialMenu({
	list: ArrayGenerator("Custom text", 20),
	mainText: "Main",
	levels: 2
});