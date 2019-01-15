var jsArrayInfo = {
  title: "JS array functions",
  list: [{
      title: "add item",
      list: [{
          code: "array.push(item);",
          description: "add item to end",
        },
        {
          code: "[item, ...array];",
          description: "add item to first place",
        }
      ]
    },
    {
      title: "remove item",
      list: [{
        code: "array.spilce([index], [count]);",
        description: "count = how many to delete"
      }]
    },
  ]
}

// DESCRIPTIONS
Array.from(document.getElementsByClassName("description")).forEach(function (
  descrpition
) {
  if (descrpition.classList.contains("jsArrayInfo")) {
    descrpition.appendChild(printInfo(jsArrayInfo));
  }
});