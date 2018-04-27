import { IGameEntityMovementAttributes } from "../i-game-entity-attributes";

export const BaddieMovementAttributes: IGameEntityMovementAttributes = {
  maxHorizontalVelocity: 150,
  horizontalAcceleration: 500,

  horizontalSlowdownMultiplier: 1.5,

  horizontalSlowdownThreshold: 100,

  horizontalTurnaroundBoostThreshold: 180,
  horizontalTurnaroundBoost: 225,

  jumpVelocity: 600,
}