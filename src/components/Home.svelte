<script lang="ts">
  import VideoRow from "./VideoRow.svelte";
  import Header from "./Header.svelte";
  import LeftSidebar from "./LeftSidebar.svelte";
</script>

<!---------       TOP MENU            ----------->
<Header />
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20"></div>
<!-----------       LEFT MENU       ------------>
<LeftSidebar />
<!----------         LEFT SEPARATOR    ------------->
<!-- <div class="h-screen w-16" ></div> -->
<!-----------       VIDEOROWS       ------------->
<VideoRow />
<VideoRow />
<VideoRow />

