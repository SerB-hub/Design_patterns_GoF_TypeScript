interface RoundShape {
    getRadius(): number;
}

// Классы с совместимыми интерфейсами: КруглоеОтверстие
// и КруглыйКолышек.
class RoundHole {
    private readonly radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    getRadius(): number {
        // Вернуть радиус отверстия
        return this.radius;
    }
    fits(peg: RoundShape) {
        return this.getRadius() >= peg.getRadius();
    }
}

class RoundPeg implements RoundShape {
    private readonly radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    getRadius(): number {
        // Вернуть радиус круглого колышка.
        return this.radius;
    }
}

// Устаревший несовместимый класс: КвадратныйКолышек.
class SquarePeg {
    private readonly width: number;

    constructor(width: number) {
        this.width = width;
    }

    getWidth(): number {
        // Вернуть ширину квадратного колышка.
        return this.width;
    }
}
// Адаптер позволяет использовать квадратные колышки и
// круглые отверстия вместе.
class SquarePegAdapter implements RoundShape {
    private readonly peg: SquarePeg;

    constructor(peg: SquarePeg) {
        this.peg = peg;
    }

    getRadius(): number {
        // Вычислить половину диагонали квадратного колышка
        // по теореме Пифагора.
        return Math.sqrt(2 * Math.pow(this.peg.getWidth(), 2)) / 2;
    }
}

const hole = new RoundHole(5);
const rpeg = new RoundPeg(5);
hole.fits(rpeg) // true

const small_sqpeg = new SquarePeg(2);
const large_sqpeg = new SquarePeg(5);
// hole.fits(small_sqpeg) ошибка компиляции, несовместимые типы

const small_sqpeg_adapter = new SquarePegAdapter(small_sqpeg);
const large_sqpeg_adapter = new SquarePegAdapter(large_sqpeg);

hole.fits(small_sqpeg_adapter); // true
hole.fits(large_sqpeg_adapter); // false













