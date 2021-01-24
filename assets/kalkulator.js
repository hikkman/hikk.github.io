console.log("selamat anda berhasil menambahkan js pertama anda");

//typeof() = untuk mengetahui type data
//    let x; // x merupakan undefined
//    x = 1 // sekarang x merupakan number
//   x = true // sekarang x merupakan boolean
//    x = "Harry" // sekarang x  merupakan string


//untuk menyimpan data
const calculator = {
	displayNumber : '0',
	operator : null,
	firstNumber : null,
	WaitingForSecondNumber : false
};


//update display
function updateDisplay(){
	
	document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}


//clear
function clearCalculator(){
	calculator.displayNumber = '0';
	calculator.operator = null;
	calculator.firstNumber = null;
	calculator.WaitingForSecondNumber = false;
}


//input
function inputDigit(digit) {
	if(calculator.displayNumber === '0'){
		calculator.displayNumber = digit;
	}
	else{
		calculator.displayNumber += digit;
	}
}

//negative or positif number
function inverseNumber(){
	if(calculator.displayNumber === "0"){
		return;
	}

	calculator.displayNumber = calculator.displayNumber * -1;
}


function handleOperator(operator){
	if(!calculator.WaitingForSecondNumber){
		calculator.operator = operator;
		calculator.WaitingForSecondNumber = true;
		calculator.firstNumber = calculator.displayNumber;

		//mengatur ulang display supaya tombol selanjutnya dimnulai dari 0 lagi
		calculator.displayNumber = "0";
	}
	else{
		alert("operator sudah ditetapkan");
	}
}

function performCalculation() {
	if(calculator.firstNumber === null || calculator.operator === null){
		alert("anda belum menetapkan operator");
		return;
	}

	let result = 0;
	//parseInt(mengubah string menjadi number agar bisa dikalkulasi)
	if(calculator.operator === "+"){
		result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
		
	}
	else{
		result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);		
	}

	//object yang akan dikirim sebagai argumen putHistory()
	const history = {
		firstNumber : calculator.firstNumber,
		secondNumber : calculator.displayNumber,
		operator : calculator.operator,
		result : result
	}

	putHistory(history);
	calculator.displayNumber = result;
	renderHistory();


}

const buttons = document.querySelectorAll(".button");

for(let button of buttons){
	button.addEventListener('click' , function(event){
		//mendapatkan objek elemen yg di klik
		const target = event.target;


		//gunakan classList untuk melihat nilai class
		//dengan contains() memastikna nilai aray
		if(target.classList.contains("clear")){
			clearCalculator();
			updateDisplay();
			return;
		}

		if(target.classList.contains("negative")){
			inverseNumber(); //function negative
			updateDisplay();
			return;
		}

		if(target.classList.contains("equals")){
			performCalculation(); //function equals
			updateDisplay();
			return;
		}

		if (target.classList.contains("operator")) {
			handleOperator(target.innerText);
			return;
		}
		inputDigit(target.innerText);
		updateDisplay();
	});
}



if(typeof(Storage) !== "undefined"){
	//browser mendukung
}
else{
	//browser tidak mendukung
            }