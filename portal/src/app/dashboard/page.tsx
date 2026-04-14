'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  Search, Plus, FileText, Download, Calendar, UserPlus, Activity,
  History, LogOut, Bell, ChevronRight, Clock, CheckCircle2, XCircle,
  AlertCircle, Users, Stethoscope, ClipboardList, Settings, Home,
  Phone, Mail, BarChart2, Shield, Pill, Upload, Eye, Edit3, Trash2,
  X, Save, Filter, RefreshCw, TrendingUp, User as UserIcon
} from 'lucide-react';

// ─── DATA MOCK ────────────────────────────────────────────────
const MOCK_PATIENTS = [
  { id: '1020304050', name: 'Laura Camila Ortiz', age: 32, service: 'Psiquiatría', status: 'Activo', lastVisit: '10 Abr, 2026', nextVisit: '24 Abr, 2026', doctor: 'Dr. Ricardo Pardo', phone: '311-234-5678', email: 'laura@email.com', eps: 'Sura', dx: 'Trastorno depresivo mayor', alerts: 2 },
  { id: '1093847261', name: 'Juan Carlos Restrepo', age: 45, service: 'SPA', status: 'Hospitalizado', lastVisit: '05 Abr, 2026', nextVisit: '—', doctor: 'Dra. Claudia Rivas', phone: '314-987-6543', email: 'jc@email.com', eps: 'Compensar', dx: 'Trastorno por uso de alcohol', alerts: 0 },
  { id: '1098765432', name: 'Ana María Torres', age: 28, service: 'Psicología', status: 'Activo', lastVisit: '12 Abr, 2026', nextVisit: '26 Abr, 2026', doctor: 'Dr. Ricardo Pardo', phone: '315-111-2222', email: 'ana@email.com', eps: 'Nueva EPS', dx: 'Ansiedad generalizada', alerts: 0 },
  { id: '1012345678', name: 'Pedro Luis Gómez', age: 58, service: 'Psiquiatría', status: 'Alta', lastVisit: '01 Mar, 2026', nextVisit: '—', doctor: 'Dr. Ricardo Pardo', phone: '317-555-4321', email: 'pedro@email.com', eps: 'Sanitas', dx: 'Esquizofrenia paranoide', alerts: 1 },
];

const MOCK_CITAS = [
  { id: 1, patient: 'Laura Camila Ortiz', patientId: '1020304050', doctor: 'Dr. Ricardo Pardo', date: '15 Abr, 2026', time: '9:00 AM', type: 'Psiquiatría', status: 'Confirmada', notes: 'Control mensual' },
  { id: 2, patient: 'Juan C. Restrepo', patientId: '1093847261', doctor: 'Dr. Ricardo Pardo', date: '15 Abr, 2026', time: '11:00 AM', type: 'Control', status: 'Confirmada', notes: 'Seguimiento SPA semana 3' },
  { id: 3, patient: 'Ana María Torres', patientId: '1098765432', doctor: 'Dra. Claudia Rivas', date: '16 Abr, 2026', time: '2:00 PM', type: 'Psicología', status: 'Pendiente', notes: 'Primera consulta' },
  { id: 4, patient: 'Pedro Luis Gómez', patientId: '1012345678', doctor: 'Dr. Ricardo Pardo', date: '17 Abr, 2026', time: '10:00 AM', type: 'Psiquiatría', status: 'Confirmada', notes: 'Control post-alta' },
  { id: 5, patient: 'María F. Salazar', patientId: '1045678900', doctor: 'Dra. Claudia Rivas', date: '18 Abr, 2026', time: '3:30 PM', type: 'Psicología', status: 'Cancelada', notes: '' },
];

const MOCK_USERS = [
  { id: 1, name: 'Dr. Ricardo Pardo', email: 'medico@samenips.com', role: 'Médico', status: 'Activo', specialty: 'Psiquiatría', joined: 'Ene 2022' },
  { id: 2, name: 'Admin Sistema', email: 'admin@samenips.com', role: 'Admin', status: 'Activo', specialty: '—', joined: 'Ene 2021' },
  { id: 3, name: 'Dra. Claudia Rivas', email: 'crivas@samenips.com', role: 'Médico', status: 'Activo', specialty: 'Psicología', joined: 'Mar 2022' },
  { id: 4, name: 'Enf. Sofía Mora', email: 'smora@samenips.com', role: 'Enfermería', status: 'Activo', specialty: 'Enfermería', joined: 'Jun 2023' },
];

const MOCK_DOCS = [
  { id: 1, name: 'Resultados Hemograma', type: 'Paraclínico', date: '10 Abr, 2026', status: 'Nuevo', size: '2.3 MB' },
  { id: 2, name: 'Fórmula Médica — Abril 2026', type: 'Receta', date: '08 Abr, 2026', status: 'Leído', size: '0.8 MB' },
  { id: 3, name: 'Nota de Evolución — Sesión 4', type: 'Historia Clínica', date: '05 Abr, 2026', status: 'Leído', size: '1.1 MB' },
];

// ─── STATUS BADGE ──────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Activo':       { bg: '#E8F5E9', color: '#2E7D32' },
    'Hospitalizado':{ bg: '#E3F2FD', color: '#1565C0' },
    'Alta':         { bg: '#F3E5F5', color: '#7B1FA2' },
    'Confirmada':   { bg: '#E8F5E9', color: '#2E7D32' },
    'Pendiente':    { bg: '#FFF8E1', color: '#F57F17' },
    'Cancelada':    { bg: '#FFEBEE', color: '#C62828' },
    'Nuevo':        { bg: '#FFF3E0', color: '#E65100' },
    'Leído':        { bg: '#F5F5F5', color: '#757575' },
    'Admin':        { bg: '#EDE7F6', color: '#4527A0' },
    'Médico':       { bg: '#E8F5E9', color: '#1B5E20' },
    'Enfermería':   { bg: '#E3F2FD', color: '#0D47A1' },
  };
  const s = map[status] || { bg: '#F5F5F5', color: '#555' };
  return (
    <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
      {status}
    </span>
  );
}

