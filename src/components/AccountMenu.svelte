<script lang="ts">
  // based on tutorial: https://codechips.me/tailwind-ui-react-vs-svelte/
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";

  export let user;

  let show = false; // menu state
  let menu = null; // menu wrapper DOM reference

  onMount(() => {
    const handleOutsideClick = (e) => {
      if (show && !menu.contains(e.target)) {
        show = false;
      }
    };

    const handleEscape = (e) => {
      if (show && e.key === "Escape") {
        show = false;
      }
    };

    // add events when element is added to the DOM, useCaptuer = false
    document.addEventListener("click", handleOutsideClick, false);
    document.addEventListener("keyup", handleEscape, false);

    // remove events when element is removed from the DOM
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
      document.removeEventListener("keyup", handleEscape, false);
    };
  });
</script>

<div class="relative " bind:this={menu}>
  <div>
    <button
      on:click={() => (show = !show)}
      class="menu focus:outline-none focus:shadow-solid text-slate-200 hover:text-slate-400 text-2xl cursor-pointer mr-4 mt-2"
    >
      {#if user}
        <i class="fa-solid fa-user" />
      {:else}
        <i class="fa-solid fa-right-to-bracket" />
      {/if}
    </button>
    {#if show}
      <div
        in:scale={{ duration: 100, start: 0.95 }}
        out:scale={{ duration: 75, start: 0.95 }}
        class="origin-top-right absolute right-0 w-48 py-2 mt-1 bg-gray-800 rounded shadow-md divide-y divide-gray-500"
      >
        {#if user}
          <a
            href={"#"}
            class="block px-4 text-slate-200 py-2 hover:bg-green-500 hover:text-green-100"
            >Profile</a
          >
          <a
            href={"#"}
            class="block px-4 text-slate-200 py-2 hover:bg-green-500 hover:text-green-100"
            >Logout</a
          >
        {:else}
          <a
            href={"#"}
            class="block px-4 text-slate-200 py-2 hover:bg-green-500 hover:text-green-100"
            >Login</a
          >
          <a
            href={"#"}
            class="block px-4 text-slate-200 py-2 hover:bg-green-500 hover:text-green-100"
            >Signup</a
          >
        {/if}
      </div>
    {/if}
  </div>
</div>
