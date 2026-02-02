// script.js - CV Interactivo de Jesús Bureo Osuna - Versión CORREGIDA

document.addEventListener('DOMContentLoaded', function () {
  // ============================================
  // SISTEMA DE CAMBIO DE TEMA OSCURO/CLARO
  // ============================================
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Verificar si hay una preferencia guardada
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    updateThemeButton('light');
  }

  // Función para actualizar el botón de tema
  function updateThemeButton(theme) {
    if (theme === 'light') {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
    }
  }

  // Event listener para el toggle de tema
  themeToggle.addEventListener('click', function () {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light');
      updateThemeButton('light');
    } else {
      localStorage.setItem('theme', 'dark');
      updateThemeButton('dark');
    }
  });

  // ============================================
  // SISTEMA DE PESTAÑAS
  // ============================================
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  function switchTab(tabId) {
    tabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    const activeTab = document.querySelector(`.tab[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(tabId);

    if (activeTab && activeContent) {
      activeTab.classList.add('active');
      activeContent.classList.add('active');

      // Animar barras de habilidades cuando se muestra esa pestaña
      if (tabId === 'skills') {
        // Pequeño retraso para asegurar que la pestaña esté visible
        setTimeout(() => {
          animateSkillBars();
        }, 300);
      }
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // ============================================
  // BOTÓN DE DESCARGA PDF
  // ============================================
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      alert('La función de descarga PDF mejorada se implementará en la próxima fase.\n\nPor ahora, puedes usar la función de imprimir de tu navegador:\n1. Haz clic derecho en la página\n2. Selecciona "Imprimir"\n3. En destino, elige "Guardar como PDF"');
    });
  }

  // ============================================
  // CARGAR CONTENIDO INICIAL
  // ============================================
  loadSkills();
  loadProjects();
  loadLanguages();
  loadContact();

  // NOTA: HE ELIMINADO LA LLAMADA DUPLICADA A animateSkillBars()
  // Las barras solo se animarán cuando se abra la pestaña "Habilidades"
});

// ============================================
// ICONOS PARA HABILIDADES
// ============================================
const skillIcons = {
  'Java': 'fab fa-java',
  'SQL': 'fas fa-database',
  'HTML/CSS': 'fab fa-html5',
  'JavaScript': 'fab fa-js-square',
  'JavaFX': 'fas fa-tv',
  'Git': 'fab fa-git-alt'
};

// ============================================
// FUNCIÓN PARA CARGAR LAS HABILIDADES (CORREGIDA)
// ============================================
function loadSkills() {
  const skillsContainer = document.querySelector('#skills .card .skills-grid');

  const skills = [
    { name: 'Java', level: 5, max: 5 },
    { name: 'SQL', level: 5, max: 5 },
    { name: 'HTML/CSS', level: 2, max: 5 },
    { name: 'JavaScript', level: 1, max: 5 },
    { name: 'JavaFX', level: 4, max: 5 },
    { name: 'Git', level: 2, max: 5 }
  ];

  let skillsHTML = '';

  skills.forEach(skill => {
    const icon = skillIcons[skill.name] || 'fas fa-code';
    const percentage = (skill.level / skill.max) * 100;

    skillsHTML += `
            <div class="skill-item">
                <div class="skill-header">
                    <span class="skill-name">
                        <i class="${icon}"></i> ${skill.name}
                    </span>
                    <span class="skill-level">${skill.level}/${skill.max}</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" 
                         data-level="${percentage}"
                         style="--target-width: ${percentage}%; width: 0%">
                    </div>
                </div>
            </div>
        `;
  });

  skillsContainer.innerHTML = skillsHTML;
  
  // NOTA: HE ELIMINADO LA LLAMADA A animateSkillBars() DESDE AQUÍ
  // Solo se llamará cuando se abra la pestaña "Habilidades"
}

// ============================================
// FUNCIÓN PARA ANIMAR LAS BARRAS DE HABILIDADES (SIMPLIFICADA)
// ============================================
function animateSkillBars() {
  const progressBars = document.querySelectorAll('.skill-progress');
  
  // Si ya están animadas, no hacer nada
  if (progressBars[0] && progressBars[0].classList.contains('animated')) {
    return;
  }

  // Animar cada barra con un retraso escalonado
  progressBars.forEach((bar, index) => {
    setTimeout(() => {
      const targetWidth = bar.getAttribute('data-level') + '%';
      bar.style.width = targetWidth;
      bar.classList.add('animated');
    }, index * 200);
  });
}

// ============================================
// ICONOS PARA TECNOLOGÍAS
// ============================================
const techIcons = {
  'Java': 'fab fa-java',
  'Java Swing': 'fas fa-window-maximize',
  'MySQL': 'fas fa-database',
  'XAMPP': 'fas fa-server',
  'Apache Server': 'fas fa-server',
  'NetBeans': 'fas fa-code',
  'JavaFX': 'fas fa-tv',
  'SceneBuilder': 'fas fa-paint-brush',
  'SQL Server': 'fas fa-database',
  'VSCode': 'fas fa-code'
};

// ============================================
// FUNCIÓN PARA CARGAR PROYECTOS
// ============================================
function loadProjects() {
  const projectsContainer = document.querySelector('#projects .card .projects-grid');

  const projects = [
    {
      title: 'Gestión de Albaranes',
      description: 'Aplicación de escritorio para gestionar inventario de entrada con unidades y precios de productos, proveedores y clientes. Actualmente en desarrollo.',
      technologies: ['Java', 'Java Swing', 'MySQL', 'XAMPP', 'Apache Server', 'NetBeans'],
      status: 'En desarrollo'
    },
    {
      title: 'Cuestionarios de Salud Laboral',
      description: 'Sistema de gestión de reconocimientos médicos con lista de espera, confirmaciones de asistencia y cuestionarios de salud laboral personalizables.',
      technologies: ['Java', 'JavaFX', 'SceneBuilder', 'SQL Server', 'VSCode'],
      status: 'Proyecto de prácticas - En desarrollo'
    }
  ];

  let projectsHTML = '';

  projects.forEach(project => {
    let techHTML = '<div class="tech-list">';

    project.technologies.forEach(tech => {
      const icon = techIcons[tech] || 'fas fa-code';
      techHTML += `
                <div class="tech-bubble" title="${tech}">
                    <i class="${icon}"></i>
                    <span class="tech-name">${tech}</span>
                </div>
            `;
    });

    techHTML += '</div>';

    projectsHTML += `
            <div class="project-card">
                <h4><i class="fas fa-folder-open"></i> ${project.title}</h4>
                <p><strong>Estado:</strong> <span class="status-bubble">${project.status}</span></p>
                <p>${project.description}</p>
                ${techHTML}
            </div>
        `;
  });

  projectsContainer.innerHTML = projectsHTML;
}

// ============================================
// FUNCIÓN PARA CARGAR IDIOMAS CON BANDERAS REALES
// ============================================
function loadLanguages() {
  const languagesContainer = document.querySelector('#languages .card .languages-grid');

  const languages = [
    {
      name: 'Inglés',
      level: 'B2 (Certificado B1)',
      flagCode: 'gb',
      flagName: 'Reino Unido'
    },
    {
      name: 'Francés',
      level: 'A2',
      flagCode: 'fr',
      flagName: 'Francia'
    },
    {
      name: 'Chino',
      level: 'HSK1 (en preparación)',
      flagCode: 'cn',
      flagName: 'China'
    }
  ];

  let languagesHTML = '';

  languages.forEach(lang => {
    const flagUrl = `https://flagcdn.com/w160/${lang.flagCode}.png`;

    languagesHTML += `
            <div class="language-bubble">
                <div class="flag-bubble" title="Bandera de ${lang.flagName}">
                    <img src="${flagUrl}" alt="Bandera de ${lang.flagName}" class="flag-image" 
                         onerror="this.src='https://flagcdn.com/w160/un.png'">
                </div>
                <div class="language-text">
                    <h4>${lang.name}</h4>
                    <p>${lang.level}</p>
                </div>
            </div>
        `;
  });

  languagesContainer.innerHTML = languagesHTML;
}

