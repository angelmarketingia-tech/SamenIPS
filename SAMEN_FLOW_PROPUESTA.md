# SAMEN Flow
## Sistema de Acceso, Navegación y Continuidad en Salud Mental
### Propuesta Integral de Transformación Digital con IA para SAMEN IPS
**Versión 1.0 | Villavicencio, Colombia | 2025**

---

> **NOTA PARA AGENTE CONTINUADOR (ANTIGRAVITY u otro):**
> Este documento es el artefacto principal del proyecto SAMEN Flow.
> Todo el trabajo de diseño, arquitectura y estrategia comercial está aquí.
> El modelo de trabajo es: consultor senior healthtech + arquitecto de automatización IA + estratega B2B.
> El cliente es SAMEN IPS — clínica privada de salud mental en Villavicencio, Colombia.
> Operaciones desde 2021. Servicios: urgencias 24/7, hospitalización (salud mental, SPA, terapia ocupacional, farmacia), consulta externa (enfermería, medicina general, psicología, psiquiatría).
> Marco regulatorio colombiano: IHCE, RDA, FEV-RIPS, Habilitación, Resolución 2003/2014.
> Restricción crítica: NUNCA diagnóstico autónomo. Toda IA clínica requiere validación humana.
> Para continuar: leer este documento completo antes de responder al usuario.

---

## ÍNDICE

1. Diagnóstico del negocio digital
2. Mapa de dolores
3. Mapa de procesos repetitivos
4. Arquitectura SAMEN Flow por módulos
5. Casos de uso priorizados
6. Roadmap en 3 fases
7. KPIs propuestos
8. Pitch comercial
9. Anexo técnico para implementación

---

## 1. DIAGNÓSTICO DEL NEGOCIO DIGITAL DE SAMEN IPS

### 1.1 Qué ya tiene

| Activo | Estado | Observación |
|--------|--------|-------------|
| Sitio web institucional | Activo | Comunicación de servicios básica |
| Blog | Presente | Sin frecuencia de publicación visible |
| Redes sociales | Presentes | Sin integración con flujo de captación |
| Contacto directo | 2 correos + 1 celular | Sin CRM, sin trazabilidad |
| Servicios comunicados | Urgencias, hospitalización, CE | Sin diferenciación de rutas por perfil |
| Identidad de marca | Parcial | Nombre y colores definidos |

### 1.2 Qué le falta (brechas críticas)

**Captación y conversión:**
- Sin agendamiento online — el paciente llega a un número de celular y espera
- Sin formulario de preadmisión digital — todo es manual en recepción
- Sin triage administrativo previo — no hay clasificación antes del contacto
- Sin landing pages diferenciadas por servicio — todo comparte la misma página genérica
- Sin píxel de conversión ni analítica de comportamiento

**Atención y navegación:**
- Sin agente de orientación web o WhatsApp — el paciente no sabe a dónde ir
- Sin portal de pacientes — familiares y acudientes no tienen acceso a información
- Sin flujo de urgencias digitalmente soportado — ¿cómo llega alguien en crisis a las 2am?

**Continuidad y seguimiento:**
- Sin CRM de pacientes — no hay historial de leads ni seguimiento post-consulta
- Sin automatización de recordatorios — alto riesgo de no-show
- Sin protocolo de reenganche para pacientes que abandonan tratamiento
- Sin seguimiento post-egreso hospitalario estructurado

**Operación:**
- Sin copiloto de documentación clínica asistida
- Sin integración declarada con HCE (Historia Clínica Electrónica)
- Sin panel de analítica gerencial en tiempo real
- Sin flujo automatizado de RIPS/facturación

**Confianza digital:**
- Páginas con Lorem ipsum — señal de abandono editorial que genera desconfianza
- Sin sección de "quiénes somos" con equipo médico visible y humanizado
- Sin testimonios o casos de impacto (dentro de lo permitido clínicamente)
- Sin certificaciones de habilitación visibles

### 1.3 Riesgos operativos revelados por la web actual

| Riesgo | Nivel | Descripción |
|--------|-------|-------------|
| Crisis no atendida a tiempo | CRÍTICO | Paciente en urgencia busca ayuda en web y no encuentra flujo claro de acción |
| Fuga de leads por fricción | ALTO | Un familiar busca hospitalización, no entiende cómo proceder, se va a la competencia |
| Lorem ipsum en producción | ALTO | Señal de descuido que destruye la confianza institucional antes del primer contacto |
| Contacto por celular sin trazabilidad | ALTO | No hay registro de quién llamó, qué pidió, si fue atendido |
| Sobredemanda en único punto de contacto | MEDIO | Un solo número celular como canal principal es cuello de botella y riesgo de colapso |
| No-show sin sistema de recordatorio | MEDIO | Consultas perdidas sin posibilidad de reagenda automatizada |
| Incumplimiento RIPS por documentación manual | MEDIO | Error humano en generación de RIPS sin validación automatizada |
| Reputación sin gestión | MEDIO | Sin respuesta estructurada a reseñas ni construcción activa de confianza digital |

### 1.4 Oportunidades por línea de servicio

**Urgencias 24/7:**
- Flujo de "estoy en crisis / necesito ayuda ahora" visible desde la home
- Protocolo digital de primera orientación (con derivación inmediata a humano)
- Botón de WhatsApp con mensaje predefinido para urgencias

**Hospitalización - Salud Mental:**
- Landing page específica con explicación del proceso, qué esperar, qué traer
- Portal de preadmisión para reducir carga en admisión
- Canal dedicado para familiares y acudientes (orientación, visitas, alta)

**Hospitalización - Consumo de SPA:**
- La ruta de acceso en adicciones tiene un perfil de búsqueda muy específico (familiares que buscan ayuda para un familiar, no el paciente mismo)
- Contenido y flujo diseñado para el tomador de decisión: el familiar/acudiente
- Alta sensibilidad y confidencialidad — el sistema debe manejar esto con cuidado

**Hospitalización - Terapia Ocupacional:**
- Poca diferenciación en mercado local — oportunidad de ser referente
- Contenido educativo que explique qué es y por qué importa en recuperación

