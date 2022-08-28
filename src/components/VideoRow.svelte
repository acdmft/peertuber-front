<script lang="ts">
  import Card from "./Card.svelte";
  export let cardsData;
  // export let imgUrl: String;
  // export let instName: String;
  // export let videoTitle: String;
  // export let videoUrl: String;


</script>

<div class="flex justify-around h-62 mt-12 w-6/8 ml-12">
  <Card
    width={"w-1/5"}
    height={"min-h-full"}
    img={ `http://${cardsData[0].instance.host}${cardsData[0].thumbnailImg}` }
    channel_name={ cardsData[0].instance.name }
    channel_url={ cardsData[0].instance.host }
    video_title={ cardsData[0].name }
    video_url={ cardsData[0].url }
  />
  <Card
    width={"w-1/5"}
    height={"min-h-full"}
    img={ `http://${cardsData[1].instance.host}${cardsData[1].thumbnailImg}` }
    channel_name={ cardsData[1].instance.name }
    channel_url={ cardsData[1].instance.host }
    video_title={ cardsData[1].name }
    video_url={ cardsData[1].url }
  />
  <Card
    width={"w-1/5"}
    height={"min-h-full"}
    img={ `http://${cardsData[2].instance.host}${cardsData[2].thumbnailImg}` }
    channel_name={ cardsData[2].instance.name }
    channel_url={ cardsData[2].instance.host }
    video_title={ cardsData[2].name }
    video_url={ cardsData[2].url }
  />
  <Card
    width={"w-1/5"}
    height={"min-h-full"}
    img={ `http://${cardsData[3].instance.host}${cardsData[3].thumbnailImg}` }
    channel_name={ cardsData[3].instance.name }
    channel_url={ cardsData[3].instance.host }
    video_title={ cardsData[3].name }
    video_url={ cardsData[3].url }
  />
</div>
