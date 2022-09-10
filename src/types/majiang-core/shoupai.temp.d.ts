declare module '@kobalab/majiang-core' {
  /**
   * 手牌を表現するクラス
   */
  class Shoupai {
    /**
     * ``p`` が牌として正しければそのまま返す。正しくなければ ``null`` を返す。
     * ``_`` は正しいと見なさない。
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
    constructor(qipai?: Pai[] = []);

    /**
     * ``paistr`` からインスタンスを生成する。
     * 手牌が14枚を超える牌姿の場合、超える分が純手牌(副露面子以外の打牌可能な手牌のこと)から取り除かれる。
     * @param paistr 牌姿
     * @returns 手牌
     */
    static fromString(paistr: Paizi): Shoupai;

    /**
     * 以下の構成で純手牌の各牌の枚数を示す。添字0は赤牌の枚数。
     * @example
     * ```JavaScript
     * {
     *     _: 0,                       // 伏せられた牌
     *     m: [0,0,0,0,0,0,0,0,0,0],   // 萬子
     *     p: [0,0,0,0,0,0,0,0,0,0],   // 筒子
     *     s: [0,0,0,0,0,0,0,0,0,0],   // 索子
     *     z: [0,0,0,0,0,0,0,0],       // 字牌
     * }
     * ```
     */
    _bingpai: {
      _: number;
      m: number[];
      p: number[];
      s: number[];
      z: number[];
    };

    /**
     * 副露牌を示す面子の配列。副露した順に配列する。
     * 暗槓子も含むので ``_fulou.length == 0`` がメンゼンを示す訳ではないことに注意。
     */
    _fulou: Menzi[];

    /**
     * 手牌が打牌可能な場合、最後にツモしてきた牌あるいは最後に副露した面子。
     * 打牌可能でない場合は ``null``。
     */
    _zimo: Pai | Menzi | null;

    /**
     * リーチ後に ``true`` になる。
     */
    _lizhi: boolean;

    /**
     * 牌姿に変換する。
     * @returns 牌姿
     */
    toString(): Paizi;

    /**
     * 複製する。
     * @returns 手牌
     */
    clone(): Shoupai;

    /**
     * ``paistr`` で手牌を置き換える。
     * @param paistr 牌姿
     * @returns ``this``
     */
    fromString(paistr: Paizi): this;

    /**
     * ``p`` をツモる。
     * @param p 牌
     * @param check 真の場合、多牌となるツモは例外を発生する。
     * @returns ``this``
     * @throws ``check`` が真の場合、多牌となるツモは例外を発生する。
     */
    zimo(p: Pai, check = true): this;

    /**
     * ``p`` を打牌する。
     * @param p 牌
     * @param check 真の場合、少牌となる打牌も例外を発生する。
     * @throws 手牌にない牌あるいは ``_`` の打牌は例外を発生する。
     * @throws ``check`` が真の場合、少牌となる打牌も例外を発生する。
     *
     * リーチ後の手出しはチェックしない。
     */
    dapai(p: Pai, check = true): this;

    /**
     * ``m`` で副露する。
     * @param m 面子
     * @param check 真の場合、多牌となる副露も例外を発生する。
     * @throws ``check`` が真の場合、手牌にない構成での副露は例外を発生する。
     * @throws ``check`` が真の場合、多牌となる副露も例外を発生する。
     *
     * リーチ後の副露はチェックしない。
     */
    fulou(m: Menzi, check = true): this;

    /**
     * ``m`` で暗槓もしくは加槓する。
     * @param m 面子
     * @param check 真の場合、多牌となる副露も例外を発生する。
     * @throws 手牌にない構成での槓は例外を発生する。
     * @throws ``check`` が真の場合、多牌となる副露も例外を発生する。
     *
     * リーチ後の槓の正当性はチェックしない。
     */
    gang(m: Menzi, check = true): this;

    /**
     * メンゼンの場合、``true`` を返す。
     * @returns メンゼンの場合、``true`` を返す。
     */
    get menqian(): boolean;

    /**
     * リーチ後は ``true`` を返す。
     * @returns リーチ後は ``true`` を返す。
     */
    get lizhi(): boolean;

    /**
     * 打牌可能な牌の一覧を返す。赤牌およびツモ切りは別の牌として区別する。
     * @param check 真の場合、喰い替えとなる打牌は含まない。
     * @returns 牌の配列。リーチ後はツモ切りのみ返す。打牌すると少牌となる場合は ``null`` を返す。
     */
    get_dapai(check = true): Pai[] | null;

    /**
     * ``p`` でチー可能な面子の一覧を返す。赤牌のありなしは別の面子として区別する。
     * @param p 牌
     * @param check が真の場合、喰い替えが必ず起きる面子は含まない。
     * @returns 面子の配列。リーチ後は空配列を返す。チーすると多牌になる場合は ``null`` を返す。
     */
    get_chi_mianzi(p: Pai, check = true): Menzi[] | null;

    /**
     * ``p`` でポン可能な面子の一覧を返す。赤牌のありなしは別の面子として区別する。
     * @param p 牌
     * @returns 面子の配列。リーチ後は空配列を返す。ポンすると多牌になる場合は ``null`` を返す。
     */
    get_peng_mianzi(p: Pai): Menzi[] | null;

    /**
     * ``p`` でポン可能な面子の一覧を返す。赤牌のありなしは別の面子として区別する。
     * @param p 牌。
     * * ``p`` が指定された場合、それで大明槓可能な面子の一覧を返す。リーチ後は空配列を返す。
     * * ``p`` が指定されない場合は加槓あるいは暗槓可能な面子の一覧を返す。リーチ後は送り槓は含まない。
     * @returns 面子の配列。カンすると少牌あるいは多牌になる場合は ``null`` を返す。
     */
    get_gang_mianzi(p?: Pai): Menzi[] | null;
  }
}
