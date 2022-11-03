<script lang="ts">
  import { user } from "../lib/stores";
  export let page: string;
</script>

<div class="hidden md:block h-screen w-14 lg:w-16 fixed left-0 top-0 text-slate-200 bg-zinc-800">
  <!-- STRIP BLOCK (GAP) -->
  <div class="h-32"></div>
  <!-- ICONS -->
  <div
    class="text-xs px-1 mb-1 leading-none hover:bg-zinc-700 hover:cursor-pointer"
  >
    <a href="/" class:active={page === "home"} class="block text-xl ">
      <i class="fa-solid fa-house" />
      <span class="text-xs ">Home</span>
    </a>
  </div>

  {#if $user}
    <div
      class="text-xs px-1 py-1 leading-none hover:bg-zinc-700 hover:cursor-pointer"
    >
      <a href="/watchlater" class:active={page === "watchlater"} class="block leading-none text-xl h-16">
        <i class="fa-regular fa-clock" />
        <span class="text-xs ">Watch later</span>
      </a>
    </div>
    <div
      class="text-xs px-1 mb-1 py-2 leading-none hover:bg-zinc-700 hover:cursor-pointer h-14"
    >
      <a href="/liked" class:active={page === "liked"} class="block leading-none text-xl ">
        <i class="fa-regular fa-heart" /><br>
        <span class="text-xs ">Liked</span>
      </a>
    </div>
    <div
      class="text-xs px-1 mb-1 py-2 leading-none hover:bg-zinc-700 hover:cursor-pointer h-14"
    >
      <a href="/library" class:active={page === "library"} class="block leading-none text-xl ">
        <i class="fa-regular fa-folder-closed" />
        <span class="text-xs ">Library</span>
      </a>
    </div>
  {/if}
  <div
    class="text-xs px-1 py-2 leading-none hover:bg-zinc-700 hover:cursor-pointer h-16"
  >
    <a href="/contact" class:active={page === "contact"} class="block leading-none text-xl">
      <i class="fa-regular fa-envelope" />
      <span class="text-xs ">Contact</span>
    </a>
  </div>
  <div
    class="text-xs px-1 mb-1 py-2 leading-none hover:bg-zinc-700 hover:cursor-pointer h-16"
  >
    <a href="/about" class:active={page === "about"} class="block leading-none text-xl">
      <i class="fa-solid fa-info" /><br>
      <span class="text-xs ">About</span>
    </a>
  </div>
</div>

<style>
  .active {
    color: rgb(254 240 138 / 1);
  }
</style>