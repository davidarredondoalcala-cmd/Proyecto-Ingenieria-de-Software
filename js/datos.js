const HOY = new Date();
const fmt = n => "$ " + Number(n).toLocaleString("es-CO");
const fd = s => s ? new Date(s + "T00:00:00").toLocaleDateString("es-CO") : "—";
const F = ["Pepito", "Juanito", "Andres"];
let inmuebles = [
    { id: 1, tipo: "Casa", nombre: "Casa Piedra Pintada", estado: "Arrendada", venc: "2026-12-30", diaPago: 5, valor: 1000000, dir: "Cll 10 # 5 - 20", barrio: "Piedra Pintada", lind: "Al norte la calle, al sur la casa #, al este el edificio rojo, al oeste la casa de don Juan.", contratos: [{ vig: true, fecha: "2025-12-30", firm: F }, { vig: false, fecha: "2024-12-30", firm: F }, { vig: false, fecha: "2023-12-30", firm: F }] },
    { id: 2, tipo: "Casa", nombre: "Casa El Vergel", estado: "Arrendada", venc: "2027-03-15", diaPago: 5, valor: 1200000, dir: "Cll 12 # 8 - 14", barrio: "El Vergel", lind: "", contratos: [{ vig: true, fecha: "2026-03-15", firm: ["Maria", "Luis"] }] },
    { id: 3, tipo: "Casa", nombre: "Casa Jordán", estado: "Sin arrendar", venc: "", diaPago: 5, valor: 900000, dir: "Cra 3 # 4 - 10", barrio: "Jordán", lind: "", contratos: [] },
    { id: 4, tipo: "Casa", nombre: "Casa Interlaken", estado: "Para la venta", venc: "", diaPago: "", valor: 300000000, dir: "Cll 20 # 1 - 5", barrio: "Interlaken", lind: "", contratos: [] },
    { id: 5, tipo: "Apartamento", nombre: "Apto Torres del Parque 302", estado: "Arrendada", venc: "2026-11-20", diaPago: 10, valor: 850000, dir: "Cra 5 # 30 - 12 Apto 302", barrio: "La Pola", lind: "", contratos: [{ vig: true, fecha: "2025-11-20", firm: ["Carlos", "Ana"] }] },
    { id: 6, tipo: "Apartamento", nombre: "Apto Mirador 601", estado: "Sin arrendar", venc: "", diaPago: 5, valor: 1100000, dir: "Cll 60 # 4 - 55 Apto 601", barrio: "Ambalá", lind: "", contratos: [] },
    { id: 7, tipo: "Apartamento", nombre: "Apto Central 204", estado: "Para la venta", venc: "", diaPago: "", valor: 210000000, dir: "Cll 11 # 3 - 40 Apto 204", barrio: "Centro", lind: "", contratos: [] }
];
try { const s = localStorage.getItem("inm2"); if (s) inmuebles = JSON.parse(s) } catch (e) { }
const save = () => { try { localStorage.setItem("inm2", JSON.stringify(inmuebles)) } catch (e) { } };
