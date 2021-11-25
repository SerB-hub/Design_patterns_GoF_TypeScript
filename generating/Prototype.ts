// Базовый прототип.
abstract class Shape {
    X?: number;
    Y?: number;
    color?: string;
    // Копирование всех полей объекта происходит
    // в конструкторе.
    protected constructor(source?: Shape) {
        if (source) {
            this.X = source.X;
            this.Y = source.Y;
            this.color = source.color;
        }
    }
    // Результатом операции клонирования всегда будет объект
    // из иерархии классов Shape.
    abstract clone(): Shape;
}
// Конкретный прототип. Метод клонирования создаёт новый
// объект и передаёт в его конструктор для копирования
// собственный объект. Этим мы пытаемся получить атомарность
// операции клонирования. В данной реализации, пока не
// выполнится конструктор, нового объекта ещё не существует.
// Но как только конструктор завершён, мы получаем полностью
// готовый объект-клон, а не пустой объект, который нужно
// ещё заполнить.
class Rectangle extends Shape {
    width?: number;
    height?: number;

    constructor(source?: Rectangle) {
        if (source) {
            super(source);
            this.width = source.width;
            this.height = source.height;
        }
    }

    clone(): Shape {
        return new Rectangle(this);
    }
}

class Circle extends Shape {
    radius?: number;

    constructor(source?: Circle) {
        if (source) {
            super(source);
            this.radius = source.radius;
        }
    }

    clone(): Shape {
        return new Circle(this);
    }
}

class ApplicationP {
    shapes!: Shape[];

    constructor() {
        const circle: Circle = new Circle();
        circle.X = 10;
        circle.Y = 20;
        circle.radius = 15;
        this.shapes.push(circle);

        const anotherCircle: Circle = circle.clone();
        this.shapes.push(anotherCircle);
        // anotherCircle будет содержать точную
        // копию circle.

        const rectangle: Rectangle = new Rectangle();
        rectangle.width = 10;
        rectangle.height = 20;
        this.shapes.push(rectangle);
    }

    businessLogic() {
        // Неочевидный плюс Прототипа в том, что вы можете
        // клонировать набор объектов, не зная их
        // конкретных классов.
        const shapesCopy: Shape[] = [];

        // Например, мы не знаем какие конкретно объекты
        // находятся внутри массива shapes, так как он
        // объявлен с типом Shape. Но благодаря
        // полиморфизму, мы можем клонировать все объекты
        // «вслепую». Будет выполнен метод `clone` того
        // класса, которым является этот объект.
        for (let shape of this.shapes) {
            shapesCopy.push(shape.clone());
        }

        // Переменная shapesCopy будет содержать точные
        // копии элементов массива shapes.
    }
}