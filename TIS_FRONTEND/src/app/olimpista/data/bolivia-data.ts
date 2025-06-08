export interface Provincia {
  id: number;
  nombre: string;
}

export interface Departamento {
  id: number;
  nombre: string;
  provincias: Provincia[];
}

export const DEPARTAMENTOS: Departamento[] = [
  {
    id: 1,
    nombre: 'La Paz',
    provincias: [
      { id: 1, nombre: 'Murillo' },
      { id: 2, nombre: 'Omasuyos' },
      { id: 3, nombre: 'Pacajes' },
      { id: 4, nombre: 'Camacho' },
      { id: 5, nombre: 'Muñecas' },
      { id: 6, nombre: 'Larecaja' },
      { id: 7, nombre: 'Franz Tamayo' },
      { id: 8, nombre: 'Ingavi' },
      { id: 9, nombre: 'Loayza' },
      { id: 10, nombre: 'Inquisivi' },
      { id: 11, nombre: 'Sud Yungas' },
      { id: 12, nombre: 'Los Andes' },
      { id: 13, nombre: 'Aroma' },
      { id: 14, nombre: 'Nor Yungas' },
      { id: 15, nombre: 'Abel Iturralde' },
      { id: 16, nombre: 'Bautista Saavedra' },
      { id: 17, nombre: 'Manco Kapac' },
      { id: 18, nombre: 'Gualberto Villarroel' },
      { id: 19, nombre: 'General José Manuel Pando' },
      { id: 20, nombre: 'Caranavi' }
    ]
  },
  {
    id: 2,
    nombre: 'Cochabamba',
    provincias: [
      { id: 1, nombre: 'Cercado' },
      { id: 2, nombre: 'Campero' },
      { id: 3, nombre: 'Ayopaya' },
      { id: 4, nombre: 'Esteban Arce' },
      { id: 5, nombre: 'Arani' },
      { id: 6, nombre: 'Arque' },
      { id: 7, nombre: 'Capinota' },
      { id: 8, nombre: 'German Jordan' },
      { id: 9, nombre: 'Quillacollo' },
      { id: 10, nombre: 'Chapare' },
      { id: 11, nombre: 'Tapacari' },
      { id: 12, nombre: 'Carrasco' },
      { id: 13, nombre: 'Mizque' },
      { id: 14, nombre: 'Punata' },
      { id: 15, nombre: 'Bolivar' },
      { id: 16, nombre: 'Tiraque' }
    ]
  },
  {
    id: 3,
    nombre: 'Santa Cruz',
    provincias: [
      { id: 1, nombre: 'Andrés Ibáñez' },
      { id: 2, nombre: 'Warnes' },
      { id: 3, nombre: 'Velasco' },
      { id: 4, nombre: 'Ichilo' },
      { id: 5, nombre: 'Chiquitos' },
      { id: 6, nombre: 'Sara' },
      { id: 7, nombre: 'Cordillera' },
      { id: 8, nombre: 'Vallegrande' },
      { id: 9, nombre: 'Florida' },
      { id: 10, nombre: 'Obispo Santistevan' },
      { id: 11, nombre: 'Ñuflo de Chávez' },
      { id: 12, nombre: 'Ángel Sandoval' },
      { id: 13, nombre: 'Manuel María Caballero' },
      { id: 14, nombre: 'Germán Busch' },
      { id: 15, nombre: 'Guarayos' }
    ]
  },
  {
    id: 4,
    nombre: 'Oruro',
    provincias: [
      { id: 1, nombre: 'Cercado' },
      { id: 2, nombre: 'Abaroa' },
      { id: 3, nombre: 'Carangas' },
      { id: 4, nombre: 'Sajama' },
      { id: 5, nombre: 'Litoral' },
      { id: 6, nombre: 'Poopó' },
      { id: 7, nombre: 'Pantaleón Dalence' },
      { id: 8, nombre: 'Ladislao Cabrera' },
      { id: 9, nombre: 'Sabaya' },
      { id: 10, nombre: 'Saucarí' },
      { id: 11, nombre: 'Tomas Barrón' },
      { id: 12, nombre: 'Sur Carangas' },
      { id: 13, nombre: 'San Pedro de Totora' },
      { id: 14, nombre: 'Sébastian Pagador' },
      { id: 15, nombre: 'Mejillones' },
      { id: 16, nombre: 'Eduardo Avaroa' }
    ]
  },
  {
    id: 5,
    nombre: 'Potosí',
    provincias: [
      { id: 1, nombre: 'Tomas Frías' },
      { id: 2, nombre: 'Rafael Bustillo' },
      { id: 3, nombre: 'Cornelio Saavedra' },
      { id: 4, nombre: 'Charcas' },
      { id: 5, nombre: 'Nor Chichas' },
      { id: 6, nombre: 'Alonso de Ibáñez' },
      { id: 7, nombre: 'Antonio Quijarro' },
      { id: 8, nombre: 'General Bernardino Bilbao' },
      { id: 9, nombre: 'Daniel Campos' },
      { id: 10, nombre: 'Modesto Omiste' },
      { id: 11, nombre: 'Enrique Baldivieso' },
      { id: 12, nombre: 'José María Linares' },
      { id: 13, nombre: 'Nor Lípez' },
      { id: 14, nombre: 'Sud Chichas' },
      { id: 15, nombre: 'Sud Lípez' },
      { id: 16, nombre: 'Sur Lípez' }
    ]
  },
  {
    id: 6,
    nombre: 'Tarija',
    provincias: [
      { id: 1, nombre: 'Cercado' },
      { id: 2, nombre: 'Arce' },
      { id: 3, nombre: 'Gran Chaco' },
      { id: 4, nombre: 'Avilez' },
      { id: 5, nombre: 'Méndez' },
      { id: 6, nombre: 'Burnet O\'Connor' }
    ]
  },
  {
    id: 7,
    nombre: 'Chuquisaca',
    provincias: [
      { id: 1, nombre: 'Oropeza' },
      { id: 2, nombre: 'Azurduy' },
      { id: 3, nombre: 'Zudáñez' },
      { id: 4, nombre: 'Tomina' },
      { id: 5, nombre: 'Hernando Siles' },
      { id: 6, nombre: 'Yamparáez' },
      { id: 7, nombre: 'Nor Cinti' },
      { id: 8, nombre: 'Belisario Boeto' },
      { id: 9, nombre: 'Sud Cinti' },
      { id: 10, nombre: 'Luis Calvo' }
    ]
  },
  {
    id: 8,
    nombre: 'Beni',
    provincias: [
      { id: 1, nombre: 'Cercado' },
      { id: 2, nombre: 'Vaca Diez' },
      { id: 3, nombre: 'General José Ballivián' },
      { id: 4, nombre: 'Yacuma' },
      { id: 5, nombre: 'Moxos' },
      { id: 6, nombre: 'Marbán' },
      { id: 7, nombre: 'Mamoré' },
      { id: 8, nombre: 'Iténez' }
    ]
  },
  {
    id: 9,
    nombre: 'Pando',
    provincias: [
      { id: 1, nombre: 'Nicolás Suárez' },
      { id: 2, nombre: 'Manuripi' },
      { id: 3, nombre: 'Madre de Dios' },
      { id: 4, nombre: 'Abuná' },
      { id: 5, nombre: 'Federico Román' }
    ]
  }
]; 