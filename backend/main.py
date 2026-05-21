from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from astar import buscar_solucion_A

app = FastAPI()


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MODELO
class ResolverRequest(BaseModel):
    costos: dict

@app.get("/")
def home():
    return {"mensaje":"API A* funcionando"}

# RESOLVER
@app.post("/resolver")
def resolver(data: ResolverRequest):
    resultado = buscar_solucion_A(
        data.costos
    )
    return resultado