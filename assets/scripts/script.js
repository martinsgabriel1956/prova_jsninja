let elements = {
  lotoBtn: document.querySelector("#loto"),
  megaBtn: document.querySelector("#mega"),
  maniaBtn: document.querySelector("#mania"),
}

let removeStyle = {
  removeLoto() {
    elements.lotoBtn.classList.remove("active");
    elements.lotoBtn.style.backgroundColor = "transparent";
    elements.lotoBtn.style.color = "#7F3992";
  },
  removeMega() {
    elements.megaBtn.classList.remove("active");
    elements.megaBtn.style.backgroundColor = "transparent";
    elements.megaBtn.style.color = "#01AC66";
  },
  removeQuina() {
    elements.maniaBtn.classList.remove("active");
    elements.maniaBtn.style.backgroundColor = "transparent";
    elements.maniaBtn.style.color = "#F79C31";
  }
}

let active = {
  activeLoto() {
    if( elements.lotoBtn.className !== "active") {
      elements.lotoBtn.classList.add("active");
      elements.lotoBtn.style.backgroundColor = "#7F3992"
      elements.lotoBtn.style.color = "#FFF"
      
      removeStyle.removeMega();
      removeStyle.removeQuina();
    } 
  },
  activeMega() {
    if (elements.megaBtn.className !== "active") {
      elements.megaBtn.classList.add("active");
      elements.megaBtn.style.backgroundColor = "#01AC66"
      elements.megaBtn.style.color = "#FFF"

      removeStyle.removeLoto();
      removeStyle.removeQuina();
    } 
  },
  activeQuina() {
    if (elements.maniaBtn.className !== "active") {
      elements.maniaBtn.classList.add("active");
      elements.maniaBtn.style.backgroundColor = "#F79C31";
      elements.maniaBtn.style.color = "#FFF";
      
      removeStyle.removeLoto();
      removeStyle.removeMega();
    }
  }
}

function clickEvents() {
  elements.lotoBtn.addEventListener("click", () => {
    active.activeLoto();
    
  });
  elements.megaBtn.addEventListener("click", active.activeMega);
  elements.maniaBtn.addEventListener("click", active.activeQuina);
}

clickEvents();

