import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<Todo>;

  constructor(private firestore: AngularFirestore) {
    this.todosCollection = this.firestore.collection<Todo>('todos');
  }

  getTodos(): Observable<Todo[]> {
    return this.todosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
      catchError(error => {
        console.error('Error getting todos:', error);
        throw error; // Rethrow the error to be handled by the caller
      })
    );
  }

  addTodo(todo: Omit<Todo, 'id'>): Promise<void> {
    return this.todosCollection.add(todo).then(() => {
      // handle success
    }).catch((error) => {
      console.error('Error adding todo:', error);
      throw error; // Rethrow the error to be handled by the caller
    });
  }

  updateTodo(todo: Todo): Promise<void> {
    const { id, ...data } = todo; // Separate `id` from the rest of the data
    return this.todosCollection.doc(id as string).update(data).then(() => {
      // handle success
    }).catch((error) => {
      console.error('Error updating todo:', error);
      throw error; // Rethrow the error to be handled by the caller
    });
  }

  deleteTodo(id: string): Promise<void> {
    return this.todosCollection.doc(id).delete().then(() => {
      // handle success
    }).catch((error) => {
      console.error('Error deleting todo:', error);
      throw error; // Rethrow the error to be handled by the caller
    });
  }
}
