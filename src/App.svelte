<script lang="ts">
  import router from "page";
  // PAGES
  import Home from "./views/Home.svelte";
  import About from "./views/About.svelte";
  import Library from "./views/Library.svelte";
  import Liked from "./views/Liked.svelte";
  import WatchLater from "./views/WatchLater.svelte";

  let page;
  // ROUTES
  router("/", () => (page = Home));
  router("/about", () => (page = About));
  router("/library", () => (page = Library));
  router("/liked", () => (page = Liked));
  router("/watchlater", () => (page = WatchLater));

  router.start();
</script>

<main class="text-center p-4 mx-0" >
  <svelte:component this={page} />
</main>

<style>
  main {
    background-color: #181818;
    position: relative;
  }
</style>
