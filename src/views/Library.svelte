<script lang="ts">
  import { onMount } from "svelte";
  import { chunkArray } from "../lib/chunkArray";
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";
  import VideoRow from "../components/VideoRow.svelte";
  import Playlist from "../components/Playlist.svelte";
  // SPINNER
  import { Circle3 } from "svelte-loading-spinners";

  const videos = { arr: [], downloaded: false };
  const api_url = import.meta.env.VITE_API_URL;

  onMount(async () => {
    fetch(`${api_url}/playlists/all`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        let recVid = chunkArray(res.videos, 4);
        videos.arr = recVid.map((arr) => {
          return arr.map((obj) => {
            return obj.videoId;
          });
        });
        videos.downloaded  = true;
        console.log("videos", videos);
      })
      .catch((err) => console.log("Error", err));
  });
  const handleClick = (e) => {
    console.log(e.detail.title)
    const query = e.detail.title === "" ? "/all" : `?pl=${e.detail.title}`;
    fetch(`${api_url}/playlists${query}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        let recVid = chunkArray(res.videos, 3);
        videos.arr = recVid.map((arr) => {
          return arr.map((obj) => {
            return obj.videoId;
          });
        });
        videos.downloaded = true;
        console.log("videos", videos);
      })
      .catch((err) => console.log("Error", err));
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
  {#if !videos.downloaded}
    <div class="flex justify-center pt-40 w-full mb-40">
      <!-- SPINNER -->
      <Circle3 size="100" />
    </div>
  {:else if videos.arr.length !== 0}
    {#each videos.arr as video}
      <VideoRow cardsData={video} page={"library"} />
    {/each}
  {:else}
    <div class="pt-40">
      <h2 class="text-blue-200">No videos in playlists.</h2>
    </div>
  {/if}
</div>
