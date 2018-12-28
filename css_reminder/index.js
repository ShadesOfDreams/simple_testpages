var centerElementInfo = {
	title: "To center element",
	list: [{
			title: "Parent:",
			list: [{
					code: "position: realitve;",
					codeType: "css"
				},
				{
					text: "given height"
				}
			]
		},
		{
			title: "Child (span)",
			list: [{
					code: "position: absolute;",
					codeType: "css"
				},
				{
					code: "top: 50%;",
					codeType: "css"
				},
				{
					code: "transform: translate(-50%, -50%);",
					codeType: "css"
				},
				{
					code: "text-align: center;",
					codeType: "css"
				},
				{
					code: "width: 100%;",
					codeType: "css"
				}
			]
		}
	]
};

var fileInputButtonInfo = {
	title: "How to change file input button design",
	list: [{
			title: "<input>",
			list: [{
					code: "opacity: 0;",
					codeType: "css"
				},
				{
					code: "width: 0.1px;",
					codeType: "css"
				}
			]
		},
		{
			title: "<label>",
			description: "Any design..."
		}
	]
};

var heightTransitionInfo = {
	title: "Height transition",
	link: [{
		code: ".[collapsible-body]",
		codeType: "css",
		link: [{
				code: "height: 100%;",
				codeType: "css"
			},
			{

			}
		]
	}]
}

Array.from(document.getElementsByClassName("description")).forEach(function (
	descrpition
) {
	if (descrpition.classList.contains("centerInfo")) {
		descrpition.appendChild(printInfo(centerElementInfo));
	} else if (descrpition.classList.contains("fileInputButtonInfo")) {
		descrpition.appendChild(printInfo(fileInputButtonInfo));
	}
});

// PAGES
Array.from(document.getElementsByClassName("presentation")).forEach(function (
	presentation
) {
	presentation.collapsibleBlock({
		title: presentation.getAttribute("presentation"),
		convertTitle: true
	});
});

// Custom scripts:

// Collapsible example script
function changeCollapseBlock(event) {
	var block = document.getElementById("colllapseBlock");
	if (block.classList.contains("opened")) {
		block.classList.remove("opened");
	} else {
		block.classList.add("opened");
	}
}

function setHeightValueDisplay(params) {
	document.getElementById("collapseBlockSize").innerText =
		document.getElementById("colllapseBlock").offsetHeight;
}

var collpasbileHeightTrackingInterval = setInterval.bind(null, setHeightValueDisplay, 250);

document.getElementById("colllapseBlock")
	.addEventListener("transitionend", function (event) {
		clearInterval(collpasbileHeightTrackingInterval);
	});
document.getElementById("colllapseBlock")
	.addEventListener("transitionstart", function (params) {
		collpasbileHeightTrackingInterval()
	});