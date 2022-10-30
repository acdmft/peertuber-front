<script lang="ts">
  import page from "page";
  // COMPONENTS
  import VideoRow from "../components/VideoRow.svelte";
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";
  // UTILITY FUNCTIONS FROM LIB
  import { warningToast } from "../lib/toast-themes";
  import { user } from "../lib/stores";
  import { incrLikes } from "../lib/videos";
  import { chunkArray } from "../lib/chunkArray";
  import { getRowCardsNum } from "../lib/cardsRow";
  // onMount
  import { onMount } from "svelte";
  // SPINNER (github.com/Schum123/svelte-loading-spinners)
  import { Circle3 } from "svelte-loading-spinners";
  const cardNum = getRowCardsNum();
  const api_url = import.meta.env.VITE_API_URL;
  // VIDEOS ARRAY
  const videos = { arr: [], downloaded: false };
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
  // ONMOUNT
  onMount(async () => {
    let result = await fetch(`${api_url}/sched`, {
      credentials: "include",
    });
    if (result.status === 401) {
      $user = false;
      warningToast("You need to be logged in!");
      page.redirect("/");
      return;
    }
    let res = await result.json();
    let recVid = chunkArray(res, cardNum);
    videos.arr = recVid.map((arr) => {
      return arr.map((obj) => {
        return obj.videoId;
      });
    });
    videos.downloaded = true;
  });
</script>

<!---------       TOP MENU            ----------->
<Header />
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20" />
<!-----------       LEFT MENU       ------------>
<LeftSidebar page={"watchlater"} />
<!-----------      CONTENT CONTAINER     ------------>
<div class="min-h-screen ">
  <!-----------       VIDEOROWS       ------------->
  {#if !videos.downloaded}
    <div class="flex justify-center pt-40 w-full mb-40">
      <Circle3 size="100" />
    </div>
  {:else if videos.arr.length !== 0}
    {#each videos.arr as video}
      <VideoRow
        cardsData={video}
        {cardNum}
        stripCards={cardNum - video.length}
        page={"watchlater"}
        on:like={handleLike}
      />
    {/each}
  {:else}
    <div class="pt-40">
      <h2 class="text-blue-200">No scheduled videos yet.</h2>
    </div>
  {/if}
</div>