// ─── MODAL ────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: 'var(--surface)', borderRadius: '16px', width: '100%', maxWidth: '560px', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.2)', animation: 'fadeIn 0.2s ease' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '18px', fontWeight: 800, color: 'var(--dark)' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'var(--bg-alt)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button>
        </div>
        <div style={{ padding: '28px' }}>{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontFamily: 'var(--ff-display)', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: '100%', padding: '11px 14px', border: '1.5px solid var(--border)', borderRadius: '8px', fontFamily: 'var(--ff-body)', fontSize: '14px', color: 'var(--text)', background: 'var(--bg)', outline: 'none' };

// ─── SIDEBAR ──────────────────────────────────────────────────
function Sidebar({ role, active, onNav }: { role: string; active: string; onNav: (s: string) => void }) {
  const adminItems = [
    { id: 'home', icon: <Home size={18} />, label: 'Panel General' },
    { id: 'users', icon: <Users size={18} />, label: 'Usuarios' },
    { id: 'citas', icon: <Calendar size={18} />, label: 'Citas' },
    { id: 'patients', icon: <UserIcon size={18} />, label: 'Pacientes' },
    { id: 'reports', icon: <BarChart2 size={18} />, label: 'Reportes' },
    { id: 'settings', icon: <Settings size={18} />, label: 'Configuración' },
  ];
  const doctorItems = [
    { id: 'home', icon: <Home size={18} />, label: 'Mi Panel' },
    { id: 'patients', icon: <UserIcon size={18} />, label: 'Mis Pacientes' },
    { id: 'citas', icon: <Calendar size={18} />, label: 'Mis Citas' },
    { id: 'evoluciones', icon: <ClipboardList size={18} />, label: 'Evoluciones' },
    { id: 'documents', icon: <FileText size={18} />, label: 'Documentos' },
  ];
  const patientItems = [
    { id: 'home', icon: <Home size={18} />, label: 'Mi Perfil' },
    { id: 'citas', icon: <Calendar size={18} />, label: 'Mis Citas' },
    { id: 'documents', icon: <FileText size={18} />, label: 'Mis Documentos' },
    { id: 'prescriptions', icon: <Pill size={18} />, label: 'Recetas' },
    { id: 'results', icon: <Activity size={18} />, label: 'Exámenes' },
  ];

  const items = role === 'admin' ? adminItems : role === 'medico' ? doctorItems : patientItems;

  return (
    <aside style={{ width: '240px', minHeight: '100vh', background: 'var(--dark)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={16} color="var(--dark)" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, color: 'white', fontSize: '15px', letterSpacing: '-0.01em' }}>SAMEN IPS</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Portal Clínico</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        <div style={{ fontSize: '10px', fontFamily: 'var(--ff-display)', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>
          {role === 'admin' ? 'Administración' : role === 'medico' ? 'Área Clínica' : 'Mi Área'}
        </div>
        {items.map(item => (
          <button key={item.id} onClick={() => onNav(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px', borderRadius: '8px', background: active === item.id ? 'rgba(255,255,255,0.1)' : 'transparent', color: active === item.id ? 'white' : 'rgba(255,255,255,0.55)', fontFamily: 'var(--ff-display)', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', textAlign: 'left', marginBottom: '2px', transition: 'all 0.15s', borderLeft: active === item.id ? '3px solid var(--gold)' : '3px solid transparent' }}>
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginBottom: '8px' }}>SAMEN IPS © 2026 · v1.0</div>
      </div>
    </aside>
  );
}

// ─── TOPBAR ───────────────────────────────────────────────────
function TopBar({ user, role, pageTitle }: { user: User; role: string; pageTitle: string }) {
  const router = useRouter();
  const handleLogout = async () => { await signOut(auth); router.push('/'); };
  const roleLabel = role === 'admin' ? 'Administrador' : role === 'medico' ? 'Médico / Profesional' : 'Paciente';

  return (
    <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
      <div>
        <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '18px', fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.01em' }}>{pageTitle}</h1>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{roleLabel}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--bg-alt)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
          <Bell size={16} color="var(--text-muted)" />
          <span style={{ position: 'absolute', top: 7, right: 7, width: 8, height: 8, background: '#EF4444', borderRadius: '50%', border: '2px solid var(--surface)' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-alt)', padding: '6px 14px 6px 8px', borderRadius: '100px' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserIcon size={14} color="white" />
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--dark)', fontFamily: 'var(--ff-display)' }}>{user.email?.split('@')[0]}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{roleLabel}</div>
          </div>
        </div>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--ff-display)', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', transition: 'all 0.2s' }}>
          <LogOut size={14} />
          Salir
        </button>
      </div>
    </header>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────
function StatCard({ icon, value, label, sub, color }: { icon: React.ReactNode; value: string | number; label: string; sub?: string; color?: string }) {
  return (
    <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
      <div style={{ width: 48, height: 48, borderRadius: '12px', background: color || 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontFamily: 'var(--ff-display)', fontSize: '28px', fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{label}</div>
        {sub && <div style={{ fontSize: '12px', color: '#2E7D32', fontWeight: 600, marginTop: '4px' }}>{sub}</div>}
      </div>
    </div>
  );
}

// ─── ADMIN VIEWS ──────────────────────────────────────────────
function AdminHome({ onNav }: { onNav: (s: string) => void }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '26px', fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.02em', marginBottom: '4px' }}>Panel Administrativo</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Gestión de personal, citas y configuración del sistema clínico.</p>
        </div>
        <button onClick={() => onNav('users')} className="btn btn--dark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={16} /> + Crear Usuario
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '32px' }}>
        <StatCard icon={<UserIcon size={22} color="#1565C0" />} value={87} label="Pacientes registrados" color="#E3F2FD" />
        <StatCard icon={<Users size={22} color="#2E7D32" />} value={7} label="Médicos activos" color="#E8F5E9" />
        <StatCard icon={<Calendar size={22} color="#F57F17" />} value={31} label="Citas este mes" color="#FFF8E1" />
        <StatCard icon={<BarChart2 size={22} color="#7B1FA2" />} value={4} label="Reportes pendientes" color="#F3E5F5" />
      </div>

      {/* Users Table */}
      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '24px', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '16px', fontWeight: 700, color: 'var(--dark)' }}>Gestión de Usuarios del Sistema</h3>
          <button onClick={() => onNav('users')} style={{ fontFamily: 'var(--ff-display)', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>Ver todos <ChevronRight size={14} /></button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-alt)' }}>
              {['USUARIO', 'CORREO', 'ROL', 'ESTADO', 'ACCIONES'].map(h => (
                <th key={h} style={{ padding: '10px 24px', textAlign: 'left', fontFamily: 'var(--ff-display)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.slice(0, 3).map(u => (
              <tr key={u.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 24px', fontWeight: 600, color: 'var(--dark)', fontSize: '14px' }}>{u.name}</td>
                <td style={{ padding: '14px 24px', color: 'var(--text-muted)', fontSize: '13px' }}>{u.email}</td>
                <td style={{ padding: '14px 24px' }}><StatusBadge status={u.role} /></td>
                <td style={{ padding: '14px 24px' }}><StatusBadge status={u.status} /></td>
                <td style={{ padding: '14px 24px' }}>
                  <button style={{ fontFamily: 'var(--ff-display)', fontSize: '12px', fontWeight: 600, color: 'var(--dark)', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer' }}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Citas Table */}
      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '16px', fontWeight: 700, color: 'var(--dark)' }}>Próximas Citas</h3>
          <button onClick={() => onNav('citas')} style={{ fontFamily: 'var(--ff-display)', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>Gestionar <ChevronRight size={14} /></button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-alt)' }}>
              {['PACIENTE', 'MÉDICO', 'FECHA', 'TIPO', 'ESTADO'].map(h => (
                <th key={h} style={{ padding: '10px 24px', textAlign: 'left', fontFamily: 'var(--ff-display)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_CITAS.slice(0, 4).map(c => (
              <tr key={c.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 24px', fontWeight: 600, color: 'var(--dark)', fontSize: '14px' }}>{c.patient}</td>
                <td style={{ padding: '14px 24px', color: 'var(--text-muted)', fontSize: '13px' }}>{c.doctor}</td>
                <td style={{ padding: '14px 24px', color: 'var(--text-muted)', fontSize: '13px' }}>{c.date} — {c.time}</td>
                <td style={{ padding: '14px 24px', fontSize: '13px', color: 'var(--dark)' }}>{c.type}</td>
                <td style={{ padding: '14px 24px' }}><StatusBadge status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminUsers() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState(MOCK_USERS);
  const [form, setForm] = useState({ name: '', email: '', role: 'Médico', specialty: '', status: 'Activo' });
  const [search, setSearch] = useState('');

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => {
    setUsers(prev => [...prev, { id: Date.now(), joined: 'Ahora', ...form }]);
    setShowModal(false);
    setForm({ name: '', email: '', role: 'Médico', specialty: '', status: 'Activo' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '22px', fontWeight: 800, color: 'var(--dark)' }}>Gestión de Usuarios</h2>
        <button onClick={() => setShowModal(true)} className="btn btn--dark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><UserPlus size={16} /> Crear Usuario</button>
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ position: 'relative', maxWidth: '360px' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-light)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o correo..." style={{ ...inputStyle, paddingLeft: '40px' }} />
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-alt)' }}>
              {['NOMBRE', 'CORREO', 'ROL', 'ESPECIALIDAD', 'ESTADO', 'INGRESÓ', 'ACCIONES'].map(h => (
                <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontFamily: 'var(--ff-display)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '14px', color: 'var(--dark)' }}>{u.name.charAt(0)}</div>
                    <span style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '14px' }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-muted)' }}>{u.email}</td>
                <td style={{ padding: '14px 20px' }}><StatusBadge status={u.role} /></td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-muted)' }}>{u.specialty}</td>
                <td style={{ padding: '14px 20px' }}><StatusBadge status={u.status} /></td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-muted)' }}>{u.joined}</td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--bg-alt)', border: '1px solid var(--border)', fontFamily: 'var(--ff-display)', fontSize: '12px', fontWeight: 600, color: 'var(--dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Edit3 size={12} /> Editar</button>
                    <button onClick={() => setUsers(prev => prev.filter(x => x.id !== u.id))} style={{ padding: '6px 10px', borderRadius: '6px', background: '#FFEBEE', border: 'none', cursor: 'pointer' }}><Trash2 size={12} color="#C62828" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Crear Nuevo Usuario">
        <FormField label="Nombre completo"><input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} style={inputStyle} placeholder="Nombre y apellido" /></FormField>
        <FormField label="Correo corporativo"><input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} style={inputStyle} placeholder="nombre@samenips.com" /></FormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <FormField label="Rol">
            <select value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))} style={inputStyle}>
              <option>Médico</option><option>Admin</option><option>Enfermería</option><option>Paciente</option>
            </select>
          </FormField>
          <FormField label="Especialidad"><input value={form.specialty} onChange={e => setForm(f => ({...f, specialty: e.target.value}))} style={inputStyle} placeholder="Psiquiatría..." /></FormField>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--bg-alt)', border: 'none', fontFamily: 'var(--ff-display)', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
          <button onClick={handleCreate} style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--dark)', color: 'white', border: 'none', fontFamily: 'var(--ff-display)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Save size={16} /> Crear Usuario</button>
        </div>
      </Modal>
    </div>
  );
}

function CitasView({ role }: { role: string }) {
  const [citas, setCitas] = useState(MOCK_CITAS);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('Todas');
  const [form, setForm] = useState({ patient: '', doctor: '', date: '', time: '', type: 'Psiquiatría', notes: '' });

  const visible = filter === 'Todas' ? citas : citas.filter(c => c.status === filter);

  const handleCreate = () => {
    setCitas(prev => [...prev, { id: Date.now(), patient: form.patient, patientId: '—', doctor: form.doctor, date: form.date, time: form.time, type: form.type, status: 'Pendiente', notes: form.notes }]);
    setShowModal(false);
    setForm({ patient: '', doctor: '', date: '', time: '', type: 'Psiquiatría', notes: '' });
  };

  const updateStatus = (id: number, status: string) => setCitas(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  const deleteCita = (id: number) => setCitas(prev => prev.filter(c => c.id !== id));

  const filters = ['Todas', 'Confirmada', 'Pendiente', 'Cancelada'];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '22px', fontWeight: 800, color: 'var(--dark)' }}>{role === 'medico' ? 'Mis Citas' : 'Gestión de Citas'}</h2>
        <button onClick={() => setShowModal(true)} className="btn btn--dark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Plus size={16} /> Nueva Cita</button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 16px', borderRadius: '100px', border: '1.5px solid', borderColor: filter === f ? 'var(--dark)' : 'var(--border)', background: filter === f ? 'var(--dark)' : 'transparent', color: filter === f ? 'white' : 'var(--text-muted)', fontFamily: 'var(--ff-display)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>{f}</button>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-alt)' }}>
              {['PACIENTE', 'MÉDICO', 'FECHA / HORA', 'TIPO', 'ESTADO', 'ACCIONES'].map(h => (
                <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontFamily: 'var(--ff-display)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map(c => (
              <tr key={c.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '14px' }}>{c.patient}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>CC {c.patientId}</div>
                </td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-muted)' }}>{c.doctor}</td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--dark)' }}>{c.date}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={11} /> {c.time}</div>
                </td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--dark)' }}>{c.type}</td>
                <td style={{ padding: '14px 20px' }}><StatusBadge status={c.status} /></td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {c.status !== 'Confirmada' && <button onClick={() => updateStatus(c.id, 'Confirmada')} style={{ padding: '5px 10px', borderRadius: '6px', background: '#E8F5E9', border: 'none', color: '#2E7D32', fontFamily: 'var(--ff-display)', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={11} /> Confirmar</button>}
                    {c.status !== 'Cancelada' && <button onClick={() => updateStatus(c.id, 'Cancelada')} style={{ padding: '5px 10px', borderRadius: '6px', background: '#FFEBEE', border: 'none', color: '#C62828', fontFamily: 'var(--ff-display)', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><XCircle size={11} /> Cancelar</button>}
                    <button onClick={() => deleteCita(c.id)} style={{ padding: '5px 8px', borderRadius: '6px', background: 'var(--bg-alt)', border: 'none', cursor: 'pointer' }}><Trash2 size={11} color="var(--text-muted)" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>No hay citas con este filtro</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Agendar Nueva Cita">
        <FormField label="Nombre del Paciente"><input value={form.patient} onChange={e => setForm(f => ({...f, patient: e.target.value}))} style={inputStyle} placeholder="Nombre completo" /></FormField>
        <FormField label="Médico asignado"><input value={form.doctor} onChange={e => setForm(f => ({...f, doctor: e.target.value}))} style={inputStyle} placeholder="Dr. ..." /></FormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <FormField label="Fecha"><input type="date" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} style={inputStyle} /></FormField>
          <FormField label="Hora"><input type="time" value={form.time} onChange={e => setForm(f => ({...f, time: e.target.value}))} style={inputStyle} /></FormField>
        </div>
        <FormField label="Tipo de consulta">
          <select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))} style={inputStyle}>
            <option>Psiquiatría</option><option>Psicología</option><option>Medicina General</option><option>Control</option><option>Urgencias</option>
          </select>
        </FormField>
        <FormField label="Notas (opcional)"><textarea value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Notas adicionales..." /></FormField>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--bg-alt)', border: 'none', fontFamily: 'var(--ff-display)', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
          <button onClick={handleCreate} style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--dark)', color: 'white', border: 'none', fontFamily: 'var(--ff-display)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Save size={16} /> Agendar Cita</button>
        </div>
      </Modal>
    </div>
  );
}

