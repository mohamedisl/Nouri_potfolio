import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  X, 
  Download, 
  Printer, 
  Check, 
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileDown,
  ExternalLink
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PROFILE_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function oklchToRgb(oklchStr: string): string {
  try {
    const cleaned = oklchStr.trim();
    const match = cleaned.match(/oklch\(\s*([^\s,/]+)[\s,]+([^\s,/]+)[\s,]+([^\s,/)]+)(?:[\s,/]+([^\s,/)]+))?\s*\)/i);
    if (!match) return 'rgb(0, 0, 0)';

    let lStr = match[1];
    let cStr = match[2];
    let hStr = match[3];
    let aStr = match[4];

    if (lStr === 'none') lStr = '0';
    if (cStr === 'none') cStr = '0';
    if (hStr === 'none') hStr = '0';

    let l = parseFloat(lStr);
    if (lStr.endsWith('%')) l /= 100;

    let c = parseFloat(cStr);
    let h = parseFloat(hStr);

    let a = 1;
    if (aStr && aStr !== 'none') {
      a = parseFloat(aStr);
      if (aStr.endsWith('%')) a /= 100;
    }

    if (isNaN(l)) l = 0;
    if (isNaN(c)) c = 0;
    if (isNaN(h)) h = 0;

    // Convert OKLCH to OKLAB
    const hRad = (h * Math.PI) / 180;
    const aLab = c * Math.cos(hRad);
    const bLab = c * Math.sin(hRad);

    // Convert OKLAB to linear RGB
    const l_ = l + 0.3963377774 * aLab + 0.2158037573 * bLab;
    const m_ = l - 0.1055613458 * aLab - 0.0638541728 * bLab;
    const s_ = l - 0.0894841775 * aLab - 1.2914855480 * bLab;

    const l3 = l_ * l_ * l_;
    const m3 = m_ * m_ * m_;
    const s3 = s_ * s_ * s_;

    let rLinear = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
    let gLinear = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
    let bLinear = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

    const toSRGB = (val: number) => {
      const clamped = Math.max(0, Math.min(1, val));
      return clamped <= 0.0031308
        ? Math.round(clamped * 12.92 * 255)
        : Math.round((1.055 * Math.pow(clamped, 1 / 2.4) - 0.055) * 255);
    };

    const r = toSRGB(rLinear);
    const g = toSRGB(gLinear);
    const b = toSRGB(bLinear);

    if (a < 1) {
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return 'rgb(0, 0, 0)';
  }
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [zoom, setZoom] = useState(100);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!page1Ref.current || !page2Ref.current || downloading) return;
    setDownloading(true);

    const origStyle1 = page1Ref.current.style.width;
    const origStyle2 = page2Ref.current.style.width;

    try {
      // Force A4 width for rendering high-res capture
      page1Ref.current.style.width = '794px';
      page2Ref.current.style.width = '794px';

      // Initialize A4 PDF (210mm x 297mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const processClonedDoc = (clonedDoc: Document) => {
        // Replace oklch in <style> elements
        const styleEls = clonedDoc.querySelectorAll('style');
        styleEls.forEach((style) => {
          if (style.textContent && style.textContent.includes('oklch')) {
            style.textContent = style.textContent.replace(/oklch\([^)]+\)/gi, (m) => oklchToRgb(m));
          }
        });

        // Replace oklch in inline styles and computed styles
        const allElements = clonedDoc.querySelectorAll<HTMLElement>('*');
        allElements.forEach((el) => {
          const styleAttr = el.getAttribute('style');
          if (styleAttr && styleAttr.includes('oklch')) {
            el.setAttribute('style', styleAttr.replace(/oklch\([^)]+\)/gi, (m) => oklchToRgb(m)));
          }
          try {
            const comp = clonedDoc.defaultView?.getComputedStyle(el);
            if (comp) {
              if (comp.color && comp.color.includes('oklch')) {
                el.style.color = oklchToRgb(comp.color);
              }
              if (comp.backgroundColor && comp.backgroundColor.includes('oklch')) {
                el.style.backgroundColor = oklchToRgb(comp.backgroundColor);
              }
              if (comp.borderColor && comp.borderColor.includes('oklch')) {
                el.style.borderColor = oklchToRgb(comp.borderColor);
              }
            }
          } catch {
            // ignore
          }
        });
      };

      // Render Page 1
      const canvas1 = await html2canvas(page1Ref.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          processClonedDoc(clonedDoc);
        },
      });
      const imgData1 = canvas1.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData1, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      // Add Page 2
      pdf.addPage();
      const canvas2 = await html2canvas(page2Ref.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          processClonedDoc(clonedDoc);
        },
      });
      const imgData2 = canvas2.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData2, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      // Download file
      pdf.save('NOURI_Mohammed_Islam_CV.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      if (page1Ref.current) page1Ref.current.style.width = origStyle1;
      if (page2Ref.current) page2Ref.current.style.width = origStyle2;
      setDownloading(false);
    }
  };

  const zoomIn = () => setZoom((z) => Math.min(z + 15, 150));
  const zoomOut = () => setZoom((z) => Math.max(z - 15, 65));
  const zoomReset = () => setZoom(100);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-[2px] modal-overlay-bg transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-[92vh] sm:h-[90vh] rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* PDF Viewer Top Toolbar */}
        <div className="px-3 sm:px-6 py-3 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight font-mono flex items-center gap-1.5 truncate">
                <span className="truncate">NOURI_Mohammed_Islam_CV.pdf</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 uppercase shrink-0">
                  PDF • 2 Pages
                </span>
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-mono truncate">
                Computer Engineer – IT Systems &amp; AI
              </p>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1">
            <button
              onClick={zoomOut}
              className="p-1 hover:text-white text-zinc-400 rounded transition-colors"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-zinc-300 px-2 min-w-[48px] text-center">
              {zoom}%
            </span>
            <button
              onClick={zoomIn}
              className="p-1 hover:text-white text-zinc-400 rounded transition-colors"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={zoomReset}
              className="p-1 hover:text-white text-zinc-400 rounded transition-colors ml-1 border-l border-zinc-800 pl-1.5"
              title="Reset Zoom"
              aria-label="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Print & Download Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-semibold border border-zinc-700 transition-colors"
              title="Print CV"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              <span>Print</span>
            </button>

            <a
              href={PROFILE_DATA.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-colors border border-blue-500/50 shadow-lg shadow-blue-600/20"
              title="Download / View CV in Google Drive"
            >
              <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden text-[11px]">Download</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/50 transition-all cursor-pointer shadow-sm ml-1"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable PDF Document Canvas Area */}
        <div className="flex-1 overflow-auto p-2 sm:p-6 md:p-10 pdf-canvas-bg custom-modal-scrollbar">
          <div className="min-w-full w-max mx-auto flex flex-col items-center gap-5 sm:gap-8 py-2">
          
          {/* =========================================================
              PAGE 1 (LaTeX Academic CV Layout - Exactly matching uploaded PDF)
          ========================================================= */}
          <div
            ref={page1Ref}
            style={{
              width: zoom !== 100 ? `${(794 * zoom) / 100}px` : undefined,
              minHeight: `${(1123 * zoom) / 100}px`,
            }}
            className="w-full max-w-[794px] bg-white text-black p-5 sm:p-10 md:p-14 shadow-2xl rounded-sm font-serif transition-all duration-200 flex flex-col justify-between select-text mx-auto"
          >
            <div>
              {/* Header */}
              <div className="text-center border-b-[1.5px] border-zinc-300 pb-4 mb-5">
                <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide font-serif mb-1.5 text-zinc-900">
                  NOURI Mohammed Islam
                </h1>
                <p className="text-xs sm:text-sm text-zinc-700 font-sans">
                  Algeria | +213 794 927 757 | mohanouri68@gmail.com
                </p>
                <p className="text-sm font-semibold italic text-zinc-800 font-serif mt-1">
                  Computer Engineer – IT Systems, Networks &amp; AI
                </p>
                <p className="text-xs text-zinc-600 font-sans mt-0.5">
                  <span className="font-semibold">Areas of Interest:</span> Computer Vision, AI, IT Infrastructure, Network Administration
                </p>
              </div>

              {/* Professional Profile */}
              <div className="mb-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-b border-zinc-400 pb-1 mb-2 font-serif">
                  Professional Profile
                </h2>
                <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-800 font-serif text-justify">
                  Computer Engineer with a strong focus on Artificial Intelligence and Computer Vision. Proven experience in developing AI-based systems applied to healthcare, including facial emotion recognition and medical image analysis. Skilled in deep learning frameworks, CNN architectures, and Explainable Artificial Intelligence (XAI). Complementary hands on experience in IT infrastructure, networking, and industrial systems, gained through internships in telecommunications, Cisco network administration, and industrial automation environments.
                </p>
              </div>

              {/* Education */}
              <div className="mb-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-b border-zinc-400 pb-1 mb-2 font-serif">
                  Education
                </h2>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-xs sm:text-[13px] font-bold text-zinc-900 font-serif">
                    Engineering Degree in Computer Engineering
                  </span>
                  <span className="text-xs font-serif text-zinc-700 font-semibold">
                    2021 – 2026
                  </span>
                </div>
                <p className="text-xs italic text-zinc-700 font-serif mb-1.5">
                  National Higher School of Renewable Energies, Environment and Sustainable Development
                </p>
                <ul className="list-disc list-inside text-xs sm:text-[12.5px] text-zinc-800 space-y-0.5 font-serif pl-2">
                  <li><strong className="font-semibold">Specialization:</strong> Artificial Intelligence, Industrial Networks, and Intelligent Systems.</li>
                  <li><strong className="font-semibold">Main Courses:</strong> Network Architecture, Machine Learning, Deep Learning, Computer Vision.</li>
                </ul>
              </div>

              {/* Professional Experience */}
              <div className="mb-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-b border-zinc-400 pb-1 mb-3 font-serif">
                  Professional Experience
                </h2>

                {/* GTIM */}
                <div className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs sm:text-[13px] font-bold text-zinc-900 font-serif">
                      Groupement Timimoun (GTIM)
                    </span>
                    <span className="text-xs font-serif text-zinc-700 font-semibold">
                      January 2025
                    </span>
                  </div>
                  <p className="text-xs italic text-zinc-700 font-serif mb-1">
                    IT Intern
                  </p>
                  <ul className="list-disc list-inside text-xs sm:text-[12.5px] text-zinc-800 space-y-0.5 font-serif pl-2">
                    <li>Configured and maintained Cisco network switches in a critical gas production environment.</li>
                    <li>Worked with Triconex SIL-3 safety systems, gaining exposure to high-availability IT infrastructure.</li>
                  </ul>
                </div>

                {/* Algérie Télécom */}
                <div className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs sm:text-[13px] font-bold text-zinc-900 font-serif">
                      Algérie Télécom
                    </span>
                    <span className="text-xs font-serif text-zinc-700 font-semibold">
                      July 2024
                    </span>
                  </div>
                  <p className="text-xs italic text-zinc-700 font-serif mb-1">
                    Network Intern
                  </p>
                  <ul className="list-disc list-inside text-xs sm:text-[12.5px] text-zinc-800 space-y-0.5 font-serif pl-2">
                    <li>Participated in fiber optic deployment and real-world network troubleshooting for national telecommunications infrastructure.</li>
                  </ul>
                </div>

                {/* SIEMENS */}
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs sm:text-[13px] font-bold text-zinc-900 font-serif">
                      SIEMENS
                    </span>
                    <span className="text-xs font-serif text-zinc-700 font-semibold">
                      March 2023
                    </span>
                  </div>
                  <p className="text-xs italic text-zinc-700 font-serif mb-1">
                    Industrial Automation Intern
                  </p>
                  <ul className="list-disc list-inside text-xs sm:text-[12.5px] text-zinc-800 space-y-0.5 font-serif pl-2">
                    <li>Developed and tested PLC programs for industrial automation using TIA Portal.</li>
                    <li>Gained practical experience in embedded systems and hardware-software integration.</li>
                  </ul>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-b border-zinc-400 pb-1 mb-2 font-serif">
                  Technical Skills
                </h2>
                <ul className="list-disc list-inside text-xs sm:text-[12.5px] text-zinc-800 space-y-1 font-serif pl-2">
                  <li><strong className="font-bold text-zinc-900">AI &amp; Computer Vision:</strong> PyTorch, TensorFlow, OpenCV, YOLO, CNN, Deep Learning, XAI.</li>
                  <li><strong className="font-bold text-zinc-900">Generative AI:</strong> Foundational knowledge, prompt engineering, LLM usage.</li>
                  <li><strong className="font-bold text-zinc-900">Networking &amp; Systems:</strong> Cisco configuration, data center infrastructure, network troubleshooting, PLC programming.</li>
                  <li><strong className="font-bold text-zinc-900">Programming:</strong> Python (Advanced), C, Java, JavaScript.</li>
                  <li><strong className="font-bold text-zinc-900">Web Development &amp; Data:</strong> MERN Stack (MongoDB, Express, React, Node.js), Pandas, NumPy, Tableau, Power BI.</li>
                  <li><strong className="font-bold text-zinc-900">Tools &amp; Design:</strong> Figma (UI/UX), Adobe Illustrator, Adobe Photoshop, Git.</li>
                </ul>
              </div>
            </div>

            {/* Footer Page Number */}
            <div className="text-center text-[11px] text-zinc-500 font-sans pt-4 border-t border-zinc-200">
              Page 1 of 2
            </div>
          </div>

          {/* =========================================================
              PAGE 2 (LaTeX Academic CV Layout - Technical Projects & Leadership)
          ========================================================= */}
          <div
            ref={page2Ref}
            style={{
              width: zoom !== 100 ? `${(794 * zoom) / 100}px` : undefined,
              minHeight: `${(1123 * zoom) / 100}px`,
            }}
            className="w-full max-w-[794px] bg-white text-black p-5 sm:p-10 md:p-14 shadow-2xl rounded-sm font-serif transition-all duration-200 flex flex-col justify-between select-text mx-auto"
          >
            <div>
              {/* Header Reference Line */}
              <div className="flex justify-between items-center text-[11px] text-zinc-500 font-sans pb-3 mb-6 border-b border-zinc-200">
                <span>NOURI Mohammed Islam – Curriculum Vitae</span>
                <span>Page 2</span>
              </div>

              {/* Technical Projects */}
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-b border-zinc-400 pb-1 mb-3 font-serif">
                  Technical Projects
                </h2>

                {/* Retinopathy */}
                <div className="mb-4">
                  <h3 className="text-xs sm:text-[13px] font-bold text-zinc-900 font-serif mb-1">
                    AI System for Early Detection of Diabetic Retinopathy
                  </h3>
                  <ul className="list-disc list-inside text-xs sm:text-[12.5px] text-zinc-800 space-y-1 font-serif pl-2">
                    <li>Designed a deep learning pipeline for retinal lesion detection and classification with Explainable AI (XAI) for clinical transparency.</li>
                    <li>Annotated medical data using MakeSense to ensure high-quality ground truth.</li>
                  </ul>
                </div>

                {/* Emotion Detection */}
                <div className="mb-4">
                  <h3 className="text-xs sm:text-[13px] font-bold text-zinc-900 font-serif mb-1">
                    Emotion Detection System
                  </h3>
                  <ul className="list-disc list-inside text-xs sm:text-[12.5px] text-zinc-800 space-y-1 font-serif pl-2">
                    <li>Built a CNN-based emotion recognition system trained on FER-2013 using TensorFlow/Keras.</li>
                  </ul>
                </div>

                {/* Volontech */}
                <div className="mb-4">
                  <h3 className="text-xs sm:text-[13px] font-bold text-zinc-900 font-serif mb-1">
                    Volontech – Intelligent Volunteering Platform
                  </h3>
                  <ul className="list-disc list-inside text-xs sm:text-[12.5px] text-zinc-800 space-y-1 font-serif pl-2">
                    <li>Implemented an AI recommendation engine matching volunteers to NGOs based on skills and location.</li>
                  </ul>
                </div>

                {/* Diabetes Prediction */}
                <div className="mb-4">
                  <h3 className="text-xs sm:text-[13px] font-bold text-zinc-900 font-serif mb-1">
                    Diabetes Prediction System
                  </h3>
                  <ul className="list-disc list-inside text-xs sm:text-[12.5px] text-zinc-800 space-y-1 font-serif pl-2">
                    <li>Applied ML models to predict patient risk profiles for preventive healthcare decision support.</li>
                  </ul>
                </div>
              </div>

              {/* Leadership & Languages */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-b border-zinc-400 pb-1 mb-3 font-serif">
                  Leadership &amp; Languages
                </h2>
                <ul className="list-disc list-inside text-xs sm:text-[12.5px] text-zinc-800 space-y-1.5 font-serif pl-2">
                  <li><strong className="font-bold text-zinc-900">Selected Member:</strong> DZ Young Leaders Program (1000 Leaders) — among Algeria’s 1000 most promising talents.</li>
                  <li><strong className="font-bold text-zinc-900">Vice President:</strong> AIELEC Club (2023–2025).</li>
                  <li><strong className="font-bold text-zinc-900">Relations Manager:</strong> SEC Club at ESI Algiers (2025–2026).</li>
                  <li><strong className="font-bold text-zinc-900">Event Manager:</strong> AgroX Hackathon (2025), DocAI Hackathon (2024).</li>
                  <li><strong className="font-bold text-zinc-900">Organizer:</strong> ICSC 2024 International Conference, Hackathon “3.6” (2022).</li>
                  <li><strong className="font-bold text-zinc-900">Languages:</strong> Arabic (Native), English (Professional), French (Professional).</li>
                </ul>
              </div>
            </div>

            {/* Footer Page Number */}
            <div className="text-center text-[11px] text-zinc-500 font-sans pt-4 border-t border-zinc-200">
              Page 2 of 2
            </div>
          </div>

          </div>
        </div>

      </div>
    </div>
  );
};

