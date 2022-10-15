<script lang="ts">
  import AccountMenu from "./AccountMenu.svelte";
  import VideoFilter from "./VideoFilter.svelte";
</script>

<div
  id="container"
  class="fixed z-30 top-0 left-0 right-0 bg-zinc-800 divide-gray-500 divide-y mx-0 my-0"
>
  <!------      TOP PART OF HEADER     ------->
  <div id="top-menu" class="h-14 px-2 md:px-8 grid grid-cols-3 gap-4">
    <div></div>
    <!-----          LOGO      ---->
    <h1 class="text-neutral-200 font-semibold text-lg md:text-2xl mt-3"><a href="/">Peertuber</a></h1>
    <!-----     ACCOUNT MENU    ------>
    <div class="justify-self-end mt-3">
      <AccountMenu />
    </div>
  </div> 
  <!-------     BOTTOM PART OF HEADER (CATEGORIES)    -------->
  <VideoFilter on:selFitler />
</div>

