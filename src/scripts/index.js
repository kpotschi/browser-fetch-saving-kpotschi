import "../main.scss";
import "regenerator-runtime/runtime";
const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
import { Client } from "../scripts/apiCall.js";
import { View } from "../scripts/view.js";

// declare variables
let database = [];
const apiKey = "ada86297";

//match internal database with localstorage
if (localStorage.getItem("moviedb")) {
	JSON.parse(localStorage.getItem("moviedb")).forEach((e) => {
		new View().displayMovieOnPage(e);
		database.push(e);
	});
}

// eventlistener stuff
document.querySelector(".btn-save").addEventListener("click", (e) => {
	addMovie(document.querySelector("#input").value);
});

document.querySelector(".btn-reset").addEventListener("click", (e) => {
	new View().removeDisplay();
	localStorage.clear();
	database = [];
});

// the actual code we need -- case-sensitive!
async function addMovie(movieName) {
	if (database.map((x) => x.Title).includes(movieName)) {
		return alert("movie already in list");
	}
	let data = await new Client(apiKey).getMovieData(movieName);
	new View().displayMovieOnPage(data);
	database.push(data);
	localStorage.setItem("moviedb", JSON.stringify(database));
}
