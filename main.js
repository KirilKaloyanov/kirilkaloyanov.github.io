const diploma = document.getElementById("diploma");
const diplomaContainer = document.getElementById("diploma-container");
const diplomaImage = document.getElementById("diploma-image");
const openDiplomaBtn = document.getElementById("view-diploma");
const closeDiplomaBtn = document.getElementById("hide-diploma");

const scrollPosition = {
  x: window.scrollX,
  y: window.scrollY,
};

openDiplomaBtn.addEventListener("click", () => {
  diplomaContainer.style.visibility = "hidden";
  scrollPosition.y = window.scrollY;
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  setTimeout(() => {
    diplomaContainer.style.visibility = "visible";
  }, 500);

  diplomaImage.classList.add("diploma-slide");
  diploma.classList.remove("display-hidden");
});

closeDiplomaBtn.addEventListener("click", () => {
  diplomaContainer.style.visibility = "hidden";
  diplomaImage.classList.remove("diploma-slide");
  diploma.classList.add("display-hidden");

  if (scrollPosition.y > window.scrollY) {
    window.scrollTo({
      top: scrollPosition.y,
      left: scrollPosition.x,
      behavior: "smooth",
    });
  }
});
