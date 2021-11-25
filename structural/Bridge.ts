// Класс пультов имеет ссылку на устройство, которым
// управляет. Методы этого класса делегируют работу методам
// связанного устройства.
class Remote {
    protected device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    togglePower() {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }
    volumeDown() {
        this.device.setVolume(
            (this.device.getVolume() > 9) ? this.device.getVolume() - 10
            : 0);
    }
    volumeUp() {
        this.device.setVolume(
            (this.device.getVolume() < 91) ? this.device.getVolume() + 10
                : 100);
    }
    channelDown() {
        this.device.setChannel(this.device.getChannel() - 1);
    }
    channelUp() {
        this.device.setChannel(this.device.getChannel() + 1);
    }
}
// Вы можете расширять класс пультов не трогая
// код устройств.
class AdvancedRemote extends Remote {
    mute() {
        this.device.setVolume(0);
    }
}
// Все устройства имеют общий интерфейс. Поэтому с ними
// может работать любой пульт.
interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(percent: number): void;
    getChannel(): number;
    setChannel(channel: number): void;
}
// Но каждое устройство имеет особую реализацию.

// class TV implements Device {
//     // ...
// }
//
// class Radio implements Device {
//     // ...
// }
//
// const tv = new TV();
// const remoteTV = new Remote(tv);
// remoteTV.power();
//
// const radio = new Radio();
// const remoteRadio = new AdvancedRemote(radio);


















