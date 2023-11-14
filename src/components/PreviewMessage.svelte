<script lang="ts">
import { SvelteToast, toast } from "@zerodevx/svelte-toast";

toast.push(`<p class="text-blue-200 font-bold text-2xl mt-6 mb-6 tracking-widest">Welcome to Peertuber!</p>
<p class="font-bold text-yellow-600 text-xl text-left mb-16 tracking-wide leading-9 px-4">It may take up to 30 seconds to load a site content<br>during initial setup. Please be patient!<br>Peertuber is an experimental project. You can see the video previews taken from the peertube.org<br>These are the videos from independent creators.<br>Hope you'll enjoy!</p>`, { target: 'new', initial: 0})
</script>
<!-- <div class="flex justify-center"> -->

    <div class="wrap">
        <SvelteToast target="new" options={{ initial: 0, intro: { y: 4 } }} />
    </div>
<!-- </div> -->

<style>

.wrap {
    --toastContainerTop: 5rem;
    --toastContainerRight: 0.5rem;
    --toastContainerBottom: auto;
    --toastContainerLeft: 0.5rem;
    --toastWidth: 80%;
    --toastMinHeight: 2rem;
    --toastPadding: 0 0.5rem;
}
@media (min-width: 40rem) {
    .wrap {
      --toastContainerRight: auto;
      --toastContainerLeft: calc(50vw - 20rem);
      --toastWidth: 40rem;
    }
}

</style>