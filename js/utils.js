const $ = id => document.getElementById(id);
const app = $("app"); let tab = "Casa";
function toast(t) { const e = $("toast"); e.textContent = t; e.style.display = "block"; setTimeout(() => e.style.display = "none", 2200) }
const porVencer = i => i.venc && (new Date(i.venc) - HOY) / 864e5 <= 90;
const cls = e => e === "Arrendada" ? "Arrendada" : e === "Para la venta" ? "Venta" : "";
const icono = i => i.tipo === "Casa" ? "🏠" : "🏢";
