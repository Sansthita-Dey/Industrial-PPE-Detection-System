/**
 * API Service Layer
 * Industrial AI PPE Compliance Detection System
 *
 * Designed for future Python/FastAPI backend integration.
 * All mock responses follow the agreed API contract.
 *
 * FastAPI endpoint expected:
 *   POST /api/analyze
 *   Content-Type: multipart/form-data
 *   Body: { file: File, department: string }
 *
 * Response schema:
 * {
 *   department: string,
 *   required_ppe: string[],
 *   detected_ppe: string[],
 *   missing_ppe: string[],
 *   compliance_score: number,        // 0-100
 *   status: "ALLOWED" | "NOT_ALLOWED",
 *   frames_analyzed: number,
 *   frames_with_compliance: number,
 *   frames_with_violations: number,
 *   compliance_percentage: number,   // 0-100
 *   frame_images: string[],          // base64 or URLs
 *   recommendations: string[],
 *   timestamp: string,               // ISO 8601
 *   model_version: string,
 * }
 */

// ─── API Base Configuration ────────────────────────────────────────────────
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_TIMEOUT = 120000; // 2 minutes for video analysis

// ─── Department PPE Requirements ──────────────────────────────────────────
export const DEPARTMENTS = {
  blast_furnace: {
    id: 'blast_furnace',
    label: 'Blast Furnace',
    description: 'Iron-making zone with extreme heat and molten metal hazards',
    color: '#f97316',
    required_ppe: ['Helmet', 'Safety Goggles', 'Gloves', 'Safety Vest', 'Safety Boots', 'Face Shield'],
    icon: '🔥',
  },
  steel_melting_shop: {
    id: 'steel_melting_shop',
    label: 'Steel Melting Shop',
    description: 'Electric arc furnace and ladle operations zone',
    color: '#ef4444',
    required_ppe: ['Helmet', 'Safety Goggles', 'Gloves', 'Safety Vest', 'Safety Boots'],
    icon: '⚙️',
  },
  rolling_mill: {
    id: 'rolling_mill',
    label: 'Rolling Mill',
    description: 'Hot rolling and cold rolling of steel products',
    color: '#0ea5e9',
    required_ppe: ['Helmet', 'Safety Goggles', 'Gloves', 'Safety Vest', 'Safety Boots'],
    icon: '🏭',
  },
  coke_oven_plant: {
    id: 'coke_oven_plant',
    label: 'Coke Oven Plant',
    description: 'Coal carbonization and coke production facility',
    color: '#8b5cf6',
    required_ppe: ['Helmet', 'Safety Goggles', 'Gloves', 'Safety Vest', 'Safety Boots'],
    icon: '🧪',
  },
  power_plant: {
    id: 'power_plant',
    label: 'Power Plant',
    description: 'Captive power generation and electrical distribution',
    color: '#10b981',
    required_ppe: ['Helmet', 'Gloves', 'Safety Boots', 'Safety Vest'],
    icon: '⚡',
  },
  raw_material_handling: {
    id: 'raw_material_handling',
    label: 'Raw Material Handling Plant',
    description: 'Iron ore, coal, and limestone storage and transport',
    color: '#f59e0b',
    required_ppe: ['Helmet', 'Safety Vest', 'Safety Boots', 'Gloves'],
    icon: '🚧',
  },
};

// ─── AI Model Dataset Coverage ────────────────────────────────────────────
export const MODEL_COVERAGE = {
  detectable: [
    { id: 'helmet', label: 'Helmet', icon: '⛑️' },
    { id: 'vest', label: 'Safety Vest', icon: '🦺' },
    { id: 'gloves', label: 'Gloves', icon: '🧤' },
    { id: 'goggles', label: 'Safety Goggles', icon: '🥽' },
    { id: 'boots', label: 'Safety Boots', icon: '👢' },
  ],
  not_detectable: [
    { id: 'ear_protection', label: 'Ear Protection', icon: '🎧' },
    { id: 'respirator', label: 'Respirator / Mask', icon: '😷' },
    { id: 'face_shield', label: 'Face Shield', icon: '🛡️' },
    { id: 'safety_suit', label: 'Full Safety Suit', icon: '🥋' },
    { id: 'harness', label: 'Safety Harness', icon: '🔗' },
  ],
};

// ─── PPE Icon Map ─────────────────────────────────────────────────────────
export const PPE_ICON_MAP = {
  'Helmet': '⛑️',
  'Safety Goggles': '🥽',
  'Gloves': '🧤',
  'Safety Vest': '🦺',
  'Safety Boots': '👢',
  'Face Shield': '🛡️',
  'Ear Protection': '🎧',
  'Respirator': '😷',
  'Full Safety Suit': '🥋',
  'Safety Harness': '🔗',
};

// ─── Mock Frame Generator ─────────────────────────────────────────────────
const generateMockFrames = (count = 8) => {
  // Generate colored placeholder frames (as data URLs for offline demo)
  const colors = ['#0e1f38', '#0a1628', '#122440', '#162b47', '#0e1f38', '#0f172a', '#0a1628', '#122440'];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    url: null, // Will be replaced by actual frame images from backend
    label: `Frame ${(i + 1).toString().padStart(3, '0')}`,
    compliant: Math.random() > 0.3,
    color: colors[i % colors.length],
  }));
};

