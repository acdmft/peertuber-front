<script lang="ts">
  export let width;
  export let height;
  export let img;
  export let channel_name;
  export let channel_url;
  export let video_title;
  export let video_url;

  // THREE DOTS MENU
  let threeDotsMenu = "hidden";
  let show: boolean = false; // menu state
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

      <button
        class="w-2"
        on:click={() => {
          show = !show;
          console.log("tdm click");
        }}
      >
        <i
          class="{threeDotsMenu} fa-solid fa-ellipsis-vertical hover:text-gray-900 cursor-pointer p-0.5 hover:outline hover:outline-slate-400 hover:outline-2 "
        />
      </button>
    </div>
    <div class="relative">
      {#if show}
        <div
          class="absolute bottom-2 z-10 right-0 w-48 py-2 mt-1 bg-gray-800 rounded shadow-md text-left"
        >
          <a href={"#"} class="block px-4 text-slate-200 py-2 hover:bg-gray-600"
            ><i class="fa-solid fa-share mr-2" />Copy URL</a
          >
          <a href={"#"} class="block px-4 text-slate-200 py-2 hover:bg-gray-600"
            ><i class="fa-solid fa-clock mr-2" />Add to Watch later</a
          >
          <a href={"#"} class="block px-4 text-slate-200 py-2 hover:bg-gray-600"
            ><i class="fa-solid fa-folder-plus mr-2" />Add to Library</a
          >
          <a href={"#"} class="block px-4 text-slate-200 py-2 hover:bg-gray-600"
            ><i class="fa-solid fa-flag mr-2" />Report</a
          >
        </div>
      {/if}
    </div>
  </div>
</div>
