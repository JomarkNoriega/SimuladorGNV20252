'use client';

import { useMemo, useState } from 'react';
import tabla from '../src/data/tablaBase.json';
import { moneda } from '../src/components/format';

const seguros = [
  { key:'sinSeguro', label:'Sin seguro' },
  { key:'conSeguroVida', label:'Con Seguro Vida' },
  { key:'seguroVidaRuta', label:'Seguro Vida + Ruta' },
  { key:'seguroVidaRutSolidario', label:'Seguro Vida + RUT + Solidario' },
];

const actividades = ['INFORMAL','FORMAL/APP'];
const montosDisponibles = (act) => {
  const set = new Set(tabla.filter(x => x.actividad === act).map(x => x.monto));
  return [...set];
};
const plazosDisponibles = (act, monto) => {
  return tabla.filter(x => x.actividad === act && x.monto === monto).map(x => x.plazo).sort((a,b)=>b-a);
};

export default function Page(){
  const [actividad, setActividad] = useState('INFORMAL');
  const [monto, setMonto] = useState(montosDisponibles('INFORMAL')[0]);
  const [plazo, setPlazo] = useState(plazosDisponibles('INFORMAL', montosDisponibles('INFORMAL')[0])[0]);
  const [seguro, setSeguro] = useState('sinSeguro');

  const opcionesMonto = useMemo(()=>montosDisponibles(actividad), [actividad]);
  const opcionesPlazo = useMemo(()=>plazosDisponibles(actividad, monto), [actividad, monto]);

  const fila = useMemo(()=> {
    return tabla.find(x => x.actividad === actividad && x.monto === monto && x.plazo === plazo);
  }, [actividad, monto, plazo]);

  const cuota = fila ? fila[seguro] : null;
  const recaudo = fila ? fila.recaudo : '-';

  return (
    <main style={{maxWidth:900, margin:'40px auto', padding:'24px', background:'#111827', borderRadius:16, boxShadow:'0 10px 35px rgba(0,0,0,0.35)'}}>
      <h1 style={{marginTop:0, fontSize:28}}>Simulador GNV</h1>
      <p style={{opacity:.85, marginTop:-6}}>Calcula la cuota según actividad, monto, plazo y tipo de seguro.</p>

      <section style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))', gap:16, marginTop:24}}>
        <div>
          <label>Actividad</label>
          <select value={actividad} onChange={e=>{ setActividad(e.target.value); const m=montosDisponibles(e.target.value)[0]; setMonto(m); const p=plazosDisponibles(e.target.value, m)[0]; setPlazo(p);}}
            style={{width:'100%', padding:10, borderRadius:12, border:'1px solid #334155', background:'#0b1220', color:'#e2e8f0'}}>
            {actividades.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div>
          <label>Monto</label>
          <select value={monto} onChange={e=>{ setMonto(Number(e.target.value)); const p = plazosDisponibles(actividad, Number(e.target.value))[0]; setPlazo(p);}}
            style={{width:'100%', padding:10, borderRadius:12, border:'1px solid #334155', background:'#0b1220', color:'#e2e8f0'}}>
            {opcionesMonto.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label>Plazo</label>
          <select value={plazo} onChange={e=>setPlazo(Number(e.target.value))}
            style={{width:'100%', padding:10, borderRadius:12, border:'1px solid #334155', background:'#0b1220', color:'#e2e8f0'}}>
            {opcionesPlazo.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div>
          <label>Seguro</label>
          <select value={seguro} onChange={e=>setSeguro(e.target.value)}
            style={{width:'100%', padding:10, borderRadius:12, border:'1px solid #334155', background:'#0b1220', color:'#e2e8f0'}}>
            {seguros.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </div>
      </section>

      <section style={{marginTop:24, padding:16, border:'1px dashed #334155', borderRadius:12}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:16, flexWrap:'wrap'}}>
          <div>
            <div style={{fontSize:14, opacity:.8}}>Cuota</div>
            <div style={{fontSize:36, fontWeight:700}}>{moneda(cuota)}</div>
          </div>
          <div>
            <div style={{fontSize:14, opacity:.8}}>% Recaudo</div>
            <div style={{fontSize:28, fontWeight:600}}>{recaudo}</div>
          </div>
        </div>
      </section>

      <details style={{marginTop:24}}>
        <summary style={{cursor:'pointer'}}>Ver tabla base</summary>
        <div style={{overflowX:'auto', marginTop:12}}>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:14}}>
            <thead>
              <tr>
                <th style={th}>ACTIVIDAD</th>
                <th style={th}>MONTO</th>
                <th style={th}>PLAZO</th>
                <th style={th}>SIN SEGURO</th>
                <th style={th}>CON SEGURO VIDA</th>
                <th style={th}>SEGURO VIDA + RUTA</th>
                <th style={th}>SEGURO VIDA + RUT + SOLIDARIO</th>
                <th style={th}>% RECAUDO</th>
              </tr>
            </thead>
            <tbody>
              {tabla.map((r, idx)=> (
                <tr key={idx}>
                  <td style={td}>{r.actividad}</td>
                  <td style={td}>{r.monto}</td>
                  <td style={td}>{r.plazo}</td>
                  <td style={td}>{moneda(r.sinSeguro)}</td>
                  <td style={td}>{moneda(r.conSeguroVida)}</td>
                  <td style={td}>{moneda(r.seguroVidaRuta)}</td>
                  <td style={td}>{moneda(r.seguroVidaRutSolidario)}</td>
                  <td style={td}>{r.recaudo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </main>
  );
}

const th = {
  textAlign:'left', padding:'10px 8px', borderBottom:'1px solid #334155', position:'sticky', top:0, background:'#0b1220'
};
const td = { padding:'10px 8px', borderBottom:'1px solid #1f2937' };
