var radialList = [{
    title: "SubElement 1"
  },
  {
    title: "SubElement 2"
  },
  {
    title: "SubElement 3"
  },
  {
    title: "SubElement 4"
  },
  {
    title: "SubElement 5"
  },
  {
    title: "SubElement 6"
  },
  {
    title: "SubElement 7"
  },
  {
    title: "SubElement 8"
  }
];

document.querySelector(".radial-menu-container").radialMenu({
  list: radialList,
  mainText: "My main"
});