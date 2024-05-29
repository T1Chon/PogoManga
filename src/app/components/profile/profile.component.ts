import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { AddressService } from '../../service/address.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../../service/users.service';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoginComponent, HeaderComponent, FormsModule, HttpClientModule],
  providers: [AddressService, UsersService, AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  paisesEuropa: string[] = [
    'Albania',
    'Alemania',
    'Andorra',
    'Armenia',
    'Austria',
    'Azerbaiyán',
    'Bélgica',
    'Bielorrusia',
    'Bosnia y Herzegovina',
    'Bulgaria',
    'Chipre',
    'Croacia',
    'Dinamarca',
    'Eslovaquia',
    'Eslovenia',
    'España',
    'Estonia',
    'Finlandia',
    'Francia',
    'Georgia',
    'Grecia',
    'Hungría',
    'Irlanda',
    'Islandia',
    'Italia',
    'Kazajistán',
    'Kosovo',
    'Letonia',
    'Liechtenstein',
    'Lituania',
    'Luxemburgo',
    'Malta',
    'Moldavia',
    'Mónaco',
    'Montenegro',
    'Noruega',
    'Países Bajos',
    'Polonia',
    'Portugal',
    'Reino Unido',
    'República Checa',
    'Rumania',
    'Rusia',
    'San Marino',
    'Serbia',
    'Suecia',
    'Suiza',
    'Turquía',
    'Ucrania',
    'Vaticano',
  ];

  provinciasPorPais: { [key: string]: string[] } = {
    España: [
      'Madrid',
      'Barcelona',
      'Valencia',
      'Sevilla',
      'Zaragoza',
      'Málaga',
      'Murcia',
      'Palma de Mallorca',
      'Las Palmas de Gran Canaria',
      'Bilbao',
      'Alicante',
      'Córdoba',
      'Valladolid',
      'Vigo',
      'Gijón',
      'La Coruña',
      'Granada',
      'Tenerife',
      'Pamplona',
      'Almería',
    ],
    Alemania: [
      'Baviera',
      'Berlín',
      'Brandeburgo',
      'Hamburgo',
      'Hesse',
      'Renania del Norte-Westfalia',
      'Baja Sajonia',
      'Baden-Wurtemberg',
      'Sajonia',
      'Renania-Palatinado',
      'Sarre',
      'Turingia',
      'Schleswig-Holstein',
      'Mecklemburgo-Pomerania Occidental',
      'Sajonia-Anhalt',
      'Schleswig-Holstein',
      'Renania-Palatinado',
      'Brandeburgo',
      'Baja Sajonia',
      'Hesse',
    ],
    Francia: [
      'París',
      'Marsella',
      'Lyon',
      'Toulouse',
      'Niza',
      'Nantes',
      'Estrasburgo',
      'Montpellier',
      'Burdeos',
      'Lille',
      'Rennes',
      'Reims',
      'Le Havre',
      'Saint-Étienne',
      'Toulon',
      'Grenoble',
      'Dijon',
      'Angers',
      'Nimes',
      'Le Mans',
    ],
    Italia: [
      'Lombardía',
      'Lazio',
      'Campaña',
      'Véneto',
      'Piamonte',
      'Emilia-Romaña',
      'Toscana',
      'Apulia',
      'Calabria',
      'Sicilia',
      'Liguria',
      'Friuli-Venecia Julia',
      'Trentino-Alto Adigio',
      'Umbría',
      'Basilicata',
      'Molise',
      'Abruzos',
      'Campania',
      'Emilia-Romagna',
      'Marche',
    ],
    'Reino Unido': [
      'Londres',
      'Birmingham',
      'Mánchester',
      'Glasgow',
      'Liverpool',
      'Edimburgo',
      'Bristol',
      'Sheffield',
      'Leeds',
      'Newcastle upon Tyne',
      'Nottingham',
      'Leicester',
      'Belfast',
      'Cardiff',
      'Aberdeen',
      'Plymouth',
      'Southampton',
      'Swansea',
      'Bradford',
      'Brighton',
    ],
    Portugal: [
      'Lisboa',
      'Oporto',
      'Braga',
      'Coímbra',
      'Aveiro',
      'Faro',
      'Setúbal',
      'Funchal',
      'Évora',
      'Viseu',
      'Viana do Castelo',
      'Guarda',
      'Castelo Branco',
      'Santarém',
      'Portalegre',
      'Beja',
      'Braganza',
    ],
    Suiza: [
      'Zúrich',
      'Ginebra',
      'Basilea',
      'Lausana',
      'Berna',
      'Lucerna',
      'San Galo',
      'Lugano',
      'Biel/Bienne',
      'Thun',
      'Köniz',
      'La Chaux-de-Fonds',
      'Schaffhausen',
      'Friburgo',
      'Neuchâtel',
      'Sion',
      'Uster',
      'Zug',
    ],
    Grecia: [
      'Atenas',
      'Tesalónica',
      'Patras',
      'Heraklion',
      'Larisa',
      'Volos',
      'Ioánina',
      'Chania',
      'Rodas',
      'Chalcis',
      'Chíos',
      'Lárisa',
      'Kavala',
      'Komotini',
      'Árgos',
      'Serres',
      'Drama',
      'Alexandrópolis',
      'Katerini',
      'Kalamata',
    ],
    Polonia: [
      'Varsovia',
      'Cracovia',
      'Łódź',
      'Wrocław',
      'Poznań',
      'Gdansk',
      'Szczecin',
      'Bydgoszcz',
      'Lublin',
      'Bialystok',
      'Katowice',
      'Gdynia',
      'Czestochowa',
      'Sosnowiec',
      'Radom',
      'Toruń',
      'Kielce',
      'Rzeszów',
      'Gliwice',
      'Zabrze',
    ],
    Austria: [
      'Viena',
      'Graz',
      'Linz',
      'Salzburgo',
      'Innsbruck',
      'Klagenfurt',
      'Villach',
      'Wels',
      'Sankt Pölten',
      'Dornbirn',
      'Wiener Neustadt',
      'Steyr',
      'Feldkirch',
      'Bregenz',
      'Leonding',
      'Klosterneuburg',
      'Baden',
      'Wolfsberg',
      'Leoben',
      'Krems',
    ],
    Noruega: [
      'Oslo',
      'Bergen',
      'Stavanger',
      'Trondheim',
      'Drammen',
      'Fredrikstad',
      'Kristiansand',
      'Sandnes',
      'Tromsø',
      'Sarpsborg',
      'Skien',
      'Ålesund',
      'Sandefjord',
      'Haugesund',
      'Tønsberg',
      'Moss',
      'Porsgrunn',
      'Bodø',
      'Arendal',
      'Hamar',
    ],
    Suecia: [
      'Estocolmo',
      'Gotemburgo',
      'Malmö',
      'Uppsala',
      'Västerås',
      'Örebro',
      'Linköping',
      'Helsingborg',
      'Jönköping',
      'Norrköping',
      'Lund',
      'Umeå',
      'Gävle',
      'Borås',
      'Södertälje',
      'Eskilstuna',
      'Halmstad',
      'Växjö',
      'Karlstad',
      'Trollhättan',
    ],
    Dinamarca: [
      'Copenhague',
      'Aarhus',
      'Odense',
      'Aalborg',
      'Esbjerg',
      'Randers',
      'Kolding',
      'Horsens',
      'Vejle',
      'Roskilde',
      'Greve Strand',
      'Tårnby',
      'Herning',
      'Hørsholm',
      'Helsingør',
      'Silkeborg',
      'Næstved',
      'Fredericia',
      'Viborg',
      'Køge',
    ],
    'Países Bajos': [
      'Ámsterdam',
      'Róterdam',
      'La Haya',
      'Utrecht',
      'Eindhoven',
      'Tilburgo',
      'Groninga',
      'Almere',
      'Breda',
      'Nimega',
      'Enschede',
      'Haarlem',
      'Arnhem',
      'Zaanstad',
      'Amersfoort',
      'Apeldoorn',
      'Zwolle',
      'Maastricht',
      'Leiden',
      'Dordrecht',
    ],
    Bélgica: [
      'Bruselas',
      'Amberes',
      'Gante',
      'Brujas',
      'Lovaina',
      'Mons',
      'Lieja',
      'Namur',
      'Aalst',
      'Charleroi',
      'Kortrijk',
      'Hasselt',
      'Ostende',
      'Sint-Niklaas',
      'Tournai',
      'Genk',
      'Seraing',
      'Roeselare',
      'Mechelen',
      'Verviers',
    ],
    Turquía: [
      'Estambul',
      'Ankara',
      'Estambul',
      'Izmir',
      'Bursa',
      'Adana',
      'Gaziantep',
      'Konya',
      'Antalya',
      'Mersin',
      'Kayseri',
      'Eskisehir',
      'Diyarbakir',
      'Sanliurfa',
      'Denizli',
      'Samsun',
      'Malatya',
      'Kahramanmaras',
      'Erzurum',
      'Van',
    ],
    Rumania: [
      'Bucarest',
      'Cluj-Napoca',
      'Timișoara',
      'Iași',
      'Constanța',
      'Craiova',
      'Brașov',
      'Galați',
      'Ploiești',
      'Oradea',
      'Brăila',
      'Arad',
      'Pitești',
      'Sibiu',
      'Bacău',
      'Târgu Mureș',
      'Baia Mare',
      'Buzău',
      'Botoșani',
      'Satu Mare',
    ],
    Hungría: [
      'Budapest',
      'Debrecen',
      'Szeged',
      'Miskolc',
      'Pécs',
      'Győr',
      'Nyíregyháza',
      'Kecskemét',
      'Székesfehérvár',
      'Szombathely',
      'Szolnok',
      'Tatabánya',
      'Kaposvár',
      'Érd',
      'Veszprém',
      'Békéscsaba',
      'Zalaegerszeg',
      'Sopron',
      'Eger',
      'Nagykanizsa',
    ],
  };

  user: any = {};
  direcciones: any[] = [];
  nuevaDireccion: any = {};
  userId: number = 0;
  agregandoDireccion: boolean = false;
  nuevaDireccionProvincias: string[] = [];
  codigoPostalErrorMessage: string = '';
  agregadoExitosamente: boolean = false;
  indiceDireccionAgregada: number | null = null;


  constructor(
    private addressService: AddressService,
    private usersService: UsersService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userSession = sessionStorage.getItem('user');
      console.log('Contenido de userSession:', userSession); // Depurar
      if (userSession) {
        let userData;
        try {
          userData = JSON.parse(userSession);
        } catch (e) {
          console.error('Error al parsear userSession:', e);
        }
        console.log('Contenido de userData:', userData); // Depurar
        if (userData && userData.user && Array.isArray(userData.user)) {
          const user = userData.user[0]; // Acceder al primer objeto en el arreglo
          console.log('Contenido de userData.user:', user); // Depurar
          if (user && user.id_usuario) {
            this.userId = user.id_usuario;
            this.getUserAndDirecciones(this.userId);
            console.log('Usuario logueado:', user);
          } else {
            console.log('id_usuario no definido');
          }
        } else {
          console.log('No hay usuario logueado');
        }
      } else {
        console.log('No hay usuario logueado');
      }
  
      // Recuperar valores seleccionados de los desplegables
      const selectedPais = localStorage.getItem('selectedPais');
      const selectedProvincia = localStorage.getItem('selectedProvincia');
  
      // Establecer los valores seleccionados si existen
      if (selectedPais) {
        this.direcciones.forEach((item) => {
          if (item.pais === selectedPais) {
            item.provincias = this.provinciasPorPais[selectedPais] || [];
            if (item.provincia === selectedProvincia) {
              item.provincia = selectedProvincia;
            }
          }
        });
      }
    }
  }
  
  
  

  getUserAndDirecciones(userId: number): void {
    this.addressService.getDirecciones(userId).subscribe({
      next: (data) => {
        this.user = { ...this.user, ...data.user };

        this.direcciones = data.direcciones.slice(0, 5);

        console.log('Datos obtenidos:', data);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener datos:', error.message);
      },
    });
  }

  updateUser(): void {
    if (this.userId && this.user) {
      this.usersService.updateUser(this.userId, this.user).subscribe({
        next: (response) => {
          console.log('Usuario actualizado con éxito:', response);
          this.user = { ...this.user, ...response };
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al actualizar usuario:', error.message);
        },
      });
    }
  }

  updateDireccion(direccionId: number, direccion: any): void {
    // Validar el código postal antes de enviar la actualización
    if (!this.validarCodigoPostal(direccion.codigo_postal)) {
      this.codigoPostalErrorMessage = 'El código postal debe ser un número de 5 dígitos.';
      return; // Detener la ejecución si el código postal no es válido
    } else {
      this.codigoPostalErrorMessage = ''; // Limpiar el mensaje de error si el código postal es válido
    }

    console.log('Datos antes de enviar:', direccion);
    this.addressService.updateDireccion(direccionId, direccion).subscribe({
      next: (response) => {
        console.log('Dirección actualizada con éxito:', response);
        const index = this.direcciones.findIndex(
          (d) => d.id_direccion === direccionId
        );
        if (index !== -1) {
          this.direcciones[index] = {
            ...this.direcciones[index],
            ...direccion,
          };
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al actualizar dirección:', error.message);
      },
    });
  }

  agregarDireccion(): void {
    this.agregandoDireccion = true;
    this.nuevaDireccion = {};
  }


  confirmarNuevaDireccion(): void {
    // Validar el código postal antes de confirmar la nueva dirección
    if (!this.validarCodigoPostal(this.nuevaDireccion.codigo_postal)) {
      this.codigoPostalErrorMessage = 'El código postal debe ser un número de 5 dígitos.';
      return; // Detener la ejecución si el código postal no es válido
    } else {
      this.codigoPostalErrorMessage = ''; // Limpiar el mensaje de error si el código postal es válido
    }

    if (this.userId && this.nuevaDireccion) {
      this.addressService
        .addDireccion(this.userId, this.nuevaDireccion)
        .subscribe({
          next: (response) => {
            console.log('Nueva dirección agregada con éxito:', response);
            this.getUserAndDirecciones(this.userId);
            this.nuevaDireccion = {};
            this.agregandoDireccion = false;
            this.direcciones.push(response);
            this.agregadoExitosamente = true;
            setTimeout(() => {
              this.agregadoExitosamente = false;
            }, 3000);
            this.indiceDireccionAgregada = this.direcciones.length - 1;
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error al agregar nueva dirección:', error.message);
          },
        });
    }
}

  cancelarAgregarDireccion(): void {
    this.agregandoDireccion = false;
    this.nuevaDireccion = {};
  }

  eliminarDireccion(direccionId: number): void {
    this.addressService.deleteDireccion(direccionId).subscribe({
      next: () => {
        console.log('Dirección eliminada con éxito');
        this.getUserAndDirecciones(this.userId); // Actualiza la lista de direcciones después de eliminarla
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al eliminar dirección:', error.message);
      },
    });
  }

  onPaisChange(item: any): void {
    const selectedPais = item.pais;
    item.provincias = this.provinciasPorPais[selectedPais] || [];
    item.provincia = '';
    localStorage.setItem('selectedPais', selectedPais);
    localStorage.setItem('selectedProvincia', '');
  }

  onProvinciaChange(item: any): void {
    localStorage.setItem('selectedProvincia', item.provincia);
  }

  onNuevaDireccionPaisChange(): void {
    this.nuevaDireccionProvincias =
      this.provinciasPorPais[this.nuevaDireccion.pais] || [];
    this.nuevaDireccion.provincia = '';
  }

  validarCodigoPostal(codigoPostal: string): boolean {
    return /^\d{5}$/.test(codigoPostal);
  }

}
