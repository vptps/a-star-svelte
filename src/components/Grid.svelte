<script>
  import Cell from "./Cell.svelte";

  let { gridSize, cellSize, cellList, toggleCrossable } = $props();
  let editBlock = $state(false);
</script>

{#if cellList.length}
  <div id="grid">
    {#each cellList as row, i (i)}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="row"
        onmousedown={() => editBlock = true}
        onmouseup={() => editBlock = false}
      >
        {#each row as cell, j (j)}
          <Cell
            {cellSize}
            {cell}
            {editBlock}
            {toggleCrossable}
          ></Cell>
        {/each}
      </div>
    {/each}
  </div>
{/if}

<style>
  #grid {
    width: min-content;
  }
  .row {
    width: max-content;
  }
</style>