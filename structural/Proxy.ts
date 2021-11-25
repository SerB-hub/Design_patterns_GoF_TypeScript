class Video {
    id: number;
    info: string = "info"

    constructor(id: number) {
        this.id = id;
    }

    // ...
}
// Интерфейс удалённого сервиса.
interface ThirdPartyYoutubeLib {
    listVideos(): Video[];
    getVideoInfo(id: number): string;
    downloadVideo(id: number): Video | string;
}
// Конкретная реализация сервиса. Методы этого класса
// запрашивают у ютуба различную информацию. Скорость
// запроса зависит от интернет-канала пользователя и
// состояния самого ютуба. Чем больше будет вызовов к
// сервису, тем менее отзывчивой будет программа.
class ThirdPartyYoutubeClass implements ThirdPartyYoutubeLib{
    videos: Video[] = [];

    constructor() {
        const video1 = new Video(1);
        const video2 = new Video(2);
        const video3 = new Video(3);
        this.videos = [video1, video2, video3];
    }

    listVideos(): Video[] {
        // Получить список видеороликов с помощью API Youtube.
        return this.videos;
    }
    getVideoInfo(id: number): string {
        // Получить детальную информацию о каком-то видеоролике.
        const video = this.videos.find(v => v.id === id);
        if (video) {
            return video.info;
        } else {
            return "not found"
        }
    }
    downloadVideo(id: number): Video | string {
        // Скачать видео с Youtube.

        const video = this.videos.find(v => v.id === id);
        if (video) {
            return video;
        } else {
            return "not found"
        }
    }
}
// С другой стороны, можно кешировать запросы к ютубу и не
// повторять их какое-то время, пока кеш не устареет. Но
// внести этот код напрямую в сервисный класс нельзя, так
// как он находится в сторонней библиотеке. Поэтому мы
// поместим логику кеширования в отдельный класс-обёртку. Он
// будет делегировать запросы к сервисному объекту, только
// если нужно непосредственно выслать запрос.
class CachedYoutubeClass implements  ThirdPartyYoutubeLib {
    private service: ThirdPartyYoutubeClass;
    private listCache: Video[] = [];
    private videoCache: string = '';
    private downloadCache!: Video | string;

    constructor(service: ThirdPartyYoutubeClass) {
        this.service = service;
    }

    listVideos(): Video[] {
        if (!this.listCache[0]) {
            this.listCache = this.service.listVideos()
        }
        return this.listCache;
    }
    getVideoInfo(id: number): string {
        if (!this.videoCache) {
            this.videoCache = this.service.getVideoInfo(id);
        }
        return this.videoCache;
    }
    downloadVideo(id: number): Video | string {
        if (!this.downloadCache) {
            this.downloadCache = this.service.downloadVideo(id);
        }
        return this.downloadCache;
    }
}
// Класс GUI, который использует сервисный объект. Вместо
// реального сервиса, мы подсунем ему объект-заместитель.
// Клиент ничего не заметит, так как заместитель имеет тот
// же интерфейс, что и сервис.
class YoutubeManager {
    protected service: ThirdPartyYoutubeLib;

    constructor(service: ThirdPartyYoutubeLib) {
        this.service = service;
    }

    renderVideoPage(id: number) {
        const info = this.service.getVideoInfo(id);
        // Отобразить страницу видеоролика.
    }
    renderListPanel() {
        const list = this.service.listVideos()
        // Отобразить список превьюшек видеороликов.
    }
    reactOnUserInput(id: number) {
        this.renderVideoPage(id);
        this.renderListPanel();
    }
}
// Конфигурационная часть приложения создаёт и передаёт
// клиентам объект заместителя.
class ApplicationProxy {
    init() {
        const youtubeService = new ThirdPartyYoutubeClass();
        const youtubeProxy = new CachedYoutubeClass(youtubeService);
        const manager = new YoutubeManager(youtubeProxy);
        let id = 1
        manager.reactOnUserInput(id);
    }
}


