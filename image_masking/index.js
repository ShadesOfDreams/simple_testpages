const img = document.getElementById("image");
const imageFile = document.getElementById("image-file");
const colorIpnutContainer = document.getElementById("color-input-container")
const bgColor = document.getElementById("background-color");

imageFile.onchange = function (event) {
  var files = event.target && event.target.files;
  img.src = URL.createObjectURL(files[0]);
  colorIpnutContainer.className = colorIpnutContainer.className
    .split(" ")
    .filter(i => i != "hidden");
}

img.onload = function (event) {
  bgColor.style = Object.assign({},
    bgColor.style, {
      width: `${img.offsetWidth}px`,
      height: `${img.offsetHeight}px`
    }
  );
  console.log(
    bgColor.style.width,
    Object.assign({},
      bgColor.style, {
        "min-width": `${img.offsetWidth}px`,
        "min-height": `${img.offsetHeight}px`
      }
    )
  )
}