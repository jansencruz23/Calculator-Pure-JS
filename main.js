const btnNum = document.querySelectorAll('.num');
const btnOp = document.querySelectorAll('.op');
const curr = document.querySelector('.curr');
const prevOp = document.querySelector('.prev-op');
const prevNum = document.querySelector('.prev-num')

let isOp = false;
let lastOp;
let op;
let prev;

btnNum.forEach(btn => {
    btn.addEventListener('click', (e) => {
        btnNumClicked(e);
    });
});

btnOp.forEach(btn => {
    btn.addEventListener('click', (e) => {
        btnOpClicked(e);
    });
});

function btnNumClicked(e) {
    if(curr.textContent == '0')
        curr.textContent = e.target.textContent
    else   
        curr.textContent += e.target.textContent
}

function btnOpClicked(e) {
    switch(e.target.textContent){
        case 'AC':
            curr.textContent = '0';
            prevNum.textContent = '';
            prevOp.style.display = "none";
            op = '';
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
            op = '/';
            signsClicked(op);
            break;
        case 'x':
            op = '*';
            signsClicked(op);
            break;
        case '-':
            op = '-';
            signsClicked(op);
            break;
        case '+':
            op = '+';
            signsClicked(op);
            break;
        case '=':
            curr.textContent = operate();
    }
}

function signsClicked(opr){
    if(curr.textContent != '0'){
        curr.textContent = operate();
        prevNum.textContent = curr.textContent;
        op = opr;
        prevOp.style.display = 'block';
        prevOp.textContent = op;
        curr.textContent = '0';
    }
    else{
        lastOp = op;
        prevOp.textContent = opr;
    }

}

function operate(){
    let num1 = Number(prevNum.textContent);
    let num2 = Number(curr.textContent);
    switch(prevOp.textContent){
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
    prevOp.style.display = 'none';
}