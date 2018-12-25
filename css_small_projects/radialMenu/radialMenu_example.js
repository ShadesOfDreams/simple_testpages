// Back button: 
Array.from(document.getElementsByClassName("back")).forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    window.location = event.currentTarget.getAttribute("url");
  });
});

// Radial menu description
radialMenuInfo = {
  title: "Radial menu",
  list: [{
      title: "Initialize:",
      list: [{
        title: "Parameter options:",
        list: [{
            title: "list",
            type: "Array",
            description: "array of menu element",
            list: [{
                title: "If each element is an",
                type: "Object",
                list: [{
                    title: "object.title",
                    type: "String",
                    description: "Menu's text in <span> child"
                  },
                  {
                    title: "Additional attributes: .."
                  }
                ]
              },
              {
                title: "If each element is a",
                type: "String",
                description: "No options availible"
              }
            ]
          },
          {
            title: "menu",
            type: "String",
            description: "ID of menu (default: radial-menu)"
          },
          {
            title: "mainText",
            type: "String",
            description: "Main menu's text (default: Main menu)"
          },
          {
            title: "main",
            type: "String",
            description: "Main menu class (default: main-menu)"
          },
          {
            title: "subList",
            type: "String",
            description: "Submenus' container class (default: sub-menu-container)"
          },
          {
            title: "subItemClassName",
            type: "String",
            description: "Submenus' class (default: sub-menu-item)"
          },
          {
            title: "subMenuWidth",
            type: "Number",
            description: "Submenus' width (default: 80)"
          },
          {
            title: "subMenuWidthUnit",
            type: "String",
            description: "Unit type of submenus' widthe (default: px)"
          },
          {
            title: "subMenuContainerPadding",
            type: "Number",
            description: "Padding of submenus' container (default: 50)"
          },
          {
            title: "subMenuContainerPaddingUnit",
            type: "String",
            description: "Unit tpye of submenus' container padding (default: px)"
          },
          {
            title: "levels",
            type: "Number",
            description: "Number of levels (default: 1 === none)"
          },
          {
            title: "currentLevel",
            type: "Number",
            description: "Can be set as the starter level of first submenu (default: 1)"
          }
        ]
      }]
    },
    {
      title: "Default CSS selectors",
      list: [{
        title: ""
      }]
    }
  ]
}

Array.from(document.getElementsByClassName("description")).forEach(function (element) {
  if (element.classList.contains("radialMenuInfo")) {
    var info = printInfo(radialMenuInfo);
    element.appendChild(info);
  }
});

document.querySelector(".radial-menu-container").radialMenu({
  list: ArrayGenerator("Subelement", "string", 8),
});

document.querySelector(".radial-menu-container-2").radialMenu({
  list: ArrayGenerator("Custom text", "object", 20),
  mainText: "Main",
  levels: 1
});