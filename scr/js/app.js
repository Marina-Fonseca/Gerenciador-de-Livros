// ...existing code...
/*
  Inicialização da aplicação e registro do service worker + botão instalar PWA.
*/
(function () {
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('SW registrado:', reg.scope))
        .catch(err => console.warn('SW não registrado:', err));
    }
  }

  // gerenciamento do prompt de instalação
  let deferredPrompt = null;
  const installBtn = document.getElementById('install-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
      installBtn.style.display = 'inline-block';
      installBtn.addEventListener('click', async () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        console.log('Escolha de instalação:', choice.outcome);
        deferredPrompt = null;
      });
    }
  });

  // desktop browsers e fallback: botão só aparece se evento disparado
  document.addEventListener('DOMContentLoaded', () => {
    AppUI.init();
    registerServiceWorker();
  });
})();
 // ...existing code...