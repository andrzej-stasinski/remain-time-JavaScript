
function aktualnaData() {
	return new Date();
}

function aktualnaDataPokaz() {
	var dzisiaj = aktualnaData();

	var rok 	= dzisiaj.getFullYear();
	var miesiac = dzisiaj.getMonth();
	var dzien   = dzisiaj.getDate();
	var dzienTyg= dzisiaj.getDay();
	var godz    = dzisiaj.getHours();
	var min     = dzisiaj.getMinutes();
	var sek     = dzisiaj.getSeconds();
	var ms      = dzisiaj.getMilliseconds();

	if(min<10)
		min = '0'+min;
	if(sek<10)
		sek = '0'+sek;
	
	var miesiace = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
	var dniTygodnia = ["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"];
	var data_aktualna = dniTygodnia[dzienTyg]+", "+dzien+" "+miesiace[miesiac]+" "+rok+", godz. "+godz+":"+min+":"+sek;

	return data_aktualna;
}

function dataUstalona() {

	var rok = document.getElementById('rok').value;
	var msc = document.getElementById('msc').value - 1;
	var dzien = document.getElementById('dzien').value;
	var godz = document.getElementById('godzina').value;

	var data = new Date(rok, msc, dzien, godz);
	return data;
}

function dataUstalonaPokaz() {

	var teraz = aktualnaData();
	var mojeurodziny = dataUstalona();

	if(mojeurodziny < teraz) {
		return 'Nie wylicza z datą wsteczną';
	}	
	if(!sprMsc() || !sprDzien()) {
		console.log(sprMsc());
		return 'Nie prawidłowa data';
	}


	var data = dataUstalona();

	var rok 	= data.getFullYear();
	var miesiac = data.getMonth();
	var dzien   = data.getDate();

	var miesiace = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
	var data_ustalona = dzien+" "+miesiace[miesiac]+" "+rok;

	return data_ustalona;
}

function czasObliczony() {
	var teraz = aktualnaData();

	var mojeurodziny = dataUstalona();

	if(mojeurodziny < teraz) {
		return 'Nie wylicza z datą wsteczną';
	}	
	if(!sprMsc() || !sprDzien()) {
		console.log(sprMsc());
		return 'Nie prawidłowa data';
	}	
	var roznicaMilisekund = mojeurodziny - teraz;

	var dniDoUrodzin = Math.floor(roznicaMilisekund / (24*60*60*1000));

	var resztaGodzinMilisekunach = roznicaMilisekund % (24*60*60*1000);
	var godzinDoUrodzin = Math.floor(resztaGodzinMilisekunach / (60*60*1000));

	var resztaMinutMilisekunach = roznicaMilisekund % (60*60*1000);
	var minutDoUrodzin = Math.floor(resztaMinutMilisekunach / (60 * 1000));

	var resztaSekundMilisekunach = roznicaMilisekund % (60*1000);
	var sekundDoUrodzin = Math.floor(resztaSekundMilisekunach / (1000));

	return dniDoUrodzin + ' dni, ' + godzinDoUrodzin + ' godz. ' + minutDoUrodzin + ' min. ' + sekundDoUrodzin + ' sek.';
}

function czasObliczonyAkcja() {

	console.log('czasObliczonyAkcja');

	var data_aktualna = document.getElementById('data_aktualna');
	data_aktualna.innerHTML = aktualnaDataPokaz();

	var data_ustalona = document.getElementById('data_ustalona');
	data_ustalona.innerHTML = dataUstalonaPokaz();

	var czas_obliczony = document.getElementById('czas_obliczony');
	czas_obliczony.innerHTML = czasObliczony();

}

function aktualizujCzas() {

	data_aktualna.innerHTML  = aktualnaDataPokaz();
	data_ustalona.innerHTML  = dataUstalonaPokaz();
	czas_obliczony.innerHTML = czasObliczony();

	setTimeout("aktualizujCzas()", 1000);
}

// Funkcje sprawdzające msc i dzien, czy jest w odpowiednim zakresie
function sprMsc() {
	var msc_wpisany = document.getElementById('msc');
	if(msc_wpisany.value >0 && msc_wpisany.value <13) {
		return true;
	} else {
		return false;
	}
}
function sprDzien() {
	var dzien_wpisany = document.getElementById('dzien');
	if(dzien_wpisany.value >0 && dzien_wpisany.value <32) {
		return true;
	} else {
		return false;
	}
}
function sprGodz() {
	var dzien_wpisany = document.getElementById('godzina');
	if(dzien_wpisany.value >0 && dzien_wpisany.value <24) {
		return true;
	} else {
		return false;
	}
}

