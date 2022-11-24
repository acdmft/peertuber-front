<script lang="ts">
  import { onMount } from "svelte";
  // TOASTS
  import { successToast, warningToast } from "../lib/toast-themes";
  // EXPORTS
  export let video_id;
  // INPUT VALUE
  let libTitle: string = "";
  $: libLength = libTitle.length;
  // MENU STATE
  let menuEnabled = false;
  $: showMenu = menuEnabled;
  
  let playlists = { arr: [], recieved: false };
  // INPUT NEW PL STATE
  let inputEnabled: boolean = false;
  $: showInput = inputEnabled;

  // ADD VIDEO TO PLAYLIST (CREATE NEW PL)
  const api_url = import.meta.env.VITE_API_URL;
  const addToLib = (playlist) => {
    let data = {title: playlist, videoId: video_id};
    fetch(`${api_url}/playlists`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((res) =>{
      if (res.ok) {
          successToast("Video added!");
          menuEnabled = false;
        } else {
         warningToast("Oops! Something went wrong");
         menuEnabled = false;
        }
    })
    .catch((err) => {
      warningToast('Something went wrong!');
      menuEnabled = false;
    });
    libTitle = "";
  };

  const getPlaylists = async () => {
    let result = await fetch(`${api_url}/playlists`, {
      credentials: "include",
    });
    if (!result.ok) {
      playlists.recieved = false;
      menuEnabled = false;
      warningToast("Oops! Something went wrong!");
      return;
    }
    let res = await result.json()
    playlists.arr = res;
    playlists.recieved = true;
  }
  onMount(() => {
    menuEnabled = true;
    getPlaylists();    
  });
</script>

{#if showMenu}

<div
  class="menu_wrapper flex justify-center h-screen w-full fixed top-0 left-10 z-20"
>
  <div class="flex items-center">
    <!-------         MENU         ------>
    <div
      class="w-56 h-3/5 bg-gray-900 rounded-md text-slate-400 divide-y divide-slate-600"
    >
      <!-------     MENU HEADER     ----->
      <div>
        <h3 class="inline-block py-3 pl-4">Save to playlist:</h3>
        <!-----    CLOSE MENU ICON   ------>
        <button
          on:click
          class="float-right mr-2 mt-1 hover:text-slate-200 text-sm"
        >
          <i class="fa-solid fa-xmark" />
        </button>
      </div>

      <!----         MENU BODY     ------->
      <div class="flex justify-center h-4/6 overflow-scroll z-10">
        {#if !playlists.recieved}
          <h3 class="self-center">loading ...</h3>
        {:else if playlists.arr.length === 0}
          <h3 class="self-center">No playlists yet</h3>
        {:else}
          <ul class="my-1 w-full text-center">
            {#each playlists.arr as playlist}
              <li
                
              >
              <button on:click|once = {()=>{addToLib(playlist.title)}}
                class="block w-full font-medium hover:bg-slate-200 my-1 hover:cursor-pointer">

                {playlist.title}
              </button>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
      <!----        MENU FOOTER      ------->
      <div class="flex flex-col">
        {#if showInput}
          <div class="flex flex-col pt-2 ">
            <!-- NEW LIBRARY INPUT -->
            <input
              class="w-full mx-auto pl-2 text-neutral-200 bg-slate-800 rounded-md w-3/4"
              type="text"
              bind:value={libTitle}
              maxlength="32"
              placeholder="playlist title"
            />
            <p class="text-xs text-right w-3/4 mx-auto mb-1">
              {libLength}/32
            </p>
          </div>
          <button
            on:click={()=>{addToLib(libTitle)}}
            class="text-green-600 hover:text-green-400 font-semibold"
            >Add playlist</button
          >
        {:else}
          <button
            on:click={() => {
              inputEnabled = true;
            }}
            class="hover:text-slate-200 mt-4 border-2 border-solid border-blue-400"
          >
            <i class="fa-solid fa-plus mt-1 mr-2" />
            <h3 class="inline-block hover:cursor-pointer">
              Create new playlist
            </h3>
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>
{/if}

<!-- </div> -->
<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 0;
    --toastContainerLeft: 0;
  }
  .menu_wrapper {
    background-color: rgba(24, 24, 27, 0.75);
  }
</style>
