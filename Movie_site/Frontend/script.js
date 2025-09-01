
const APIKEY = '';
const IMAGEPATH = '';
const SEARCHAPI = '';

const section = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");


returnMovies(APIKEY);
function returnMovies(url){
    fetch(url).then(res => res.json)
}
