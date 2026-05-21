from nodo import Nodo

# =========================
# HEURÍSTICA
# =========================

def heuristica(
    asignaciones,
    empresas_usadas,
    COSTOS,
    TIPOS
):

    restantes = TIPOS[len(asignaciones):]

    disponibles = [

        empresa

        for empresa in COSTOS.keys()

        if empresa not in empresas_usadas
    ]

    if len(disponibles) == 0:
        return 0

    h = 0

    for tipo in restantes:

        posibles = [

            COSTOS[empresa][tipo]

            for empresa in disponibles
        ]

        if len(posibles) > 0:

            h += min(posibles)

    return h


# =========================
# RECONSTRUIR SOLUCIÓN
# =========================

def reconstruir_solucion(nodo_solucion):

    camino = []

    nodo = nodo_solucion

    while nodo is not None:

        camino.append({

            "datos": nodo.get_datos(),

            "g": nodo.get_g(),

            "h": nodo.get_h(),

            "f": nodo.get_f()

        })

        nodo = nodo.get_padre()

    camino.reverse()

    return {

        "camino": camino,

        "solucion": nodo_solucion.get_datos(),

        "costo_total": nodo_solucion.get_g()

    }


# =========================
# A*
# =========================

def buscar_solucion_A(COSTOS):

    TIPOS = ["T", "H", "V", "W"]

    # VALIDACIÓN

    if len(COSTOS.keys()) < len(TIPOS):

        return {

            "error": (
                "Debe haber al menos 4 empresas"
            )

        }

    visitados = []

    frontera = []

    # =========================
    # NODO INICIAL
    # =========================

    datos_iniciales = {

        "asignaciones": [],

        "empresas_usadas": []

    }

    nodo_inicial = Nodo(datos_iniciales)

    nodo_inicial.set_g(0)

    h = heuristica(
        [],
        [],
        COSTOS,
        TIPOS
    )

    nodo_inicial.set_h(h)

    nodo_inicial.set_f(
        nodo_inicial.get_g()
        + nodo_inicial.get_h()
    )

    frontera.append(nodo_inicial)

    # =========================
    # BÚSQUEDA
    # =========================

    while len(frontera) != 0:

        frontera = sorted(
            frontera,
            key=lambda x: x.get_f()
        )

        nodo_actual = frontera.pop(0)

        visitados.append(nodo_actual)

        asignaciones = (
            nodo_actual
            .get_datos()["asignaciones"]
        )

        empresas_usadas = (
            nodo_actual
            .get_datos()["empresas_usadas"]
        )


        # OBJETIVO


        if len(asignaciones) == len(TIPOS):

            return reconstruir_solucion(
                nodo_actual
            )

        tipo_actual = TIPOS[len(asignaciones)]

        # EXPANSIÓN
        for empresa in COSTOS.keys():

            if empresa not in empresas_usadas:

                costo = (
                    COSTOS[empresa][tipo_actual]
                )

                nuevas_asignaciones = (

                    asignaciones

                    +

                    [{

                        "tipo": tipo_actual,

                        "empresa": empresa,

                        "costo": costo

                    }]
                )

                nuevas_empresas = (

                    empresas_usadas

                    +

                    [empresa]
                )

                datos_hijo = {

                    "asignaciones":
                    nuevas_asignaciones,

                    "empresas_usadas":
                    nuevas_empresas
                }

                hijo = Nodo(datos_hijo)

                hijo.set_padre(
                    nodo_actual
                )

                g = (
                    nodo_actual.get_g()
                    + costo
                )

                h = heuristica(
                    nuevas_asignaciones,
                    nuevas_empresas,
                    COSTOS,
                    TIPOS
                )

                f = g + h

                hijo.set_g(g)

                hijo.set_h(h)

                hijo.set_f(f)

                nodo_actual.hijos.append(hijo)

                if not hijo.en_lista(visitados):

                    if not hijo.en_lista(frontera):

                        frontera.append(hijo)

                    else:

                        for n in frontera:

                            if (

                                n.igual(hijo)

                                and

                                n.get_f()
                                >
                                hijo.get_f()

                            ):

                                frontera.remove(n)

                                frontera.append(hijo)

    return None