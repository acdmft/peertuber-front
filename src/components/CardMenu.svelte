<script lang="ts">
  import { onMount } from "svelte";

  export let threeDotsMenu: String; 
  let show: boolean = false;//menu state
  let menu = null; // menu wrapper DOM reference

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
          ><i class="fa-solid fa-share mr-4 " />Copy URL</a
        >
        <a href={"#"} class="block px-4 text-slate-200 py-2 hover:bg-gray-600"
          ><i class="fa-solid fa-clock mr-4 " />Add to Watch later</a
        >
        <a href={"#"} class="block px-4 text-slate-200 py-2 hover:bg-gray-600"
          ><i class="fa-solid fa-folder-plus mr-4 " />Add to Library</a
        >
        <a href={"#"} class="block px-4 text-slate-200 py-2 hover:bg-gray-600"
          ><i class="fa-solid fa-flag mr-4 " />Report</a
        >
      </div>
    </div>
  {/if}
</div>
