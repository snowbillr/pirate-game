import { IStateMachine } from './i-state-machine';

export interface IStateDefinition {
  key: string;
  fsm: IStateMachine;
  onEnter: (player: any) => void;
  onUpdate: (player: any) => void;
  onLeave: (player: any) => void;
}
