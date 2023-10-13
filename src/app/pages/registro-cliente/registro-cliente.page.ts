import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.page.html',
  styleUrls: ['./registro-cliente.page.scss'],
})
export class RegistroClientePage {
  rut: string= '';
  nombre: string= '';
  apaterno:  string= '';
  amaterno: string= '';
  edad: string= '';
  direccion: string= '';
  telefono: string= '';
  email: string= '';
  nomUsuario: string= '';
  contrasena: string= '';

  constructor(
    private toastController: ToastController,
    private router: Router)
    {}

    async clienteAgregadoExitosamente() {
      const toast = await this.toastController.create({
        message: 'Cliente agregado con éxito',
        duration: 3000,
        position: 'top',
      });
      toast.present();

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }

  registrarCliente() {
    console.log('Rut:', this.rut)
    console.log('Nombre:', this.nombre);
    console.log('Apellido Paterno:', this.apaterno)
    console.log('Apellido Materno:', this.amaterno)
    console.log('Edad:', this.edad)
    console.log('Dirección:', this.direccion)
    console.log('Teléfono:', this.telefono)
    console.log('Email:', this.email);
    console.log('Nombre Usuario:', this.nomUsuario);
    console.log('Contraseña:', this.contrasena);

    this.router.navigate(['/login']);
  }
}
