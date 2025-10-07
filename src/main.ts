import promptSync from 'prompt-sync';
import { crearTarea, editarTarea, mostrarDetalle, buscarPorTitulo, ordenarTareas, Tarea, EstadoTarea } from './tarea';
import { mostrarMenuPrincipal, mostrarMenuVerTareas, mostrarListadoTareas } from './ui';

const prompt = promptSync();
let tareas: Tarea[] = [];

function menuPrincipal(): void {
  let opcion: string;

  do {
    opcion = mostrarMenuPrincipal(prompt);

    if (opcion === "1") verMisTareas();
    else if (opcion === "2") buscarTarea();
    else if (opcion === "3") {
      const nueva = crearTarea(prompt);
      tareas.push(nueva);
      console.log("Tarea agregada!\n");
    }
    else if (opcion === "0") {
      console.log("Hasta luego!");
    }
  } while (opcion !== "0");
}

function verMisTareas(): void {
  let opcion: string;
  do {
    opcion = mostrarMenuVerTareas(prompt);
    let filtro: EstadoTarea | 'todas';

    if (opcion === "1") filtro = 'todas';
    else if (opcion === "2") filtro = 'Pendiente';
    else if (opcion === "3") filtro = 'En Curso';
    else if (opcion === "4") filtro = 'Terminada';
    else continue;

    const lista = tareas.filter(t => filtro === 'todas' || t.estado === filtro);
    if (lista.length === 0) {
      console.log("No hay tareas para mostrar.\n");
      continue;
    }

    const ordenadas = ordenarTareas(prompt, lista);
    mostrarListadoTareas(prompt, ordenadas, tareas);
  } while (opcion !== "0");
}

function buscarTarea(): void {
  const clave = prompt("Ingrese palabra clave para buscar en títulos: ");
  if (!clave) return;

  const resultados = buscarPorTitulo(tareas, clave);
  if (resultados.length === 0) {
    console.log("No se encontraron tareas.");
    return;
  }

  mostrarListadoTareas(prompt, resultados, tareas);
}

menuPrincipal();
