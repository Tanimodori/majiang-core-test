declare module '@kobalab/majiang-core' {
  /**
   * 単独の牌を表す文字列
   *
   * @remarks
   * * 1文字目は牌種を表す。`m`: 萬子、`p`: 筒子、`s`: 索子、`z`: 字牌。
   * * 2文字目は牌種内での順序を表す。`0`は赤牌。字牌の場合、`1`〜`4`が風牌、`5`〜`7`が三元牌。
   * * 続く文字が `_` の場合、ツモ切りを表す。打牌と河の中だけでしか意味を持たない。
   * * 続く文字が `*` の場合、リーチ宣言を表す。打牌と河の中だけでしか意味を持たない。
   * * 続く文字が `+` `=` `-` の場合、鳴かれたことを表す。
   * `-`: 下家による鳴き、`=`: 対面による鳴き、`+`: 上家による鳴き。河の中だけでしか意味を持たない。
   * * `_` 1文字の場合裏向きの牌を表すが、ツモと手牌内にある場合しか意味を持たない。
   *
   * ## 例
   * * `m1`: 一萬、`p9`: 九筒、`s0`: 赤五索、`z1`: 東、`z7`: 中
   * * `m3_`: 三萬ツモ切り
   * * `p7*`: 七筒切りリーチ、`p7_*`: 七筒ツモ切りリーチ
   * * `z1=`: 東が対面に鳴かれた、`m2_-`: ツモ切りの二萬が下家に鳴かれた、`p8*+`: リーチ宣言牌の八筒が上家に鳴かれた
   */
  type Pai = string;

  /**
   * 面子(メンツ)を表す文字列
   *
   * @remarks
   * 1文字目は牌種を表す。`m`: 萬子、`p`: 筒子、`s`: 索子、`z`: 字牌。
   * * 数字は牌種内での順序を表す。`0`は赤牌。字牌の場合、`1`〜`4`が風牌、`5`〜`7`が三元牌。
   * * 数字の直後の文字が `+` `=` `-` の場合、鳴いたことを表す。
   * `+`: 下家の打牌を鳴いた、`=`: 対面の打牌を鳴いた、`-`: 上家の打牌を鳴いた。
   * * ポンの場合、`+` `=` `-` は末尾につける。大明槓も同様。
   * * 加槓の場合、ポンの面子の末尾に牌(数字のみ)を付加する。
   * * 数字は`1`から順に並ぶよう正規化する。`0`は`5`の次とする。
   *
   * ## 例
   * * `m1-23`: 萬子一二三を一でチー
   * * `p789-`: 筒子七八九を九でチー
   * * `s505=`: 五索を赤ありで対面からポン
   * * `s5550+`: 赤五索で下家から大明槓
   * * `z666-6`: 發を加槓
   * * `p5500`: 五筒を暗槓(赤は2枚)
   */
  type Menzi = string;

  /**
   * 手牌全体を表す文字列
   *
   * @remarks
   * * 純手牌(副露面子以外の打牌可能な手牌のこと)、副露面子の順に `,` 区切りで並べる。
   * * 純手牌は [[牌]] を並べて表す。同種の牌が続く場合は牌の1文字目を省略する。
   * * 純手牌は、萬子 → 筒子 → 索子 → 字牌(風牌 → 三元牌)の順、同種の牌は数字順に正規化する。`0`は`5`の直前とする。
   * * 手牌が14枚あるとき(あるいはカンしていてそれに準ずる状況のとき)は、純手牌の最後の1枚が今ツモった牌を表す。ツモった牌は牌種を省略しない。
   * * 副露直後も手牌が14枚になるが、ツモ牌はないので牌姿の末尾に `,` を付与することで上記と異なる表現とする。
   * * リーチ後は純手牌の末尾に `*` を付与し区別する。
   * * 副露面子は副露順に [[面子]] を`,` 区切りで並べる。
   * * 純手牌内の `_` は、伏せられていて不明な牌を表す。
   *
   * ## 例
   * * `m055z7z7,m78-9,z5555,z666=`: 中をツモったところ
   * * `m055z77,m78-9,z5555,z666=,`: 上記と似ているが、末尾に `,` があるので發をポンした直後
   * * `m123p055s789z1117*`: リーチ後
   * * `m123s789z1117*,p5550`: 上記の牌姿から五筒をツモって暗槓した直後(リンシャン牌はまだツモっていない)
   * * `_____________`: 配牌直後の他者の手牌
   */
  type Paizi = string;

  /**
   * 1戦分の対局記録を表すJSON形式データ
   *
   * @remarks
   * 東南戦、東風戦、一局戦を問わず順位が確定する単位で模打を記録する。
   * リーグ戦などのシリーズ対局も1戦ごとの牌譜を配列に収めることで表現できるが、その形式については規定しない。
   *
   * @example
   * ```JavaScript
   * {
   *     title:  "第十期 天鳳名人戦\n第一節 1卓(1)",
   *     player: [ "（≧▽≦）\n(天鳳位 R2242)",
   *               "Ⓟ木原浩一\n(新人 R1500)",
   *               "太くないお\n(天鳳位 R2224)",
   *               "Ⓟ小林剛\n(新人 R1500)" ],
   *     qijia:  0,
   *     log:    [], // 対局情報
   *     defen:  [ 9100, 23100, 36400, 51400 ],
   *     rank:   [ 4, 3, 2, 1 ],
   *     point:  [ "-90.9", "-6.9", "26.4", "71.4" ]
   * }
   * ```
   */
  interface Paipu {
    /**
     * 牌譜のタイトル。改行を含めてもよい。改行を含む場合は1行目をリーグ戦名、2行目以降を節名や開催日などにすることを推奨する。
     **/
    title: string;
    /**
     * 対局者情報。仮東から順に並べる。個々の対局者情報には改行を含めてもよい。改行を含む場合は1行目を個人を特定できる情報とし、2行目以降に段位や通算獲得ポイントなどの付加情報とすることを推奨する。
     */
    player: string[];
    /**
     * 起家。`0`: 仮東、`1`: 仮南、`2`: 仮西、`3`: 仮北。仮東の概念のない対局では第一局の東家を仮東とし、**`qijia`** に `0` を設定すればよい。
     */
    qijia: number;
    /**
     * 対局情報。東一局からオーラスまでの各局の局情報の配列。
     */
    log: Ju[];
    /**
     * 終了時の持ち点。仮東から順に並べる。
     */
    defen: number[];
    /**
     * 着順。`1`: トップ ～ `4`: ラス。仮東から順に並べる。
     */
    rank: number[];
    /**
     * 順位点を含めたポイント。小数点以下の桁数に意味がある場合もあるので文字列形式。仮東から順に並べる。
     */
    point: string[];
  }

  /**
   * 局情報
   *
   * @remarks
   * 配牌から和了あるいは流局までの模打情報の配列。
   */
  type Ju = Moda[];

  /**
   * 模打情報
   */
  type Moda = Array<
    | Qipai // 配牌情報
    | Zimo // 自摸情報
    | Dapai // 打牌情報
    | Fulou // 副露情報
    | Gang // 槓情報
    | Gangzimo // 槓自摸情報
    | Kaigang // 開槓情報
    | Hule // 和了情報
    | Pingju // 流局情報
  >;

  /**
   * 配牌情報
   * @see {@link Moda}
   * @example
   * ```JavaScript
   * { qipai: {
   *     zhuangfeng: 0,
   *     jushu:      0,
   *     changbang:  0,
   *     lizhibang:  0,
   *     defen:      [ 30000, 30000, 30000, 30000 ],
   *     baopai:     "s5",
   *     shoupai:    [ "m478p33089s6z1257",
   *                   "m19p1389s1299z255",
   *                   "m67p68s1346789z17",
   *                   "m14689p377s07z346"  ]
   * } }
   * ```
   */
  interface Qipai {
    qipai: {
      /**
       * 場風。(`0`: 東、`1`: 南、`2`: 西、`3`: 北)
       */
      zhuangfeng: number;
      /**
       * 局数。(`0`: 一局、`1`: 二局、`2`: 三局、`3`: 四局)
       */
      jushu: number;
      /**
       * 本場。
       */
      changbang: number;
      /**
       * その局開始時の供託リーチ棒の数。
       */
      lizhibang: number;
      /**
       * その局開始時の対局者の持ち点。その局の東家から順に並べる。
       */
      defen: number[];
      /**
       * ドラ表示{@link Pai | 牌}。
       */
      baopai: Pai;
      /**
       * 配牌の{@link Paizi | 牌姿}。その局の東家から順に並べる。
       */
      shoupai: Paizi[];
    };
  }

  /**
   * 自摸情報
   * @see {@link Moda}
   * @example
   * ```JavaScript
   * { zimo: { l: 0, p: "m4" } }
   * ```
   */
  interface Zimo {
    zimo: {
      /**
       * 手番。(`0`: 東家、`1`: 南家、`2`: 西家、`3`: 北家)
       */
      l: number;
      /**
       * ツモった{@link Pai | 牌}。
       */
      p: Pai;
    };
  }

  /**
   * 打牌情報
   * @see {@link Moda}
   * @example
   * ```JavaScript
   * { dapai: { l: 1, p: "z2*" } }
   * ```
   */
  interface Dapai {
    dapai: {
      /**
       * 手番。(`0`: 東家、`1`: 南家、`2`: 西家、`3`: 北家)
       */
      l: number;
      /**
       * 切った{@link Pai | 牌}。
       */
      p: Pai;
    };
  }

  /**
   * 副露情報
   * @see {@link Moda}
   * @example
   * ```JavaScript
   * { fulou: { l: 0, m: "m567-" } }
   * ```
   */
  interface Fulou {
    fulou: {
      /**
       * 手番。(`0`: 東家、`1`: 南家、`2`: 西家、`3`: 北家)
       */
      l: number;
      /**
       * 副露した{@link Menzi | 面子}。
       */
      m: Menzi;
    };
  }

  /**
   * 槓情報
   * @see {@link Moda}
   * @example
   * ```JavaScript
   * { gang: { l: 1, m: "z222-2" } }
   * ```
   */
  interface Gang {
    gang: {
      /**
       * 手番。(`0`: 東家、`1`: 南家、`2`: 西家、`3`: 北家)
       */
      l: number;
      /**
       * 槓した{@link Menzi | 面子}。大明槓は副露として扱うので、ここでの槓は暗槓もしくは加槓。
       */
      m: Menzi;
    };
  }

  /**
   * 槓自摸情報
   * @see {@link Moda}
   * @example
   * ```JavaScript
   * { gangzimo: { l: 1, p: "m9" } }
   * ```
   */
  interface Gangzimo {
    gangzimo: {
      /**
       * 手番。(`0`: 東家、`1`: 南家、`2`: 西家、`3`: 北家)
       */
      l: number;
      /**
       * ツモった{@link Pai | 牌}。
       */
      p: Pai;
    };
  }

  /**
   * 開槓情報
   * @see {@link Moda}
   * @example
   * ```JavaScript
   * { kaigang: { baopai: "p7" } }
   * ```
   */
  interface Kaigang {
    kaigang: {
      /**
       * 槓ドラ表示{@link Pai | 牌}。
       */
      baopai: Pai;
    };
  }

  /**
   * 和了情報
   * @see {@link Moda}
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
   *
   * ダブロンがあった場合はこの要素が連続する。
   */
  interface Hule {
    hule: {
      /**
       * 和了者。(`0`: 東家、`1`: 南家、`2`: 西家、`3`: 北家)
       */
      l: number;
      /**
       * 和了者の{@link Paizi | 牌姿}。ロン和了の場合は和了牌をツモした牌姿にする。
       */
      shoupai: Paizi;
      /**
       * 放銃者。ツモ和了の場合は `null`。
       */
      baojia: number | null;
      /**
       * 裏ドラ表示{@link Pai | 牌}の配列。リーチでない場合は `null`。
       */
      fubaopai: Pai[];
      /**
       * 符。役満の場合は `undefined`。
       */
      fu?: number;
      /**
       * 翻数。役満の場合は `undefined`。
       */
      fanshu?: number;
      /**
       * 役満複合数。複合には四暗刻をダブル役満にする類のものと、大三元と字一色の複合のような役の複合のケースがある。役満でない場合は `undefined`。
       */
      damanguan?: number;
      /**
       * 和了打点。供託収入は含まない。
       */
      defen: number;
      /**
       * 和了役の配列。それぞれの要素には役名を示す **`name`** と翻数を示す **`fanshu`** がある。役満の場合 **`fanshu`** は数字ではなく、和了役それぞれの役満複合数分の `*` となる。また役満のパオがあった場合は **`baojia`** に責任者を設定する。
役名は任意の文字列なので、ローカル役の採用も可能。
       */
      hupai: Huleyi[];
      /**
       * 供託を含めたその局の点数の収支。その局の東家から順に並べる。リーチ宣言による1000点減は収支に含めない。
       */
      fenpai: number[];
    };
  }

  /** 和了役 */
  type Huleyi = Yibanyi | Yiman;

  /**
   * 一般役
   */
  interface Yibanyi {
    /**
     * 役名
     */
    name: string;
    /**
     * 翻数
     */
    fanshu: number;
  }

  /**
   * 役満
   */
  interface Yiman {
    /**
     * 役名
     * @remarks  役名は任意の文字列なので、ローカル役の採用も可能。
     */
    name: string;
    /**
     * 翻数
     * @remarks  役満の場合は数字ではなく、和了役それぞれの役満複合数分の `*` となる
     */
    fanshu: string;
    /**
     * 役満のパオがあった場合の責任者
     */
    baojia?: number;
  }

  /**
   * 流局情報
   * @see {@link Moda}
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
   */
  interface Pingju {
    pingju: {
      /**
       * 流局理由。
       */
      name: string;
      /**
       * 流局時の手牌。その局の東家から順に並べる。ノーテンなどの理由により手牌を開示しなかった場合は空文字列とする。
       * @see Paizi
       */
      shoupai: Paizi[];
      /**
       * ノーテン罰符などその局の点数の収支。その局の東家から順に並べる。リーチ宣言による1000点減は収支に含めない。
       */
      fenpai: number[];
    };
  }
}
