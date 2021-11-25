// Интерфейс обработчиков.
interface ComponentWithContextualHelp {
    showHelp(): void;
}
// Базовый класс простых компонентов.
abstract class Component implements ComponentWithContextualHelp {
    tooltipText!: string;
    // Контейнер, содержащий компонент, служит в качестве
    // следующего звена цепочки.
    //
    // Контейнер должен быть protected, но typeScript не дает доступ к защищенному полю
    // абстрактного класса-родителя из другого абстрактного класса-наследника.
    // protected container!: Container;
    container!: Container;
    // Компонент показывает всплывающую подсказку, если
    // задан текст подсказки. В обратном случае, он
    // перенаправляет запрос контейнеру, если
    // тот существует.
    showHelp(): void {
        if (this.tooltipText) {
            // Показать подсказку.
        } else {
            this.container.showHelp();
        }
    }
}
// Контейнеры могут включать в себя как простые компоненты,
// так и другие контейнеры. Здесь формируются связи цепочки.
// Класс унаследует метод showHelp от своего родителя.
abstract class Container extends Component {
    protected children: Component[] = [];

    add(child: Component) {
        this.children.push(child);
        child.container = this;
    }
}
// Примитивные компоненты может устраивать поведение помощи
// по умолчанию...
class Button extends Component {
    //...
}
// Но сложные компоненты могут переопределять метод помощь
// по-своему. Но если помощь не может быть предоставлена,
// компонент вызовет базовую реализацию (см.
// класс Component)
class Panel extends Container {
    modalHelpText!: string;

    showHelp() {
        if (this.modalHelpText) {
            // Показать модальное окно с помощью.
        } else {
            super.showHelp();
        }
    }
}
// ...то же, что и выше...
class DialogC extends Container {
    wikiPageURL!: string;

    showHelp() {
        if (this.wikiPageURL) {
            // Открыть страницу Wiki в браузере.
        } else {
            super.showHelp();
        }
    }
}
// Клиентский код.
class ApplicationCoR {
    // Каждое приложение конфигурирует цепочку по-своему.
    createUI() {
        const dialog = new DialogC();
        dialog.wikiPageURL = "http://...";
        const panel = new Panel();
        panel.modalHelpText = "This panel does...";
        const ok = new Button();
        ok.tooltipText = "This is a OK button that...";
        const cancel = new Button();
        // ...
        panel.add(ok);
        panel.add(cancel);
        dialog.add(panel);
    }
    // onF1keyPress() {
    //     const component = this.getComponentAtMouseCoords();
    //     component.showHelp();
    // }
}


