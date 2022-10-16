<script lang="ts">
  import Card from "./Card.svelte";
  import { getCardProps } from "../lib/cardsRow";
  export let cardsData;

  export let cardNum;
  // display Card depending on the current page
  export let page: string = "";
  // stripCards help to arrange Cards in the row
  export let stripCards;
  $: stripCardsArr = Array(stripCards).fill("");
  // let widthVars = {1: "11/12", 3: ""}
  const { width, height } = getCardProps(cardNum);
</script>

<div
  class="flex justify-around justify-self-center w-11/12 mt-4 md:mt-12 lg:w-11/12 md:ml-12"
>
  {#each cardsData as card}
    {#if page === "home"}
      <Card
        {height}
        {width}
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
        {width}
        {height}
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
    <div class="{width} mx-1.5 min-h-full" />
  {/each}
</div>
