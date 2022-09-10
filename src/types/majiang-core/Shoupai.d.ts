declare module '@kobalab/majiang-core' {
  /**
   * 手牌を表現するクラス
   */
  class Shoupai {
    /**
     * ``p`` が牌として正しければそのまま返す。正しくなければ ``null`` を返す。
``_`` は正しいと見なさない。
     * @param p 牌
     * @returns 牌
     * @see Pai
     */
    static valid_pai(p: Pai): Pai | null;
    /**
     * ``m``が面子として正しければ正規化して返す。正しくなければ ``null`` を返す。
     * @param m 面子
     * @returns 面子
     */
    static valid_mianzi(m: Menzi): Menzi | null;

    /**
     * ``qipai`` (配牌)からインスタンスを生成する。``qipai`` の要素数は13でなくてもよい。
     * @param qipai 牌の配列
     */
    constructor(qipai?: Pai[]);

    /**
     * ``paistr`` からインスタンスを生成する。手牌が14枚を超える牌姿の場合、超える分が純手牌(副露面子以外の打牌可能な手牌のこと)から取り除かれる。
     * @param paistr 牌姿
     * @returns 生成する手牌
     */
    static fromString(paistr: Paizi): Shoupai;
  }
}
