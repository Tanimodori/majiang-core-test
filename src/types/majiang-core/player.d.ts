declare module '@kobalab/majiang-core' {
  /**
   * 対局者を実現する基底クラス
   * 唯一のメソッド {@link Player.action} の非同期呼び出しで受信した {@link GameMessage} に対して行動を決定し、 {@link PlayerMessage} を応答する。
   * 本クラスは抽象クラスであり、{@link Player.action} から各メッセージに対応するメソッドを呼び出すが、そのメソッドは [[卓情報]] を更新するのみの実装である。卓情報から具体的な行動を決定し、応答を返す処理はサブクラスで実装する必要がある。
   */
  class Player {
    /**
     * **`_model`** に空の卓情報をもつインスタンスを生成する。
     */
    constructor();

    /**
     * **`msg`** に対応するメソッドを呼び出す。
     * @param msg {@link GameMessage}
     * @param callback 呼び出し関数
     */
    action(msg: GameMessage, callback: (reply: PlayerMessage) => void): void;

    /**
     * {@link KaijuGameMessage} で通知された自身の席順(`0`: 仮東、`1`: 仮南、`2`: 仮西、`3`: 仮北)。
     */
    _id: number;

    /**
     * {@link Player.action} 呼び出し時に指定された応答送信用関数。
     */
    _callback: (reply: PlayerMessage) => void;

    /**
     * {@link KaijuGameMessage} で通知された対局の{@link Rule | ルール}
     */
    _rule: Rule;

    /**
     * {@link Board} で設定する{@link BoardInfo | 卓情報}。
     */
    _model: BoardInfo;

    /**
     * 現在の局の自風。(`0`: 東、`1`: 南、`2`: 西、`3`: 北)
     */
    _menfeng: number;

    /**
     * 第一ツモ巡の間は `true`。
     */
    _diyizimo: boolean;

    /**
     * 現在の局で全ての対局者が行ったカンの総数。
     */
    _n_gang: number;

    /**
     * 自身のフリテン状態。ロン和了可能なら `true`。
     */
    _neng_rong: boolean;

    /**
     * {@link JiejuGameMessage}で伝えられた対戦結果の{@link Paipu | 牌譜}
     */
    _paipu: Paipu;

    /**
     * **`kaiju`** から{@link BoardInfo | 卓情報}を初期化し、{@link Player.action_kaiju}を呼び出し応答を返す。
     * @param kaiju {@link KaijuGameMessage}
     * @internal
     */
    kaiju(kaiju: KaijuGameMessage['kaiju']): void;

    /**
     * **`qipai`** から{@link BoardInfo | 卓情報}を設定し、{@link Player.action_qipai}を呼び出し応答を返す。
     * @param qipai {@link QipaiGameMessage}
     * @internal
     */
    qipai(qipai: QipaiGameMessage['qipai']): void;

    /**
     * **`zimo`** から{@link BoardInfo | 卓情報}を設定し、{@link Player.action_zimo}を呼び出し応答を返す。
     * @param zimo {@link ZimoGameMessage} (もしくは {@link GangzimoGameMessage})
     * @param gangzimo 真の場合は槓自摸を表す。
     * @internal
     */
    zimo(zimo: ZimoGameMessage['zimo'], gangzimo: boolean): void;

    /**
     * **`dapai`** から{@link BoardInfo | 卓情報}を設定し、{@link Player.action_dapai}を呼び出し応答を返す。
     * @param dapai {@link DapaiGameMessage}
     * @internal
     */
    dapai(dapai: DapaiGameMessage['dapai']): void;

    /**
     * **`fulou`** から{@link BoardInfo | 卓情報}を設定し、{@link Player.action_fulou}を呼び出し応答を返す。
     * @param fulou {@link FulouGameMessage}
     * @internal
     */
    fulou(fulou: FulouGameMessage['fulou']): void;

    /**
     * **`gang`** から{@link BoardInfo | 卓情報}を設定し、{@link Player.action_gang}を呼び出し応答を返す。
     * @param gang {@link GangGameMessage}
     * @internal
     */
    gang(gang: GangGameMessage['gang']): void;

    /**
     * **`kaigang`** から{@link BoardInfo | 卓情報}を設定する。
     * @param kaigang {@link KaigangGameMessage}
     * @internal
     */
    kaigang(kaigang: KaigangGameMessage['kaigang']): void;

    /**
     * **`hule`** から{@link BoardInfo | 卓情報}を設定し、{@link Player.action_hule}を呼び出し応答を返す。
     * @param hule {@link HuleGameMessage}
     * @internal
     */
    hule(hule: HuleGameMessage['hule']): void;

    /**
     * **`pingju`** から{@link BoardInfo | 卓情報}を設定し、{@link Player.action_pingju}を呼び出し応答を返す。
     * @param pingju {@link PingjuGameMessage}
     * @internal
     */
    pingju(pingju: PingjuGameMessage['pingju']): void;

    /**
     * {@link Player.action_jieju}を呼び出し応答を返す。
     * @param jieju {@link Paipu | 牌譜}
     * @internal
     */
    jieju(paipu: Paipu): void;
  }
}
