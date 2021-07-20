
class Calculator{
	constructor(previousOperandTextElement,currentOperandTextElement)
	{
		this.previousOperandTextElement=previousOperandTextElement;
		this.currentOperandTextElement=currentOperandTextElement;
		this.clear();
	}
	clear(){
		this.previousOperand="";
		this.currentOperand="";
		this.operation=undefined;
	}
	delete()
	{
		this.currentOperand=this.currentOperand.slice(0,-1);
	}
	appendNumber(number){
		if(number==="." && this.currentOperand.includes("."))
			return;
		this.currentOperand=this.currentOperand.toString()+number.toString();
	}

	chooseOperation(operation){
		if(this.currentOperand==="") return;
		if(this.previousOperand!=="")
		{
			this.compute();
		}
		this.operation=operation;
		this.previousOperand=this.currentOperand;
		this.currentOperand="";
	}

	compute(){
		let total;
		const prev=parseFloat(this.previousOperand);
		const curr=parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(curr)) return
		switch(this.operation)
		{
			case '+' : 
			     	total=prev+curr;
				   break;

			case '-' : 
			     	total=prev-curr;
				   break;

			case '*' : 
			     	total=prev*curr;
				   break;

			case '/' : 
			     	total=prev/curr;
				   break;

			default :
				return

		}
		this.currentOperand=total.toString();
		this.previousOperand="";
		this.operation=undefined;
	}
	updateDisplay(){
		this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand);
		if(this.operation!=null)
		{
			this.previousOperandTextElement.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
		}
		else
			this.previousOperandTextElement.innerText="";
		
	}

	getDisplayNumber(number){
		const stringNumber=number.toString();
		const intPart=parseFloat(stringNumber.split('.')[0]);
		const deciPart=stringNumber.split('.')[1];
		let intDisplay;
		if(isNaN(intPart))
			intDisplay="";
		else
		intDisplay=intPart.toLocaleString("en",{maxFractionDigits:0});
		if(deciPart!=null)
		{
			return  `${intDisplay}.${deciPart}`;
		}
		else
		{
			return intDisplay;
		}

	}

	
}
const numberButtons = document.querySelectorAll('[data-number]');
const operator=document.querySelectorAll('.Key-Operator');
const clearButton=document.querySelector("[data-clear]");
const equalButton=document.querySelector("[data-equal]");
const deleteButton=document.querySelector("[data-delete]");
console.log(equalButton);

const previousOperandTextElement=document.querySelector("[data-previous-operand]");
const currentOperandTextElement=document.querySelector("[data-current-operand]");

const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
	button.addEventListener("click",() =>{
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	})
})

operator.forEach(button => {
	button.addEventListener("click",() =>{
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	})
})
clearButton.addEventListener("click",() =>{
		calculator.clear();
		calculator.updateDisplay();
	})
equalButton.addEventListener("click",() =>{
		calculator.compute();
		calculator.updateDisplay();
	})
deleteButton.addEventListener("click",() =>{
		calculator.delete();
		calculator.updateDisplay();
	})