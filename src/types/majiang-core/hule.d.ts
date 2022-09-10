declare module '@kobalab/majiang-core' {
  declare namespace Util {
    /**
     * ``shoupai`` の和了点を計算し、和了情報とともに返す。
     * @remarks
     * ツモ和了の場合は ``shoupai`` はツモ牌を加えた状態で ``rongpai`` は null とする。
     * ロン和了の場合は ``shoupai`` はロン牌を加えない状態で ``rongpai`` はロンした [[牌]] とする。``rongpai`` には誰がロンしたかを示す ``+``(下家から和了)/``=``(対面から和了)/``-``(上家から和了) のフラグを付加する。
     * @param shoupai 手牌
     * @param rongpai 牌
     * @param param 和了点計算に使用する場況情報
     * @returns 和了情報
     */
    function hule(shoupai: Shoupai, rongpai: Pai, param: HuleParam): unknown;

    /**
     * 和了点計算に使用する場況情報
     */
    interface HuleParam {
      /** 和了点計算時に使用するルール。 */
      rule: Rule;
      /** 場風。(``0``: 東、``1``: 南、``2``: 西、``3``: 北) */
      zhuangfeng: number;
      /** 自風。(``0``: 東、``1``: 南、``2``: 西、``3``: 北) */
      menfeng: number;
      /** 状況役 */
      hupai: {
        /** ``0``: リーチなし、``1``: リーチ、``2``: ダブルリーチ。 */
        lizhi: number;
        /** 一発のとき ``true``。 */
        yifa: boolean;
        /** 槍槓のとき ``true``。 */
        qianggang: boolean;
        /** 嶺上開花のとき ``true``。 */
        lingshang: boolean;
        /** ``0``: ハイテイなし、``1``: ハイテイツモ、``2``: ハイテイロン。 */
        haidi: number;
        /** ``0``: 天和/地和なし、``1``: 天和、``2``: 地和。 */
        tianhu: number;
      };
      /** ドラ表示牌の配列。 */
      baopai: Pai[];
      /** 裏ドラ表示牌の配列。リーチのない場合は ``null``。 */
      fubaopai: Pai[] | null;
      /** 供託 */
      jicun: {
        /** 積み棒の本数。 */
        changbang: number;
        /** リーチ棒の本数。 */
        lizhibang: number;
      };
    }
  }
}
