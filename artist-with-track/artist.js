const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';
let audio = null;

document.addEventListener('DOMContentLoaded', function() {
  fetchArtist('Maria Callas');
});

function getArtist() {
  const artistQuery = document.querySelector('#selectedArtist').value;
  console.log(artistQuery);
  if (!artistQuery) {
    document.querySelector('#artist').innerHTML = `Please select an artist`;
    return;
  }

  fetchArtist(artistQuery);
}

async function fetchArtist(artistQuery) {
  console.log(artistQuery);

  document.querySelector('#artist').innerHTML = 'Loading..';

  if (audio) {
    audio.pause();
  }

  // Get response
  //fetch(`https://spotify-api-wrapper.appspot.com/artist/Maria Callas`)
  const response = await fetch(`${API_ADDRESS}/artist/${artistQuery}`);

  // Get data
  const data = await response.json();
  console.log(data); //  in browser

  if (data.artists.total > 0) {
    const artist = data.artists.items[0];
    showArtist(artist);

    fetchTopTracks(artist.id);
  } else {
    document.querySelector('#artist').innerHTML = `${artistQuery}: Not Found.`;
  }
}

function showArtist(artist) {
  console.log(artist);
  const followers = parseInt(artist.followers.total).toLocaleString();

  document.querySelector('#artist').innerHTML = `
    <h1>${artist.name}</h1>
    <img src="${artist.images[1].url}" height="350px"/>
    <h3>Followers: ${followers}</h3>
  `;
}

async function fetchTopTracks(artistId) {
  // console.log(artistId);

  // Fetch the artist's top tracks response
  // https://spotify-api-wrapper.appspot.com/artist/0bjdfjE8XbLa2Odstu6E1E/top-tracks
  const response = await fetch(`${API_ADDRESS}/artist/${artistId}/top-tracks`);

  // Get json data
  const json = await response.json();
  console.log(json);
  playPreview(json.tracks);
}

function playPreview(tracks) {
  // console.log(tracks);
  const previewTrack = tracks.find(track => !!track.preview_url);
  console.log(previewTrack);
  if (previewTrack) {
    audio = new Audio(previewTrack.preview_url);
    audio.play();
  }
}
