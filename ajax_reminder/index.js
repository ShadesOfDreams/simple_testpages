var watchCollectionInfo = {
  title: "Ajax reminder",
  list: [{
      title: "GET"
    },
    {
      title: "POST",
      list: [{
          description: "Data in header/body"
        },
        {
          title: "header",
        }
      ]
    }
  ]
}

// DESCRIPTIONS
Array.from(document.getElementsByClassName("description")).forEach(function (
  descrpition
) {
  if (descrpition.classList.contains("watchCollectionInfo")) {
    descrpition.appendChild(printInfo(centerElementInfo));
  }
});