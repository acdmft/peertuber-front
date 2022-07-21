<script lang="ts">
  import { user, accForms } from "../lib/stores";
  import { createForm } from "svelte-forms-lib";
  import { signupSchema } from "../lib/schema.js";
  import { onMount } from "svelte";
  // TOASTS
  import { successToast, warningToast} from "../lib/toast-themes";

  const api_url = import.meta.env.VITE_API_URL;

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      fetch(`${api_url}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      .then((res)=>{
        if (res.ok) {
          successToast("Account created!");
          $user=true;
        } else {
          warningToast("Oops! Something went wrong");
        }
        $accForms=false;
      })
      .catch((err) => console.log(err));
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

<!-------------               SIGNUP FORM                  ----------->
<!------     FORM HEADER     ------->
<div>
  <h2 class="bg-gray-400 py-6 text-white text-xl font-semibold rounded-t-md">
    Join Peertuber
  </h2>
  <button
    on:click
    class="absolute top-1 right-2 text-neutral-200 hover:text-red-200"
  >
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
