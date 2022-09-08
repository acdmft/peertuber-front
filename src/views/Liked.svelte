<script lang="ts">
  // COMPONENTS
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";
  import VideoRow from "../components/VideoRow.svelte";
  // UTILITY FUNCTIONS FROM LIB
  import { chunkArray } from "../lib/chunkArray";
  // SPINNER (github.com/Schum123/svelte-loading-spinners)
  import {Circle3} from 'svelte-loading-spinners';

  // onMount
  import { onMount } from "svelte";

  const api_url = import.meta.env.VITE_API_URL;

  let videos = [];
  // $: recVideos = chunkArray(videos, 4);

  onMount(async () => {
    fetch(`${api_url}/like`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        videos = chunkArray(res, 4);
        videos = videos.map((i) => {
          return i.map((el) => {
            return el.videoId;
          });
        });
        console.log("videos", videos);
      })
      .catch((err) => console.log("Error", err));
  });
</script>

<h1>Liked</h1>
<!---------       TOP MENU            ----------->
<Header />
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20" />
<!-----------       LEFT MENU       ------------>
<LeftSidebar page={"liked"} />
<!------       CONTENT CONTAINER     ------------>
<div class="min-h-screen " >
  <!-----------       VIDEOROWS       ------------->
  {#if videos.length !== 0}
    {#each videos as video}
      <VideoRow cardsData={video} page={"liked"} />
    {/each}
  {:else}
    <div class="flex justify-center pt-40 w-full mb-40">
      <Circle3 size="100"></Circle3>
    </div>

  {/if}

</div>
