<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  // TOASTS
  import { warningToast } from "../lib/toast-themes";

  
  // HIGHLIGHT MENU ITEM
  const highlightMenuItem = (e) => {
    let ul = document.querySelector("ul.playlist");
    for (let i = 0; i < ul.childElementCount; i++) {
      ul.children[i].classList.remove("underline");
    }
    e.target.classList.add("underline");
  };
  // GET PLAYLIST VIDEOS
  const plClick = (e, title) => {
    highlightMenuItem(e)
    dispatch('plClick', {
      title: title
    })
  } 

  const api_url = import.meta.env.VITE_API_URL;
  let playlists = { arr: [], recieved: false };
  
  onMount(async () => {
    let result = await fetch(`${api_url}/playlists`, {
      credentials: "include",
    });
    if (!result.ok) {
      warningToast("Something went wrong during retrieving playlists.")
      playlists.recieved = true;
      return;
    }
    let res = await result.json();
    playlists.arr = res;
    playlists.recieved = true;
  });
</script>

<div
  class="flex flex-col border border-solid border-blue-200 w-11/12 sm:w-1/5 h-[70%] rounded-md sm:fixed top-30 sm:right-6"
>
  <p class="text-xl text-neutral-200 font-semibold">Playlists</p>
  {#if !playlists.recieved}
    <p class="text-neutral-200 mt-2">Loading ...</p>
  {:else if playlists.arr.length === 0}
    <p class="text-neutral-200 font-semibold">No playlists yet</p>
  {:else}
    <ul
      class="text-neutral-200 font-semibold text-left ml-2 h-3/4 my-auto playlist"
    >
      <!-- FIRST ITEM ("ALL") -->
      <li
        on:click={(e) => plClick(e, "")}
        class="underline hover:underline decoration-2 decoration-red-400 hover:cursor-pointer"
      >
        all
      </li>
      {#each playlists.arr as pl}
        <li
          on:click={(e)=> plClick(e, pl.title)}
          class="hover:underline decoration-2 decoration-red-400 hover:cursor-pointer"
        >
          {pl.title} <span class="ml-4">{pl.num}</span>
        </li>
      {/each}
    </ul>
  {/if}
</div>
