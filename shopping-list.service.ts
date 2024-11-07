import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private apiUrl = 'http://localhost:3000/shopping-list'; 

  constructor(private http: HttpClient) {}

  getShoppingList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erro ao carregar a lista', error);
        throw error;
      })
    );
  }

  addItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item).pipe(
      catchError((error) => {
        console.error('Erro ao adicionar item', error);
        throw error;
      })
    );
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Erro ao excluir item', error);
        throw error;
      })
    );
  }

  updateItem(id: number, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item).pipe(
      catchError((error) => {
        console.error('Erro ao atualizar item', error);
        throw error;
      })
    );
  }
}
