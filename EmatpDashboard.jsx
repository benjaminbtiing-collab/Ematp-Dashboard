import { useState } from "react";
import {
  Home, Clock, BookOpen, User,
  LogOut, Calendar, Send, GraduationCap, Megaphone
} from "lucide-react";
const logoEscuela = "https://i.ibb.co/v4m6pM8/LOGO-1.png";
import "./EmatpDashboard.css";

// ── Datos de ejemplo ───────────────────────────────────────────────────────
const USUARIO = { nombre: "Juan Pérez", rol: "EMATP / AUX / BIBLIO" };

const HORARIOS_HOY = [
  { id: 1, hora: "08:00", materia: "Matemática", curso: "4°B", aula: "Aula 12" },
  { id: 2, hora: "09:30", materia: "Física",     curso: "5°A", aula: "Laboratorio" },
  { id: 3, hora: "11:00", materia: "Química",    curso: "3°C", aula: "Aula 05" },
];

const COMUNICADOS = [
  {
    id: 1,
    tipo: "PRECEPTOR",
    titulo: "Cambio de aula para 4°B",
    cuerpo: "Por problemas de mantenimiento, la clase de Matemática de las 08:00hs se trasladará al Aula 15 hasta nuevo aviso. Por favor, notificar a los...",
    fecha: "Hace 2 horas",
  },
  {
    id: 2,
    tipo: "DIRECCIÓN",
    titulo: "Reunión de personal",
    cuerpo: "Recordamos que mañana a las 18:00hs se llevará a cabo la reunión mensual de personal docente y auxiliares en el Salón de Actos.",
    fecha: "Ayer",
  },
];

const CURSOS = [
  { id: 1, curso: "1°A", alumnos: 32 },
  { id: 2, curso: "2°B", alumnos: 28 },
  { id: 3, curso: "3°A", alumnos: 30 },
  { id: 4, curso: "4°B", alumnos: 25 },
];

const NAV_ITEMS = [
  { id: "inicio",      label: "Inicio",      Icon: Home      },
  { id: "horarios",    label: "Horarios",    Icon: Clock     },
  { id: "cursos",      label: "Cursos",      Icon: BookOpen  },
  { id: "comunicados", label: "Comunicados", Icon: Megaphone },
  { id: "perfil",      label: "Perfil",      Icon: User      },
];

export default function EmatpDashboard({ onLogout, username }) {
  const [navActiva, setNavActiva] = useState("inicio");

  const nombreMostrar = username || USUARIO.nombre;

  const fechaHoy = new Date().toLocaleDateString("es-AR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  }).replace(/^\w/, c => c.toUpperCase());

  return (
    <div className="em-layout">

      {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
      <aside className="em-sidebar">
        <div className="em-school-info">
          <div className="em-school-icon">
            <img src={logoEscuela} alt="Logo E.E.S.T. Nº1" className="em-school-logo" />
          </div>
          <div className="em-school-texts">
            <p className="em-school-name">E.E.S.T. Nº1</p>
            <p className="em-school-sub">Manuel Belgrano · Tres de Febrero</p>
          </div>
        </div>

        <nav className="em-nav">
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`em-nav-item ${navActiva === id ? "em-nav-item--active" : ""}`}
              onClick={() => setNavActiva(id)}
            >
              <Icon size={16} className="em-nav-icon" />
              {label}
            </button>
          ))}
        </nav>

        <div className="em-user-section">
          <div className="em-user-info">
            <div className="em-avatar">
              {nombreMostrar.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="em-user-name">{nombreMostrar}</p>
              <p className="em-user-role">{USUARIO.rol}</p>
            </div>
          </div>
          <button className="em-logout" onClick={onLogout}>
            <LogOut size={13} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────────────────── */}
      <main className="em-main">
        <div className="em-content">

          {/* Hero */}
          <div className="em-hero">
            <div className="em-hero-texto">
              <h1 className="em-hero-nombre">Bienvenido, {nombreMostrar}</h1>
              <p className="em-hero-fecha">
                <Calendar size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
                {fechaHoy}
              </p>
            </div>
            <div className="em-hero-icono">
              <BookOpen size={48} strokeWidth={1} />
            </div>
          </div>

          {/* Grid principal */}
          <div className="em-grid">

            {/* Columna izquierda */}
            <div className="em-col">

              {/* Horarios del día */}
              <div className="em-card">
                <h3 className="em-card-title">
                  <Clock size={17} style={{ marginRight: 8, verticalAlign: "middle", color: "#4a63e0" }} />
                  Horarios del día
                </h3>
                <div className="em-horarios-lista">
                  {HORARIOS_HOY.map((h) => (
                    <div key={h.id} className="em-horario-item">
                      <span className="em-horario-hora">{h.hora}</span>
                      <span className="em-horario-materia">{h.materia}</span>
                      <span className="em-horario-dot">•</span>
                      <span className="em-horario-curso">{h.curso}</span>
                      <span className="em-horario-aula">{h.aula}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comunicados recibidos */}
              <div className="em-card">
                <h3 className="em-card-title">
                  <Megaphone size={17} style={{ marginRight: 8, verticalAlign: "middle", color: "#4a63e0" }} />
                  Comunicados recibidos
                </h3>
                <div className="em-comunicados-lista">
                  {COMUNICADOS.map((c) => (
                    <div key={c.id} className="em-comunicado-item">
                      <div className="em-comunicado-header">
                        <span className={`em-comunicado-badge em-comunicado-badge--${c.tipo.toLowerCase().replace(/[^a-z]/g, '')}`}>
                          {c.tipo}
                        </span>
                        <span className="em-comunicado-fecha">{c.fecha}</span>
                      </div>
                      <p className="em-comunicado-titulo">{c.titulo}</p>
                      <p className="em-comunicado-cuerpo">{c.cuerpo}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Columna derecha */}
            <div className="em-col">

              {/* Acceso rápido */}
              <div className="em-card">
                <h3 className="em-card-title-simple">Acceso rápido</h3>
                <div className="em-acceso-lista">
                  <button className="em-acceso-btn em-acceso-btn--primary">
                    <Calendar size={17} />
                    Ver horarios completos
                  </button>
                  <button className="em-acceso-btn em-acceso-btn--outline">
                    <Send size={17} />
                    Enviar mensaje a preceptor
                  </button>
                </div>
              </div>

              {/* Cursos asignados */}
              <div className="em-card">
                <h3 className="em-card-title">
                  <GraduationCap size={17} style={{ marginRight: 8, verticalAlign: "middle", color: "#4a63e0" }} />
                  Cursos asignados
                </h3>
                <div className="em-cursos-grid">
                  {CURSOS.map((c) => (
                    <div key={c.id} className="em-curso-card">
                      <p className="em-curso-nombre">{c.curso}</p>
                      <p className="em-curso-alumnos">{c.alumnos} alumnos</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
