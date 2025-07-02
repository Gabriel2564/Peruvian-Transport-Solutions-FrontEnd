import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Resenia } from '../../../models/Resenia';
import { ReseniaService } from '../../../services/Resenia.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarresenia',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './listarresenia.component.html',
  styleUrl: './listarresenia.component.css'
})
export class ListarreseniaComponent implements OnInit {

  resenias: Resenia[] = [];

  constructor(private rS: ReseniaService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.resenias = data;
    });
  }
  sumarLike(resenia: Resenia) {
  resenia.likesResenia++;
}

  eliminar(id: number) {
    this.rS.deleteA(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.resenias = data;
      });
    });
  }
}
