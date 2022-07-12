<script lang="ts">
  import { onMount } from "svelte";
  export let signupForm;
  export let loginForm;

  export let show; // signup/login form state
  
  const handleCloseClick = () => {
    console.log('handleCloseClick')
    show = false;
  };
  onMount(() => {
    const handleEscape = (e) => {
      if (show && e.key === "Escape") {
        show = false;
      }
    };

    document.addEventListener("keyup", handleEscape, false);

    return () => {
      document.removeEventListener("keyup", handleEscape, false);
    }

  });
</script>

{#if show}
  <div class="fixed">
    <div
      class="h-screen w-full opacity-75 bg-zinc-900 fixed top-0 left-10 z-10"
    />
    {#if signupForm}
      <!-------------               SIGNUP FORM                  ----------->
      <div class="form-wrapper bg-neutral-200 z-50 rounded-md fixed">
        <!------     FORM HEADER     ------->
        <div>
          <h2
            class="bg-gray-400 py-6 text-white text-xl font-semibold rounded-t-md"
          >
            Join Peertuber
          </h2>
          <button on:click={handleCloseClick} class="absolute top-1 right-2 text-neutral-200 hover:text-red-200">
            <i class="fa-solid fa-xmark" />
          </button>
        </div>
        <!------------ ----------------------- -------------->
        <form class="h-96 w-80">
          <input
            type="text"
            id="username"
            placeholder="name"
            class="w-4/5 pl-2 mt-4 h-12 mx-auto rounded outline outline-transparent hover:outline-1 hover:outline-gray-500"
          />
          <input
            type="text"
            id="email"
            placeholder="email"
            class="w-4/5 pl-2 mt-4 h-12 mx-auto rounded outline outline-transparent hover:outline-1 hover:outline-gray-500"
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            class="w-4/5 pl-2 mt-4 h-12 mx-auto rounded outline outline-transparent hover:outline-1 hover:outline-gray-500"
          />
          <input
            type="password"
            id="password-confirm"
            placeholder="password confirmation"
            class="w-4/5 pl-2 mt-4 h-12 mx-auto rounded outline outline-transparent hover:outline-1 hover:outline-gray-500"
          />
          <button
            class="bg-sky-500 hover:bg-sky-600 py-4 px-2 text-white rounded-lg font-semibold my-2 w-4/5 mx-auto mt-4"
            >Create account</button
          >
        </form>
      </div>
    {/if}
    {#if loginForm}
      <!-------------               LOGIN FORM               ------------>
      <div class="form-wrapper bg-neutral-200 z-50 rounded-md fixed">
        <!-------    FORM HEADER ------>
        <div>
          <h2
            class="bg-gray-400 py-6 text-white text-xl font-semibold rounded-t-md"
          >
            Log in to Peertuber
          </h2>
          <button on:click={handleCloseClick} class="absolute top-1 right-2 text-neutral-200 hover:text-red-200">
            <i class="fa-solid fa-xmark" />
          </button>
        </div>
        <!-------  -------  --------->
        <form class="h-80 w-72">
          <input
            type="text"
            id="email"
            placeholder="email"
            class="w-4/5 pl-2 mt-10 h-12 mx-auto rounded outline outline-transparent hover:outline-1 hover:outline-gray-500"
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            class="w-4/5 pl-2 mt-10 h-12 mx-auto rounded outline outline-transparent hover:outline-1 hover:outline-gray-500"
          />
          <button
            class="bg-sky-500 hover:bg-sky-600 py-4 px-2 text-white rounded-lg font-semibold my-2 w-4/5 mx-auto mt-12"
            >Log in with email</button
          >
        </form>
      </div>
    {/if}
  </div>
{/if}

<style>
  .form-wrapper {
    top: calc(50vh - 190px);
    right: calc(50vw - 150px);
  }
</style>
