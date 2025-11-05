const BASE_URL = "https://api.exchangerate-api.com/v4/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const amount = document.querySelector(".amount input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to Select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for (let currCode in countryList) {
        const newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        select.append(newOptions);
        if(select.name === "from" && currCode === "USD") {
            newOptions.selected = "selected"
        } else if(select.name === "to" && currCode === "PKR") {
            newOptions.selected = "selected";
        }
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const exchangeRate = async () => {
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurr.value.toUpperCase()];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    exchangeRate();
});

window.addEventListener("load", () => {
    exchangeRate();
});