**Consulta Externa - Psiquiatría y Psicología:**
- Alta demanda regional, baja oferta estructurada
- Agendamiento online puede capturar pacientes que hoy van a plataformas genéricas (Doctoralia, etc.)
- Programa de seguimiento entre consultas puede diferenciar la propuesta de valor

**Consulta Externa - Medicina General:**
- Puerta de entrada potencial para diagnóstico inicial y referencia interna a especialidades
- Automatización de recordatorios y seguimiento post-consulta

---

## 2. MAPA DE DOLORES

### 2.1 Acceso y captación

| # | Dolor | Quién lo siente | Impacto |
|---|-------|-----------------|---------|
| A1 | No sé si SAMEN atiende mi caso específico | Paciente / Familiar | Fuga antes del contacto |
| A2 | No encuentro cómo agendar sin llamar | Paciente digital | Abandono del sitio |
| A3 | Nadie me responde el correo o el celular a tiempo | Familiar en crisis | Pérdida de confianza |
| A4 | No sé si tienen cama disponible para hospitalizar | Familiar urgente | Va a otra clínica |
| A5 | No entiendo la diferencia entre sus servicios | Paciente nuevo | Consulta inadecuada |
| A6 | No hay suficiente información para decidir si confío | Tomador de decisión | No convierte |

### 2.2 Orientación inicial

| # | Dolor | Quién lo siente | Impacto |
|---|-------|-----------------|---------|
| O1 | No sé si necesito urgencias, hospitalización o consulta | Paciente/Familiar | Llegada al servicio equivocado |
| O2 | Recepción tiene que responder lo mismo 20 veces al día | Personal administrativo | Tiempo perdido, estrés |
| O3 | El paciente llega sin documentos y retrasa todo | Admisiones | Cuello de botella |
| O4 | Familiares hacen preguntas que no son del área clínica | Clínico | Interrupción del trabajo asistencial |

### 2.3 Urgencias

| # | Dolor | Quién lo siente | Impacto |
|---|-------|-----------------|---------|
| U1 | En crisis a las 2am no encuentro cómo contactar | Paciente/Familiar | Riesgo vital real |
| U2 | No hay triage previo — todo llega de golpe a recepción | Enfermería/Admisiones | Caos operativo |
| U3 | No hay protocolo claro de qué hacer al llegar con un paciente agitado | Familiar | Experiencia traumática |
| U4 | El personal no tiene información previa del paciente que entra | Clínico | Decisión sin contexto |

### 2.4 Hospitalización

| # | Dolor | Quién lo siente | Impacto |
|---|-------|-----------------|---------|
| H1 | El proceso de admisión toma horas de papeleo | Admisiones + Familiar | Experiencia horrible en momento difícil |
| H2 | No sé nada de mi familiar mientras está hospitalizado | Acudiente | Angustia, llamadas constantes |
| H3 | No entiendo cuándo va a salir ni qué sigue | Familiar | Falta de planificación |
| H4 | Al alta no me explican claramente el plan de seguimiento | Paciente | Recaída evitable |
| H5 | La historia clínica en papel se pierde o está incompleta | Equipo clínico | Riesgo clínico y regulatorio |

### 2.5 Consulta Externa

| # | Dolor | Quién lo siente | Impacto |
|---|-------|-----------------|---------|
| CE1 | Olvido la cita y nadie me recordó | Paciente | No-show |
| CE2 | Quiero reagendar pero no sé cómo sin llamar | Paciente | Abandono del tratamiento |
| CE3 | El médico no tiene información de mis consultas anteriores | Clínico | Repetición, ineficiencia |
| CE4 | Los documentos que pido al paciente no llegan a tiempo | Admisiones | Cita sin información completa |
| CE5 | Tengo muchos pacientes y no recuerdo en qué estaba cada uno | Clínico | Calidad asistencial comprometida |

### 2.6 Consumo de Sustancias Psicoactivas

| # | Dolor | Quién lo siente | Impacto |
|---|-------|-----------------|---------|
| SPA1 | No sé cómo hablar del tema sin juzgar a mi familiar | Familia | No buscan ayuda |
| SPA2 | Siento vergüenza de preguntar públicamente | Familiar/Paciente | Canal de contacto privado necesario |
| SPA3 | No entiendo qué implica un programa de desintoxicación | Familia | Expectativas equivocadas |
| SPA4 | No sé si mi EPS cubre esto o si es solo privado | Familia | Barrera económica percibida |
| SPA5 | Después del alta, el paciente recae y no hay red de apoyo | Clínico/Familia | Reingreso evitable |

### 2.7 Trabajo con Familiares y Acudientes

| # | Dolor | Quién lo siente | Impacto |
|---|-------|-----------------|---------|
| F1 | Nadie me informa cómo puedo apoyar el tratamiento | Familiar | Exclusión, frustración |
| F2 | Llamo y me dicen que no pueden darme información | Familiar | Sensación de abandono institucional |
| F3 | No hay psicoeducación estructurada para familias | Familiar | Factores de riesgo en el hogar no abordados |
| F4 | No sé qué debo preparar para el alta | Familiar | Alta sin red de apoyo |

### 2.8 Seguimiento Post-egreso

| # | Dolor | Quién lo siente | Impacto |
|---|-------|-----------------|---------|
| P1 | El paciente no vuelve a consulta tras el alta | Clínico | Recaída, reingreso |
| P2 | No hay registro de quién cumplió el plan post-alta | Coordinación | Brecha en continuidad |
| P3 | El paciente no tiene cómo contactar si siente que va a recaer | Paciente | Crisis evitable |
| P4 | Las familias no saben a quién llamar tras el alta | Familiar | Desorientación en momento crítico |

### 2.9 Documentación

| # | Dolor | Quién lo siente | Impacto |
|---|-------|-----------------|---------|
| D1 | Llenar la historia clínica toma más tiempo que la consulta | Clínico | Burnout, menos pacientes |
| D2 | La nota clínica no tiene estructura homogénea | Coordinación | Auditoría difícil |
| D3 | Pierdo tiempo buscando información del paciente en papel | Clínico | Ineficiencia asistencial |
| D4 | Los documentos de preadmisión se reciben por WhatsApp sin organización | Admisiones | Caos documental |

### 2.10 RIPS / Facturación

