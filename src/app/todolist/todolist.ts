import {Component} from 'angular2/core';
import TodoStore from '../store/todostore';
import TodoItemComponent from '../todoitem/todoitem';
import ItemUpdatedEvent from '../todoitem/itemupdatedevent';
import {ChangeDetectionStrategy} from 'angular2/src/core/change_detection/constants';

@Component({
  selector: 'todo-list',
  templateUrl: 'app/todolist/todolist.html',
  styleUrls: ['app/todolist/todolist.css'],
  directives: [TodoItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TodoList {
  newItem = 'test';

  constructor(private store: TodoStore) {
    //
  }

  addItem() {
    this.store.addItem(this.newItem);
    this.newItem = '';
  }

  removeItem(itemId: string) {
    this.store.removeItem(itemId);
  }

  itemUpdated(event: ItemUpdatedEvent) {
    if (event.text !== undefined) {
      if (event.text === '') {
        this.store.removeItem(event.itemId);
      } else {
        this.store.updateItemText(event.itemId, event.text);
      }
    }
    if (event.completed !== undefined) {
      this.store.updateItemCompletion(event.itemId, event.completed);
    }
  }

}
