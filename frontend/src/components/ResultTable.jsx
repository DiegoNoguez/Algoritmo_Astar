export default function ResultTable({ data }) {

  if (!data || !data.solucion) return null

  return (

    <div className="mt-8 overflow-x-auto">

      <table className="w-full border border-gray-300">

        <thead className="bg-gray-800 text-white">

          <tr>

            <th className="p-3">
              Tipo
            </th>

            <th className="p-3">
              Empresa
            </th>

            <th className="p-3">
              Costo
            </th>

          </tr>

        </thead>

        <tbody>

          {data.solucion.asignaciones.map(
            (item, index) => (

              <tr
                key={index}
                className="border-t text-center"
              >

                <td className="p-3">
                  {item.tipo}
                </td>

                <td className="p-3">
                  {item.empresa}
                </td>

                <td className="p-3">
                  ${item.costo}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

      <div className="mt-6 text-right">

        <h2 className="text-3xl font-bold">

          Total:
          ${data.costo_total}

        </h2>

      </div>

    </div>

  )
}