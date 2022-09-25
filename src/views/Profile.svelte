<script lang="ts">
import { onMount } from "svelte";

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
      console.log('userData', userData)
    }
    

  });
</script>
<!---------       TOP MENU            ----------->
<Header />
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20" />
<!-----------       LEFT MENU       ------------>
<LeftSidebar page={"watchlater"}/>
<!-----------      CONTENT CONTAINER     ------------>
<div class="min-h-screen " >
<h1 class="text-left text-neutral-200 text-xl font-bold fixed top-40 left-40">Profile</h1>

<div class="text-left text-neutral-200 font-bold absolute top-52 left-40">
{#if dataRecieved}
<p class="mb-2">Name: {userData['name']}</p>
<p class="mb-2">Email: {userData['email']}</p>
<p class="mb-2"> Playlists: <a href="/library" class="text-blue-400 hover:text-blue-500">{userData.playlists.length}</a></p>
{:else}
<p>Loading ... </p>
{/if}
</div>
</div>