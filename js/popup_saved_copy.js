let saveCopy = `
    <div class="saved_copy _hidden">
        <?xml version="1.0" ?><svg id="Layer_1" style="enable-background:new 0 0 612 792;" version="1.1" viewBox="0 0 612 792" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
            .st0{fill:#41AD49;}
        </style><g><path class="st0" d="M562,396c0-141.4-114.6-256-256-256S50,254.6,50,396s114.6,256,256,256S562,537.4,562,396L562,396z    M501.7,296.3l-241,241l0,0l-17.2,17.2L110.3,421.3l58.8-58.8l74.5,74.5l199.4-199.4L501.7,296.3L501.7,296.3z"/></g></svg>

        <p>Скопировано</p>
    </div>
`;

function popupSavedCopyCreate(){
    let popupSavedCopyList = document.querySelector(".popup_list_saved_copy");


    if(popupSavedCopyList.querySelector(".saved_copy")){
        popupSavedCopyList.querySelector(".saved_copy").classList.add("_remove");
        setTimeout(() => {
            popupSavedCopyList.removeChild(popupSavedCopyList.querySelector(".saved_copy"));
        }, 200);
    }

    popupSavedCopyList.insertAdjacentHTML("beforeend", saveCopy);
    setTimeout(() => {
        popupSavedCopyList.querySelector(".saved_copy._hidden").classList.remove("_hidden");
    }, 50);


    setTimeout(() => {
        popupSavedCopyList.querySelector(".saved_copy").classList.add("_remove");
        setTimeout(() => {
            popupSavedCopyList.removeChild(popupSavedCopyList.querySelector(".saved_copy"));
        }, 200);
    }, 3000);
}