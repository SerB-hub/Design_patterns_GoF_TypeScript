// Абстрактная команда задаёт общий интерфейс для
// всех команд.
abstract class Command {
    protected app: ApplicationCommand;
    protected editor: Editor;
    protected backup!: string;

    constructor(app: ApplicationCommand, editor: Editor) {
        this.app = app;
        this.editor = editor;
    }
    // Сохраняем состояние редактора.
    saveBackup() {
        this.backup = this.editor.text;
    }
    // Восстанавливаем состояние редактора.
    undo() {
        this.editor.text = this.backup;
    }
    // Главный метод команды остаётся абстрактным, чтобы
    // каждая конкретная команда определила его по-своему.
    // Метод должен возвратить true или false, в зависимости
    // о того, изменила ли команда состояние редактора, а
    // значит, нужно ли её сохранить в истории.
    abstract execute(): boolean;
}

// Конкретные команды.
class CopyCommand extends  Command {
    // Команда копирования не записывается в историю, так
    // как она не меняет состояние редактора.
    execute(): boolean {
        this.app.clipboard = this.editor.getSelection();
        return false;
    }
}

class CutCommand extends Command {
    // Команды, меняющие состояние редактора, сохраняют
    // состояние редактора перед своим действием и
    // сигнализируют об изменении, возвращая true.
    execute(): boolean {
        this.saveBackup();
        this.editor.replaceSelection(this.app.clipboard);
        return true;
    }
}

class PasteCommand extends Command {
    execute(): boolean {
        this.saveBackup();
        this.editor.replaceSelection(this.app.clipboard);
        return true;
    }
}
// Отмена это тоже команда.
class UndoCommand extends Command {
    execute() {
        this.app.undo();
        return false;
    }
}
// Глобальная история команд — это стек.
class CommandHistory {
    private history: Command[] = [];
    // Последний зашедший...
    push(c: Command) {
        // Добавить команду в конец массива-истории.
        this.history.push(c);
    }
    // ...выходит первым.
    pop(): Command | undefined{
        // Достать последнюю команду из массива-истории.
        return this.history.pop();

    }
}
// Класс редактора содержит непосредственные операции над
// текстом. Он отыгрывает роль получателя – команды
// делегируют ему свои действия.
class Editor {
    text!: string;

    getSelection() {
        // Вернуть выбранный текст.
        return this.text;
    }
    deleteSelection() {
        // Удалить выбранный текст.
    }
    replaceSelection(text: string) {
        // Вставить текст из буфера обмена в текущей позиции.
    }
}
// Класс приложения настраивает объекты для совместной
// работы. Он выступает в роли отправителя — создаёт
// команды, чтобы выполнить какие-то действия.
class ApplicationCommand {
    clipboard!: string;
    editors: Editor[] = [];
    activeEditor!: Editor;
    history!: CommandHistory;
    // Код, привязывающий команды к элементам интерфейса
    // может выглядеть примерно так.
    createUI() {
        const copy = () => {
            this.executeCommand(new CopyCommand(this, this.activeEditor));
        }
        copyButton.setCommand(copy);
        shortcuts.onKeyPress("Ctrl+C", copy);

        const cut = () => {
            this.executeCommand(new CutCommand(this, this.activeEditor));
        }
        cutButton.setCommand(cut);
        shortcuts.onKeyPress("Ctrl+C", cut);

        const paste = () => {
            this.executeCommand(new PasteCommand(this, this.activeEditor));
        }
        cutButton.setCommand(paste);
        shortcuts.onKeyPress("Ctrl+C", paste);

        const undo = () => {
            this.executeCommand(new UndoCommand(this, this.activeEditor));
        }
        cutButton.setCommand(undo);
        shortcuts.onKeyPress("Ctrl+C", undo);
    }
    executeCommand(command: Command) {
        if (command.execute()) {
            this.history.push(command);
        }
    }
    // Берём последнюю команду из истории и заставляем её
    // все отменить. Мы не знаем конкретный тип команды, но
    // это и не важно, так как каждая команда знает как
    // отменить своё действие.
    undo() {
        const command = this.history.pop();
        if (command) {
            command.undo();
        }
    }
}

















