<script>
  import Grid from './components/Grid.svelte';
  import AppMenu from './components/AppMenu.svelte';
  import { onMount } from 'svelte';
  import { sleep, getNodeNeighbours, showSolution, getDistance, compareNodes } from './utils/utils.js';
  import { shared } from './shared/shared.svelte';

  let gridSize = $state(20);
  let speed = $state(5);
  let cellSize = $state(25);
  let cellList = $state([]);

  const initGrid = () => {
    cellList = [];
    for (let i = 0; i < gridSize; i++) {
      cellList.push([]);
    }

    cellList.forEach((row, index) => {
      for (let j = 0; j < gridSize; j++) {
        row.push({
          'x': index,
          'y': j,
          'start': false,
          'end': false,
          'cost': 0,
          'heuristique': 0,
          'crossable': true,
          'parent': undefined,
          'current': false,
          'neighbour': false,
          'closed': false,
          'solution': false
        });
      }
    });

    // set default start and end position
    cellList[1][gridSize - 2].end = true;
    cellList[gridSize - 2][1].start = true;
  }

  const startAlgo = async () => {
    let start = cellList[gridSize - 2][1];
    let end = cellList[1][gridSize - 2];

    let closedList = [];
    let openList = [];
    openList.push(start);

    while (openList.length > 0) {
      await sleep(speed);
      let u = openList.pop();
      u.current = true;

      if (u.x === end.x && u.y === end.y) {
        showSolution(u);
        break;
      }

      let neighbours = getNodeNeighbours(u, gridSize, cellList );
      neighbours.forEach(v => {
        v.neighbour = true;

        if (!v.crossable) {
          closedList.push(v);
        }

        if (!(closedList.includes(v) || (openList.includes(v) && v.cost < u.cost + 1))) {
          v.parent = u;
          v.cost = u.cost + 1;
          v.heuristique = v.cost + getDistance(v, end);
          if (openList.includes(v)) {
            const idx = openList.indexOf(v);
            openList.splice(idx, 1);
          }
          openList.push(v);
          openList.sort(compareNodes);
        }
      })

      closedList.push(u);
      await sleep(speed);
      u.current = false;
      u.closed = true;
    }
  }

  const toggleCrossable = (cell) => {
    cell.crossable = !cell.crossable;
  }

  onMount(initGrid);
</script>

<main>
  <AppMenu
    bind:cellSize={cellSize}
    bind:gridSize={gridSize}
    bind:speed={speed}
    bind:showCoordinates={shared.showCoordinates}
    {startAlgo} {initGrid}
  >
  </AppMenu>
  <Grid {...{ gridSize, cellSize, cellList, toggleCrossable }}>
  </Grid>
</main>

<style>
 main {
   display: flex;
   flex-direction: column;
   align-items: center;
 }
</style>
