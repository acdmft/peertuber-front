<script lang="ts">
  import CardMenu from "./CardMenu.svelte";
  import { createEventDispatcher } from "svelte";
  import { user } from "../lib/stores";
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

  const dispatch = createEventDispatcher();
  // THREE DOTS MENU STATE
  let threeDotsMenu = "hidden";
  // Like icon
  let likeIcon: string = "regular";
  let buttonColor: string = "";
  // LIKE DISPATCHER
  function like() {
    dispatch("like", {
      videoID: video_id,
    });
    likeIcon = "solid";
    buttonColor = "text-slate-600";
    likes = +1;
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

<div class="bg-green-300 {width} {height} rounded-md">
  <!----------    CHANNEL NAME AND URL    ----------->
  <div
    class="h-12 bg-amber-300 text-left px-2 leading-none rounded-t-md flex justify-center font-black overflow-hidden text-ellipsis"
  >
    <a
      href={`https://${channel_url}`}
      class="self-center max-h-full text-gray-600 hover:text-gray-800"
      >{channel_name}</a
    >
  </div>
  <!-------      IMAGE OF VIDEO PREVIEW    ------->
  <div class="h-32 z-0 text-slate-600 flex relative text-5xl">
    <i class="fa-solid fa-film mx-auto self-center" />
    <a href={video_url} target="_blank">
      <img src={img} alt="" class="absolute min-w-full top-0 left-0" />
    </a>
    <span
      class="bg-black w-fit h-fit px-1 rounded-md absolute bottom-1 right-1 text-xs text-green-200"
      >{time}</span
    >
  </div>
  <!-----------    VIDEO DESCRIPTION      ---------->
  <div class="bg-green-300 h-8 pt-1.5">
    <div
      class="flex justify-between text-left relative text-gray-600 hover:text-gray-800 text-base px-2"
      on:focus={() => (threeDotsMenu = "")}
      on:mouseover={() => (threeDotsMenu = "")}
      on:mouseleave={() => (threeDotsMenu = "hidden")}
    >
      <a
        href={video_url}
        target="_blank"
        class="text-xs font-semibold w-11/12 border-2 border-transparent overflow-hidden max-h-9"
      >
        {video_title}
      </a>
      <!-- TRHEEDOTS MENU ICON -->
      <CardMenu {threeDotsMenu} {video_url} {video_id} />
    </div>
  </div>
  <!-- CARD FOOTER -->
  <div class="h-6 text-sm text-slate-400 mt-0.5 pt-1 flex justify-content-start">
    {#if $user && enabled}
     
        <button
          class="hover:text-slate-600 ml-4 {buttonColor}"
          on:click|once={like}
        >
          <i class="fa-{likeIcon} fa-thumbs-up" />
        </button>
        <span class="ml-2 {buttonColor}">{likes}</span>
      {/if}
    
  </div>
</div>
