<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "../lib/stores";
  // TOASTS
  import { successToast, warningToast } from "../lib/toast-themes";
  // LIBRARY MENU, REPORT FORM
  import LibraryMenu from "./LibraryMenu.svelte";
  import ReportForm from "./ReportForm.svelte";

  export let video_id: string;
  export let video_url: string;

  let api_url = import.meta.env.VITE_API_URL;
  let show: boolean = false; //menu state
  let menu = null; // menu wrapper DOM reference
  // ADD VIDEO TO WATCH LATER
  const wlClick = () => {
    let data = { videoId: video_id };
    fetch(`${api_url}/sched`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          successToast("Saved to Watch Later!");
        } else {
          warningToast("Video already saved");
        }

        show = false;
      })
      .catch((err) => warningToast(err));
  };
  // LIBRARY MENU STATE 
  let libMenu = false;
  $: showMenu = libMenu;
  // REPORT FORM STATE 
  let reportMenu = false;
  $: repFormEnabled = reportMenu;

  const libClick = () => {
    // close card menu
    show = false;
    libMenu = true;
  };
  const copyUrl = () => {
    navigator.clipboard.writeText(video_url);
    successToast("Link is copied");
    show = false;
  }
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
  <!-- THREEDOTS ICON -->
    <i
      class="fa-solid fa-ellipsis-vertical hover:text-gray-400 cursor-pointer p-0.5 hover:outline hover:outline-slate-400 hover:outline-2 "
    />
  </button>
  {#if show}
    <div class="relative">
      <!----        MENU BUTTONS     ---->
      <div
        class="absolute bottom-2 right-0 w-48 py-2 mt-1 bg-gray-800 rounded shadow-md text-sm"
      >
        <button
          on:click={copyUrl}
          class="block w-full px-4 text-slate-200 py-2 hover:bg-gray-600 text-left"
          ><i class="fa-solid fa-share mr-4" />Copy URL</button
        >
        {#if $user}
          <button
            on:click|once={wlClick}
            class="block w-full px-4 text-slate-200 py-2 hover:bg-gray-600 text-left"
            ><i class="fa-solid fa-clock mr-4" />Add to Watch later</button
          >
          <button
            on:click={libClick}
            class="block w-full px-4 text-slate-200 py-2 hover:bg-gray-600 text-left"
            ><i class="fa-solid fa-folder-plus mr-4" />Add to Library</button
          >
          <button
            on:click={()=>{
              show=false;
reportMenu = true;
            }}
            class="block w-full px-4 text-slate-200 py-2 hover:bg-gray-600 text-left"
            ><i class="fa-solid fa-flag mr-4" />Report</button
          >
        {/if}
      </div>
    </div>
  {/if}
</div>
<!----       LIBRARY MENU      ------>
{#if showMenu}
  <div class="fixed z-20">
    <LibraryMenu {video_id} on:click={()=> {libMenu = false;}}/>
  </div>
{/if}
<!-----      REPORT FORM      ------>
{#if repFormEnabled}
<ReportForm {video_id} on:click={()=>{ reportMenu = false;}} />
{/if}
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
