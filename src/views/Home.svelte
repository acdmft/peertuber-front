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
  import { getRowCardsNum } from "../lib/cardsRow";
  import { HtmlTag } from "svelte/internal";

  let selectedCat = "all";
  let loadingNextPage = false;
  const api_url = import.meta.env.VITE_API_URL;
  let videos = {arr: [], recieved: false};
  // maximum possible number of cards in a row (depend on a screen width)
  const cardNum = getRowCardsNum();
  let scrH =  window.innerHeight;
  let scrY = window.scrollY;
  let offsH = document.body.offsetHeight;
  let scrolled2bot = false;
  let cltH = document.body.clientHeight;
  $: scrollHeight = scrH;
  $: scroll_y = scrY;
  $: offsetHeight = offsH;
  // fetch videos from the server
  onMount(async () => {
    console.log(cardNum);
    let recVid = await retrVideos(api_url, selectedCat);
    recVid = chunkArray(recVid, cardNum);
    videos.arr.push(...recVid);
    videos.recieved = true;
  });
  function scrollHandler() {
    // const scrolledToBottom = true;
    const scrolledToBottom = (window.innerHeight + window.scrollY) >= cltH;//document.body.offsetHeight; 
    scrH =  window.innerHeight;
    scrY = window.scrollY;
    offsH = document.body.offsetHeight;
    cltH = document.body.clientHeight;
    scrolled2bot = false;
    if (!loadingNextPage && scrolledToBottom) {
      const previousScrollY = window.scrollY;
      loadingNextPage = true;
      scrolled2bot = true;
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
<div class="min-h-screen grid grid-cols-1">
  <p class="mt-14 fixed top-0 left-0 z-30 text-green-300">innerHeight- {scrollHeight} scrollY-{scroll_y} docHeight={offsH}</p>
  <p class="mt-14 fixed top-6 left-0 z-30 text-green-300">    scr2bot: {scrolled2bot} cltH: {cltH}</p>
  <!-----------       VIDEOROWS       ------------->
  {#if videos.recieved}
    {#each videos.arr as video}
      <VideoRow cardsData={video} {cardNum} stripCards={cardNum - video.length} on:like={handleLike} page={"home"} />
    {/each}
    
    <div class="flex justify-center pt-10 w-full mb-10 flex items-center h-40 spinner-cont">
      <Circle3 size="40" />
    </div>
    
  {:else}
    <div class="flex justify-center pt-40 w-full mb-40">
      <Circle3 size="100" />
    </div>
  {/if}
</div>
