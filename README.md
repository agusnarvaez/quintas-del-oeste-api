# quintas-del-oeste-api

#### Resumen
Es una api para la administración de lotes de un barrio cerrado, los cuales contarán con integración de pago de reserva mediante MercadoPago.

#### Tecnologías
- NodeJS
- Express
- MongoDB
- Mongoose
- MercadoPago
- 
#### Endpoints
- /api/lots/ => Devuelve la lista entera de Lotes
- /api/lots/:id => Devuelve lote solicitado por ID
- /api/lots/add => Agrega Lote según lo enviado en Body
- /api/lots/update/:id => Actualiza datos de lote según ID
- /api/lots/delete/:id => Borra lote indicado