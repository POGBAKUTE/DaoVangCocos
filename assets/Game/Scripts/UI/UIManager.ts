import { _decorator, Component, Node } from 'cc';
import { UICanvas } from './UICanvas';
import { UIGamePLay } from './UIGamePLay';
import { UIHome } from './UIHome';
import { UISetting } from './UISetting';
import { UIVictory } from './UIVictory';
import { UIFail } from './UIFail';
import { UIEnd } from './UIEnd';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    public static Instance: UIManager = null

    @property(UICanvas)
    public uIHome: UIHome = null;

    @property(UICanvas)
    public uIGamePLay: UIGamePLay = null;
    
    @property(UICanvas)
    public uISetting: UISetting = null;

    @property(UICanvas)
    public uIVictory: UIVictory = null;

    @property(UICanvas)
    public uIFail: UIFail = null;

    @property(UICanvas)
    public uIEnd: UIEnd = null;

    onLoad() {
        UIManager.Instance = this;
    }

    protected start(): void {
        this.uIHome.open();
        this.uIGamePLay.close(0);
        this.uISetting.close(0);
        this.uIVictory.close(0);
        this.uIFail.close(0);
        this.uIEnd.close(0);
    }
}


