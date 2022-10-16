<script lang="ts">
  import { createEventDispatcher } from "svelte";
  let catFilters = [
    "all",
    "Science & Technology",
    "Gaming",
    "Education",
    "News & Politics",
    "Music",
    "Entertainment",
  ];

  let activeFilter = "all";
  const dispatch = createEventDispatcher();
  // HIGHLIGHT FILTER ITEM
  const highlightFilterItem = (e) => {
    activeFilter = e.target.id;
  };
  const handleClick = (e) => {
    highlightFilterItem(e);
    dispatch("selFitler", {
      category: activeFilter,
    });
  };
</script>

<div id="categories" class="h-fit grid content-center justify-items-center">
  <nav class="my-2 overflow-scroll lg:w-5/6">
    <ul class="flex max-h-14 py-2  flex-nowrap justify-center">
      {#each catFilters as catFilter}
        <li
          on:click={(e) => handleClick(e)}
          id={catFilter}
          class:active={catFilter === activeFilter}
          class="lg:ml-4 ml-1.5 sm:my-1 w-max text-xs md:text-base hover:cursor-pointer hover:text-neutral-400 rounded-lg text-neutral-200 my-auto md:px-2 px-1 md:py-1 py-0.5 outline outline-1 outline-gray-200 "
        >
          {catFilter}
        </li>
      {/each}
    </ul>
  </nav>
</div>

<style>
  nav .active {
    background-color: #f472b6;
  }
</style>
