import { useState } from 'react'
import axios from 'axios'
import {API} from './services/api'

export default function App() {

  // =========================
  // ESTADOS
  // =========================

  const [costos, setCostos] = useState({

    "Empresa 1": {
      T: 20,
      H: 30,
      V: 20,
      W: 40
    },

    "Empresa 2": {
      T: 50,
      H: 50,
      V: 40,
      W: 50
    },

    "Empresa 3": {
      T: 60,
      H: 55,
      V: 50,
      W: 60
    },

    "Empresa 4": {
      T: 100,
      H: 80,
      V: 60,
      W: 70
    }

  })

  const [resultado, setResultado] = useState(null)

  const [nombreEmpresa, setNombreEmpresa] =
    useState('')

  // =========================
  // CAMBIAR PRECIOS
  // =========================

  const cambiarValor = (
    empresa,
    tipo,
    valor
  ) => {

    setCostos({

      ...costos,

      [empresa]: {

        ...costos[empresa],

        [tipo]: Number(valor)

      }

    })
  }

  // =========================
  // AGREGAR EMPRESA
  // =========================

  const agregarEmpresa = () => {

    if (!nombreEmpresa.trim()) return

    if (costos[nombreEmpresa]) {

      alert('La empresa ya existe')

      return
    }

    const nuevosCostos = {

      ...costos,

      [nombreEmpresa]: {
        T: 0,
        H: 0,
        V: 0,
        W: 0
      }

    }

    setCostos(nuevosCostos)

    setResultado(null)

    setNombreEmpresa('')
  }

  // =========================
  // ELIMINAR EMPRESA
  // =========================

  const eliminarEmpresa = (empresa) => {

    const copia = { ...costos }

    delete copia[empresa]

    setCostos(copia)

    setResultado(null)
  }

  // =========================
  // RESOLVER
  // =========================

  const resolver = async () => {

    try {

      const res = await axios.post(
        `${API}/resolver`,
        {
          costos
        }
      )

      console.log(res.data)

      setResultado(res.data)

    } catch (error) {

      console.error(error)

      alert('Error al resolver')
    }
  }

  // =========================
  // RENDER
  // =========================

  return (

    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-10">

      <div className="
        max-w-7xl
        mx-auto
        bg-zinc-900
        border
        border-zinc-800
        p-8
        rounded-3xl
        shadow-2xl
      ">

        {/* TITULO */}

        <h1 className="text-5xl font-black text-center mb-3">

          Algoritmo A*

        </h1>

        <p className="text-center text-zinc-400 mb-10">

          Selección óptima de proveedores usando búsqueda heurística
        </p>
        {/* AGREGAR EMPRESA */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Nueva empresa"
            value={nombreEmpresa}
            onChange={(e) =>
              setNombreEmpresa(e.target.value)
            }
            className="
              flex-1
              bg-zinc-800
              border
              border-zinc-700
              rounded-xl
              p-3
              outline-none
              focus:border-blue-500
            "
          />
          <button
            onClick={agregarEmpresa}
            className="
              bg-emerald-600
              hover:bg-emerald-500
              transition
              text-white
              px-6
              rounded-xl
              font-bold
            "
          >
            Agregar
          </button>
        </div>
        {/* TABLA */}
        <div className="overflow-x-auto">
          <table className="w-full border border-zinc-700">
            <thead className="bg-zinc-800 text-zinc-100">
              <tr>
                <th className="p-4">
                  Empresa
                </th>
                <th>T</th>
                <th>H</th>
                <th>V</th>
                <th>W</th>
                <th>
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(costos).map(
                empresa => (
                  <tr
                    key={empresa}
                    className="
                      border-t
                      border-zinc-700
                      text-center
                    "
                  >
                    <td className="p-4 font-bold">
                      {empresa}
                    </td>
                    {["T", "H", "V", "W"].map(
                      tipo => (
                        <td
                          key={tipo}
                          className="p-2"
                        >
                          <input
                            type="number"
                            value={
                              costos[empresa][tipo] || 0
                            }
                            onChange={(e) =>
                              cambiarValor(
                                empresa,
                                tipo,
                                e.target.value
                              )
                            }
                            className="
                              w-24
                              bg-zinc-800
                              border
                              border-zinc-700
                              rounded-lg
                              p-2
                              text-center
                              text-white
                              outline-none
                              focus:border-blue-500
                            "
                          />
                        </td>
                      )
                    )}
                    <td>
                      <button
                        onClick={() =>
                          eliminarEmpresa(empresa)
                        }
                        className="
                          bg-red-700
                          hover:bg-red-600
                          transition
                          text-white
                          px-4
                          py-2
                          rounded-xl
                          font-bold
                        "
                      >Eliminar
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        {/* BOTON */}
        <div className="text-center mt-10">
          <button
            onClick={resolver}
            className="
              bg-blue-600
              hover:bg-blue-500
              transition
              text-white
              px-8
              py-4
              rounded-2xl
              text-xl
              font-bold
              shadow-lg
            "
          >Resolver con A*
          </button>
        </div>
        {/* RESULTADO */}
        {resultado && resultado.solucion && (
          <div className="mt-14">
            <h2 className="text-3xl font-bold mb-6">Solución Óptima</h2>
            <table className="w-full border border-zinc-700">
              <thead className="bg-emerald-700 text-white">
                <tr>
                  <th className="p-4">
                    Tipo
                  </th>
                  <th>
                    Empresa
                  </th>
                  <th>
                    Costo
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultado.solucion.asignaciones.map(
                  (item, index) => (
                    <tr
                      key={index}
                      className="
                        border-t
                        border-zinc-700
                        text-center
                      "
                    >
                      <td className="p-4">
                        {item.tipo}
                      </td>
                      <td>
                        {item.empresa}
                      </td>
                      <td>
                        ${item.costo}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="text-right mt-6">
              <h3 className="text-4xl font-black text-emerald-400">
                Total:
                ${resultado.costo_total}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}