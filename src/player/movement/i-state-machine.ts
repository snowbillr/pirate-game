import { IStateDefinition } from './i-state-definition';

export interface IStateMachine {
  states;
  transition: (to: IStateDefinition) => void
}