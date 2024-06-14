import { _decorator, BoxCollider2D, CCFloat, Collider2D, Component, Contact2DType, instantiate, IPhysics2DContact, Node, ParticleSystem2D, Prefab, Size, sys, UITransform, Vec2, Vec3 } from 'cc';
import { CoinItem, ItemType } from './CoinItem';
import { AudioManager } from './Audio/AudioManager';
import { AudioPullDownItem } from './Audio/AudioPullDownItem';
import { AudioTouchItem } from './Audio/AudioTouchItem';
import { AudioPullUp1Item } from './Audio/AudioPullUp1Item';
import { AudioPullUp2Item } from './Audio/AudioPullUp2Item';
import { AudioReceiveItem } from './Audio/AudioReceiveItem';
import { eventTarget, GameManager, GameState, playerData } from './GameManager';
import { UIManager } from './UI/UIManager';
import { UIGamePLay } from './UI/UIGamePLay';
import { AudioBom } from './Audio/AudioBom';
const { ccclass, property } = _decorator;

export enum ItemGainType {
    GOLD = 0,
    BOM = 1,
    HEALTH = 2,
    DA = 3,
    DIAMOND = 4,
}

@ccclass('Line')
export class Line extends Component {
    @property(Node)
    colliderLine: Node;

    @property(CCFloat)
    offsetCollider: number;

    @property(CCFloat)
    widthRopeInit: number;

    @property(CCFloat)
    speedRopeDown: number;

    @property(CCFloat)
    speedNoItem: number;

    @property(CCFloat)
    speedBetween: number;

    @property(Prefab)
    boom: Prefab;

    @property(CCFloat)
    heightLine: number;

    @property(CCFloat)
    upSpeed: number;

