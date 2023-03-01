import { _decorator, Component, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

export enum AudioType{
    flyAudio,
    scoreAudio,
    hitAudio,
    deadAudio
}

@ccclass('AudioController')
export class AudioController extends Component {

    @property (AudioSource)
    audioSource: AudioSource = null;

    @property (AudioClip)
    backgroundClip: AudioClip = null;

    @property (AudioClip)
    flyClip: AudioClip = null;

    @property (AudioClip)
    scoreClip: AudioClip = null;

    @property (AudioClip)
    hitClip: AudioClip = null;

    @property (AudioClip)
    deadClip: AudioClip = null;

    start() {
        this.audioSource = this.getComponent(AudioSource);

        this.audioSource.clip = this.backgroundClip;
        this.audioSource.play();
    }

    update(deltaTime: number) {
        
    }

    public playSound (type: AudioType) {
        if (type == AudioType.flyAudio) {
            this.audioSource.playOneShot(this.flyClip);
        }
        else if (type == AudioType.scoreAudio) {
            this.audioSource.playOneShot(this.scoreClip);
        }
        else if (type == AudioType.hitAudio) {
            this.audioSource.playOneShot(this.hitClip);
        }
        else if (type == AudioType.deadAudio) {
            this.audioSource.playOneShot(this.deadClip);
        }
    }
}


