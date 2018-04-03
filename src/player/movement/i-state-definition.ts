import { StateMachine } from './state-machine';
import { Player } from '../player';

export interface IStateDefinition {
  key: string;
  fsm: StateMachine;
  onEnter?: (player: Player) => void;
  onUpdate?: (player: Player) => void;
  onLeave?: (player: Player) => void;
}
