const slider = document.querySelector(".slider");
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

slider.addEventListener("mousedown", startDragging);
slider.addEventListener("mouseup", stopDragging);
slider.addEventListener("mouseleave", stopDragging);
slider.addEventListener("mousemove", drag);

slider.addEventListener("touchstart", startDragging);
slider.addEventListener("touchend", stopDragging);
slider.addEventListener("touchcancel", stopDragging);
slider.addEventListener("touchmove", drag);

slider.addEventListener("transitionend", () => {
  currentIndex = getActiveIndex();
  setSliderPosition();
});

function startDragging(event) {
  if (event.type === "touchstart") {
    startPosition = event.touches[0].clientX;
  } else {
    startPosition = event.pageX;
  }
  isDragging = true;
  prevTranslate = currentTranslate;
  clearInterval(animationID);
}

function stopDragging(event) {
  if (event.type === "touchend" || event.type === "touchcancel") {
    currentPosition = event.changedTouches[0].clientX;
  } else {
    currentPosition = event.pageX;
  }
  isDragging = false;
  const diff = currentPosition - startPosition;
  if (diff < -100 && currentIndex < 2) {
    currentIndex++;
  }
  if (diff > 100 && currentIndex > 0) {
    currentIndex--;
  }
  setSliderPosition();
}

function drag(event) {
  if (isDragging) {
    let currentPosition;
    if (event.type === "touchmove") {
      currentPosition = event.touches[0].clientX;
    } else {
      currentPosition = event.pageX;
    }
    currentTranslate = prevTranslate + currentPosition - startPosition;
    setSliderPosition();
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function getActiveIndex() {
  return currentIndex;
}

function animateSlider() {
  currentIndex++;
  if (currentIndex > 2) {
    currentIndex = 0;
  }
  prevTranslate = currentTranslate;
  currentTranslate = -currentIndex * slider.clientWidth;
  setSliderPosition();
  animationID = requestAnimationFrame(animateSlider);
}

animationID = requestAnimationFrame(animateSlider);
const sliderImages = document.querySelectorAll(".slider img");
const imageContainer = document.querySelector(".image-container");
const sliderWidth = sliderImages[0].clientWidth;
let transitionInProgress = false;

function setSliderPosition() {
  slider.style.transform = `translateX(${-currentIndex * sliderWidth}px)`;
}

function animateSlider() {
  if (!transitionInProgress) {
    transitionInProgress = true;
    currentIndex++;
    slider.classList.add("transition");
    setSliderPosition();
  }
}

function handleTransitionEnd() {
  transitionInProgress = false;
  slider.classList.remove("transition");
  if (currentIndex >= sliderImages.length) {
    currentIndex = 0;
    setSliderPosition();
  }
}

slider.addEventListener("transitionend", handleTransitionEnd);

setInterval(animateSlider, 2500);


function setSliderPosition() {
  slider.style.transform = `translateX(${-currentIndex * sliderWidth}px)`;
}

function animateSlider() {
  if (!transitionInProgress) {
    transitionInProgress = true;
    currentIndex++;
    slider.classList.add("transition");
    setSliderPosition();
  }
}

function handleTransitionEnd() {
  transitionInProgress = false;
  slider.classList.remove("transition");
  if (currentIndex >= sliderImages.length) {
    currentIndex = 0;
    setSliderPosition();
  }
}

slider.addEventListener("transitionend", handleTransitionEnd);

setInterval(animateSlider, 5000);


function setSliderPosition() {
  slider.style.transform = `translateX(${-currentIndex * sliderWidth}px)`;
}

function animateSlider() {
  if (!transitionInProgress) {
    transitionInProgress = true;
    currentIndex++;
    slider.classList.add("transition");
    setSliderPosition();
  }
}

function handleTransitionEnd() {
  transitionInProgress = false;
  slider.classList.remove("transition");
  if (currentIndex >= sliderImages.length) {
    currentIndex = 0;
    setSliderPosition();
  }
}

function moveSlider(event) {
  const target = event.target;
  if (target.classList.contains("prev-btn")) {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = sliderImages.length - 1;
    }
  } else if (target.classList.contains("next-btn")) {
    currentIndex++;
    if (currentIndex >= sliderImages.length) {
      currentIndex = 0;
    }
  } else if (target.classList.contains("slider-img")) {
    const infoBox = document.createElement("div");
    infoBox.classList.add("info-box");
    infoBox.innerHTML = `
      <h2>${target.dataset.name}</h2>
      <p>${target.dataset.info}</p>
    `;
    imageContainer.appendChild(infoBox);
  }
  slider.classList.add("transition");
  setSliderPosition();
}

function closeInfoBox(event) {
  const target = event.target;
  if (target.classList.contains("info-box")) {
    target.remove();
  }
}

slider.addEventListener("transitionend", handleTransitionEnd);
imageContainer.addEventListener("click", moveSlider);
imageContainer.addEventListener("click", closeInfoBox);
function scrollToSection() {
    var section = document.getElementById("scrollToSection");
    section.scrollIntoView({ behavior: "smooth" });
  }
