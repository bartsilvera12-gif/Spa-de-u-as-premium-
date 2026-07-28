// Catálogo integral de Dálida Beauty & Spa.
// Centro de belleza premium: cada categoría agrupa sus servicios (opcionalmente
// en subgrupos). No incluye precios ni fotos por servicio a propósito: los
// servicios se muestran como listas de texto elegantes y la reserva se coordina
// por WhatsApp. Editá acá para sumar, quitar o reordenar servicios.
export const catalogo = [
  {
    id: 'estetica-facial',
    nombre: 'Estética Facial',
    icono: '✨',
    descripcion: 'Limpiezas, hidratación, antiedad, manchas, acné y peelings.',
    grupos: [
      { titulo: 'Limpiezas faciales', servicios: [{ nombre: 'Limpieza facial básica', img: '/servicios/limpieza-facial-basica.jpg' }, { nombre: 'Limpieza facial profunda', img: '/servicios/limpieza-facial-profunda.jpg' }, { nombre: 'Limpieza ultrasónica', img: '/servicios/limpieza-ultrasonica.jpg' }, { nombre: 'Limpieza con punta de diamante', img: '/servicios/limpieza-punta-diamante.jpg' }, { nombre: 'Limpieza con espátula ultrasónica', img: '/servicios/limpieza-espatula-ultrasonica.jpg' }, { nombre: 'Higiene facial para piel grasa', img: '/servicios/higiene-facial-piel-grasa.jpg' }, { nombre: 'Higiene facial para piel seca', img: '/servicios/higiene-facial-piel-seca.jpg' }, { nombre: 'Higiene facial para piel sensible', img: '/servicios/higiene-facial-piel-sensible.jpg' }, { nombre: 'Higiene facial masculina', img: '/servicios/higiene-facial-masculina.jpg' }, { nombre: 'Limpieza para adolescentes', img: '/servicios/limpieza-adolescentes.jpg' }] },
      { titulo: 'Tratamientos hidratantes', servicios: [{ nombre: 'Hidratación profunda', img: '/servicios/hidratacion-profunda.jpg' }, { nombre: 'Nutrición facial', img: '/servicios/nutricion-facial.jpg' }, { nombre: 'Oxigenoterapia', img: '/servicios/oxigenoterapia.jpg' }, { nombre: 'Tratamiento calmante', img: '/servicios/tratamiento-calmante.jpg' }, { nombre: 'Tratamiento reparador', img: '/servicios/tratamiento-reparador.jpg' }, { nombre: 'Mascarillas profesionales', img: '/servicios/mascarillas-profesionales.jpg' }] },
      { titulo: 'Antiedad', servicios: [{ nombre: 'Rejuvenecimiento facial', img: '/servicios/rejuvenecimiento-facial.jpg' }, { nombre: 'Lifting facial sin cirugía', img: '/servicios/lifting-facial-sin-cirugia.jpg' }, { nombre: 'Radiofrecuencia facial', img: '/servicios/radiofrecuencia-facial.jpg' }, { nombre: 'HIFU', img: '/servicios/hifu.jpg' }, { nombre: 'Microneedling (Dermapen)', img: '/servicios/microneedling-dermapen.jpg' }, { nombre: 'Mesoterapia virtual', img: '/servicios/mesoterapia-virtual.jpg' }, { nombre: 'Electroporación', img: '/servicios/electroporacion.jpg' }, { nombre: 'Colágeno facial', img: '/servicios/colageno-facial.jpg' }, { nombre: 'Elastina', img: '/servicios/elastina.jpg' }, { nombre: 'Fototerapia LED', img: '/servicios/fototerapia-led.jpg' }, { nombre: 'Terapia con oxígeno', img: '/servicios/terapia-con-oxigeno.jpg' }] },
      { titulo: 'Manchas', servicios: [{ nombre: 'Tratamiento despigmentante', img: '/servicios/tratamiento-despigmentante.jpg' }, { nombre: 'Melasma', img: '/servicios/melasma.jpg' }, { nombre: 'Manchas solares', img: '/servicios/manchas-solares.jpg' }, { nombre: 'Manchas postacné', img: '/servicios/manchas-postacne.jpg' }, { nombre: 'Peelings despigmentantes', img: '/servicios/peelings-despigmentantes.jpg' }] },
      { titulo: 'Acné', servicios: [{ nombre: 'Tratamiento antiacné', img: '/servicios/tratamiento-antiacne.jpg' }, { nombre: 'Control de sebo', img: '/servicios/control-de-sebo.jpg' }, { nombre: 'Reducción de poros', img: '/servicios/reduccion-de-poros.jpg' }, { nombre: 'Tratamiento para cicatrices', img: '/servicios/tratamiento-para-cicatrices.jpg' }] },
      { titulo: 'Peelings', servicios: ['Químicos', 'Enzimáticos', 'Diamante', 'Carbón activado', 'Hollywood Peel'] },
    ],
  },
  {
    id: 'medicina-estetica',
    nombre: 'Medicina Estética',
    icono: '💉',
    descripcion: 'Procedimientos realizados por profesional médico habilitado.',
    grupos: [
      { servicios: ['Toxina botulínica', 'Ácido hialurónico', 'Bioestimuladores', 'Plasma Rico en Plaquetas', 'Mesoterapia', 'Hilos tensores', 'Relleno de labios', 'Perfilado mandibular', 'Rinomodelación', 'Biorrevitalización'] },
    ],
  },
  {
    id: 'tratamientos-corporales',
    nombre: 'Tratamientos Corporales',
    icono: '🌿',
    descripcion: 'Reductores, anticelulíticos, reafirmantes y modelado corporal.',
    grupos: [
      { titulo: 'Reductores', servicios: ['Criolipólisis', 'Cavitación', 'Lipoláser', 'Radiofrecuencia corporal', 'Ultrasonido', 'EMS Sculpt', 'Vacumterapia', 'Ondas rusas'] },
      { titulo: 'Celulitis', servicios: ['Drenaje', 'Maderoterapia', 'Endermoterapia', 'Presoterapia', 'Anticelulítico intensivo'] },
      { titulo: 'Flacidez', servicios: ['Radiofrecuencia', 'HIFU corporal', 'Electroestimulación', 'Colágeno corporal'] },
      { titulo: 'Estrías', servicios: ['Microneedling', 'Plasma', 'Láser', 'Peelings'] },
      { titulo: 'Modelado corporal', servicios: ['Remodelación', 'Tonificación', 'Esculpido corporal', 'Levantamiento de glúteos'] },
    ],
  },
  {
    id: 'depilacion',
    nombre: 'Depilación',
    icono: '🌸',
    descripcion: 'Depilación con cera, láser e hilo para rostro y cuerpo.',
    grupos: [
      { titulo: 'Cera', servicios: ['Facial', 'Axilas', 'Brazos', 'Piernas', 'Espalda', 'Abdomen', 'Bikini', 'Brasileña', 'Íntima'] },
      { titulo: 'Láser', servicios: ['Diodo', 'Alexandrita', 'IPL'] },
      { titulo: 'Hilo', servicios: ['Cejas', 'Rostro', 'Labio'] },
    ],
  },
  {
    id: 'masajes',
    nombre: 'Masajes',
    icono: '💆‍♀️',
    descripcion: 'Masajes relajantes, terapéuticos, drenaje y especializados.',
    grupos: [
      { titulo: 'Relajantes', servicios: ['Sueco', 'Aromaterapia', 'Piedras calientes', 'Velas', 'Bambuterapia'] },
      { titulo: 'Terapéuticos', servicios: ['Descontracturante', 'Deportivo', 'Cervical', 'Lumbar', 'Espalda completa'] },
      { titulo: 'Drenaje', servicios: ['Manual', 'Linfático', 'Postoperatorio'] },
      { titulo: 'Especializados', servicios: ['Prenatal', 'Posparto', 'Reflexología', 'Craneofacial'] },
    ],
  },
  {
    id: 'spa',
    nombre: 'Spa',
    icono: '🧖‍♀️',
    descripcion: 'Circuito de spa y rituales de bienestar para una experiencia completa.',
    grupos: [
      { titulo: 'Circuito Spa', servicios: ['Sauna seco', 'Sauna húmedo', 'Baño turco', 'Jacuzzi', 'Hidromasaje', 'Piscina climatizada', 'Duchas sensoriales', 'Sala de relajación'] },
      { titulo: 'Rituales Spa', servicios: ['Ritual relajante', 'Ritual romántico', 'Ritual para parejas', 'Ritual antiestrés', 'Ritual detox', 'Ritual premium', 'Ritual ejecutivo', 'Ritual bridal'] },
    ],
  },
  {
    id: 'exfoliaciones',
    nombre: 'Exfoliaciones',
    icono: '🧂',
    descripcion: 'Exfoliaciones corporales con ingredientes naturales premium.',
    grupos: [
      { servicios: ['Sal marina', 'Azúcar', 'Café', 'Chocolate', 'Coco', 'Vino', 'Oro', 'Perlas', 'Sales del Himalaya'] },
    ],
  },
  {
    id: 'envolturas-corporales',
    nombre: 'Envolturas Corporales',
    icono: '🍫',
    descripcion: 'Envolturas nutritivas y detoxificantes para la piel.',
    grupos: [
      { servicios: ['Chocolate', 'Algas', 'Fango', 'Barro volcánico', 'Arcillas', 'Vino', 'Oro', 'Café', 'Aloe vera'] },
    ],
  },
  {
    id: 'hidroterapia',
    nombre: 'Hidroterapia',
    icono: '💧',
    descripcion: 'Terapias con agua, color y aromas para relajar cuerpo y mente.',
    grupos: [
      { servicios: ['Hidromasaje', 'Cromoterapia', 'Aromaterapia', 'Baños minerales', 'Baños de leche', 'Sales aromáticas'] },
    ],
  },
  {
    id: 'manicura',
    nombre: 'Manicura',
    icono: '💅',
    descripcion: 'Técnicas de manicura y decoraciones artísticas a medida.',
    grupos: [
      { titulo: 'Técnicas', servicios: ['Tradicional', 'Spa', 'Francesa', 'Semipermanente', 'Gel', 'Polygel', 'Acrílicas', 'Soft Gel', 'Rubber Base', 'Press On', 'Kapping', 'Esculpidas'] },
      { titulo: 'Decoraciones', servicios: ['Nail Art', 'Cristales Swarovski', 'Efecto espejo', 'Baby Boomer', 'Ojo de gato', 'Encapsulados', 'Foil', 'Acuarela', '3D'] },
    ],
  },
  {
    id: 'pedicura',
    nombre: 'Pedicura',
    icono: '🦶',
    descripcion: 'Pedicura estética, spa y podológica para pies sanos y prolijos.',
    grupos: [
      { servicios: ['Tradicional', 'Spa', 'Podológica', 'Semipermanente', 'Gel', 'Callosidades', 'Talones agrietados', 'Parafina', 'Reflexología podal'] },
    ],
  },
  {
    id: 'cejas',
    nombre: 'Cejas',
    icono: '👁️',
    descripcion: 'Diseño, perfilado y técnicas de pigmentación de cejas.',
    grupos: [
      { servicios: ['Diseño', 'Perfilado', 'Depilación', 'Hilo', 'Pinza', 'Henna', 'Laminado', 'Microblading', 'Micropigmentación', 'Powder Brows'] },
    ],
  },
  {
    id: 'pestanas',
    nombre: 'Pestañas',
    icono: '🦋',
    descripcion: 'Lifting, tinte y extensiones para una mirada intensa.',
    grupos: [
      { servicios: ['Lifting', 'Permanente', 'Tinte', 'Extensiones clásicas', 'Volumen ruso', 'Mega volumen', 'Híbridas', 'Fox Eyes', 'Wispy', 'Retoques'] },
    ],
  },
  {
    id: 'maquillaje',
    nombre: 'Maquillaje',
    icono: '💄',
    descripcion: 'Maquillaje profesional para eventos, novias y producciones.',
    grupos: [
      { servicios: ['Social', 'Novias', 'Madrinas', 'Fiesta', 'Editorial', 'Fotografía', 'Televisión', 'Corporativo', 'Halloween', 'Artístico', 'Infantil'] },
    ],
  },
  {
    id: 'peluqueria',
    nombre: 'Peluquería',
    icono: '💇‍♀️',
    descripcion: 'Corte, color, tratamientos capilares y peinados de alta gama.',
    grupos: [
      { titulo: 'Corte', servicios: ['Mujer', 'Hombre', 'Niño'] },
      { titulo: 'Color', servicios: ['Tinte', 'Balayage', 'Babylights', 'Mechas', 'Ombre', 'Corrección de color', 'Matización', 'Decoloración'] },
      { titulo: 'Tratamientos', servicios: ['Botox capilar', 'Keratina', 'Hidratación', 'Colágeno', 'Ácido hialurónico capilar', 'Reconstrucción', 'Células madre', 'Ampollas'] },
      { titulo: 'Peinados', servicios: ['Brushing', 'Ondas', 'Recogidos', 'Novias', 'Trenzas', 'Eventos'] },
    ],
  },
  {
    id: 'barberia',
    nombre: 'Barbería',
    icono: '💈',
    descripcion: 'Corte y arreglo de barba con estilo y detalle masculino.',
    grupos: [
      { servicios: ['Corte', 'Barba', 'Perfilado', 'Toallas calientes', 'Camuflaje de canas', 'Limpieza facial masculina'] },
    ],
  },
  {
    id: 'bronceado',
    nombre: 'Bronceado',
    icono: '☀️',
    descripcion: 'Bronceado sin sol, uniforme y seguro para tu piel.',
    grupos: [
      { servicios: ['Spray tan', 'Autobronceado', 'Bronceado DHA'] },
    ],
  },
  {
    id: 'bienestar',
    nombre: 'Bienestar',
    icono: '🕯️',
    descripcion: 'Terapias de relajación profunda para cuerpo y mente.',
    grupos: [
      { servicios: ['Aromaterapia', 'Musicoterapia', 'Cromoterapia', 'Meditación guiada', 'Mindfulness', 'Relajación profunda'] },
    ],
  },
  {
    id: 'programas-premium',
    nombre: 'Programas Premium',
    icono: '👑',
    descripcion: 'Experiencias completas de spa diseñadas para ocasiones especiales.',
    grupos: [
      { servicios: ['Spa para parejas', 'Día de princesa', 'Día de reina', 'Bridal Spa', 'Cumpleaños Spa', 'Spa corporativo', 'Spa ejecutivo', 'Spa mamá e hija', 'Spa prenatal', 'Spa postparto', 'Spa masculino'] },
    ],
  },
  {
    id: 'servicios-vip',
    nombre: 'Servicios VIP',
    icono: '⭐',
    descripcion: 'Membresías, atención exclusiva y beneficios pensados para vos.',
    grupos: [
      { servicios: ['Membresías', 'Gift Cards', 'Paquetes mensuales', 'Planes anuales', 'Concierge de belleza', 'Beauty Coach', 'Diagnóstico facial digital', 'Diagnóstico corporal', 'Seguimiento personalizado', 'Cabinas privadas VIP', 'Servicio a domicilio', 'Atención para eventos'] },
    ],
  },
]
