<script lang="ts">
  import AccountMenu from "./AccountMenu.svelte";
  
</script>

<div
  id="container"
  class="fixed top-0 left-0 right-0 bg-zinc-800 divide-gray-500 divide-y h-24 mx-0 my-0"
>
  <div id="top-menu" class="h-12 flex justify-between">
    <h1>Peertuber</h1>
    <AccountMenu user={null} />
    
  </div>
  <div id="categories" class="h-12" />
</div>