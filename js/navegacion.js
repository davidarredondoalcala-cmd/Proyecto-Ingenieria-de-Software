function cambiar(t) { if (t === tab) return; tab = t; lista(true) }
function mover(anim) {
    const b = $("t" + tab), p = $("pill"); if (!b || !p) return;
    if (!anim) p.style.transition = "none";
    p.style.width = b.offsetWidth + "px"; p.style.transform = `translateX(${b.offsetLeft}px)`;
    document.querySelectorAll(".tabs button").forEach(x => x.classList.toggle("on", x === b));
    if (!anim) { p.offsetWidth; p.style.transition = "" }
}
function pinta(html, animar) {
    const vista = app.firstElementChild;
    if (animar && vista && vista.querySelector(".tabs")) {
        const t = document.createElement("div"); t.innerHTML = html;
        while (vista.children.length > 1) vista.lastChild.remove();
        [...t.firstElementChild.children].slice(1).forEach(c => vista.appendChild(c));
        mover(true);
    } else { app.innerHTML = html; mover(false) }
}
