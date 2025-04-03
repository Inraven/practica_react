## 🚀 Instalación y Configuración

### 1️⃣ Clonar el repositorio
```sh
git clone https://github.com/Inraven/practica_react.git
cd practica_react
```

### 2️⃣ Instalar dependencias
```sh
npm install
```

### 3️⃣ Ejecutar el proyecto
```sh
npm run dev
```

### 📦 Dependencias utilizadas
El proyecto utiliza las siguientes tecnologías y librerías:

- **React** `19.0.0`
- **React Router DOM** `7.4.1` (Para la navegación)
- **Vite** `6.2.2` (Para un entorno de desarrollo rápido)
- **Material UI** (`@mui/material` `6.4.10` y `@mui/icons-material` `7.0.1`) (Para estilos y componentes)
- **Styled Components** `6.1.16` y **Emotion** (Para estilos dinámicos)
- **ESLint** (Para mejorar la calidad del código con reglas de linting)




## Implementando React Route

###  ¿Qué aprendí?
Al trabajar con **React Router**, aprendí a manejar la navegación dentro de una aplicación de una sola página (SPA). Descubrí cómo usar:
- **`<BrowserRouter>`** para envolver la aplicación y gestionar las rutas.
- **`<Routes>` y `<Route>`** para definir qué componentes se renderizan según la URL.
- **`useNavigate`** para realizar redirecciones dentro de los componentes sin recargar la página.

### ¿Qué dificultades encontré?
- Al principio, tuve problemas para entender cómo estructurar `<Routes>` y `<Route>`, lo que generó algunos errores al definir las rutas.


### ¿Cómo resolví el enrutamiento?
Para hacer que la navegación funcionara correctamente:
1. **Envolví la aplicación** con `<BrowserRouter>` en `Main.js`.
2. **Definí las rutas** usando `<Routes>` y `<Route>`, asegurándome de que cada ruta estuviera bien estructurada.
3. **Usé `useNavigate`** dentro de los componentes para permitir la navegación programática.
