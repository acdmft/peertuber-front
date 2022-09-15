<script lang="ts">
  // TOASTS
  import { successToast, warningToast } from "../lib/toast-themes";
  // EXPORTS
  export let video_id: string;
  let report = "";
  $: btnDisabled = report.length === 0 ? "disabled" : "";
  // FORM STATE
  let menuEnabled = true;
  $: showForm = menuEnabled;

  // SEND REPORT
  const api_url = import.meta.env.VITE_API_URL;
  function reportVideo() {
    let data = { videoId: video_id, conType: report };
    fetch(`${api_url}/report`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        successToast("Thank you for report!");
        menuEnabled = false;
      } else {
        warningToast("Oops! Something went wrong, try later!");
        menuEnabled = false;
      }
    });
  }
</script>

{#if showForm}
  <div
    class="menu_wrapper flex justify-center h-screen w-full fixed top-0 left-10 z-10"
  >
    <div class="flex items-center">
      <!-----      MENU      ------>
      <div class="w-fit h-fit bg-gray-900 rounded-md text-slate-400 px-4 pt-4">
        <h3 class="font-semibold">Report</h3>

        <form on:submit|preventDefault={reportVideo}>
          <div class="mt-2">
            <input
              type="radio"
              bind:group={report}
              id="prn"
              name="report"
              value={"prn"}
            />
            <label class="ml-2" for="prn">Pornography</label>
          </div>

          <div class="mt-2">
            <input
              type="radio"
              bind:group={report}
              id="discr"
              name="report"
              value={"discr"}
            />
            <label class="ml-2" for="discr"
              >Hateful, discriminatory content</label
            >
          </div>

          <div class="mt-2">
            <input
              type="radio"
              bind:group={report}
              id="viol"
              name="report"
              value={"viol"}
            />
            <label class="ml-2" for="viol">Violent or repulsive content</label>
          </div>
          <!-- BUTTONS -->
          <div class="my-4 flex justify-around">
            <button on:click class="text-neutral-200 hover:text-red-200"
              >Cancel</button
            >
            {#if btnDisabled}
              <button class="text-slate-600" disabled type="submit"
                >Report</button
              >
            {:else}
              <button class="text-orange-400" type="submit">Report</button>
            {/if}
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
  .menu_wrapper {
    background-color: rgba(24, 24, 27, 0.75);
  }
</style>
