import { IStateMachine } from './i-state-machine';
import { Player } from '../player';

export interface IStateDefinition {
  key: string;
  fsm: IStateMachine;
  onEnter: (player: Player) => void;
  onUpdate: (player: Player) => void;
  onLeave: (player: Player) => void;
}
