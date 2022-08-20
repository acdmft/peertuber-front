<script lang="ts">
  import VideoRow from "./VideoRow.svelte";
  import Header from "./Header.svelte";
  import LeftSidebar from "./LeftSidebar.svelte";
  // onMount
  import { onMount } from 'svelte';

  const api_url = import.meta.env.VITE_API_URL;
  let videos = [];
  // $: loadedVideos = videos.length;
  
  onMount(async () => {
    const query = { "query": `{ videos { instance name url thumbnailImg }}`};
    const res = await fetch(`${api_url}/data`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(query)
    });
    const result = await res.json();
    console.log(result.data.videos);
    // videos.push(result.data.videos);
    videos = result.data.videos;

  });


</script>

<!---------       TOP MENU            ----------->
<Header />
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20"></div>
<!-----------       LEFT MENU       ------------>
<LeftSidebar />
<!----------         LEFT SEPARATOR    ------------->
<!-- <div class="h-screen w-16" ></div> -->
<!-----------       VIDEOROWS       ------------->
{#if videos.length !== 0}
  <VideoRow cardsData={ videos.slice(0,4) } />
  <VideoRow cardsData={ videos.slice(4,8) } />
  <VideoRow cardsData={ videos.slice(8,12) } />
{:else}
  <p class="mt-10">

    loading...
  </p>
{/if}