    private lineSize: UITransform;
    private isThrow: boolean = false;
    private isDown: boolean = false;
    private isPause: boolean = false;
    private speedRopeUp: number;
    private coinGainPerPick: number = 0;
    private itemGain: CoinItem = null;
    collider: Collider2D;
    itemGainType: ItemGainType = ItemGainType.GOLD
    start() {
        this.lineSize = this.node.getComponent(UITransform);
        this.lineSize.contentSize = new Size(this.heightLine, this.widthRopeInit);
        this.collider = this.colliderLine.getComponent(Collider2D)

        if (this.collider != null) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

        }
        eventTarget.on("OnBom", this.onHandleBom, this)
    }

    onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null): void {
        if (other.tag == 2) {
            //Cham vong tron tinh diem
            // this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this.isThrow = false;
            if ((this.coinGainPerPick > 0 || this.itemGainType != ItemGainType.GOLD) && GameManager.Instance.stateGame !== GameState.GS_END && this.itemGainType != null) {
                eventTarget.emit("UpdateCoin", this.coinGainPerPick, this.itemGainType)
            }
            this.node.emit("CollisionCircle");
            if (this.itemGain != null) {
                this.itemGain.onDeActive();
                this.itemGain = null;
            }
            AudioManager.Instance.closeAudio(AudioPullUp1Item, 0);
            AudioManager.Instance.closeAudio(AudioPullUp2Item, 0);
        }
        else if (other.tag == 3) {
            //Cham vat pham
            // this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            if (this.itemGain == null) {
                this.isDown = false;
                this.itemGain = other.getComponent(CoinItem);
                if (parseInt(playerData.healthCount) > 0) {

                    this.speedRopeUp = this.itemGain.getSpeed() * this.upSpeed;
                }
                else {
                    this.speedRopeUp = this.itemGain.getSpeed();
                }
                this.setCoinGainPerPick(this.itemGain)
                this.itemGain.onDespawn(true, self.node);
                AudioManager.Instance.closeAudio(AudioPullDownItem, 0);
                AudioManager.Instance.openAudio(AudioTouchItem);
                AudioManager.Instance.closeAudio(AudioTouchItem, 2);
                if (this.itemGain.speed >= this.speedBetween) {
                    AudioManager.Instance.openAudio(AudioPullUp1Item);
                }
                else {
                    AudioManager.Instance.openAudio(AudioPullUp2Item);

                }

            }
        }
        else if (other.tag == 4) {
            //Cham thanh chan gioi han 
            this.isDown = false;
            this.speedRopeUp = this.speedNoItem;
            this.coinGainPerPick = 0;
            this.itemGainType = null;
            AudioManager.Instance.closeAudio(AudioPullDownItem, 0);
            AudioManager.Instance.openAudio(AudioPullUp1Item);
        }
    }

    setCoinGainPerPick(item: CoinItem) {
        switch (item.typeItem) {
            case ItemType.GOLD:
                this.coinGainPerPick = item.getCoin();
                this.itemGainType = ItemGainType.GOLD;
                break;
            case ItemType.CHUOT:
                this.coinGainPerPick = item.getCoin();
                this.itemGainType = ItemGainType.GOLD;
                break;
            case ItemType.DA:
                if (parseInt(playerData.daCount) > 0) {

                    this.coinGainPerPick = item.getCoin() * 3;
                }
                else {
                    this.coinGainPerPick = item.getCoin();
                }
                this.itemGainType = ItemGainType.GOLD;
                break;
            case ItemType.DIAMOND:
                if (parseInt(playerData.diamondCount) > 0) {

                    this.coinGainPerPick = item.getCoin() * 2;
                }
                else {
                    this.coinGainPerPick = item.getCoin();
                }
                this.itemGainType = ItemGainType.GOLD;
                break;
            case ItemType.BOM:
                this.coinGainPerPick = item.getCoin();
                let bomPaticul = instantiate(this.boom)
                bomPaticul.parent = this.node
                bomPaticul.setWorldPosition(this.itemGain.node.getWorldPosition())
                AudioManager.Instance.openAudio(AudioBom)
                this.itemGainType = ItemGainType.GOLD;
                break;
            case ItemType.LUCKY:
                if (parseInt(playerData.luckyCount) > 0) {
                    this.coinGainPerPick = this.itemGain.getCoin() * this.getRandomNumberInRange(5, 10);
                    this.itemGainType = ItemGainType.GOLD;
                }
                else {

                    let randomIndex = this.getRandomNumberInRange(1, 5);
                    switch (randomIndex) {
                        case 1:
                            //Vang
                            this.coinGainPerPick = this.itemGain.getCoin() * this.getRandomNumberInRange(1, 3);
                            this.itemGainType = ItemGainType.GOLD;
                            break;
                        case 2:
                            //Bom

                            this.coinGainPerPick = 0;
                            this.itemGainType = ItemGainType.BOM;
                            break;
                        case 3:
                            //Diamond

                            this.coinGainPerPick = 0;
                            this.itemGainType = ItemGainType.DIAMOND;
                            break;

                        case 4:
                            //Da

                            this.coinGainPerPick = 0;
                            this.itemGainType = ItemGainType.DA;
                            break;
                        case 5:
                            //Health

                            this.coinGainPerPick = 0;
                            this.itemGainType = ItemGainType.HEALTH;
                            break;


                    }
                }
                break;
        }
    }

    getRandomNumberInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onHandleBom() {
        let countBomPlayer = parseInt(playerData.bomCount);
        if (this.itemGain != null && countBomPlayer > 0) {
            let bomPaticul = instantiate(this.boom)
            AudioManager.Instance.openAudio(AudioBom)
            bomPaticul.parent = this.node
            bomPaticul.setWorldPosition(this.itemGain.node.getWorldPosition())
            this.itemGain.onDeActive();
            this.itemGain = null;
            this.speedRopeUp = this.speedNoItem;
            this.coinGainPerPick = 0;
            playerData.bomCount = countBomPlayer - 1;
            sys.localStorage.setItem("Player", JSON.stringify(playerData));
        }
    }

    onDespawn(active: boolean) {
        this.isThrow = active;
        this.isDown = true;
    }

    public pauseLine(active: boolean) {
        this.isPause = active;
    }

    resetLine() {
        this.isDown = false;
        this.isThrow = false;
        this.lineSize.contentSize = new Size(this.heightLine, this.widthRopeInit);
        this.itemGain = null;
        this.coinGainPerPick = 0
    }

    update(deltaTime: number) {
        this.colliderLine.setPosition(new Vec3(this.colliderLine.getPosition().x, -(this.lineSize.contentSize.height - this.offsetCollider), 0))
        if (this.isThrow && !this.isPause) {
            if (this.isDown) {
                let widthDelta = this.speedRopeDown * deltaTime;
                this.lineSize.contentSize = new Size(this.heightLine, widthDelta + this.lineSize.contentSize.height);
            }
            else {
                let widthDelta = this.speedRopeUp * deltaTime * -1;
                this.lineSize.contentSize = new Size(this.heightLine, widthDelta + this.lineSize.contentSize.height);
            }
        }
    }
}


