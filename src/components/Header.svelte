<script lang="ts">
  import AccountMenu from "./AccountMenu.svelte";
  import VideoFilter from "./VideoFilter.svelte";
</script>

<div
  id="container"
  class="fixed z-10 top-0 left-0 right-0 bg-zinc-800 divide-gray-500 divide-y mx-0 my-0"
>
  <!------      TOP PART OF HEADER     ------->
  <div id="top-menu" class="h-14 grid grid-cols-3 gap-4">
    <div></div>
    <!-----        LOGO      ---->
    <h1 class="text-neutral-200 font-semibold text-2xl mt-3">Peertuber</h1>
    <div class="justify-self-end mt-3">
      <AccountMenu />
    </div>
  </div> 
  <!-------     BOTTOM PART OF HEADER (CATEGORIES)    -------->
  <VideoFilter on:selFitler />
</div>

