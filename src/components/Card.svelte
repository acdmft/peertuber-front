<script lang="ts">
  export let width;
  export let height;
  export let img;
  export let channel_name;
  export let channel_url;
  export let video_title;
  export let video_url;

  let threeDotsMenu = "hidden";
  const toggleMenu = () => {
    threeDotsMenu = threeDotsMenu == "hidden" ? "" : "hidden";
  };
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
      class="text-left relative text-xs text-gray-600 hover:text-gray-800 text-base px-2 truncate text-ellipsis"
    >
      <a
        href={video_url}
        target="_blank"
        on:focus={toggleMenu}
        on:mouseover={toggleMenu}
        on:mouseleave={toggleMenu}
      >
        {video_title}
      </a>
      <!-- TRHEEDOTS MENU ICON -->
      <i
        on:focus={toggleMenu}
        on:mouseover={toggleMenu}
        on:mouseleave={toggleMenu}
        class="{threeDotsMenu} fa-solid fa-ellipsis-vertical hover:text-gray-900 cursor-pointer hover:outline hover:outline-slate-400 hover:outline-2 absolute top-0 right-0 mr-1"
      />
    </div>
  </div>
</div>
