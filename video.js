let selectedVideo = JSON.parse(localStorage.getItem('selectedVideo'));
const baseUrl = 'https://www.youtube.com/embed';

let title = document.getElementById('title');
let iframe = document.querySelector('iframe');
let displayVideo = ({title:videoTitle, videoId, id}) => {
  // console.log(videoTitle, videoId);
  title.innerText = videoTitle;
  if(id) {
    var src = `${baseUrl}/${id}`;
  }
  else if (videoId) {
    var src = `${baseUrl}/${videoId}`;
  }
  iframe.src = src;
  iframe.title = videoTitle;
}

if (selectedVideo) {
  console.log(selectedVideo);
  displayVideo(selectedVideo);
}