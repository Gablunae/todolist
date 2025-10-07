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

export function crearTarea(prompt: any): Tarea {
  const titulo = prompt("Ingrese título de la tarea: ");
  if (!titulo) throw new Error("El título es obligatorio.");

  const descripcion = prompt("Ingrese descripción (opcional): ") || "";
  const dificultad = parseInt(prompt("Ingrese dificultad (1=fácil, 2=medio, 3=difícil): ")) as 1 | 2 | 3;
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

export function mostrarDetalle(t: Tarea): string {
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

export function editarTarea(t: Tarea, prompt: any): void {
  const nuevoTitulo = prompt(`Título actual: ${t.titulo}\nNuevo título (enter mantiene): `);
  if (nuevoTitulo) t.titulo = nuevoTitulo;

  const nuevaDescripcion = prompt(`Descripción actual: ${t.descripcion}\nNueva descripción (enter mantiene, espacio vacía): `);
  if (nuevaDescripcion === " ") t.descripcion = "";
  else if (nuevaDescripcion) t.descripcion = nuevaDescripcion;

  const estado = prompt(`Estado actual: ${t.estado}\n1=Pendiente, 2=En curso, 3=Terminada, 4=Cancelada: `);
  if (estado === "1") t.estado = "Pendiente";
  else if (estado === "2") t.estado = "En Curso";
  else if (estado === "3") t.estado = "Terminada";
  else if (estado === "4") t.estado = "Cancelada";

  const dificultad = prompt(`Dificultad actual: ${t.dificultad}\n1=Fácil, 2=Medio, 3=Difícil: `);
  if (["1", "2", "3"].includes(dificultad)) t.dificultad = parseInt(dificultad) as 1 | 2 | 3;

  const vencimiento = prompt(`Vencimiento actual: ${t.vencimiento || "(sin vencimiento)"}\nNuevo vencimiento (enter mantiene, espacio borra): `);
  if (vencimiento === " ") t.vencimiento = undefined;
  else if (vencimiento) t.vencimiento = vencimiento;

  t.actualizada = new Date().toLocaleString();
  console.log("Tarea actualizada!");
}

export function buscarPorTitulo(tareas: Tarea[], clave: string): Tarea[] {
  return tareas.filter(t => t.titulo.toLowerCase().includes(clave.toLowerCase()));
}

export function ordenarTareas(prompt: any, lista: Tarea[]): Tarea[] {
  const opcion = prompt("Ordenar por:\n1. Título A-Z\n2. Fecha creación\n3. Dificultad\nOpción: ");
  if (opcion === "1") {
    return [...lista].sort((a, b) => a.titulo.localeCompare(b.titulo));
  } else if (opcion === "2") {
    return [...lista].sort((a, b) => new Date(a.creada).getTime() - new Date(b.creada).getTime());
  } else if (opcion === "3") {
    return [...lista].sort((a, b) => a.dificultad - b.dificultad);
  }
  return lista;
}
