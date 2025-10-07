"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostrarMenuPrincipal = mostrarMenuPrincipal;
exports.mostrarMenuVerTareas = mostrarMenuVerTareas;
exports.mostrarListadoTareas = mostrarListadoTareas;
const tarea_1 = require("./tarea");
function mostrarMenuPrincipal(prompt) {
    return prompt(`Menú Principal
1. Ver mis tareas
2. Buscar una tarea
3. Agregar una tarea
0. Salir
Opción: `);
}
function mostrarMenuVerTareas(prompt) {
    return prompt(`Ver Mis Tareas
1. Todas
2. Pendientes
3. En curso
4. Terminadas
0. Volver
Opción: `);
}
function mostrarListadoTareas(prompt, lista, tareas) {
    let salida = "Tareas:\n";
    lista.forEach((t, i) => {
        salida += `${i + 1}. ${t.titulo} (${t.estado})\n`;
    });
    const opcion = parseInt(prompt(salida + "\nSeleccione número para ver detalles o 0 para volver: "));
    if (opcion > 0 && opcion <= lista.length) {
        let tarea = lista[opcion - 1];
        let accion;
        do {
            accion = prompt((0, tarea_1.mostrarDetalle)(tarea) + "\nOpciones:\nE. Editar\n0. Volver\nOpción: ");
            if (accion.toUpperCase() === "E") {
                (0, tarea_1.editarTarea)(tarea, prompt);
            }
        } while (accion !== "0");
    }
}
