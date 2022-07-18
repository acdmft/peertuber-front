<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { loginSchema } from "../lib/schema.js";
  import { onMount } from "svelte";

  const api_url = import.meta.env.VITE_API_URL;

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      fetch(`${api_url}/login`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      .then((res)=>{
        if (res.status >= 200 && res.status < 400) {
          alert('logged in successfully')
        } else {
          alert('something went wrong')
        }
      })
      .catch((err) => console.log(err));

      // alert(JSON.stringify(values));
    }
  });
  // return form to initial state after closing
  const cleanUpForm = () => {
    Object.keys($form).forEach((key) => {
      $form[key] = "";
    });
    Object.keys($errors).forEach((key) => {
      $errors[key] = "";
    });
  };
  onMount(() => {
    cleanUpForm();
  });
</script>

<!-------------               LOGIN FORM               ------------>
<!-------    FORM HEADER ------>
<div>
  <h2 class="bg-gray-400 py-6 text-white text-xl font-semibold rounded-t-md">
    Log in to Peertuber
  </h2>
  <button
    on:click
    class="absolute top-1 right-2 text-neutral-200 hover:text-red-200"
  >
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
