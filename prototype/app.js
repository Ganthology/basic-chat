const CONTACTS = {
  maya: { name: "Maya Chen", initials: "MC", hue: 208, phone: "+1 (415) 555-0142" },
  noah: { name: "Noah Patel", initials: "NP", hue: 232, phone: "+1 (206) 555-0194" },
  elena: { name: "Elena Ruiz", initials: "ER", hue: 196, phone: "+1 (312) 555-0177" },
  james: { name: "James Okonkwo", initials: "JO", hue: 220, phone: "+1 (617) 555-0118" },
  priya: { name: "Priya Shah", initials: "PS", hue: 250, phone: "+1 (646) 555-0133" },
  luca: { name: "Luca Moretti", initials: "LM", hue: 188, phone: "+1 (415) 555-0160" },
  hana: { name: "Hana Kim", initials: "HK", hue: 214, phone: "+1 (213) 555-0188" },
  omar: { name: "Omar Haddad", initials: "OH", hue: 198, phone: "+1 (718) 555-0121" },
  iris: { name: "Iris Vale", initials: "IV", hue: 240, phone: "+1 (503) 555-0166" },
  theo: { name: "Theo Brooks", initials: "TB", hue: 226, phone: "+1 (512) 555-0109" },
};

const TAB_ROUTES = new Set(["chats", "settings"]);
const ATTACHMENTS = {
  photo: { kind: "photo", label: "Photo" },
  gallery: { kind: "gallery", label: "Gallery" },
  file: { kind: "file", name: "Notes.pdf", ext: "PDF" },
};

const root = document.documentElement;
const screen = document.querySelector(".screen");
const tabbar = document.querySelector(".tabbar");
const peer = document.getElementById("open-profile");
const threadLog = document.getElementById("thread-log");
const emptyThread = document.getElementById("empty-thread");
const emptyChats = document.getElementById("empty-chats");
const emptySearch = document.getElementById("empty-search");
const chatSearch = document.getElementById("chat-search");
const emptyToggle = document.getElementById("empty-toggle");
const chatList = document.querySelector(".chat-list");
const listEnd = document.querySelector(".list-end");
const newSheet = document.getElementById("new-sheet");
const sheetList = document.getElementById("sheet-list");
const attachTray = document.getElementById("attach-tray");
const attachToggle = document.getElementById("attach-toggle");

let isNewChat = false;

function setPressed(attr, value) {
  document.querySelectorAll(`[${attr}]`).forEach((button) => {
    button.classList.toggle("is-on", button.getAttribute(attr) === value);
  });
}

function showRoute(route) {
  closeSheet();
  setAttachOpen(false);
  screen.dataset.route = route;

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("is-active", page.dataset.page === route);
  });

  document.querySelectorAll("[data-route]").forEach((button) => {
    if (button.tagName === "BUTTON") {
      button.classList.toggle("is-on", button.dataset.route === route);
    }
  });

  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("is-on", button.dataset.tab === route);
  });

  if (TAB_ROUTES.has(route)) {
    tabbar.classList.remove("is-mini");
  }
}

function setThreadEmpty(empty) {
  emptyThread.hidden = !empty;
  emptyThread.classList.toggle("is-on", empty);
  threadLog.classList.toggle("is-empty", empty);
}

function paintAvatar(node, contact) {
  node.dataset.initials = contact.initials;
  node.style.setProperty("--h", String(contact.hue));
}

function selectContact(id) {
  const contact = CONTACTS[id];
  if (!contact) {
    return;
  }

  isNewChat = false;
  document.querySelectorAll(".row[data-contact]").forEach((row) => {
    row.classList.toggle("is-selected", row.dataset.contact === id);
  });

  paintAvatar(document.getElementById("thread-avatar"), contact);
  paintAvatar(document.getElementById("profile-avatar"), contact);
  document.getElementById("thread-name").textContent = contact.name;
  document.getElementById("profile-name").textContent = contact.name;
  document.getElementById("profile-phone").textContent = contact.phone;
  peer.classList.remove("is-static");
  setThreadEmpty(false);
  showRoute("thread");
}

function closeSheet() {
  newSheet.hidden = true;
}

function openSheet() {
  newSheet.hidden = false;
}

function startConversation() {
  openSheet();
}

function renderSheet() {
  const items = Object.entries(CONTACTS).map(([id, contact]) => {
    const item = document.createElement("li");
    const row = document.createElement("button");
    const avatar = document.createElement("span");
    const main = document.createElement("span");
    const name = document.createElement("span");

    row.type = "button";
    row.className = "row";
    row.dataset.contact = id;
    avatar.className = "avatar";
    avatar.dataset.initials = contact.initials;
    avatar.style.setProperty("--h", String(contact.hue));
    main.className = "row-main";
    name.className = "row-name";
    name.textContent = contact.name;
    main.append(name);
    row.append(avatar, main);
    row.addEventListener("click", () => {
      closeSheet();
      selectContact(id);
    });
    item.append(row);
    return item;
  });

  sheetList.replaceChildren(...items);
}

