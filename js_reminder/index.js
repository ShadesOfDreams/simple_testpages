var jsArrayInfo = {
  title: "JS array functions",
  list: [{
      title: "add item"
    },
    {
      title: "remove item"
    }
  ]
}

// DESCRIPTIONS
Array.from(document.getElementsByClassName("description")).forEach(function (
  descrpition
) {
  if (descrpition.classList.contains("jsArrayInfo")) {
    descrpition.appendChild(printInfo(centerElementInfo));
  }
});