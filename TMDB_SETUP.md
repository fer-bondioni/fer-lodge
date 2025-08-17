# 🎬 Configuración de TMDB API para Posters de Películas

## ¿Qué es TMDB?

**The Movie Database (TMDB)** es una base de datos gratuita y colaborativa de películas, series de TV y personas que trabajan en la industria del entretenimiento.

## 🚀 Pasos para Configurar

### 1. Obtener API Key

1. Ve a [https://www.themoviedb.org](https://www.themoviedb.org)
2. Crea una cuenta gratuita
3. Ve a **Settings** → **API**
4. Solicita una **API Key** (gratuita)
5. Copia tu API Key

### 2. Configurar Variables de Entorno

1. Copia el archivo `env.example` a `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Edita `.env.local` y agrega tu API Key:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=tu_api_key_aqui
   ```

### 3. Reiniciar el Servidor

```bash
npm run dev
```

## ✨ Características de la Integración

### **Posters Automáticos**
- Búsqueda automática de posters por título y año
- Posters de alta calidad (500px de ancho)
- Fallbacks inteligentes si no se encuentra la película

### **Información Adicional**
- Ratings de usuarios (⭐)
- Fechas de lanzamiento
- Géneros de películas
- Sinopsis en español

### **Manejo de Errores**
- Posters de respaldo por década
- Botones de reintento
- Estados de carga elegantes

## 🎯 Límites de la API

- **Gratuita**: 1000 requests por día
- **Búsquedas**: 1000 películas por día
- **Imágenes**: Sin límite de descarga

## 🔧 Personalización

### Cambiar Idioma
```env
NEXT_PUBLIC_TMDB_LANGUAGE=es-ES  # Español
NEXT_PUBLIC_TMDB_LANGUAGE=en-US  # Inglés
NEXT_PUBLIC_TMDB_LANGUAGE=fr-FR  # Francés
```

### Cambiar Región
```env
NEXT_PUBLIC_TMDB_REGION=AR  # Argentina
NEXT_PUBLIC_TMDB_REGION=US  # Estados Unidos
NEXT_PUBLIC_TMDB_REGION=ES  # España
```

## 🚨 Solución de Problemas

### "API Key inválida"
- Verifica que copiaste la API Key correctamente
- Asegúrate de que el archivo se llama `.env.local`
- Reinicia el servidor después de cambiar las variables

### "No se encuentran posters"
- Algunas películas muy antiguas o poco conocidas pueden no tener posters
- Los posters de respaldo se mostrarán automáticamente
- Verifica que el título y año sean correctos

### "Error de red"
- Verifica tu conexión a internet
- TMDB puede tener mantenimiento ocasional
- Los posters de respaldo se mostrarán automáticamente

## 📱 Ejemplo de Uso

Una vez configurado, la galería automáticamente:

1. **Carga** posters de TMDB para cada película
2. **Muestra** ratings y información adicional
3. **Maneja** errores con posters de respaldo
4. **Optimiza** la experiencia del usuario

## 🌟 Beneficios

- **Profesional**: Posters de alta calidad de la industria
- **Gratuito**: Sin costos de API
- **Confiable**: Base de datos mantenida por la comunidad
- **Completo**: Información detallada de cada película
- **Multilingüe**: Soporte para múltiples idiomas
