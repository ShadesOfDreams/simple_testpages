var watchCollectionInfo = {
  title: "$scope.$watchCollection",
  list: [{
    title: "To watch object not part of scope:",
    list: [{
      title: "watchExpression",
      code: "angular.bind(this, () => this.data)",
      codeType: "js"
    }]
  }]
}

// DESCRIPTIONS
Array.from(document.getElementsByClassName("description")).forEach(function (
  descrpition
) {
  if (descrpition.classList.contains("watchCollectionInfo")) {
    descrpition.appendChild(printInfo(centerElementInfo));
  }
});