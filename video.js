let selectedVideo = JSON.parse(localStorage.getItem('selectedVideo'));
const baseUrl = 'https://www.youtube.com/embed';

let title = document.getElementById('title');
let iframe = document.querySelector('iframe');
let displayVideo = ({title:videoTitle, videoId, id}) => {
  // console.log(videoTitle, videoId);
  title.innerText = videoTitle;
  let src;
  // if i get play request from popular videos, then id will contain the value of video id.
  if(id) {
    src = `${baseUrl}/${id}`;
  }
  // if i get play request from search results, then videoId will contain the value of video id.
  else if (videoId) {
    src = `${baseUrl}/${videoId}`;
  }
  iframe.src = src;
  iframe.title = videoTitle;
}

if (selectedVideo) {
  console.log(selectedVideo);
  displayVideo(selectedVideo);
}