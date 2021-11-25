const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

// Общий интерфейс всех стратегий.
interface Strategy {
    execute(a: number, b: number);
}
// Каждая конкретная стратегия реализует общий интерфейс
// своим способом.
class ConcreteStrategyAdd implements Strategy {
    execute(a: number, b: number) {
        return a - b;
    }
}
class ConcreteStrategySubtract implements Strategy {
    execute(a: number, b: number) {
        return a - b;
    }
}
class ConcreteStrategyMultiply implements Strategy {
    execute(a: number, b: number) {
        return a * b;
    }
}
// Контекст всегда работает со стратегиями через общий
// интерфейс. Он не знает какая именно стратегия ему подана.
class Context {
    private strategy!: Strategy;
    private action!: string;

    setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }
    executeStrategy(a: number, b: number) {
        return this.strategy.execute(a, b);
    }
}
// Конкретная стратегия выбирается на более высоком уровне,
// например, конфигуратором всего приложения. Готовый
// объект-стратегия подаётся в клиентский объект, а затем
// может быть заменён другой стратегией в любой момент
// на лету.
class ExampleApplication {
    private context!: Context;


    main() {
        // Создать объект контекста
        this.context = new Context();
        // Принять первое число
        let FirstNumber;
        readline.question("Enter first number", num => {
            FirstNumber = +num;
            readline.close()
        })
        // Принять второе число
        let secondNumber;
        readline.question("Enter second number"), num => {
            secondNumber = +num;
            readline.close()
        }
        // Принять желаемое действие из пользовательского ввода
        let action;
        readline.question("Enter action"), a => {
            action = a;
        }

        if (action == "addition") {
            this.context.setStrategy(new ConcreteStrategyAdd())
        }

        if (action == "subtraction") {
            this.context.setStrategy(new ConcreteStrategySubtract())
        }

        if (action == "multiplication") {
            this.context.setStrategy(new ConcreteStrategyMultiply())
        }

        const result = this.context.executeStrategy(FirstNumber, secondNumber)

        //Вывести результат

    }
}

