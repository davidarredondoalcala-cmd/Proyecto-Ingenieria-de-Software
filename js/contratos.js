let cod = [], modo = "arriendo", cur = null, S = {};
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const bv = (x, d) => x && String(x).trim() ? `<b>${esc(x)}</b>` : `<b class="bl">${d || "__________"}</b>`;
const campo = (k, l, t, p) => `<label>${l}</label><input type="${t || "text"}" placeholder="${p || ""}" value="${esc(S[k] ?? "")}" oninput="S.${k}=this.value;prev()">`;
function nuevo(id, renovar) {
  cur = inmuebles.find(x => x.id === id); cod = [""];
  S = { arr: "Inmobiliaria", ate: "", vend: "", comp: "", ciu: "Ibagué", dir: cur.dir, bar: cur.barrio, lin: cur.lind, val: cur.valor, dur: 12, dia: 5, pago: "De contado" };
  app.innerHTML = `<div class="view"><div class="noprint"><button class="l" onclick="detalle(${id})">← Volver</button></div>
 <div class="grid"><div class="card noprint"><div class="modo"><button id="m-arriendo" onclick="setModo('arriendo')">Arriendo</button><button id="m-venta" onclick="setModo('venta')">Compraventa</button></div><div id="campos"></div></div>
 <div><div class="visor noprint"><span class="tag pulse" style="margin:0">En vivo</span> 📄 Vista previa del PDF</div><div class="hoja" id="doc"></div>
  <div class="row noprint" style="justify-content:center"><button class="g" onclick="enviar(${id})">Enviar link para firma</button><button class="g" onclick="window.print()">Descargar PDF</button></div>
  <div id="lk" class="noprint"></div></div></div></div>`;
  setModo(cur.estado === "Para la venta" ? "venta" : "arriendo");
}
function setModo(m) {
  modo = m;
  ["arriendo", "venta"].forEach(x => $("m-" + x).classList.toggle("on", x === m));
  $("campos").innerHTML = m === "arriendo"
    ? campo("arr", "Arrendador") + campo("ate", "Arrendatario", "text", "Ej: Pepito Perez") + `<label>Coarrendatario / Codeudor</label><div id="cods"></div><button class="g" onclick="addCod()" style="margin-top:10px">+ Agregar</button>` + campo("ciu", "Ciudad") + campo("dir", "Dirección del inmueble") + campo("bar", "Barrio") + `<label>Linderos</label><textarea rows="3" oninput="S.lin=this.value;prev()">${esc(S.lin || "")}</textarea>` + campo("val", "Valor mensual", "number") + campo("dur", "Duración (meses)", "number") + campo("dia", "Día de pago de cada mes", "number")
    : campo("vend", "Vendedor", "text", "Nombre completo") + campo("comp", "Comprador", "text", "Nombre completo") + campo("ciu", "Ciudad") + campo("dir", "Dirección del inmueble") + campo("bar", "Barrio") + `<label>Linderos</label><textarea rows="3" oninput="S.lin=this.value;prev()">${esc(S.lin || "")}</textarea>` + campo("val", "Precio de venta", "number") + campo("pago", "Forma de pago");
  if (m === "arriendo") pintaCods();
  prev();
}
function pintaCods() { $("cods").innerHTML = cod.map((c, k) => `<input value="${esc(c)}" placeholder="Codeudor ${k + 1}" oninput="cod[${k}]=this.value;prev()" style="margin-top:6px">`).join("") }
function addCod() { cod.push(""); pintaCods() }
function prev() {
  const f = new Date().toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" }), cs = cod.filter(Boolean);
  const inm = `${bv(S.dir)}, barrio ${bv(S.bar)}, de la ciudad de ${bv(S.ciu)}, cuyos linderos son: ${bv(S.lin, "____________________")}`;
  let h;
  if (modo === "arriendo") {
    h = `<h3>CONTRATO DE ARRENDAMIENTO DE VIVIENDA URBANA</h3>
  <p>En ${bv(S.ciu)}, a ${f}, entre <b>${esc(S.arr || "EL ARRENDADOR")}</b>, en adelante EL ARRENDADOR, y ${bv(S.ate, "EL ARRENDATARIO")}, en adelante EL ARRENDATARIO${cs.length ? `, con la coarrendación/codeudoría de ${cs.map(c => `<b>${esc(c)}</b>`).join(", ")}` : ""}, se celebra el presente contrato, regido por las siguientes cláusulas:</p>
  <p><b>PRIMERA – Objeto.</b> EL ARRENDADOR entrega a título de arrendamiento el inmueble ubicado en ${inm}.</p>
  <p><b>SEGUNDA – Canon.</b> El canon mensual es de ${bv(S.val ? fmt(S.val) : "")}, pagadero dentro de los primeros ${bv(S.dia, "__")} días de cada mes.</p>
  <p><b>TERCERA – Duración.</b> El contrato tendrá una duración de ${bv(S.dur, "__")} meses, contados desde la fecha de firma, prorrogable por acuerdo escrito de las partes.</p>
  <p><b>CUARTA – Destinación.</b> El inmueble se destinará exclusivamente a vivienda. No podrá subarrendarse ni cederse el contrato sin autorización escrita del ARRENDADOR.</p>
  <p><b>QUINTA – Servicios y reparaciones.</b> Los servicios públicos y las reparaciones locativas estarán a cargo del ARRENDATARIO.</p>
  <p><b>SEXTA – Restitución.</b> Al terminar el contrato, EL ARRENDATARIO restituirá el inmueble en el estado en que lo recibió, salvo el desgaste natural.</p>
  <p><b>SÉPTIMA – Terminación.</b> El incumplimiento de cualquier obligación faculta a la parte cumplida para dar por terminado el contrato conforme a la ley.</p>
  <p>Para constancia, se firma en dos ejemplares del mismo tenor.</p>
  <div class="sig"><div>${esc(S.arr || "Arrendador")}<br><small>Arrendador</small></div><div>${esc(S.ate || "Arrendatario")}<br><small>Arrendatario</small></div>${cs.map(c => `<div>${esc(c)}<br><small>Codeudor</small></div>`).join("")}</div>`;
  } else {
    h = `<h3>CONTRATO DE COMPRAVENTA DE INMUEBLE</h3>
  <p>En ${bv(S.ciu)}, a ${f}, entre ${bv(S.vend, "EL VENDEDOR")}, en adelante EL VENDEDOR, y ${bv(S.comp, "EL COMPRADOR")}, en adelante EL COMPRADOR, se celebra el presente contrato de compraventa:</p>
  <p><b>PRIMERA – Objeto.</b> EL VENDEDOR transfiere a título de venta el inmueble ubicado en ${inm}.</p>
  <p><b>SEGUNDA – Precio.</b> El precio de la venta es de ${bv(S.val ? fmt(S.val) : "")}.</p>
  <p><b>TERCERA – Forma de pago.</b> EL COMPRADOR pagará el precio así: ${bv(S.pago, "____________")}.</p>
  <p><b>CUARTA – Tradición y libertad.</b> EL VENDEDOR garantiza que el inmueble es de su propiedad y se encuentra libre de gravámenes, embargos y limitaciones de dominio.</p>
  <p><b>QUINTA – Entrega.</b> El inmueble se entregará a paz y salvo por impuestos y servicios públicos a la fecha de la escritura pública.</p>
  <p><b>SEXTA – Gastos.</b> Los gastos notariales y de registro serán asumidos por las partes en la proporción que la ley establece.</p>
  <p>Para constancia, se firma en dos ejemplares del mismo tenor.</p>
  <div class="sig"><div>${esc(S.vend || "Vendedor")}<br><small>Vendedor</small></div><div>${esc(S.comp || "Comprador")}<br><small>Comprador</small></div></div>`;
  }
  $("doc").innerHTML = h;
}
function enviar(id) {
  if (!(modo === "arriendo" ? S.ate : S.comp)) return toast("Escribe el nombre de la contraparte");
  const url = location.href.split("#")[0] + "#firma-" + Math.random().toString(36).slice(2, 10);
  $("lk").innerHTML = `<div class="card view"><b>Link de firma generado</b><div class="link">${url}</div>
  <div class="row"><button onclick="navigator.clipboard&&navigator.clipboard.writeText('${url}');toast('Link copiado')">Copiar link</button>
  <button class="g" onclick="firmado(${id})">Simular firma</button></div></div>`;
}
function firmado(id) {
  const i = inmuebles.find(x => x.id === id), f = new Date().toISOString().slice(0, 10);
  if (modo === "arriendo") {
    i.contratos.forEach(c => c.vig = false);
    i.contratos.unshift({ vig: true, fecha: f, firm: [S.arr, S.ate, ...cod.filter(Boolean)] });
    const v = new Date(); v.setMonth(v.getMonth() + Number(S.dur));
    Object.assign(i, { estado: "Arrendada", venc: v.toISOString().slice(0, 10), valor: Number(S.val), diaPago: S.dia, dir: S.dir, barrio: S.bar, lind: S.lin });
  } else {
    i.contratos.unshift({ vig: false, fecha: f, firm: [S.vend, S.comp] });
    Object.assign(i, { estado: "Vendida", valor: Number(S.val), dir: S.dir, barrio: S.bar, lind: S.lin });
  }
  save(); toast("Contrato firmado y guardado"); detalle(id);
}
function compraventa(id) { nuevo(id); setModo("venta") }
