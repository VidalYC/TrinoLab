# 🚀 Trino Lab

Este repositorio contiene un entorno de laboratorio para experimentar con **Trino** (anteriormente PrestoSQL), un motor de consultas SQL distribuido diseñado para consultar grandes conjuntos de datos desde múltiples fuentes.

---

## 🤔 ¿Qué es Trino?

Trino es un motor de consultas SQL distribuido de alto rendimiento para análisis de big data. Una de las mayores conceptualizaciones erróneas sobre un motor de consultas es pensar en él como una base de datos. Trino, como otros motores de consulta, no almacena datos. En su lugar, se conecta a fuentes de datos existentes para ejecutar consultas SQL sobre ellas.

### ✨ Características Principales

- **🌐 Motor de Consultas Federadas**: Trino puede consultar muchas fuentes de datos diferentes, incluyendo data lakes, lakehouses, numerosos sistemas de gestión de bases de datos relacionales, almacenes clave-valor y muchos otros almacenes de datos
- **⚡ Arquitectura MPP**: Trino es un motor de consultas SQL distribuido que se asemeja a las bases de datos de procesamiento masivamente paralelo (MPP). En lugar de depender del escalado vertical del servidor, puede distribuir todo el procesamiento a través de un clúster de servidores de forma horizontal
- **🔍 Estándar SQL**: Soporta SQL ANSI estándar así como permite a los usuarios ejecutar transformaciones más complejas como transformaciones y análisis de JSON y MAP
- **💾 Sin Almacenamiento**: No es una base de datos, sino que accede a datos donde ya residen

### 🏗️ Arquitectura de Trino

Trino es un motor de consultas distribuido que procesa datos en paralelo a través de múltiples servidores. Hay dos tipos de servidores Trino: coordinadores y workers.

#### 🧠 Componentes Clave:

1. **🎯 Coordinador**: 
   - Responsable de analizar, optimizar, planificar y programar una consulta enviada por un cliente
   - Cuando los usuarios envían su consulta SQL al coordinador, este utiliza un motor de consultas y ejecución personalizado para analizar, planificar y programar un plan de consulta distribuido a través de los nodos worker
   - Punto de entrada único para todas las consultas

2. **👷 Workers**: 
   - Responsables de ejecutar las tareas y operadores que les alimenta el programador. Estas tareas procesan filas de las fuentes de datos que producen resultados que se devuelven al coordinador
   - Procesan los datos en paralelo
   - Se comunican con las fuentes de datos

3. **🔌 Conectores**: 
   - La arquitectura consiste en un motor de consultas principal junto con la capacidad de conectar ese motor a una amplia variedad de fuentes de datos
   - Trino utiliza una arquitectura de plugins para extender sus capacidades e integrarse con varias fuentes de datos y otros sistemas
   - Traducen entre el protocolo interno de Trino y los protocolos nativos de las fuentes de datos

### 💡 Puntos Clave a Recordar

1. **❌ No es una Base de Datos**: Trino no almacena datos, solo los consulta donde ya existen
2. **📈 Escalabilidad Horizontal**: Puedes agregar más nodos para obtener más poder de procesamiento
3. **⚡ Procesamiento en Memoria**: Optimizado para consultas analíticas rápidas
4. **🔗 Consultas Federadas**: Capacidad única de hacer JOIN entre diferentes sistemas de almacenamiento en una sola consulta
5. **🎯 Arquitectura Shared-Nothing**: Cada worker opera independientemente sin compartir estado
6. **⬇️ Push-Down de Predicados**: Envía filtros y operaciones directamente a las fuentes de datos cuando es posible

---

## 🏛️ Arquitectura del Laboratorio

El laboratorio está configurado con los siguientes componentes:

- **🚀 Trino**: Motor de consultas principal (puerto 8080)
- **🐬 MySQL**: Base de datos relacional con datos de órdenes normalizados (puerto 3307)
- **🍃 MongoDB**: Base de datos NoSQL con datos de órdenes desnormalizados (puerto 27017)

---

## 📊 Estructura de Datos

