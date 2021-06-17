let elements = {
  lotoBtn: document.querySelector("#loto"),
  megaBtn: document.querySelector("#mega"),
  quinaBtn: document.querySelector("#mania"),
  gameTitle: document.querySelector(".game-title"),
  description: document.querySelector(".description-game > p"),
  numbers: document.querySelector(".numbers"),
  completeGame: document.querySelector("#complete")
}
const { lotoBtn, megaBtn, quinaBtn, gameTitle, description, numbers, completeGame } = elements;

let cart = [];
let loto = [];
let mega = [];
let quina = [];

fetch('../../services/games.json').then(res => res.json()).then(data => {
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
      quinaBtn.classList.remove("active");
      quinaBtn.style.backgroundColor = "transparent";
      quinaBtn.style.color = `${data.types[2].color}`;
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
      if (quinaBtn.className !== "active") {
        quinaBtn.classList.add("active");
        quinaBtn.style.backgroundColor = `${data.types[2].color}`;
        quinaBtn.style.color = "#FFF";
        
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
        num.value = i + 1;
        num.innerHTML = i + 1;
        numbers.appendChild(num);
      }
      
     
    },
    megaNumbers() {
      numbers.textContent = "";
      for(let i = 0; i < data.types[1].range; i++) {
        let num = document.createElement('span');
        num.id = "num";
        num.value = i + 1;
        num.innerHTML = i + 1;
        numbers.appendChild(num);
      }
    },
    quinaNumbers() {
      numbers.textContent = "";
      
      for(let i = 0; i < data.types[2].range; i++) {
        let num = document.createElement('span');
        num.id = "num";
        num.value = i + 1;
        num.innerHTML = i + 1;
        numbers.appendChild(num);
      }
    }
  }

  let checkedNumbers = {
    checkedLotoNumbers() {
      let num = numbers.childNodes;
      num.forEach((item, index) => {
        item.addEventListener("click", () => {
          if(loto.length < data.types[0]["max-number"]){
            item.setAttribute("class", "checked");
            item.style.backgroundColor = data.types[0].color;
            loto.push(num.value);
          }
        })
      })
    },
    checkedMegaNumbers() {
      let num = numbers.childNodes;
      num.forEach((item, index) => {
        item.addEventListener("click", () => {
          if(mega.length < data.types[1]["max-number"]){
            item.setAttribute("class", "checked");
            item.style.backgroundColor = data.types[1].color;
            mega.push(num.value);
          }
        })
      })
    },
    checkedQuinaNumbers() {
      let num = numbers.childNodes;
      num.forEach((item, index) => {
        item.addEventListener("click", () => {
          if(quina.length < data.types[2]["max-number"]){
            item.setAttribute("class", "checked");
            item.style.backgroundColor = data.types[2].color;
            quina.push(num.value);
          }
        })
      })
    }
  }

  let features = {
    completeGame(type) {

    },
    clearGame() {
      if(loto.length === data.types[0]["max-number"]) {
        loto.pop(loto.length - 1);
      }
    }
  }
  
  function clickEvents() {
    lotoBtn.addEventListener("click", () => {
      active.activeLoto();
      addInfo.lotoInfo();
      generateNumbers.lotoNumbers();
      checkedNumbers.checkedLotoNumbers();
    });
    megaBtn.addEventListener("click", () => {
      active.activeMega();
      addInfo.megaInfo();
      generateNumbers.megaNumbers();
      checkedNumbers.checkedMegaNumbers();
    });
    quinaBtn.addEventListener("click", () => {
      active.activeQuina();
      addInfo.quinaInfo();
      generateNumbers.quinaNumbers();
      checkedNumbers.checkedQuinaNumbers();
    });
    

  }

  clickEvents();
})
