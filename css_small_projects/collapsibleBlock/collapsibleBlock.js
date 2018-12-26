HTMLElement.prototype.collapsibleBlock = function (options) {
  var $this = this;
  var collapsibleBlock = {
    title: "Collpasible",
    header: "collapsible-header",
    body: "collapsible-body",
    innerhtml: $this.innerHTML
  }
  this.innerHTML = "";

  collapsibleBlock = Object.assign(collapsibleBlock, options);

  // HEADER
  collapsibleBlock.header = CreateElement({
    tagName: "div",
    className: collapsibleBlock.header
  }, this);
  collapsibleBlock.header.innerText = collapsibleBlock.title;

  // BODY
  collapsibleBlock.body = CreateElement({
    tagName: "div",
    className: collapsibleBlock.body
  }, this);
  collapsibleBlock.body.innerHTML = collapsibleBlock.innerhtml;

}