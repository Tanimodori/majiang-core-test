declare module '@kobalab/majiang-core' {
  /**
   * 局進行の際に {@link Game} と {@link Player} で通信されるJSON形式のデータ
   */
  type ServerMessage = unknown;

  /**
   * 局進行の際に {@link Game} と {@link Player} で通信されるJSON形式のデータ
   */
  type PlayerMessage = unknown;

  /**
   * 開局メッセージ
   * @example
   * ```javascript
   * { kaiju: {
   *     id:     0,
   *     rule:   { "配給原点": 30000,
   *               // ...
   *               "切り上げ満貫あり": false },
   *     title:  "第十期 天鳳名人戦\n第一節 1卓(1)",
   *     player: [ "（≧▽≦）\n(天鳳位 R2242)",
   *               "Ⓟ木原浩一\n(新人 R1500)",
   *               "太くないお\n(天鳳位 R2224)",
   *               "Ⓟ小林剛\n(新人 R1500)" ],
   *     qijia:  0
   * } }
   * ```
   */
  interface KaijuMessage {
    kaiju: {
      /**
       * 席順。(`0`: 仮東、`1`: 仮南、`2`: 仮西、`3`: 仮北)
       */
      id: number;
      /**
       * {@link Rule | ルール}
       */
      rule: Rule;
      /**
       * 牌譜のタイトル。
       */
      title: string;
      /**
       * 対局者情報。仮東から順に並べる。
       */
      player: string[];
      /**
       * 起家。(`0`: 仮東、`1`: 仮南、`2`: 仮西、`3`: 仮北)
       */
      qijia: number;
    };
  }

  /**
   * 配牌メッセージ
   * @remarks
   * 他家の配牌（ **`shoupai`** ）はマスクして通知される。
   * @example
   * ```javascript
   * { qipai: {
   *     zhuangfeng: 0,
   *     jushu:      0,
   *     changbang:  0,
   *     lizhibang:  0,
   *     defen:      [ 30000, 30000, 30000, 30000 ],
   *     baoapi:     "s5",
   *     shoupai:    [ "m478p33089s6z1257","","","" ]
   * } }
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface QipaiMessage extends Qipai {}

  /**
   * 自摸メッセージ
   * @remarks
   * 他家のツモ牌（ **`p`** ）はマスクして通知される。
   * @example
   * ```JavaScript
   * { zimo: { l: 0, p: "m4" } }
   * ```
   * @see {@link Zimo}
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ZimoMessage extends Zimo {}

  /**
   * 打牌メッセージ
   * @example
   * ```JavaScript
   * { dapai: { l: 1, p: "z2*" } }
   * ```
   * @see {@link Dapai}
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DapaiMessage extends Dapai {}

  /**
   * 副露メッセージ
   * @example
   * ```JavaScript
   * { fulou: { l: 0, m: "m567-" } }
   * ```
   * @see {@link Fulou}
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface FulouMessage extends Fulou {}

  /**
   * 槓メッセージ
   * @example
   * ```JavaScript
   * { gang: { l: 1, m: "z222-2" } }
   * ```
   * @see {@link Gang}
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface GangMessage extends Gang {}

  /**
   * 槓メッセージ
   * @example
   * ```JavaScript
   * { gangzimo: { l: 1, p: "m9" } }
   * ```
   * @see {@link Gangzimo}
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface GangzimoMessage extends Gangzimo {}

  /**
   * 開槓メッセージ
   * @example
   * ```JavaScript
   * { kaigang: { baopai: "p7" } }
   * ```
   * @see {@link Kaigang}
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface KaigangMessage extends Kaigang {}

  /**
   * 和了メッセージ
   * @example
   * ```JavaScript
   * { hule: {
   *     l:          1,
   *     shoupai:    "m234p35s123789z33p4*",
   *     baojia:     null,
   *     fubaopai:   [ "s9" ],
   *     fu:         40,
   *     fanshu:     3,
   *     defen:      5200,
   *     hupai:      [ { name: "立直", fanshu: 1 },
   *                   { name: "門前清自模和", fanshu: 1 },
   *                   { name: "裏ドラ", fanshu: 1 } ],
   *     fenpai:     [ -2000, 4000, -1000, -1000 ]
   * } }
   * ```
   *
   * 以下は役満の場合。
   * @example
   * ```JavaScript
   * { hule: {
   *     l:          2,
   *     shoupai:    "p7p7,z111-,z222=,z333+,z444-",
   *     baojia:     3,
   *     fubaopai:   null,
   *     damanguan:  2,
   *     defen:      64000,
   *     hupai:      [ { name: "大四喜", fanshu: "**", baojia: 0 } ],
   *     fenpai:     [ -32000, 0, 64000, -32000 ]
   * } }
   * ```
   * @see {@link Hule}
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface HuleMessage extends Hule {}

  /**
   * 流局メッセージ
   * @example
   * ```JavaScript
   * { pingju: {
   *     name:       "荒牌平局",
   *     shoupai:    [ "",
   *                   "p2234406z333555",
   *                   "",
   *                   "p11223346777z77" ],
   *     fenpai:     [ -1500, 1500, -1500, 1500 ]
   * } }
   * ```
   * @see {@link Pingju}
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PingjuMessage extends Pingju {}

  /**
   * 終局メッセージ
   * @remarks
   * {@link Paipu | 牌譜}を通知する。
   * @example
   * ```JavaScript
   * { jieju: {
   *     // 牌譜
   * } }
   * ```
   */
  interface JiejuMessage {
    jieju: Paipu;
  }
}
