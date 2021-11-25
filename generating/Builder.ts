// Строитель может создавать различные продукты, используя
// один и тот же процесс строительства.
class Car {
    // Автомобили могут отличаться комплектацией: типом
    // двигателя, количеством сидейний, могут иметь или не иметь
    // GPS и систему навигации и т.д. Кроме того, автомобили
    // могут быть городскими, спортивными или внедорожниками.
}

class Manual {
    // Руководство пользователя для данной конфигурации
    // автомобиля.
}

interface Engine {
    power: number;

    start(): void;
    shutdown(): void;
}

class SportEngine implements Engine {
    power: number = 250;

    start(): void {
        // Запуск двигателя
    }
    shutdown(): void {
        // Выключение двигателя
    }
}

// Интерфейс строителя объявляет все возможные этапы и шаги
// конфигурации продукта.

interface Builder {
    reset(): void;
    setSeats(seats: number): void;
    setEngine(engine: Engine): void;
    setTripComputer(tripComputer: boolean): void;
    setGPS(GPS: boolean): void;
}

// Все конкретные строители реализуют общий
// интерфейс по-своему.
class CarBuilder implements Builder {
    private car!: Car;
    // Поместить новый объект Car в поле "car".
    reset(): void {
        // Поместить новый объект Car в поле "car".
        this.car = new Car();
    }
    setSeats(seats: number): void {
        // Установить указанное количество сидений.
    }
    setEngine(engine: Engine) {
        // Установить поданный двигатель.
    }
    setTripComputer(tripComputer: boolean) {
        // Установить поданную систему навигации.
    }
    setGPS(GPS: boolean) {
        // Установить или снять GPS.
    }
    getResult(): Car {
        // Вернуть текущий объект автомобиля.
        return this.car;
    }
}
// В отличие от других создающих паттернов, строители могут
// создавать совершенно разные продукты, не имеющие
// общего интерфейса.
class CarManualBuilder implements Builder {
    private manual!: Manual;

    reset(): void {
        // Поместить новый объект Manual в поле "manual".
        this.manual = new Manual();
    }
    setSeats(seats: number) {
        // Описать сколько мест в машине.
    }
    setEngine(engine: Engine) {
        // Добавить в руководство описание двигателя.
    }
    setTripComputer(tripComputer: boolean): void {
        // Добавить в руководство описание системы навигации.
    }
    setGPS(GPS: boolean): void {
        // Добавить в инструкцию инструкцию GPS.
    }
    getResult(): Manual {
        // Вернуть текущий объект руководства.
        return this.manual;
    }
}
// Директор знает в какой последовательности заставлять
// работать строителя. Он работает с ним через общий
// интерфейс строителя. Из-за этого, он может не знать какой
// конкретно продукт сейчас строится.
class Director {
    consructSportCar(builder: Builder) {
        builder.reset();
        builder.setSeats(2);
        builder.setEngine(new SportEngine());
        builder.setTripComputer(true);
        builder.setGPS(true);
    }
    // Директор получает объект конкретного строителя от клиента
    // (приложения). Приложение само знает какой строитель
    // использовать, чтобы получить нужный продукт.
}

class ApplicationB {
    makeCar() {
        const director = new Director();

        const builderCar: CarBuilder = new CarBuilder();
        director.consructSportCar(builderCar);
        const car: Car = builderCar.getResult();

        const builderManual: CarManualBuilder = new CarManualBuilder();
        // Готовый продукт возвращает строитель, так как
        // директор чаще всего не знает и не зависит от
        // конкретных классов строителей и продуктов.
        const manual: Manual = builderManual.getResult();
    }
}






















