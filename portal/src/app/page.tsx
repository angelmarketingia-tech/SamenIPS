'use client';

import { useState } from 'react';
import { Lock, User, KeyRound, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'professional'>('patient');
  const [errorObj, setErrorObj] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorObj('');
    const btn = document.getElementById('loginBtn');
    if (btn) btn.innerText = 'Verificando...';
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      setErrorObj('Credenciales incorrectas. Intenta de nuevo.');
      if (btn) btn.innerText = 'Iniciar Sesión Segura';
    }
  };

  return (
    <div className="auth-wrapper">
      {/* LEFT SIDEBAR - BRANDING Info */}
      <div className="auth-sidebar">
        <div>
          {/* We will eventually load the SAMEN logo here */}
          <div style={{ background: '#fff', display: 'inline-flex', padding: '12px 16px', borderRadius: '4px', marginBottom: '40px' }}>
            <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, color: 'var(--dark)', fontSize: '20px', letterSpacing: '-0.02em' }}>
              SAMEN<span style={{ color: 'var(--gold)' }}>IPS</span>
            </span>
          </div>
        </div>
        
        <div className="auth-sidebar-text">
          <h2>Conectando cuidado y tecnología.</h2>
          <p>El Portal Clínico centraliza el historial médico, fórmulas recetarias y resultados de exámenes en un entorno cifrado y seguro para nuestros pacientes y equipo médico.</p>
        </div>

        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
          © {new Date().getFullYear()} SAMEN IPS. Plataforma de acceso restringido.
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN */}
      <div className="auth-content">
        <div className="auth-box">
          <div className="auth-header">
            <h1>Bienvenido al portal</h1>
            <p>Ingresa tus credenciales para acceder a tu área segura.</p>
          </div>

          {/* ROLE SELECTOR */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', background: 'var(--bg-alt)', padding: '6px', borderRadius: 'var(--radius)' }}>
            <button 
              onClick={() => setRole('patient')}
              style={{ flex: 1, padding: '10px', borderRadius: '4px', fontWeight: 600, fontSize: '13px', 
                       background: role === 'patient' ? 'var(--surface)' : 'transparent', 
                       boxShadow: role === 'patient' ? 'var(--shadow-sm)' : 'none',
                       color: role === 'patient' ? 'var(--dark)' : 'var(--text-muted)',
                       transition: 'all 0.2s ease' }}
            >
              Soy Paciente
            </button>
            <button 
              onClick={() => setRole('professional')}
              style={{ flex: 1, padding: '10px', borderRadius: '4px', fontWeight: 600, fontSize: '13px', 
                       background: role === 'professional' ? 'var(--surface)' : 'transparent', 
                       boxShadow: role === 'professional' ? 'var(--shadow-sm)' : 'none',
                       color: role === 'professional' ? 'var(--dark)' : 'var(--text-muted)',
                       transition: 'all 0.2s ease' }}
            >
              Soy Profesional
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">
                {role === 'patient' ? 'Documento de Identidad o Correo' : 'Correo Corporativo'}
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="var(--text-light)" style={{ position: 'absolute', left: '16px', top: '16px' }} />
                <input 
                  type={role === 'patient' ? 'text' : 'email'}
                  className="form-input" 
                  placeholder={role === 'patient' ? 'Ej. 1020304050' : 'dr.apellido@samenips.com'}
                  style={{ paddingLeft: '44px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '8px' }}>
              <label className="form-label">Contraseña</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="var(--text-light)" style={{ position: 'absolute', left: '16px', top: '16px' }} />
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Tu contraseña asignada"
                  style={{ paddingLeft: '44px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', alignItems: 'center' }}>
              {errorObj ? (
                <span style={{ fontSize: '13px', color: '#E53935', fontWeight: 600 }}>{errorObj}</span>
              ) : (
                <span />
              )}
              <a href="#" style={{ fontSize: '12px', color: 'var(--dark-light)', fontWeight: 600 }}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button type="submit" id="loginBtn" className="btn btn--primary" style={{ width: '100%', padding: '16px', fontSize: '15px' }}>
              <KeyRound size={18} />
              Iniciar Sesión Segura
              <ArrowRight size={18} style={{ marginLeft: 'auto' }} />
            </button>
          </form>

          {role === 'patient' && (
            <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
              ¿Primera vez aquí? <a href="#" style={{ color: 'var(--dark)', fontWeight: 700 }}>Solicita tu acceso en recepción</a>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
