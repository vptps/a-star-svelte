<script>
  import { shared } from '../shared/shared.svelte';

  let { cellSize, cell, editBlock, toggleCrossable } = $props();

  const cellStyle = $derived(`
    height: ${cellSize}px;
    width: ${cellSize}px;
    background-color: ${cell.start ? 'green'
        : cell.end ? 'red'
        : cell.current ? 'yellow'
        : cell.solution ? 'purple'
        : cell.closed ? 'lightblue'
        : cell.crossable ? 'white'
        : 'black'};`
  );

  const setCrossable = (editBlock, cell) => {
    if (editBlock) {
      toggleCrossable(cell);
    }
  }
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  draggable="false"
  onmouseover={() => setCrossable(editBlock, cell)}
  onmousedown={() => setCrossable(true, cell)}
  style={cellStyle}
  class="cell"
>
  {#if shared.showCoordinates}
  <span>
    { cell.x } { cell.y }
  </span>
  {/if}
</div>

<style>
  .cell {
    font-size: 6px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: solid 1px black;
    float: left;
  }
</style>