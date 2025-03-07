// import { makeGhostStateChart } from './GhostStateChart';

// describe('GhostStateChart', () => {
//   let ghostStateChart: ReturnType<typeof makeGhostStateChart>;

//   beforeEach(() => {
//     ghostStateChart = makeGhostStateChart({
//       onScatterToChase: () => {},
//       onChaseToScatter: () => {},
//       onDead: () => {},
//     });
//     ghostStateChart.start();
//   });

//   it('starts in scatter state', () => {
//     expect(ghostStateChart.getSnapshot().value).toBe('scatter');
//   });

//   it('reacts to energizer', () => {
//     expect(ghostStateChart.getSnapshot().value).toBe('scatter');

//     ghostStateChart.send('ENERGIZER_EATEN');
//     expect(ghostStateChart.getSnapshot().value).toBe('frightened');

//     ghostStateChart.send('ENERGIZER_TIMED_OUT');
//     expect(ghostStateChart.getSnapshot().value).toBe('chase');
//   });

//   it('reacts to collision with Pac Man', () => {
//     ghostStateChart.send('PHASE_END');
//     expect(ghostStateChart.getSnapshot().value).toBe('chase');

//     ghostStateChart.send('ENERGIZER_EATEN');
//     expect(ghostStateChart.getSnapshot().value).toBe('frightened');

//     ghostStateChart.send('COLLISION_WITH_PAC_MAN');
//     expect(ghostStateChart.getSnapshot().value).toBe('dead');

//     ghostStateChart.send('REVIVED');
//     expect(ghostStateChart.getSnapshot().value).toBe('scatter');
//   });

//   it('reacts to phase timeout', () => {
//     expect(ghostStateChart.getSnapshot().value).toBe('scatter');

//     ghostStateChart.send('PHASE_END');
//     expect(ghostStateChart.getSnapshot().value).toBe('chase');

//     ghostStateChart.send('PHASE_END');
//     expect(ghostStateChart.getSnapshot().value).toBe('scatter');
//   });

//   it('reacts to RESET', () => {
//     expect(ghostStateChart.getSnapshot().value).toBe('scatter');

//     ghostStateChart.send('PHASE_END');
//     expect(ghostStateChart.getSnapshot().value).toBe('chase');

//     ghostStateChart.send('RESET');
//     expect(ghostStateChart.getSnapshot().value).toBe('scatter');
//   });
// });
