<script type="module">

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnY3d8RMsKDKcBVZQso-sI67Kh5jNiQMM",
  authDomain: "thythet-prayinfo.firebaseapp.com",
  databaseURL: "https://thythet-prayinfo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thythet-prayinfo",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// 🔥 LOAD FIELD AREAS FROM FIREBASE
let fieldAreasData = {};

onValue(ref(db, "fieldAreas"), (snap) => {
  fieldAreasData = snap.val() || {};
  updateFieldAreas();
});

function updateFieldAreas() {
  const list = document.getElementById("fieldAreaList");
  if (!list) return;

  list.innerHTML = "";

  Object.values(fieldAreasData).forEach(area => {
    const btn = document.createElement("button");
    btn.className = "field-area-option";
    btn.textContent = area.name;

    btn.onclick = () => {
      document.getElementById("fieldAreaValue").textContent = area.name;
      document.getElementById("pastorName").value = area.pastorName || "";

      loadMembers(area);
    };

    list.appendChild(btn);
  });
}

// 👥 LOAD MEMBERS
function loadMembers(area) {
  const select = document.getElementById("participantSelect");
  select.innerHTML = "";

  Object.values(area.members || {}).forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.name;
    opt.textContent = m.name;
    select.appendChild(opt);
  });
}

</script>