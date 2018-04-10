export interface IStateComponent<T> {
  onEnter(parent: T);
  onUpdate(parent: T);
  onLeave(parent: T);
}
