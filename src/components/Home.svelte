<script lang="ts">
  import VideoRow from "./VideoRow.svelte";
  import Header from "./Header.svelte";
  import LeftSidebar from "./LeftSidebar.svelte";
  // onMount
  import { onMount } from "svelte";

  const api_url = import.meta.env.VITE_API_URL;
  let videos = [];
  let approved = 0;
  let banned = 0;
  function handleAppr() {
    approved += 1;
    console.log(approved);
  }
  function handleBan() {
    banned += 1;
    console.log(banned);
  }

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
      }}`
    };
    const res = await fetch(`${api_url}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(query),
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
<div class="h-20" />
<!-----------       LEFT MENU       ------------>
<LeftSidebar />
<!----------         LEFT SEPARATOR    ------------->
<!-- <div class="h-screen w-16" ></div> -->
<!-----------       VIDEOROWS       ------------->
{#if videos.length !== 0}
  <VideoRow cardsData={videos.slice(0, 4)} on:approve={handleAppr} on:ban={handleBan} />
  <VideoRow cardsData={videos.slice(4, 8)} on:approve={handleAppr} on:ban={handleBan} />
  <VideoRow cardsData={videos.slice(8, 12)} on:approve={handleAppr} on:ban={handleBan} />
{:else}
  <p class="mt-10">loading...</p>
{/if}
