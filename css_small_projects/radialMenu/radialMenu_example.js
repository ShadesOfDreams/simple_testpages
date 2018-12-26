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
            code: "list",
            type: "Array",
            description: "array of menu element",
            list: [{
                title: "If each element is an",
                type: "Object",
                list: [{
                    code: "object.title",
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
            code: "menu",
            type: "String",
            description: "ID of menu (default: radial-menu)"
          },
          {
            code: "mainText",
            type: "String",
            description: "Main menu's text (default: Main menu)"
          },
          {
            code: "main",
            type: "String",
            description: "Main menu class (default: main-menu)"
          },
          {
            code: "subList",
            type: "String",
            description: "Submenus' container class (default: sub-menu-container)"
          },
          {
            code: "subItemClassName",
            type: "String",
            description: "Submenus' class (default: sub-menu-item)"
          },
          {
            code: "subMenuWidth",
            type: "Number",
            description: "Submenus' width (default: 80)"
          },
          {
            code: "subMenuWidthUnit",
            type: "String",
            description: "Unit type of submenus' widthe (default: px)"
          },
          {
            code: "subMenuContainerPadding",
            type: "Number",
            description: "Padding of submenus' container (default: 50)"
          },
          {
            code: "subMenuContainerPaddingUnit",
            type: "String",
            description: "Unit tpye of submenus' container padding (default: px)"
          },
          {
            code: "levels",
            type: "Number",
            description: "Number of levels (default: 1 === none)"
          },
          {
            code: "currentLevel",
            type: "Number",
            description: "Can be set as the starter level of first submenu (default: 1)"
          },
          {
            code: "openOnMouseenter",
            type: "Boolean",
            description: "Hover effect for the menu - open if mouse enters the area (default: true)"
          },
          {
            code: "closeOnMouseleave",
            type: "Boolean",
            description: "Hover effect for the menu - close if mouse leaves the area (default: true)"
          }
        ]
      }]
    },
    {
      title: "Default CSS selectors",
      list: [{
          code: ".radial-menu-container",
          codeType: "css"
        },
        {
          code: ".main-menu",
          codeType: "css"
        },
        {
          code: ".sub-menu-item",
          codeType: "css"
        },
        {
          code: ".sub-mnu-containerr",
          codeType: "css"
        },
        {
          code: ".sub-menu-container-background",
          codeType: "css"
        },
        {
          code: ".main-menu-item",
          codeType: "css"
        },
        {
          title: "DOM elements with 'opened' class",
          list: [{
              code: ".sub-menu-container",
              codeType: "css"
            },
            {
              code: ".main-menu",
              codeType: "css"
            }
          ]
        }
      ]
    }
  ]
}

Array.from(document.getElementsByClassName("description")).forEach(function (element) {
  if (element.classList.contains("radialMenuInfo")) {
    var info = printInfo(radialMenuInfo);
    element.appendChild(info);
  }
});

document.querySelector(".menu-1").radialMenu({
  list: ArrayGenerator("Subelement", "string", 8),
});

document.querySelector(".menu-2").radialMenu({
  list: ArrayGenerator("", "object", 20),
  mainText: "Main",
  levels: 3,
  openOnMouseenter: false,
  closeOnMouseleave: false
});