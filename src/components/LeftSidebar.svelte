<script lang="ts">
  let homeIcon = "text-slate-200";
  let clockIcon = "text-slate-200";
  let heartIcon = "text-slate-200";
  let libraryIcon = "text-slate-200";
  let envIcon = "text-slate-200";
  let aboutIcon = "text-slate-200";

  export let page: string;

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
  }
</script>

<div class="h-screen w-16 fixed left-0 top-0 bg-zinc-800">
  <!-- STRIP BLOCK (GAP) -->
  <div class="h-32" />
  <!-- ICONS -->
  <a
    href="/"
    class="block {homeIcon}  hover:bg-zinc-700 hover:cursor-pointer text-2xl h-16"
  >
    <i class="fa-solid fa-house" />
    <div class="text-xs px-1">Home</div>
  </a>
  <a
    href="/watchlater"
    class="block {clockIcon} mb-2 hover:bg-zinc-700 hover:cursor-pointer text-2xl h-16"
  >
    <i class="fa-regular fa-clock" />
    <div class="text-xs px-1">Watch later</div>
  </a>
  <a
    href="/liked"
    class="block {heartIcon} hover:bg-zinc-700 hover:cursor-pointer text-2xl h-16"
  >
    <i class="fa-regular fa-heart" />
    <div class="text-xs ">Favorite</div>
  </a>
  <a
    href="/library"
    class="block {libraryIcon} hover:bg-zinc-700 hover:cursor-pointer text-2xl h-16"
  >
    <i class="fa-regular fa-folder-closed" />
    <div class="text-xs ">Library</div>
  </a>
  <a
    href="/contact"
    class="block {envIcon} hover:bg-zinc-700 hover:cursor-pointer text-2xl h-16"
  >
    <i class="fa-regular fa-envelope" />
    <div class="text-xs ">Contact</div>
  </a>

  <a
    href="/about"
    class="block {aboutIcon} mb-2 hover:bg-zinc-700 hover:cursor-pointer text-2xl h-16"
  >
    <i class="fa-solid fa-info" />
    <div class="text-xs ">About</div>
  </a>
</div>
