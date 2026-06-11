const diploma = document.getElementById("diploma");
const diplomaContainer = document.getElementById("diploma-container");
const diplomaImage = document.getElementById("diploma-image");
const openDiplomaBtn = document.getElementById("view-diploma");
const closeDiplomaBtn = document.getElementById("hide-diploma");
const downloadBtn = document.getElementById("download-pdf");

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
    diplomaContainer.style.height = `${getDocumentHeight()}px`;
  }, 1000);

  diplomaImage.classList.add("diploma-slide");
  diploma.classList.remove("display-hidden");
});

closeDiplomaBtn.addEventListener("click", hideModal);
diplomaContainer.addEventListener("click", hideModal);

function hideModal() {
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
}

function getDocumentHeight() {
  const body = document.body;
  const html = document.documentElement;

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
}

document.getElementById("download-pdf").addEventListener("click", downloadCV);

async function downloadCV() {
  downloadBtn.classList.remove("organgeBtn");
  downloadBtn.classList.add("greyBtn");
  downloadBtn.disabled = true;

  let iteration = 1;
  const btnText = 'Downloading';
  const dotInterval = setInterval(() => {
    const dots = '.'.repeat(iteration);
    downloadBtn.textContent = btnText + dots;
    iteration++;
    if (iteration == 4) iteration = 1;
  }, 500);

  try {
    const response = await fetch('https://cv-pdf-service-173955335103.europe-north1.run.app/generate-pdf', {
        method: 'GET', 
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Kiril_Kaloyanov_CV.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
  } catch(error) {
    alert("We could not prepare the PDF. Please use Ctrl+P instead.");
  }
  
  clearInterval(dotInterval);
  downloadBtn.textContent = "Download PDF";
  downloadBtn.classList.add("organgeBtn");
  downloadBtn.classList.remove("greyBtn");
  downloadBtn.disabled = false;
}
