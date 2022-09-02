<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { user } from "../lib/stores";
  import CardMenu from "./CardMenu.svelte";
  export let width;
  export let height;
  export let img;
  export let channel_name;
  export let channel_url;
  export let video_title;
  export let video_url;

  const dispatch = createEventDispatcher();

  function approve() {
    dispatch('approve', {
      approved: true
    });
  }

  function ban() {
    dispatch('ban', {
      approved: false
    })
  }


  // THREE DOTS MENU
  let threeDotsMenu = "hidden";
</script>

<div class="bg-green-300 {width} {height}">
  <!----------    CHANNEL NAME AND URL    ----------->
  <div
    class="h-12 bg-amber-300 text-left px-2 leading-none flex justify-center font-black overflow-hidden text-ellipsis"
  >
    <a
      href={`https://${channel_url}`}
      class="self-center max-h-full text-gray-600 hover:text-gray-800"
      target="_blank">{channel_name}</a
    >
  </div>
  <div class="h-36 z-0 text-slate-600 flex relative text-5xl">
    <i class="fa-solid fa-film mx-auto self-center" />
    <img src={img} alt="" class="absolute min-w-full top-0 left-0" />
  </div>
  <!-----------    VIDEO DESCRIPTION      ---------->
  <div class="bg-green-300 h-14">
    <div
      class="flex justify-between text-left relative text-gray-600 hover:text-gray-800 text-base px-2  "
      on:focus={() => (threeDotsMenu = "")}
      on:mouseover={() => (threeDotsMenu = "")}
      on:mouseleave={() => (threeDotsMenu = "hidden")}
    >
      <a
        href={video_url}
        target="_blank"
        class="text-xs font-semibold w-11/12 border-2 border-transparent overflow-hidden  max-h-9"
      >
        {video_title}
      </a>
      <!-- TRHEEDOTS MENU ICON -->
      <CardMenu {threeDotsMenu} />
    </div>
    <!-- CARD FOOTER (MODERATOR'S TOOLS)-->
    {#if $user.isAdmin || $user.isModerator}
      <div class="text-sm text-slate-400 bottom-0 left-0">
        <button on:click={approve} class="hover:text-slate-600">
          <i class="fa-solid fa-circle-check mr-2" />
        </button>
        <button on:click={ban} class="hover:text-slate-600">
          <i class="fa-solid fa-ban" />
        </button>
      </div>
    {/if}
  </div>
</div>