| # | Dolor | Quién lo siente | Impacto |
|---|-------|-----------------|---------|
| R1 | Los RIPS tienen errores que generan glosas | Facturación | Pérdida de ingresos |
| R2 | La generación de RIPS es manual y tardía | Facturación | Riesgo de incumplimiento |
| R3 | No hay validación automática antes de enviar | Facturación | Reproceso constante |
| R4 | La facturación no tiene visibilidad gerencial en tiempo real | Gerencia | Decisiones sin datos |

### 2.11 Reputación y Confianza Digital

| # | Dolor | Quién lo siente | Impacto |
|---|-------|-----------------|---------|
| REP1 | La web tiene Lorem ipsum — parece abandonada | Visitante nuevo | Desconfianza inmediata |
| REP2 | No hay reseñas ni testimonios verificados | Tomador de decisión | Sin prueba social |
| REP3 | No aparecemos primero en Google cuando buscan salud mental Villavicencio | Gerencia | Fuga de leads |
| REP4 | No hay contenido educativo que posicione a SAMEN como experto | Comunidad | Oportunidad de referencia perdida |

---

## 3. MAPA DE PROCESOS REPETITIVOS (Candidatos a Automatización)

### 3.1 Entrada por canal

**Proceso actual:** Llamada o correo → alguien responde si puede → sin registro
**Volumen estimado:** 15-40 interacciones diarias (subutilizadas)
**Automatizable:** SÍ — 80% del primer contacto es preguntable/orientable sin humano

```
Canal entrante (web/WA/tel)
    → ¿Es urgencia? → Sí → Protocolo urgencias → Humano inmediato
                   → No → Clasificación de servicio → Orientación + agenda
```

### 3.2 Clasificación inicial

**Proceso actual:** Recepción pregunta, orienta, sin protocolo escrito
**Repetitividad:** Alta — mismas 5-8 preguntas para el 90% de los casos
**Automatizable:** SÍ — árbol de decisión administrativo (NO clínico)

Preguntas tipo:
- ¿Tiene EPS o viene particular?
- ¿Es para usted o un familiar?
- ¿Es urgente o puede esperar agenda?
- ¿Ha sido paciente antes?
- ¿Qué tipo de atención busca?

### 3.3 Solicitud / Agenda

**Proceso actual:** Llamada → agenda manual en papel o Excel → confirmación verbal
**Riesgo:** Alto no-show, sin trazabilidad, sin recordatorio
**Automatizable:** SÍ — integración con sistema de agenda + confirmación automática

```
Solicitud de cita
    → Verificación de disponibilidad (API agenda)
    → Selección de slot
    → Confirmación por WhatsApp/SMS
    → Recordatorio 24h antes
    → Recordatorio 2h antes
    → Post-consulta: encuesta + próxima cita
```

### 3.4 Preadmisión

**Proceso actual:** Llegada al día del servicio → formularios en papel → espera
**Riesgo:** Cuello de botella, información incompleta, mala experiencia
**Automatizable:** SÍ — portal web de preadmisión con validación de campos

Datos recolectables en preadmisión:
- Datos personales y de contacto
- Tipo de aseguramiento (EPS, particular, ARL, SOAT)
- Motivo de consulta (texto libre, no diagnóstico)
- Medicamentos actuales
- Contacto de acudiente
- Documentos adjuntos (foto cédula, carnet EPS)

### 3.5 Recolección de documentos

**Proceso actual:** WhatsApp informal → foto de documentos → pérdida en chats
**Riesgo:** Documentos incompletos, datos sensibles sin cifrado
**Automatizable:** SÍ — formulario seguro con carga de archivos + validación

### 3.6 Seguimiento

**Proceso actual:** Sin protocolo — depende de la iniciativa del profesional
**Riesgo:** Abandono de tratamiento, no-show crónico
**Automatizable:** SÍ — flujos automatizados por tipo de servicio

```
Post-consulta (día 1): "¿Cómo se siente? Recuerde su próxima cita el [fecha]"
Post-consulta (día 3): Encuesta de satisfacción
Post-alta hospitalaria (semana 1): Verificación de seguimiento
Post-alta hospitalaria (semana 4): Recordatorio de control
```

### 3.7 Reprogramación

**Proceso actual:** Llamada → búsqueda manual de disponibilidad → nueva agenda
**Riesgo:** Abandono si el proceso es difícil
**Automatizable:** SÍ — self-service de reprogramación por WhatsApp/web

### 3.8 Referencia interna

**Proceso actual:** Nota en historia → llamada entre servicios → agenda nueva
**Riesgo:** Pérdida del paciente entre servicios (ej: medicina general → psiquiatría)
**Automatizable:** PARCIALMENTE — notificación automática + pre-agenda sugerida

### 3.9 Control post-consulta

**Proceso actual:** Sin protocolo sistemático
**Riesgo:** Resultados de exámenes sin seguimiento, evolución sin monitoreo
**Automatizable:** SÍ — alertas a equipo clínico por condición del paciente

### 3.10 Facturación y calidad

**Proceso actual:** Manual, tardío, con errores
**Riesgo:** Glosas, incumplimiento regulatorio
**Automatizable:** PARCIALMENTE — validación de RIPS asistida por IA antes del envío

---

## 4. ARQUITECTURA SAMEN FLOW POR MÓDULOS

### Visión general del sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                        SAMEN FLOW                               │
│          Sistema de Acceso, Navegación y Continuidad            │
├──────────────────┬──────────────────┬───────────────────────────┤
│   CAPA PÚBLICA   │  CAPA OPERATIVA  │    CAPA CLÍNICA           │
│  (Paciente/Fam)  │  (Administrativa)│  (Equipo asistencial)     │
├──────────────────┼──────────────────┼───────────────────────────┤
│ M1. Landing pages│ M4. Portal       │ M6. Panel de continuidad  │
│ M2. Agente guía  │    preadmisión   │ M7. Copiloto documentación│
│ M3. Triage admin │ M5. CRM leads    │ M8. Alertas seguimiento   │
│                  │    y pacientes   │                           │
├──────────────────┴──────────────────┴───────────────────────────┤
│              CAPA GERENCIAL Y DE INTEGRACIONES                   │
│         M9. Analítica gerencial | M10. HCE/Agenda/RIPS          │
│                   M11. Seguridad y trazabilidad                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### M1 — Landing Pages por Servicio

