const videos = [
  { t: "DOCUMENTÁRIO Niterói Invicta", url: "https://www.youtube.com/watch?v=pPCemq6y-Jo", yt: "pPCemq6y-Jo" },
  { t: "Seminário: Hospital, Redes no Território, Comunidade", url: "https://www.youtube.com/watch?v=3R7h1ypUeL4&t=109s", yt: "3R7h1ypUeL4", start: 109 },
  { t: "Simpósio de comemoração dos 20 anos do Programa de Neurociências da UFF", url: "https://vimeo.com/302378981", vimeo: "302378981" },
  { t: "Pedrada - Clipe Oficial", url: "https://www.youtube.com/watch?v=eDLhB7nfVLA", yt: "eDLhB7nfVLA" },
  { t: "III Congresso Luso-Brasileiro de Divulgação Científica", url: "https://www.youtube.com/live/7rFIBvFlTp4", yt: "7rFIBvFlTp4" },
  { t: "ENTREVISTA Dr. Jorge Elias Kalil - LABA Ciências UFF", url: "https://vimeo.com/1203406189", vimeo: "1203406189" }
];

// Cards de vídeo
const wrap = document.getElementById("vcards");
videos.forEach((v, i) => {
  const b = document.createElement("button");
  b.className = "vcard reveal";
  if (v.yt) b.style.setProperty("--img", `url(https://img.youtube.com/vi/${v.yt}/maxresdefault.jpg)`);
  else b.style.backgroundImage = "linear-gradient(135deg,#2b3a55,#14181f)";
  b.innerHTML = `<h3>${v.t}</h3><span class="play">▶ Assistir</span>`;
  b.onclick = () => openVideo(v);
  wrap.appendChild(b);
});

// Modal
const modal = document.getElementById("modal"), player = document.getElementById("player");
function openVideo(v) {
  player.src = v.yt
    ? `https://www.youtube.com/embed/${v.yt}?autoplay=1&rel=0${v.start ? "&start=" + v.start : ""}`
    : `https://player.vimeo.com/video/${v.vimeo}?autoplay=1`;
  modal.classList.add("open");
}
function closeVideo() { modal.classList.remove("open"); player.src = ""; }
document.getElementById("modalClose").onclick = closeVideo;
modal.onclick = e => { if (e.target === modal) closeVideo(); };
addEventListener("keydown", e => { if (e.key === "Escape") { closeVideo(); setMenu(false); } });

// Menu
const overlay = document.getElementById("overlay"), menuBtn = document.getElementById("menuBtn");
function setMenu(o) {
  overlay.classList.toggle("open", o);
  menuBtn.textContent = o ? "Fechar" : "Menu";
  menuBtn.setAttribute("aria-expanded", o);
}
menuBtn.onclick = () => setMenu(!overlay.classList.contains("open"));
overlay.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));

// Relógio (como no site modelo)
document.getElementById("year").textContent = new Date().getFullYear();

// Chips de skills alternando
const chips = [...document.querySelectorAll(".chip")];
let ci = 0;
setInterval(() => {
  chips[ci].classList.remove("active");
  ci = (ci + 1) % chips.length;
  chips[ci].classList.add("active");
}, 1800);

// Parallax 3D do hero
const hv = document.getElementById("heroVisual"), stack = hv.querySelector(".stack");
hv.addEventListener("mousemove", e => {
  const r = hv.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  stack.style.transform = `rotateY(${-24 + x * 16}deg) rotateX(${10 - y * 12}deg) rotateZ(4deg)`;
});
hv.addEventListener("mouseleave", () => stack.style.transform = "");

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Posts do Instagram
const ig = [
  "reel/Dd69Q0IRv8r/", "reel/Dfx1vlpssUO/", "reel/DfAijbFxhNZ/",
  "reel/DcKP3LZRKgN/", "p/DNbZNx-vcBP/", "reel/DQHaKrdDars/", "p/DNywsCaZL3e/",
  "reel/DMTU_zavQAh/", "p/DHoF6MdR3xH/", "reel/DaQQa-VRgTm/", "p/DYyHblPxltB/",
  "reel/DXHfuXhkV14/", "p/DbqkZxdu5Me/", "p/DWFOaJYJCpk/", "p/DVEb5GCADmH/",
  "p/DTYTLjwjldn/", "p/DSgYjFngL3B/", "p/DSbUm7tgMr8/", "p/DQb0HOzkdEi/"
];
const tiles = document.getElementById("tiles");
let nReel = 0, nPost = 0;
ig.forEach((path, i) => {
  const reel = path.startsWith("reel");
  const k = reel ? `Reel ${String(++nReel).padStart(2, "0")}` : `Post ${String(++nPost).padStart(2, "0")}`;
  const a = document.createElement("a");
  a.className = "tile" + (i >= 8 ? " extra" : "") + (reel ? " is-reel" : "");
  a.style.setProperty("--bg-img", `url(img/ig/${path.split("/")[1]}.jpg)`);
  a.href = "https://www.instagram.com/" + path; a.target = "_blank"; a.rel = "noopener noreferrer";
  a.innerHTML = `<span class="k">${k}</span><span class="go">Ver no Instagram ↗</span>`;
  tiles.appendChild(a);
});
const more = document.getElementById("moreTiles");
more.onclick = () => { const open = tiles.classList.toggle("all"); more.textContent = open ? "Ver menos" : "Ver mais"; };

// Lightbox dos prints de resultados
const lb = document.getElementById("lightbox"), lbImg = document.getElementById("lbImg");
document.querySelectorAll(".shot img,.art img").forEach(img => img.parentElement.addEventListener("click", () => { lbImg.src = img.src; lbImg.alt = img.alt; lb.classList.add("open"); }));
lb.addEventListener("click", e => { if (e.target !== lbImg) lb.classList.remove("open"); });
addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("open"); });

// ===== Animações de entrada escalonadas =====
document.querySelectorAll(".pillars article,.edu article,.tile,.shot,.client-list li,.timeline li,.contact-links a,.big-stats li,.about-text .tags span,.vcard,.art,.site,.num-band li,.reach article,.logos img").forEach(el => {
  if (el.classList.contains("reveal")) return;
  const idx = [...el.parentElement.children].indexOf(el);
  el.style.setProperty("--d", Math.min(idx, 8) * 0.07 + "s");
  el.classList.add("rv");
  io.observe(el);
});
// reaplica o observer quando "Ver mais" revela tiles extras
document.getElementById("moreTiles").addEventListener("click", () => document.querySelectorAll(".tile.extra").forEach(t => t.classList.add("in")));

// ===== Ler mais (celular): linha do tempo e bio =====
document.querySelectorAll(".timeline li").forEach(li => {
  const p = li.querySelector("p");
  if (!p || p.textContent.length < 70) return;
  const b = document.createElement("button");
  b.type = "button"; b.className = "more-btn mobile-only"; b.textContent = "Ler mais +";
  b.onclick = () => { const o = li.classList.toggle("open"); b.textContent = o ? "Ler menos −" : "Ler mais +"; };
  li.appendChild(b);
});
const tl = document.querySelector(".timeline"), tlBtn = document.getElementById("moreTimeline");
tlBtn.onclick = () => { const o = tl.classList.toggle("all"); tlBtn.textContent = o ? "Mostrar menos" : "Ver trajetória completa"; if (!o) tl.scrollIntoView({ block: "start" }); };
const bio = document.querySelector(".about-text"), bioBtn = document.getElementById("moreBio");
bioBtn.onclick = () => { const o = bio.classList.toggle("open"); bioBtn.textContent = o ? "Ler menos −" : "Ler mais +"; };
