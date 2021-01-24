const CHACHE_KEY = "calculation_history";

//check
function checkForStorage(){
	return typeof(Storage) !== "undefined";
}

//meyimpan data
function putHistory(data){
	if(checkForStorage()){
		let historyData = null;

		if(localStorage.getItem(CHACHE_KEY) === null){
			historyData = [];
		}else{
			//JSON.parse() mengubah nilai object dalam nilai string
			//kembali pada bentuk object js
			historyData = JSON.parse(localStorage.getItem(CHACHE_KEY));
		}

		//unshift() menambahkan nilai baru pada array yg ditempatkan pada awal index
		//juga mengembalikan nilai panjang aray setelah ditambahkan nilai baru

		historyData.unshift(data);

		if(historyData.length > 5){
			//pop() menghapus nilai index terahir sehingga ukuran array
			//historyData tidak akan lebih dari 5
			//agar history kalkulasi 5 hasil terahir
			historyData.pop();
		}
		//JSON.stringify() mengubah object js ke string
		localStorage.setItem(CHACHE_KEY, JSON.stringify(historyData));
	}
}

//mengambil data dari localStorage
function showHistory(){
	if(checkForStorage()){
		return JSON.parse(localStorage.getItem(CHACHE_KEY)) || [];
	}else{
		return [];
	}
}

//render data riwayat kalkulasi
function renderHistory(){
	const historyData = showHistory();
	let historyList = document.querySelector("#historyList");

	///selalu hapus konten HTML pada elemen hstory LIST agar tdk menampilkan data ganda
	historyList.innerHTML = "";

	for(let history of historyData){
		let row = document.createElement('tr');
		row.innerHTML = "<td>" + history.firstNumber + "</td>";
		row.innerHTML += "<td>" + history.operator + "</td>";
		row.innerHTML += "<td>" + history.secondNumber + "</td>";
		row.innerHTML += "<td>" + history.result + "</td>";


		historyList.appendChild(row);
	}
}


renderHistory();