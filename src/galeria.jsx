

import { useEffect, useState } from "react"
import axios from "axios"
import "./Galeria.css"
import AOS from "aos"
import "aos/dist/aos.css"

const Galeria = () => {
  const [imagenes, setImagenes] = useState([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [imagen, setImagen] = useState("")
  const [modoEditar, setModoEditar] = useState(false)
  const [idEditar, setIdEditar] = useState(null)
  const [busqueda, setBusqueda] = useState("")
  const [temaColor, setTemaColor] = useState("dorado") // Tema por defecto

  useEffect(() => {
    // Inicializamos AOS para las animaciones
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    })

    cargarImagenes()

    // Aplicar el tema de color seleccionado
    document.body.className = `tema-${temaColor}`
  }, [temaColor])

  const cargarImagenes = async () => {
    try {
      const res = await axios.get("http://localhost:3001/obtener-imagenes")
      setImagenes(res.data)
    } catch (error) {
      console.error("❌ Error al cargar imágenes:", error)
    }
  }

  const handleAgregarImagen = async () => {
    if (!nombre || !descripcion || !imagen) {
      alert("Completa todos los campos")
      return
    }

    try {
      if (modoEditar) {
        await axios.put(`http://localhost:3001/editar-imagen/${idEditar}`, {
          nombre,
          descripcion,
          imagen,
        })
        alert("✅ Imagen actualizada correctamente")
      } else {
        const nuevaImagen = {
          nombre,
          descripcion,
          imagen,
          fecha: new Date().toISOString().slice(0, 19).replace("T", " "),
        }
        await axios.post("http://localhost:3001/agregar-imagen", nuevaImagen)
        alert("✅ Imagen agregada correctamente")
      }
      cerrarModal()
      cargarImagenes()
    } catch (error) {
      console.error("❌ Error al agregar/editar imagen:", error)
      alert("Hubo un error al guardar la imagen")
    }
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setNombre("")
    setDescripcion("")
    setImagen("")
    setModoEditar(false)
    setIdEditar(null)
  }

  const eliminarImagen = async (id) => {
    try {
      const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta imagen?")
      if (confirmacion) {
        const response = await fetch(`http://localhost:3001/eliminar-imagen/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          await cargarImagenes()
          alert("✅ Imagen eliminada correctamente")
        } else {
          alert("❌ Hubo un problema al eliminar la imagen")
        }
      }
    } catch (error) {
      console.error("❌ Error al eliminar imagen:", error.message)
      alert("❌ Error al eliminar la imagen")
    }
  }

  const abrirModalEditar = (img) => {
    setNombre(img.nombre)
    setDescripcion(img.descripcion)
    setImagen(img.imagen)
    setIdEditar(img.id)
    setModoEditar(true)
    setModalAbierto(true)
  }

  const cambiarTema = (tema) => {
    setTemaColor(tema)
  }

  // Filtrar imágenes por búsqueda
  const imagenesFiltradas = imagenes.filter(
    (img) =>
      img.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      img.descripcion.toLowerCase().includes(busqueda.toLowerCase()),
  )

  return (
    <div className={`galeria-container tema-${temaColor}`}>
      <div className="museo-header" data-aos="fade-down">
        <h2 className="titulo-galeria">MUSEO NACIONAL</h2>
        <p className="museo-subtitulo">Colección de Obras Maestras</p>
      </div>

      <div className="museo-banner" data-aos="fade-up">
        <div className="banner-content">
          <div className="banner-text">
            <h3>Explora Nuestra Colección</h3>
            <p>Descubre las obras más destacadas de nuestro museo</p>
          </div>
          <div className="banner-actions">
            <button className="btn-agregar" onClick={() => setModalAbierto(true)}>
              Agregar Nueva Exhibición
            </button>
          </div>
        </div>
      </div>

      <div className="museo-search-bar" data-aos="fade-up" data-aos-delay="100">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar obras por nombre o descripción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <div className="search-icon">🔍</div>
        </div>
        <div className="temas-container">
          <span className="tema-label">Tema:</span>
          <div className="temas-opciones">
            <button
              className={`btn-tema dorado ${temaColor === "dorado" ? "activo" : ""}`}
              onClick={() => cambiarTema("dorado")}
              title="Tema Dorado"
            ></button>
            <button
              className={`btn-tema esmeralda ${temaColor === "esmeralda" ? "activo" : ""}`}
              onClick={() => cambiarTema("esmeralda")}
              title="Tema Esmeralda"
            ></button>
            <button
              className={`btn-tema purpura ${temaColor === "purpura" ? "activo" : ""}`}
              onClick={() => cambiarTema("purpura")}
              title="Tema Púrpura"
            ></button>
            <button
              className={`btn-tema rubi ${temaColor === "rubi" ? "activo" : ""}`}
              onClick={() => cambiarTema("rubi")}
              title="Tema Rubí"
            ></button>
          </div>
        </div>
      </div>

      <div className="galeria-grid">
        {imagenesFiltradas.map((img, index) => (
          <div className="imagen-card" key={img.id} data-aos="fade-up" data-aos-delay={(index % 4) * 100}>
            <div className="exhibit-number">{index + 1}</div>
            <div className="imagen-thumbnail">
              <img src={img.imagen || "/placeholder.svg"} alt={img.nombre} />
              <div className="imagen-overlay">
                <div className="overlay-buttons">
                  <button className="btn-overlay" onClick={() => abrirModalEditar(img)}>
                    <span className="icon">✏️</span>
                  </button>
                  <button className="btn-overlay" onClick={() => eliminarImagen(img.id)}>
                    <span className="icon">🗑️</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="imagen-info">
              <h4>{img.nombre}</h4>
              <p>{img.descripcion}</p>
              <div className="imagen-meta">
                <small>Exhibido desde: {img.fecha}</small>
                <div className="imagen-tags">
                  <span className="tag">Arte</span>
                  <span className="tag">Exhibición</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer elegante */}
      <footer className="museo-footer" data-aos="fade-up">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>Museo Nacional</h3>
            <p>
              Dedicados a preservar y exhibir el patrimonio artístico y cultural para las generaciones presentes y
              futuras.
            </p>
            <div className="contact">
              <span>
                <i className="icon">📍</i> Av. Principal #123, Ciudad
              </span>
              <span>
                <i className="icon">📞</i> (123) 456-7890
              </span>
              <span>
                <i className="icon">✉️</i> info@museonacional.com
              </span>
            </div>
          </div>

          <div className="footer-section links">
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li>
                <a href="#">Inicio</a>
              </li>
              <li>
                <a href="#">Exposiciones</a>
              </li>
              <li>
                <a href="#">Eventos</a>
              </li>
              <li>
                <a href="#">Educación</a>
              </li>
              <li>
                <a href="#">Membresías</a>
              </li>
            </ul>
          </div>

          <div className="footer-section newsletter">
            <h3>Mantente Informado</h3>
            <p>Suscríbete a nuestro boletín para recibir noticias sobre exposiciones y eventos.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Tu correo electrónico" />
              <button type="submit">Suscribirse</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-icons">
            <a href="#" className="social-icon">
              FB
            </a>
            <a href="#" className="social-icon">
              IG
            </a>
            <a href="#" className="social-icon">
              TW
            </a>
            <a href="#" className="social-icon">
              YT
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Museo Nacional. Todos los derechos reservados.</p>
        </div>
      </footer>

      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal-content" data-aos="zoom-in">
            <h3>{modoEditar ? "Editar Exhibición" : "Nueva Exhibición"}</h3>
            <input
              type="text"
              placeholder="Título de la obra"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descripción e historia"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <input
              type="text"
              placeholder="URL de la imagen"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="btn-guardar" onClick={handleAgregarImagen}>
                {modoEditar ? "Guardar Cambios" : "Agregar a la Colección"}
              </button>
              <button className="btn-cancelar" onClick={cerrarModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Galeria
