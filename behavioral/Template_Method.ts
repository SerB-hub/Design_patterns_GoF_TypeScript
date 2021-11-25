abstract class GameAI {
    abstract scouts: number;
    abstract warriors: number;
    // Шаблонный метод должен быть задан в базовом классе.
    // Он состоит из вызовов методов в определённом порядке.
    // Чаще всего эти методы являются шагами
    // некоего алгоритма.
    turn() {
        this.collectResources();
        this.buildStructures();
        this.buildUnits();
        this.attack();
    }
    // Некоторые из этих методов могут быть реализованы
    // прямо в базовом классе.
    collectResources() {
        if (this.buildStructures()) {
            this.buildStructures()!.forEach(s => s.collect());
        }
    }
    // А некоторые могут быть полностью абстрактными.
    abstract buildStructures(): Array<object> | null;
    abstract buildUnits(): void;
    // Шаблонных методов в классе может быть несколько.
    attack() {
        const enemy = closestEnemy();
        if (!enemy) {
            this.sendScouts(position);
        } else {
            this.sendWarriors(position);
        }
    }
    abstract sendScouts(position: string): void;
    abstract sendWarriors(position: string): void;
}
// Подклассы могут предоставлять свою реализацию шагов
// алгоритма, не изменяя сам шаблонный метод.
class OrcsAI extends GameAI {
    resources: number = 10000;
    scouts: number = 10;
    warriors: number = 0;

    buildStructures(): Array<object> | null {
        if (this.resources >= 6000) {
            // Строить фермы, затем бараки, а потом цитадель.
            return [{"type": "farm"}, {"type": "barrack"}, {"type": "citadel"}]
        } else {
            return null;
        }
    }
    buildUnits(): void {
        if (this.resources >= 100) {
            if (this.scouts === 0) {
                // Построить раба и добавить в группу разведчиков.
            } else {
                // Построить пехотинца и добавить в группу воинов.
            }
        }
    }
    sendScouts(position: string): void {
        if (this.scouts > 0) {
            // Отправить разведчиков на позицию.
        }
    }
    sendWarriors(position: string): void {
        if (this.warriors > 5) {
            // Отправить воинов на позицию.
        }
    }
}
// Подклассы могут не только реализовывать абстрактные шаги,
// но и переопределять шаги, уже реализованные в
// базовом классе.
class MonstersAI extends GameAI {
    scouts: number = 300;
    warriors: number = 8000;

    collectResources() {
        // Ничего не делать.
    }
    buildStructures(): Array<object> | null {
        // Ничего не делать.
        return null
    }
    buildUnits(): void {
        // Ничего не делать.
    }
    sendScouts(position: string): void {
        if (this.scouts > 0) {
            // Отправить разведчиков на позицию.
        }
    }
    sendWarriors(position: string): void {
        if (this.warriors > 5) {
            // Отправить воинов на позицию.
        }
    }
}











