'use client';
import { useMemo, useState } from 'react';
import tabla from '../src/data/tablaBase.json';
import { moneda } from '../src/components/format';

const seguros=[
  {key:'sinSeguro',label:'Sin seguro'},
  {key:'conSeguroVida',label:'Con Seguro Vida'},
  {key:'seguroVidaRuta',label:'Seguro Vida + Ruta'},
  {key:'seguroVidaRutSolidario',label:'Seguro Vida + RUT + Solidario'},
];
const actividades=['INFORMAL','FORMAL/APP'];
const montosDisponibles=(act)=>[...new Set(tabla.filter(x=>x.actividad===act).map(x=>x.monto))];
const plazosDisponibles=(act,monto)=>tabla.filter(x=>x.actividad===act&&x.monto===monto).map(x=>x.plazo).sort((a,b)=>b-a);

export default function Page(){
  const [actividad,setActividad]=useState('INFORMAL');
  const [monto,setMonto]=useState(montosDisponibles('INFORMAL')[0]);
  const [plazo,setPlazo]=useState(plazosDisponibles('INFORMAL',montosDisponibles('INFORMAL')[0])[0]);
  const [seguro,setSeguro]=useState('sinSeguro');

  const opcionesMonto=useMemo(()=>montosDisponibles(actividad),[actividad]);
  const opcionesPlazo=useMemo(()=>plazosDisponibles(actividad,monto),[actividad,monto]);

  const fila=useMemo(()=>tabla.find(x=>x.actividad===actividad&&x.monto===monto&&x.plazo===plazo),[actividad,monto,plazo]);
  const cuota=fila?fila[seguro]:null;
  const recaudo=fila?fila.recaudo:'-';
  return (<main style={{maxWidth:900,margin:'40px auto',padding:'24px',background:'#111827',borderRadius:16}}>
    <h1 style={{marginTop:0,fontSize:28}}>Simulador GNV</h1>
    <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:16,marginTop:24}}>
      <div><label>Actividad</label>
        <select value={actividad} onChange={e=>{const act=e.target.value;setActividad(act);const m=montosDisponibles(act)[0];setMonto(m);setPlazo(plazosDisponibles(act,m)[0]);}} style={sel}>
          {actividades.map(a=><option key={a} value={a}>{a}</option>)}
        </select></div>
      <div><label>Monto</label>
        <select value={monto} onChange={e=>{const m=Number(e.target.value);setMonto(m);setPlazo(plazosDisponibles(actividad,m)[0]);}} style={sel}>
          {opcionesMonto.map(m=><option key={m} value={m}>{m}</option>)}
        </select></div>
      <div><label>Plazo</label>
        <select value={plazo} onChange={e=>setPlazo(Number(e.target.value))} style={sel}>
          {opcionesPlazo.map(p=><option key={p} value={p}>{p}</option>)}
        </select></div>
      <div><label>Seguro</label>
        <select value={seguro} onChange={e=>setSeguro(e.target.value)} style={sel}>
          {seguros.map(s=><option key={s.key} value={s.key}>{s.label}</option>)}
        </select></div>
    </section>
    <section style={{marginTop:24,padding:16,border:'1px dashed #334155',borderRadius:12}}>
      <div style={{display:'flex',justifyContent:'space-between',gap:16,flexWrap:'wrap'}}>
        <div><div style={{fontSize:14,opacity:.8}}>Cuota</div><div style={{fontSize:36,fontWeight:700}}>{moneda(cuota)}</div></div>
        <div><div style={{fontSize:14,opacity:.8}}>% Recaudo</div><div style={{fontSize:28,fontWeight:600}}>{recaudo}</div></div>
      </div>
    </section>
  </main>);
}
const sel={width:'100%',padding:10,borderRadius:12,border:'1px solid #334155',background:'#0b1220',color:'#e2e8f0'};
