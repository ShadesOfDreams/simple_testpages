HTMLElement.prototype.collapsibleBlock = function (options) {
  var $this = this;
  var collapsibleBlock = {
    title: "Collpasible",
    header: "collapsible-header",
    body: "collapsible-body",
    innerhtml: HTMLElementsFromText($this.innerHTML)
  }
  this.innerHTML = "";


  // get innerHTML to place in the body
  collapsibleBlock.body = CreateElement({
    tagName: "div",
    className: collapsibleBlock.header
  }, this);
  // get innerHTML to place in the body
  collapsibleBlock.body = CreateElement({
    tagName: "div",
    className: collapsibleBlock.body
  }, this);
  collapsibleBlock.body.appendChild(collapsibleBlock.innerhtml);


}