let editingNoteId = null;

function getCurrentTimestamp() {
  const now = new Date();
  const date = now.toLocaleDateString("vi-VN");
  const time = now.toLocaleTimeString("vi-VN");
  return `${date} ${time}`;
}

function saveNote() {
  const input = document.getElementById("study-note-input");
  const content = input.value.trim();
  if (!content) return;

  let notes = JSON.parse(localStorage.getItem("studyNotes")) || [];

  if (editingNoteId !== null) {
    notes = notes.map((note) =>
      note.id === editingNoteId ? { ...note, content } : note
    );
    editingNoteId = null;
  } else {
    const note = {
      content,
      timestamp: getCurrentTimestamp(),
      id: Date.now(),
    };
    notes.unshift(note);
  }

  localStorage.setItem("studyNotes", JSON.stringify(notes));
  input.value = "";
  renderNotes();
}

function renderNotes() {
  const list = document.getElementById("study-note-list");
  const notes = JSON.parse(localStorage.getItem("studyNotes")) || [];

  list.innerHTML = "";
  notes.forEach((note) => {
    const div = document.createElement("div");
    div.className = "study-note-item";
    div.innerHTML = `
          <div class="study-note-timestamp">🕒 ${note.timestamp}</div>
          <div class="study-note-content">${note.content}</div>
          <div class="note-actions">
            <button onclick="editNote(${note.id})">Sửa</button>
            <button onclick="deleteNote(${note.id})">Xoá</button>
          </div>
        `;
    list.appendChild(div);
  });
}

function editNote(id) {
  const notes = JSON.parse(localStorage.getItem("studyNotes")) || [];
  const note = notes.find((n) => n.id === id);
  if (note) {
    document.getElementById("study-note-input").value = note.content;
    editingNoteId = id;
  }
}

function deleteNote(id) {
  let notes = JSON.parse(localStorage.getItem("studyNotes")) || [];
  notes = notes.filter((note) => note.id !== id);
  localStorage.setItem("studyNotes", JSON.stringify(notes));
  renderNotes();
}

function clearNotes() {
  if (confirm("Xoá tất cả ghi chú?")) {
    localStorage.removeItem("studyNotes");
    renderNotes();
  }
}

// Gọi lúc bắt đầu
renderNotes();
