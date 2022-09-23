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

<div id="categories" class="h-14 grid content-center justify-items-center">
  <nav class="flex justify-around  w-5/6">
    <ul>
      {#each catFilters as catFilter}
        <li
          on:click={(e) => handleClick(e)}
          id={catFilter}
          class:active={catFilter === activeFilter}
          class="float-left ml-4 hover:cursor-pointer hover:text-neutral-400 w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200 "
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
