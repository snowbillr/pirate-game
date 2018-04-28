export interface IState {
  key: string;

  onEnter?(transition?: (toKey: string) => void): void;
  onUpdate?(transition?: (toKey: string) => void): void;
  onLeave?(transition?: (toKey: string) => void): void;
}