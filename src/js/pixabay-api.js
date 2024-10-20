import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const defParams = {
    key: "46481963-10f537a41063d6fd7fead7408",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 15,
    page: 1,
};
var curParams = {
    q: '',
};

async function doQuery() { 
    const resp = await axios.get("", { params: curParams });

    resp.data.totalPages = Math.floor(resp.data.totalHits / defParams.per_page) + 1;
    return resp.data;
}

function searchPhotos(queryStr) { 
    curParams = defParams;
    curParams.q = queryStr;

    return doQuery();
}

function nextPage() {
    curParams.page += 1;

    return doQuery();
 }

export { searchPhotos, nextPage }