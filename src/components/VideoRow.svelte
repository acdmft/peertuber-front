<script lang="ts">
  import { escape } from "svelte/internal";
import Card from "./Card.svelte";
  export let cardsData;
  // display Card depending on the current page
  export let page: string;
  // stripCards help to arrange Cards in the row 
  $: stripCards = Array(4 - cardsData.length).fill("");

</script>

<div class="flex justify-around h-62 mt-12 w-6/8 ml-12">
  {#each cardsData as card}
    {#if page === "home"}
    <Card
      width={"w-1/5"}
      height={"min-h-full"}
      img={`http://${card.instance.host}${card.thumbnailImg}`}
      channel_name={card.instance.name}
      channel_url={card.instance.host}
      video_title={card.name}
      video_url={card.url}
      video_id={card._id}
      likes={card.likes}
      duration={card.duration}
      on:like
      enabled={true}
    />
    {:else}
    <Card
      width={"w-1/5"}
      height={"min-h-full"}
      img={`http://${card.instance}${card.thumbnailImg}`}
      channel_name={card.instance}
      channel_url={card.instance}
      video_title={card.name}
      video_url={card.url}
      video_id={card._id}
      likes={card.likes}
      duration={card.duration}
      on:like
      enabled={false}
    />
    {/if}
  {/each}
  {#each stripCards as strip}
    <div class="w-1/5 min-h-full"></div>
  {/each}
</div>
