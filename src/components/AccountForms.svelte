<script lang="ts">
  
  import { signupSchema, loginSchema } from "../lib/schema.js";
  import { onMount } from "svelte";
  import SignupForm from "./SignupForm.svelte";
  import LoginForm from "./LoginForm.svelte";
  
  export let show: boolean; // signup/login form state 
  export let signupForm: boolean;
  export let loginForm: boolean;
  let schema = signupForm ? signupSchema: loginSchema;

  
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
    <div class="form-wrapper bg-neutral-200 z-50 rounded-md fixed">

      {#if signupForm}
        <SignupForm on:click={handleCloseClick} />
      {/if}
      {#if loginForm}
        <LoginForm on:click={handleCloseClick} />
      {/if}
    </div>
  </div>
{/if}

<style>
  .form-wrapper {
    top: calc(50vh - 190px);
    right: calc(50vw - 150px);
  }
</style>
