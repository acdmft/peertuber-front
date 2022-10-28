<script lang="ts">
  import VideoRow from "../components/VideoRow.svelte";
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";
  // onMount
  import { onMount } from "svelte";
  // page ROUTING
  import page from 'page';
  // SPINNER (github.com/Schum123/svelte-loading-spinners)
  import { Circle3 } from "svelte-loading-spinners";
  // LIB
  import { retrVideos, incrLikes } from "../lib/videos"; 
  import { user } from "../lib/stores";
  import { warningToast } from "../lib/toast-themes";
  import { chunkArray } from "../lib/chunkArray";
  import { getRowCardsNum } from "../lib/cardsRow";
  let selectedCat = "all";
  let loadingNextPage = false;
  const api_url = import.meta.env.VITE_API_URL;
  let videos = {arr: [], recieved: false};
  // maximum possible number of cards in a row (depend on a screen width)
  const cardNum = getRowCardsNum();
  // fetch videos from the server
  onMount(async () => {
    let recVid = await retrVideos(api_url, selectedCat);
    recVid = chunkArray(recVid, cardNum);
    videos.arr.push(...recVid);
    videos.recieved = true;
    console.log(videos.arr);
  });
  function scrollHandler() {
    const scrolledToBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10); 
    if (!loadingNextPage && scrolledToBottom) {
      const previousScrollY = window.scrollY;
      loadingNextPage = true;
      setTimeout(async ()=> {
        window.scroll(0, previousScrollY)
        let recVid = await retrVideos(api_url, selectedCat);
        recVid = chunkArray(recVid, cardNum);
        videos.arr.push(...recVid);
        videos.recieved = true;
        loadingNextPage = false;
      })
    }
  }
  // ADD LIKE
  async function handleLike(event) {
    let result = await incrLikes(event.detail.videoID, api_url);
    if (result === "401 error") {
      $user = false;
      warningToast("You need to be logged in!");
      page.redirect("/");
      return;
    }  
  }
  async function handleFilterSelect(e) {
    selectedCat = e.detail.category;
    let recVid = await retrVideos(api_url, selectedCat);    
    videos.arr = chunkArray(recVid, cardNum);
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
<div class="min-h-screen grid grid-cols-1">
  <!-----------       VIDEOROWS       ------------->
  {#if videos.recieved}
    {#each videos.arr as video}
      <VideoRow cardsData={video} {cardNum} stripCards={cardNum - video.length} on:like={handleLike} page={"home"} />
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
