<script lang="ts">
  let playlists = ["item 2", "item 2", "item 2", "item 2", 
  "item 51", "item 14", "item 1", "item 1", "item 11", 
  "item 14", "item 31", "item 112", ];
  let menuInput = false;
</script>

<!-- <div class="relative"> -->
<div
  class="menu_wrapper flex justify-center h-screen w-full fixed top-0 left-10 z-10"
>
  <div class="flex items-center">
    <!-------         MENU         ------>
    <div
      class="w-56 h-1/2 bg-gray-900 rounded-md text-slate-400 divide-y divide-slate-600"
    >
      <!-------     MENU HEADER     ----->
      <div >
        <h3 class="inline-block py-3 pl-4">Save to playlist:</h3>
        <!-----    CLOSE MENU ICON   ------>
        <button
          on:click
          class="float-right mr-2 mt-1 hover:text-slate-200 text-sm"
        >
          <i class="fa-solid fa-xmark" />
        </button>
      </div>
      <!----         MENU BODY     ------->
      <div class="flex justify-center h-3/4 overflow-scroll">
        {#if playlists.length !== 0}
        <ul class="my-2 w-full text-center">
          {#each playlists as playlist}
            <li class="font-medium hover:bg-slate-200 my-1 hover:cursor-pointer">{playlist}</li>
          {/each}        
        </ul>
        {:else}
        <h3 class="self-center">No playlists yet</h3>
        {/if}
      </div>
      <!----        MENU FOOTER      ------->
      <div class="flex justify-center pt-1">
        {#if menuInput}
        <div class="w-4/5">
          <input class="w-full bg-slate-600 rounded-md" type='text' placeholder="playlist title">
        </div>
        {:else}
        <button on:click={()=> {menuInput = true;}} class="hover:text-slate-200">
          <i class="fa-solid fa-plus mt-1 mr-2"></i>
          <h3 class="inline-block">Create new playlist</h3>
        </button>
        {/if}
      </div>

      
    </div>
  </div>
</div>

<!-- </div> -->
<style>
  .menu_wrapper {
    background-color: rgba(24, 24, 27, 0.75);
  }
</style>
