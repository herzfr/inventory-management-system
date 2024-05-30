import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventoryItem } from '../../interfaces/inventory.type';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input() item: InventoryItem | undefined;
  @Input() isAdmin: boolean = false;
  @Output() emit: EventEmitter<any> = new EventEmitter<any>();

  onEmit(event: 'VIEW' | 'EDIT' | 'DELETE') {
    this.emit.next(event)
  }
}