**Propósito:** Convertir visitantes en leads calificados con contenido específico por ruta de atención.

**Páginas a construir:**
- `/urgencias` — Estoy en crisis ahora mismo
- `/hospitalizacion/salud-mental` — Necesito hospitalización para mí o un familiar
- `/hospitalizacion/adicciones` — Mi familiar tiene un problema con sustancias
- `/consulta-externa/psiquiatria` — Quiero una cita con psiquiatría
- `/consulta-externa/psicologia` — Quiero apoyo psicológico
- `/familias` — Soy familiar y quiero entender cómo ayudar

**Elementos de cada landing:**
- Headline empático y específico (no institucional)
- Explicación del proceso en 3 pasos visuales
- CTA primario visible: "Agendar ahora" / "Hablar con alguien"
- FAQ del servicio específico
- Testimonio o frase (sin datos clínicos identificables)
- Formulario de contacto rápido o botón WhatsApp
- Credenciales: habilitación, equipo, tiempo de respuesta

**Stack sugerido:** Next.js / Astro + Tailwind + Vercel

---

### M2 — Agente Guía Web y WhatsApp

**Propósito:** Primer punto de contacto 24/7 que orienta, clasifica y conecta. No diagnostica, no toma decisiones clínicas.

**Canales:**
- Chat widget en el sitio web
- WhatsApp Business API (número dedicado)
- Opcional: Instagram DM

**Árbol de conversación principal:**

```
Bienvenida → ¿Cuál es tu situación?
├── "Estoy en crisis / es urgente"
│       → Protocolo urgencias → Número directo humano + ubicación
├── "Busco hospitalización para mí o un familiar"
│       → ¿Salud mental o consumo de sustancias?
│       → Explicación del proceso → Formulario preadmisión → CRM
├── "Quiero una cita ambulatoria"
│       → ¿Qué especialidad? → Disponibilidad → Agenda
├── "Soy familiar y tengo preguntas"
│       → Ruta de orientación → Material educativo → Agenda
└── "Otra consulta"
        → Derivación a recepción humana con contexto
```

**Reglas del agente:**
- Nunca da diagnósticos ni interpreta síntomas clínicamente
- Siempre deriva urgencias a humano
- Recoge datos básicos (nombre, contacto, servicio de interés)
- Informa tiempos de espera realistas
- Escala a humano si el usuario muestra señales de angustia severa

**Tecnología:** Twilio / WhatsApp Business API + n8n o Make para automatización + Claude API para comprensión de lenguaje natural

---

### M3 — Triage Administrativo y Orientación

**Propósito:** Formulario inteligente que determina la ruta correcta del paciente ANTES de que llegue.

**Diferencia crítica con triage clínico:** Este módulo NO evalúa síntomas clínicos. Solo determina:
- ¿A qué servicio corresponde?
- ¿Con qué urgencia?
- ¿Qué documentos debe traer?
- ¿Qué debe esperar del proceso?

**Flujo:**
```
Formulario web (5-7 preguntas)
    → Procesamiento → Clasificación administrativa
    → Resultado: "Su caso corresponde a [servicio]"
              + "Próximos pasos: [lista]"
              + "Documentos necesarios: [lista]"
              + CTA: Agendar / Continuar preadmisión
```

**Disclaimers obligatorios:**
- "Esta orientación es administrativa, no clínica"
- "Para evaluación médica, consulte con nuestro equipo"
- "En caso de emergencia, llame a urgencias o al 123"

---

### M4 — Portal de Preadmisión

**Propósito:** Recolectar información del paciente ANTES de llegar, eliminando el papeleo en recepción.

**Secciones del portal:**
1. Datos del paciente (nombre, documento, fecha nacimiento, dirección)
2. Datos de acudiente/responsable
3. Información de aseguramiento (EPS, régimen, número de póliza)
4. Motivo de consulta (campo libre, sin estructura diagnóstica)
5. Medicamentos actuales (texto libre + imagen de fórmula)
6. Antecedentes relevantes declarados (solo los que el paciente quiere compartir)
7. Carga de documentos (cédula, carnet EPS, órdenes médicas)
8. Firma de consentimiento de tratamiento de datos (HABEAS DATA)
9. Autorización para contacto de seguimiento

**Requisitos técnicos:**
- Cifrado en tránsito y en reposo (TLS 1.3 + AES-256)
- Cumplimiento Ley 1581 de 2012 (Protección de Datos Colombia)
- Acceso con enlace único por paciente (no requiere registro)
- Guardado progresivo (el formulario no se pierde si se interrumpe)
- Acceso del personal con roles diferenciados

---

### M5 — CRM de Pacientes y Leads

**Propósito:** Centralizar todos los contactos, convertir leads en pacientes, y hacer seguimiento de la relación.

**Vistas principales:**
- **Leads nuevos:** personas que contactaron pero no han agendado
- **Pacientes activos:** con cita o tratamiento en curso
- **Pacientes en seguimiento:** post-consulta o post-alta
- **Inactivos/en riesgo:** sin contacto reciente, potencial abandono

**Por cada contacto, el CRM registra:**
- Canal de origen (web, WhatsApp, referido, etc.)
- Servicio de interés
- Estado en el funnel
- Historial de interacciones
- Citas agendadas / asistidas / canceladas
- Alertas activas
- Notas del equipo administrativo

**Automatizaciones integradas:**
- Lead sin respuesta en 2h → alerta a coordinador
- Cita próxima en 24h → recordatorio automático
- No-show → secuencia de reenganche
- Post-alta D1, D7, D30 → check-in automático

**Tecnología sugerida:** HubSpot (versión salud) / Salesforce Health Cloud / CRM propio en Supabase + Next.js

---

### M6 — Panel de Continuidad del Cuidado

**Propósito:** Dar al equipo clínico y coordinadores una vista unificada del journey del paciente.

**Vista del paciente:**
```
[Foto] Juan Pérez | Psiquiatría | Activo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Última consulta: hace 12 días
Próxima cita: 5 de mayo, 10am — Dr. García
Estado plan de tratamiento: En progreso (sesión 4/12)
Alertas: ⚠️ No asistió a consulta de seguimiento
Acudiente: María Rodríguez | 311-xxx-xxxx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Historial] [Documentos] [Notas] [Contactar]
```

