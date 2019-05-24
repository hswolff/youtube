<script>
  let open = false;
  export let title;
  function toggleOpen() {
    open = !open;
  }
</script>

<style>
  div {
    border: 1px solid #eee;
    width: 300px;
    text-align: center;
  }
</style>

<div>
  <h1 on:click={toggleOpen}>{title}</h1>
  {#if open}
    <slot />
  {/if}
</div>
