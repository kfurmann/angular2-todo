import {List} from 'immutable';
import {TodoItem} from './todoitem';

export default class TodoStore {
    store: Redux.Store;

    private _items: List<TodoItem> = List<TodoItem>();

    constructor() {
        //
    }

    get items(): List<TodoItem> {
        return this._items;
    }

    addItem(itemText: string) {
        const newItem = new TodoItem()
            .setText(itemText);
        this._items = this._items.push(newItem);
    }

    removeItem(itemId: string) {
        this._items = List<TodoItem>(this._items.filter((i: TodoItem) => i.uuid !== itemId))
    }

    updateItemText(itemId: string, text: string) {
        this._items = this._items.update(this.indexOf(itemId), (i: TodoItem) => i.setText(text));
    }

    updateItemCompletion(itemId: string, itemCompleted: boolean) {
        this._items = this._items.update(this.indexOf(itemId), (i: TodoItem) => i.setCompleted(itemCompleted));
    }

    private indexOf(uuid: string) {
        return this._items.findIndex((i: TodoItem) => i.uuid === uuid);
    }
}
