import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import firebase from 'firebase/compat/app'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  allTodos: Todo[] = []; 
  todoForm: FormGroup;
  isEdit: boolean = false;
  currentTodoId: string | null = null;
  storedUserData: any

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['']
    });
    const uid = localStorage.getItem('auth-user');
    if (uid) {
      this.storedUserData = JSON.parse(uid).uid;
    }
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.allTodos = todos.map(todo => ({
        ...todo,
        dueDate: this.convertToDate(todo.dueDate)
      }));
      this.todos = [...this.allTodos];
    });
  }

  convertToDate(timestamp: any): Date | null {
    if (timestamp instanceof firebase.firestore.Timestamp) {
      return timestamp.toDate();
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.todoForm.valid) {
      if (this.isEdit) {
        this.updateTodo();
      } else {
        this.addTodo();
      }
    }
  }

  addTodo() {
    const newTodo: Omit<Todo, 'id'> = {
      ...this.todoForm.value,
      dueDate: new Date(this.todoForm.value.dueDate),
      completed: false
    };
    this.todoService.addTodo(newTodo).then(() => {
      this.isEdit = false;
      this.currentTodoId = null;
      this.loadTodos();
    });
    this.todoForm.reset();
  }

  updateTodo() {
    const updatedTodo: Todo = {
      id: this.currentTodoId!,
      ...this.todoForm.value,
      dueDate: new Date(this.todoForm.value.dueDate)
    };
    this.todoService.updateTodo(updatedTodo).then(() => {
      this.isEdit = false;
      this.currentTodoId = null;
      this.loadTodos();
    });
    this.todoForm.reset();
  }

  onDelete(id: string) {
    this.todoService.deleteTodo(id).then(() => {
      this.loadTodos();
    });
  }

  onEdit(todo: Todo) {
    this.isEdit = true;
    this.currentTodoId = todo.id;
    if (todo.dueDate instanceof Date && !isNaN(todo.dueDate.getTime())) {
      this.todoForm.patchValue({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate.toISOString().slice(0, 10)
      });
    } else {
      this.todoForm.patchValue({
        title: todo.title,
        description: todo.description,
        dueDate: null
      });
    }
  }

  onSearch(query: string) {
    if (!query) {
      this.todos = [...this.allTodos];
    } else {
      this.todos = this.allTodos.filter(todo => {
        const matchesTitle = todo.title.toLowerCase().includes(query.toLowerCase());
        const matchesDescription = todo.description.toLowerCase().includes(query.toLowerCase());
        const matchesDueDate = todo.dueDate ? todo.dueDate.toISOString().split('T')[0].includes(query.toLowerCase()) : false;
        return matchesTitle || matchesDescription || matchesDueDate;
      });
    }
  }
}