function PatientsView({ role, onSelectPatient }: { role: string; onSelectPatient?: (p: typeof MOCK_PATIENTS[0]) => void }) {
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', id: '', age: '', service: 'Psiquiatría', doctor: '', phone: '', email: '', eps: '' });

  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search));

  const handleCreate = () => {
    setPatients(prev => [...prev, { ...form, age: parseInt(form.age) || 0, status: 'Activo', lastVisit: 'Hoy', nextVisit: '—', dx: 'Pendiente valoración', alerts: 0 }]);
    setShowModal(false);
    setForm({ name: '', id: '', age: '', service: 'Psiquiatría', doctor: '', phone: '', email: '', eps: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '22px', fontWeight: 800, color: 'var(--dark)' }}>{role === 'medico' ? 'Mis Pacientes' : 'Pacientes'}</h2>
        <button onClick={() => setShowModal(true)} className="btn btn--dark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><UserPlus size={16} /> Registrar Paciente</button>
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '16px', padding: '16px 20px' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-light)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o documento..." style={{ ...inputStyle, paddingLeft: '40px' }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map(p => (
          <div key={p.id} onClick={() => onSelectPatient && onSelectPatient(p)} style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px', cursor: onSelectPatient ? 'pointer' : 'default', transition: 'all 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: '18px', color: 'var(--dark)', flexShrink: 0 }}>{p.name.charAt(0)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, color: 'var(--dark)', fontSize: '15px' }}>{p.name}</span>
                <StatusBadge status={p.status} />
                {p.alerts > 0 && <span style={{ background: '#FFEBEE', color: '#C62828', padding: '2px 8px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={10} /> {p.alerts} alerta{p.alerts > 1 ? 's' : ''}</span>}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>CC {p.id} · {p.age} años · {p.service} · {p.eps}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>{p.dx}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>Última consulta</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {p.lastVisit}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '4px' }}>Próx: {p.nextVisit}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button style={{ padding: '7px 14px', borderRadius: '6px', background: 'var(--bg-alt)', border: '1px solid var(--border)', fontFamily: 'var(--ff-display)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '5px' }}><Eye size={12} /> Ver</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Registrar Nuevo Paciente">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <FormField label="Nombre completo"><input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} style={inputStyle} placeholder="Nombre y apellido" /></FormField>
          <FormField label="N° de documento"><input value={form.id} onChange={e => setForm(f => ({...f, id: e.target.value}))} style={inputStyle} placeholder="Cédula" /></FormField>
          <FormField label="Edad"><input type="number" value={form.age} onChange={e => setForm(f => ({...f, age: e.target.value}))} style={inputStyle} placeholder="Años" /></FormField>
          <FormField label="EPS / Seguro"><input value={form.eps} onChange={e => setForm(f => ({...f, eps: e.target.value}))} style={inputStyle} placeholder="Nombre EPS" /></FormField>
          <FormField label="Teléfono"><input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} style={inputStyle} placeholder="310 xxx xxxx" /></FormField>
          <FormField label="Correo"><input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} style={inputStyle} placeholder="paciente@email.com" /></FormField>
          <FormField label="Servicio">
            <select value={form.service} onChange={e => setForm(f => ({...f, service: e.target.value}))} style={inputStyle}>
              <option>Psiquiatría</option><option>Psicología</option><option>SPA</option><option>Medicina General</option><option>Terapia Ocupacional</option>
            </select>
          </FormField>
          <FormField label="Médico asignado"><input value={form.doctor} onChange={e => setForm(f => ({...f, doctor: e.target.value}))} style={inputStyle} placeholder="Dr. ..." /></FormField>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--bg-alt)', border: 'none', fontFamily: 'var(--ff-display)', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
          <button onClick={handleCreate} style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--dark)', color: 'white', border: 'none', fontFamily: 'var(--ff-display)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Save size={16} /> Registrar</button>
        </div>
      </Modal>
    </div>
  );
}

