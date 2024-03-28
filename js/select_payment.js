let payments = document.querySelectorAll(".select_payment .list_payment ul li");


let hiddenBlock = document.querySelector(".select_payment .hidden_block");
let hiddenBlockFunActive = false;

let select;
let selectHead;
let selectList;
let selectStartValue;
let selectChangeFunActive;
let selectFunActive;
let optionClicked;

let inputUsername = document.querySelector(".additional_text .username input");

let inputAmountDonation;
let buttonPay;

let buttonPayFunActive = false;



payments.forEach(payment => {
    payment.addEventListener("click", () => {
        paymentsCheckActive();
        payment.classList.add("_active");
        hiddenBlock.classList.remove("none");

        inputAmountDonation = document.querySelector(".select_payment .donation .input_amount");
        inputAmountDonation.className = "input_amount";
        inputAmountDonation.classList.add(payment.dataset.payment);
        inputAmountDonation.querySelector(".input").innerHTML = "";
        inputAmountDonation.querySelector(".input").classList.remove("_active");

        buttonPay = document.querySelector("#button-pay")

        if(hiddenBlock.querySelector(".additional_text")){
            hiddenBlock.style.height = hiddenBlock.querySelector(".additional_text").offsetHeight +
            parseInt(window.getComputedStyle(hiddenBlock.querySelector(".additional_text")).marginBottom) +
            hiddenBlock.querySelector(".donation").offsetHeight +
            parseInt(window.getComputedStyle(hiddenBlock.querySelector(".donation")).marginBottom) + "px";


            if(select){
                select.classList.remove("_active");
                select.classList.remove("_not_transparent");
                selectHead.innerText = selectStartValue;
    
                selectList.querySelectorAll(".select__item").forEach((item) => {
                    item.classList.remove("_active");
                });
            }


            setTimeout(() => {
                hiddenBlock.style.overflow = "visible";
            }, 200);
        } else{
            hiddenBlock.style.height = hiddenBlock.querySelector(".donation").offsetHeight +
            parseInt(window.getComputedStyle(hiddenBlock.querySelector(".donation")).marginBottom) + "px";

            buttonPay.classList.add("_active");
        }

        if(!hiddenBlockFunActive){
            hiddenBlockActive();
        }

        if(!buttonPayFunActive){
            buttonPayActive();
        }
    });
});



function paymentsCheckActive(){
    payments.forEach(payment => {
        payment.classList.remove("_active");
    });
}

function hiddenBlockActive(){
    hiddenBlockFunActive = true;

    if(hiddenBlock.querySelector(".additional_text")){
        select = document.querySelector(".select");
        selectHead = select.querySelector(".select__head");
        selectList = select.querySelector(".select__list");
        selectStartValue = selectHead.innerHTML;
        selectChangeFunActive = false;
        selectFunActive = false;
        optionClicked = false;


        select.addEventListener("touchstart", (e) => selectEvent(e));
        select.addEventListener("click", (e) => selectEvent(e));

        selectEvent = (e) => {
            if (e.type == "touchstart"){
                selectChangeFunActive = true;
                selectChange(e);
            } else if (e.type == "click" && !selectChangeFunActive){
                selectChange(e);
            }
        };
    
    
        if (inputUsername.value.trim() != "") {
            inputUsername.classList.add("_active");
        }
    
        inputUsername.addEventListener("input", () => {
            formHiddenBlockCheck();
            if (inputUsername.value.trim() === "") {
                inputUsername.classList.remove("_active");
            } else {
                inputUsername.classList.add("_active");
            }
        });
    }
}

function selectChange(e){
    if(e.target.classList.contains("select__item")){
        selectList.querySelectorAll(".select__item").forEach((item) => {
            item.classList.remove("_active");
        });

        optionClicked = true;
        e.target.classList.add("_active");

        selectHead.innerText = e.target.innerText; 

        inputAmountDonation.querySelector(".input").innerHTML = e.target.innerHTML;
        inputAmountDonation.querySelector(".input").classList.add("_active");
    }


    if(!select.classList.contains("_active")){
        select.classList.add("_not_transparent");
        select.classList.add("_active");

        optionClicked = false;
    } else{
        if (!optionClicked) {
            select.classList.remove("_active");
            select.classList.remove("_not_transparent");
        }
    }


    if(selectList.classList.contains("none")){
        selectList.classList.remove("none");
        select.classList.add("_rotate");
    } else{
        selectList.classList.add("none");
        select.classList.remove("_rotate");
    }

    if(!selectFunActive){
        selectCheckActive();
        selectFunActive = true;
    }

    formHiddenBlockCheck();
}

function selectCheckActive(){
    window.addEventListener("click", (e) => {
        if(!optionClicked && e.target != select && select.classList.contains("_active")){
            select.classList.remove("_active");
            select.classList.remove("_not_transparent");
            selectList.classList.add("none");
        }

        if(e.target != select && select.classList.contains("_rotate")){
            select.classList.remove("_rotate");
            selectList.classList.add("none");
        }
    });
}

function formHiddenBlockCheck(){
    if(selectHead.innerText != selectStartValue && inputUsername.value != ""){
        buttonPay.classList.add("_active");
    } else{
        buttonPay.classList.remove("_active")
    }
}

function buttonPayActive(){
    buttonPayFunActive = true;

    buttonPay.addEventListener("click", (e) => {
        e.preventDefault();

        let paymentAmount = document.querySelector("#input-amount").innerHTML;
        if(
            buttonPay.classList.contains("_active") && paymentAmount != "" && inputUsername.value != "" &&
            selectHead.innerText != selectStartValue
        ){
            let paymentMethod;
            payments.forEach(payment => {
                if(payment.classList.contains("_active")){
                    paymentMethod = payment.dataset.payment;
                }
            });
    
            localStorage.setItem('payment_amount', paymentAmount);
            localStorage.setItem('payment_method', paymentMethod);
    
            window.location.href = "/templates/payment.html";
        }
    });
}