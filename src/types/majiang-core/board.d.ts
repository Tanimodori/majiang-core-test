declare module '@kobalab/majiang-core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Board extends BoardInfo {}

  class Board implements BoardInfo {
    constructor(kaiju?: Paipu | KaijuGameMessage);
  }
}
