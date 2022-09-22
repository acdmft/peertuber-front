<script lang="ts">
  let activeFilter = "all";
  // HIGHLIGHT FILTER ITEM
  const highlightFilterItem = (e) => {
    let filterMenu = document.querySelector("nav");
    for (let i = 0; i < filterMenu.childElementCount; i++) {
      filterMenu.children[i].classList.remove("active");
    }
    e.target.classList.add("active");
    activeFilter = e.target.id;
    console.log(activeFilter)
  };

  
</script>

<div id="categories" class="h-14 grid content-center justify-items-center">
  <nav class="flex justify-around  w-5/6">
     <button on:click={highlightFilterItem} id="all" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200 active"> All </button>
     <button on:click={highlightFilterItem} id="science" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200">Science & Technologies </button>
     <button on:click={highlightFilterItem} id="gaming" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200">Gaming</button>
     <button on:click={highlightFilterItem} id="education" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200">Education</button>
     <button on:click={highlightFilterItem} id="politics" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200">News & Politics</button>
     <button on:click={highlightFilterItem} id="music" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200">Music</button>
     <button on:click={highlightFilterItem} id="entertainment" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200">Entertainment</button>
  </nav>

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