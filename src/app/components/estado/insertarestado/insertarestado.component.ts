import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Estado } from '../../../models/Estado';
import { EstadoService } from '../../../services/Estado.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertarestado',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertarestado.component.html',
  styleUrl: './insertarestado.component.css',
})
export class InsertarestadoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  estado: Estado = new Estado();
  edicion: boolean = false;
  id: number = 0;
  types: { value: string; viewValue: string }[] = [
    { value: 'Disponible', viewValue: 'Disponible' },
    { value: 'Ocupado', viewValue: 'Ocupado' },
  ];

  constructor(
    private aS: EstadoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
     this.form = this.formBuilder.group({
      id:[''],
      type: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.estado.idEstado = this.form.value.id;
      this.estado.statusTypeEstado = this.form.value.type;

      const request = this.edicion
        ? this.aS.update(this.estado)
        : this.aS.insert(this.estado);

      request.subscribe(() => {
        this.aS.list().subscribe((data) => {
          this.aS.setList(data);
          this.router.navigate(['rutaEstado']);
        });
      });
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          id: [data.idEstado],
          type: [data.statusTypeEstado, Validators.required],
        });
      });
    } 
  }
}
