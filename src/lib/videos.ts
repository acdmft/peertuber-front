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
  const res = await fetch(`${url}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(query),
  });
  const result = await res.json();
  let recVid = result.data.videos;
  return recVid;
}