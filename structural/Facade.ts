// Классы сложного стороннего фреймворка конвертации видео.
// Мы не контролируем этот код, поэтому не можем
// его упростить.
// Все классы конвертации имеют условный функционал
class VideoFile {
    filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }
    // ...
}

class OggCompressionCodec {
    // ...
}

class MPEG4CompressionCodec {
    // ...
}

class CodecFactory {
    file: VideoFile;

    extract(): VideoFile {
        return this.file;
    };

    constructor(file: VideoFile) {
            this.file = file;
    }
    // ...
}

class BitrateReader {
    static read(filename: string, sourceCodec: VideoFile): object {
        return {filename: filename, sourceCodec: sourceCodec};
    }
    static convert(buffer: object, distinationCodec: MPEG4CompressionCodec | OggCompressionCodec): string {
        // ...
        return 'result'
    }
    // ...
}

class AudioMixer {
    // ...
}
class FileResult {
    result: string;

    constructor(result: string) {
        this.result = result;
    }
    save(): void {
        // ...
    }
    // ...
}
// Вместо этого, мы создаём Фасад — простой интерфейс для
// работы со сложным фреймворком. Фасад не имеет всей
// функциональности фреймворка, но зато скрывает его
// сложность от клиентов.
class VideoConverter {
    convert(filename: string, format: string): FileResult {
        const file = new VideoFile(filename);
        const sourceCodec = new CodecFactory(file).extract();
        let distinationCodec;
        if (format == "mp4") {
            distinationCodec = new MPEG4CompressionCodec();
        } else {
            distinationCodec = new OggCompressionCodec();
        }
        const buffer = BitrateReader.read(filename, sourceCodec);
        const result = BitrateReader.convert(buffer, distinationCodec)
        return new FileResult(result);
    }
}
    // Приложение не зависит от сложного фреймворка конвертации
    // видео. Кстати, если вы вдруг решите сменить фреймворк,
    // вам нужно будет переписать только класс фасада.
class ApplicationF {
    main() {
        const convertor = new VideoConverter();
        const mp4 = convertor.convert("youtubevideo.ogg", "mp4");
        mp4.save();
    }
}
