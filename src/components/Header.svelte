<script lang="ts">
  import AccountMenu from "./AccountMenu.svelte";
  
</script>

<div
  id="container"
  class="fixed top-0 left-0 right-0 bg-zinc-800 divide-gray-500 divide-y h-24 mx-0 my-0"
>
  <div id="top-menu" class="h-12 grid grid-cols-3 gap-4">
    <div></div>
    <h1 class="justify-self-center text-neutral-200 font-semibold text-2xl mt-1">Peertuber</h1>
    <div class="justify-self-end mt-2">
      <AccountMenu user={null} />
    </div>
    
  </div> 
  <div id="categories" class="h-12" />
</div>