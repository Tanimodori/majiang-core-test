declare module '@kobalab/majiang-core' {
  /**
   * 捨て牌を表現するクラス
   */
  class He {
    /**
     * インスタンスを生成する。
     */
    constructor();

    /**
     * 捨てられた牌を表す配列。
     */
    _pai: Pai[];

    /**
     * 特定の牌が捨て牌にあるか判定するためのキャッシュ。
     */
    _find: Record<Pai, boolean>;

    /**
     * **`p`** を捨て牌に追加する。
     * @param p 牌
     * @returns `this`
     */
    dapai(p: Pai): this;

    /**
     * **`m`** で副露された状態にする。
     * @param m 面子
     * @returns `this`
     */
    fulou(m: Menzi): this;

    /**
     * **`p`** が捨て牌にあるとき `true` を返す。
     *  手出し/ツモ切り、赤牌か否かは無視し、フリテンとなるか否かの観点で判定する。
     * @param p 牌
     * @returns **`p`** が捨て牌にあるとき `true` を返す。
     */
    find(p: Pai): boolean;
  }
}
