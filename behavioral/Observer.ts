// Базовый класс-издатель. Содержит код управления
// подписчиками и их оповещения.
class EventManager {
    private listeners!: Record<string, EventListenerO[]>;

    subscribe(eventType: string, listener: EventListenerO) {
        this.listeners[eventType].push(listener);
    }
    unsubscribe(eventType: string, listener: EventListenerO) {
        this.listeners[eventType] = this.listeners[eventType].filter(l => l !== listener);
    }
    notify(eventType: string, data: string) {
        if (this.listeners[eventType].length > 0) {
            for (let listener of this.listeners[eventType]) {
                listener.update(data);
            }
        }
    }
}
// Конкретный класс издатель, содержащий интересную для
// других компонентов бизнес-логику. Мы могли бы сделать его
// прямым потомком EventManager, но в реальной жизни это не
// всегда возможно (например, если вы у класса уже есть
// родитель). Поэтому здесь мы подключаем механизм подписки
// при помощи композиции.
class EditorO {
    events: EventManager;
    private file!: FileO;

    constructor() {
        this.events = new EventManager();
    }

    openFile(path: string) {
        this.file = new FileO(path);
        this.events.notify("open", this.file.path);
    }
}

class FileO {
    path: string;

    constructor(path: string) {
        this.path = path;
    }
}
// Общий интерфейс подписчиков. Во многих языках, имеющих
// функциональный типы, можно обойтись без этого интерфейса
// и конкретных классов, заменив объекты подписчиков
// функциями.
interface EventListenerO {
    update(filename: string): void;
}
// Набор конкретных подписчиков. Они реализуют добавочную
// функциональность, реагируя на извещения от издателя.
class LoggingListener {
    private log: FileO;
    private message: string;

    constructor(log_filename: string, message: string) {
        this.log = new FileO(log_filename);
        this.message = message;
    }

    update(filename: string) {
        // Добавить новые логи в файл
    }
}

class EmailAlertsListener {
    private email: string;
    private message: string;

    constructor(email: string, message: string) {
        this.email = email;
        this.message = message;
    }

    update(filename: string) {
        // Отправить сообшение по почте
    }
}
// Приложение может сконфигурировать издателей и подписчиков
// как угодно, в зависимости от целей и конфигурации.
class ApplicationO {
    config() {
        const editor = new EditorO();

        const logger = new LoggingListener(
            "/path/to/log.txt",
            "Someone has opened file: %s"
        );
        editor.events.subscribe("open", logger);

        const emailAlerts = new EmailAlertsListener(
            "admin@example.com",
            "Someone has changed the file: %s"
        );
        editor.events.subscribe("save", emailAlerts);
    }
}