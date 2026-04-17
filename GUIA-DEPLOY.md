# Guía de Deploy y Edición — btiq.mx

## 1. Deploy en Vercel (paso a paso)

### Opción A: Desde la interfaz web (recomendada)

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta (puedes usar tu email o GitHub)
2. Clic en **"Add New" → "Project"**
3. Selecciona **"Upload"** (si no tienes el proyecto en GitHub)
4. Arrastra la carpeta `btiq-site` completa al área de upload
5. Vercel detectará automáticamente que es un sitio estático
6. Clic en **"Deploy"**
7. En 30 segundos tendrás tu sitio en una URL tipo `btiq-site.vercel.app`

### Opción B: Subir a GitHub + conectar con Vercel (ideal para editar después)

1. Crea un repositorio en GitHub llamado `btiq-site`
2. Sube todos los archivos de la carpeta `btiq-site` al repositorio
3. En Vercel, clic en **"Add New" → "Project"**
4. Conecta tu cuenta de GitHub
5. Selecciona el repositorio `btiq-site`
6. Clic en **"Deploy"**
7. Ventaja: cada vez que hagas un cambio en GitHub, Vercel re-deploya automáticamente

---

## 2. Conectar dominio btiq.mx en Vercel

### En Vercel:
1. Ve a tu proyecto → **Settings** → **Domains**
2. Escribe `btiq.mx` y clic en **"Add"**
3. Vercel te mostrará los registros DNS necesarios

### En GoDaddy:
1. Entra a [godaddy.com](https://godaddy.com) → **Mis productos** → tu dominio `btiq.mx`
2. Ve a **DNS** → **Administrar DNS**
3. **Elimina** cualquier registro A o CNAME existente para `@` y `www`
4. **Agrega** estos registros:

| Tipo  | Nombre | Valor              | TTL  |
|-------|--------|--------------------|------|
| A     | @      | 76.76.21.21        | 600  |
| CNAME | www    | cname.vercel-dns.com | 600 |

5. Guarda los cambios
6. Vuelve a Vercel y clic en **"Verify"**
7. Los DNS pueden tardar entre 5 minutos y 48 horas (normalmente ~15 min)
8. Vercel activará SSL automáticamente una vez verificado

### Verificar:
- Abre `https://btiq.mx` — debería cargar tu sitio con candado verde
- Abre `https://www.btiq.mx` — debería redirigir a `btiq.mx`

---

## 3. Cómo editar textos sin tocar código

### Si usaste GitHub (Opción B):

1. Ve a tu repositorio en GitHub
2. Abre el archivo `index.html`
3. Clic en el ícono de lápiz (editar)
4. Busca el texto que quieres cambiar (usa Ctrl+F)
5. Edita el texto directamente
6. Clic en **"Commit changes"**
7. Vercel re-desplegará automáticamente en ~30 segundos

### Textos principales y dónde encontrarlos:

- **Hero headline**: Busca `"Estrategia y ejecución que mueven la aguja."`
- **Hero subheadline**: Busca `"Marketing digital, performance"`
- **Servicios**: Busca `Performance Marketing`, `Desarrollo Web`, `Eventos Corporativos`
- **Diferenciadores**: Busca `"15+ años"`, `"Estrategia + ejecución"`, etc.
- **Bio fundadora**: Busca `"Soy Paola, Digital Marketing Director"`
- **Marcas**: Busca `Samsung`, `AT&T`, `Hyundai`, `Kia`

### Para cambiar el aviso de privacidad:
- Edita el archivo `aviso-de-privacidad.html`
- El contenido está en texto plano dentro de tags `<p>` y `<ul>`

---

## 4. Estructura del proyecto

```
btiq-site/
├── index.html                  ← Sitio principal (todo en un archivo)
├── aviso-de-privacidad.html    ← Página de privacidad
├── vercel.json                 ← Configuración de Vercel
└── assets/
    ├── logo.svg                ← Logo principal
    ├── favicon.svg             ← Favicon SVG
    ├── favicon-32.png          ← Favicon PNG
    └── og-image.png            ← Imagen para redes sociales
```

---

## 5. Checklist post-deploy

- [ ] Sitio carga en https://btiq.mx
- [ ] SSL activo (candado verde)
- [ ] Formulario envía correctamente (prueba con datos reales)
- [ ] WhatsApp abre correctamente en celular y desktop
- [ ] Revisar Google Analytics 4 → Tiempo Real para ver eventos
- [ ] Reemplazar aviso de privacidad con texto legal definitivo
- [ ] Reemplazar logo SVG con tu logo PNG/SVG original de alta resolución
