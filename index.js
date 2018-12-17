var list = [{
    "title": "Offline-online page",
    "url": "./offline_online/index.html",
    "class": ["page"]
  },
  {
    "title": "Cricle rating solution",
    "url": "./circle_rating/index.html",
    "class": ["page"]
  },
  {
    "title": "CSS reminders",
    "url": "./css_reminder/index.html",
    "class": ["page"]
  },
  {
    "title": "Custom DOMs",
    "url": "./custom_dom/index.html",
    "class": ["page"]
  },
  {
    "title": "JS reminders",
    "url": "./",
    "class": ["page", "disabled"]
  },
  {
    "title": "Coming soon",
    "url": "./",
    "class": ["page", "disabled"]
  },
  {
    "title": "Coming soon",
    "url": "./",
    "class": ["page", "disabled"]
  },
  {
    "title": "Coming soon",
    "url": "./",
    "class": ["page", "disabled"]
  },
  {
    "title": "Coming soon",
    "url": "./",
    "class": ["page", "disabled"]
  },
  {
    "title": "Coming soon",
    "url": "./",
    "class": ["page", "disabled"]
  },

];

var container = document.getElementsByClassName("page-container")[0];

function AppendItemsInOrder() {

  // for (let i = 0; i < list.length; i++) {
  //   if (i > 0) {
  //     if (list[i].title < list[i - 1].title) {
  //       var previousIndex = i - 1;
  //       while (list[i].title < list[previousIndex - 1] && previousIndex != 0) {
  //         previousIndex--;
  //       }
  //       var item = list.splice(i, 1)[0];
  //       list.splice(previousIndex, 0, item);
  //     }
  //   }
  // }

  list.forEach(function (orderedItem) {
    var page = document.createElement("div");
    orderedItem.class.forEach(function (item) {
      page.classList.add(item);
    })
    page.setAttribute("url", orderedItem["url"]);
    var text = document.createElement("span");
    text.innerHTML = orderedItem["title"];
    page.appendChild(text);
    container.appendChild(page);
  })
}

AppendItemsInOrder();

// let's color them ...

var pages = document.getElementsByClassName("page");
var hue = 0;
var stauration = 0;
var light = 0;
var step = 360 / [...pages].length;



function ChangeColor() {
  hue = hue + step;
}

Array.from(pages).forEach(function (page, index) {
  if (index !== 0) {
    ChangeColor();
  }
  page.style.backgroundColor = "hsl(" + hue + ", 60%, 80%)";
  page.style.borderColor = "hsl(" + hue + ", 20%, 60%)"
  if (!page.classList.contains("disabled")) {
    page.addEventListener("click", function (event) {
      window.location = event.currentTarget.getAttribute("url");
    });
  }
});