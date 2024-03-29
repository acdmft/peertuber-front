<script lang="ts">
  // based on tutorial: https://codechips.me/tailwind-ui-react-vs-svelte/
  import { user, accForms } from "../lib/stores";
  import page from "page";
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  import LoginForm from "./LoginForm.svelte";
  import SignupForm from "./SignupForm.svelte";
  // TOASTS
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { successToast, warningToast } from "../lib/toast-themes";

  // export let user;

  let show: boolean = false; // menu state
  let menu = null; // menu wrapper DOM reference
  // SIGNUP / LOGIN FORM state
  let loginForm: boolean = false; // user connects to the site
  let signupForm: boolean = false; // user creates new account

  // close signup/login form
  const handleCloseClick = () => {
    $accForms = false;
  };
  // LOGOUT
  const api_url = import.meta.env.VITE_API_URL;
  const logout = () => {
    fetch(`${api_url}/logout`).then((res) => {
      if (res.ok) {
        $user = false;
        page.redirect("/");
        successToast("You are logged out!");
      } else {
        warningToast("Oops! Something went wrong!");
      }
    });
    show = false;
  };

  onMount(() => {
    const handleOutsideClick = (e) => {
      if (show && !menu.contains(e.target)) {
        show = false;
        $accForms = false;
      }
    };

    const handleEscape = (e) => {
      if (show && e.key === "Escape") {
        show = false;
        $accForms = false;
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

<div class="relative" bind:this={menu}>
  <SvelteToast />
  <div>
    <button
      on:click={() => (show = !show)}
      class="menu w-full focus:outline-none focus:shadow-solid text-slate-200 hover:text-slate-400 text-lg md:text-2xl cursor-pointer"
    >
    <!----           USER ICON        ------------>
      {#if $user}
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
        {#if $user}
        <!-- PROFILE ITEM -->
          <a href="/profile"
            class="block px-4 w-full text-left text-slate-200 py-2 hover:bg-gray-600"
            >Profile</a
          >
          <!-- LOGOUT -->
          <button
            class="block px-4 w-full text-left text-slate-200 py-2 hover:bg-gray-600"
            on:click={logout}>Logout</button
          >
        {:else}
          <button
            on:click={() => {
              show = false;
              $accForms = true;
              loginForm = true;
              signupForm = false;
            }}
            class="block px-4 w-full text-slate-200 py-2 hover:bg-gray-600"
            >Login</button
          >
          <button
            on:click={() => {
              show = false;
              $accForms = true;
              loginForm = false;
              signupForm = true;
            }}
            class="block px-4 w-full text-slate-200 py-2 hover:bg-gray-600"
            >Signup</button
          >
        {/if}
      </div>
    {/if}
  </div>
  <!---------------               LOGIN / SIGNUP FORM              ------------>
  {#if $accForms}
    <div class="fixed">
      <div
        class="h-screen w-full opacity-75 bg-zinc-900 fixed top-0 left-10 z-10"
      />
      <div class="form-wrapper bg-neutral-200 z-50 rounded-md fixed">
        {#if signupForm}
          <SignupForm on:click={handleCloseClick} />
        {/if}

        {#if loginForm}
          <LoginForm on:click={handleCloseClick} />
        {/if}
      </div>
    </div>
    <!-- </div> -->
  {/if}
</div>

<style>
  .form-wrapper {
    top: calc(50vh - 190px);
    right: calc(50vw - 150px);
  }
</style>