**Tablero gerencial:**
- Pacientes hospitalizados hoy
- Citas de la semana / tasa de asistencia
- Pacientes en riesgo de abandono
- Días promedio de hospitalización
- Capacidad disponible por servicio

**Restricción:** Este panel NO reemplaza la HCE. Es una capa de coordinación sobre ella.

---

### M7 — Copiloto de Documentación Clínica

**Propósito:** Reducir el tiempo que los profesionales invierten en documentación sin comprometer la calidad.

**Funcionalidades:**
- **Transcripción asistida:** El clínico dicta o habla, el sistema transcribe y estructura en formato SOAP (Subjetivo, Objetivo, Análisis, Plan)
- **Autocompletado contextual:** Sugiere texto basado en el tipo de consulta y el historial
- **Validación de campos:** Alerta si faltan datos obligatorios para RIPS
- **Plantillas por especialidad:** Psiquiatría, Psicología, Medicina General, Enfermería
- **Revisión antes de firma:** El clínico revisa, corrige y firma digitalmente

**Restricciones críticas:**
- TODO texto clínico es revisado y firmado por el profesional
- El sistema NUNCA genera diagnósticos autónomamente
- Cualquier sugerencia de CIE-10 es una propuesta que el clínico acepta/rechaza
- Registro de auditoría de todos los cambios

**Tecnología:** Claude API (modo asistido, no autónomo) + HCE integración via API

---

### M8 — Alertas y Seguimiento Post-egreso

**Propósito:** Prevenir recaídas y mantener la continuidad del cuidado después del alta hospitalaria o la consulta.

**Protocolo post-alta hospitalaria:**

```
Día 0 (alta): 
  → Resumen del plan de egreso por WhatsApp al paciente y acudiente
  → Fecha de próxima cita confirmada
  → Número de contacto para emergencias

Día 1:
  → "¿Cómo se encuentra hoy? ¿Hay algo que necesite?"
  → Si responde alarma → protocolo de escalamiento a clínico

Día 3:
  → Encuesta breve de bienestar (3 preguntas, escala simple)
  → Si indicador bajo → alerta a coordinador clínico

Semana 2:
  → Recordatorio de cita de control
  → Material de apoyo psicoeducativo (familia)

Mes 1:
  → Check-in de continuidad
  → ¿Asistió a los controles? → Si no → reenganche

```

**Protocolo post-consulta ambulatoria:**
```
Mismo día: Confirmación de lo conversado (resumen no clínico)
24h: Recordatorio de recomendaciones
7 días: "¿Cómo va con el plan que acordaron?"
Antes de próxima cita: Recordatorio + preparación
```

**Reglas de escalamiento:**
- Respuesta con palabras clave de crisis → alerta inmediata a clínico de turno
- Sin respuesta en 3 días post-alta → llamada de seguimiento humano
- 2+ no-shows → caso de reenganche activo

---

### M9 — Analítica Gerencial

**Propósito:** Dashboard ejecutivo para toma de decisiones basada en datos, no en intuición.

**Métricas en tiempo real:**
- Ocupación hospitalaria (camas disponibles vs. ocupadas)
- Citas del día: programadas / confirmadas / no-show / reagendadas
- Leads entrantes por canal (hoy / semana / mes)
- Tasa de conversión lead → cita → consulta

**Métricas semanales:**
- Nuevos pacientes por servicio
- Tiempo promedio de respuesta al primer contacto
- Tasa de preadmisión completada
- Ingresos por servicio

**Métricas mensuales:**
- Pacientes retenidos (continuidad de tratamiento)
- Tasa de reingreso hospitalario
- Satisfacción del paciente (NPS)
- Inconsistencias en RIPS detectadas y corregidas

**Formato:** Dashboard web accesible para gerencia, con exportación a PDF/Excel. Acceso con autenticación de doble factor.

---

### M10 — Integración con HCE, Agenda y Facturación

**Propósito:** SAMEN Flow no reemplaza estos sistemas — se conecta a ellos.

**Integraciones clave:**

| Sistema | Tipo de integración | Datos que fluyen |
|---------|---------------------|------------------|
| HCE (ej: Medilink, HelsiAtlas, propio) | API bidireccional | Datos del paciente, citas, documentos de preadmisión |
| Sistema de agenda | API lectura/escritura | Disponibilidad, creación de citas, recordatorios |
| Sistema de facturación | API lectura + webhook | Validación de RIPS, estado de facturación |
| WhatsApp Business API | Webhook bidireccional | Mensajes entrantes/salientes |
| Correo corporativo | SMTP/API | Notificaciones, resúmenes, reportes |

**Estrategia de integración:**
- Si SAMEN ya tiene sistemas: integración via API o middleware (n8n/Make)
- Si no tiene HCE estructurada: proponer módulo básico como parte del proyecto
- Siempre con contratos de datos y acuerdos de procesamiento (DPA) firmados

---

### M11 — Capa de Seguridad y Trazabilidad

**Propósito:** Garantizar el manejo adecuado de datos sensibles de salud en cumplimiento con la normativa colombiana.

**Requisitos regulatorios aplicables:**
- Ley 1581 de 2012 — Protección de Datos Personales
- Decreto 1377 de 2013 — Habeas Data en salud
- Resolución 1995 de 1999 — Historia Clínica
- Circular 030 de 2022 MINSALUD — Interoperabilidad y seguridad
- FEV-RIPS — Formato Estándar de Validación de RIPS

**Medidas técnicas:**
- Cifrado en tránsito: TLS 1.3
- Cifrado en reposo: AES-256
- Autenticación: MFA para todo el personal
- Control de acceso basado en roles (RBAC): clínico / administrativo / gerencia / familia
- Logs de auditoría inmutables para toda acción sobre datos de pacientes
- Backups cifrados con retención de 10 años (según normativa HC)
- Política de retención y eliminación de datos por canal (WhatsApp, formularios)

**Principios de diseño:**
- Privacy by design: solo se recogen los datos necesarios
- Consentimiento explícito antes de cualquier recolección
- El paciente puede solicitar acceso, corrección o eliminación de sus datos
- Los datos de salud NUNCA se usan para fines comerciales sin consentimiento

