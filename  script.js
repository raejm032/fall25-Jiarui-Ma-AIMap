// --- Map Page: Tab switching ---
const tabButtons = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.map-section');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.getAttribute('data-tab');
    sections.forEach(s => {
      s.classList.remove('active');
      if (s.id === tab) s.classList.add('active');
    });
  });
});

// --- Chat simulation ---
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  const chatWindow = document.getElementById('chat-window');
  const userInput = document.getElementById('userInput');

  sendBtn.addEventListener('click', () => {
    const msg = userInput.value.trim();
    if (msg) {
      chatWindow.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
      chatWindow.innerHTML += `<p><strong>AI:</strong> I'm generating your route suggestion...</p>`;
      userInput.value = '';
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  });
}
