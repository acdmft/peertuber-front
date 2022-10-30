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
      <Card
        {width}
        {height}
        img={`https://${card.host}${card.thumbnailImg}`}
        channel_name={card.instance.name}
        channel_url={card.host}
        video_title={card.name}
        video_url={card.url}
        video_id={card._id}
        likes={card.likes || 0}
        duration={card.duration}
        on:like
        enabled={page === 'liked' ? false: true}
      />
  {/each}
  {#each stripCardsArr as strip}
    <div class="{width} mx-1.5 min-h-full" />
  {/each}
</div>
