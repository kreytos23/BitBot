const API_KEY = 'AIzaSyD2IkDfCJZo7hmKbuXq06GlRmga31FmjJg';
const {google} = require('googleapis');
const URL = 'https://www.youtube.com/watch?v=';

const search = 'Golden Harry styiles';
let data = '';

const fetchData = async (search) => {
    var response = await google.youtube('v3').search.list({
        key: API_KEY,
        part: 'snippet',
        q: search,
    });

    var videoId = response.data.items[0].id.videoId;
    const videoTitle = response.data.items[0].snippet.title;
    return videoId;
}

var resultado = 'Je';

setTimeout(() => {
    resultado = fetchData(search);
},3000);

console.log(resultado);