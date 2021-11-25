// Сложная иерархия компонентов.
interface ShapeV {
    move(x: number, y: number): void;
    draw(): void;
    accept(v: Visitor): void;
}
// Метод принятия посетителя должен быть реализован в каждом
// компоненте, а не только в базовом классе. Это поможет
// программе определить какой метод посетителя нужно
// вызвать, в случае если вы не знаете тип компонента.
class DotV implements ShapeV {
    move(x: number, y: number): void {
        //...
    }
    draw(): void {
        //...
    }
    accept(v: Visitor): void {
        v.visitDot(this);
    }
}

class CircleV extends DotV {
    radius: number = 1;
    //...
    accept(v: Visitor): void {
        v.visitCircle(this);
    }
}
class RectangleV implements ShapeV {
    width: number = 1;
    height: number = 1;
    //...
    move(x: number, y: number): void {
        //...
    }
    draw(): void {
        //...
    }
    accept(v: Visitor): void {
        v.visitRectangle(this);
    }
}
class CompoundShape implements ShapeV {
    //...
    move(x: number, y: number): void {
        //...
    }
    draw(): void {
        //...
    }
    accept(v: Visitor): void {
        v.visitCompoundShape(this);
    }
}
// Интерфейс посетителей должен содержать методы посещения
// каждого компонента. Важно, чтобы иерархия компонентов
// менялась редко, так как при добавлении нового компонента
// придётся менять всех существующих посетителей.
interface Visitor {
    visitDot(d: DotV): void;
    visitCircle(c: CircleV): void;
    visitRectangle(r: RectangleV): void;
    visitCompoundShape(cs: CompoundShape): void;
}
// Конкретный посетитель реализует одну операцию для всей
// иерархии компонентов. Новая операция = новый посетитель.
// Посетитель выгодно применять, когда новые компоненты
// добавляются очень редко, а команды добавляются
// очень часто.
class XMLExportVisitor implements Visitor{
    visitDot(d: DotV) {
        // Экспорт id и кординатов центра точки.
    }
    visitCircle(c: CircleV) {
        // Экспорт id, кординатов центра и радиуса окружности.
    }
    visitRectangle(r: RectangleV): void {
        // Экспорт id, кординатов левого-верхнего угла, ширины
        // и высоты прямоугольника.
    }
    visitCompoundShape(cs: CompoundShape): void {
        // Экспорт id составной фигуры, а также списка id
        // подфигур, из которых она состоит.
    }
}
// Приложение может применять посетителя к любому набору
// объектов компонентов, даже не уточняя их типы. Нужный
// метод посетителя будет выбран благодаря проходу через
// метод accept.
class ApplicationV {
    allShapes: ShapeV[] = [];

    export() {
        const exportVisitor = new XMLExportVisitor();

        this.allShapes.forEach(shape => shape.accept(exportVisitor));
    }
}
