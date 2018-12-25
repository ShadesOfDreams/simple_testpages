// Back button: 
document.getElementsByClassName("back")[0]
  .addEventListener("click", function (evet) {
    window.location = "../index.html";
  });

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
 * @description Create element
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
  parent.appendChild(htmlElement);
  return htmlElement;
}

/**
 * 
 * @param {Object} obj 
 * @param {HTMLElement} parent 
 */
function createInfoList(obj, parent) {
  var item = CreateElement({
    tagName: "li",
    innerText: obj.title
  }, parent);
  if (obj.type) {
    CreateElement({
      tagName: "span",
      className: "type",
      innerText: obj.type
    }, item);
  }
  if (obj.description) {
    CreateElement({
      tagName: "span",
      className: "description",
      innerText: obj.description
    }, item);

  }
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
    tagName: "b"
  }, paragraph);
  obj.list.forEach(function (element) {
    createInfoList(element, paragraph);
  });
  return paragraph;
}

/**
 * 
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