// Общий интерфейс всех состояний.
abstract class State {
    protected player: Player;
    // Контекст передаёт себя в конструктор состояния, чтобы
    // состояние могло обращаться к его данным и методам в
    // будущем, если потребуется.
    constructor(player: Player) {
        this.player = player;
    }

    abstract clickLock();
    abstract clickPlay();
    abstract clickNext();
    abstract clickPrevious();
}
// Конкретные состояния реализуют методы абстрактного
// состояния по-своему.
class LockedState extends State {
    // При разблокировке проигрователя с заблокированными
    // клавишами, он может принять одно из двух состояний.
    clickLock() {
        // условное поле playing содержит булево значение и изменяется
        // в зависимости от состояния
        if (this.player.playing) {
            this.player.changeState(new PlayingState(this.player));
        } else {
            this.player.changeState(new ReadyStateS(this.player));
        }
    }
    clickPlay() {
        // Ничего не делать.
    }
    clickNext() {
        // Ничего не делать.
    }
    clickPrevious() {
        // Ничего не делать.
    }
}
// Они также могут переводить контекст в другие состояния.
class ReadyStateS extends State {
    clickLock() {
        this.player.changeState(new LockedState(this.player));
    }
    clickPlay() {
        this.player.startPlayback();
        this.player.changeState(new PlayingState(this.player));
    }
    clickNext() {
        this.player.nextSong();
    }
    clickPrevious() {
        this.player.previousSong();
    }
}

class PlayingState extends State {
    clickLock() {
        this.player.changeState(new LockedState(this.player));
    }
    clickPlay() {
        this.player.startPlayback();
        this.player.changeState(new ReadyStateS(this.player));
    }
    clickNext() {
        // yсловный объект события со свойством doubleclick,
        // которое содержит значение булевого типа
        if (e.doubleclick) {
            this.player.nextSong();
        } else {
            this.player.fastForward(5);
        }
    }
    clickPrevious() {
        if (e.doubleclick) {
            this.player.previousSong();
        } else {
            this.player.rewind(5);
        }
    }
}
// Проигрыватель играет роль контекста.
class Player {
    state: State;
    UI: UserInterface;
    volume: number;
    playlist: Array<string>;
    currentSong: string;

    constructor() {
        this.state = new ReadyStateS(this);
        // Контекст заставляет состояние реагировать на
        // пользовательский ввод вместо себя. Реакция может
        // быть разной в зависимости от того, какое
        // состояние сейчас активно.
        this.UI = new UserInterface();
        this.UI.lockButton.onClick(this.clickLock);
        this.UI.playButton.onClick(this.clickPlay);
        this.UI.nextButton.onClick(this.clickNext);
        this.UI.prevButton.onClick(this.clickPrevious);
    }
    // Другие объекты должны иметь возможность заменить
    // состояние проигрывателя.
    changeState(state: State) {
        this.state = state;
    }
    // Методы UI будут делегировать работу
    // активному состоянию.
    clickLock() {
        this.state.clickLock();
    }
    clickPlay() {
        this.state.clickPlay();
    }
    clickNext() {
        this.state.clickNext();
    }
    clickPrevious() {
        this.state.clickPrevious();
    }
    // Сервисные методы контекста, вызываемые состояниями.
    startPlayback() {
        //...
    }
    stopPlayback() {
        //...
    }
    nextSong() {
        //...
    }
    previousSong() {
        //...
    }
    fastForward(time: number) {
        //...
    }
    rewind(time: number) {
        //...
    }
}