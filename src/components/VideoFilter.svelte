<script lang="ts">
  import { createEventDispatcher } from "svelte";


  let activeFilter = "all";
  const dispatch = createEventDispatcher();
  // HIGHLIGHT FILTER ITEM
  const highlightFilterItem = (e) => {
    let filterMenu = document.querySelector("nav");
    for (let i = 0; i < filterMenu.childElementCount; i++) {
      filterMenu.children[i].classList.remove("active");
    }
    e.target.classList.add("active");
    activeFilter = e.target.id;
  };
  const handleClick = (e) => {
    highlightFilterItem(e);
    dispatch("selFitler",{
      category: activeFilter,
    });
  }

  
</script>

<div id="categories" class="h-14 grid content-center justify-items-center">
  <nav class="flex justify-around  w-5/6">
     <button on:click={(e)=> handleClick(e)} id="all" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200 active"> All </button>
     <button on:click={(e)=> handleClick(e)} id="science" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200">Science & Technologies </button>
     <button on:click={(e)=> handleClick(e)} id="gaming" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200">Gaming</button>
     <button on:click={(e)=> handleClick(e)} id="education" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200">Education</button>
     <button on:click={(e)=> handleClick(e)} id="politics" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200">News & Politics</button>
     <button on:click={(e)=> handleClick(e)} id="music" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200">Music</button>
     <button on:click={(e)=> handleClick(e)} id="entertainment" class="w-fit h-fit rounded-lg text-neutral-200 my-auto px-2 py-1 outline outline-1 outline-gray-200">Entertainment</button>
  </nav>

</div>

<style>
  nav .active {
    background-color: #F472B6;
  }
  nav button:hover {
    background-color: #3F3F46;   /* zinc 700 */
  }
</style>