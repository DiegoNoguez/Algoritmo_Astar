class Nodo:
    def __init__(self, datos, hijos=None):
        self.datos = datos
        self.hijos = []
        self.padre = None
        self.g = 0
        self.h = 0
        self.f = 0
        self.set_hijos(hijos)

    # HIJOS
    def set_hijos(self, hijos):
        if hijos is not None:
            self.hijos = hijos
            for h in hijos:
                h.padre = self

    def get_hijos(self):
        return self.hijos

    # PADRE
    def get_padre(self):
        return self.padre

    def set_padre(self, padre):
        self.padre = padre

    # DATOS
    def set_datos(self, datos):
        self.datos = datos

    def get_datos(self):
        return self.datos

    # G
    def set_g(self, g):
        self.g = g

    def get_g(self):
        return self.g

    # H
    def set_h(self, h):
        self.h = h

    def get_h(self):
        return self.h

    # F
    def set_f(self, f):
        self.f = f
    
    def get_f(self):
        return self.f
    
    # COMPARACIONES
    def igual(self, nodo):
        return self.datos == nodo.datos
    
    def en_lista(self, lista_nodos):
        for n in lista_nodos:
            if self.igual(n):
                return True
        return False
 
    # PRINT
    def __str__(self):
        return (
            f"Datos={self.datos} | "
            f"g={self.g} | "
            f"h={self.h} | "
            f"f={self.f}"
        )