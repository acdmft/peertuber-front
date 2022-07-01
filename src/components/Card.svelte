<script lang="ts">
  export let width;
  export let height;
  export let img;
  export let channel_name;
  export let channel_url;
  export let video_title;
  export let video_url;
</script>

<div class="bg-slate-500 {width} {height}">
  <!----------    CHANNEL NAME AND URL    ----------->
  <div class="h-10 bg-amber-300 text-left px-2 leading-none">
    <span class="text-sm text-gray-500 font-semibold ">{channel_name}</span>
    <span class="text-xs text-gray-500 font-semibold ">{channel_url}</span>
  </div>
  <img src={img} alt="video preview" class="w-full" />
  <!-----------    VIDEO DESCRIPTION      ---------->
  <div class="bg-green-300 h-20">
    <div class="text-left text-gray-600 font-semibold text-base px-2">
      <a href={video_url}>
        {video_title}
      </a>
    </div>
  </div>

</div>