---

## 5. CASOS DE USO PRIORIZADOS

### CU-01: Familiar busca hospitalización a las 10pm

**Problema:** María busca en Google "hospitalización salud mental Villavicencio", llega al sitio de SAMEN a las 10pm. No entiende cómo proceder. Nadie responde el celular. Se va.

**Cómo funciona con SAMEN Flow:**
1. Landing `/hospitalizacion/salud-mental` con CTA claro
2. Agente WhatsApp disponible 24/7 responde en <2 minutos
3. Recolecta información básica (para quién, urgencia, aseguramiento)
4. Si es urgente → protocolo de urgencias con contacto humano
5. Si puede esperar → formulario de preadmisión + agenda para valoración
6. CRM registra el lead con toda la información
7. Al día siguiente, coordinador confirma y da continuidad

**Impacto esperado:** Captura del 70-80% de leads nocturnos que hoy se pierden
**Complejidad:** Media
**Riesgo:** Bajo (no hay decisión clínica en este flujo)
**Dependencia tecnológica:** WhatsApp Business API + Agente + CRM

---

### CU-02: Paciente en consulta externa olvida cita

**Problema:** Carlos tiene cita con psiquiatría pero no recibe recordatorio y no asiste. La cita se pierde. SAMEN pierde ingreso y Carlos pierde continuidad.

**Cómo funciona:**
1. Al agendar, Carlos recibe confirmación por WhatsApp
2. 24h antes: recordatorio automático con opción de confirmar o reagendar
3. 2h antes: recordatorio final
4. Si no confirma en 4h → alerta a recepción para llamada humana
5. Si no asiste → secuencia de reenganche (D1, D3, D7)
6. CRM marca el no-show con la causa (si se recolecta)

**Impacto esperado:** Reducción del no-show del 25-35% estimado actual a menos del 10%
**Complejidad:** Baja
**Riesgo:** Bajo
**Dependencia tecnológica:** WhatsApp API + integración con agenda

---

### CU-03: Clínico ahorra tiempo en documentación

**Problema:** La Dra. López pasa 20 minutos por consulta documentando en papel. Atiende 8 pacientes, pierde 2.5h solo en documentación.

**Cómo funciona:**
1. Dra. López dicta la nota de evolución en voz
2. Sistema transcribe y estructura en formato SOAP
3. Sistema sugiere código CIE-10 basado en el texto (propuesta, no diagnóstico automático)
4. Dra. López revisa, corrige en 2 minutos y firma digitalmente
5. Nota queda en HCE con registro de autor, fecha, hora

**Impacto esperado:** Documentación de 20 min → 3-5 min. Capacidad de atender 2-3 pacientes más por día.
**Complejidad:** Alta (integración con HCE + IA de transcripción)
**Riesgo:** Medio (requiere validación clínica rigurosa, protocolo de revisión)
**Dependencia tecnológica:** Claude API + integración HCE + Audio-to-text (Whisper)

---

### CU-04: Seguimiento post-alta hospitalaria

**Problema:** Pedro es dado de alta tras 21 días de hospitalización por SPA. Recibe un papel con instrucciones. En 30 días, recae. No vuelve a SAMEN.

**Cómo funciona:**
1. Al alta, se activa automáticamente el protocolo de seguimiento en el CRM
2. D1: WhatsApp "¿Cómo se encuentra hoy? ¿Pudo descansar bien?"
3. D3: Encuesta de bienestar + recordatorio de cita de control
4. Si respuesta con palabras de alarma → alerta inmediata a clínico de turno
5. Semana 2: Material psicoeducativo para la familia (enviado al acudiente)
6. Mes 1: Check-in de continuidad + verificación de asistencia a controles
7. Si no asiste a controles → llamada humana de reenganche

**Impacto esperado:** Reducción de reingresos por abandono de tratamiento en 20-30%
**Complejidad:** Media
**Riesgo:** Medio (manejo de crisis debe escalar a humano, no resolverse por bot)
**Dependencia tecnológica:** WhatsApp API + CRM + Protocolos clínicos definidos

---

### CU-05: Familiar de paciente hospitalizado sin información

**Problema:** La mamá de Sofía llama 4 veces al día preguntando cómo está su hija. El personal clínico pierde tiempo respondiendo, y la mamá siente que no la informan.

**Cómo funciona:**
1. Al ingresar Sofía, se registra el acudiente autorizado en el sistema
2. Acudiente recibe acceso a portal de familiares (solo lectura de información autorizada por el equipo)
3. Portal muestra: estado general (bien/estable/en proceso) definido por enfermería, próxima cita de valoración familiar, materiales de apoyo psicoeducativo
4. Cambios de estado activan notificación automática al acudiente
5. Canal de mensajes directos con coordinadora de hospitalización (no con clínicos)

**Impacto esperado:** Reducción del 60-70% de llamadas informativas. Mejora drástica en satisfacción familiar.
**Complejidad:** Media
**Riesgo:** Bajo-Medio (requiere protocolos claros de qué información se comparte)
**Dependencia tecnológica:** Portal web con autenticación + CRM + WhatsApp notificaciones

---

### CU-06: Validación de RIPS antes del envío

**Problema:** El departamento de facturación envía RIPS con errores que generan glosas de la EPS. Reproceso, demoras en pago, pérdida de ingresos.

**Cómo funciona:**
1. Al generar el RIPS, el sistema lo valida contra el esquema FEV-RIPS antes de enviar
2. Sistema identifica campos vacíos, formatos incorrectos, códigos CIE-10 inválidos
3. Genera reporte de inconsistencias para que facturación corrija
4. Solo permite el envío cuando el RIPS pasa la validación
5. Registro de cada validación y corrección para auditoría

**Impacto esperado:** Reducción de glosas en 50-70%. Pagos más rápidos.
**Complejidad:** Media (requiere conocimiento del esquema FEV-RIPS)
**Riesgo:** Bajo-Medio (el humano siempre revisa antes del envío final)
**Dependencia tecnológica:** Validador de esquema FEV-RIPS + integración sistema de facturación

---

## 6. ROADMAP EN 3 FASES

### FASE 1: Conversión y Acceso (Meses 1-3)
*Objetivo: Capturar leads que hoy se pierden y dar primera respuesta digna*

