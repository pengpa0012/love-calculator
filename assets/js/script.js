const fname = document.querySelector("[data-fname]");
const sname = document.querySelector("[data-sname]");
const calculateBtn = document.querySelector("[data-submit]");
const resultStatsWrap = document.querySelector(".result-stats-wrap");
const resultBar = document.querySelector(".result-bar .bar");
const body = document.querySelector("body");

calculateBtn.addEventListener("click", () => {
  resultStatsWrap.innerHTML = `<div class="lds-heart"><div></div></div>`;
  fetch(
    `https://love-calculator.p.rapidapi.com/getPercentage?fname=${fname.value}&sname=${sname.value}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "42e66501ccmshbda94d50b8eb9d9p16bd9cjsn7f7601e2b6fa",
        "x-rapidapi-host": "love-calculator.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.percentage >= 90) body.classList.add("active");

      body.addEventListener("animationend", () => {
        body.classList.remove("active");
      });

      resultStatsWrap.innerHTML = `<div class="result-stats">
                                    <h2>${data.result}</h2>
                                    <span>${data.percentage} Points!</span>
                                  </div>`;

      resultBar.style.transform = `translate(${data.percentage - 100}%)`;

      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
});
