const os = require("os");

// Паттерн Фабричный Метод применим тогда, когда есть
// иерархия классов продуктов.
interface ButtonFM {
    // Для упрощения примера определим типы аргументов
    // и возвращаемое значение как строки
    render(a: string, b: string): string;
    onClick(f: string): void;
}

class WindowsButton implements ButtonFM {
    render(a: string, b: string) {
        // Отрисовать кнопку в стиле Windows.
        return "WindowsButton";
    }
    onClick(f: string) {
        // Навесить на кнопку обработчик события Windows.
    }
}

class LinuxButton implements ButtonFM {
    render(a: string, b: string) {
        // Вернуть HTML-код кнопки.
        return "LinuxButton";
    }
    onClick(f: string) {
        // Навесить на кнопку обработчик события Linux.
    }
}
// Базовый класс фабрики. "Фабрика" – это
// всего лишь дополнительная роль для класса. Он уже имеет
// какую-то бизнес-логику, в которой требуется создание
// разнообразных продуктов.
abstract class Dialog {
    renderWindow() {
        const okButton: ButtonFM = this.createButton();
        okButton.onClick("closeDialog");
        okButton.render("a_arg", "b_arg");
    }
    // Мы выносим весь код создания продуктов в особый
    // Фабричный метод.
    abstract createButton(): ButtonFM;
}
// Конкретные фабрики переопределяют фабричный метод и
// возвращают из него собственные продукты.
class WindowsDialog extends Dialog {
    renderWindow() {
        super.renderWindow();
    }
    createButton(): ButtonFM {
        return new WindowsButton();
    }
}

class LinuxDialog extends Dialog {
    renderWindow() {
        super.renderWindow();
    }
    createButton(): ButtonFM {
        return new LinuxButton();
    }
}

class ClientApplication {
    dialog!: Dialog;

    constructor() {
        this.main();
    }
    // Приложение создаёт определённую фабрику в зависимости
    // от конфигурации или окружения.
    initialize() {
        const osType: string = os.type();

        if (osType.startsWith("Windows")) {
            this.dialog = new WindowsDialog();
        } else if (osType.startsWith("Linux")) {
            this.dialog = new LinuxDialog();
        } else
            throw new Error("Error! Unknown operating system.")
    }
    // Весь остальной клиентский код работает с фабрикой и
    // продуктами только через общий интерфейс, поэтому для
    // него неважно какая фабрика была создана.
    main() {
        this.initialize();
        this.dialog.renderWindow();
    }
}
