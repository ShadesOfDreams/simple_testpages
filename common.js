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