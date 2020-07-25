const playEntity = '&#9654;';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

let audio = null;
let playingPreviewUrl = null;

async function fetchArtist() {
  document.querySelector('#artist').innerHTML = `Loading...`;
  document.querySelector('#top-tracks').innerHTML = ``;

  if (audio) {
    audio.pause();
  }

  const artistQuery = document.querySelector('#selectedArtist').value;
  console.log(artistQuery);
  if (!artistQuery) {
    document.querySelector('#artist').innerHTML = `Please select an artist`;
    return;
  }

  try {
    // Fetch the artist response
    //fetch(`https://spotify-api-wrapper.appspot.com/artist/Whitney Houston`)
    const response = await fetch(`${API_ADDRESS}/artist/${artistQuery}`);

    // Get json data
    const json = await response.json();
    console.log(json);

    if (json.artists.total > 0) {
      const artist = json.artists.items[0];
      showArtist(artist);

      // Fetch the artist's top tracks response
      const response2 = await fetch(
        `${API_ADDRESS}/artist/${artist.id}/top-tracks`
      );

      // Get json data
      const json2 = await response2.json();
      console.log(json2);
      showTracks(json2.tracks);
    } else {
      document.querySelector(
        '#artist'
      ).innerHTML = `${artistQuery}: Not Found.`;
    }
  } catch (error) {
    console.error(error);

    document.querySelector('#artist').style.color = 'red';
    document.querySelector('#artist').innerHTML =
      'An error occured. Please contact site admin if error persistently occure.';
  }
}

function showArtist(artist) {
  // console.log(artist);
  const followers = Number(artist.followers.total).toLocaleString();
  document.querySelector('#artist').innerHTML = `
    <h1>${artist.name}</h1>
    <img src="${artist.images[1].url}" />
    <h3>Followers: ${followers}</h3>
  `;
}

function showTracks(tracks) {
  // console.log(tracks);

  let albumList = '';
  tracks.forEach(function(track, index) {
    let trackIcon = '<h3>Top Tracks</h3>';
    if (track.preview_url) {
      trackIcon = `<p class='track-icon'><span>${playEntity}</span></p>`;
    } else {
      trackIcon = `<p class='track-icon'><span>N/A</span></p>`;
    }
    // console.log(track);

    const trackId = 'track' + index;
    albumList += ` 
    <div id="${trackId}" onclick="playAudio('${track.preview_url}', '${trackId}')" class='track'>
    <img
            src="${track.album.images[0].url}"
            alt='track-image'
            style='width: 250px; height: 250px;'
          />

          <p class='track-text'>${track.name}</p>
          ${trackIcon}
          </div>
    `;
  });

  albumList += `<hr />`;
  document.querySelector('#top-tracks').innerHTML = albumList;
}

function playAudio(previewUrl, trackId) {
  // console.log('previewUrl=' + previewUrl);
  console.log(trackId);

  document.querySelectorAll('.track-icon span').forEach(element => {
    if (element.innerHTML !== 'N/A') {
      element.innerHTML = playEntity;
    }
  });

  if (audio) {
    audio.pause();
  }

  if (previewUrl === 'null') {
    // N/A
    playingPreviewUrl = null; // don't change button N/A
    return;
  }

  // click on track which can be played.

  if (playingPreviewUrl && playingPreviewUrl === previewUrl) {
    // want to stop
    playingPreviewUrl = null;
    audio = null;

    document
      .getElementById(trackId)
      .querySelector('.track-icon span').innerHTML = playEntity;
  } else {
    audio = new Audio(previewUrl);
    audio.play();

    document
      .getElementById(trackId)
      .querySelector('.track-icon span').innerHTML = `| |`;
    playingPreviewUrl = previewUrl;
  }
}
