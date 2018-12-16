// Back button: 
document.getElementsByClassName("back")[0]
  .addEventListener("click", function (evet) {
    window.location = "../index.html";
  });

// Script:
var index = 0;
[...document.querySelectorAll(".top .circle")].forEach(function (item) {
  item.style.zIndex = index++;
});
index = 5;
[...document.querySelectorAll(".bottom .circle")].forEach(function (item) {
  item.style.zIndex = index--;
});

rates = document.getElementsByClassName("rate");
[...rates].forEach(function (item) {
  item.addEventListener("click", Rate.bind(event));
})

function Rate(param) {
  var _event, element, id;
  if (Number.isInteger(param)) {
    element = document.getElementById("" + param);
  } else {
    element = param.currentTarget;
  }
  id = element.id;
  document.querySelector(".top" + id).classList.add("active");
  document.querySelector(".bottom" + id).classList.add("active");
  if (id > 1) {
    [...rates].filter(function (item) {
        return item.id < id
      })
      .forEach(function (item) {
        document.querySelector(".top" + item.id).classList.add("active");
        document.querySelector(".bottom" + item.id).classList.add("active");
      });
  }
  if (id < 4) {
    [...rates].filter(function (item) {
        return item.id > id
      })
      .forEach(function (item) {
        document.querySelector(".top" + item.id).classList.remove("active");
        document.querySelector(".bottom" + item.id).classList.remove("active");
      });
  }
  ratinInput.value = id;
}
var ratinInput = document.getElementById("ratingValue");

ratinInput.value = 2;
Rate(2);