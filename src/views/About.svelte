<script lang="ts">
  import { onMount } from "svelte";
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";

  onMount(() => {
    window.scroll(0,0);
  })
</script>

<h1>About</h1>
<!---------       TOP MENU            ----------->
<Header />
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20" />
<!-----------       LEFT MENU       ------------>
<LeftSidebar page={"about"} />
<!------       CONTENT CONTAINER     ------------>
<div class="min-h-screen">
  <div class="mt-8 lg:mt-20 w-full px-2 text-sm md:text-regular lg:text-xl md:w-4/5 lg:w-1/2 mx-auto text-neutral-200 font-semibold text-left">
    <h1 class="text-2xl font-bold">About project: </h1>
    <p class="mt-4"><a class="text-blue-400 hover:text-blue-500" href="https://joinpeertube.org" target="_blank" rel="noreferrer">Peertube</a> is open source software for hosting videos, it is based on p2p technology that reduces load on individual servers while they distribute the videos.
      Development started in 2017 by the programmer known as Chocobozzz. Now it is supported by the french non-profit organization <a class="text-blue-400 hover:text-blue-500" href="https://framasoft.org/en/" target="_blank" rel="noreferrer">Framasoft.</a>
    </p>
    <p class="mt-4">
      Anyone can install Peertube on the sever, upload and then share videos. Streaming is also possible. The servers running the software are united in the federation of instances, this is possible thanks to <a class="text-blue-400 hover:text-blue-500" href="https://activitypub.rocks/" target="_blank" rel="noreferrer"> ActivityPub protocol.</a></p>
      <p class="mt-4">
        Instances are independent, athough they can put the link on the video stored by another instance. There is no central server and so there is no moderation or recommendation system. In order to navigate through channels and videos there are index pages. </p>

        <p class="mt-4">Current project is one of such index pages. It is based on the <a class="text-blue-400 hover:text-blue-500" href="https://instances.joinpeertube.org/instances" target="_blank" rel="noreferrer">official list</a> of instances maintained by Framasoft. Peertuber is an open source project, collaboration is appreciated. The working repository could be found <a class="text-blue-400 hover:text-blue-500" href="https://github.com/acdmft/peertuber-front" target="_blank" rel="noreferrer">here.</a></p>
  </div>
</div>