<script lang="ts">
  import AccountMenu from "./AccountMenu.svelte";
  
</script>

<div
  id="container"
  class="fixed top-0 left-0 right-0 bg-zinc-800 divide-gray-500 divide-y mx-0 my-0"
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
  <div id="categories" class=" h-14 grid content-center justify-items-center">
    <nav class="grid grid-cols-5  gap-8">
       <a href={"#"} class="inline-block rounded-xl active text-neutral-200 px-2 py-1"> All </a>
       <a href={"#"} class="inline-block rounded-xl text-neutral-200 px-2 py-1 outline outline-1 outline-gray-200"> Music </a>
       <a href={"#"} class="inline-block rounded-xl text-neutral-200 px-2 py-1 outline outline-1 outline-gray-200"> Science </a>
       <a href={"#"} class="inline-block rounded-xl text-neutral-200 px-2 py-1 outline outline-1 outline-gray-200"> History </a>
       <a href={"#"} class="inline-block rounded-xl text-neutral-200 px-2 py-1 outline outline-1 outline-gray-200"> Films </a>

    </nav>

  </div>
</div>

<style>
  nav .active {
    background-color: #F472B6;
  }
  nav a {
    background-color: #3F3F46; /* zinc 700 */
  }
  nav a:hover {
    background-color: #71717A; /* zinc 500 */
  }
</style>