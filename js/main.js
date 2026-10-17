lista();
let ultimo = 0;
addEventListener("scroll", () => {
    const y = scrollY, c = $("cab");
    if (y > ultimo && y > 80) c.classList.add("oculto");
    else if (y < ultimo) c.classList.remove("oculto");
    ultimo = Math.max(y, 0);
}, { passive: true });
