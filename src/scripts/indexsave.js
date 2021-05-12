import "../main.scss";
import "regenerator-runtime/runtime";
const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
import { Client } from "../scripts/apiCall.js";
import { View } from "../scripts/view.js";

// code goes below -- these are examples
let database = [];
let arraydata = JSON.parse(localStorage.getItem("moviedb"));
arraydata !== null && arraydata.forEach((e) => database.push(e));

database.length !== 0 && database.forEach((e) => displayMovieDB(e, "ada86297"));

document.querySelector(".btn-save").addEventListener("click", (e) => {
	e.preventDefault;
	addMovie(document.querySelector("#input").value, "ada86297");
});

document.querySelector(".btn-reset").addEventListener("click", (e) => {
	e.preventDefault;
	new View().removeDisplay();
	localStorage.clear();
	database = [];
});

async function displayMovieDB(movieName, key) {
	let data = await new Client(key).getMovieData(movieName);
	new View().displayMovieOnPage(data);
}

async function addMovie(movieName, key) {
	let data = await new Client(key).getMovieData(movieName);
	database.push(data.Title);

	if (checkForDuplicates(database)) {
		database.pop();
		alert("That movie is already displayed!");
	} else {
		new View().displayMovieOnPage(data);
		localStorage.setItem("moviedb", JSON.stringify(database));
	}
}

const checkForDuplicates = (array) => new Set(array).size !== array.length;
