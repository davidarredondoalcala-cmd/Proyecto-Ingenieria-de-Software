function lista(animar) {
    const n = t => inmuebles.filter(i => i.tipo === t).length;
    const html = `<div class="view"><div class="tabs"><span class="pill" id="pill"></span>
  <button id="tCasa" class="${tab === "Casa" ? "on" : ""}" onclick="cambiar('Casa')">🏠 Casas (${n("Casa")})</button>
  <button id="tApartamento" class="${tab === "Apartamento" ? "on" : ""}" onclick="cambiar('Apartamento')">🏢 Apartamentos (${n("Apartamento")})</button></div>
  <h2>${tab === "Casa" ? "Casas" : "Apartamentos"}</h2>` +
        inmuebles.filter(i => i.tipo === tab).map((i, k) => `
 <div class="card item" style="animation-delay:${k * 220}ms" onclick="detalle(${i.id})">
  <div class="thumb">${icono(i)}</div>
  <div class="info"><p><b>${i.nombre}</b><span class="tag ${cls(i.estado)}">${i.estado}</span></p>
  ${i.venc ? `<p>Vencimiento contrato: ${fd(i.venc)}</p><p>Fecha pago arriendo: ${i.diaPago} de cada mes</p>` : ""}
  <p>Valor: ${fmt(i.valor)}</p></div></div>`).join("") + "</div>";
    pinta(html, animar);
}

function detalle(id) {
    const i = inmuebles.find(x => x.id === id);
    const vig = i.contratos.find(c => c.vig), ven = i.contratos.filter(c => !c.vig);
    const pdf = c => `<div class="pdf"><div class="thumb">PDF</div><div><div>Fecha de firma: ${fd(c.fecha)}</div><div style="color:var(--mut)">Firmantes: ${c.firm.join(", ")}</div></div></div>`;
    app.innerHTML = `<div class="view"><button class="l" onclick="lista()">← Volver a ${i.tipo === "Casa" ? "casas" : "apartamentos"}</button>
 <div class="card"><div class="hero">🧑 ${icono(i)}</div><div class="info">
  <p><b>${i.nombre}</b><span class="tag ${cls(i.estado)}">${i.estado}</span></p>
  <p>${i.dir} · ${i.barrio}</p>
  ${i.venc ? `<p>Vencimiento contrato: ${fd(i.venc)}</p><p>Fecha pago arriendo: ${i.diaPago} de cada mes</p>` : ""}
  <p>Valor: ${fmt(i.valor)}</p></div>
  ${i.estado !== "Arrendada" ? `<div class="row"><button onclick="nuevo(${i.id})">Crear contrato</button><button onclick="compraventa(${i.id})">Descargar formato compraventa</button></div>` : ""}
  ${vig ? `<h3>Contrato vigente</h3>${pdf(vig)}<div class="row">${porVencer(i) ? '<span class="tag pulse">Por vencer</span>' : ""}<button class="o" onclick="nuevo(${i.id},true)">Renovar contrato</button></div>` : ""}
  <h3>Contratos vencidos</h3>${ven.length ? ven.map(pdf).join("") : '<p style="color:var(--mut)">Sin contratos vencidos.</p>'}
 </div></div>`;
    scrollTo({ top: 0, behavior: "smooth" });
}