// ─── Recommendation Engine ────────────────────────────────────────────────
const generateRecommendations = (department, missing_ppe) => {
  const dept = DEPARTMENTS[department];
  const recommendations = [];

  if (missing_ppe.includes('Helmet')) {
    recommendations.push('Wear a hard hat/safety helmet before entering the work zone. Head protection is mandatory at all times.');
  }
  if (missing_ppe.includes('Safety Goggles')) {
    recommendations.push('Safety goggles must be worn to protect eyes from sparks, metal shavings, and hazardous materials.');
  }
  if (missing_ppe.includes('Gloves')) {
    recommendations.push('Protective gloves are required to prevent burns, cuts, and chemical exposure in this area.');
  }
  if (missing_ppe.includes('Safety Vest')) {
    recommendations.push('High-visibility safety vest must be worn for personnel identification and accident prevention.');
  }
  if (missing_ppe.includes('Safety Boots')) {
    recommendations.push('Steel-toed safety boots are mandatory to protect feet from falling objects and hot surfaces.');
  }
  if (missing_ppe.includes('Face Shield')) {
    recommendations.push('Full face shield is required in this zone to protect against molten metal splatter and radiant heat.');
  }

  recommendations.push(`Ensure all required PPE for ${dept?.label || 'this department'} is properly worn before commencing operations.`);
  recommendations.push('Report any damaged or missing PPE to the Safety Officer immediately.');
  recommendations.push('Zero Harm is non-negotiable. No work begins without full PPE compliance.');

  return recommendations.slice(0, 5);
};

// ─── Mock Analysis Response Builder ──────────────────────────────────────
const buildMockResponse = (department, fileType) => {
  const dept = DEPARTMENTS[department];
  const required = dept?.required_ppe || ['Helmet', 'Safety Vest', 'Safety Boots'];

  // Simulate partial detection (70-95% scenarios)
  const detectionRate = 0.6 + Math.random() * 0.35;
  const shuffled = [...required].sort(() => Math.random() - 0.5);
  const detectedCount = Math.max(1, Math.ceil(shuffled.length * detectionRate));
  const detected_ppe = shuffled.slice(0, detectedCount);
  const missing_ppe = shuffled.slice(detectedCount);

  const compliance_score = Math.round((detected_ppe.length / required.length) * 100);
  const status = compliance_score >= 80 ? 'ALLOWED' : 'NOT_ALLOWED';
  const frames = fileType === 'video' ? Math.floor(Math.random() * 180) + 50 : 1;
  const frames_with_compliance = Math.round(frames * (compliance_score / 100));
  const frames_with_violations = frames - frames_with_compliance;

  return {
    department,
    department_label: dept?.label || department,
    required_ppe: required,
    detected_ppe,
    missing_ppe,
    compliance_score,
    compliance_percentage: compliance_score,
    status,
    frames_analyzed: frames,
    frames_with_compliance,
    frames_with_violations,
    frame_images: generateMockFrames(fileType === 'video' ? 12 : 1),
    recommendations: generateRecommendations(department, missing_ppe),
    timestamp: new Date().toISOString(),
    model_version: 'YOLOv8-PPE-v2.1.0',
    processing_time_seconds: fileType === 'video' ? (2 + Math.random() * 3).toFixed(2) : (0.3 + Math.random() * 0.5).toFixed(2),
  };
};

// ─── Simulate Network Delay ───────────────────────────────────────────────
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── API Functions ────────────────────────────────────────────────────────

/**
 * Analyze uploaded file for PPE compliance.
 *
 * Future FastAPI integration:
 *   const formData = new FormData();
 *   formData.append('file', file);
 *   formData.append('department', department);
 *   const response = await fetch(`${API_BASE_URL}/api/analyze`, {
 *     method: 'POST',
 *     body: formData,
 *     signal: AbortSignal.timeout(API_TIMEOUT),
 *   });
 *   return response.json();
 */
export const analyzeCompliance = async (file, department) => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("department", department);

    const response = await fetch(
      "http://127.0.0.1:8000/analyze-image",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Backend request failed");
    }

    const data = await response.json();

const formattedData = {
  department: data.department,

  required_ppe: data.required || [],
  detected_ppe: data.detected || [],
  missing_ppe: data.missing || [],

  compliance_score: data.compliance || 0,
  compliance_percentage: data.compliance || 0,

  status: data.allowed ? "ALLOWED" : "NOT_ALLOWED",

  timestamp: new Date().toISOString(),

  frames_analyzed: 0,
  frames_with_compliance: 0,
  frames_with_violations: 0,
  frame_images: [],
};

return {
  success: true,
  data: formattedData,
};

  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Health check endpoint.
 * FastAPI: GET /api/health
 */
export const checkHealth = async () => {
  try {
    await delay(200);
    return { status: 'healthy', model_loaded: true, version: '2.1.0' };
  } catch {
    return { status: 'offline', model_loaded: false };
  }
};

/**
 * Get available departments from backend.
 * FastAPI: GET /api/departments
 */
export const getDepartments = async () => {
  await delay(100);
  return Object.values(DEPARTMENTS);
};

export default {
  analyzeCompliance,
  checkHealth,
  getDepartments,
  DEPARTMENTS,
  MODEL_COVERAGE,
  PPE_ICON_MAP,
};
