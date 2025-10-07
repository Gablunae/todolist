import { Tarea, mostrarDetalle, editarTarea } from './tarea';

export function mostrarMenuPrincipal(prompt: any): string {
  return prompt(
    `Menú Principal
1. Ver mis tareas
2. Buscar una tarea
3. Agregar una tarea
0. Salir
Opción: `
  );
}

export function mostrarMenuVerTareas(prompt: any): string {
  return prompt(
    `Ver Mis Tareas
1. Todas
2. Pendientes
3. En curso
4. Terminadas
0. Volver
Opción: `
  );
}

export function mostrarListadoTareas(prompt: any, lista: Tarea[], tareas: Tarea[]): void {
  let salida = "Tareas:\n";
  lista.forEach((t, i) => {
    salida += `${i + 1}. ${t.titulo} (${t.estado})\n`;
  });

  const opcion = parseInt(prompt(salida + "\nSeleccione número para ver detalles o 0 para volver: "));
  if (opcion > 0 && opcion <= lista.length) {
    let tarea = lista[opcion - 1];
    let accion: string;
    do {
      accion = prompt(mostrarDetalle(tarea) + "\nOpciones:\nE. Editar\n0. Volver\nOpción: ");
      if (accion.toUpperCase() === "E") {
        editarTarea(tarea, prompt);
      }
    } while (accion !== "0");
  }
}
