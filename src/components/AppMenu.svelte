<script>
  const customOptions = {
    MIN_GRID_SIZE: 5,
    MAX_GRID_SIZE: 60,
    MIN_SPEED: 1,
    MAX_SPEED: 10,
    MIN_CELL_SIZE: 20,
    MAX_CELL_SIZE: 70,
  };

  let {
    gridSize = $bindable(),
    speed = $bindable(),
    cellSize = $bindable(),
    showCoordinates = $bindable(),
    startAlgo,
    initGrid,
  } = $props();
</script>

<div id="app-menu">
  <div class="menu-section">
    <label for="gridSize">Grid size</label>
    <input
      name="gridSize"
      type="range"
      min={customOptions.MIN_GRID_SIZE}
      max={customOptions.MAX_GRID_SIZE}
      step="1"
      bind:value={gridSize}
      oninput={initGrid}
    />
  </div>

  <div class="menu-section">
    <label for="speed">Speed</label>
    <input
      name="speed"
      type="range"
      min={customOptions.MIN_SPEED}
      max={customOptions.MAX_SPEED}
      step="1"
      bind:value={speed}
    />
  </div>

  <div class="menu-section">
    <label for="cellSize">Cell size</label>
    <input
      name="cellSize"
      type="range"
      min={customOptions.MIN_CELL_SIZE}
      max={customOptions.MAX_CELL_SIZE}
      step="1"
      bind:value={cellSize}
    />
  </div>

  <div class="menu-section">
    <label for="showCoordinates">Show coordinates</label>
    <input
      name="showCoordinates"
      type="checkbox"
      bind:checked={showCoordinates}
    />
  </div>

  <div class="menu-section">
    <button onclick={startAlgo}>Start algo</button>
    <button onclick={initGrid}>Reset</button>
  </div>
</div>

<style>
#app-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 40%;
}

label {
  float: left;
}

input {
  float: right;
}
</style>
