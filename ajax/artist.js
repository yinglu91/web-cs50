const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

let audio = null;

function fetchArtist() {
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

  //fetch(`https://spotify-api-wrapper.appspot.com/artist/Whitney Houston`)
  fetch(`${API_ADDRESS}/artist/${artistQuery}`)
    .then(response => response.json())
    .then(json => {
      // console.log(json);

      if (json.artists.total > 0) {
        const artist = json.artists.items[0];
        showArtist(artist);

        fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
          .then(response => response.json())
          .then(json => {
            console.log(json.tracks);
            showTracks(json.tracks);
          })
          .catch(error => console.log(error.message));
      } else {
        document.querySelector(
          '#artist'
        ).innerHTML = `${artistQuery}: Not Found.`;
      }
    })
    .catch(error => console.log(error.message));
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
      trackIcon = `<p class='track-icon'><span>&#9654;</span></p>`;
    } else {
      trackIcon = `<p class='track-icon'><span>N/A</span></p>`;
    }
    // console.log(track);

    const trackId = 'track' + index;

    albumList += ` 
    <div id="${trackId}" onclick="playAudio('${track.preview_url}')" class='track'>
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

function playAudio(previewUrl) {
  console.log('previewUrl=' + previewUrl);

  if (audio) {
    audio.pause();
  }

  if (previewUrl === 'null') {
    audio = null;
  } else {
    audio = new Audio(previewUrl);
    audio.play();
  }
}
