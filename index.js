let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', ()=> {
    searchYoutube();
})

// const api_key = 'AIzaSyCvGrgoGpEsKcOFR7zRVICOpAuRKHzK2sc'; // for backup
const api_key = 'AIzaSyBD-qB9pGvybl3EiOgQTO_c7pLwb6rzMm8';
const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=${api_key}`;


let searchMessageH3 = document.getElementById('searchMessage');
let resultsDiv = document.getElementById('resultsContainer');

let fetchPopularVideos = async () => {
    const popularVideosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=20&chart=mostPopular&regionCode=IN&key=${api_key}`;
    let data = JSON.parse(localStorage.getItem('popularVideos'));
    if (data) {
        displayResults(data, 'Popular Videos');
        return;
    }
    let response = await fetch (popularVideosUrl);
    data = await response.json();
    localStorage.setItem('popularVideos', JSON.stringify(data));
    displayResults(data, 'Popular Videos');
}

let searchYoutube = async () => {
    // alert('Hi!');
    let text = document.getElementById('searchInput').value;
    if(text === '') {
        resultsDiv.innerHTML = null;
        searchMessageH3.innerHTML = null;
        searchMessageH3.classList.remove('border-bottom');
        return;
    }
    // i stored sample data in local storage to avoid exhausting my api quota.
    // TODO: remove/comment this localstorage code before publishing.
    // let data = JSON.parse(localStorage.getItem('youtubeData'));
    // if(data) {
    //     displayResults(data,'Search Results');
    // }
    else {
        let query = `${url}&q=${text}`;
        try {
            let response = await fetch (query);
            let data = await response.json();
            // if(data.error.code === 403) {
            //     return console.log('Quota Exceeded');
            // }
            console.log('fetched: ',data);
            displayResults(data,'Search Results');
            localStorage.setItem('youtubeData', JSON.stringify(data));
        } catch (err) {
            console.log('err:', err)
            // console.log(err);
        }
    }
}

function displayResults({items:results}, titleMsg) {
    resultsDiv.innerHTML = null;
    console.log('search results: ',results);
    searchMessageH3.innerText = `${titleMsg}`;
    searchMessageH3.classList.add('border-bottom');

    results.forEach(({id, snippet:{title,thumbnails:{high:{url:thumbnail}},description}})=>{
        // console.log(title, thumbnail);
        let col = document.createElement('div');
        col.classList = 'col-lg-3 col-md-4 col-sm-6';
        let card = document.createElement('div');
        // card.classList = 'card d-flex flex-row w-50 mx-auto';
        card.classList = 'card';
        // card.style.width = '100%';
        // card.style.height = '200px';
        let cardImg = document.createElement('img');
        // cardImg.classList = 'card-img h-100';
        cardImg.classList = 'card-img-top';
        // cardImg.style.height = '100%';
        cardImg.src = thumbnail;

        let cardBody = document.createElement('div');
        cardBody.classList = 'card-body';

        let h6 = document.createElement('h6');
        h6.innerText = title;

        let p = document.createElement('p');
        p.classList = 'card-text small';
        p.style.height = '60px';
        p.style.overflow = 'hidden';
        p.style.textOverflow = 'ellipsis'
        p.innerText = description;

        cardBody.append(h6,p);

        card.append(cardImg, cardBody);
        col.append(card);

        card.addEventListener('click', ()=>{
            if(id.videoId) {
                let videoId = id.videoId;
                var obj = {
                    title,
                    videoId
                }
            }
            else {
                var obj = {
                    title,
                    id
                }
            }
            localStorage.setItem('selectedVideo', JSON.stringify(obj));
            window.location.href = './video.html';
        });

        resultsDiv.append(col);
    });
}

fetchPopularVideos();