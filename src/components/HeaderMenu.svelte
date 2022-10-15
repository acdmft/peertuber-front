<script lang="ts">
  import { onMount } from "svelte";
  import {user} from "../lib/stores";
  import {fly} from 'svelte/transition';
  // menu state 
  let menuOpened: boolean = false;
  
  let menu = null; // menu wrapper DOM reference
  onMount(() => {
    const handleOutsideClick = (e) => {
      if (menuOpened && !menu.contains(e.target)) {
        menuOpened = false;
      }
    };

    const handleEscape = (e) => {
      if (menuOpened && e.key === "Escape") {
        menuOpened = false;
      }
    };

    // add events when element is added to the DOM, useCapture = false
    document.addEventListener("click", handleOutsideClick, false);
    document.addEventListener("keyup", handleEscape, false);

    // remove events when element is removed from the DOM
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
      document.removeEventListener("keyup", handleEscape, false);
    };
  });

</script>

<div bind:this={menu}>
  <span on:click={()=> {menuOpened=true;}} class="text-neutral-300 hover:text-neutral-200 hover:cursor-pointer text-sm md:text-xl p-2">

    <i class="fa-solid fa-bars"></i>
  </span>
 
</div>
{#if menuOpened}
  <div transition:fly="{{ x: -200, delay: 200, duration: 700 }}" class="bg-gray-800 fixed top-0 left-0 flex-none h-72 w-44 md:w-36 px-2">
    <!------       X icon    ------>
    <div> 
      <button
        on:click={()=>{menuOpened=false;}}
        class="block mr-2 mt-1 text-slate-300 font-semibold hover:text-slate-200 text-sm md:text-lg"
      >
        <i class="fa-solid fa-xmark" />
      </button>
    </div>
    <div class="text-gray-300 text-sm md:text-base text-left h-5/6 flex flex-col justify-around pl-2">
      <a href="/" on:click={()=> {menuOpened = false;}} class="block py-2 px-2 hover:bg-gray-700">Home page</a>
      <a href="/watchlater" on:click={()=> {menuOpened = false;}} class="block py-2 px-2 hover:bg-gray-700">Watch later</a>
      <a href="/liked" on:click={()=> {menuOpened = false;}} class="block py-2 px-2 hover:bg-gray-700">Liked</a>
      <a href="/library" on:click={()=> {menuOpened = false;}} class="block py-2 px-2 hover:bg-gray-700">Library</a>
      <a href="/contact" on:click={()=> {menuOpened = false;}} class="block py-2 px-2 hover:bg-gray-700">Contact</a>
      <a href="/about" on:click={()=> {menuOpened = false;}} class="block py-2 px-2  hover:bg-gray-700">About</a>
    </div>

    
  </div>
{/if}