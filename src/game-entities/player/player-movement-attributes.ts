import { IGameEntityMovementAttributes } from "../i-game-entity-attributes";

export const PlayerMovementAttributes: IGameEntityMovementAttributes = {
  maxHorizontalVelocity: 350,
  horizontalAcceleration: 900,

  horizontalSlowdownMultiplier: 1.5,

  horizontalSlowdownThreshold: 100,

  horizontalTurnaroundBoostThreshold: 180,
  horizontalTurnaroundBoost: 225,

  jumpVelocity: 600,
}