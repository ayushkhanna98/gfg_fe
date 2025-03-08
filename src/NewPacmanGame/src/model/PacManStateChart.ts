/* eslint-disable @typescript-eslint/ban-types */

import { createMachine, createActor, type StateFrom } from 'xstate';

export const INITIAL_PACMAN_STATE = 'eating';

interface EventHandler {
  onChasing(): void;
  onDead(): void;
}

type PacManContext = {};

interface PacManStateSchema {
  states: {
    eating: {};
    chasing: {};
    dead: {};
  };
}

export type PacManEventType =
  | { type: 'ENERGIZER_EATEN' }
  | { type: 'ENERGIZER_TIMED_OUT' }
  | { type: 'COLLISION_WITH_GHOST' }
  | { type: 'REVIVED' };

const createPacManMachine = (eventHandler: EventHandler) => createMachine({
  id: 'pac-man',
  initial: INITIAL_PACMAN_STATE,
  states: {
    eating: {
      on: {
        ENERGIZER_EATEN: 'chasing',
        COLLISION_WITH_GHOST: 'dead',
      },
    },
    chasing: {
      entry: 'onChasing',
      on: {
        ENERGIZER_TIMED_OUT: 'eating',
      },
    },
    dead: {
      entry: 'onDead',
      on: {
        REVIVED: 'eating',
      },
    },
  },
}, {
  actions: {
    onChasing: eventHandler.onChasing,
    onDead: eventHandler.onDead,
  },
});

export type PacManState = StateFrom<ReturnType<typeof createPacManMachine>>;

export const makePacManStateChart = (eventHandler: EventHandler) => {
  const machine = createPacManMachine(eventHandler);
  return createActor(machine);
};
