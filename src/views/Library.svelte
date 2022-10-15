<script lang="ts">
  import { onMount } from "svelte";
  // LIB
  import { getRowCardsNum } from "../lib/cardsRow";
  import { chunkArray } from "../lib/chunkArray";
  // COMPONENTS
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";
  import VideoRow from "../components/VideoRow.svelte";
  import Playlist from "../components/Playlist.svelte";
  // SPINNER
  import { Circle3 } from "svelte-loading-spinners";
  const cardNum = getRowCardsNum();
  
  const videos = { arr: [], downloaded: false };
  const api_url = import.meta.env.VITE_API_URL;

  onMount(async () => {
    let recArr = await retrVideos(`${api_url}/playlists/all`);
    let vid = chunkArray(recArr, 3);
    videos.arr = vid.map((arr) => {
      return arr.map((obj) => {
        return obj.videoId;
      });
    });
    videos.downloaded = true;
  });
  async function handleClick(e) {
    const query = e.detail.title === "" ? "/all" : `?pl=${e.detail.title}`;
    let recArr = await retrVideos(`${api_url}/playlists${query}`);
    let vid = chunkArray(recArr, 3);
    videos.arr = vid.map((arr) => {
      return arr.map((obj) => {
        return obj.videoId;
      });
    });
    videos.downloaded = true;
  };
  async function retrVideos(url) {
    let result = await fetch(url, {
      credentials: "include",
    });
    let res = await result.json();
    return res;
  }
</script>

<h1>Library</h1>
<!---------       TOP MENU            ----------->
<Header />
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20" />
<!-----------       LEFT MENU       ------------>
<LeftSidebar page={"library"} />
<!------       CONTENT CONTAINER     ------------>
<div class="min-h-screen ">
  <!-----      PLAYLIST     ----->
  <Playlist on:plClick={handleClick} />
  <!-----------       VIDEOROWS       ------------->

  {#if videos.downloaded}
  
    {#if videos.arr.length !== 0}
      {#each videos.arr as video}
      <div>
        <VideoRow cardsData={video} {cardNum} stripCards={cardNum - video.length} page={"library"} />

      </div>
      {/each}
    {:else}
      <div class="pt-40">
        <h2 class="text-blue-200">No videos in playlists.</h2>
      </div>
    {/if}
  {:else}
    <div class="flex justify-center pt-40 w-full mb-40">
      <!-- SPINNER -->
      <Circle3 size="100" />
    </div>
  {/if}
</div>
