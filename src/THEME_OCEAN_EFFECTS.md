# Ocean Effects - Theme Support

## Overview
Los efectos oceánicos ahora responden dinámicamente al tema del sitio, ofreciendo experiencias visuales distintas para modo claro y oscuro.

## Cambios Implementados

### 1. OceanDivingBackground.tsx
**Modo Claro (Océano Diurno):**
- Colores brillantes y vibrantes (azul claro, cyan, turquesa)
- Olas más intensas y visibles
- Burbujas más luminosas (opacidad 0.3 vs 0.1)
- Rayos de luz más fuertes (from-cyan-400/40)
- Efecto cáustico brillante

**Modo Oscuro (Océano Nocturno):**
- Colores profundos y misteriosos (azul oscuro, índigo)
- Olas sutiles y etéreas
- Burbujas tenues para ambiente místico
- Rayos de luz suaves
- Efecto cáustico sutil

### 2. UnderwaterSection.tsx
**Profundidades Adaptativas:**

**Shallow Waters (Aguas Poco Profundas):**
- Light: `from-cyan-400/15 to-blue-400/10`, burbujas opacidad 0.3
- Dark: `from-cyan-500/5 to-blue-500/5`, burbujas opacidad 0.15

**Medium Depth (Profundidad Media):**
- Light: `from-blue-500/20 to-cyan-500/15`, burbujas opacidad 0.35
- Dark: `from-blue-600/8 to-cyan-600/8`, burbujas opacidad 0.2

**Deep Ocean (Océano Profundo):**
- Light: `from-blue-700/25 to-indigo-700/20`, burbujas opacidad 0.4
- Dark: `from-blue-800/10 to-indigo-900/10`, burbujas opacidad 0.25

**Elementos Adicionales:**
- Peces más visibles en modo claro (opacity-40 vs opacity-30)
- Partículas de "nieve marina" más brillantes
- Rayos de luz más intensos desde la superficie

### 3. OceanFloor.tsx
**Modo Claro:**
- Algas marinas más visibles: `text-emerald-600/60` (vs /40)
- Corales más coloridos: `text-rose-400/50` (vs /30)
- Rocas más definidas: `text-slate-500/30` (vs /20)
- Arena más visible: `text-amber-700/20` (vs /10)
- Mayor opacidad general (opacity-30 vs opacity-20)

**Modo Oscuro:**
- Siluetas tenues y misteriosas
- Colores más apagados para ambiente nocturno
- Mantiene la atmósfera profunda del océano

## Experiencia del Usuario

### Modo Claro 🌞
Simula un día soleado bajo el agua:
- Visibilidad excelente
- Colores vibrantes del arrecife
- Luz solar penetrando las aguas
- Ambiente alegre y energético

### Modo Oscuro 🌙
Simula buceo nocturno o aguas profundas:
- Atmósfera misteriosa e inmersiva
- Colores sutiles y profundos
- Bioluminiscencia sugerida
- Ambiente contemplativo

## Transición entre Temas
Los efectos se actualizan instantáneamente al cambiar de tema, manteniendo todas las animaciones activas para una transición suave y cinematográfica.

## Performance
- No hay impacto negativo en el rendimiento
- Las animaciones canvas se re-renderizan al cambiar el tema
- Todos los efectos mantienen sus optimizaciones originales
