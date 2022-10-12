<script lang="ts">
  import { onMount } from "svelte";
  import Card from "./Card.svelte";
  export let cardsData;
  // display Card depending on the current page
  export let page: string = "";
  // stripCards help to arrange Cards in the row
  export let stripCards;
  $: stripCardsArr = Array(stripCards).fill("");
  
</script>

<div class="flex justify-around justify-self-center z-10 w-full h-62 mt-12 md:w-11/12 md:ml-12 border-2 border-solid border-orange-200">
  {#each cardsData as card}
    {#if page === "home"}
      <Card
        width={"w-1/5"}
        height={"min-h-full"}
        img={`https://${card.instance.host}${card.thumbnailImg}`}
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
        img={`https://${card.instance}${card.thumbnailImg}`}
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
  {#each stripCardsArr as strip}
    <div class="w-1/5 min-h-full border-2 border-solid border-blue-500 " />
  {/each}
</div>
