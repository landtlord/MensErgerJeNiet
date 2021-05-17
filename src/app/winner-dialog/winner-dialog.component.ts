import {Component, OnInit} from '@angular/core';
import {PlayFieldService} from '../services/play-field.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner-dialog.component.html',
  styleUrls: ['./winner-dialog.component.css']
})
export class WinnerDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WinnerDialogComponent>,
              public playFieldService: PlayFieldService) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.playFieldService.reset();
    this.dialogRef.close();
  }

}
