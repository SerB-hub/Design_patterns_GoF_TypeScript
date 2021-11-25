class Database {
    private static instance: Database | null = null;

    static getInstance() {
        if (Database.instance === null) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    private constructor() {
        // Здесь может находиться код инициализации подключения к
        // серверу баз данных.
        // ...
    }

    public query(sql: string) {
        // Все запросы к базе данных будут проходить через
        // этот метод. Поэтому имеет смысл поместить сюда
        // какую-то логику кеширования.
        // ...
    }
}

class ApplicationS {
    main() {
        const foo: Database = Database.getInstance();
        foo.query("SELECT ...");
        // ...
        const bar: Database = Database.getInstance();
        bar.query("SELECT ...");
        // Переменная "bar" содержит тот же объект, что
        // и переменная "foo".

    }
}