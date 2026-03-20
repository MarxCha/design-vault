# 3D & WebGL — Guía de Extracción

## Ecosistema pmndrs (Priority #1)

React Three Fiber + drei es el entry point. Componentes drei más útiles:
- `<Environment>` — IBL lighting instantáneo
- `<Float>` — Animación de flotar automática
- `<MeshDistortMaterial>` — Material con distorsión orgánica
- `<Sparkles>` — Partículas brillantes
- `<Text3D>` — Texto 3D con geometría extruida
- `<ContactShadows>` — Sombras de contacto realistas
- `<PresentationControls>` — Controles tipo showroom

## Shaders para Backgrounds

De Radiant (pbakaus/radiant):
- Cada shader es un HTML standalone
- Embebir vía `<iframe>` sin build step
- "Event Horizon", "Plasma", "Aurora" son los más útiles

De Book of Shaders:
- Noise functions (Perlin, Simplex) para texturas orgánicas
- SDF shapes para formas geométricas
- Raymarching para escenas volumétricas

## Pipeline Blender → Web

De Bruno Simon (my-room-in-3d):
1. Modelar en Blender con low-poly
2. Bake lighting a texturas
3. Exportar GLB optimizado
4. Cargar con `<useGLTF>` de drei
5. Post-processing con @react-three/postprocessing
