// script.js - CV Interactivo de Jesús Bureo Osuna con Generación de PDF

document.addEventListener('DOMContentLoaded', function() {
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
    themeToggle.addEventListener('click', function() {
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
    
    // Variable para controlar si ya se animaron las barras
    let skillsAnimated = false;
    
    function switchTab(tabId) {
        tabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        const activeTab = document.querySelector(`.tab[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);
        
        if (activeTab && activeContent) {
            activeTab.classList.add('active');
            activeContent.classList.add('active');
            
            // Animar barras de habilidades cuando se muestra esa pestaña
            if (tabId === 'skills' && !skillsAnimated) {
                // Pequeño retraso para asegurar que la pestaña esté visible
                setTimeout(() => {
                    animateSkillBars();
                    skillsAnimated = true;
                }, 300);
            }
        }
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // ============================================
    // BOTÓN DE DESCARGA PDF - FUNCIONALIDAD COMPLETA
    // ============================================
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', generatePDF);
    }
    
    // ============================================
    // CARGAR CONTENIDO INICIAL
    // ============================================
    loadSkills();
    loadProjects();
    loadLanguages();
    loadContact();
    
    // Inicializar con la pestaña de perfil activa
    switchTab('profile');
});

// ============================================
// FUNCIÓN PARA GENERAR PDF - VERSIÓN FINAL CORREGIDA
// ============================================
// ============================================
// FUNCIÓN PARA GENERAR PDF - VERSIÓN COMPACTA Y PROFESIONAL
// ============================================
function generatePDF() {
    // Mostrar mensaje de carga
    const downloadBtn = document.querySelector('#downloadBtn');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando PDF...';
    downloadBtn.disabled = true;
    
    // Usar jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Configuración compacta
    const margin = 15; // Reducido de 20
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = margin;
    
    // Función para agregar espacio (reducida)
    const addSpace = (space = 8) => {
        yPosition += space;
        if (yPosition > pageHeight - margin - 15) {
            doc.addPage();
            yPosition = margin;
        }
    };
    
    // Función para agregar texto (más compacta)
    const addText = (text, size = 11, isBold = false, align = 'left') => {
        doc.setFontSize(size);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        
        const textWidth = pageWidth - 2 * margin;
        const lines = doc.splitTextToSize(text, textWidth);
        
        // Verificar espacio con altura reducida
        const lineHeight = size * 0.33; // Reducido
        const neededSpace = lines.length * lineHeight + 3; // Reducido
        
        if (yPosition + neededSpace > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
        }
        
        doc.text(lines, margin, yPosition, { align: align });
        yPosition += neededSpace;
    };
    
    // Función para título de sección (más compacta)
    const addSectionTitle = (title) => {
        addSpace(10); // Reducido de 15
        
        // Fondo más delgado
        doc.setFillColor(123, 104, 238);
        doc.roundedRect(margin - 3, yPosition - 6, pageWidth - 2 * margin + 6, 16, 2, 2, 'F'); // Altura reducida
        
        // Texto más pequeño
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14); // Reducido de 16
        doc.setFont('helvetica', 'bold');
        doc.text(title, margin, yPosition + 1); // Ajustado
        
        doc.setTextColor(0, 0, 0);
        yPosition += 14; // Reducido de 18
    };
    
    // ============================================
    // ENCABEZADO COMPACTO
    // ============================================
    doc.setFillColor(123, 104, 238);
    doc.roundedRect(0, 0, pageWidth, 50, 0, 0, 'F'); // Altura reducida de 70 a 50
    
    // Nombre más pequeño
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22); // Reducido de 28
    doc.setFont('helvetica', 'bold');
    doc.text('JESÚS BUREO OSUNA', pageWidth / 2, 22, { align: 'center' });
    
    // Título más pequeño
    doc.setFontSize(14); // Reducido de 18
    doc.setFont('helvetica', 'normal');
    doc.text('Desarrollador Java Junior en formación', pageWidth / 2, 35, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    yPosition = 60; // Ajustado desde 85
    
    // ============================================
    // PERFIL (MÁS COMPACTO)
    // ============================================
    addSectionTitle('PERFIL PROFESIONAL');
    addText('Estudiante de programación con formación sólida en Java y SQL para Backend. Conocimientos de JavaFX, HTML y CSS para frontend. Busco mi primera oportunidad profesional donde aplicar mis conocimientos y seguir aprendiendo.', 11, false);
    
    addSpace(5);
    addText('OBJETIVO PROFESIONAL:', 11, true);
    addText('Integrarme en un equipo de desarrollo donde contribuir con mis habilidades en Java y aprender de desarrolladores experimentados, con objetivo de crecer como desarrollador full-stack.', 11, false);
    
    // ============================================
    // HABILIDADES TÉCNICAS (MÁS COMPACTA)
    // ============================================
    addSectionTitle('HABILIDADES TÉCNICAS');
    
    const skills = [
        { name: 'Java', level: 5 },
        { name: 'SQL', level: 5 },
        { name: 'JavaFX', level: 4 },
        { name: 'HTML/CSS', level: 2 },
        { name: 'JavaScript', level: 1 },
        { name: 'Git', level: 2 }
    ];
    
    skills.forEach(skill => {
        if (yPosition > pageHeight - 25) {
            doc.addPage();
            yPosition = margin + 5;
        }
        
        // Nombre más compacto
        doc.setFontSize(11); // Reducido de 12
        doc.setFont('helvetica', 'bold');
        doc.text(skill.name + ':', margin, yPosition);
        
        // Nivel más compacto
        doc.setFont('helvetica', 'normal');
        doc.text(skill.level + '/5', margin + 70, yPosition); // Mover más a la izquierda
        
        // Barra de progreso más pequeña
        const barWidth = 50; // Reducido de 60
        const barHeight = 6; // Reducido de 8
        const barX = pageWidth - margin - barWidth - 5;
        const barY = yPosition - 3;
        
        // Fondo de la barra
        doc.setDrawColor(220, 220, 220);
        doc.setFillColor(220, 220, 220);
        doc.roundedRect(barX, barY, barWidth, barHeight, 3, 3, 'F');
        
        // Progreso
        const progressWidth = (skill.level / 5) * barWidth;
        doc.setDrawColor(255, 215, 0);
        doc.setFillColor(255, 215, 0);
        doc.roundedRect(barX, barY, progressWidth, barHeight, 3, 3, 'F');
        
        yPosition += 12; // Reducido de 14
    });
    
    // ============================================
    // PROYECTOS (MÁS COMPACTOS)
    // ============================================
    addSectionTitle('PROYECTOS PERSONALES');
    
    // Proyecto 1 - Formato más compacto
    doc.setFontSize(12); // Reducido de 14
    doc.setFont('helvetica', 'bold');
    doc.text('• Gestión de Albaranes', margin, yPosition);
    yPosition += 6; // Reducido
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Estado: En desarrollo', margin, yPosition);
    yPosition += 5;
    
    doc.setFontSize(10); // Reducido de 11
    doc.setFont('helvetica', 'normal');
    addText('Aplicación de escritorio para gestionar inventario de entrada con unidades y precios, proveedores y clientes.', 10, false);
    
    doc.setFont('helvetica', 'bold');
    addText('Tecnologías: Java, Java Swing, MySQL, XAMPP, Apache Server, NetBeans', 9, false);
    
    addSpace(8); // Reducido
    
    // Proyecto 2
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('• Cuestionarios de Salud Laboral', margin, yPosition);
    yPosition += 6;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Estado: Proyecto de prácticas - En desarrollo', margin, yPosition);
    yPosition += 5;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    addText('Sistema de gestión de reconocimientos médicos con lista de espera, confirmaciones y cuestionarios personalizables.', 10, false);
    
    doc.setFont('helvetica', 'bold');
    addText('Tecnologías: Java, JavaFX, SceneBuilder, SQL Server, VSCode', 9, false);
    
    // ============================================
    // IDIOMAS (MÁS COMPACTOS)
    // ============================================
    addSectionTitle('IDIOMAS');
    
    const languages = [
        { name: 'Inglés', level: 'B2 (Certificado B1)' },
        { name: 'Francés', level: 'A2' },
        { name: 'Chino', level: 'HSK1 (en preparación)' }
    ];
    
    languages.forEach(lang => {
        if (yPosition > pageHeight - 25) {
            doc.addPage();
            yPosition = margin + 5;
        }
        
        doc.setFontSize(11); // Reducido
        doc.setFont('helvetica', 'bold');
        doc.text(lang.name + ':', margin, yPosition);
        
        doc.setFont('helvetica', 'normal');
        doc.text(lang.level, margin + 35, yPosition); // Más cerca
        
        yPosition += 10; // Reducido de 12
    });
    
    // ============================================
    // CONTACTO (MÁS COMPACTO)
    // ============================================
    addSectionTitle('INFORMACIÓN DE CONTACTO');
    
    const contactInfo = [
        { type: 'Email', value: 'jesusbureo@gmail.com' },
        { type: 'GitHub', value: 'github.com/j3vre0' },
        { type: 'LinkedIn', value: 'linkedin.com/in/jbureo' },
        { type: 'Portfolio', value: 'CV Interactivo Online' }
    ];
    
    contactInfo.forEach(contact => {
        if (yPosition > pageHeight - 25) {
            doc.addPage();
            yPosition = margin + 5;
        }
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(contact.type + ':', margin, yPosition);
        
        doc.setFont('helvetica', 'normal');
        doc.text(contact.value, margin + 30, yPosition); // Más cerca
        
        yPosition += 10; // Reducido
    });
    
    // ============================================
    // PIE DE PÁGINA COMPACTO
    // ============================================
    const footerY = pageHeight - 15; // Subido
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, footerY, pageWidth - margin, footerY);
    
    doc.setFontSize(9); // Reducido
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('CV generado el ' + new Date().toLocaleDateString('es-ES'), 
            pageWidth / 2, footerY + 8, { align: 'center' });
    
    // ============================================
    // GUARDAR PDF
    // ============================================
    setTimeout(() => {
        doc.save('CV_Jesús_Bureo_Osuna.pdf');
        
        // Restaurar botón
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        
        // Mostrar notificación
        showNotification('PDF compacto generado correctamente');
    }, 300);
}

// ============================================
// FUNCIÓN PARA MOSTRAR NOTIFICACIONES
// ============================================
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'pdf-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #9370DB, #7B68EE);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid #FFD700;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

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
// FUNCIÓN PARA CARGAR LAS HABILIDADES
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
                    <div class="skill-progress" data-level="${percentage}"></div>
                </div>
            </div>
        `;
    });
    
    skillsContainer.innerHTML = skillsHTML;
}

// ============================================
// FUNCIÓN PARA ANIMAR LAS BARRAS DE HABILIDADES
// ============================================
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    // Animar cada barra con un retraso escalonado
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.getAttribute('data-level') + '%';
            bar.style.width = targetWidth;
            bar.classList.add('completed');
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
            link: 'https://github.com/j3vre0',
            text: 'Ver mis proyectos de código',
            color: '#333'
        },
        {
            platform: 'LinkedIn',
            icon: 'fab fa-linkedin',
            link: 'https://linkedin.com/in/jbureo',
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

// ============================================
// ANIMACIONES CSS PARA NOTIFICACIONES (agregar al CSS)
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);