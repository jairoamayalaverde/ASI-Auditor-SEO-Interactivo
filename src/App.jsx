import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Circle, ChevronDown, ChevronUp, RotateCcw, 
  Award, TrendingUp, AlertTriangle, FileText, Lightbulb, Info, Save 
} from 'lucide-react';
import { jsPDF } from "jspdf";

export default function InteractiveSEOAudit() {
  const auditData = [
    {
      id: 'fase1',
      title: 'Análisis Inicial',
      icon: '🎯',
      color: 'blue',
      weight: 5,
      items: [
        { id: 'f1-1', text: 'URL del sitio documentada', critical: false, points: 2 },
        { id: 'f1-2', text: 'Industria/Nicho identificado', critical: false, points: 2 },
        { id: 'f1-3', text: 'Objetivo principal definido claramente', critical: true, points: 5 },
        { id: 'f1-4', text: 'Google Search Console verificado y configurado', critical: true, points: 10 },
        { id: 'f1-5', text: 'Google Analytics 4 instalado correctamente', critical: true, points: 10 },
        { id: 'f1-6', text: 'Acceso completo al CMS/backend obtenido', critical: false, points: 3 },
        { id: 'f1-7', text: 'Herramientas SEO configuradas (Ahrefs/SEMrush/etc)', critical: false, points: 5 },
        { id: 'f1-8', text: 'Competidores principales identificados (mínimo 3)', critical: false, points: 3 },
      ]
    },
    {
      id: 'fase2',
      title: 'Análisis Técnico',
      icon: '⚙️',
      color: 'purple',
      weight: 25,
      items: [
        { id: 'f2-1', text: 'Robots.txt existe y configurado correctamente', critical: true, points: 8 },
        { id: 'f2-2', text: 'Sitemap XML actualizado y enviado a Search Console', critical: true, points: 8 },
        { id: 'f2-3', text: 'Índice de páginas correcto (comando site: verificado)', critical: true, points: 7 },
        { id: 'f2-4', text: 'No hay sobre-indexación (URLs duplicadas)', critical: true, points: 6 },
        { id: 'f2-5', text: 'URLs son limpias, cortas y descriptivas', critical: false, points: 5 },
        { id: 'f2-6', text: 'Estructura de URLs con keywords relevantes', critical: false, points: 4 },
        { id: 'f2-7', text: 'Navegación principal clara y accesible', critical: false, points: 4 },
        { id: 'f2-8', text: 'Breadcrumbs implementados correctamente', critical: false, points: 3 },
        { id: 'f2-9', text: 'Profundidad máxima de 3-4 clicks desde home', critical: false, points: 5 },
        { id: 'f2-10', text: 'No existen páginas huérfanas (sin enlaces internos)', critical: true, points: 6 },
        { id: 'f2-11', text: 'PageSpeed Insights móvil > 90', critical: true, points: 10 },
        { id: 'f2-12', text: 'PageSpeed Insights desktop > 90', critical: false, points: 5 },
        { id: 'f2-13', text: 'LCP (Largest Contentful Paint) < 2.5s', critical: true, points: 8 },
        { id: 'f2-14', text: 'FID (First Input Delay) < 100ms', critical: true, points: 7 },
        { id: 'f2-15', text: 'CLS (Cumulative Layout Shift) < 0.1', critical: true, points: 7 },
        { id: 'f2-16', text: 'Imágenes optimizadas (WebP/AVIF)', critical: false, points: 6 },
        { id: 'f2-17', text: 'Lazy loading implementado', critical: false, points: 4 },
        { id: 'f2-18', text: 'CSS y JavaScript minificados', critical: false, points: 4 },
        { id: 'f2-19', text: 'Compresión Gzip/Brotli habilitada', critical: false, points: 4 },
        { id: 'f2-20', text: 'CDN implementado (si aplica)', critical: false, points: 5 },
        { id: 'f2-21', text: 'Sitio 100% responsive en todos los dispositivos', critical: true, points: 10 },
        { id: 'f2-22', text: 'Mobile-Friendly Test de Google aprobado', critical: true, points: 8 },
        { id: 'f2-23', text: 'Certificado SSL válido y actualizado', critical: true, points: 10 },
        { id: 'f2-24', text: 'Redirecciones HTTP → HTTPS funcionando', critical: true, points: 7 },
        { id: 'f2-25', text: 'Sin contenido mixto (HTTP en HTTPS)', critical: true, points: 6 },
        { id: 'f2-26', text: 'Errores 404 identificados y corregidos', critical: true, points: 8 },
        { id: 'f2-27', text: 'Sin cadenas de redirecciones 301', critical: false, points: 5 },
        { id: 'f2-28', text: 'Página 404 personalizada implementada', critical: false, points: 3 },
      ]
    },
    {
      id: 'fase3',
      title: 'On-Page SEO',
      icon: '📝',
      color: 'green',
      weight: 30,
      items: [
        { id: 'f3-1', text: 'Homepage optimizada con keyword principal', critical: true, points: 8 },
        { id: 'f3-2', text: 'Páginas de servicio/producto optimizadas', critical: true, points: 8 },
        { id: 'f3-3', text: 'Research de keywords completo por página', critical: true, points: 10 },
        { id: 'f3-4', text: 'Intención de búsqueda validada para keywords principales', critical: true, points: 9 },
        { id: 'f3-5', text: 'Title tags únicos (50-60 caracteres)', critical: true, points: 10 },
        { id: 'f3-6', text: 'Title tags incluyen keyword principal', critical: true, points: 8 },
        { id: 'f3-7', text: 'Meta descriptions únicas (150-160 caracteres)', critical: true, points: 8 },
        { id: 'f3-8', text: 'Meta descriptions con CTA persuasivo', critical: false, points: 5 },
        { id: 'f3-9', text: 'Un solo H1 por página', critical: true, points: 7 },
        { id: 'f3-10', text: 'H1 contiene keyword principal', critical: true, points: 7 },
        { id: 'f3-11', text: 'Jerarquía de headers correcta (H1→H2→H3)', critical: true, points: 6 },
        { id: 'f3-12', text: 'Keywords en primeros 100 caracteres del contenido', critical: false, points: 5 },
        { id: 'f3-13', text: 'Todas las imágenes tienen ALT descriptivo', critical: true, points: 8 },
        { id: 'f3-14', text: 'ALT tags incluyen keywords relevantes', critical: false, points: 4 },
        { id: 'f3-15', text: 'Nombres de archivo de imágenes descriptivos', critical: false, points: 3 },
        { id: 'f3-16', text: 'Contenido original y único (no duplicado)', critical: true, points: 10 },
        { id: 'f3-17', text: 'Extensión adecuada (800+ palabras para artículos)', critical: false, points: 6 },
        { id: 'f3-18', text: 'Contenido responde intención de búsqueda', critical: true, points: 9 },
        { id: 'f3-19', text: 'Keywords semánticas distribuidas naturalmente', critical: false, points: 5 },
        { id: 'f3-20', text: 'Sin keyword stuffing', critical: true, points: 6 },
        { id: 'f3-21', text: 'Enlaces internos relevantes (3-5 por página)', critical: false, points: 6 },
        { id: 'f3-22', text: 'Anchor text descriptivo y variado', critical: false, points: 4 },
        { id: 'f3-23', text: 'URLs canónicas configuradas correctamente', critical: true, points: 7 },
        { id: 'f3-24', text: 'Contenido actualizado regularmente', critical: false, points: 5 },
      ]
    },
    {
      id: 'fase4',
      title: 'Off-Page SEO',
      icon: '🌐',
      color: 'orange',
      weight: 15,
      items: [
        { id: 'f4-1', text: 'Backlinks totales auditados', critical: false, points: 5 },
        { id: 'f4-2', text: 'Dominios referentes > 50', critical: false, points: 6 },
        { id: 'f4-3', text: 'Domain Authority > 40', critical: false, points: 5 },
        { id: 'f4-4', text: 'Proporción natural de enlaces dofollow/nofollow', critical: false, points: 4 },
        { id: 'f4-5', text: 'Sin enlaces tóxicos o spam detectados', critical: true, points: 10 },
        { id: 'f4-6', text: 'Enlaces de sitios relevantes a tu nicho', critical: false, points: 7 },
        { id: 'f4-7', text: 'Anchor text variado y natural', critical: true, points: 6 },
        { id: 'f4-8', text: 'Velocidad de adquisición de enlaces natural', critical: false, points: 5 },
        { id: 'f4-9', text: 'Top 3 competidores analizados completamente', critical: false, points: 6 },
        { id: 'f4-10', text: 'Gap de keywords vs competencia identificado', critical: false, points: 7 },
        { id: 'f4-11', text: 'Gap de backlinks vs competencia identificado', critical: false, points: 6 },
        { id: 'f4-12', text: 'Estrategia de link building definida', critical: false, points: 8 },
      ]
    },
    {
      id: 'fase5',
      title: 'Contenido & UX',
      icon: '🎨',
      color: 'pink',
      weight: 10,
      items: [
        { id: 'f5-1', text: 'Diseño limpio y profesional', critical: false, points: 5 },
        { id: 'f5-2', text: 'CTAs claros y visibles', critical: true, points: 7 },
        { id: 'f5-3', text: 'Bounce rate < 60%', critical: false, points: 6 },
        { id: 'f5-4', text: 'Tiempo promedio en página > 2 minutos', critical: false, points: 5 },
        { id: 'f5-5', text: 'Páginas por sesión > 2', critical: false, points: 4 },
        { id: 'f5-6', text: 'Propuesta de valor clara en homepage', critical: true, points: 8 },
        { id: 'f5-7', text: 'Formularios optimizados y simples', critical: false, points: 5 },
        { id: 'f5-8', text: 'Sin pop-ups agresivos', critical: false, points: 4 },
        { id: 'f5-9', text: 'Trust signals visibles (testimonios, logos)', critical: false, points: 5 },
        { id: 'f5-10', text: 'Contenido multimedia integrado (videos, imágenes)', critical: false, points: 4 },
      ]
    },
    {
      id: 'fase6',
      title: 'Local SEO',
      icon: '📍',
      color: 'red',
      weight: 5,
      items: [
        { id: 'f6-1', text: 'Google Business Profile verificado', critical: true, points: 10 },
        { id: 'f6-2', text: 'Información GBP completa (horarios, fotos, etc)', critical: true, points: 8 },
        { id: 'f6-3', text: 'Categorías correctas en GBP', critical: false, points: 5 },
        { id: 'f6-4', text: 'NAP consistente en todo el sitio', critical: true, points: 8 },
        { id: 'f6-5', text: 'NAP en directorios locales (mínimo 5)', critical: false, points: 6 },
        { id: 'f6-6', text: 'Reviews positivas (mínimo 10)', critical: false, points: 6 },
        { id: 'f6-7', text: 'Respuesta a todas las reviews', critical: false, points: 5 },
        { id: 'f6-8', text: 'Schema markup local implementado', critical: false, points: 6 },
        { id: 'f6-9', text: 'Página de ubicación optimizada', critical: false, points: 5 },
      ]
    },
    {
      id: 'fase7',
      title: 'Datos Estructurados',
      icon: '🔧',
      color: 'cyan',
      weight: 5,
      items: [
        { id: 'f7-1', text: 'Schema de Organización implementado', critical: false, points: 6 },
        { id: 'f7-2', text: 'Schema validado con Rich Results Test', critical: false, points: 5 },
        { id: 'f7-3', text: 'Schema de productos (si e-commerce)', critical: false, points: 7 },
        { id: 'f7-4', text: 'Schema de artículos (si blog)', critical: false, points: 6 },
        { id: 'f7-5', text: 'Schema de FAQ (si aplica)', critical: false, points: 5 },
        { id: 'f7-6', text: 'Schema de reviews (si aplica)', critical: false, points: 5 },
        { id: 'f7-7', text: 'Schema de breadcrumbs', critical: false, points: 4 },
      ]
    },
    {
      id: 'fase8',
      title: 'Analytics & Seguimiento',
      icon: '📈',
      color: 'indigo',
      weight: 5,
      items: [
        { id: 'f8-1', text: 'Objetivos/Conversiones configurados', critical: true, points: 10 },
        { id: 'f8-2', text: 'Eventos personalizados trackeados', critical: false, points: 6 },
        { id: 'f8-3', text: 'Filtros aplicados (excluir IPs internas)', critical: false, points: 4 },
        { id: 'f8-4', text: 'KPIs base documentados', critical: true, points: 7 },
        { id: 'f8-5', text: 'Dashboard de métricas configurado', critical: false, points: 5 },
        { id: 'f8-6', text: 'Alertas automáticas configuradas', critical: false, points: 4 },
        { id: 'f8-7', text: 'Reportes mensuales automatizados', critical: false, points: 5 },
      ]
    }
  ];

  // ESTADOS
  const [checkedItems, setCheckedItems] = useState({});
  const [expandedPhases, setExpandedPhases] = useState({});
  const [notes, setNotes] = useState({});
  const [siteInfo, setSiteInfo] = useState({
    url: '',
    industry: '',
    auditDate: new Date().toISOString().split('T')[0],
    auditor: ''
  });
  
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- AUTO-GUARDADO: Cargar datos al iniciar ---
  useEffect(() => {
    const savedData = localStorage.getItem('seoAuditData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.checkedItems) setCheckedItems(parsed.checkedItems);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.siteInfo) setSiteInfo(parsed.siteInfo);
      } catch (e) {
        console.error("Error cargando datos guardados", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // --- AUTO-GUARDADO: Guardar datos cada vez que cambien ---
  useEffect(() => {
    if (isLoaded) {
      const dataToSave = {
        checkedItems,
        notes,
        siteInfo
      };
      localStorage.setItem('seoAuditData', JSON.stringify(dataToSave));
    }
  }, [checkedItems, notes, siteInfo, isLoaded]);

  // --- AUTO-RESIZE: Comunicación con el iframe padre ---
  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ type: 'seo-audit-resize', height }, '*');
    };

    // 1. Enviar altura inicial
    sendHeight();

    // 2. Enviar cada vez que algo visual cambie
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);

    // Limpieza
    return () => observer.disconnect();
  }, [expandedPhases, showScoreBreakdown]); 

  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const updateNote = (itemId, note) => {
    setNotes(prev => ({
      ...prev,
      [itemId]: note
    }));
  };

  const calculateProgress = (phase) => {
    const totalItems = phase.items.length;
    const checkedCount = phase.items.filter(item => checkedItems[item.id]).length;
    return Math.round((checkedCount / totalItems) * 100);
  };

  const calculateScore = () => {
    let totalPossiblePoints = 0;
    let earnedPoints = 0;

    auditData.forEach(phase => {
      phase.items.forEach(item => {
        totalPossiblePoints += item.points;
        if (checkedItems[item.id]) {
          earnedPoints += item.points;
        }
      });
    });

    return Math.round((earnedPoints / totalPossiblePoints) * 100);
  };

  const getScoreLevel = (score) => {
    if (score >= 90) return { level: 'EXCELENTE', color: 'text-green-400', bg: 'bg-green-500', desc: 'Tu sitio está en óptimas condiciones SEO' };
    if (score >= 75) return { level: 'MUY BUENO', color: 'text-blue-400', bg: 'bg-blue-500', desc: 'Buen nivel SEO con oportunidades de mejora' };
    if (score >= 60) return { level: 'BUENO', color: 'text-yellow-400', bg: 'bg-yellow-500', desc: 'Base sólida pero necesita optimización' };
    if (score >= 40) return { level: 'REGULAR', color: 'text-orange-400', bg: 'bg-orange-500', desc: 'Requiere mejoras significativas' };
    return { level: 'CRÍTICO', color: 'text-red-400', bg: 'bg-red-500', desc: 'Necesita intervención urgente' };
  };

  const getCriticalItemsRemaining = () => {
    const criticalItems = auditData.flatMap(phase => 
      phase.items.filter(item => item.critical)
    );
    return criticalItems.filter(item => !checkedItems[item.id]).length;
  };

  const getPriorityRecommendations = () => {
    const uncheckedCritical = auditData.flatMap(phase => 
      phase.items
        .filter(item => item.critical && !checkedItems[item.id])
        .map(item => ({ ...item, phase: phase.title }))
    );
    return uncheckedCritical.sort((a, b) => b.points - a.points).slice(0, 5);
  };

  const resetAudit = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar toda la auditoría? Esto borrará también los datos guardados.')) {
      setCheckedItems({});
      setNotes({});
      setExpandedPhases({});
      localStorage.removeItem('seoAuditData');
    }
  };

  const exportToPDF = () => {
    const score = calculateScore();
    const scoreLevel = getScoreLevel(score);
    const criticalRemaining = getCriticalItemsRemaining();
    const recommendations = getPriorityRecommendations();
    
    // Inicializar PDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // --- ENCABEZADO PRO ---
    doc.setFillColor(30, 41, 59); // Slate 900
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("AUDITORIA SEO PROFESIONAL", 20, 20);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Por Jairo Amaya - Full Stack Marketer", 20, 30);
    
    yPos = 55;

    // --- INFO DEL SITIO ---
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.text(`Sitio Web: ${siteInfo.url || 'No especificado'}`, 20, yPos);
    doc.text(`Industria: ${siteInfo.industry || 'No especificada'}`, 20, yPos + 6);
    doc.text(`Fecha: ${siteInfo.auditDate}`, 120, yPos);
    doc.text(`Auditor: ${siteInfo.auditor || 'Jairo Amaya'}`, 120, yPos + 6);
    
    yPos += 20;

    // --- SCORE CARD ---
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, yPos, pageWidth - 40, 35, 3, 3, 'FD');
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("PUNTUACION GLOBAL", 30, yPos + 12);
    
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    if(score >= 90) doc.setTextColor(34, 197, 94);
    else if(score >= 60) doc.setTextColor(234, 179, 8);
    else doc.setTextColor(239, 68, 68);
    
    doc.text(`${score}/100`, 30, yPos + 24);
    
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(`Nivel: ${scoreLevel.level}`, 100, yPos + 12);
    doc.setFontSize(10);
    doc.text(scoreLevel.desc, 100, yPos + 20);
    doc.text(`Items Criticos Pendientes: ${criticalRemaining}`, 100, yPos + 28);
    
    yPos += 50;

    // --- TOP PRIORIDADES ---
    if (recommendations.length > 0) {
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(252, 165, 165);
      doc.roundedRect(20, yPos, pageWidth - 40, 10 + (recommendations.length * 8), 3, 3, 'FD');
      
      doc.setTextColor(185, 28, 28);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("TOP PRIORIDADES DE ACCION", 30, yPos + 8);
      
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      
      let recY = yPos + 16;
      recommendations.forEach((item, index) => {
        const text = `${index + 1}. [${item.phase}] ${item.text} (${item.points} pts)`;
        doc.text(text, 30, recY);
        recY += 7;
      });
      
      yPos = recY + 15;
    }

    // --- DETALLE POR FASES ---
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("DETALLE DE LA AUDITORIA", 20, yPos);
    yPos += 10;
    
    auditData.forEach(phase => {
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFillColor(241, 245, 249);
        doc.rect(20, yPos, pageWidth - 40, 8, 'F');
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 41, 59);
        doc.text(`${phase.title.toUpperCase()} (Progreso: ${calculateProgress(phase)}%)`, 25, yPos + 6);
        yPos += 12;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        
        phase.items.forEach(item => {
            if (yPos > 275) {
                doc.addPage();
                yPos = 20;
            }
            
            const isChecked = checkedItems[item.id];
            const status = isChecked ? "[ OK ]" : "[   ]";
            const criticalMark = item.critical && !isChecked ? "(CRITICO)" : "";
            
            if (isChecked) doc.setTextColor(22, 163, 74);
            else if (item.critical) doc.setTextColor(220, 38, 38);
            else doc.setTextColor(100, 100, 100);

            doc.text(`${status} ${item.text} ${criticalMark}`, 25, yPos);
            
            if (notes[item.id]) {
                doc.setTextColor(80, 80, 150);
                doc.text(`   -> Nota: ${notes[item.id]}`, 25, yPos + 4);
                yPos += 4;
            }
            yPos += 6;
        });
        yPos += 5;
    });

    // --- RECOMENDACIONES FINALES ---
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    } else {
      yPos += 10;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("RECOMENDACIONES FINALES", 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    const recLines = [
      "1. Enfocate primero en los items CRITICOS pendientes",
      "2. Prioriza las acciones de Analisis Tecnico (25% del peso total)",
      "3. Mejora el On-Page SEO para maximizar resultados (30% del peso)",
      "4. Documenta todas las mejoras para proximas auditorias"
    ];
    
    recLines.forEach(line => {
      doc.text(line, 20, yPos);
      yPos += 7;
    });

    // --- FOOTER COMPLETO ---
    doc.addPage();
    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, pageWidth, 297, 'F'); 
    
    doc.setTextColor(255, 255, 255);
    
    doc.setFontSize(22);
    doc.text("SOBRE ESTE REPORTE", 105, 60, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text("JAIRO AMAYA", 105, 90, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(200, 200, 200);
    doc.text("Full Stack Marketer | Consultor SEO con 20 anos de experiencia", 105, 100, { align: 'center' });
    
    doc.setTextColor(56, 189, 248);
    doc.textWithLink("Web: jairoamaya.co", 105, 120, { 
      align: 'center', 
      url: "https://jairoamaya.co?utm_source=auditor_tool&utm_medium=pdf_report&utm_campaign=seo_audit_final" 
    });
    
    doc.textWithLink("LinkedIn: linkedin.com/in/jairoamayalaverde", 105, 130, { 
      align: 'center', 
      url: "https://www.linkedin.com/in/jairoamayalaverde" 
    });

    doc.setTextColor(255, 255, 255);
    doc.text("Consultoria: Disponible para proyectos personalizados", 105, 140, { align: 'center' });

    doc.setFontSize(14);
    doc.text("Necesitas ayuda profesional con tu estrategia SEO?", 105, 170, { align: 'center' });
    doc.setTextColor(56, 189, 248);
    doc.textWithLink("Contactame en jairoamaya.co", 105, 180, { 
        align: 'center',
        url: "https://jairoamaya.co" 
    });

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Fecha de Generacion: ${new Date().toLocaleDateString('es-ES')}`, 105, 280, { align: 'center' });

    doc.save(`auditoria-seo-${siteInfo.url || 'reporte'}.pdf`);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 border-blue-600',
      purple: 'bg-purple-500 border-purple-600',
      green: 'bg-green-500 border-green-600',
      orange: 'bg-orange-500 border-orange-600',
      pink: 'bg-pink-500 border-pink-600',
      red: 'bg-red-500 border-red-600',
      cyan: 'bg-cyan-500 border-cyan-600',
      indigo: 'bg-indigo-500 border-indigo-600'
    };
    return colors[color] || colors.blue;
  };

  const score = calculateScore();
  const scoreLevel = getScoreLevel(score);
  const criticalRemaining = getCriticalItemsRemaining();
  const recommendations = getPriorityRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-3">
            🔍 Auditor SEO Interactivo
          </h1>
          <p className="text-slate-300 text-lg mb-6">
            By Jairo Amaya | con 100+ puntos de verificación, scoring automático y reportes descargables
          </p>

          {/* NUEVA SECCIÓN: TIPS DE USO (AQUÍ ESTÁ LA MAGIA) */}
          <div className="bg-blue-900/40 border border-blue-500/30 rounded-2xl p-6 mb-8 text-left backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg text-blue-300 hidden md:block">
                <Lightbulb size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold font-heading text-white mb-3 flex items-center gap-2">
                   💡 Guía de Uso Rápido
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-slate-300 text-sm">
                   <div className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                      <p><strong>Marca las casillas</strong> a medida que auditas tu sitio. El progreso se actualiza en tiempo real.</p>
                   </div>
                   <div className="flex items-start gap-3">
                      <Save className="text-purple-400 mt-0.5 flex-shrink-0" size={18} />
                      <p><strong>Auto-Guardado:</strong> No te preocupes por cerrar la página, tu progreso se guarda automáticamente.</p>
                   </div>
                   <div className="flex items-start gap-3">
                      <FileText className="text-blue-400 mt-0.5 flex-shrink-0" size={18} />
                      <p><strong>Notas Técnicas:</strong> Usa los campos de texto en cada item para detallar hallazgos específicos.</p>
                   </div>
                   <div className="flex items-start gap-3">
                      <Info className="text-orange-400 mt-0.5 flex-shrink-0" size={18} />
                      <p><strong>Exportación PRO:</strong> Al terminar, genera un PDF profesional listo para entregar al cliente.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Site Info */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="URL del sitio"
                value={siteInfo.url}
                onChange={(e) => setSiteInfo({...siteInfo, url: e.target.value})}
                className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:border-white/60 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Industria"
                value={siteInfo.industry}
                onChange={(e) => setSiteInfo({...siteInfo, industry: e.target.value})}
                className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:border-white/60 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Tu nombre"
                value={siteInfo.auditor}
                onChange={(e) => setSiteInfo({...siteInfo, auditor: e.target.value})}
                className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:border-white/60 focus:outline-none"
              />
              <input
                type="date"
                value={siteInfo.auditDate}
                onChange={(e) => setSiteInfo({...siteInfo, auditDate: e.target.value})}
                className="px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-white/60 focus:outline-none"
              />
            </div>
          </div>

          {/* Score Dashboard */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* Main Score */}
            <div className="md:col-span-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white text-lg font-bold font-heading mb-1">SEO Score Global</h3>
                  <p className="text-white/80 text-sm">Basado en 100+ puntos de verificación</p>
                </div>
                <Award className="text-white" size={32} />
              </div>
              <div className="flex items-end gap-4 mb-3">
                <div className={`text-7xl font-bold ${scoreLevel.color}`}>{score}</div>
                <div className="text-white text-2xl font-semibold mb-2">/100</div>
              </div>
              <div className="text-white text-xl font-bold mb-2">{scoreLevel.level}</div>
              <div className="text-white/90 text-sm mb-4">{scoreLevel.desc}</div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className={`${scoreLevel.bg} h-full rounded-full transition-all duration-500`}
                  style={{width: `${score}%`}}
                />
              </div>
              
              {/* Botón de desglose MEJORADO */}
              <button
                onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
                className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                {showScoreBreakdown ? (
                    <>
                        <ChevronUp size={16} /> Ocultar desglose gráfico
                    </>
                ) : (
                    <>
                        <ChevronDown size={16} /> Ver desglose gráfico por fases
                    </>
                )}
              </button>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="text-yellow-400" size={24} />
                  <div className="text-white text-sm font-semibold">Items Críticos</div>
                </div>
                <div className="text-3xl font-bold text-yellow-400">{criticalRemaining}</div>
                <div className="text-white/70 text-xs mt-1">pendientes de atención</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-green-400" size={24} />
                  <div className="text-white text-sm font-semibold">Items Completados</div>
                </div>
                <div className="text-3xl font-bold text-green-400">
                  {Object.values(checkedItems).filter(Boolean).length}
                </div>
                <div className="text-white/70 text-xs mt-1">
                  de {auditData.reduce((sum, p) => sum + p.items.length, 0)} totales
                </div>
              </div>
            </div>
          </div>

          {/* Score Breakdown (Ahora visible por defecto) */}
          {showScoreBreakdown && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6 animate-fadeIn">
              <h3 className="text-white text-xl font-bold font-heading mb-4">📊 Desglose de Puntuación por Fase</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {auditData.map(phase => {
                  const phasePoints = phase.items.reduce((sum, item) => 
                    sum + (checkedItems[item.id] ? item.points : 0), 0
                  );
                  const totalPhasePoints = phase.items.reduce((sum, item) => sum + item.points, 0);
                  const phaseScore = Math.round((phasePoints / totalPhasePoints) * 100);
                  
                  return (
                    <div key={phase.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{phase.icon}</span>
                          <span className="text-white font-semibold">{phase.title}</span>
                        </div>
                        <span className="text-white font-bold">{phaseScore}%</span>
                      </div>
                      <div className={`h-2 ${getColorClasses(phase.color)} rounded-full overflow-hidden`}>
                        <div 
                          className="h-full bg-white transition-all duration-300"
                          style={{width: `${phaseScore}%`}}
                        />
                      </div>
                      <div className="text-white/60 text-xs mt-1">
                        {phasePoints} de {totalPhasePoints} puntos • Peso: {phase.weight}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Priority Recommendations */}
          {recommendations.length > 0 && (
            <div className="bg-red-900/30 backdrop-blur-md rounded-2xl p-6 border-2 border-red-500/50 mb-6">
              <h3 className="text-white text-xl font-bold font-heading mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-400" size={24} />
                Top 5 Prioridades de Acción Inmediata
              </h3>
              <div className="space-y-3">
                {recommendations.map((item, index) => (
                  <div key={item.id} className="bg-white/10 rounded-lg p-4 flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold mb-1">{item.text}</div>
                      <div className="text-white/70 text-sm">
                        {item.phase} • {item.points} puntos de impacto
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              <FileText size={20} />
              Exportar PDF Profesional
            </button>
            <button
              onClick={resetAudit}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              <RotateCcw size={20} />
              Reiniciar Auditoría
            </button>
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-4">
          {auditData.map((phase) => {
            const progress = calculateProgress(phase);
            const isExpanded = expandedPhases[phase.id];

            return (
              <div key={phase.id} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
                {/* Phase Header */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{phase.icon}</span>
                    <div className="text-left">
                      <h3 className="text-xl font-bold font-heading text-white">{phase.title}</h3>
                      <p className="text-slate-300 text-sm">{phase.items.length} items • Peso: {phase.weight}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-white font-bold text-2xl">{progress}%</div>
                      <div className={`h-2 w-24 ${getColorClasses(phase.color)} rounded-full overflow-hidden`}>
                        <div 
                          className="h-full bg-white transition-all duration-300"
                          style={{width: `${progress}%`}}
                        />
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="text-white" size={24} /> : <ChevronDown className="text-white" size={24} />}
                  </div>
                </button>

                {/* Phase Items */}
                {isExpanded && (
                  <div className="px-6 pb-6 space-y-3">
                    {phase.items.map((item) => {
                      const isChecked = checkedItems[item.id];
                      
                      return (
                        <div key={item.id} className={`p-4 rounded-lg border-2 transition-all ${
                          isChecked 
                            ? 'bg-green-500/20 border-green-500/50' 
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}>
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleItem(item.id)}
                              className="flex-shrink-0 mt-1"
                            >
                              {isChecked ? (
                                <CheckCircle2 className="text-green-400" size={24} />
                              ) : (
                                <Circle className="text-slate-400 hover:text-white transition-colors" size={24} />
                              )}
                            </button>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className={`text-white ${isChecked ? 'line-through opacity-60' : ''}`}>
                                  {item.text}
                                </span>
                                {item.critical && (
                                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                                    CRÍTICO
                                  </span>
                                )}
                                <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">
                                  {item.points} pts
                                </span>
                              </div>
                              <textarea
                                placeholder="Agregar notas, hallazgos o recomendaciones..."
                                value={notes[item.id] || ''}
                                onChange={(e) => updateNote(item.id, e.target.value)}
                                className="w-full px-3 py-2 bg-white/10 text-white placeholder-white/40 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none text-sm"
                                rows="2"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-400 text-sm space-y-2">
          <p className="mb-2">Herramienta creada por <span className="text-white font-semibold">Jairo Amaya</span></p>
          <p>Full Stack Marketer | Consultor SEO con +20 años de experiencia</p>
          <p className="mt-2">🌐 <a href="https://jairoamaya.co?utm_source=auditor_tool&utm_medium=footer_link" className="text-blue-400 hover:text-blue-300 underline">jairoamaya.co</a></p>
          <p className="text-white/60 text-xs mt-4">
            ¿Necesitas ayuda profesional con tu estrategia SEO? Agenda una consultoría personalizada
          </p>
        </div>
      </div>
    </div>
  );
}
