// Back button: 
document.getElementsByClassName("back")[0]
  .addEventListener("click", function (evet) {
    window.location = "../index.html";
  });

// forward button: 
Array.from(document.getElementsByClassName("forward")).forEach(function (item) {
  item.addEventListener("click", function (event) {
    window.location = event.currentTarget.getAttribute("url");
  });
});

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

/**
 * @description Returns true if it is a DOM element    
 * @param {*} o 
 */
function isElement(o) {
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
  );
}

/**
 * @description Create element and appends it to parent
 * @param {Object} elemOptions 
 * @param {HTMLElement} parent 
 */
function CreateElement(elemOptions, parent) {
  var htmlElement = document.createElement(elemOptions.tagName);
  if (elemOptions.id) {
    htmlElement.id = elemOptions.id;
  }
  if (elemOptions.className) {
    htmlElement.className = elemOptions.className;
  }
  if (elemOptions.innerText) {
    htmlElement.innerText = elemOptions.innerText;
  }
  if (parent) {
    parent.appendChild(htmlElement);
  } else {
    console.log("parent is undefined, elemOptions: ");
    console.log(elemOptions);


  }
  return htmlElement;
}



/**
 * @description Creates list tree
 * @param {Object} obj 
 * @param {HTMLElement} parent 
 */
function createInfoList(obj, parent) {
  // base LI element
  var item = CreateElement({
    tagName: "li",
  }, parent);
  for (const key in obj) {
    if (key === "title") {
      // title of LI element
      CreateElement({
        tagName: "span",
        className: "title",
        innerText: obj.title
      }, item);
    } else if (key === "text") {
      // text of LI element
      CreateElement({
        tagName: "span",
        className: "text",
        innerText: obj.text
      }, item);
    } else if (key === "type") {
      // JS type
      CreateElement({
        tagName: "span",
        className: "type",
        innerText: obj.type
      }, item);
    } else if (key === "description") {
      //  description is smaller and italic
      CreateElement({
        tagName: "span",
        className: "description",
        innerText: obj.description
      }, item);
    } else if (key === "code") {
      // JS code
      CreateElement({
        tagName: "span",
        className: "code " + obj.codeType,
        innerText: obj.code
      }, item);
    }
  }

  // if element has a sublist
  if (obj.list) {
    var list = document.createElement("ul");
    obj.list.forEach(function (element) {
      var subItem = createInfoList(element, list);
      item.appendChild(list);
    });
  }
}

/**
 * Print description tree
 * @param {Object} obj (title, type, description)
 */
function printInfo(obj) {
  var paragraph = document.createElement("p");
  CreateElement({
    innerText: obj.title,
    tagName: "h3",
    className: "title"
  }, paragraph);
  obj.list.forEach(function (element) {
    createInfoList(element, paragraph);
  });
  return paragraph;
}

/**
 * @description Simple array generator for examples
 * @param {*} value Value to push
 * @param {*} type Type of array element 
 * @param {Number} length  Array length
 */
function ArrayGenerator(value, type, length) {
  let arr = [];
  for (var l = 0; l < length; l++) {
    arr.push(type.toLowerCase() === "string" ? value + " " + (l + 1) : {
      title: value + " " + (l + 1)
    });
  }
  return arr;
}