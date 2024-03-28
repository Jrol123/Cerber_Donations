let main = document.querySelector("main");


let inputsAmount;


let progressBar = document.querySelector('#progress-bar');
let progressBarCompletion = progressBar.querySelector('.progress_bar__completion');
let progressBarText = progressBar.closest(".progress_bar_block").querySelector("p span");
let progressBarStop = false;


let paymentPaymentBlock;

let paymentBankCardBlock = `
    <div class="payment _hidden">
        <h4>Для оплаты отсканируйте QR код или скопируйте все данные.</h4>

        <div class="payment_block">
            <div class="progress_bar_block">
                <p>Время на проведения платежа <span></span></p>
                <div data-time="5" class="progress_bar" id="progress-bar">
                    <div class="progress_bar__completion"></div>
                </div>
            </div>

            <div class="payment_form">
                <div class="payment_form__left">
                    <div class="form" id="form-inputs">
                        <div class="block_input">
                            <h5>Номер карты</h5>
                            <p class="clipboard">1111 1111 1111 1111</p>
                        </div>

                        <div class="block_input">
                            <h5>Название банка</h5>
                            <p class="clipboard">Тинькофф</p>
                        </div>

                        <div class="block_input">
                            <h5>Сумма к оплате</h5>
                            <p class="clipboard" id="clickboard-amount"></p>
                        </div>
                    </div>

                    <div class="button_pay">
                        <a href="" id="button-pay"> Я оплатил</a>
                    </div>
                </div>

                <div class="payment_form__right">
                    <div class="logo">
                        <img src="/img/payment/p_logo.gif" alt="">
                    </div>
                </div>
            </div>

            <div class="warning">
                <p><span></span> После оплаты на карту сразу нажмите кнопку я оплатил.</p>
                <p><span></span> Сумму указывайте точно как указано в ячейке.</p>
            </div>
        </div>
    </div>
`;

let paymentCryptocurrencyBlock = `
    <div class="payment _hidden">
        <h4>Для оплаты отсканируйте QR код или скопируйте все данные.</h4>

        <div class="payment_block">
            <div class="progress_bar_block">
                <p>Время на проведения платежа <span></span></p>
                <div data-time="90" class="progress_bar" id="progress-bar">
                    <div class="progress_bar__completion"></div>
                </div>
            </div>

            <div class="payment_form cryptocurrency">
                <div class="payment_form__qr_code">
                    <img src="/img/payment/qr_code.png" alt="">
                </div>

                <div class="payment_form__left">
                    <div class="form" id="form-inputs">
                        <div class="block_input">
                            <h5>Оплатите указанную сумму</h5>
                            <p class="clipboard" id="clickboard-amount"></p>
                        </div>

                        <div class="block_input">
                            <h5>На данный кошелек</h5>
                            <p class="clipboard"></p>
                        </div>
                    </div>

                    <div class="button_pay">
                        <a href="" id="button-pay"> Я оплатил</a>
                    </div>
                </div>

                <div class="payment_form__right">
                    <div class="logo">
                        <img src="/img/payment/p_logo.gif" alt="">
                    </div>
                </div>
            </div>

            <div class="warning">
                <p><span></span> Скорость проведения платежа зависит от выбранной Вами комиссии</p>
                <p><span></span> Платёж считается успешным после двух подтверждений</p>
            </div>
        </div>
    </div>
`;