// Ustalenie data pokazanej przy pierwszym uruchomieniu
function ustalWstepnaDate() {
	// ustalenie nowej daty
	// nowej daty = do aktualnej daty + 86400000, gdzie 86400000 to jedna doba (1000x60x60x24)
	var akt_data = new Date();
	var akt_data_plus = akt_data.valueOf() + 86400000;
	var data_nowa = new Date(akt_data_plus);
	document.getElementById('rok').value = data_nowa.getFullYear();
	document.getElementById('msc').value = data_nowa.getMonth()+1;
	document.getElementById('dzien').value = data_nowa.getDate();
	document.getElementById('godzina').value = data_nowa.getDate();
}

// INIT
function init() {

	var data_aktualna = document.getElementById('data_aktualna');
	data_aktualna.innerHTML = aktualnaDataPokaz();

	ustalWstepnaDate();

	var data_ustalona = document.getElementById('data_ustalona');
	data_ustalona.innerHTML = dataUstalonaPokaz();

	var czas_obliczony = document.getElementById('czas_obliczony');
	czas_obliczony.innerHTML = czasObliczony();

	aktualizujCzas();

	// var oblicz = document.getElementById('oblicz');
	// oblicz.onclick = czasObliczonyAkcja;

	var rok = document.getElementById('rok');
	rok.onkeyup = sprawdzRok;
	var msc = document.getElementById('msc');
	msc.onkeyup = sprawdzMsc;
	var dzien = document.getElementById('dzien');
	dzien.onkeyup = sprawdzDzien;
	var godzina = document.getElementById('godzina');
	godzina.onkeyup = sprawdzGodz;

	var rok_valid   = document.getElementById('rok_valid');
	var msc_valid   = document.getElementById('msc_valid');	
	var dzien_valid = document.getElementById('dzien_valid');
	var godz_valid  = document.getElementById('godz_valid');
}

// Zdarzenia - onkeyup
function sprawdzRok() {

	var data_ustalona_pokaz = document.getElementById('data_ustalona');
	var czas_obliczony_pokaz = document.getElementById('czas_obliczony');

	console.log('sprawdzRok');
	var data_teraz = aktualnaData();
	var data_ustalona = dataUstalona();
	var rok_teraz = data_teraz.getFullYear();
	var rok_ustalony = data_ustalona.getFullYear();

	// Sprawdzenie czy ustalona Data >= od Daty aktualnej	
	if(data_ustalona >= data_teraz && rok_ustalony >= rok_teraz) {
		console.log('Rok poprawny');
		this.style.border = "1px solid green";
		document.getElementById('msc').style.border = "1px solid green";
		document.getElementById('dzien').style.border = "1px solid green";
		document.getElementById('godzina').style.border = "1px solid green";

		rok_valid.innerHTML = "";
		msc_valid.innerHTML = "";
		dzien_valid.innerHTML = '';
		godz_valid.innerHTML  = "";

		var data_ustalona = document.getElementById('data_ustalona');
		data_ustalona.innerHTML = dataUstalonaPokaz();

		var czas_obliczony = document.getElementById('czas_obliczony');
		czas_obliczony.innerHTML = czasObliczony();
	} else {
		console.log('Rok nieprawidłowy');
		this.style.border = "1px solid red";
		document.getElementById('msc').style.border = "1px solid red";
		document.getElementById('dzien').style.border = "1px solid red";
		document.getElementById('godzina').style.border = "1px solid red";

		var data_ustalona = document.getElementById('data_ustalona');
		data_ustalona.innerHTML = 'Nieprawidłowa data';

		var czas_obliczony = document.getElementById('czas_obliczony');
		czas_obliczony.innerHTML = "Nie wylicza dla daty wstecz";

		data_ustalona_pokaz.innerHTML = 'Nieprawidłowa data';
		rok_valid.innerHTML = "Nieprawidłowy wpis";
		czas_obliczony_pokaz.innerHTML = "Nie wylicza dla daty wstecz";



	}
}

