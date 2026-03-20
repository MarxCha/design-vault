# BLOCKERS.md — Design Vault

## Ningún blocker activo

### Riesgos potenciales:
1. **Demos caídas**: Algunos repos pueden tener demos offline. Mitigación: screenshots como fallback.
2. **Repos archivados**: Verificar que los 50 repos sigan activos antes de implementar.
3. **GSAP licensing**: GSAP es free pero verificar que el modelo actual (post-2024) permite uso comercial sin restricción.
4. **Heavy bundle**: Three.js + GSAP + Motion pueden crear bundles grandes. Mitigación: dynamic imports, code splitting agresivo.
