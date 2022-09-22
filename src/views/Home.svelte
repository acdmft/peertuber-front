<script lang="ts">
  import VideoRow from "../components/VideoRow.svelte";
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";
  // onMount
  import { onMount } from "svelte";
  // SPINNER (github.com/Schum123/svelte-loading-spinners)
  import { Circle3 } from "svelte-loading-spinners";
  import { chunkArray } from "../lib/chunkArray";

  let selectedCat = 'all';
  let loadingNextPage = false;
  const api_url = import.meta.env.VITE_API_URL;
  let videos = {arr: [], recieved: false};
  // FETCH VIDEOS
  async function retrVideos() {
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
    let recVid = result.data.videos;
    recVid = chunkArray(recVid, 4);
    videos.arr.push(...recVid);
    videos.recieved = true;
    // videos = result.data.videos;
  }

  // fetch videos from the server
  onMount(async () => {
    retrVideos();
  });
  function scrollHandler() {
    const scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight; 
    if (!loadingNextPage && scrolledToBottom) {
      const previousScrollY = window.scrollY;
      loadingNextPage = true;
      setTimeout(()=> {
        window.scroll(0, previousScrollY)
        retrVideos();
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
  function handleFilterSelect(e) {
    selectedCat = e.detail.category;
    console.log(e.detail.category)
  }
</script>
<svelte:window on:scroll={scrollHandler} />
<!---------       TOP MENU            ----------->
<Header on:selFitler={handleFilterSelect}/>
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20" />
<!-----------       LEFT MENU       ------------>
<LeftSidebar page={"home"} />
<!----------         CONTENT CONTAINER   ------------->
<div class="min-h-screen">
  <!-- TEST BUTTON  -->
  <button on:click={retrVideos} class="fixed top-0 left-10 font-bold text-neutral-200 z-40">Load more</button>
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