// ─── DOCTOR VIEWS ─────────────────────────────────────────────
function DoctorHome({ user, onNav }: { user: User; onNav: (s: string) => void }) {
  const todayCitas = MOCK_CITAS.filter(c => c.doctor.includes('Ricardo') || true).slice(0, 3);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '26px', fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.02em', marginBottom: '4px' }}>Bienvenido, Dr. {user.email?.split('@')[0]}.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Tienes {todayCitas.length} citas programadas para hoy.</p>
        </div>
        <button onClick={() => onNav('citas')} className="btn btn--dark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} /> Ver todas las citas</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '32px' }}>
        <StatCard icon={<Calendar size={22} color="#1565C0" />} value={todayCitas.length} label="Citas hoy" color="#E3F2FD" />
        <StatCard icon={<UserIcon size={22} color="#2E7D32" />} value={MOCK_PATIENTS.length} label="Mis pacientes" color="#E8F5E9" />
        <StatCard icon={<AlertCircle size={22} color="#E65100" />} value={2} label="Alertas activas" color="#FFF3E0" />
        <StatCard icon={<FileText size={22} color="#7B1FA2" />} value={3} label="Documentos pendientes" color="#F3E5F5" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '16px', fontWeight: 700, color: 'var(--dark)' }}>Citas de Hoy</h3>
            <button onClick={() => onNav('citas')} style={{ fontFamily: 'var(--ff-display)', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>Ver todas <ChevronRight size={14} /></button>
          </div>
          {MOCK_CITAS.map(c => (
            <div key={c.id} style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--ff-display)', fontWeight: 700, flexShrink: 0 }}>{c.patient.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '14px' }}>{c.patient}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={11} />{c.time} · {c.type}</div>
              </div>
              <StatusBadge status={c.status} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px 24px' }}>
            <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '16px', fontWeight: 700, color: 'var(--dark)', marginBottom: '16px' }}>Alertas Clínicas</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#FFEBEE', borderRadius: '8px', padding: '12px 14px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <AlertCircle size={16} color="#C62828" style={{ flexShrink: 0, marginTop: 1 }} />
                <div><div style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '13px', color: '#C62828' }}>Laura Ortiz — No asistió</div><div style={{ fontSize: '12px', color: '#E53935' }}>Control del 10 Abr sin confirmar reagenda</div></div>
              </div>
              <div style={{ background: '#FFF8E1', borderRadius: '8px', padding: '12px 14px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <AlertCircle size={16} color="#F57F17" style={{ flexShrink: 0, marginTop: 1 }} />
                <div><div style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '13px', color: '#F57F17' }}>Pedro Gómez — Resultado pendiente</div><div style={{ fontSize: '12px', color: '#F9A825' }}>Hemograma del 08 Abr sin revisar</div></div>
              </div>
            </div>
          </div>
          <div style={{ background: 'var(--dark)', borderRadius: '12px', padding: '20px 24px' }}>
            <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '15px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>Accesos rápidos</h3>
            {[{ label: 'Buscar paciente', icon: <Search size={14} />, nav: 'patients' }, { label: 'Agregar evolución', icon: <ClipboardList size={14} />, nav: 'evoluciones' }, { label: 'Subir documento', icon: <Upload size={14} />, nav: 'documents' }].map(a => (
              <button key={a.nav} onClick={() => onNav(a.nav)} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--ff-display)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginBottom: '8px', transition: 'all 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}>
                {a.icon} {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Evoluciones() {
  const [notes, setNotes] = useState([
    { id: 1, patient: 'Laura Camila Ortiz', date: '10 Abr, 2026', text: 'Paciente refiere mejoría en el estado de ánimo. Continúa con tratamiento farmacológico. Se sugiere mantener dosis actual y cita de control en 2 semanas.', type: 'Psiquiatría', signed: true },
    { id: 2, patient: 'Juan Carlos Restrepo', date: '05 Abr, 2026', text: 'Semana 3 de hospitalización. Evolución favorable. Participó en terapia ocupacional. No se registraron eventos adversos.', type: 'SPA', signed: true },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ patient: '', text: '', type: 'Psiquiatría' });

  const handleSave = () => {
    setNotes(prev => [{ id: Date.now(), patient: form.patient, date: 'Hoy', text: form.text, type: form.type, signed: false }, ...prev]);
    setShowModal(false);
    setForm({ patient: '', text: '', type: 'Psiquiatría' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '22px', fontWeight: 800, color: 'var(--dark)' }}>Notas de Evolución</h2>
        <button onClick={() => setShowModal(true)} className="btn btn--dark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Plus size={16} /> Nueva Evolución</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notes.map(n => (
          <div key={n.id} style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, color: 'var(--dark)', fontSize: '15px' }}>{n.patient}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={11} /> {n.date} · {n.type}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {n.signed ? <span style={{ background: '#E8F5E9', color: '#2E7D32', padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} /> Firmada</span> : <button style={{ background: 'var(--dark)', color: 'white', border: 'none', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', fontFamily: 'var(--ff-display)', fontWeight: 700, cursor: 'pointer' }}>Firmar nota</button>}
                <button style={{ padding: '5px 10px', borderRadius: '6px', background: 'var(--bg-alt)', border: 'none', cursor: 'pointer' }}><Download size={13} color="var(--text-muted)" /></button>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: '3px solid var(--gold)', paddingLeft: '16px' }}>{n.text}</p>
          </div>
        ))}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nueva Nota de Evolución">
        <FormField label="Paciente">
          <select value={form.patient} onChange={e => setForm(f => ({...f, patient: e.target.value}))} style={inputStyle}>
            <option value="">Seleccionar paciente...</option>
            {MOCK_PATIENTS.map(p => <option key={p.id}>{p.name}</option>)}
          </select>
        </FormField>
        <FormField label="Especialidad">
          <select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))} style={inputStyle}>
            <option>Psiquiatría</option><option>Psicología</option><option>SPA</option><option>Medicina General</option>
          </select>
        </FormField>
        <FormField label="Nota clínica — Formato SOAP">
          <textarea value={form.text} onChange={e => setForm(f => ({...f, text: e.target.value}))} style={{ ...inputStyle, minHeight: '160px', resize: 'vertical' }} placeholder="S: Subjetivo — lo que refiere el paciente&#10;O: Objetivo — hallazgos del examen&#10;A: Análisis / Impresión diagnóstica&#10;P: Plan de tratamiento" />
        </FormField>
        <p style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '16px' }}>Esta nota será revisada y firmada digitalmente por el profesional responsable.</p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--bg-alt)', border: 'none', fontFamily: 'var(--ff-display)', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
          <button onClick={handleSave} style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--dark)', color: 'white', border: 'none', fontFamily: 'var(--ff-display)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Save size={16} /> Guardar Nota</button>
        </div>
      </Modal>
    </div>
  );
}

