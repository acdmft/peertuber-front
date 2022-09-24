<script lang="ts">
  import VideoRow from "../components/VideoRow.svelte";
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";
  // onMount
  import { onMount } from "svelte";
  // SPINNER (github.com/Schum123/svelte-loading-spinners)
  import { Circle3 } from "svelte-loading-spinners";
  // LIB
  import { retrVideos } from "../lib/videos"; 
  import { chunkArray } from "../lib/chunkArray";

  let selectedCat = "all";
  let loadingNextPage = false;
  const api_url = import.meta.env.VITE_API_URL;
  let videos = {arr: [], recieved: false};
  
  // fetch videos from the server
  onMount(async () => {
    let recVid = await retrVideos(api_url, selectedCat);
    recVid = chunkArray(recVid, 4);
    videos.arr.push(...recVid);
    videos.recieved = true;
  });
  function scrollHandler() {
    const scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight; 
    if (!loadingNextPage && scrolledToBottom) {
      const previousScrollY = window.scrollY;
      loadingNextPage = true;
      setTimeout(async ()=> {
        window.scroll(0, previousScrollY)
        let recVid = await retrVideos(api_url, selectedCat);
        recVid = chunkArray(recVid, 4);
        videos.arr.push(...recVid);
        videos.recieved = true;
        loadingNextPage = false;
      })
    }
  }
  // ADD LIKE
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
  async function handleFilterSelect(e) {
    selectedCat = e.detail.category;
    let recVid = await retrVideos(api_url, selectedCat);
    console.log('handleFilterSelect recVid', recVid);
    
    videos.arr = chunkArray(recVid, 4);
    videos.recieved = true;

  }
</script>
<svelte:window on:scroll={scrollHandler} />
<!---------          TOP MENU            ----------->
<Header on:selFitler={handleFilterSelect}/>
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20" />
<!-----------        LEFT MENU       ------------>
<LeftSidebar page={"home"} />
<!----------       CONTENT CONTAINER   ------------->
<div class="min-h-screen">
  <!-----------       VIDEOROWS       ------------->
  {#if videos.recieved}
    {#each videos.arr as video}
      <VideoRow cardsData={video} on:like={handleLike} page={"home"} />
    {/each}
    
    <div class="flex justify-center pt-10 w-full mb-10">
      <Circle3 size="40" />
    </div>
    
  {:else}
    <div class="flex justify-center pt-40 w-full mb-40">
      <Circle3 size="100" />
    </div>
  {/if}
</div>
