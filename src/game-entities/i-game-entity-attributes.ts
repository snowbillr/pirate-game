export interface IGameEntityMovementAttributes {
  maxHorizontalVelocity: number;
  horizontalAcceleration: number;

  horizontalSlowdownMultiplier: number;

  horizontalSlowdownThreshold: number;

  horizontalTurnaroundBoostThreshold: number;
  horizontalTurnaroundBoost: number;

  jumpVelocity: number;
}