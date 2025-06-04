document.addEventListener("DOMContentLoaded", function () {

  const changeTextBtn = document.getElementById("changeTextBtn");
  const heroTitle = document.getElementById("heroTitle");
  const heroSub = document.getElementById("heroSub");
  const brandLogo = document.getElementById("brandLogo");
  const grillImage = document.getElementById("grillImage");
  const skewersImage = document.getElementById("skewersImage");
  const sizzleSound = document.getElementById("sizzleSound");
  const showBtn = document.getElementById("showImageBtn");
  const hideBtn = document.getElementById("hideImageBtn");

  const playMusicBtn = document.getElementById("playMusicBtn");
  const stopMusicBtn = document.getElementById("stopMusicBtn");
  const volumeControl = document.getElementById("volumeControl");
  const danzaKuduro = new Audio("audio/Don_Omar_-_Danza_Kuduro_28587730.mp3");

  let isChanged = false;

  changeTextBtn.addEventListener("click", function () {
    if (!isChanged) {
      
      heroTitle.textContent = "WELCOME TO GILDED FLAME";
      heroSub.innerHTML = "<em>Taste the Magic of Fire</em>";

      brandLogo.src = "images/newlogo.jpg"; 
      grillImage.style.display = "none";
      skewersImage.style.display = "block";
      sizzleSound.play();
      isChanged = true;
    } else {
      heroTitle.textContent = "GRILLED SKEWERS";
      heroSub.innerHTML = "Hot and Delicious from the Flames";

      brandLogo.src = "images/logo.jpg"; 
      grillImage.style.display = "none";
      skewersImage.style.display = "none";
      isChanged = false;
    }
  });

  if (showBtn && hideBtn) {
    showBtn.addEventListener("click", () => {
      skewersImage.style.display = "block";
      sizzleSound.play();
    });

    hideBtn.addEventListener("click", () => {
      skewersImage.style.display = "none";
    });
  }

  if (playMusicBtn && stopMusicBtn) {
    playMusicBtn.addEventListener("click", function () {
      sizzleSound.pause();
      sizzleSound.currentTime = 0;

      danzaKuduro.play()
        .then(() => console.log("Music started"))
        .catch(error => console.error("Playback error", error));
    });

    stopMusicBtn.addEventListener("click", function () {
      danzaKuduro.pause();
      danzaKuduro.currentTime = 0;
    });

    if (volumeControl) {
      volumeControl.addEventListener("input", function () {
        danzaKuduro.volume = this.value / 100;
      });
    }
  }
});
