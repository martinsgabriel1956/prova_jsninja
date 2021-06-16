let elements = {
  lotoBtn: document.querySelector("#loto"),
  megaBtn: document.querySelector("#mega"),
  maniaBtn: document.querySelector("#mania"),
  gameTitle: document.querySelector(".game-title"),
  description: document.querySelector(".description-game > p"),
  num: document.querySelector("#num"),
  numbers: document.querySelector(".numbers")
}
const { lotoBtn, megaBtn, maniaBtn, gameTitle, description, num, numbers } = elements;

fetch('../../services/games.json').then(res => res.json()).then(data => {
  console.log(data.types[0]["max-number"])

  let removeStyle = {
    removeLoto() {
      lotoBtn.classList.remove("active");
      lotoBtn.style.backgroundColor = "transparent";
      lotoBtn.style.color = `${data.types[0].color}`;
    },
    removeMega() {
      megaBtn.classList.remove("active");
      megaBtn.style.backgroundColor = "transparent";
      megaBtn.style.color = `${data.types[1].color}`;
    },
    removeQuina() {
      maniaBtn.classList.remove("active");
      maniaBtn.style.backgroundColor = "transparent";
      maniaBtn.style.color = `${data.types[2].color}`;
    }
  }

  let active = {
    activeLoto() {
      if( lotoBtn.className !== "active") {
        lotoBtn.classList.add("active");
        lotoBtn.style.backgroundColor = `${data.types[0].color}`
        lotoBtn.style.color = "#FFF"
        
        removeStyle.removeMega();
        removeStyle.removeQuina();
      } 
    },
    activeMega() {
      if (megaBtn.className !== "active") {
        megaBtn.classList.add("active");
        megaBtn.style.backgroundColor = `${data.types[1].color}`
        megaBtn.style.color = "#FFF"
        
        removeStyle.removeLoto();
        removeStyle.removeQuina();
      } 
    },
    activeQuina() {
      if (maniaBtn.className !== "active") {
        maniaBtn.classList.add("active");
        maniaBtn.style.backgroundColor = `${data.types[2].color}`;
        maniaBtn.style.color = "#FFF";
        
        removeStyle.removeLoto();
        removeStyle.removeMega();
      }
    }
  }
  
  let addInfo = {
    lotoInfo() {
      gameTitle.innerHTML = `${data.types[0].type}`;
      description.innerHTML = `${data.types[0].description}`;
    },
    megaInfo() {
      gameTitle.innerHTML = `${data.types[1].type}`;
      description.innerHTML = `${data.types[1].description}`;
    },
    quinaInfo() {
      gameTitle.innerHTML = `${data.types[2].type}`;
      description.innerHTML = `${data.types[2].description}`;
    }
  }
  
  let generateNumbers = {
    lotoNumbers() {
      numbers.textContent = "";

      for(let i = 0; i < data.types[0].range; ++i) {
        let num = document.createElement('span');
        num.id = "num";
        num.innerHTML = i + 1;
        numbers.appendChild(num);

        if(i <= 25) {
          num.addEventListener("click", e => {
            num.style.backgroundColor = `${data.types[0].color}`
          })
        }
      }
    },
    megaNumbers() {
      numbers.textContent = "";
      for(let i = 0; i < data.types[1].range; i++) {
        let num = document.createElement('span');
        num.id = "num";
        num.innerHTML = i + 1;
        numbers.appendChild(num);
        
        if(i <= 15 ) {
          num.addEventListener("click", e => {
            num.style.backgroundColor = `${data.types[1].color}`
          })
        }
      }
    },
    quinaNumbers() {
      numbers.textContent = "";
      
      for(let i = 0; i < data.types[2].range; i++) {
        let num = document.createElement('span');
        num.id = "num";
        num.innerHTML = i + 1;
        numbers.appendChild(num);

        if(i <= 15 ) {
          num.addEventListener("click", e => {
            num.style.backgroundColor = `${data.types[2].color}`
          })
        }
      }
    }
  }
  
  function clickEvents() {
    lotoBtn.addEventListener("click", () => {
      active.activeLoto();
      addInfo.lotoInfo();
      generateNumbers.lotoNumbers();
      
    });
    megaBtn.addEventListener("click", () => {
      active.activeMega();
      addInfo.megaInfo();
      generateNumbers.megaNumbers();
    });
    maniaBtn.addEventListener("click", () => {
      active.activeQuina();
      addInfo.quinaInfo();
      generateNumbers.quinaNumbers();
    });
  }
  
  clickEvents();
})
  
  