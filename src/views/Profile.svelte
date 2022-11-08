<script lang="ts">
  import { onMount } from "svelte";
  import page from "page";
  import { user } from "../lib/stores";
  // TOASTS
  import { successToast, warningToast } from "../lib/toast-themes";
  // COMPONENTS
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";
  // CONFIRM MENU STATE AND UTILITY FUNCTIONS
  let menu = null;
  let openMenuBtn = null;
  let menuOpened = false;
  const handleOutsideClick = (e) => {
    if (openMenuBtn.contains(e.target)) {
      menuOpened = true;
      return;
    }
    if (menuOpened && !menu.contains(e.target)) {
      menuOpened = false;
    }
  };
  // USER DATA VARIABLES
  let dataRecieved = false;
  let userData;
  const api_url = import.meta.env.VITE_API_URL;
  onMount(async () => {
    // FETCH USER DATA
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
    // MANAGE CONFIRMATION MENU STATE

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
<LeftSidebar page={"profile"} />
<!-----------      CONTENT CONTAINER     ------------>
<div class="min-h-screen ">
  <h1 class="text-left text-neutral-200 text-xl font-bold fixed top-40 left-40">
    Profile
  </h1>

  <div class="text-left text-neutral-200 font-bold fixed top-52 left-40">
    {#if dataRecieved}
      <p class="mb-2">Name: {userData["name"]}</p>
      <p class="mb-2">Email: {userData["email"]}</p>
      <p class="mb-2">
        Playlists: <a
          href="/library"
          class="ml-2 text-blue-400 hover:text-blue-500"
          >{userData.playlists.length}</a
        >
      </p>
      <button bind:this={openMenuBtn} on:click={handleOutsideClick} class="mt-3 mb-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md font-semibold">Delete account</button>
    {:else}
      <p>Loading ...</p>
    {/if}
    <div class="pt-4">
      <a
        href="/"
        class="mt-6 bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md"
        >Home</a
      >
    </div>
  </div>
  // REMOVE ACCOUNT MENU 
  {#if menuOpened }
  <div bind:this={menu} class="bg-gray-600 w-60 top-[50vh] left-[50vw] fixed min-h-32 rounded-md">
    <h2 class="text-neutral-200 font-semibold my-4">Are you sure you want to delete your account?</h2>
    <div class="flex justify-center h-full w-full my-4">
      <button class="bg-red-300 self-end px-2 mb-2 rounded-md hover:bg-red-400 mr-2" on:click={deleteAccount} >Ok</button>
      <button class="bg-blue-300 self-end px-2 mb-2 rounded-md hover:bg-blue-400" on:click={()=>menuOpened=false}>Cancel</button>
    </div>
  </div>
  {/if}
</div>
