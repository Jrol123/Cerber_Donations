let payments = document.querySelectorAll(".select_payment .list_payment ul li");


let hiddenBlock = document.querySelector(".select_payment .hidden_block");
let hiddenBlockFunActive = false;

let select = document.querySelector(".select");
let selectStartValue = select.querySelector("select option[selected]").innerHTML;
select.querySelector("select option[selected]").classList.add("none")
let selectFunActive = false;
let selectFunClickActive = false;
let optionClicked = false;

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

            select.classList.remove("_not_transparent");
            select.querySelector("select").classList.remove("_active");
            select.querySelector("select").value = selectStartValue;
        } else{
            hiddenBlock.style.height = hiddenBlock.querySelector(".donation").offsetHeight +
            parseInt(window.getComputedStyle(hiddenBlock.querySelector(".donation")).marginBottom) + "px";
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
        select.querySelector("select").addEventListener("click", (e) => {
            select.querySelector("select").value = "1";
        });
        
        select.addEventListener("click", (e) => {
            let options = select.querySelectorAll("select option:not([selected])");
        
            if(!select.querySelector("select").classList.contains("_active")){
                select.classList.add("_not_transparent");
                select.querySelector("select").classList.add("_active");

                optionClicked = false;
            } else{
                options.forEach((option) => {
                    if (option === e.target) {
                        optionClicked = true;

                        inputAmountDonation.querySelector(".input").innerHTML = option.innerHTML;
                        inputAmountDonation.querySelector(".input").classList.add("_active");
                    }
                });
        
                if (!optionClicked) {
                    select.querySelector("select").classList.remove("_active");
                    select.classList.remove("_not_transparent");
                }
            }

            if(select.classList.contains("_rotate")){
                select.classList.remove("_rotate");
            } else{
                select.classList.add("_rotate");
            }
        
            if(!selectFunActive){
                selectCheckActive();
                selectFunActive = true;
            }

            formHiddenBlockCheck();
        });

        // select.addEventListener("click", (e) => {
        //     console.log("1")
        // })

        // select.addEventListener("to", (e) => {
        //     console.log("1")
        // })
    
    
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

function selectCheckActive(){
    window.addEventListener("click", (e) => {
        if(
            !optionClicked && e.target != select.querySelector("select") 
            && select.querySelector("select").classList.contains("_active")
        ){
            select.querySelector("select").classList.remove("_active");
            select.classList.remove("_not_transparent");
        }

        if(e.target != select.querySelector("select") && select.classList.contains("_rotate")){
            select.classList.remove("_rotate");
        }
    });
}

function formHiddenBlockCheck(){
    if(select.querySelector("select").value != selectStartValue && inputUsername.value != ""){
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
            select.querySelector("select").value != selectStartValue
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
