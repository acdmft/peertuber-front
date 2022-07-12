<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { signupSchema, loginSchema } from "../lib/schema.js";
 
  export let signupForm: boolean;
  export let loginForm: boolean;
  let schema = signupForm ? signupSchema: loginSchema;

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  import { onMount } from "svelte";
  

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
        <form on:submit|preventDefault={handleSubmit} class="min-h-96 w-80">
          <input
            type="text"
            name="name"
            bind:value={$form.name}
            placeholder="name"
            on:change={handleChange}
            class="w-4/5 pl-2 mt-4 h-12 mx-auto rounded outline outline-transparent hover:outline-1 hover:outline-gray-500"
          />
          {#if $errors.name}
            <div class="text-orange-700 text-sm">{$errors.name}</div>
          {/if}
          <input
            type="text"
            name="email"
            bind:value={$form.email}
            placeholder="email"
            on:change={handleChange}
            class="w-4/5 pl-2 mt-4 h-12 mx-auto rounded outline outline-transparent hover:outline-1 hover:outline-gray-500"
          />
          {#if $errors.email}
            <div class="text-orange-700 text-sm">{$errors.email}</div>
          {/if}
          <input
            type="password"
            name="password"
            bind:value={$form.password}
            placeholder="password"
            on:change={handleChange}
            class="w-4/5 pl-2 mt-4 h-12 mx-auto rounded outline outline-transparent hover:outline-1 hover:outline-gray-500"
          />
          {#if $errors.password}
            <div class="text-orange-700 text-sm">{$errors.password}</div>
          {/if}
          <input
            type="password"
            name="confirmPassword"
            bind:value={$form.confirmPassword}
            placeholder="password confirmation"
            on:change={handleChange}
            class="w-4/5 pl-2 mt-4 h-12 mx-auto rounded outline outline-transparent hover:outline-1 hover:outline-gray-500"
          />
          {#if $errors.confirmPassword}
            <div class="text-orange-700 text-sm">{$errors.confirmPassword}</div>
          {/if}
          <button
            type="submit"
            class="bg-sky-500 hover:bg-sky-600 py-4 px-2 text-white rounded-lg font-semibold my-6 w-4/5 mx-auto mt-4"
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
        <form on:submit|preventDefault={handleSubmit} class="min-h-80 w-72">
          <input
            type="text"
            name="email"
            bind:value={$form.email}
            placeholder="email"
            on:change={handleChange}
            class="w-4/5 pl-2 mt-10 h-12 mx-auto rounded outline outline-transparent hover:outline-1 hover:outline-gray-500"
          />
          {#if $errors.email}
            <div class="text-orange-700 text-sm">{$errors.email}</div>
          {/if}
          <input
            type="password"
            name="password"
            bind:value={$form.password}
            placeholder="password"
            on:change={handleChange}
            class="w-4/5 pl-2 mt-10 h-12 mx-auto rounded outline outline-transparent hover:outline-1 hover:outline-gray-500"
          />
          {#if $errors.password}
            <div class="text-orange-700 text-sm">{$errors.password}</div>
          {/if}
          <button
            class="bg-sky-500 hover:bg-sky-600 py-4 px-2 text-white rounded-lg font-semibold my-6 w-4/5 mx-auto mt-12"
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
