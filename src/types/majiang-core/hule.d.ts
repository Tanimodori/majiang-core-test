declare module '@kobalab/majiang-core' {
  declare namespace Util {
    /**
     * ``shoupai`` の和了点を計算し、和了情報とともに返す。
     * @remarks
     * ツモ和了の場合は ``shoupai`` はツモ牌を加えた状態で ``rongpai`` は null とする。
     * ロン和了の場合は ``shoupai`` はロン牌を加えない状態で ``rongpai`` はロンした [[牌]] とする。``rongpai`` には誰がロンしたかを示す ``+``(下家から和了)/**=``(対面から和了)/**-``(上家から和了) のフラグを付加する。
     * @param shoupai 手牌
     * @param rongpai 牌
     * @param param 和了点計算に使用する場況情報
     * @returns 和了情報
     */
    function hule(shoupai: Shoupai, rongpai: Pai, param: HuleParam): HuleResult;

    /**
     * 和了点計算に使用する場況情報
     * @example
     * 以下の構造のオブジェクトである。
     * ```JavaScript
     * {
     *     rule:           Majiang.rule(),
     *     zhuangfeng:     0,
     *     menfeng:        0,
     *     hupai: {
     *         lizhi:      0,
     *         yifa:       false,
     *         qianggang:  false,
     *         lingshang:  false,
     *         haidi:      0,
     *         tianhu:     0
     *     },
     *     baopai:         [ 'm1' ],
     *     fubaopai:       null,
     *     jicun: {
     *         changbang:  0,
     *         lizhibang:  0
     *     }
     * }
     * ```
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

  /**
   * 和了情報
   * @example
   * 以下の構造のオブジェクトである。
   * ```JavaScript
   * {
   *     hupai:      [ { name: "立直", fanshu: 1 },
   *                   { name: "門前清自模和", fanshu: 1 },
   *                   { name: "裏ドラ", fanshu: 1 } ],
   *     fu:         40,
   *     fanshu:     3,
   *     damanguan:  null,
   *     defen:      5200,
   *     fenpei:     [ -2600, 6200, -1300, -1300 ]
   * }
   */
  interface HuleResult {
    /**
     * 和了役の配列。それぞれの要素には役名を示す ``name`` と翻数を示す ``fanshu`` がある。
     * 役満の場合 ``fanshu`` は数字ではなく、和了役それぞれの役満複合数分の ``*`` となる。
     * また役満のパオがあった場合は ``baojia`` に責任者を設定する。
     */
    hupai: Huleyi[];
    /**
     * 符。役満の場合は ``undefined``。
     */
    fu?: number;
    /**
     * 翻数。役満の場合は ``undefined``。
     */
    fanshu?: number;
    /**
     * 役満複合数。
     * 複合には四暗刻をダブル役満にする類のものと、大三元と字一色の複合のような役の複合のケースがある。
     * 役満でない場合は ``undefined``。
     */
    damanguan?: number;
    /**
     * 和了打点。供託収入は含まない。
     */
    defen: number;
    /**
     * 供託を含めたその局の点数の収支。
     * その局の東家から順に並べる。
     * リーチ宣言による1000点減は収支に含めない。
     */
    fenpai: number[];
  }
}
