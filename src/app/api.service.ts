import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http:HttpClient) { }

  getAllProducts() {
    return this.http.get(this.apiUrl);
  }
}
