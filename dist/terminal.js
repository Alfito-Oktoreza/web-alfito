// =================================================================
// RIFAT-STYLE PRO TERMINAL EMULATOR FOR ALFITO
// Inspired by https://rifatraditya.dev/
// Features:
// 1. Scoped scroll inside terminal body when mouse hovers inside window.
// 2. Real typing terminal input with blinking cursor.
// 3. Authentic Linux "command not found: <cmd>" error message.
// 4. Quick commands chip.
// =================================================================
(function() {
  function setupRifatTerminal() {
    var mountPoint = document.getElementById('terminal-rifat-mount');
    if (!mountPoint) {
      var allDivs = document.querySelectorAll('div');
      for (var k = 0; k < allDivs.length; k++) {
        var d = allDivs[k];
        if (d.classList && d.classList.contains('container') && d.classList.contains('-mt-20')) {
          mountPoint = d;
          break;
        }
      }
    }

    if (!mountPoint) return;
    if (document.getElementById('rifat-term-box')) return;

    var container = document.createElement('div');
    container.id = 'rifat-term-box';
    container.className = 'w-full max-w-4xl mx-auto mt-6 mb-20 select-text text-left relative z-20';
    container.style.marginBottom = '80px';

    container.innerHTML = `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">

      <style>
        .rterm-font {
          font-family: 'JetBrains Mono', monospace !important;
        }
        .rterm-container {
          background: rgba(13, 14, 18, 0.94);
          border: 1px solid rgba(202, 232, 58, 0.3);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 0 50px rgba(202, 232, 58, 0.12), 0 25px 60px rgba(0, 0, 0, 0.85);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .rterm-container:focus-within {
          border-color: rgba(202, 232, 58, 0.55);
          box-shadow: 0 0 65px rgba(202, 232, 58, 0.2), 0 30px 70px rgba(0, 0, 0, 0.95);
        }
        .rterm-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.04);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          user-select: none;
        }
        .rterm-dots {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .rterm-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }
        .rterm-title {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
        }
        .rterm-body {
          padding: 24px;
          height: 480px;
          overflow-y: scroll;
          overscroll-behavior: contain;
          background: rgba(0, 0, 0, 0.5);
          cursor: text;
        }
        @media (min-width: 768px) {
          .rterm-body {
            padding: 32px;
          }
        }
        .rterm-blink {
          display: inline-block;
          animation: rtermBlink 1.1s steps(2, start) infinite;
        }
        @keyframes rtermBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .rterm-body::-webkit-scrollbar {
          width: 7px;
        }
        .rterm-body::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.3);
        }
        .rterm-body::-webkit-scrollbar-thumb {
          background: rgba(202, 232, 58, 0.3);
          border-radius: 4px;
        }
        .rterm-body::-webkit-scrollbar-thumb:hover {
          background: rgba(202, 232, 58, 0.6);
        }
        .rterm-skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 10px;
          margin-top: 12px;
        }
        .rterm-skill-card {
          border: 1px solid rgba(202, 232, 58, 0.2);
          border-radius: 8px;
          background: rgba(202, 232, 58, 0.04);
          padding: 10px 14px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        .rterm-skill-card:hover {
          border-color: rgba(202, 232, 58, 0.5);
          background: rgba(202, 232, 58, 0.09);
        }
        .rterm-chip {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.15s ease;
        }
        .rterm-chip:hover {
          background: #CAE83A;
          color: #000;
          border-color: #CAE83A;
        }
        /* Custom prompt input without ugly browser borders */
        #rterm-input {
          font-family: inherit;
          caret-color: #CAE83A;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
          color: #ffffff !important;
          width: 100% !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
        }
        #rterm-input:focus,
        #rterm-input:active,
        #rterm-input:focus-visible,
        #rterm-input:hover {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
      </style>

      <!-- Quick interactive commands bar -->
      <div class="flex flex-wrap items-center gap-2 mb-3 px-1 rterm-font text-xs">
        <span class="text-white/40 mr-1 select-none text-[11px] uppercase tracking-wider">Try commands:</span>
        <button onclick="window.rtermExec('whoami')" class="rterm-chip px-2.5 py-1 rounded cursor-pointer font-medium">whoami</button>
        <button onclick="window.rtermExec('cat passion.txt')" class="rterm-chip px-2.5 py-1 rounded cursor-pointer font-medium">cat passion.txt</button>
        <button onclick="window.rtermExec('ls skills/')" class="rterm-chip px-2.5 py-1 rounded cursor-pointer font-medium text-[#CAE83A] border-[#CAE83A]/30">ls skills/</button>
        <button onclick="window.rtermExec('cat education.txt')" class="rterm-chip px-2.5 py-1 rounded cursor-pointer font-medium">cat education.txt</button>
        <button onclick="window.rtermExec('cat contact.txt')" class="rterm-chip px-2.5 py-1 rounded cursor-pointer font-medium">cat contact.txt</button>
        <button onclick="window.rtermExec('clear')" class="rterm-chip px-2.5 py-1 rounded cursor-pointer font-medium text-red-400 border-red-500/20">clear</button>
      </div>

      <!-- Terminal Window Box -->
      <div class="rterm-container">
        <!-- Titlebar -->
        <div class="rterm-header">
          <div class="rterm-dots">
            <span class="rterm-dot bg-red-500/70 border border-red-500"></span>
            <span class="rterm-dot bg-yellow-500/70 border border-yellow-500"></span>
            <span class="rterm-dot bg-green-500/70 border border-green-500"></span>
          </div>
          <span class="rterm-title rterm-font">root@alfito: ~</span>
          <div class="w-12 text-right">
            <span class="w-2 h-2 rounded-full bg-[#CAE83A] inline-block animate-pulse"></span>
          </div>
        </div>

        <!-- Scrollable Body with Isolated Wheel Scroll -->
        <div id="rterm-scroll-body" class="rterm-body rterm-font text-xs md:text-sm leading-relaxed text-white/90">
          <div id="rterm-animated-sequence" class="space-y-4"></div>
          <div id="rterm-user-history" class="space-y-4 mt-4"></div>

          <!-- Active Interactive Form Line -->
          <form id="rterm-form" onsubmit="window.rtermSubmit(event)" class="mt-4 flex items-center gap-2 text-xs md:text-sm text-[#CAE83A]">
            <span class="shrink-0 select-none font-bold">root@alfito:~$</span>
            <div class="relative flex-1 min-w-0 flex items-center">
              <input type="text" id="rterm-input" autocomplete="off" spellcheck="false" style="background:transparent;border:none;outline:none;box-shadow:none;padding:0;margin:0;width:100%;color:#ffffff;" class="w-full bg-transparent text-white rterm-font text-xs md:text-sm p-0 m-0 placeholder-white/20" placeholder="type a command..." />
            </div>
          </form>
        </div>
      </div>
    `;

    // Insert container
    if (mountPoint.id === 'terminal-rifat-mount') {
      mountPoint.appendChild(container);
    } else {
      mountPoint.insertBefore(container, mountPoint.firstChild);
    }

    var inputEl = document.getElementById('rterm-input');
    var scrollBody = document.getElementById('rterm-scroll-body');
    var seqContainer = document.getElementById('rterm-animated-sequence');
    var historyContainer = document.getElementById('rterm-user-history');

    // ISOLATE SCROLLING: When mouse is inside terminal body, wheel events scroll the terminal only!
    if (scrollBody) {
      scrollBody.addEventListener('wheel', function(e) {
        e.stopPropagation();
      }, { passive: false });

      scrollBody.addEventListener('click', function() {
        if (inputEl) inputEl.focus();
      });
    }

    var skillsList = [
      "Full-Stack Web Development",
      "Next.js & React Frameworks",
      "Tailwind CSS & Modern UI",
      "Node.js & RESTful APIs",
      "PostgreSQL & Databases",
      "Linux & Bash Scripting",
      "Cloudflare Pages & Edge Tools",
      "Mobile App Development"
    ];

    var steps = [
      {
        cmd: "whoami",
        output: `<div class="mt-2 text-white/80 leading-relaxed">
          I'm <strong>Alfito</strong>, an IT Student & Explorer currently studying Software Engineering at <strong>SMK Negeri 2 Depok Sleman</strong>. While most students are just beginning with basic code syntax, I enjoy diving deep into modern web architectures, containerized environments, and cloud infrastructure. I believe the best way to master technology is by continuously building real-world projects.
        </div>`
      },
      {
        cmd: "cat passion.txt",
        output: `<div class="mt-2 text-white/80 leading-relaxed">
          I am dedicated to mastering the art of modern full-stack engineering and cloud technology. From crafting responsive, accessible user interfaces with Next.js and Tailwind CSS to designing structured backend logic and databases, I turn curiosity into functional software. Every challenge is an opportunity to learn by building.
        </div>`
      },
      {
        cmd: "ls skills/",
        output: `<div class="rterm-skills-grid">
          ${skillsList.map(s => `
            <div class="rterm-skill-card">
              <span class="text-[#CAE83A] opacity-70 font-bold">#</span>
              <span>${s}</span>
            </div>
          `).join('')}
        </div>`
      }
    ];

    var hasAnimated = false;

    function runAnimationSequence() {
      if (hasAnimated) return;
      hasAnimated = true;

      var stepIdx = 0;

      function nextStep() {
        if (stepIdx >= steps.length) {
          if (inputEl) inputEl.focus();
          return;
        }

        var current = steps[stepIdx];
        var stepDiv = document.createElement('div');
        stepDiv.className = 'text-xs md:text-sm leading-relaxed mb-4';

        var promptDiv = document.createElement('div');
        promptDiv.className = 'text-[#CAE83A] mb-1 flex items-center gap-2';
        promptDiv.innerHTML = `<span>root@alfito:~$</span> <span class="text-white rterm-cmd-text"></span><span class="rterm-blink w-[2px] h-[15px] bg-[#CAE83A] inline-block align-middle ml-0.5 rterm-cursor-temp"></span>`;
        stepDiv.appendChild(promptDiv);

        var outputDiv = document.createElement('div');
        outputDiv.className = 'text-white/90';
        stepDiv.appendChild(outputDiv);

        seqContainer.appendChild(stepDiv);

        var cmdTextEl = promptDiv.querySelector('.rterm-cmd-text');
        var tempCursor = promptDiv.querySelector('.rterm-cursor-temp');

        var charIdx = 0;
        var fullCmd = current.cmd;

        function typeChar() {
          if (charIdx < fullCmd.length) {
            cmdTextEl.textContent += fullCmd.charAt(charIdx);
            charIdx++;
            scrollBody.scrollTop = scrollBody.scrollHeight;
            setTimeout(typeChar, 55);
          } else {
            if (tempCursor) tempCursor.remove();
            setTimeout(function() {
              outputDiv.innerHTML = current.output;
              scrollBody.scrollTop = scrollBody.scrollHeight;
              stepIdx++;
              setTimeout(nextStep, 500);
            }, 300);
          }
        }

        setTimeout(typeChar, 400);
      }

      nextStep();
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          runAnimationSequence();
          observer.disconnect();
        }
      }, { threshold: 0.25 });
      observer.observe(container);
    } else {
      runAnimationSequence();
    }

    window.rtermExec = function(rawCmd) {
      if (!rawCmd) return;
      var cmd = rawCmd.trim();
      var clean = cmd.toLowerCase();

      if (clean === 'clear' || clean === 'cls') {
        historyContainer.innerHTML = '';
        if (inputEl) inputEl.value = '';
        scrollBody.scrollTop = 0;
        return;
      }

      var entry = document.createElement('div');
      entry.className = 'text-xs md:text-sm mb-4';

      var promptLine = document.createElement('div');
      promptLine.className = 'text-[#CAE83A] mb-1 flex items-center gap-2';
      promptLine.innerHTML = `<span>root@alfito:~$</span> <span class="text-white">${cmd}</span>`;
      entry.appendChild(promptLine);

      var respLine = document.createElement('div');
      respLine.className = 'text-white/80';

      if (clean === 'whoami') {
        respLine.innerHTML = steps[0].output;
      } else if (clean === 'cat passion.txt' || clean === 'passion') {
        respLine.innerHTML = steps[1].output;
      } else if (clean === 'ls skills/' || clean === 'ls skills' || clean === 'skills') {
        respLine.innerHTML = steps[2].output;
      } else if (clean === 'cat photos' || clean === 'photos' || clean === 'ls images/' || clean === 'ls images' || clean === 'gallery') {
        respLine.innerHTML = `<div class="mt-2 space-y-2">
          <div class="text-white/70 text-xs">Visual assets loaded from <span class="text-[#CAE83A]">/images</span>:</div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div class="rounded-lg overflow-hidden border border-white/10 bg-black/60 p-2 text-center group">
              <img src="/images/me.png" class="w-full h-24 object-cover object-top rounded mb-1.5" />
              <div class="text-[11px] text-white font-medium">me.png</div>
              <div class="text-[9px] text-[#CAE83A]">Profile Portrait</div>
            </div>
            <div class="rounded-lg overflow-hidden border border-white/10 bg-black/60 p-2 text-center group">
              <img src="/images/kucing-oren.jpeg" class="w-full h-24 object-cover rounded mb-1.5" />
              <div class="text-[11px] text-white font-medium">kucing-oren.jpeg</div>
              <div class="text-[9px] text-[#CAE83A]">Kucing Oren 🐱</div>
            </div>
            <div class="rounded-lg overflow-hidden border border-white/10 bg-black/60 p-2 text-center group">
              <img src="/images/picsum/1.jpg" class="w-full h-24 object-cover rounded mb-1.5" />
              <div class="text-[11px] text-white font-medium">picsum/1.jpg</div>
              <div class="text-[9px] text-white/50">Modern UI</div>
            </div>
            <div class="rounded-lg overflow-hidden border border-white/10 bg-black/60 p-2 text-center group">
              <img src="/images/picsum/3.jpg" class="w-full h-24 object-cover rounded mb-1.5" />
              <div class="text-[11px] text-white font-medium">picsum/3.jpg</div>
              <div class="text-[9px] text-white/50">Creative Builds</div>
            </div>
          </div>
        </div>`;
      } else if (clean === 'cat education.txt' || clean === 'education') {
        respLine.innerHTML = `<div class="mt-2 text-white/80 leading-relaxed">
          <strong>SMK Negeri 2 Depok Sleman</strong> — Rekayasa Perangkat Lunak (Software Engineering)<br>
          <span class="text-white/50">2023 – Present • Focused on Software Architecture, Modern Web & Team Projects.</span>
        </div>`;
      } else if (clean === 'cat contact.txt' || clean === 'contact') {
        respLine.innerHTML = `<div class="mt-2 text-white/80 space-y-1">
          • Email    : <a href="mailto:alfito@gmail.com" class="text-[#CAE83A] underline">alfito@gmail.com</a><br>
          • GitHub   : <a href="https://github.com/flyychmoreeee" target="_blank" class="text-[#CAE83A] underline">github.com/flyychmoreeee</a><br>
          • LinkedIn : <a href="https://www.linkedin.com/in/rasya-zildan-19588b2a4/" target="_blank" class="text-[#CAE83A] underline">linkedin.com/in/alfito</a><br>
          • WhatsApp : <a href="https://wa.me/62895421845451" target="_blank" class="text-[#CAE83A] underline">+62 895-4218-45451</a>
        </div>`;
      } else if (clean === 'help') {
        respLine.innerHTML = `<div class="mt-1 text-white/70 space-y-1">
          Commands available: <span class="text-[#CAE83A]">whoami</span>, <span class="text-[#CAE83A]">cat passion.txt</span>, <span class="text-[#CAE83A]">ls skills/</span>, <span class="text-[#CAE83A]">cat photos</span>, <span class="text-[#CAE83A]">cat education.txt</span>, <span class="text-[#CAE83A]">cat contact.txt</span>, <span class="text-[#CAE83A]">clear</span>
        </div>`;
      } else if (clean === 'cat easteregg.txt' || clean === 'easteregg') {
        respLine.innerHTML = `<div class="text-[#CAE83A] mt-1 font-bold">wkwkwk hai bg! Selamat datang di portfolio Alfito 😄🚀</div>`;
      } else {
        // AUTHENTIC LINUX COMMAND NOT FOUND MESSAGE
        respLine.innerHTML = `<div class="text-red-400 mt-1">zsh: command not found: ${cmd}</div>`;
      }

      entry.appendChild(respLine);
      historyContainer.appendChild(entry);

      if (inputEl) inputEl.value = '';
      setTimeout(function() {
        scrollBody.scrollTop = scrollBody.scrollHeight;
      }, 50);
    };

    window.rtermSubmit = function(e) {
      e.preventDefault();
      if (inputEl) {
        window.rtermExec(inputEl.value);
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupRifatTerminal);
  } else {
    setupRifatTerminal();
  }
  setInterval(setupRifatTerminal, 800);
})();
