// Общий интерфейс компонентов.
interface DataSource {
    writeData(data: string): void;
    readData(): string;
}
// Один из конкретных компонент, реализует
// базовую функциональность.
class FileDataSource implements DataSource {
    filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }

    writeData(data: string) {
        // Записать данные в файл.
    }
    readData(): string {
        // Прочитать данные из файла.
        return 'data';
    }
}
// Родитель всех декораторов содержит код обёртывания.
class DataSourceDecorator implements DataSource {
    protected wrappee: DataSource;

    constructor(source: DataSource) {
        this.wrappee = source;
    }

    writeData(data: string) {
        this.wrappee.writeData(data);
    }
    readData(): string {
        return this.wrappee.readData();
    }
}

// Конкретные декораторы добавляют что-то своё к базовому
// поведению обёрнутого компонента.
class EncryptionDecorator extends DataSourceDecorator {
    writeData(data: string) {
        // 1. Зашифровать поданные данные.
        // 2. Передать зашифрованные данные в метод writeData
        // обёрнутого объекта (wrappee).
        // ...
        super.writeData(data);
    }
    readData(): string {
        // 1. Получить данные из метода readData обёрнутого
        // объекта (wrappee).
        // 2. Расшифровать их, если они зашифрованы.
        // 3. Вернуть результат.
        const data = super.readData();
        // ...
        return data;
    }
}
// Декорировать можно не только базовые компоненты, но и уже
// обёрнутые объекты.
class CompressionDecorator extends DataSourceDecorator {
    writeData(data: string) {
        // 1. Запаковать поданные данные.
        // 2. Передать запакованные данные в метод writeData
        // обёрнутого объекта (wrappee).
        // ...
        super.writeData(data);
    }
    readData(): string {
        const data = super.readData();
        // 1. Получить данные из метода readData обёрнутого
        // объекта (wrappee).
        // 2. Распаковать их, если они запакованы.
        // 3. Вернуть результат.
        // ...
        return data;
    }
}
// Простой пример сборки и
// использования декораторов.
class Application {
    dumbUsageExample() {
        const source = new FileDataSource("somefile.dat");
        source.writeData("salaryRecords");
        // В файл были записаны чистые данные.
        const sourceCompression = new CompressionDecorator(source);
        sourceCompression.writeData("salaryRecords");
        // В файл были записаны сжатые данные.
        const sourceCompressionEncrypted = new EncryptionDecorator(sourceCompression);
        // sourceCompressionEncrypted — это связка из трёх объектов:
        // Encryption > Compression > FileDataSource
        sourceCompressionEncrypted.writeData("salaryRecords");
        // В файл были записаны сжатые и
        // зашифрованные данные.
    }
}