let paymentCreditCardBlock = `
    <div class="payment _hidden">
        <h4>Для оплаты отсканируйте QR код или скопируйте все данные.</h4>

        <div class="payment_block">
            <div class="progress_bar_block">
                <p>Время на проведения платежа <span></span></p>
                <div data-time="90" class="progress_bar" id="progress-bar">
                    <div class="progress_bar__completion"></div>
                </div>
            </div>

            <div class="payment_form">
                <div class="payment_form__left">
                    <div class="form" id="form-inputs">
                        <div class="block_input">
                            <h5>Номер телефона</h5>
                            <p class="clipboard">79657775533</p>
                        </div>

                        <div class="block_input">
                            <h5>Оператор</h5>
                            <p class="clipboard">Тинькофф</p>
                        </div>

                        <div class="block_input">
                            <h5>Сумма к оплате</h5>
                            <p class="clipboard" id="clickboard-amount">79657775533</p>
                        </div>
                    </div>

                    <div class="button_pay">
                        <a href="" id="button-pay"> Я оплатил</a>
                    </div>
                </div>

                <div class="payment_form__right">
                    <div class="logo">
                        <img src="/img/payment/p_logo.gif" alt="">
                    </div>
                </div>
            </div>

            <div class="warning">
                <p><span></span> После оплаты на карту сразу нажмите кнопку я оплатил.</p>
                <p><span></span> Сумму указывайте точно как указано в ячейке.</p>
            </div>
        </div>
    </div>
`;

let paymentInfoBlock = `
    <div class="block_info _hidden">
        <div class="logo">
            <img src="/img/payment/p_logo.gif" alt="">
        </div>

        <div class="info">
            <p class="">Время для платежа истекло!!!</p>
        </div>
    </div>
`;


let buttonPayFunActive = false;



let totalSeconds = parseInt(progressBar.dataset.time);
let steps = 100;
let increment = 100 / steps;
let progress = -100;
let duration = totalSeconds * 1000;
let startTime;

requestAnimationFrame(startAnimation);



function startAnimation(timestamp) {
    if(!progressBarStop){
        if (!startTime) {
            startTime = timestamp;
        }
        let elapsedTime = timestamp - startTime;

        if (elapsedTime <= duration) {
            let completion = -100 + (elapsedTime / duration) * 100;

            progressBarCompletion.style.left = completion + '%';

            remainingSeconds = Math.max(0, totalSeconds - Math.floor(elapsedTime / 1000));
            progressBarText.innerHTML = convertSecondsToTime(remainingSeconds);

            requestAnimationFrame(startAnimation);
        } else{
            if(document.querySelector(".waiting_requisites")){
                setTimeout(() => {
                    changingWaitingRequisites();
                }, 500);
            } else if(document.querySelector(".payment")){
                setTimeout(() => {
                    changingPayment("Время для платежа истекло!!!");
                    progressBar.closest(".progress_bar_block").querySelector("p").innerHTML = "Мы не обнаружили ваш платеж во время. <span>0</span>";
                }, 500);
            }

            progressBarText.innerHTML = 0;
        }
    } else{
        document.querySelector("main .payment .payment_block").removeChild(progressBar.closest(".progress_bar_block"));
    }
};


function changingWaitingRequisites(){
    let waitingRequisites = document.querySelector(".waiting_requisites");
    waitingRequisites.classList.add("_hidden");

    let substrate = document.querySelector(".substrates .substrate p");

    setTimeout(() => {
        main.removeChild(waitingRequisites);


        if(
            localStorage.getItem('payment_method') == "btc" || localStorage.getItem('payment_method') == "ltc" ||
            localStorage.getItem('payment_method') == "eth" || localStorage.getItem('payment_method') == "usdt" || 
            localStorage.getItem('payment_method') == "xmr"
        ){
            main.insertAdjacentHTML("afterbegin", paymentCryptocurrencyBlock);
            substrate.innerHTML = `
                Вы выбрали способ оплаты с помощью <span>${localStorage.getItem('payment_method')}</span> следуйте 
                инструкциям справа
            `;
            substrate.classList.add("cryptocurrency");
        } else if(localStorage.getItem('payment_method') == "credit_card"){
            main.insertAdjacentHTML("afterbegin", paymentCreditCardBlock);
            substrate.innerHTML = `Вы выбрали способ оплаты с помощью <span>Кредитной карты</span> следуйте инструкциям справа`;
            substrate.classList.add("credit_card");
        } else{
            main.insertAdjacentHTML("afterbegin", paymentBankCardBlock);
            substrate.innerHTML = `Вы выбрали способ оплаты с помощью <span>КАРТЫ</span> следуйте инструкциям справа`;
            substrate.classList.add("bank_card");
        }

        if(!document.querySelector("#clickboard-amount").closest(".payment_form").classList.contains("cryptocurrency")){
            document.querySelector("#clickboard-amount").innerText = localStorage.getItem('payment_amount') + "р";
        } else{
            document.querySelector("#clickboard-amount").innerText = localStorage.getItem('payment_amount');
        }


        paymentPaymentBlock = document.querySelector(".payment");
        paymentPaymentBlock.classList.remove("_hidden");
        

        progressBar = document.querySelector('#progress-bar');
        progressBarCompletion = progressBar.querySelector('.progress_bar__completion');
        progressBarText = progressBar.closest(".progress_bar_block").querySelector("p span"); 
    
        totalSeconds = parseInt(progressBar.dataset.time);
        steps = 100;
        increment = 100 / steps;
        progress = -100;
        duration = totalSeconds * 1000;
        startTime = null;

        requestAnimationFrame(startAnimation);


        if(!buttonPayFunActive){
            buttonPayActive();
        }

        clipboards = document.querySelectorAll(".clipboard");
        clipboardsFunClickActive();
    }, 500);
};

