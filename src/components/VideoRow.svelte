<script lang="ts">
  import Card from "./Card.svelte";
  export let cardsData;
</script>

<div class="flex justify-around h-62 mt-12 w-6/8 ml-12">
  {#each cardsData as card}
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
    />
  {/each}
</div>
