<script lang="ts">
  import VideoRow from "../components/VideoRow.svelte";
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";
  // onMount
  import { onMount } from "svelte";
  // SPINNER (github.com/Schum123/svelte-loading-spinners)
  import {Circle3} from 'svelte-loading-spinners';


  const api_url = import.meta.env.VITE_API_URL;
  let videos = [];
  // $: loadedVideos = videos.length;

  onMount(async () => {
    const query = {
      query: `{ videos { 
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
    const res = await fetch(`${api_url}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(query),
    });
    const result = await res.json();
    console.log(result);
    // videos.push(result.data.videos);
    // Svelte reacts on the assignment to the variable
    videos = result.data.videos;
  });

  function handleLike(event) {
    let data = { videoId: event.detail.videoID };
    fetch(`${api_url}/like`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("res.status", res.status);
    });
    console.log(event.detail.videoID);
  }
</script>

<!---------       TOP MENU            ----------->
<Header />
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20" />
<!-----------       LEFT MENU       ------------>
<LeftSidebar page={"home"} />
<!----------         CONTENT CONTAINER   ------------->
<div class="min-h-screen">
  <!-----------       VIDEOROWS       ------------->
  {#if videos.length !== 0}
    <VideoRow
      cardsData={videos.slice(0, 4)}
      on:like={handleLike}
      page={"home"}
    />
    <VideoRow
      cardsData={videos.slice(4, 8)}
      on:like={handleLike}
      page={"home"}
    />
    <VideoRow
      cardsData={videos.slice(8, 12)}
      on:like={handleLike}
      page={"home"}
    />
  {:else}
    <div class="flex justify-center pt-40 w-full mb-40">
      <Circle3 size="100" />
    </div>
  {/if}
</div>
