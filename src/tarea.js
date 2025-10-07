"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTarea = crearTarea;
exports.mostrarDetalle = mostrarDetalle;
exports.editarTarea = editarTarea;
exports.buscarPorTitulo = buscarPorTitulo;
exports.ordenarTareas = ordenarTareas;
function crearTarea(prompt) {
    const titulo = prompt("Ingrese título de la tarea: ");
    if (!titulo)
        throw new Error("El título es obligatorio.");
    const descripcion = prompt("Ingrese descripción (opcional): ") || "";
    const dificultad = parseInt(prompt("Ingrese dificultad (1=fácil, 2=medio, 3=difícil): "));
    const vencimiento = prompt("Ingrese fecha de vencimiento (opcional): ") || undefined;
    const ahora = new Date().toLocaleString();
    return {
        titulo,
        descripcion,
        estado: "Pendiente",
        dificultad: [1, 2, 3].includes(dificultad) ? dificultad : 1,
        creada: ahora,
        actualizada: ahora,
        vencimiento,
    };
}
function mostrarDetalle(t) {
    const dificultadTxt = t.dificultad === 1 ? "⭐ (Fácil)" : t.dificultad === 2 ? "⭐⭐ (Medio)" : "⭐⭐⭐ (Difícil)";
    return `
Título: ${t.titulo}
Descripción: ${t.descripcion || "(vacío)"}
Creación: ${t.creada}
Última edición: ${t.actualizada}
Vencimiento: ${t.vencimiento || "(sin vencimiento)"}
Estado: ${t.estado}
Dificultad: ${dificultadTxt}`.trim();
}
function editarTarea(t, prompt) {
    const nuevoTitulo = prompt(`Título actual: ${t.titulo}\nNuevo título (enter mantiene): `);
    if (nuevoTitulo)
        t.titulo = nuevoTitulo;
    const nuevaDescripcion = prompt(`Descripción actual: ${t.descripcion}\nNueva descripción (enter mantiene, espacio vacía): `);
    if (nuevaDescripcion === " ")
        t.descripcion = "";
    else if (nuevaDescripcion)
        t.descripcion = nuevaDescripcion;
    const estado = prompt(`Estado actual: ${t.estado}\n1=Pendiente, 2=En curso, 3=Terminada, 4=Cancelada: `);
    if (estado === "1")
        t.estado = "Pendiente";
    else if (estado === "2")
        t.estado = "En Curso";
    else if (estado === "3")
        t.estado = "Terminada";
    else if (estado === "4")
        t.estado = "Cancelada";
    const dificultad = prompt(`Dificultad actual: ${t.dificultad}\n1=Fácil, 2=Medio, 3=Difícil: `);
    if (["1", "2", "3"].includes(dificultad))
        t.dificultad = parseInt(dificultad);
    const vencimiento = prompt(`Vencimiento actual: ${t.vencimiento || "(sin vencimiento)"}\nNuevo vencimiento (enter mantiene, espacio borra): `);
    if (vencimiento === " ")
        t.vencimiento = undefined;
    else if (vencimiento)
        t.vencimiento = vencimiento;
    t.actualizada = new Date().toLocaleString();
    console.log("Tarea actualizada!");
}
function buscarPorTitulo(tareas, clave) {
    return tareas.filter(t => t.titulo.toLowerCase().includes(clave.toLowerCase()));
}
function ordenarTareas(prompt, lista) {
    const opcion = prompt("Ordenar por:\n1. Título A-Z\n2. Fecha creación\n3. Dificultad\nOpción: ");
    if (opcion === "1") {
        return [...lista].sort((a, b) => a.titulo.localeCompare(b.titulo));
    }
    else if (opcion === "2") {
        return [...lista].sort((a, b) => new Date(a.creada).getTime() - new Date(b.creada).getTime());
    }
    else if (opcion === "3") {
        return [...lista].sort((a, b) => a.dificultad - b.dificultad);
    }
    return lista;
}
//# sourceMappingURL=tarea.js.map