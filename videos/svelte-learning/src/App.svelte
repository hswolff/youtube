<script>
  import Toggle from "./Toggle.svelte";
  export let name;
  let count = 0;

  function incrementCount() {
    count = count + 1;
  }
</script>

<style>
  h1 {
    color: purple;
  }

  p {
    font-weight: bold;
  }
</style>

<Toggle title="My Toggle">In the inside!</Toggle>

<h1>Hello {name}!</h1>

<p>Current count: {count}</p>

<button on:click={incrementCount}>Go Bigger!</button>
