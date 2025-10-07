export type EstadoTarea = "Pendiente" | "En Curso" | "Terminada" | "Cancelada";
export type Tarea = {
    titulo: string;
    descripcion: string;
    estado: EstadoTarea;
    dificultad: 1 | 2 | 3;
    creada: string;
    actualizada: string;
    vencimiento?: string;
};
export declare function crearTarea(prompt: any): Tarea;
export declare function mostrarDetalle(t: Tarea): string;
export declare function editarTarea(t: Tarea, prompt: any): void;
export declare function buscarPorTitulo(tareas: Tarea[], clave: string): Tarea[];
export declare function ordenarTareas(prompt: any, lista: Tarea[]): Tarea[];
//# sourceMappingURL=tarea.d.ts.map