function DocumentsView() {
  const [docs, setDocs] = useState(MOCK_DOCS);
  const [dragging, setDragging] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocs(prev => [{ id: Date.now(), name: file.name, type: 'Subido', date: 'Hoy', status: 'Nuevo', size: `${(file.size / 1024 / 1024).toFixed(1)} MB` }, ...prev]);
    }
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '22px', fontWeight: 800, color: 'var(--dark)', marginBottom: '24px' }}>Documentos Clínicos</h2>

      <label htmlFor="fileUpload" style={{ display: 'block', cursor: 'pointer' }}>
        <div onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); }}
          style={{ border: `2px dashed ${dragging ? 'var(--gold)' : 'var(--border)'}`, borderRadius: '12px', padding: '48px', textAlign: 'center', background: dragging ? 'var(--gold-pale)' : 'var(--bg-alt)', transition: 'all 0.2s', marginBottom: '24px' }}>
          <Upload size={32} color={dragging ? 'var(--gold)' : 'var(--text-light)'} style={{ margin: '0 auto 12px' }} />
          <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '15px', color: 'var(--dark)', marginBottom: '6px' }}>Arrastra archivos aquí o haz clic para seleccionar</div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>PDF, JPG, PNG — máximo 10 MB por archivo</div>
        </div>
      </label>
      <input id="fileUpload" type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={handleUpload} />

      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-alt)' }}>
              {['NOMBRE', 'TIPO', 'FECHA', 'TAMAÑO', 'ESTADO', 'ACCIONES'].map(h => (
                <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontFamily: 'var(--ff-display)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {docs.map(d => (
              <tr key={d.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={16} color="var(--text-muted)" />
                    <span style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '14px' }}>{d.name}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-muted)' }}>{d.type}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-muted)' }}>{d.date}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-muted)' }}>{d.size}</td>
                <td style={{ padding: '14px 20px' }}><StatusBadge status={d.status} /></td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '5px 10px', borderRadius: '6px', background: 'var(--bg-alt)', border: '1px solid var(--border)', fontFamily: 'var(--ff-display)', fontSize: '11px', fontWeight: 600, color: 'var(--dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={11} /> Ver</button>
                    <button style={{ padding: '5px 10px', borderRadius: '6px', background: 'var(--bg-alt)', border: '1px solid var(--border)', fontFamily: 'var(--ff-display)', fontSize: '11px', fontWeight: 600, color: 'var(--dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Download size={11} /> Descargar</button>
                    <button onClick={() => setDocs(prev => prev.filter(x => x.id !== d.id))} style={{ padding: '5px 8px', borderRadius: '6px', background: '#FFEBEE', border: 'none', cursor: 'pointer' }}><Trash2 size={11} color="#C62828" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PATIENT VIEWS ────────────────────────────────────────────
function PatientHome({ user, onNav }: { user: User; onNav: (s: string) => void }) {
  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, var(--dark) 0%, #163D28 100%)', borderRadius: '16px', padding: '32px 40px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--ff-display)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Bienvenido al portal</div>
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '26px', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: '8px' }}>Hola, {user.email?.split('@')[0]}.</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', fontWeight: 300 }}>Aquí puedes revisar tu historial clínico, citas y documentos de SAMEN IPS.</p>
        </div>
        <button onClick={() => onNav('citas')} style={{ background: 'var(--gold)', color: 'var(--dark)', border: 'none', borderRadius: '10px', padding: '14px 22px', fontFamily: 'var(--ff-display)', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}><Calendar size={16} /> Solicitar Cita</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { icon: <Calendar size={22} color="#1565C0" />, label: 'Próxima cita', value: '24 Abr · 10:00 AM', sub: 'Dr. Ricardo Pardo — Psiquiatría', color: '#E3F2FD', nav: 'citas' },
          { icon: <FileText size={22} color="#7B1FA2" />, label: 'Documentos', value: '3', sub: '1 documento nuevo', color: '#F3E5F5', nav: 'documents' },
          { icon: <Pill size={22} color="#2E7D32" />, label: 'Recetas activas', value: '2', sub: 'Vigentes hasta Jun 2026', color: '#E8F5E9', nav: 'prescriptions' },
        ].map(item => (
          <div key={item.nav} onClick={() => onNav(item.nav)} style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '22px', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <div style={{ width: 44, height: 44, borderRadius: '10px', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>{item.icon}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--ff-display)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '4px' }}>{item.label}</div>
            <div style={{ fontFamily: 'var(--ff-display)', fontSize: '20px', fontWeight: 800, color: 'var(--dark)' }}>{item.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '16px', fontWeight: 700, color: 'var(--dark)', marginBottom: '16px' }}>Documentos recientes</h3>
        {MOCK_DOCS.map(d => (
          <div key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={16} color="var(--text-muted)" /></div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--dark)' }}>{d.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>{d.date} · {d.size}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <StatusBadge status={d.status} />
              <button style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--bg-alt)', border: '1px solid var(--border)', fontFamily: 'var(--ff-display)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '4px' }}><Download size={12} /> Descargar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientDocuments() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '22px', fontWeight: 800, color: 'var(--dark)', marginBottom: '24px' }}>Mis Documentos</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {MOCK_DOCS.map(d => (
          <div key={d.id} style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '10px', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FileText size={22} color="var(--text-muted)" /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--dark)' }}>{d.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{d.type} · {d.date} · {d.size}</div>
            </div>
            <StatusBadge status={d.status} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--bg-alt)', border: '1px solid var(--border)', fontFamily: 'var(--ff-display)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Eye size={14} /> Ver</button>
              <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--dark)', color: 'white', border: 'none', fontFamily: 'var(--ff-display)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={14} /> Descargar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientPrescriptions() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '22px', fontWeight: 800, color: 'var(--dark)', marginBottom: '24px' }}>Mis Recetas</h2>
      {[
        { med: 'Sertralina 50 mg', dose: '1 tableta en la mañana', duration: 'Por 3 meses', doctor: 'Dr. Ricardo Pardo', date: '08 Abr, 2026', expires: 'Jul 2026', active: true },
        { med: 'Clonazepam 0.5 mg', dose: '1 tableta antes de dormir', duration: 'Por 1 mes', doctor: 'Dr. Ricardo Pardo', date: '08 Abr, 2026', expires: 'May 2026', active: true },
        { med: 'Quetiapina 25 mg', dose: 'Según indicación', duration: 'Suspendido', doctor: 'Dr. Ricardo Pardo', date: '01 Ene, 2026', expires: 'Vencida', active: false },
      ].map((rx, i) => (
        <div key={i} style={{ background: 'var(--surface)', borderRadius: '12px', border: `1px solid ${rx.active ? 'var(--border)' : 'var(--border)'}`, padding: '24px', marginBottom: '12px', opacity: rx.active ? 1 : 0.6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: 48, height: 48, borderRadius: '10px', background: rx.active ? '#E8F5E9' : 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Pill size={22} color={rx.active ? '#2E7D32' : 'var(--text-light)'} /></div>
              <div>
                <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: '16px', color: 'var(--dark)' }}>{rx.med}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>Dosis: {rx.dose}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-light)', marginTop: '4px' }}>{rx.duration} · Recetado por {rx.doctor}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '4px' }}>{rx.date}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <StatusBadge status={rx.active ? 'Activo' : 'Alta'} />
              <div style={{ fontSize: '12px', color: rx.active ? '#2E7D32' : 'var(--text-light)', marginTop: '6px', fontWeight: 600 }}>Vence: {rx.expires}</div>
              {rx.active && <button style={{ marginTop: '10px', padding: '6px 12px', borderRadius: '6px', background: 'var(--dark)', color: 'white', border: 'none', fontFamily: 'var(--ff-display)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Download size={12} /> Descargar</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PatientResults() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '22px', fontWeight: 800, color: 'var(--dark)', marginBottom: '24px' }}>Mis Exámenes</h2>
      {[
        { name: 'Hemograma completo', date: '10 Abr, 2026', lab: 'Lab. Clínico SAMEN', status: 'Nuevo', result: 'Ver resultados' },
        { name: 'Perfil Lipídico', date: '01 Mar, 2026', lab: 'Lab. Clínico SAMEN', status: 'Leído', result: 'Ver resultados' },
        { name: 'TSH — Tiroides', date: '10 Feb, 2026', lab: 'Lab. Externo', status: 'Leído', result: 'Ver resultados' },
      ].map((ex, i) => (
        <div key={i} style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px 24px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: '10px', background: ex.status === 'Nuevo' ? '#FFF3E0' : 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Activity size={20} color={ex.status === 'Nuevo' ? '#E65100' : 'var(--text-muted)'} /></div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--dark)' }}>{ex.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{ex.lab} · {ex.date}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <StatusBadge status={ex.status} />
            <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--dark)', color: 'white', border: 'none', fontFamily: 'var(--ff-display)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Eye size={14} /> {ex.result}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Reports() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '22px', fontWeight: 800, color: 'var(--dark)', marginBottom: '24px' }}>Reportes y Analítica</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Pacientes este mes', value: '34', trend: '+12%', color: '#E3F2FD', iconColor: '#1565C0' },
          { label: 'Citas completadas', value: '28', trend: '+8%', color: '#E8F5E9', iconColor: '#2E7D32' },
          { label: 'Tasa de no-show', value: '11%', trend: '-3%', color: '#FFF8E1', iconColor: '#F57F17' },
          { label: 'Tiempo prom. respuesta', value: '18 min', trend: '-5 min', color: '#F3E5F5', iconColor: '#7B1FA2' },
        ].map((r, i) => (
          <div key={i} style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: '30px', fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.03em' }}>{r.value}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{r.label}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ background: r.color, color: r.iconColor, padding: '4px 10px', borderRadius: '100px', fontFamily: 'var(--ff-display)', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={11} /> {r.trend}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '28px' }}>
        <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, color: 'var(--dark)', marginBottom: '16px' }}>Reportes disponibles</h3>
        {['Reporte de citas — Abril 2026', 'Reporte de pacientes activos', 'Reporte de no-shows', 'Reporte de documentación clínica'].map((rep, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BarChart2 size={16} color="var(--text-muted)" />
              <span style={{ fontSize: '14px', color: 'var(--dark)', fontWeight: 500 }}>{rep}</span>
            </div>
            <button style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--bg-alt)', border: '1px solid var(--border)', fontFamily: 'var(--ff-display)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Download size={12} /> Descargar PDF</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSettings() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '22px', fontWeight: 800, color: 'var(--dark)', marginBottom: '24px' }}>Configuración del Sistema</h2>
      {[
        { section: 'Institución', fields: [{ label: 'Nombre de la IPS', value: 'SAMEN IPS' }, { label: 'NIT', value: '900.XXX.XXX-X' }, { label: 'Dirección sede principal', value: 'Cra. 47e #10 - 92, Villavicencio' }, { label: 'Teléfono urgencias', value: '310 685 4340' }] },
        { section: 'Correos del sistema', fields: [{ label: 'Correo de citas', value: 'citas@samenips.com' }, { label: 'Correo administrativo', value: 'admin@samenips.com' }] },
      ].map(sec => (
        <div key={sec.section} style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', padding: '28px', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '16px', fontWeight: 700, color: 'var(--dark)', marginBottom: '20px' }}>{sec.section}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {sec.fields.map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontFamily: 'var(--ff-display)', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>{f.label}</label>
                <input defaultValue={f.value} style={{ ...inputStyle, width: '100%' }} />
              </div>
            ))}
          </div>
          <button style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '8px', background: 'var(--dark)', color: 'white', border: 'none', fontFamily: 'var(--ff-display)', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Save size={14} /> Guardar cambios</button>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN ROUTER ──────────────────────────────────────────────
export default function DashboardRouter() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('home');
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => { u ? setUser(u) : router.push('/'); setLoading(false); });
    return () => unsub();
  }, [router]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center' }}>
        <RefreshCw size={28} color="var(--text-muted)" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
        <p style={{ fontFamily: 'var(--ff-display)', color: 'var(--text-muted)' }}>Cargando portal seguro...</p>
      </div>
    </div>
  );
  if (!user) return null;

  const email = user.email || '';
  const role = email.includes('admin') ? 'admin' : email.includes('medico') || email.includes('crivas') || email.includes('smora') ? 'medico' : 'patient';

  const pageTitles: Record<string, string> = {
    home: role === 'admin' ? 'Panel Administrativo' : role === 'medico' ? 'Panel Clínico' : 'Mi Portal de Salud',
    users: 'Usuarios del Sistema', citas: role === 'medico' ? 'Mis Citas' : 'Gestión de Citas',
    patients: role === 'medico' ? 'Mis Pacientes' : 'Pacientes',
    evoluciones: 'Notas de Evolución', documents: 'Documentos',
    prescriptions: 'Mis Recetas', results: 'Mis Exámenes',
    reports: 'Reportes', settings: 'Configuración',
  };

  const renderContent = () => {
    if (role === 'admin') {
      if (active === 'home') return <AdminHome onNav={setActive} />;
      if (active === 'users') return <AdminUsers />;
      if (active === 'citas') return <CitasView role={role} />;
      if (active === 'patients') return <PatientsView role={role} />;
      if (active === 'reports') return <Reports />;
      if (active === 'settings') return <AdminSettings />;
    }
    if (role === 'medico') {
      if (active === 'home') return <DoctorHome user={user} onNav={setActive} />;
      if (active === 'patients') return <PatientsView role={role} />;
      if (active === 'citas') return <CitasView role={role} />;
      if (active === 'evoluciones') return <Evoluciones />;
      if (active === 'documents') return <DocumentsView />;
    }
    if (role === 'patient') {
      if (active === 'home') return <PatientHome user={user} onNav={setActive} />;
      if (active === 'citas') return <CitasView role={role} />;
      if (active === 'documents') return <PatientDocuments />;
      if (active === 'prescriptions') return <PatientPrescriptions />;
      if (active === 'results') return <PatientResults />;
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar role={role} active={active} onNav={setActive} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar user={user} role={role} pageTitle={pageTitles[active] || 'Portal'} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px', background: 'var(--bg)' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
