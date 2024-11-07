import { Component } from '@angular/core';
import { ShoppingListService, ShoppingItem } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  newItemName: string = ''; 
  editItemId: number | null = null; 
  editItemName: string = ''; 

  constructor(public shoppingListService: ShoppingListService) {}

  
  addItem() {
    if (this.newItemName.trim()) {
      this.shoppingListService.addItem(this.newItemName);
      this.newItemName = ''; 
    }
  }


  startEditing(item: ShoppingItem) {
    this.editItemId = item.id;
    this.editItemName = item.name;
  }

 
  saveEdit() {
    if (this.editItemId !== null && this.editItemName.trim()) {
      this.shoppingListService.editItem(this.editItemId, this.editItemName);
      this.editItemId = null; 
      this.editItemName = ''; 
    }
  }


  deleteItem(id: number) {
    this.shoppingListService.deleteItem(id);
  }


  toggleBoughtStatus(id: number) {
    this.shoppingListService.toggleBoughtStatus(id);
  }


  get boughtItems() {
    return this.shoppingListService.getItems().filter(item => item.bought);
  }


  get unboughtItems() {
    return this.shoppingListService.getItems().filter(item => !item.bought);
  }
}
