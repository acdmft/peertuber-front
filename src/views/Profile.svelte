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
<div class="h-20"></div>
<!-----------       LEFT MENU       ------------>
<LeftSidebar page={"profile"} />
<!-----------      CONTENT CONTAINER     ------------>
<div class="min-h-screen ">
  <h1 class="text-left text-blue-300 md:text-xl font-bold fixed top-24 left-4 md:top-40 md:left-40">
    Profile
  </h1>

  <div class="text-left text-neutral-200 text-sm md:text-lg font-bold fixed top-32 left-4 md:top-48 md:left-40">
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
      <button bind:this={openMenuBtn} on:click={handleOutsideClick} class="mt-3 mb-2 bg-red-500 hover:bg-red-600 md:px-3 px-2 py-1 md:py-2 rounded-md text-xs md:text-regular font-semibold">Delete account</button>
    {:else}
      <p>Loading ...</p>
    {/if}
    <div class="pt-4">
      <a
        href="/"
        class="mt-6 bg-blue-500 hover:bg-blue-600 md:px-3 md:py-2 px-2 py-1 md:text-regular text-xs rounded-md"
        >Home</a
      >
    </div>
  </div>
  <!-- REMOVE ACCOUNT MENU  -->  
  {#if menuOpened }
  <div bind:this={menu} class="bg-gray-600 w-52 sm:w-60 fixed top-36 left-10 md:top-[50vh] md:left-[50vw] min-h-32 rounded-md">
    <h2 class="text-neutral-200 md:text-regular text-sm font-semibold my-4">Are you sure you want to delete your account?</h2>
    <div class="flex justify-center h-full w-full my-4">
      <button class="bg-red-300 self-end  md:text-regular text-sm font-semibold px-2 mb-2 rounded-md hover:bg-red-400 mr-2" on:click={deleteAccount} >Ok</button>
      <button class="bg-blue-300 self-end  md:text-regular text-sm font-semibold px-2 mb-2 rounded-md hover:bg-blue-400" on:click={()=>menuOpened=false}>Cancel</button>
    </div>
  </div>
  {/if}
</div>
