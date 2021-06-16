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


const { lotoBtn, megaBtn, maniaBtn, gameTitle, description, num, numbers } = elements;

let removeStyle = {
  removeLoto() {
    lotoBtn.classList.remove("active");
    lotoBtn.style.backgroundColor = "transparent";
    lotoBtn.style.color = "#7F3992";
  },
  removeMega() {
    megaBtn.classList.remove("active");
    megaBtn.style.backgroundColor = "transparent";
    megaBtn.style.color = "#01AC66";
  },
  removeQuina() {
    maniaBtn.classList.remove("active");
    maniaBtn.style.backgroundColor = "transparent";
    maniaBtn.style.color = "#F79C31";
  }
}

let active = {
  activeLoto() {
    if( lotoBtn.className !== "active") {
      lotoBtn.classList.add("active");
      lotoBtn.style.backgroundColor = "#7F3992"
      lotoBtn.style.color = "#FFF"
      
      removeStyle.removeMega();
      removeStyle.removeQuina();
    } 
  },
  activeMega() {
    if (megaBtn.className !== "active") {
      megaBtn.classList.add("active");
      megaBtn.style.backgroundColor = "#01AC66"
      megaBtn.style.color = "#FFF"

      removeStyle.removeLoto();
      removeStyle.removeQuina();
    } 
  },
  activeQuina() {
    if (maniaBtn.className !== "active") {
      maniaBtn.classList.add("active");
      maniaBtn.style.backgroundColor = "#F79C31";
      maniaBtn.style.color = "#FFF";
      
      removeStyle.removeLoto();
      removeStyle.removeMega();
    }
  }
}

let addInfo = {
  lotoInfo() {
    gameTitle.innerHTML = "Lotomania";
    description.innerHTML = "Escolha 15 números para apostar na lotofácil. Você ganha acertando 11, 12, 13, 14 ou 15 números. São muitas chances de ganhar, e agora você joga de onde estiver!";
  },
  megaInfo() {
    gameTitle.innerHTML = "Mega-Sena";
    description.innerHTML = "Escolha 6 números dos 60 disponíveis na mega-sena. Ganhe com 6, 5 ou 4 acertos. São realizados dois sorteios semanais para você apostar e torcer para ficar milionário.";
  },
  quinaInfo() {
    gameTitle.innerHTML = "Quina";
    description.innerHTML = "Escolha 5 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.";
  }
}

let generateNumbers = {
  lotoNumbers() {
    numbers.textContent = "";

    lotoNumbers.forEach((item, index) => {
      let num = document.createElement('span');
      num.id = "num";
      num.innerHTML = index + 1;
      numbers.appendChild(num);

      if(index <= 15 ) {
        num.addEventListener("click", e => {
          num.style.backgroundColor = "#7F3992"
        })
      }
    })
  },
  megaNumbers() {
    numbers.textContent = "";

    megaNumbers.forEach((item, index) => {
      let num = document.createElement('span');
      num.id = "num";
      num.innerHTML = index + 1;

      numbers.appendChild(num);

      if(index <= 60) {
        num.addEventListener("click", e => {
          num.style.backgroundColor = "#01AC66";
        })
      }

    })
  },
  quinaNumbers() {
    numbers.textContent = "";
    
    quinaNumbers.forEach(item => {
      let num = document.createElement('span');
      num.id = "num";
      num.innerHTML = item;
      numbers.appendChild(num);

      num.addEventListener("click", e => {
        num.style.backgroundColor = "#F79C31"
      })
    })

    
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

