<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "../src/components/Home.svelte";

  export let url = "";
</script>

<main class="text-center p-4 mx-0">
  <Router url="{url}">
    <nav>
      <Link to="/">Home</Link>
    </nav>
    <div>
      <Route path="/"><Home /></Route>
    </div>
  </Router>
</main>

<style>
  
</style>