// ============================================
// FUNCIÓN PARA CARGAR CONTACTO
// ============================================
function loadContact() {
  const contactContainer = document.querySelector('#contact .card .contact-links');

  // REEMPLAZA ESTOS ENLACES CON LOS TUYOS REALES
  const contacts = [
    {
      platform: 'GitHub',
      icon: 'fab fa-github',
      link: 'https://github.com/tu-usuario',
      text: 'Ver mis proyectos de código',
      color: '#333'
    },
    {
      platform: 'LinkedIn',
      icon: 'fab fa-linkedin',
      link: 'https://linkedin.com/in/tu-perfil',
      text: 'Conectar profesionalmente',
      color: '#0077B5'
    },
    {
      platform: 'Email',
      icon: 'fas fa-envelope',
      link: 'mailto:jesusbureo@gmail.com',
      text: 'jesusbureo@gmail.com',
      color: '#EA4335'
    }
  ];

  let contactHTML = '';

  contacts.forEach(contact => {
    contactHTML += `
            <a href="${contact.link}" target="_blank" class="contact-link">
                <div class="contact-icon" style="background: ${contact.color}">
                    <i class="${contact.icon}"></i>
                </div>
                <div class="contact-text">
                    <h4>${contact.platform}</h4>
                    <p>${contact.text}</p>
                </div>
            </a>
        `;
  });

  contactContainer.innerHTML = contactHTML;
}