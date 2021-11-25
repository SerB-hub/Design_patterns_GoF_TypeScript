// Класс создателя должен иметь специальный метод, который
// сохраняет состояние создателя в новом объекте-снимке.
class EditorS {
    private text!: string;
    private curX!: number;
    private curY!: number;
    private selectionWidth!: number;

    setText(text: string) {
        this.text = text;
    }
    setCursor(x: number, y: number) {
        this.curX = x;
        this.curY = y;
    }
    setSelectionWidth(width: number) {
        this.selectionWidth = width;
    }
    createSnapshot(): EditorState {
        // Снимок — неизменяемый объект, поэтому Создатель
        // передаёт все своё состояние через
        // параметры конструктора.
        return new Snapshot(this, this.text, this.curX, this.curY, this.selectionWidth);
    }
}
// Снимок хранит прошлое состояние редактора.
class Snapshot {
    private editor: EditorS;
    private text: string;
    private curX: number;
    private curY: number;
    private selectionWidth: number;

    constructor(editor: EditorS, text: string, curX: number, curY: number, selectionWidth: number) {
        this.editor = editor;
        this.text = text;
        this.curX = curX;
        this.curY = curY;
        this.selectionWidth = selectionWidth;
    }
    // В нужный момент, владелец снимка может восстановить
    // состояние редактора.
    restore() {
        this.editor.setText(this.text);
        this.editor.setCursor(this.curX, this.curY);
        this.editor.setSelectionWidth(this.selectionWidth);
    }
}
// Опекуном может выступать класс команд (см. паттерн
// Команда). В этом случае, команда сохраняет снимок
// получателя перед тем, как выполнить действие. А при
// отмене, возвращает получателя в предыдущее состояние.
class CommandS {
    editor: EditorS;
    private backup!: Snapshot;

    makeBackup() {
        this.backup = this.editor.saveState()
    }
    undo() {
        if (this.backup) {
            this.backup.restore();
        }
    }
    //...
}