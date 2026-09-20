const PLAY_URL = "https://play.google.com/store/apps/details?id=com.darknode.vpn";

function initNav() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const onScroll = () => nav?.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  toggle?.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => document.body.classList.remove("menu-open"));
  });
}

function initDevice() {
  const device = document.querySelector(".device");
  if (!device) return;

  const status = device.querySelector("[data-status]");
  const label = device.querySelector("[data-label]");
  const timer = device.querySelector("[data-timer]");
  const ip = device.querySelector("[data-ip]");
  const hint = device.querySelector("[data-hint]");
  const up = device.querySelector("[data-up]");
  const down = device.querySelector("[data-down]");

  const states = [
    {
      name: "idle",
      status: "Offline",
      label: "START",
      timer: "",
      ip: "—",
      hint: "Tap Connect to start VPN",
      up: "0 B",
      down: "0 B",
    },
    {
      name: "connecting",
      status: "Connecting",
      label: "···",
      timer: "",
      ip: "Resolving…",
      hint: "Establishing secure tunnel",
      up: "12 KB",
      down: "48 KB",
    },
    {
      name: "connected",
      status: "Secured",
      label: "STOP",
      timer: "02:14",
      ip: "185. ••• ••• ••",
      hint: "VPN is connected",
      up: "1.4 MB",
      down: "27.8 MB",
    },
  ];

  let i = 0;
  const render = () => {
    const s = states[i];
    device.dataset.state = s.name;
    status.textContent = s.status;
    label.textContent = s.label;
    timer.textContent = s.timer;
    ip.textContent = s.ip;
    hint.textContent = s.hint;
    up.textContent = s.up;
    down.textContent = s.down;
  };

  render();
  setInterval(() => {
    i = (i + 1) % states.length;
    render();
  }, 3200);
}

function initPlayLinks() {
  document.querySelectorAll("[data-play]").forEach((el) => {
    el.setAttribute("href", PLAY_URL);
  });
}

initNav();
initDevice();
initPlayLinks();
