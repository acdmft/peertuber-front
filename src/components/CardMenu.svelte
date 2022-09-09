<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "../lib/stores";
  // TOASTS
  import { successToast, warningToast } from "../lib/toast-themes";

  export let threeDotsMenu: String;
  export let video_id: String;

  let api_url =  import.meta.env.VITE_API_URL;
  let show: boolean = false; //menu state
  let menu = null; // menu wrapper DOM reference
  // ADD TO WATCH LATER
  const wlClick = () => {
    let data = {videoId: video_id};
    fetch(`${api_url}/sched`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        successToast('Saved to Watch Later!');
      } else {
        warningToast('Video already saved');

      }

      show = false;
      console.log("res.status", res.status);
    }).catch((err) => warningToast(err));
  };

  onMount(() => {
    const handleOutsideClick = (e) => {
      if (show && !menu.contains(e.target)) {
        show = false;
      }
    };
    const handleEscape = (e) => {
      if (show && e.key === "Escape") {
        show = false;
      }
    };
    // add events when element is added to the DOM, useCapture = false
    document.addEventListener("click", handleOutsideClick, false);
    document.addEventListener("keyup", handleEscape, false);
    // remove events when element is removed from the DOM
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
      document.removeEventListener("keyup", handleEscape, false);
    };
  });
</script>

<div bind:this={menu}>
  <button
    class="w-2"
    on:click={() => {
      show = !show;
    }}
  >
    <i
      class="{threeDotsMenu} fa-solid fa-ellipsis-vertical hover:text-gray-900 cursor-pointer p-0.5 hover:outline hover:outline-slate-400 hover:outline-2 "
    />
  </button>
  {#if show}
    <div class="relative">
      <div
        class="absolute bottom-2 z-10 right-0 w-48 py-2 mt-1 bg-gray-800 rounded shadow-md text-left text-sm"
      >
        <a href={"#"} class="block px-4 text-slate-200 py-2 hover:bg-gray-600"
          ><i class="fa-solid fa-share mr-4" />Copy URL</a
        >
        {#if $user}
          <button on:click|once={wlClick} class="block px-4 text-slate-200 py-2 hover:bg-gray-600"
            ><i class="fa-solid fa-clock mr-4" />Add to Watch later</button
          >
          <a href={"#"} class="block px-4 text-slate-200 py-2 hover:bg-gray-600"
            ><i class="fa-solid fa-folder-plus mr-4" />Add to Library</a
          >
          <a href={"#"} class="block px-4 text-slate-200 py-2 hover:bg-gray-600"
            ><i class="fa-solid fa-flag mr-4" />Report</a
          >
        {/if}
      </div>
    </div>
  {/if}
</div>
<!-- TOAST -->
<!-- <div class="">
  <SvelteToast />
</div> -->
<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 0;
    --toastContainerLeft: 0;
  }
</style>