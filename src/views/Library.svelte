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
    videos.arr = chunkArray(result.data.videos, 3);
    videos.downloaded = true;
  });
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
  <Playlist />
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
      <h2 class="text-blue-200">No liked videos yet.</h2>
    </div>
  {/if}
</div>