| Semana | Entregable | Módulo |
|--------|-----------|--------|
| 1-2 | Auditoría del sitio actual + corrección Lorem ipsum | Base |
| 2-3 | Landing pages por servicio (urgencias, hospitalización, CE) | M1 |
| 3-4 | WhatsApp Business configurado + flujo básico de orientación | M2 |
| 4-5 | Formulario de contacto/preadmisión básico + CRM inicial | M4 + M5 |
| 5-6 | Recordatorio automático de citas (D-1, D-1h) | M2 + M5 |
| 6-8 | Triage administrativo básico (árbol de preguntas) | M3 |
| 8-10 | Capacitación al equipo en el nuevo flujo | — |
| 10-12 | Medición, ajuste y estabilización | M9 básico |

**KPIs de fase 1:**
- Tiempo de primera respuesta: <15 min en horario laboral, <2h fuera de horario
- Leads capturados vs. mes anterior: +40%
- Tasa de no-show: reducción del 15%
- Preadmisión completada: >50% de pacientes nuevos

---

### FASE 2: Seguimiento y Continuidad (Meses 4-7)
*Objetivo: Retener pacientes, mejorar continuidad, reducir abandono*

| Semana | Entregable | Módulo |
|--------|-----------|--------|
| 13-15 | Protocolo de seguimiento post-consulta automatizado | M8 |
| 15-17 | Protocolo de seguimiento post-alta hospitalaria | M8 |
| 17-19 | Portal básico de familiares (acceso a info autorizada) | M6 |
| 19-21 | Panel de continuidad para coordinadores | M6 |
| 21-23 | Dashboard gerencial básico (ocupación, citas, leads) | M9 |
| 23-26 | Sistema de alertas y escalamiento | M8 + M5 |
| 26-28 | Refinamiento basado en feedback del equipo | — |

**KPIs de fase 2:**
- Pacientes reenganchados post-no-show: >30%
- Reducción de reingresos hospitalarios: -20%
- Satisfacción familiar (encuesta): NPS > 40
- Tiempo promedio de respuesta a acudientes: <4h

---

### FASE 3: Operación Clínica y Administrativa (Meses 8-12)
*Objetivo: Eficiencia interna, calidad documental, integraciones profundas*

| Semana | Entregable | Módulo |
|--------|-----------|--------|
| 29-32 | Integración con HCE (lectura de datos de paciente) | M10 |
| 32-35 | Copiloto de documentación clínica (transcripción + estructura) | M7 |
| 35-38 | Validador de RIPS pre-envío | M10 + M11 |
| 38-40 | Integración con sistema de facturación | M10 |
| 40-44 | Dashboard gerencial completo con analítica avanzada | M9 |
| 44-48 | Auditoría de seguridad + cumplimiento regulatorio | M11 |
| 48-52 | Cierre, documentación, plan de crecimiento año 2 | — |

**KPIs de fase 3:**
- Tiempo de documentación clínica: reducción del 60%
- Glosas RIPS: reducción del 50%
- Capacidad adicional de atención por profesional: +2-3 pacientes/día
- Cumplimiento regulatorio en auditoría: 95%+

---

## 7. KPIs PROPUESTOS

### Panel de KPIs — SAMEN Flow

| KPI | Definición | Meta Inicial | Frecuencia |
|-----|-----------|-------------|-----------|
| **Lead a cita** | % de leads que convierten a cita agendada | >45% | Semanal |
| **Tiempo de respuesta** | Minutos desde contacto hasta primera respuesta | <15 min (horario) | Diario |
| **Tasa de no-show** | % citas con paciente ausente sin aviso | <10% | Semanal |
| **Tasa de reagenda** | % no-shows que se reagendan dentro de 7 días | >40% | Semanal |
| **Tiempo de admisión** | Minutos desde llegada hasta inicio de atención | <20 min con preadmisión | Mensual |
| **Preadmisión completa** | % pacientes con preadmisión antes de llegar | >60% (mes 3), >85% (mes 6) | Mensual |
| **Pacientes reenganchados** | # pacientes inactivos contactados que vuelven | Meta: 10/mes en fase 2 | Mensual |
| **Tiempo de documentación** | Minutos por nota clínica (baseline vs. con copiloto) | <5 min (vs. 20 actual) | Mensual |
| **Inconsistencias RIPS evitadas** | # errores detectados antes del envío | >90% de errores identificados | Por ciclo |
| **Satisfacción paciente/familia** | NPS o CSAT en encuesta post-consulta | NPS > 50 en mes 6 | Mensual |

---

## 8. PITCH COMERCIAL

### 8.1 Propuesta de valor (1 párrafo)

SAMEN Flow es el sistema que convierte la clínica en una institución que nunca deja ir a un paciente sin respuesta. Cada vez que una familia busca ayuda en salud mental en Villavicencio, SAMEN les responde en minutos, les orienta sin confusión, les acompaña hasta la cita y no los suelta cuando salen. Mientras los demás centros pierden pacientes por falta de seguimiento, SAMEN construye una relación continua que aumenta la adherencia al tratamiento, reduce los reingresos evitables y multiplica la confianza institucional — todo sin aumentar la carga del equipo clínico, porque el sistema trabaja mientras ellos se enfocan en atender.

---

### 8.2 Speech de 90 segundos

*"Hoy, cuando alguien busca hospitalización en salud mental para un familiar a las 9 de la noche en Villavicencio, llega al sitio de SAMEN, no entiende qué hacer, intenta llamar, nadie contesta, y se va a otra clínica. Eso pasa todos los días.*

*SAMEN Flow resuelve eso. Es un sistema de automatización inteligente diseñado específicamente para clínicas de salud mental en Colombia. Lo que hace es simple: captura cada contacto que llega a SAMEN, lo orienta de forma inmediata, lo acompaña durante el proceso de admisión y no lo suelta tras el alta.*

*Hablamos de un agente 24/7 en WhatsApp que responde, orienta y agenda. Un portal de preadmisión que elimina 45 minutos de papelería en recepción. Recordatorios automáticos que reducen el no-show a la mitad. Y un seguimiento post-egreso que previene recaídas y reingresos evitables.*

