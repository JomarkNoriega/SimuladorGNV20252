# GNV Simulador (Next.js + Vercel)

Simulador de cuotas para productos GNV usando una **tabla base** de referencia.

## ⚙️ Stack
- Next.js (App Router)
- React 18
- Sin dependencias adicionales

## ▶️ Desarrollo local
```bash
npm install
npm run dev
# abre http://localhost:3000
```

## 🚀 Deploy en Vercel
1. Sube este repo a GitHub (público o privado).
2. En Vercel: *New Project* → Importa el repo.
3. Framework: **Next.js**. No requiere variables ni configuración extra.
4. Build: `next build` (default). Output: **Next.js**.

## 📄 Datos
Los datos de cuotas están en `src/data/tablaBase.json` y se cargan en memoria.
Para ajustar montos o agregar filas, edita ese archivo.

## 🧪 Comprobación rápida
- Cambia *Actividad*, *Monto*, *Plazo* y *Seguro* en el formulario.
- Se muestra la cuota y el `% Recaudo` correspondientes a la tabla.

---
© 2025