function sprawdzMsc() {

	var data_ustalona_pokaz = document.getElementById('data_ustalona');
	var czas_obliczony_pokaz = document.getElementById('czas_obliczony');

	console.log('sprawdzMsc');
	var data_teraz = aktualnaData();
	var data_ustalona = dataUstalona();
	// var msc_teraz = data_teraz.getMonth();
	
	var msc_ustalony = data_ustalona.getMonth();
	console.log('msc_ustalony=' + msc_ustalony);

	var msc_wpisany = this.value;
	console.log('msc_wpisany=' + msc_wpisany);

	// Sprawdzenie czy ustalona Data >= od Daty aktualnej
	// Sprawdzenie czy miesiące są w przedziale [1-12]
	if(data_ustalona >= data_teraz && sprMsc()) {
		console.log('Msc poprawny');
		this.style.border = "1px solid green";
		document.getElementById('rok').style.border = "1px solid green";
		document.getElementById('dzien').style.border = "1px solid green";
		document.getElementById('godzina').style.border = "1px solid green";

		data_ustalona_pokaz.innerHTML = dataUstalonaPokaz();
		rok_valid.innerHTML = "";
		msc_valid.innerHTML = "";
		dzien_valid.innerHTML = '';
		godz_valid.innerHTML  = "";
		czas_obliczony_pokaz.innerHTML = czasObliczony();

	} else {
		console.log('Msc nieprawidłowy');
		this.style.border = "1px solid red";
		document.getElementById('rok').style.border = "1px solid red";
		document.getElementById('dzien').style.border = "1px solid red";
		document.getElementById('godzina').style.border = "1px solid red";

		data_ustalona_pokaz.innerHTML = 'Nieprawidłowa data';
		msc_valid.innerHTML = "Nieprawidłowy wpis";
		czas_obliczony_pokaz.innerHTML = "Nie wylicza dla daty wstecz";
	}

}

function sprawdzDzien() {

	var data_ustalona = document.getElementById('data_ustalona');
	var czas_obliczony = document.getElementById('czas_obliczony');

	console.log('sprawdzDzien');
	var data_teraz = aktualnaData();
	var data_ustalona = dataUstalona();

	// Sprawdzenie czy ustalona Data >= od Daty aktualnej
	if(data_ustalona >= data_teraz && sprDzien()) {
		console.log('Dzień poprawny');
		this.style.border = "1px solid green";
		document.getElementById('rok').style.border = "1px solid green";
		document.getElementById('msc').style.border = "1px solid green";
		document.getElementById('godzina').style.border = "1px solid green";

		data_ustalona.innerHTML = dataUstalonaPokaz();
		czas_obliczony.innerHTML = czasObliczony();
		rok_valid.innerHTML = "";
		msc_valid.innerHTML = "";		
		dzien_valid.innerHTML = '';
		godz_valid.innerHTML  = "";

	} else {
		console.log('Dzień nieprawidłowy');
		this.style.border = "1px solid red";
		document.getElementById('rok').style.border = "1px solid red";
		document.getElementById('msc').style.border = "1px solid red";
		document.getElementById('godzina').style.border = "1px solid red";

		data_ustalona.innerHTML = 'Nieprawidłowa data';
		czas_obliczony.innerHTML = "Nie wylicza dla daty wstecz";
		dzien_valid.innerHTML = 'Nieprawidłowy wpis';

	}
}

function sprawdzGodz() {

	var data_ustalona = document.getElementById('data_ustalona');
	var czas_obliczony = document.getElementById('czas_obliczony');

	console.log('sprawdzGodz');
	var data_teraz = aktualnaData();
	var data_ustalona = dataUstalona();

	// Sprawdzenie czy ustalona Data >= od Godz aktualnej
	if(data_ustalona >= data_teraz && sprGodz()) {
		console.log('Godz poprawna');
		this.style.border = "1px solid green";
		document.getElementById('rok').style.border = "1px solid green";
		document.getElementById('msc').style.border = "1px solid green";
		document.getElementById('dzien').style.border = "1px solid green";

		data_ustalona.innerHTML = dataUstalonaPokaz();
		czas_obliczony.innerHTML = czasObliczony();
		dzien_valid.innerHTML = '';
		msc_valid.innerHTML   = "";
		godz_valid.innerHTML  = "";

	} else {
		console.log('Godzina nieprawidłowy');
		this.style.border = "1px solid red";
		document.getElementById('rok').style.border = "1px solid red";
		document.getElementById('msc').style.border = "1px solid red";
		document.getElementById('dzien').style.border = "1px solid red";

		data_ustalona.innerHTML  = 'Nieprawidłowa data';
		czas_obliczony.innerHTML = "Nie wylicza dla daty wstecz";
		godz_valid.innerHTML     = 'Nieprawidłowy wpis';

	}
}
// START
window.onload = init;

















