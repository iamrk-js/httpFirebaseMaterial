import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dalog',
  templateUrl: './mat-dalog.component.html',
  styleUrls: ['./mat-dalog.component.scss']
})
export class MatDalogComponent implements OnInit {

  constructor(
    private _dialgRef : MatDialogRef<MatDalogComponent>
  ) { }

  ngOnInit(): void {
  }

  onConfirm(flag : boolean){
    this._dialgRef.close(flag)
  }

}
