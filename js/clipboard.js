let clipboards;

function clipboardsFunClickActive(){
    clipboards.forEach(clipboard => {    
        clipboard.addEventListener('click', function() {
            let range = document.createRange();
            range.selectNode(clipboard);

            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        });
    });
};