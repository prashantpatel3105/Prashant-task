import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Todo>();
  storedUserData: any;

  constructor(){
    const uid = localStorage.getItem('auth-user');
    if (uid) {
      this.storedUserData = JSON.parse(uid).uid;
    }
  }

  deleteTodo() {
    this.delete.emit(this.todo.id as string);
  }

  editTodo() {
    this.edit.emit(this.todo);
  }
}
