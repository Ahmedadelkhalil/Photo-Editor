let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let upload = document.getElementById("upload");

let download = document.querySelector(".download");
let reset = document.querySelector(".reset");

let img = document.querySelector(".img");
let imgBox = document.querySelector(".img-box");

let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");

window.onload = function () {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

function resetAll() {
  img.style.filter = "none";
  saturate.value = 100;
  contrast.value = 100;
  brightness.value = 100;
  sepia.value = 0;
  grayscale.value = 1;
  blur.value = 1;
  hueRotate.value = 0;
}

upload.onchange = function () {
  resetAll();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  };
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.remove();
  };
};

let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("input", function () {
    ctx.filter = `saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
      `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

reset.onclick = function () {
  resetAll();
};

download.onclick = function () {
  download.href = canvas.toDataURL("image/jpeg");
};
