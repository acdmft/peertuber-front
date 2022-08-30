<script lang="ts">
  export let width;
  export let height;
  export let img;
  export let channel_name;
  export let channel_url;
  export let video_title;
  export let video_url;
</script>

<div class="bg-green-300 {width} {height}">
  <!----------    CHANNEL NAME AND URL    ----------->
  <div class="h-12 bg-amber-300 text-left px-2 leading-none flex justify-center">
    <a href={`https://${channel_url}`} class="self-center" target="_blank">{channel_name}</a>
  </div>
  <div class="h-36 z-0 text-slate-600 flex relative text-5xl">
    <i class="fa-solid fa-film mx-auto self-center" />
    <img src={img} alt="" class=" absolute min-w-full top-0 left-0" />
  </div>
  <!-----------    VIDEO DESCRIPTION      ---------->
  <div class="bg-green-300 h-20">
    <div class="text-left text-gray-600 font-semibold text-base px-2 truncate text-ellipsis">
      <a href={video_url} target="_blank">
        {video_title}
      </a>
    </div>
  </div>

</div>