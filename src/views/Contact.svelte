<script lang="ts">
  import { onMount } from "svelte";
  import Header from "../components/Header.svelte";
  import LeftSidebar from "../components/LeftSidebar.svelte";
  import ContactForm from "../components/ContactForm.svelte";

  onMount(() => {
    window.scroll(0, 0);
  });
</script>

<h1>Contact</h1>
<!---------       TOP MENU            ----------->
<Header />
<!-----------      TOP SEPARATOR       ------------>
<div class="h-20" />
<!-----------       LEFT MENU       ------------>
<LeftSidebar page={"contact"} />
<!------       CONTENT CONTAINER     ------------>
<div class="min-h-screen">
  <div class="flex justify-center mt-20">
    <!-- CONTACT INFO  -->
    <div class="w-1/3">
      <h1 class="text-neutral-200 text-center font-bold text-xl">
        Contact info:
      </h1>
      <div class="text-neutral-200 text-lg mt-4">
        <i class="fa-solid fa-envelope" />
        <span class="ml-2">andrewsanser@gmail.com</span>
      </div>
      <div class="text-neutral-200 text-2xl mt-4 text-center">
        <a href="https://www.linkedin.com/in/andrei-zheksim/" target="_blank">
          <i class="fa-brands fa-linkedin mr-2 hover:text-neutral-100" />
        </a>
        <a href="https://github.com/acdmft" target="_blank">
          <i class="fa-brands fa-square-github hover:text-neutral-100" />
        </a>
      </div>
    </div>
    <!-- CONTACT FORM -->
    <div class="w-2/3 flex justify-center">
      <ContactForm />
    </div>
  </div>
</div>
