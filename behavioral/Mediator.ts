// Общий интерфейс посредников.
interface Mediator {
    notify(sender: ComponentM, event: string): void;
}
// Конкретный посредник. Все связи между конкретными
// компонентами переехали в код посредника. Он получает
// извещения от своих компонентов и знает как на
// них реагировать.
class AuthenticationDialog implements Mediator {
    private title: string;
    private loginOrRegisterChkBx: Checkbox;
    private loginUsername: Textbox;
    private loginPassword: Textbox;
    private registrationUsername: string;
    private registrationPassword: string;
    private registrationEmail: Textbox;
    private okBtn: ButtonM;
    private cancelBtn: ButtonM;

    constructor() {
        // Здесь нужно создать объекты всех компонентов, подав
        // текущий объект-посредник в их конструктор.
    }

    // Когда что-то случается с компонентом, он шлёт
    // посреднику оповещение. После получения извещения,
    // посредник может либо сделать что-то самостоятельно,
    // либо перенаправить запрос другому компоненту.
    notify(sender: ComponentM, event: string): void {
        if (sender instanceof Object.getPrototypeOf(this.loginOrRegisterChkBx) && event === "check") {
            if (this.loginOrRegisterChkBx.checked) {
                this.title = "Log in";
                // 1. Показать компоненты формы входа.
                // 2. Скрыть компоненты формы регистрации.
            } else {
                this.title = "Register";
                // 1. Показать компоненты формы регистрации.
                // 2. Скрыть компоненты формы входа.
            }
        }
        if (sender instanceof Object.getPrototypeOf(this.okBtn) && event === "click") {
            if (this.loginOrRegisterChkBx.checked) {
                // Попробовать найти пользователя с данными из
                // формы логина.
                if (!found) {
                    // Показать ошибку над формой логина.
                }
            } else {
                // 1. Создать пользовательский аккаунт с данными
                // из формы регистрации.
                // 2. Авторизировать этого пользователя.
            }
        }
    }
}
// Классы компонентов общаются с посредниками через их общий
// интерфейс. Благодаря этому, одни и те же компоненты можно
// использовать в разных посредниках.
class ComponentM {
    dialog: Mediator;

    constructor(dialog: Mediator) {
        this.dialog = dialog;
    }

    click() {
        this.dialog.notify(this, "check");
    }
    keypress() {
        this.dialog.notify(this, "keypress");
    }
}
// Конкретные компоненты никак не связаны между собой. У них
// есть только один канал общения – через отправку
// уведомлений посреднику.
class ButtonM extends ComponentM {
    //...
}
class Textbox extends ComponentM {
    //...
}
class Checkbox extends ComponentM {
    check() {
        this.dialog.notify(this, "check")
    }
    //...
}





















