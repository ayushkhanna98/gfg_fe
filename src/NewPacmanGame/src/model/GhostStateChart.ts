/* eslint-disable @typescript-eslint/ban-types */

import { createMachine, createActor, type StateFrom } from 'xstate';

export const INITIAL_GHOST_STATE = 'scatter';

interface GhostEventHandler {
  onScatterToChase(): void;
  onChaseToScatter(): void;
  onDead(): void;
}

type GhostContext = {};

interface GhostStateSchema {
  states: {
    chase: {};
    scatter: {};
    frightened: {};
    dead: {};
  };
}

export type GhostEventType =
  | { type: 'RESET' }
  | { type: 'ENERGIZER_EATEN' }
  | { type: 'ENERGIZER_TIMED_OUT' }
  | { type: 'PHASE_END' }
  | { type: 'COLLISION_WITH_PAC_MAN' }
  | { type: 'REVIVED' };

export type GhostState = StateFrom<ReturnType<typeof createGhostMachine>>;

const createGhostMachine = (eventHandler: GhostEventHandler) => createMachine({
  id: 'ghost',
  initial: INITIAL_GHOST_STATE,
  states: {
    chase: {
      on: {
        ENERGIZER_EATEN: 'frightened',
        PHASE_END: {
          target: 'scatter',
          actions: 'onChaseToScatter',
        },
        COLLISION_WITH_PAC_MAN: {
          target: 'scatter',
        },
        RESET: 'scatter'
      },
    },
    scatter: {
      on: {
        ENERGIZER_EATEN: 'frightened',
        PHASE_END: {
          target: 'chase',
          actions: 'onScatterToChase',
        },
        COLLISION_WITH_PAC_MAN: {
          target: 'scatter',
        },
        RESET: 'scatter'
      },
    },
    frightened: {
      on: {
        ENERGIZER_TIMED_OUT: 'chase',
        COLLISION_WITH_PAC_MAN: {
          target: 'dead',
          actions: 'onDead',
        },
        RESET: 'scatter'
      },
    },
    dead: {
      on: {
        REVIVED: 'scatter',
        ENERGIZER_TIMED_OUT: 'scatter',
        RESET: 'scatter'
      },
    },
  },
}, {
  actions: {
    onScatterToChase: eventHandler.onScatterToChase,
    onChaseToScatter: eventHandler.onChaseToScatter,
    onDead: eventHandler.onDead,
  },
});

export const makeGhostStateChart = (eventHandler: GhostEventHandler) => {
  const machine = createGhostMachine(eventHandler);
  return createActor(machine);
};
