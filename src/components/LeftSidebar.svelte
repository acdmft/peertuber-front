<script lang="ts">
  import { user } from "../lib/stores";

  let homeIcon = "text-slate-200";
  let clockIcon = "text-slate-200";
  let heartIcon = "text-slate-200";
  let libraryIcon = "text-slate-200";
  let envIcon = "text-slate-200";
  let aboutIcon = "text-slate-200";

  let width;

  export let page: string;
  // highlight the icon depending on the current page
  switch (page) {
    case "about":
      aboutIcon = "text-yellow-200";
      break;
    case "contact":
      envIcon = "text-yellow-200";
      break;
    case "home":
      homeIcon = "text-yellow-200";
      break;
    case "library":
      libraryIcon = "text-yellow-200";
      break;
    case "liked":
      heartIcon = "text-yellow-200";
      break;
    case "watchlater":
      clockIcon = "text-yellow-200";
      break;
    default:
      break;
  }
</script>

<div class="hidden md:block h-screen w-14 lg:w-16 fixed left-0 top-0 bg-zinc-800">
  <!-- STRIP BLOCK (GAP) -->
  <div class="h-32" />
  <!-- ICONS -->
  <div
    class="text-xs px-1 mb-1 leading-none hover:bg-zinc-700 hover:cursor-pointer"
  >
    <a href="/" class="block {homeIcon} text-xl ">
      <i class="fa-solid fa-house" />
      <span class="text-xs ">Home</span>
    </a>
  </div>

  {#if $user}
    <div
      class="text-xs px-1 py-1 leading-none hover:bg-zinc-700 hover:cursor-pointer"
    >
      <a href="/watchlater" class="block leading-none {clockIcon} text-xl h-16">
        <i class="fa-regular fa-clock" />
        <span class="text-xs ">Watch later</span>
      </a>
    </div>
    <div
      class="text-xs px-1 mb-1 py-2 leading-none hover:bg-zinc-700 hover:cursor-pointer h-14"
    >
      <a href="/liked" class="block leading-none {heartIcon} text-xl ">
        <i class="fa-regular fa-heart" /><br>
        <span class="text-xs ">Liked</span>
      </a>
    </div>
    <div
      class="text-xs px-1 mb-1 py-2 leading-none hover:bg-zinc-700 hover:cursor-pointer h-14"
    >
      <a href="/library" class="block leading-none {libraryIcon} text-xl ">
        <i class="fa-regular fa-folder-closed" />
        <span class="text-xs ">Library</span>
      </a>
    </div>
  {/if}
  <div
    class="text-xs px-1 py-2 leading-none hover:bg-zinc-700 hover:cursor-pointer h-16"
  >
    <a href="/contact" class="block leading-none {envIcon} text-xl">
      <i class="fa-regular fa-envelope" />
      <span class="text-xs ">Contact</span>
    </a>
  </div>
  <div
    class="text-xs px-1 mb-1 py-2 leading-none hover:bg-zinc-700 hover:cursor-pointer h-16"
  >
    <a href="/about" class="block leading-none {aboutIcon} text-xl">
      <i class="fa-solid fa-info" /><br>
      <span class="text-xs ">About</span>
    </a>
  </div>
</div>
