let elements = {
  game: document.querySelector(".choose-game"),
  title: document.querySelector(".game-title"),
  description: document.querySelector(".description-game > p"),
  numbers: document.querySelector(".numbers"),

  completeGameBtn: document.querySelector("#complete"),
  clearGameBtn: document.querySelector("#clear"),
  addToCartBtn: document.querySelector("#cart"),

  cardCart: document.querySelector(".card-cart"),
  totalPayment: document.querySelector(".total-value"),
  cartContainer: document.querySelector(".cart-container"),
};

let setIndex = "";
let cart = [];
let totalValue = [0];

const {
  title,
  description,
  numbers,
  clearGameBtn,
  completeGameBtn,
  chooseGame,
  game,
  addToCartBtn,
  cardCart,
  totalPayment,
  cartContainer,
} = elements;

const loadData = async () => {
  try {
    const url = "../../services/games.json";
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

loadData().then((data) => {
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

          num.addEventListener("click", () => {
            if (
              cart.length < item["max-number"] &&
              cart.indexOf(num.value) == -1
            ) {
              num.setAttribute("clicked", "true");
              num.style.backgroundColor = item.color;
              cart.push(num.value);
              return cart;
            }
          });
          numbers.appendChild(num);
        }
        setIndex = index;
      });

      return setIndex;
    });
  }
  chooseGame();
});

let features = {
  clearGame() {
    cart = [];

    const allNumbers = document.querySelectorAll("#num");

    allNumbers.forEach((item) => {
      if (item.hasAttribute("clicked")) item.removeAttribute("clicked");
      item.style.backgroundColor = "#ADC0C4";
    });
  },
  completeGame() {
    loadData().then((data) => {
      completeGameBtn.addEventListener("click", () => {
        const allNumbers = document.querySelectorAll("#num");

        while (cart.length < data.types[setIndex]["max-number"]) {
          let match = Math.ceil(Math.random() * data.types[setIndex].range + 1);

          allNumbers.forEach((num) => {
            if (match == num.value && !num.hasAttribute("clicked")) {
              num.setAttribute("clicked", "true");
              num.style.backgroundColor = data.types[setIndex].color;
              cart.push(num.value);
              return cart;
            }
          });
        }
      });
    });
    return cart;
  },
  addToCart() {
    let gameNumbers = document.createElement("div");
    gameNumbers.classList.add("game-numbers");

    loadData().then((data) => {
      if (cart.length == data.types[setIndex]["max-number"]) {
        gameNumbers.setAttribute(`price`, `${data.types[setIndex].price}`);

        totalValue.push(Number(gameNumbers.getAttribute("price")));

        gameNumbers.innerHTML = `
            <span onClick="features.deleteNumberInCart()">
              <img src="./assets/delete.png" alt="Excluir jogo">
            </span>
            <div class="numbers-choosed" style="border-left: 4px solid ${data.types[setIndex].color}; border-radius: .25rem;">
              <p class="cart-numbers">
                ${cart}
              </p>
              <div class="game-price">
                <p style="color:${data.types[setIndex].color};">${
          data.types[setIndex].type
        }:</p>
                <p id="game-price">
                  R$${data.types[setIndex].price.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>
          `;

        cartContainer.appendChild(gameNumbers);

        this.value();

        let numberContainer = document.querySelectorAll(".game-numbers");

        numberContainer.forEach((item) =>
          item.addEventListener("click", () =>
            item.setAttribute("checked", "true")
          )
        );
      }
      clearGameBtn.click();
    });
  },
  deleteNumberInCart() {
    let numberContainer = document.querySelectorAll(".game-numbers");

    numberContainer.forEach((item) => {
      item.addEventListener("click", () => {
        if (item.hasAttribute("checked")) {
          item.parentNode.removeChild(item);
          totalValue.splice(
            totalValue.indexOf(Number(item.getAttribute("price"))),
            1
          );
        }
        this.value();
      });
    });
  },
  value() {
    const result = totalValue.reduce((acc, item) => acc + item);

    totalPayment.textContent = result.toFixed(2).replace(".", ",");

    if (totalValue.length == 0) totalValue.textContent = "R$0,00";
  },
};

let clickEvents = () => {
  completeGameBtn.addEventListener("click", () => features.completeGame()),
    clearGameBtn.addEventListener("click", () => features.clearGame()),
    addToCartBtn.addEventListener("click", () => features.addToCart());
};

clickEvents();