### 🐬 MySQL (Base de datos `demo`)
- **Tabla `orders`**: Información principal de las órdenes (id, país, total)
- **Tabla `order_items`**: Detalles de los items por orden (sku, cantidad)

### 🍃 MongoDB (Base de datos `shop`)
- **Colección `orders`**: Documentos con información completa de órdenes incluyendo items anidados

Ambas fuentes contienen los mismos datos de prueba con 15 órdenes de diferentes países latinoamericanos.

---

## ✅ Requisitos Previos

- Docker y Docker Compose instalados
- Puertos 8080, 3307 y 27017 disponibles en tu sistema

---

## 🚀 Instalación y Ejecución

### 1. 📂 Clonar y navegar al directorio

```bash
git clone https://github.com/VidalYC/TrinoLab.git
```


<img width="582" height="112" alt="image" src="https://github.com/user-attachments/assets/e9e81f9c-6db7-46ca-8567-c3cf54fbc9de" />



```bash
cd TrinoLab
```

### 2. 🔥 Iniciar los servicios

```bash
docker-compose up -d
```


<img width="1225" height="435" alt="image" src="https://github.com/user-attachments/assets/3123d1df-bb2e-460e-9cc6-efbb44d4da75" />



Este comando iniciará todos los contenedores en segundo plano:
- Trino se iniciará después de que MySQL y MongoDB estén listos
- Los datos de prueba se cargarán automáticamente

### 3. ✅ Verificar que los servicios están funcionando

```bash
docker-compose ps
```


<img width="1349" height="68" alt="image" src="https://github.com/user-attachments/assets/df2c9138-a244-46c5-a5ea-0a4115e3de78" />



Deberías ver los tres contenedores ejecutándose:
- `trino` (puerto 8080)
- `mysql` (puerto 3307)
- `mongo` (puerto 27017)

---

## 🌐 Acceso a Trino

### 💻 Interfaz Web (coloca cualquier usuario)
Abre tu navegador y ve a: http://localhost:8080


<img width="764" height="376" alt="image" src="https://github.com/user-attachments/assets/d5df8548-2e93-4e67-b9d8-408ad4774a6e" />
<img width="1266" height="641" alt="image" src="https://github.com/user-attachments/assets/d860c762-6edf-47a6-97c4-3a99d46ff245" />

### 🖥️ Cliente CLI de Trino
También puedes usar el cliente CLI (donde ejecutaras consultas SQL) ejecutando:

```bash
docker exec -it trino trino
```

---

## 📝 Consultas de Ejemplo

### 🐬 Consultar datos de MySQL

```sql
-- Ver todas las órdenes
SELECT * FROM mysql.demo.orders;
```

<img width="437" height="409" alt="image" src="https://github.com/user-attachments/assets/324d1341-f86b-4c3b-830b-5631036ef59b" />

```
-- Ver items por orden
SELECT o.id, o.country, o.total, oi.sku, oi.qty
FROM mysql.demo.orders o
JOIN mysql.demo.order_items oi ON o.id = oi.order_id
ORDER BY o.id;
```

<img width="495" height="571" alt="image" src="https://github.com/user-attachments/assets/8ce1f38d-3afb-40c2-a953-829a0a2ade7c" />


```
-- Agregación por país
SELECT country, COUNT(*) as total_orders, SUM(total) as total_sales
FROM mysql.demo.orders
GROUP BY country
ORDER BY total_sales DESC;
```

<img width="632" height="266" alt="image" src="https://github.com/user-attachments/assets/b0494377-f013-4278-ad48-2342bd2c536f" />


