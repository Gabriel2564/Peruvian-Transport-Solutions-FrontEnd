import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Resenia } from '../../../models/Resenia';
import { ReseniaService } from '../../../services/Resenia.service';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listarresenia',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './listarresenia.component.html',
  styleUrl: './listarresenia.component.css'
})
export class ListarreseniaComponent implements  AfterViewInit {

  resDataSource: MatTableDataSource<Resenia> = new MatTableDataSource<Resenia>();
  resFiltro: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: ReseniaService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data: Resenia[]) => {
      this.resDataSource = new MatTableDataSource<Resenia>(data);
      this.resDataSource.filterPredicate = (data: Resenia, filter: string) => {
        const f = filter.trim().toLowerCase();
        return data.contentResenia.toLowerCase().includes(f)
          || data.usuario.username.toLowerCase().includes(f);
      };
    });
    this.rS.getList().subscribe((data: Resenia[]) => {
          this.resDataSource = new MatTableDataSource<Resenia>(data);
          this.resDataSource.filterPredicate = (data: Resenia, filter: string) => {
            const f = filter.trim().toLowerCase();
            return data.contentResenia.toLowerCase().includes(f)
             || data.usuario.username.toLowerCase().includes(f);
          };
        });
  }

  ngAfterViewInit() {
    this.resDataSource.paginator = this.paginator;
  }

  resAplicarFiltro() {
    this.resDataSource.filter = this.resFiltro.trim().toLowerCase();
    if (this.resDataSource.paginator) {
      this.resDataSource.paginator.firstPage();
    }
  }

  sumarLike(res: Resenia) {
    res.likesResenia++;
  }

  eliminar(id: number) {
    this.rS.deleteA(id).subscribe(() => {
      this.rS.list().subscribe((data: Resenia[]) => {
        this.resDataSource.data = data;
        this.resAplicarFiltro();
      });
    });
  }
}
