// Этот паттерн предполагает, что у вас есть несколько
// семейств продуктов, находящихся в отдельных иерархиях
// классов (Button/Checkbox). Продукты одного семейства
// должны иметь общий интерфейс.
interface ButtonAS {
    paint(): void;
}

// Все семейства продуктов имеют одинаковые
// вариации (macOS/Windows).
class WinButton implements ButtonAS {
    paint() {
        // Отрисовать кнопку в стиле Windows.
    }
}

class MacButton implements ButtonAS {
    paint() {
        // Отрисовать кнопку в стиле macOS.
    }
}

interface CheckboxAS {
    paint(): void;
}

class WinCheckbox implements CheckboxAS {
    paint() {
        // Отрисовать чекбокс в стиле Windows.
    }
}

class MacCheckbox implements CheckboxAS {
    paint() {
        // Отрисовать чекбокс в стиле macOS.
    }
}

// Абстрактная фабрика знает обо всех (абстрактных)
// типах продуктов.

interface GUIFactory {
    createButton(): ButtonAS;
    createCheckbox(): CheckboxAS;
}

// Каждая конкретная фабрика знает и создаёт только продукты
// своей вариации.
class WinFactory implements GUIFactory {
    createButton(): ButtonAS {
        return new WinButton();
    }
    createCheckbox(): CheckboxAS {
        return new WinCheckbox();
    }
}
// Несмотря на то что фабрики оперируют конкретными
// классами, их методы возвращают абстрактные типы
// продуктов. Благодаря этому, фабрики можно взаимозаменять,
// не изменяя клиентский код.
class MacFactory implements GUIFactory {
    createButton(): ButtonAS {
        return new MacButton();
    }
    createCheckbox(): CheckboxAS {
        return new MacCheckbox();
    }
}
// Код, использующий фабрику, не волнует с какой конкретно
// фабрикой он работает. Все получатели продуктов работают с
// продуктами через абстрактный интерфейс.
class ApplicationAS {
    private button: ButtonAS | null = null;
    private checkbox: CheckboxAS | null = null;
    factory: GUIFactory;

    constructor(factory: GUIFactory) {
        this.factory = factory;
    }
    createUI() {
        this.button = this.factory.createButton();
        this.checkbox = this.factory.createCheckbox();
    }
    paint() {
        if (this.button && this.checkbox) {
            this.button.paint();
            this.checkbox.paint();
        }
    }
}
// Приложение выбирает тип и создаёт конкретные фабрики
// динамически исходя из конфигурации или окружения.
class ApplicationConfigurator {
    main() {
        const osType: string = os.type();
        let factory: GUIFactory;

        if (osType.startsWith("Windows")) {
            factory = new WinFactory();
        } else if (osType.startsWith("Mac")) {
            factory = new MacFactory();
        } else
            throw new Error("Error! Unknown operating system.")

        const app: ApplicationAS = new ApplicationAS(factory);
    }
}
















