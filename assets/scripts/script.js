let elements = {
  lotoBtn: document.querySelector("#loto"),
  megaBtn: document.querySelector("#mega"),
  maniaBtn: document.querySelector("#mania"),
  gameTitle: document.querySelector(".game-title"),
  description: document.querySelector(".description-game > p"),
  num: document.querySelector("#num"),
  numbers: document.querySelector(".numbers")
}

let lotoNumbers = [01,02,03,04,05,06,07,08,09,10,11,12,13,14,15];

let megaNumbers = [01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60];

let quinaNumbers = [01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];

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

let addInfo = {
  lotoInfo() {
    elements.gameTitle.innerHTML = "Lotomania";
    elements.description.innerHTML = "Escolha 15 números para apostar na lotofácil. Você ganha acertando 11, 12, 13, 14 ou 15 números. São muitas chances de ganhar, e agora você joga de onde estiver!";
  },
  megaInfo() {
    elements.gameTitle.innerHTML = "Mega-Sena";
    elements.description.innerHTML = "Escolha 6 números dos 60 disponíveis na mega-sena. Ganhe com 6, 5 ou 4 acertos. São realizados dois sorteios semanais para você apostar e torcer para ficar milionário.";
  },
  quinaInfo() {
    elements.gameTitle.innerHTML = "Quina";
    elements.description.innerHTML = "Escolha 5 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.";
  }
}

let generateNumbers = {
  lotoNumbers() {
    elements.numbers.textContent = "";

    lotoNumbers.forEach((item, index) => {
      let num = document.createElement('span');
      num.id = "num";
      num.innerHTML = index + 1;
      elements.numbers.appendChild(num);

      num.addEventListener("click", e => {
        num.style.backgroundColor = "#7F3992"
      })
    })
  },
  megaNumbers() {
    elements.numbers.textContent = ""

    megaNumbers.forEach((item, index) => {
      let num = document.createElement('span');
      num.id = "num";
      num.innerHTML = index + 1;
      
      elements.numbers.appendChild(num);

      num.addEventListener("click", e => {
        num.style.backgroundColor = "#01AC66"
      })
    })
  },
  quinaNumbers() {
    elements.numbers.textContent = "";
    
    quinaNumbers.forEach(item => {
      let num = document.createElement('span');
      num.id = "num";
      num.innerHTML = item;
      elements.numbers.appendChild(num);

      num.addEventListener("click", e => {
        num.style.backgroundColor = "#F79C31"
      })
    })

    
  }
}

function clickEvents() {
  elements.lotoBtn.addEventListener("click", () => {
    active.activeLoto();
    addInfo.lotoInfo();
    generateNumbers.lotoNumbers();

  });
  elements.megaBtn.addEventListener("click", () => {
    active.activeMega();
    addInfo.megaInfo();
    generateNumbers.megaNumbers();
  });
  elements.maniaBtn.addEventListener("click", () => {
    active.activeQuina();
    addInfo.quinaInfo();
    generateNumbers.quinaNumbers();
  });
}

clickEvents();

