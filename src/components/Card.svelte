<script lang="ts">
  import CardMenu from "./CardMenu.svelte";
  import { createEventDispatcher } from "svelte";
  // EXPORTS
  export let width;
  export let height;
  export let img;
  export let channel_name;
  export let channel_url;
  export let video_title;
  export let video_url;
  export let video_id;
  export let likes;
  export let duration;
  // property to display Card footer depending on the current page
  export let enabled: boolean;
  // LIB functions
  import { user } from '../lib/stores';
  const dispatch = createEventDispatcher();
  // Like icon
  let likeIcon: string = "regular";
  let buttonColor: string = "";
  // LIKE DISPATCHER
  function like() {
    if ($user){
      dispatch("like", {
        videoID: video_id,
      });
      likeIcon = "solid";
      buttonColor = "text-slate-400";
    }
  }

  const videoDuration = (duration) => {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration - hours * 3600) / 60);
    let seconds = Math.floor((duration - hours * 60) % 60);
    let time =
      hours !== 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    return time;
  };
  $: time = videoDuration(duration);
</script>

<div class="flex flex-col {width} mx-1.5">
  <!-- CARD IMAGE -->
  <div
    class="relative grow text-5xl overflow-hidden  {width} {height} border border-slate-400 border-b-0 flex flex-row rounded-t-md"
  >
    <!-- VIDEO ICON -->
    <p class="text-center pt-10 absolute h-full w-full text-slate-400">
      <i class="fa-solid fa-film" />
    </p>
    <a href={video_url} target="_blank" rel="noreferrer" class="h-full w-full flex items-stretch">
      <img src={img} class="image-descr w-full overflow-hidden absolute top-0 left-0 text-purple-700 font-bold leading-18 text-4xl self-end" alt="{video_title}" />
    </a>
    <!-----           TIMER       ------>
    <span
      class="bg-black w-fit h-fit px-1 rounded-md absolute bottom-2 sm:bottom-1 right-1 text-xs text-slate-200"
      >{time}</span
    >
  </div>
  <!-----          VIDEO TITLE   ------->
  <div
    class="h-1/5 relative px-1 pt-0.5 border border-slate-400 border-y-0 text-left text-xs sm:text-sm text-ellipsis"
  >
    <h2
      class="w-11/12 max-h-full overflow-hidden sm:font-normal font-semibold text-slate-400 hover:text-slate-300"
    >
      <a href={video_url} class="block" target="_blank" rel="noreferrer">{video_title}</a>
    </h2>
    <!-- TRHEEDOTS MENU ICON -->
    <div
      class="absolute top-2 right-0 text-neutral-200 pr-0.5"
    >
      <CardMenu {video_url} {video_id} />
    </div>
  </div>
  <!-- INSTANCE URL -->
  <div
    class="h-1/12 px-1 py-0.5 border border-slate-400 border-y-0 text-left text-xs"
  >
    <h2 class="truncate text-slate-500 hover:text-slate-400">
      <a href={`https://${channel_url}`} class="block" target="_blank" rel="noreferrer">{channel_name} </a>
    </h2>
  </div>

  <!-- CARD FOOTER -->
  <div
    class="h-6 pb-1 border border-slate-400 border-t-0 rounded-b-md justify-self-end text-sm text-slate-500 flex justify-content-start"
    id="p{video_id}" 
  >
    {#if enabled}
      <button
        class="{$user === true ? 'hover:text-slate-400' : 'cursor-default'} {buttonColor} ml-2"
        on:click|once={like}
      >
        <i class="fa-{likeIcon} fa-thumbs-up" />
      </button>
      <span class="ml-2 cursor-default">{likes}</span>
    {/if}
  </div>
</div>

<style>
  .image-descr {
    height: 100%;
    background: rgb(231,194,232);
background: linear-gradient(40deg, rgba(231,194,232,1) 0%, rgba(229,214,240,1) 39%, rgba(155,238,255,1) 78%); 
  }
</style>