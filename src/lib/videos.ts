// functions that retrieve video previews from the server 

// called from Home page,returns 12 video previews
export async function retrVideos(url, cat) {
  const query = {
    query: `{ videos(category: "${cat}") { 
      instance {
        host
        name
      }
      _id
      name 
      url 
      thumbnailImg 
      likes
      duration
    }}`,
  };
  const res = await fetch(`${url}/videos?category=${cat}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // body: JSON.stringify(query),
  });
  const result = await res.json();
  let recVid = result;
  console.log('recVid', recVid);
  return recVid;
}

export async function incrLikes(videoId, url) {
  let data = { videoId: videoId };
  let res = await fetch(`${url}/like`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
  if (res.ok) {
    let cardLikes = document.querySelector(`#p${videoId}`);
    console.log('increLikes cardLikes', cardLikes)
    let likesNum = (parseInt(cardLikes.querySelector('span').textContent) + 1);
    let likesNumStr = likesNum.toString();
    cardLikes.querySelector('span').textContent = likesNumStr;
    return 'ok';
  };
  if (res.status === 401) {
    return "401 error";
  }
  if (res.status === 400) {
    return "400 error";
  }
}