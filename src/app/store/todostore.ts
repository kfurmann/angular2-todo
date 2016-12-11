import {List} from 'immutable';
import {TodoItem} from './todoitem';
import {Observable, BehaviorSubject} from 'rxjs/Rx';

export default class TodoStore {
    store: Redux.Store;

    public itemsStream: Observable<List<TodoItem>>;
    private itemsSubject: BehaviorSubject<List<TodoItem>> = new BehaviorSubject(List<TodoItem>());

    constructor() {

        this.itemsStream = Observable.from(this.itemsSubject);
        const mockedState = List<TodoItem>([
            new TodoItem().setText('hit gym'),
            new TodoItem().setText('learn ng2')
        ]);
        setTimeout(() => {
            this.itemsSubject.next(this.itemsSubject.getValue().merge(mockedState));
        }, 2000);
    }

    addItem(itemText: string) {
        const newItem = new TodoItem()
            .setText(itemText);
        this.itemsSubject.next(this.itemsSubject.getValue().push(newItem));
    }

    removeItem(itemId: string) {
        this.itemsSubject.next(
            List<TodoItem>(this.itemsSubject.getValue().filter((i: TodoItem) => i.uuid !== itemId))
        );
    }

    updateItemText(itemId: string, text: string) {
        this.itemsSubject.next(
            this.itemsSubject.getValue().update(
                this.indexOf(this.itemsSubject.getValue(), itemId), (i: TodoItem) => i.setText(text)
            )
        );
    }

    updateItemCompletion(itemId: string, itemCompleted: boolean) {
        this.itemsSubject.next(
            this.itemsSubject.getValue().update(
                this.indexOf(this.itemsSubject.getValue(), itemId), (i: TodoItem) => i.setCompleted(itemCompleted)
            )
        );
    }

    private indexOf(items: List<TodoItem>, uuid: string) {
        return items.findIndex((i: TodoItem) => i.uuid === uuid);
    }
}
