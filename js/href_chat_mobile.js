let patternImgs = document.querySelectorAll(".pattern_2 img");
let hrefChat = document.querySelector(".href_chat");
let lastScrollPosition = 0;

if (window.innerWidth < 720) {
    hrefChat.style.pointerEvents = "painted";

    let scrollDistanceToBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
    let opacityValue = 1 - (scrollDistanceToBottom / 500);
    opacityValue = Math.min(1, Math.max(0, opacityValue));

    if (window.scrollY < lastScrollPosition) {
        patternImgs[1].style.opacity = 1 - opacityValue;
        hrefChat.style.opacity = 1 - opacityValue;
    } else {
        patternImgs[1].style.opacity = opacityValue;
        hrefChat.style.opacity = opacityValue;
    }

    lastScrollPosition = window.scrollY;
}

window.addEventListener('scroll', function() {
    if (window.innerWidth <= 720) {
        let scrollDistanceToBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
        let opacityValue = 1 - (scrollDistanceToBottom / 500);
        opacityValue = Math.min(1, Math.max(0, opacityValue));
    
        if (window.scrollY < lastScrollPosition) {
            patternImgs[1].style.opacity = 1 - opacityValue;
            hrefChat.style.opacity = 1 - opacityValue;
        } else {
            patternImgs[1].style.opacity = opacityValue;
            hrefChat.style.opacity = opacityValue;
        }
    
        lastScrollPosition = window.scrollY;
    }
});

window.addEventListener('resize', function(event){
    if (window.innerWidth <= 720) {
        hrefChat.style.pointerEvents = "painted";
    
        let scrollDistanceToBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
        let opacityValue = 1 - (scrollDistanceToBottom / 500);
        opacityValue = Math.min(1, Math.max(0, opacityValue));
    
        if (window.scrollY < lastScrollPosition) {
            patternImgs[1].style.opacity = 1 - opacityValue;
            hrefChat.style.opacity = 1 - opacityValue;
        } else {
            patternImgs[1].style.opacity = opacityValue;
            hrefChat.style.opacity = opacityValue;
        }
    
        lastScrollPosition = window.scrollY;
    } else if(window.innerWidth <= 1100){
        patternImgs[1].style.opacity = 1;
        hrefChat.style.opacity = 1;
    } else if(window.innerWidth > 1100){
        patternImgs[1].style = "";
        hrefChat.style = "";
    }
})