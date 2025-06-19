import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertarrol',
  imports: [],
  templateUrl: './insertarrol.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertarrol.component.css'
})
export class InsertarrolComponent {

}
