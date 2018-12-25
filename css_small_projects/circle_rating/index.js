// Script:
// Set top element indexes - only display
var index = 0;
[...document.querySelectorAll(".top .circle")].forEach(function (item) {
  item.style.zIndex = index++;
});
// Set bottom element indexes - only display
index = 5;
[...document.querySelectorAll(".bottom .circle")].forEach(function (item) {
  item.style.zIndex = index--;
});

// Add event to the rating blocks
rates = document.getElementsByClassName("rate");
[...rates].forEach(function (item) {
  item.addEventListener("click", Rate.bind(event));
})

/**
 * @description Set rating style and value
 * @param {} param
 */
function Rate(param) {
  var _event, element, id;

  // To set rating from JS
  if (Number.isInteger(param)) {
    element = document.getElementById("" + param);
  } else { // otherwise
    element = param.currentTarget;
  }

  //current rate is always active
  id = element.id;
  document.querySelector(".top" + id).classList.add("active");
  document.querySelector(".bottom" + id).classList.add("active");

  // another click on the same rate-step returns to rate 0
  if (id == ratinInput.innerHTML) {

    Array.from(document.getElementsByClassName("circle")).forEach(function (circle) {
      circle.classList.remove("active");
    });
    ratinInput.innerHTML = 0;

  } else {

    // before them are all active too
    if (id > 1) {
      [...rates].filter(function (item) {
          return item.id < id
        })
        .forEach(function (item) {
          document.querySelector(".top" + item.id).classList.add("active");
          document.querySelector(".bottom" + item.id).classList.add("active");
        });
    }
    // after them are always inactive
    if (id < 4) {
      [...rates].filter(function (item) {
          return item.id > id
        })
        .forEach(function (item) {
          document.querySelector(".top" + item.id).classList.remove("active");
          document.querySelector(".bottom" + item.id).classList.remove("active");
        });
    }
    // rating block gives the value to input on top
    ratinInput.innerHTML = id;

  }
}
// "Save" rating value to:
var ratinInput = document.getElementById("ratingValue");

// to display on load:
ratinInput.innerHTML = 2;
Rate(2);


// DESCRIPTION PART
var ratingInfo = {
  title: "Rating of interlaced circles",
  list: [{
    title: "5 rating: ",
    description: "4 steps of rate, full black is not rated"
  }, {
    title: "Set rate: ",
    description: "Rate can be set by clicking above/on cirlce"
  }, {
    title: "Unset rate: ",
    description: "Click on current rate will unset it"
  }, {
    title: "Manual setting: ",
    description: "call Rate([value])"
  }, {
    title: "No images used"
  }]
}

document.getElementsByClassName("description")[0].appendChild(
  printInfo(ratingInfo)
);