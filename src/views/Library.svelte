<script lang="ts">
  import { onMount } from "svelte";
  import page from "page";
  // LIB
  import { getRowCardsNum } from "../lib/cardsRow";
  import { chunkArray } from "../lib/chunkArray";
  import { warningToast } from "../lib/toast-themes";
  import { user } from "../lib/stores";
  import { incrLikes } from "../lib/videos";
  // COMPONENTS
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";
  import VideoRow from "../components/VideoRow.svelte";
  import Playlist from "../components/Playlist.svelte";
  // SPINNER
  import { Circle3 } from "svelte-loading-spinners";
  const cardNum = getRowCardsNum();
  // maximum possible amount of Cards in rows (less because of playlist menu)
  const maxCards = cardNum >= 4 ? cardNum - 1 : cardNum;

  const videos = { arr: [], downloaded: false };
  const api_url = import.meta.env.VITE_API_URL;

  let screenWidth;
  onMount(async () => {
    if (screenWidth >= 640) {
      let recArr = await retrVideos(`${api_url}/playlists/all`);
      let vid = chunkArray(recArr, maxCards);
      videos.arr = vid.map((arr) => {
        return arr.map((obj) => {
          return obj.videoId;
        });
      });
      videos.downloaded = true;
    }
  });
  async function handleClick(e) {
    const query = e.detail.title === "" ? "/all" : `?pl=${e.detail.title}`;
    let recArr = await retrVideos(`${api_url}/playlists${query}`);
    let vid = chunkArray(recArr, maxCards);
    videos.arr = vid.map((arr) => {
      return arr.map((obj) => {
        return obj.videoId;
      });
    });
    console.log("library videos ", videos.arr);
    videos.downloaded = true;
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
  async function retrVideos(url) {
    let result = await fetch(url, {
      credentials: "include",
    });
    if (result.status === 401) {
      // TOASTS
      $user = false;
      warningToast("You need to be logged in!");
      page.redirect("/");
      return;
    }
    let res = await result.json();
    return res;
  }
</script>

<svelte:window bind:innerWidth={screenWidth} />

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
          <VideoRow
            cardsData={video}
            {cardNum}
            stripCards={cardNum - video.length}
            page={"library"}
            on:like={handleLike}
          />
        </div>
      {/each}
    {:else}
      <div class="hidden sm:block pt-40">
        <h2 class="text-blue-200">No videos in playlists.</h2>
      </div>
    {/if}
  {:else}
    <div class="hidden sm:flex justify-center pt-40 w-full mb-40">
      <!-- SPINNER -->
      <Circle3 size="100" />
    </div>
  {/if}
</div>
