let elements = {
  game: document.querySelector(".choose-game"),
  title: document.querySelector(".game-title"),

  description: document.querySelector(".description-game > p"),
  numbers: document.querySelector(".numbers"),
  completeGameBtn: document.querySelector("#complete"),
  clearGame: document.querySelector("#clear"),
};

let setIndex = "";

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

      setIndex = index;
      
      return setIndex;
    });
  }
  chooseGame();
});

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

    // let active = {
    //   activeLoto() {
    //     if (lotoBtn.className !== "active") {
    //       lotoBtn.classList.add("active");
    //       lotoBtn.style.backgroundColor = `${data.types[0].color}`;
    //       lotoBtn.style.color = "#FFF";

    //       removeStyle.removeMega();
    //       removeStyle.removeQuina();
    //     }
    //   },
    //   activeMega() {
    //     if (megaBtn.className !== "active") {
    //       megaBtn.classList.add("active");
    //       megaBtn.style.backgroundColor = `${data.types[1].color}`;
    //       megaBtn.style.color = "#FFF";

    //       removeStyle.removeLoto();
    //       removeStyle.removeQuina();
    //     }
    //   },
    //   activeQuina() {
    //     if (quinaBtn.className !== "active") {
    //       quinaBtn.classList.add("active");
    //       quinaBtn.style.backgroundColor = `${data.types[2].color}`;
    //       quinaBtn.style.color = "#FFF";

    //       removeStyle.removeLoto();
    //       removeStyle.removeMega();
    //     }
    //   },
    // };
    
    let features = {
      clearGame() {
        const allNumbers = document.querySelectorAll('#num');

        allNumbers.forEach(item => {
          if(item.getAttribute("checked")) item.removeAttribute("class");

          item.style.backgroundColor = "#ADC0C4";
        })
      },
      completeGame() {
        fetch("../../services/games.json").then(res => res.json()).then(data => {
          const allNumbers = document.querySelectorAll('#num');
          
          while(cart.length < data.types[setIndex]["max-number"]) {
            let match = Math.ceil(Math.random() * (data.types[setIndex].range - 0) + 1);
            
            allNumbers.forEach(num => {
              if(match == num.value && !num.getAttribute("class")) {
                num.setAttribute("class", "checked");
                num.style.backgroundColor = data.types[setIndex].color;
                cart.push(num.value);
                return cart;
              }
            })
          }
        
        });
        return cart;
      }
    };

    function clickEvents() {
      completeGameBtn.addEventListener("click", () => {
          features.completeGame();
      }),
      clearGame.addEventListener("click", () => {
        features.clearGame();
      });
    }

    clickEvents();
