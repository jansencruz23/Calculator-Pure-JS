const btnNum = document.querySelectorAll('.num');
const btnOp = document.querySelectorAll('.op');
const curr = document.querySelector('.curr');
const prevOp = document.querySelector('.prev-op');
const prevNum = document.querySelector('.prev-num')
const audio =  document.getElementById('audio');

let lastOp;
let currOp;
let prev;

btnNum.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if(curr.textContent.length <= 16)
            btnNumClicked(e);
    });
});

btnOp.forEach(btn => {
    btn.addEventListener('click', (e) => {
        audio.play();
        btnOpClicked(e);
    });
});

function btnNumClicked(e) {
    audio.play();
    if(e.target.textContent == '.')
    {
        if(!curr.textContent.includes('.'))
            curr.textContent += '.';
    }
    else if(curr.textContent == '0')
        curr.textContent = e.target.textContent
    else   
        curr.textContent += e.target.textContent    
}

function btnOpClicked(e) {
    switch(e.target.textContent)
    {
        case 'AC':
            curr.textContent = '0';
            prevNum.textContent = '';
            prevOp.style.visibility = "hidden";
            currOp = '';
            break;
        case 'C':
            curr.textContent = (curr.textContent.length == 1) 
                ? curr.textContent = '0' 
                : curr.textContent.substring(0, curr.textContent.length -1);
            break;
        case '-/+':
            let num = Number(curr.textContent);
            curr.textContent = num * -1;
            break;
        case '/':
            currOp = '/';
            signsClicked(currOp);
            break;
        case 'x':
            currOp = '*';
            signsClicked(currOp);
            break;
        case '-':
            currOp = '-';
            signsClicked(currOp);
            break;
        case '+':
            currOp = '+';
            signsClicked(currOp);
            break;
        case '=':
            curr.textContent = operate();
            break;
    }
}

function signsClicked(opr){
    if(prevOp.textContent != '' && prevNum.textContent != '' && curr.textContent != '0')
        curr.textContent = operate();

    if(curr.textContent == '0')
        prevOp.textContent = opr;
    
    else
    {
        prevOp.style.visibility = 'visible';
        prevOp.textContent = opr;
        prevNum.textContent = curr.textContent;
        curr.textContent = '0';
    }
}

function operate(){
    let num1 = Number(prevNum.textContent);
    let num2 = Number(curr.textContent);

    switch(prevOp.textContent)
    {
        case '+': 
            reset();
            return num1 + num2;
        case '-': 
            reset(); 
            return num1 - num2;
        case '*': 
            reset();    
            return num1 * num2;
        case '/': 
            reset();
            return num1 / num2;
    }
}

function reset(){
    prevNum.textContent = '';
    prevOp.style.visibility = 'hidden';
}