function changingPayment(infoBlockText){
    let paymentForm = paymentPaymentBlock.querySelector(".payment_form");
    paymentForm.classList.add("_hidden");

    let warningTexts = paymentPaymentBlock.querySelectorAll(".warning p");

    setTimeout(() => {
        paymentPaymentBlock.querySelector(".payment_block").removeChild(paymentForm);
        paymentPaymentBlock.querySelector(".payment_block .progress_bar_block").insertAdjacentHTML('afterend', paymentInfoBlock);

        warningTexts[0].innerHTML = `<span></span> Скорость проведения платежа зависит от выбранной Вами комиссии`;
        warningTexts[1].innerHTML = `<span></span> Платёж считается успешным после двух подтверждений`;

        paymentInfoBlock = paymentPaymentBlock.querySelector(".payment_block").querySelector(".block_info");
        paymentInfoBlock.querySelector(".info p").innerHTML = infoBlockText;
        paymentInfoBlock.classList.remove("_hidden");
    }, 500);
}


function buttonPayActive(){
    buttonPayFunActive = true;

    let buttonPay = paymentPaymentBlock.querySelector("#button-pay");

    buttonPay.addEventListener("click", (e) => {
        e.preventDefault();

        if(
            localStorage.getItem('payment_method') == "btc" || localStorage.getItem('payment_method') == "ltc" ||
            localStorage.getItem('payment_method') == "eth" || localStorage.getItem('payment_method') == "usdt" || 
            localStorage.getItem('payment_method') == "xmr"
        ){
            changingPayment("Я проверяю поступление вашего платежа");

            setTimeout(() => {
                paymentInfoBlock.querySelector(".info p").innerHTML = "Ожидаю подтверждений 0 из 2";
                progressBarStop = true;
            }, 3000);
    
            setTimeout(() => {
                paymentInfoBlock.querySelector(".info p").innerHTML = "Ожидаю подтверждений 1 из 2";
            }, 6000);

            setTimeout(() => {
                paymentInfoBlock.querySelector(".info p").innerHTML = "Ожидаю подтверждений 2 из 2";
            }, 9000);
    
            setTimeout(() => {
                paymentInfoBlock.querySelector(".info p").innerHTML = "Ура мы получили ваш платеж.";
            }, 12000);
        } else{
            changingPayment("Я проверяю поступление вашего платежа");
    
            setTimeout(() => {
                paymentInfoBlock.querySelector(".info p").innerHTML = "Ура мы получили ваш платеж.";
                progressBarStop = true;
            }, 3000);
        }
    });
}


function convertSecondsToTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    if(minutes === 0){
        return `${remainingSeconds.toString().padStart(2, '0')}`;
    } else if(hours === 0){
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else{
        return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
};