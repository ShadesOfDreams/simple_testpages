HTMLElement.prototype.collapsibleBlock = function (options) {
  var $this = this;
  var collapsibleBlock = {
    title: "Collpasible",
    convertTitle: false,
    header: "collapsible-header",
    body: "collapsible-body",
    innerhtml: $this.innerHTML,
    openMultiple: false
  }
  this.innerHTML = "";

  function ToggleCollapsibleBody(event) {
    if (collapsibleBlock.body.classList.contains("opened")) {
      collapsibleBlock.header.classList.remove("opened");
      collapsibleBlock.body.classList.remove("opened");
    } else {
      if (!collapsibleBlock.openMultiple) {
        Array.from(document.querySelectorAll(".collapsible-body.opened"))
          .forEach(function (collapsibleBody) {
            collapsibleBody.classList.remove("opened")
          })
      }
      collapsibleBlock.header.classList.add("opened");
      collapsibleBlock.body.classList.add("opened");
    }
  }

  collapsibleBlock = Object.assign(collapsibleBlock, options);

  // HEADER
  collapsibleBlock.header = CreateElement({
    tagName: "div",
    className: collapsibleBlock.header
  }, this);
  CreateElement({
    tagName: "span",
    innerText: collapsibleBlock.convertTitle ? collapsibleBlock.title.replaceAll('_', ' ') : collapsibleBlock.title
  }, collapsibleBlock.header);

  collapsibleBlock.header.addEventListener("click", ToggleCollapsibleBody);

  // BODY
  collapsibleBlock.body = CreateElement({
    tagName: "div",
    className: collapsibleBlock.body
  }, this);
  collapsibleBlock.body.innerHTML = collapsibleBlock.innerhtml;

}