*Lo construimos en tres fases, sin interrumpir la operación, cumpliendo Ley 1581, RIPS y habilitación. Y al final del año, SAMEN tiene datos reales de cuántos pacientes captó, cuántos retuvo, y cuánto creció su capacidad sin contratar más personal.*

*Esto no es tecnología por la tecnología. Es la infraestructura digital que una clínica privada de salud mental necesita para crecer en Colombia en 2025."*

---

### 8.3 Objeciones y respuestas

| Objeción | Respuesta |
|----------|-----------|
| "Somos pequeños para esto" | SAMEN Flow escala. La Fase 1 (landing + WhatsApp + recordatorios) se implementa en 12 semanas y recupera la inversión con 3-4 pacientes adicionales por mes. |
| "¿Y si la IA comete errores clínicos?" | SAMEN Flow no toma decisiones clínicas. Nunca. Es un sistema administrativo y de orientación. Todo lo clínico tiene validación humana obligatoria y firma del profesional. |
| "Ya tenemos WhatsApp y correo" | Hoy tienen contacto. SAMEN Flow tiene trazabilidad, automatización y datos. La diferencia es si pueden saber cuántos leads se perdieron la semana pasada y por qué. |
| "¿Cumple regulación colombiana?" | Diseñado para cumplir Ley 1581, Habeas Data en salud, esquema FEV-RIPS y normativa de Historia Clínica. Entregamos documentación de cumplimiento. |
| "¿Cuánto cuesta?" | Depende del alcance. La Fase 1 es la más accesible y la que da resultados más rápido. Podemos dimensionarlo sobre el volumen actual de pacientes. |
| "No tenemos equipo técnico interno" | No necesitan uno. El sistema se entrega documentado, capacitamos al equipo y ofrecemos soporte. La operación es en la nube. |
| "¿Cuánto tiempo toma?" | Fase 1 en 12 semanas. Primeros resultados en 4-6 semanas desde el arranque. |

---

### 8.4 Las 10 funcionalidades más vendibles

1. **Agente WhatsApp 24/7** — Responde a las 2am cuando una familia está en crisis
2. **Recordatorio automático de citas** — Corta el no-show a la mitad sin esfuerzo del equipo
3. **Preadmisión digital** — Elimina el papeleo del día de llegada, paciente llega listo
4. **Portal de familiares** — El acudiente sabe el estado de su familiar sin llamar 4 veces al día
5. **Seguimiento post-alta** — Protocolo automático que previene recaídas y reingresos
6. **Landing pages por servicio** — Urgencias, SPA, psiquiatría, psicología — cada uno con su ruta clara
7. **CRM de pacientes y leads** — Por primera vez saben cuántos contactos llegaron y cuántos se perdieron
8. **Panel gerencial en tiempo real** — Ocupación, citas, ingresos, todo en una pantalla
9. **Validador de RIPS** — Encuentra errores antes del envío, elimina glosas
10. **Copiloto de documentación** — El médico dicta, el sistema estructura — documentación en 4 minutos

---

### 8.5 Versión ejecutiva para presentar a Gerencia / Junta

**SAMEN Flow en una página:**

```
PROBLEMA:
SAMEN tiene servicios de calidad pero una infraestructura digital que pierde 
pacientes antes de que lleguen, no los retiene después de que salen, 
y no genera los datos que gerencia necesita para tomar decisiones.

SOLUCIÓN:
SAMEN Flow es el sistema digital que cierra esas brechas en tres frentes:
• CAPTACIÓN: Respuesta 24/7, orientación automática, agendamiento online
• CONTINUIDAD: Seguimiento post-consulta, post-alta, protocolo anti-abandono
• OPERACIÓN: Documentación asistida, RIPS validados, analítica gerencial

IMPLEMENTACIÓN:
• Fase 1 (meses 1-3): Captación y acceso — ROI visible en 60 días
• Fase 2 (meses 4-7): Seguimiento y continuidad
• Fase 3 (meses 8-12): Operación clínica y administrativa

INVERSIÓN Y RETORNO:
• Con 4 pacientes adicionales por mes en hospitalización, la fase 1 se paga sola
• La reducción de no-show libera ingresos sin costo adicional
• La documentación asistida recupera 2-3 horas diarias por profesional

CUMPLIMIENTO:
Diseñado para Ley 1581, RIPS-FEV, Habilitación MINsalud.
Toda decisión clínica permanece en manos del equipo médico.
```

---

## 9. ANEXO TÉCNICO — STACK RECOMENDADO

### Frontend y comunicación pública
- **Next.js 14** (App Router) — Landing pages, portal de preadmisión, portal de familiares
- **Tailwind CSS** — Estilos, sistema de diseño propio (NO plantillas genéricas)
- **Vercel** — Hosting y CDN

### Backend y automatización
- **Supabase** — Base de datos PostgreSQL + autenticación + storage cifrado
- **n8n** (self-hosted) o **Make** — Automatización de flujos (recordatorios, alertas, secuencias)
- **WhatsApp Business API** (via Twilio o Meta directa) — Canal de comunicación principal

### IA y lenguaje natural
- **Claude API (Anthropic)** — Agente conversacional + copiloto de documentación
- **Whisper (OpenAI)** — Transcripción de audio para dictado clínico
- **Embeddings** — Base de conocimiento de SAMEN para preguntas frecuentes

### Monitoreo y seguridad
- **Sentry** — Monitoreo de errores
- **Datadog / Grafana** — Métricas de sistema
- **Vault (HashiCorp)** — Gestión de secretos y credenciales
- **Audit logs** — PostgreSQL con filas inmutables para trazabilidad clínica

### Integraciones
- **HCE existente**: Integración via API REST o HL7 FHIR si disponible
- **Sistema de agenda**: Google Calendar API (si usan) o API propietaria
- **Facturación/RIPS**: Módulo de validación FEV + integración sistema existente

---

*Documento generado por: Consultor Senior Healthtech + Arquitecto IA + Estratega B2B*
*Para continuar este proyecto con ANTIGRAVITY u otro agente: leer este documento completo, mantener las restricciones clínicas y regulatorias, y preservar la voz consultiva y vendible de la propuesta.*
*Versión: 1.0 | Fecha: 2025 | Proyecto: SAMEN Flow para SAMEN IPS — Villavicencio, Colombia*
