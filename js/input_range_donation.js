let rangeInput = document.querySelector("#input-range-donation");
handleRangeInput(rangeInput);

function handleRangeInput(rangeInput){
    const value = (parseInt(rangeInput.dataset.value) - parseInt(rangeInput.dataset.min)) / (parseInt(rangeInput.dataset.max) - parseInt(rangeInput.dataset.min)) * 100;
    rangeInput.querySelector(".input__completion").style.left = "-" + (100 - value) + "%";

    rangeInput.querySelector("#input-range-text-value").innerText = rangeInput.dataset.value + "Р";
    rangeInput.querySelector("#input-range-text-max").innerText = rangeInput.dataset.max + "Р";
};