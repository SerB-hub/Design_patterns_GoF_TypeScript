// Общий интерфейс компонентов.
interface Graphic {
    move(x: number, y: number): void;
    draw(): void;
}
// Простой компонент.
class Dot implements Graphic {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    move(x: number, y: number): void {
        this.x += x;
        this.y += y;
    }
    draw() {
        // Нарисовать точку в координате X, Y.
    }
}

// Компоненты могут расширять другие компоненты.
class CircleC extends Dot {
    radius: number;

    constructor(x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;
    }

    draw() {
        // Нарисовать окружность в координате X, Y и радиусом R.
    }
}
// Контейнер содержит операции добавления/удаления дочерних
// компонентов. Все стандартные операции интерфейса
// компонентов он делегирует каждому из
// дочерних компонентов.
class CompoundGraphic implements Graphic {
    children: Graphic[] = [];

    add(child: Graphic[]): void {
        // Добавить компонент в список дочерних.
        child.forEach(c => this.children.push(c));
    }
    remove(child: Graphic[]): void {
        // Убрать компонент из списка дочерних.
        this.children = this.children.filter(c => !child.includes(c));
    }
    move(x: number, y: number): void {
        this.children.forEach(child => {
            child.move(x, y);
        })
    }
    draw() {
        // 1. Для каждого дочернего компонента:
        // - Отрисовать компонент.
        // - Определить координаты максимальной границы.
        // 2. Нарисовать пунктирную границу вокруг всей области.
    }
}
// Приложение работает единообразно как с единичными
// компонентами, так и целыми группами компонентов.
class ImageEditor {
    all!: CompoundGraphic;

    load() {
        const all = new CompoundGraphic();
        all.add([new Dot(1, 2)]);
        all.add([new CircleC(5, 3, 10)]);
        //...
    }
    // Группировка выбранных компонентов в один
    // сложный компонент.
    groupSelected(...components: Graphic[]) {
        const group = new CompoundGraphic();
        group.add(components);
        this.all.remove(components);
        this.all.add([group]);
        // Все компоненты будут отрисованы.
        this.all.draw();
    }
}
