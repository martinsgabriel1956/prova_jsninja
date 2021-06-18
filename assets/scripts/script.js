let elements = {
  lotoBtn: document.querySelector("#loto"),
  megaBtn: document.querySelector("#mega"),
  quinaBtn: document.querySelector("#quina"),

  game: document.querySelector(".choose-game"),
  title: document.querySelector(".game-title"),

  description: document.querySelector(".description-game > p"),
  numbers: document.querySelector(".numbers"),
  completeGameBtn: document.querySelector("#complete"),
  clearGame: document.querySelector("#clear"),
};

let clearBtn = "";

const {
  lotoBtn,
  megaBtn,
  quinaBtn,
  title,
  description,
  numbers,
  completeGame,
  clearGame,
  completeGameBtn,
  chooseGame,
  game,
} = elements;

let cart = [];

fetch("../../services/games.json")
  .then((res) => res.json())
  .then((data) => {
    function chooseGame() {
      data.types.forEach((item, index) => {
        let typeGame = document.createElement("button");
        typeGame.classList.add("game");
        typeGame.textContent = item.type;
        typeGame.style.border = `4px solid ${item.color}`;
        typeGame.style.color = item.color;
        game.appendChild(typeGame);

        typeGame.addEventListener("click", () => {
          cart = [];

          title.textContent = item.type;
          description.textContent = item.description;

          numbers.textContent = "";

          for (let i = 0; i < item.range; ++i) {
            let num = document.createElement("span");
            num.id = "num";
            num.value = i + 1;
            num.textContent = i + 1;
            
            if (num.value < 10) num.textContent = `0${i + 1}`;
            
            num.addEventListener('click', () => {
              if(cart.length < item["max-number"] && cart.indexOf(num.value) == -1){
                num.setAttribute("class", "clicked");
                num.style.backgroundColor = item.color;
                cart.push(num.value);
                return cart;
              }
            })
            numbers.appendChild(num);
          }
        });
      });
    }

    chooseGame();

    function complete() {
      let allNumbers = document.querySelectorAll("#num");

      while(cart.length < data.types["max-number"]) {}

      allNumbers.forEach((item, index) => {
        if (cart.length < item["max-number"]) {
          allNumbers.values = Math.ceil(Math.random() * item.range + 1);

          cart.push(allNumbers.values);
          let totalArr = cart[index] - 5;

          for (let i = 0; i < totalArr; i++) {
            item.style.backgroundColor = item.color;
          }
        }
      });
    }

    // let removeStyle = {
    //   removeLoto() {
    //     lotoBtn.classList.remove("active");
    //     lotoBtn.style.backgroundColor = "transparent";
    //     lotoBtn.style.color = `${data.types[0].color}`;
    //   },
    //   removeMega() {
    //     megaBtn.classList.remove("active");
    //     megaBtn.style.backgroundColor = "transparent";
    //     megaBtn.style.color = `${data.types[1].color}`;
    //   },
    //   removeQuina() {
    //     quinaBtn.classList.remove("active");
    //     quinaBtn.style.backgroundColor = "transparent";
    //     quinaBtn.style.color = `${data.types[2].color}`;
    //   },
    // };

    let active = {
      activeLoto() {
        if (lotoBtn.className !== "active") {
          lotoBtn.classList.add("active");
          lotoBtn.style.backgroundColor = `${data.types[0].color}`;
          lotoBtn.style.color = "#FFF";

          removeStyle.removeMega();
          removeStyle.removeQuina();
        }
      },
      activeMega() {
        if (megaBtn.className !== "active") {
          megaBtn.classList.add("active");
          megaBtn.style.backgroundColor = `${data.types[1].color}`;
          megaBtn.style.color = "#FFF";

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
      },
    };
    let checkedNumbers = {
      checkedLotoNumbers() {
        let num = numbers.childNodes;
        num.forEach((item, index) => {
          item.addEventListener("click", () => {
            if (loto.length < data.types[0]["max-number"]) {
              item.setAttribute("class", "checked");
              item.style.backgroundColor = data.types[0].color;
              loto.push(num.value);
            }
          });
        });
      },
      checkedMegaNumbers() {
        let num = numbers.childNodes;
        num.forEach((item, index) => {
          item.addEventListener("click", () => {
            if (mega.length < data.types[1]["max-number"]) {
              item.setAttribute("class", "checked");
              item.style.backgroundColor = data.types[1].color;
              mega.push(num.value);
            }
          });
        });
      },
      checkedQuinaNumbers() {
        let num = numbers.childNodes;
        num.forEach((item, index) => {
          item.addEventListener("click", () => {
            if (quina.length < data.types[2]["max-number"]) {
              item.setAttribute("class", "checked");
              item.style.backgroundColor = data.types[2].color;
              quina.push(num.value);
            }
          });
        });
      },
    };

    
    let features = {
      clearGame() {
        const allNumbers = document.querySelectorAll('#num');

        allNumbers.forEach(item => {
          if(item.getAttribute("checked")) item.removeAttribute("checked");

          item.style.backgroundColor = "#ADC0C4";
        })
      },
      completeGame() {
        data.types.forEach((item, index) => {
          const allNumbers = document.querySelectorAll('#num');

          while(cart.length < item[index]["max-number"]) {

          }
        })
      }
    };

    function clickEvents() {
      completeGameBtn.addEventListener("click", () => {
        completeGame.complete();
      });
      clearGame.addEventListener("click", () => {
        features.clearGame();
      });
    }

    clickEvents();
  });
