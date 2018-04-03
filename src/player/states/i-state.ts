import { PlayerStateMachine } from '../player-state-machine';
import { Player } from '../player';

export interface IState{
  key: string;
  psm: PlayerStateMachine;
  onEnter: (player: Player) => void;
  onUpdate: (player: Player) => void;
  onLeave: (player: Player) => void;
}
