<script lang="ts">
  // COMPONENTS
  import VideoRow from "../components/VideoRow.svelte";
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";
  // UTILITY FUNCTIONS FROM LIB
  import { chunkArray } from "../lib/chunkArray";
   // onMount
   import { onMount } from "svelte";
  // SPINNER (github.com/Schum123/svelte-loading-spinners)
  import {Circle3} from 'svelte-loading-spinners';

  const api_url = import.meta.env.VITE_API_URL;

  const videos = {arr: [], downloaded: false};
  onMount(async () => {
    fetch(`${api_url}/sched`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        let recVid = chunkArray(res, 4);
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
</script>

<h1>Watch Later</h1>
<!---------       TOP MENU            ----------->
<Header />
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20" />
<!-----------       LEFT MENU       ------------>
<LeftSidebar page={"watchlater"}/>
<!-----------      CONTENT CONTAINER     ------------>
<div class="min-h-screen " >
  <!-----------       VIDEOROWS       ------------->
  {#if !videos.downloaded}
  <div class="flex justify-center pt-40 w-full mb-40">
    <Circle3 size="100"></Circle3>
  </div>
  {:else if videos.arr.length !== 0}
  {#each videos.arr as video}
    <VideoRow cardsData={video} page={"watchlater"} />
  {/each}
  {:else}
    <div class="pt-40">
      <h2 class="text-blue-200">No liked videos yet.</h2>
    </div>
  {/if}

</div>