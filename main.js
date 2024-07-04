const diploma = document.getElementById("diploma");
const diplomaImage = document.getElementById("diploma-image");
const openDiplomaBtn = document.getElementById("view-diploma");
const closeDiplomaBtn = document.getElementById("hide-diploma");

const scrollPosition = {
  x: window.scrollX,
  y: window.scrollY,
};

openDiplomaBtn.addEventListener("click", () => {
  diploma.classList.remove("display-hidden");
  diplomaImage.classList.add("diploma-slide");

  scrollPosition.y = window.scrollY;
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});

closeDiplomaBtn.addEventListener("click", () => {
  diploma.classList.add("display-hidden");
  diplomaImage.classList.remove("diploma-slide");

  window.scrollTo({
    top: scrollPosition.y,
    left: scrollPosition.x,
    behavior: "smooth",
  });
});
