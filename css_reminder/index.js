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
        }, {
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

var inputFileButtonInfo = {
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
}

Array.from(document.getElementsByClassName("description"))
  .forEach(function (descrpition) {
    if (descrpition.classList.contains("centerInfo")) {
      descrpition.appendChild(printInfo(centerElementInfo))
    } else if (descrpition.classList.contains("inputFileButtonInfo")) {
      descrpition.appendChild(printInfo(inputFileButtonInfo));
    }
  });

// PAGES
Array.from(document.getElementsByClassName("project"))
  .forEach(function (project) {
    project.collapsibleBlock()
  })