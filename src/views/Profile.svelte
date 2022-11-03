<script lang="ts">
  import { onMount } from "svelte";
  import page from "page";
  import { user } from "../lib/stores";
  // TOASTS
  import { successToast, warningToast } from "../lib/toast-themes";
  // COMPONENTS
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";

  let dataRecieved = false;
  let userData;
  const api_url = import.meta.env.VITE_API_URL;
  onMount(async () => {
    let result = await fetch(`${api_url}/profile`, {
      credentials: "include",
    });
    if (result.ok) {
      let data = await result.json();
      userData = data;
      dataRecieved = true;
    } else {
      $user = false;
      warningToast("You need to be logged in!");
      page.redirect("/");
      return;
    }
    
  });
  async function deleteAccount() {
    let result = await fetch(`${api_url}/profile`, {
      method: "DELETE",
      credentials: "include"
    });
    if (result.ok) {
      successToast("Account was deleted!")
      $user = false;
      page.redirect("/");
      return;
    }
    if (!result.ok){
      $user = false;
      page.redirect("/");
      warningToast("Something went wrong!");
      return;
    }

  }
</script>
<!---------       TOP MENU            ----------->
<Header />
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20" />
<!-----------       LEFT MENU       ------------>
<LeftSidebar page={"profile"}/>
<!-----------      CONTENT CONTAINER     ------------>
<div class="min-h-screen " >
<h1 class="text-left text-neutral-200 text-xl font-bold fixed top-40 left-40">Profile</h1>

<div class="text-left text-neutral-200 font-bold fixed top-52 left-40">
{#if dataRecieved}
<p class="mb-2">Name: {userData['name']}</p>
<p class="mb-2">Email: {userData['email']}</p>
<p class="mb-2"> Playlists:  <a href="/library" class="ml-2 text-blue-400 hover:text-blue-500">{userData.playlists.length}</a></p>
<button on:click={deleteAccount}>Delete account</button>
{:else}
<p>Loading ... </p>
{/if}
<div class="pt-4">
  <a href="/" class="mt-6 bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md text">Home</a>

</div>
</div>
</div>