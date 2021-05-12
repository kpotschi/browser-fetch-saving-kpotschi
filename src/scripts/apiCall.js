export class Client {
	constructor(token) {
		//Your token goes here
		this.token = token;
	}

	async getMovieData(movie) {
		let response = await fetch(
			`http://www.omdbapi.com/?t=${movie}&apikey=${this.token}`
		);
		let data = await response.json();

		return data;
	}
}