function bindHeaderBlur() {
  document.querySelectorAll(".page").forEach((page) => {
    const scroller = page.querySelector(".scroll");
    const header = page.querySelector(".large-nav, .stack-nav");
    if (!scroller || !header) {
      return;
    }

    const sync = () => {
      header.classList.toggle("is-stuck", scroller.scrollTop > 8);
    };

    scroller.addEventListener("scroll", sync, { passive: true });
    sync();
  });
}

function setAttachOpen(open) {
  attachTray.hidden = !open;
  attachToggle.classList.toggle("is-on", open);
  attachToggle.setAttribute("aria-expanded", String(open));
}

function appendOutgoing(node) {
  setThreadEmpty(false);
  node.classList.add("is-optimistic");
  threadLog.appendChild(node);
  thread.scrollTop = thread.scrollHeight;
  window.setTimeout(() => {
    node.classList.remove("is-optimistic");
  }, 400);
}

function sendAttachment(type) {
  const attachment = ATTACHMENTS[type];
  if (!attachment) {
    return;
  }

  const bubble = document.createElement("div");

  if (attachment.kind === "file") {
    const badge = document.createElement("span");
    const label = document.createElement("span");
    bubble.className = "bubble out file-chip";
    badge.className = "file-badge";
    badge.textContent = attachment.ext;
    label.textContent = attachment.name;
    bubble.append(badge, label);
  } else {
    const frame = document.createElement("div");
    const label = document.createElement("span");
    bubble.className = "bubble out media";
    frame.className = `media-frame ${attachment.kind}`;
    label.textContent = attachment.label;
    frame.append(label);
    bubble.append(frame);
  }

  appendOutgoing(bubble);
  setAttachOpen(false);
}

function filterChats() {
  const query = chatSearch.value.trim().toLowerCase();
  const listIsEmpty = emptyToggle.checked;
  let visible = 0;

  document.querySelectorAll(".chat-list li").forEach((item) => {
    const row = item.querySelector(".row");
    const hay = `${row.querySelector(".row-name").textContent} ${row.querySelector(".row-preview").textContent}`;
    const match = !query || hay.toLowerCase().includes(query);
    item.hidden = !match;
    if (match) {
      visible += 1;
    }
  });

  chatList.classList.toggle("is-empty", listIsEmpty);
  emptyChats.hidden = !listIsEmpty;
  emptyChats.classList.toggle("is-on", listIsEmpty);
  emptySearch.hidden = listIsEmpty || !query || visible > 0;
  emptySearch.classList.toggle("is-on", !listIsEmpty && Boolean(query) && visible === 0);
  listEnd.classList.toggle("is-empty", listIsEmpty || (Boolean(query) && visible === 0));
}

document.querySelectorAll("[data-variant]").forEach((button) => {
  button.addEventListener("click", () => {
    const variant = button.dataset.variant;
    root.dataset.variant = variant;
    setPressed("data-variant", variant);
  });
});

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.mode;
    root.dataset.mode = mode;
    setPressed("data-mode", mode);
  });
});

document.querySelectorAll(".studio [data-route]").forEach((button) => {
  button.addEventListener("click", () => showRoute(button.dataset.route));
});

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => showRoute(button.dataset.tab));
});

document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", () => showRoute(button.dataset.back));
});

document.querySelectorAll(".row[data-contact]").forEach((row) => {
  row.addEventListener("click", () => selectContact(row.dataset.contact));
});

peer.addEventListener("click", () => {
  if (!isNewChat) {
    showRoute("profile");
  }
});

document.getElementById("new-chat").addEventListener("click", startConversation);
document.getElementById("empty-start").addEventListener("click", startConversation);
document.getElementById("sheet-dismiss").addEventListener("click", closeSheet);

attachToggle.addEventListener("click", () => {
  setAttachOpen(attachTray.hidden);
});

document.querySelectorAll("[data-attach]").forEach((button) => {
  button.addEventListener("click", () => sendAttachment(button.dataset.attach));
});

["input", "search", "change"].forEach((eventName) => {
  chatSearch.addEventListener(eventName, filterChats);
});

emptyToggle.addEventListener("change", filterChats);

const chatsScroll = document.querySelector('[data-scroll="chats"]');
let lastY = 0;

chatsScroll.addEventListener("scroll", () => {
  const y = chatsScroll.scrollTop;
  tabbar.classList.toggle("is-mini", y > lastY && y > 24);
  lastY = y;
});

const blockSwitch = document.getElementById("block-switch");
blockSwitch.addEventListener("click", () => {
  const next = blockSwitch.getAttribute("aria-checked") !== "true";
  blockSwitch.setAttribute("aria-checked", String(next));
});

const composer = document.getElementById("composer");
const composerInput = document.getElementById("composer-input");
const thread = document.getElementById("thread");

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = composerInput.value.trim();
  if (!text) {
    return;
  }

  const bubble = document.createElement("div");
  bubble.className = "bubble out";
  bubble.textContent = text;
  appendOutgoing(bubble);
  composerInput.value = "";
  setAttachOpen(false);
});

renderSheet();
bindHeaderBlur();
setAttachOpen(false);
