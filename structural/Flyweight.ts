// Этот класс-легковес содержит часть полей, которые
// описывают деревья. Эти поля не уникальные для каждого
// дерева в отличие, например, от координат — несколько
// деревьев могут иметь ту же текстуру.
//
// Поэтому мы переносим повторяющиеся данные в один
// единственный объект и ссылаемся на него из множества
// отдельных деревьев.
class TreeType {
    name: string;
    color: string;
    texture: string;

    constructor(name: string, color: string, texture: string) {
        this.name = name;
        this.color = color;
        this.texture = texture;
    }

    draw(canvas: string, x: number, y: number) {
        // 1. Создать картинку данного типа, цвета и текстуры.
        // 2. Нарисовать картинку на холсте в позиции X, Y.
    }
}
// Фабрика легковесов решает когда нужно создать новый
// легковес, а когда можно обойтись существующим.
class TreeFactory {
    static treeTypes: TreeType[];
    static getTreeType(name: string, color: string, texture: string) {
        let type = this.treeTypes.find(
            t => t.name === name
                && t.color === color
                && t.texture === texture
        )
        if (type === undefined) {
            type = new TreeType(name, color, texture);
            TreeFactory.treeTypes.push(type);
        }
        return type;
    }
}
// Контекстный объект, из которого мы выделили легковес
// TreeType. В программе могут быть тысячи объектов Tree,
// так как накладные расходы на их хранение совсем небольшие
// — порядка трёх целых чисел (две координаты и ссылка).
class Tree {
    x: number;
    y: number;
    type: TreeType;

    constructor(x: number, y: number, type: TreeType) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    draw(canvas: string) {
        this.type.draw(canvas, this.x, this.y);
    }
}
// Классы Tree и Forest являются клиентами Легковеса. При
// желании их можно слить в один класс, если вам не нужно
// расширять класс деревьев далее.
class Forest {
    trees: Tree[] = [];
    plantTree(x: number, y: number, name: string, color: string, texture: string) {
        const type = TreeFactory.getTreeType(name, color, texture);
        const tree = new Tree(x, y, type);
        this.trees.push(tree);
    }
    draw(canvas: string) {
        this.trees.forEach(t => t.draw(canvas));
    }
}

