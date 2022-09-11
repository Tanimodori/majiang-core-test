declare module '@kobalab/majiang-core' {
  /**
   * 局進行を実現するクラス
   *
   * @remarks
   * インスタンス生成後、{@link Game.kaiju} の呼び出しで対局を開始する。
   * その後は対局者からの応答により非同期に {@link Game.next} が呼ばれることで局が進行する。
   * 対局終了時にはインスタンス生成時に指定したコールバック関数を呼んで処理が終了する。
   *
   * クラスメソッドで進行の妥当性を判断するための関数を提供する。
   * これらのメソッドは {@link Game} 自身が使用するだけでなく、{@link Player} が使用することも想定している。
   */
  class Game {
    /**
     * 指定されたパラメータから対局を生成する。
     * @param players 指定された4名{@link Player | 対局者}の配列
     * @param callback 対局終了時に呼ばれた関数(対局の{@link Paipu | 牌譜}が引数で渡される)。
     * @param rule 指定された{@link Rule | ルール}。省略した場合は、``Majiang.rule()`` の呼び出しで得られるルールの初期値が採用される。
     * @param title 牌譜に残すタイトル
     */
    constructor(players: Player[], callback?: (paipu: Paipu) => void, rule?: Rule, title?: string);

    /**
     * {@link Shoupai.get_dapai} を呼び出し、``rule`` にしたがって ``shoupai`` から打牌可能な牌の一覧を返す。
     * @param rule {@link Rule | ルール}
     * @param shoupai {@link Shoupai | 手牌}
     * @returns 打牌可能な{@link Pai | 牌}の配列
     */
    static get_dapai(rule: Rule, shoupai: Shoupai): Pai;

    /**
     * {@link Shoupai.get_chi_mianzi} を呼び出し、``rule`` にしたがって ``shoupai`` から ``p`` でチー可能な面子の一覧を返す。
     * @param rule {@link Rule | ルール}
     * @param shoupai {@link Shoupai | 手牌}
     * @param p {@link Pai | 牌}
     * @param paishu 現在の残り牌数
     * @returns チー可能な{@link Menzi | 面子}の配列
     */
    static get_chi_mianzi(rule: Rule, shoupai: Shoupai, p: Pai, paishu: number): Menzi[];

    /**
     * {@link Shoupai.get_peng_mianzi} を呼び出し、``rule`` にしたがって ``shoupai`` から ``p`` でポン可能な面子の一覧を返す。
     * @param rule {@link Rule | ルール}
     * @param shoupai {@link Shoupai | 手牌}
     * @param p {@link Pai | 牌}
     * @param paishu 現在の残り牌数
     * @returns ポン可能な{@link Menzi | 面子}の配列
     */
    static get_peng_mianzi(rule: Rule, shoupai: Shoupai, p: Pai, paishu: number): Menzi[];

    /**
     * {@link Shoupai.get_gang_mianzi} を呼び出し、``rule`` にしたがって ``shoupai`` から ``p`` でカン可能な面子の一覧を返す。
     * @param rule {@link Rule | ルール}
     * @param shoupai {@link Shoupai | 手牌}
     * @param p {@link Pai | 牌}。指定された場合は大明槓、``null`` の場合は暗槓と加槓が対象になる。
     * @param paishu 現在の残り牌数
     * @param n_gang その局に行われた槓の数
     * @returns カン可能な{@link Menzi | 面子}の配列
     */
    static get_gang_mianzi(rule: Rule, shoupai: Shoupai, p: Pai, paishu: number, n_gang: number): Menzi[];
  }
}