```

### 🍃 Consultar datos de MongoDB

```sql
-- Ver todas las órdenes
SELECT * FROM mongodb.shop.orders;
```

<img width="599" height="369" alt="image" src="https://github.com/user-attachments/assets/472392bd-9806-4fda-97ba-2f9794232550" />

```
-- Extraer información de items anidados
SELECT _id, country, total, item.sku, item.qty
FROM mongodb.shop.orders
CROSS JOIN UNNEST(items) AS t(item);
```

<img width="466" height="654" alt="image" src="https://github.com/user-attachments/assets/696b4e9e-53c7-4f46-8f53-6f920c55c00e" />

```
-- Agregación por país desde MongoDB
SELECT country, COUNT(*) as total_orders, SUM(total) as total_sales
FROM mongodb.shop.orders
GROUP BY country
ORDER BY total_sales DESC;
```

<img width="615" height="256" alt="image" src="https://github.com/user-attachments/assets/0ad5278f-1cda-49e0-acdb-2fbaeccb97cb" />


```
```
### ⚡ Consultas Cross-Database (¡El poder de Trino!)
```
```sql
-- Comparar totales entre MySQL y MongoDB
SELECT 
  m.country,
  m.mysql_total,
  mg.mongo_total,
  ABS(m.mysql_total - mg.mongo_total) as difference
FROM (
  SELECT country, SUM(total) as mysql_total
  FROM mysql.demo.orders
  GROUP BY country
) m
JOIN (
  SELECT country, SUM(total) as mongo_total
  FROM mongodb.shop.orders
  GROUP BY country
) mg ON m.country = mg.country;
```

<img width="487" height="414" alt="image" src="https://github.com/user-attachments/assets/22861f44-a239-4362-932d-68cbc00555c1" />



```

### 🌐 En la web deberias ir visualizando las consultas que ejecutas en la terminal.
<img width="1238" height="991" alt="image" src="https://github.com/user-attachments/assets/8685fcd0-a221-40b6-9c92-23ad58588dc8" />


---

## 📁 Estructura del Proyecto

```
trino-lab/
├── docker-compose.yml          # 🐳 Orquestación de servicios
├── conf/
│   └── hive-site.xml          # ⚙️ Configuración del metastore (no usado actualmente)
├── trino/
│   └── etc/catalog/
│       ├── mysql.properties   # 🐬 Conector MySQL
│       └── mongodb.properties # 🍃 Conector MongoDB
├── mysql/
│   └── init.sql              # 🗃️ Script de inicialización de MySQL
└── mongo/
    └── init.js               # 📄 Script de inicialización de MongoDB
```

---

## 🛠️ Comandos Útiles

### ⏹️ Detener los servicios
```bash
docker-compose down
```

### 📋 Ver logs de un servicio específico
```bash
docker-compose logs trino
docker-compose logs mysql
docker-compose logs mongo
```

### 🔄 Reiniciar un servicio
```bash
docker-compose restart trino
```

### 🐬 Acceder a MySQL directamente
```bash
docker exec -it mysql mysql -u root -ptrino demo
```

### 🍃 Acceder a MongoDB directamente
```bash
docker exec -it mongo mongosh -u root -p trino --authenticationDatabase admin shop
```

---

## 🎯 Casos de Uso

Este laboratorio es ideal para:

1. **📚 Aprender Trino**: Experimentar con consultas federadas
2. **⚖️ Comparar rendimiento**: Entre bases relacionales y NoSQL
3. **🔄 Migración de datos**: Probar estrategias de ETL entre sistemas
4. **📊 Análisis cross-platform**: Combinar datos de múltiples fuentes
5. **🚧 Prototipado**: Antes de implementar en producción

---

## 🚨 Troubleshooting

### ❌ Problema: Contenedor no inicia
- Verifica que los puertos no estén en uso
- Revisa los logs: `docker-compose logs [servicio]`

### 🔌 Problema: Trino no puede conectar a las bases de datos
- Asegúrate de que MySQL y MongoDB estén completamente iniciados
- Verifica la conectividad de red entre contenedores

### 📊 Problema: Datos no aparecen
- Los scripts de inicialización solo se ejecutan en la primera creación de contenedores
- Para reinicializar: `docker-compose down -v && docker-compose up -d`

---

## 🧹 Limpieza

Para eliminar completamente el entorno:

```bash
docker-compose down -v --remove-orphans
docker image rm trinodb/trino:latest mysql:8 mongo:6
```

---

## 🔮 Próximos Pasos

- ➕ Agregar más conectores (PostgreSQL, Elasticsearch, etc.)
- 📊 Implementar particionamiento de datos
- 🔐 Configurar autenticación y autorización
- 📈 Añadir métricas y monitoreo

---

¡Disfruta explorando el poder de las consultas federadas con Trino! 🚀
