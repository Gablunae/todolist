"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const tarea_1 = require("./tarea");
const ui_1 = require("./ui");
const prompt = (0, prompt_sync_1.default)();
let tareas = [];
function menuPrincipal() {
    let opcion;
    do {
        opcion = (0, ui_1.mostrarMenuPrincipal)(prompt);
        if (opcion === "1")
            verMisTareas();
        else if (opcion === "2")
            buscarTarea();
        else if (opcion === "3") {
            const nueva = (0, tarea_1.crearTarea)(prompt);
            tareas.push(nueva);
            console.log("Tarea agregada!\n");
        }
        else if (opcion === "0") {
            console.log("Hasta luego!");
        }
    } while (opcion !== "0");
}
function verMisTareas() {
    let opcion;
    do {
        opcion = (0, ui_1.mostrarMenuVerTareas)(prompt);
        let filtro;
        if (opcion === "1")
            filtro = 'todas';
        else if (opcion === "2")
            filtro = 'Pendiente';
        else if (opcion === "3")
            filtro = 'En Curso';
        else if (opcion === "4")
            filtro = 'Terminada';
        else
            continue;
        const lista = tareas.filter(t => filtro === 'todas' || t.estado === filtro);
        if (lista.length === 0) {
            console.log("No hay tareas para mostrar.\n");
            continue;
        }
        const ordenadas = (0, tarea_1.ordenarTareas)(prompt, lista);
        (0, ui_1.mostrarListadoTareas)(prompt, ordenadas, tareas);
    } while (opcion !== "0");
}
function buscarTarea() {
    const clave = prompt("Ingrese palabra clave para buscar en títulos: ");
    if (!clave)
        return;
    const resultados = (0, tarea_1.buscarPorTitulo)(tareas, clave);
    if (resultados.length === 0) {
        console.log("No se encontraron tareas.");
        return;
    }
    (0, ui_1.mostrarListadoTareas)(prompt, resultados, tareas);
}
menuPrincipal();
