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
      { titulo: 'Peelings', servicios: [{ nombre: 'Químicos', img: '/servicios/peeling-quimicos.jpg' }, { nombre: 'Enzimáticos', img: '/servicios/peeling-enzimaticos.jpg' }, { nombre: 'Diamante', img: '/servicios/peeling-diamante.jpg' }, { nombre: 'Carbón activado', img: '/servicios/peeling-carbon-activado.jpg' }, { nombre: 'Hollywood Peel', img: '/servicios/peeling-hollywood.jpg' }] },
    ],
  },
  {
    id: 'medicina-estetica',
    nombre: 'Medicina Estética',
    icono: '💉',
    descripcion: 'Procedimientos realizados por profesional médico habilitado.',
    grupos: [
      { servicios: [{ nombre: 'Toxina botulínica', img: '/servicios/toxina-botulinica.jpg' }, { nombre: 'Ácido hialurónico', img: '/servicios/acido-hialuronico.jpg' }, { nombre: 'Bioestimuladores', img: '/servicios/bioestimuladores.jpg' }, { nombre: 'Plasma Rico en Plaquetas', img: '/servicios/plasma-rico-plaquetas.jpg' }, { nombre: 'Mesoterapia', img: '/servicios/mesoterapia.jpg' }, { nombre: 'Hilos tensores', img: '/servicios/hilos-tensores.jpg' }, { nombre: 'Relleno de labios', img: '/servicios/relleno-labios.jpg' }, { nombre: 'Perfilado mandibular', img: '/servicios/perfilado-mandibular.jpg' }, { nombre: 'Rinomodelación', img: '/servicios/rinomodelacion.jpg' }, { nombre: 'Biorrevitalización', img: '/servicios/biorrevitalizacion.jpg' }] },
    ],
  },
  {
    id: 'tratamientos-corporales',
    nombre: 'Tratamientos Corporales',
    icono: '🌿',
    descripcion: 'Reductores, anticelulíticos, reafirmantes y modelado corporal.',
    grupos: [
      { titulo: 'Reductores', servicios: [{ nombre: 'Criolipólisis', img: '/servicios/criolipolisis.jpg' }, { nombre: 'Cavitación', img: '/servicios/cavitacion.jpg' }, { nombre: 'Lipoláser', img: '/servicios/lipolaser.jpg' }, { nombre: 'Radiofrecuencia corporal', img: '/servicios/radiofrecuencia-corporal.jpg' }, { nombre: 'Ultrasonido', img: '/servicios/ultrasonido.jpg' }, { nombre: 'EMS Sculpt', img: '/servicios/ems-sculpt.jpg' }, { nombre: 'Vacumterapia', img: '/servicios/vacumterapia.jpg' }, { nombre: 'Ondas rusas', img: '/servicios/ondas-rusas.jpg' }] },
      { titulo: 'Celulitis', servicios: [{ nombre: 'Drenaje', img: '/servicios/drenaje.jpg' }, { nombre: 'Maderoterapia', img: '/servicios/maderoterapia.jpg' }, { nombre: 'Endermoterapia', img: '/servicios/endermoterapia.jpg' }, { nombre: 'Presoterapia', img: '/servicios/presoterapia.jpg' }, { nombre: 'Anticelulítico intensivo', img: '/servicios/anticelulitico-intensivo.jpg' }] },
      { titulo: 'Flacidez', servicios: [{ nombre: 'Radiofrecuencia', img: '/servicios/flacidez-radiofrecuencia.jpg' }, { nombre: 'HIFU corporal', img: '/servicios/hifu-corporal.jpg' }, { nombre: 'Electroestimulación', img: '/servicios/electroestimulacion.jpg' }, { nombre: 'Colágeno corporal', img: '/servicios/colageno-corporal.jpg' }] },
      { titulo: 'Estrías', servicios: [{ nombre: 'Microneedling', img: '/servicios/microneedling-corporal.jpg' }, { nombre: 'Plasma', img: '/servicios/plasma-corporal.jpg' }, { nombre: 'Láser', img: '/servicios/laser-corporal.jpg' }, { nombre: 'Peelings', img: '/servicios/peelings-corporal.jpg' }] },
      { titulo: 'Modelado corporal', servicios: [{ nombre: 'Remodelación', img: '/servicios/remodelacion.jpg' }, { nombre: 'Tonificación', img: '/servicios/tonificacion.jpg' }, { nombre: 'Esculpido corporal', img: '/servicios/esculpido-corporal.jpg' }, { nombre: 'Levantamiento de glúteos', img: '/servicios/levantamiento-gluteos.jpg' }] },
    ],
  },
  {
    id: 'depilacion',
    nombre: 'Depilación',
    icono: '🌸',
    descripcion: 'Depilación con cera, láser e hilo para rostro y cuerpo.',
    grupos: [
      { titulo: 'Cera', servicios: [{ nombre: 'Facial', img: '/servicios/depilacion-facial.jpg' }, { nombre: 'Axilas', img: '/servicios/depilacion-axilas.jpg' }, { nombre: 'Brazos', img: '/servicios/depilacion-brazos.jpg' }, { nombre: 'Piernas', img: '/servicios/depilacion-piernas.jpg' }, { nombre: 'Espalda', img: '/servicios/depilacion-espalda.jpg' }, { nombre: 'Abdomen', img: '/servicios/depilacion-abdomen.jpg' }, { nombre: 'Bikini', img: '/servicios/depilacion-bikini.jpg' }, { nombre: 'Brasileña', img: '/servicios/depilacion-brasilena.jpg' }, { nombre: 'Íntima', img: '/servicios/depilacion-intima.jpg' }] },
      { titulo: 'Láser', servicios: [{ nombre: 'Diodo', img: '/servicios/depilacion-diodo.jpg' }, { nombre: 'Alexandrita', img: '/servicios/depilacion-alexandrita.jpg' }, { nombre: 'IPL', img: '/servicios/depilacion-ipl.jpg' }] },
      { titulo: 'Hilo', servicios: [{ nombre: 'Cejas', img: '/servicios/depilacion-hilo-cejas.jpg' }, { nombre: 'Rostro', img: '/servicios/depilacion-hilo-rostro.jpg' }, { nombre: 'Labio', img: '/servicios/depilacion-hilo-labio.jpg' }] },
    ],
  },
  {
    id: 'masajes',
    nombre: 'Masajes',
    icono: '💆‍♀️',
    descripcion: 'Masajes relajantes, terapéuticos, drenaje y especializados.',
    grupos: [
      { titulo: 'Relajantes', servicios: [{ nombre: 'Sueco', img: '/servicios/masaje-sueco.jpg' }, { nombre: 'Aromaterapia', img: '/servicios/masaje-aromaterapia.jpg' }, { nombre: 'Piedras calientes', img: '/servicios/masaje-piedras-calientes.jpg' }, { nombre: 'Velas', img: '/servicios/masaje-velas.jpg' }, { nombre: 'Bambuterapia', img: '/servicios/masaje-bambuterapia.jpg' }] },
      { titulo: 'Terapéuticos', servicios: [{ nombre: 'Descontracturante', img: '/servicios/masaje-descontracturante.jpg' }, { nombre: 'Deportivo', img: '/servicios/masaje-deportivo.jpg' }, { nombre: 'Cervical', img: '/servicios/masaje-cervical.jpg' }, { nombre: 'Lumbar', img: '/servicios/masaje-lumbar.jpg' }, { nombre: 'Espalda completa', img: '/servicios/masaje-espalda-completa.jpg' }] },
      { titulo: 'Drenaje', servicios: [{ nombre: 'Manual', img: '/servicios/masaje-manual.jpg' }, { nombre: 'Linfático', img: '/servicios/masaje-linfatico.jpg' }, { nombre: 'Postoperatorio', img: '/servicios/masaje-postoperatorio.jpg' }] },
      { titulo: 'Especializados', servicios: [{ nombre: 'Prenatal', img: '/servicios/masaje-prenatal.jpg' }, { nombre: 'Posparto', img: '/servicios/masaje-posparto.jpg' }, { nombre: 'Reflexología', img: '/servicios/masaje-reflexologia.jpg' }, { nombre: 'Craneofacial', img: '/servicios/masaje-craneofacial.jpg' }] },
    ],
  },
  {
    id: 'spa',
    nombre: 'Spa',
    icono: '🧖‍♀️',
    descripcion: 'Circuito de spa y rituales de bienestar para una experiencia completa.',
    grupos: [
      { titulo: 'Circuito Spa', servicios: [{ nombre: 'Sauna seco', img: '/servicios/spa-sauna-seco.jpg' }, { nombre: 'Sauna húmedo', img: '/servicios/spa-sauna-humedo.jpg' }, { nombre: 'Baño turco', img: '/servicios/spa-bano-turco.jpg' }, { nombre: 'Jacuzzi', img: '/servicios/spa-jacuzzi.jpg' }, { nombre: 'Hidromasaje', img: '/servicios/spa-hidromasaje.jpg' }, { nombre: 'Piscina climatizada', img: '/servicios/spa-piscina-climatizada.jpg' }, { nombre: 'Duchas sensoriales', img: '/servicios/spa-duchas-sensoriales.jpg' }, { nombre: 'Sala de relajación', img: '/servicios/spa-sala-relajacion.jpg' }] },
      { titulo: 'Rituales Spa', servicios: [{ nombre: 'Ritual relajante', img: '/servicios/spa-ritual-relajante.jpg' }, { nombre: 'Ritual romántico', img: '/servicios/spa-ritual-romantico.jpg' }, { nombre: 'Ritual para parejas', img: '/servicios/spa-ritual-parejas.jpg' }, { nombre: 'Ritual antiestrés', img: '/servicios/spa-ritual-antiestres.jpg' }, { nombre: 'Ritual detox', img: '/servicios/spa-ritual-detox.jpg' }, { nombre: 'Ritual premium', img: '/servicios/spa-ritual-premium.jpg' }, { nombre: 'Ritual ejecutivo', img: '/servicios/spa-ritual-ejecutivo.jpg' }, { nombre: 'Ritual bridal', img: '/servicios/spa-ritual-bridal.jpg' }] },
    ],
  },
  {
    id: 'exfoliaciones',
    nombre: 'Exfoliaciones',
    icono: '🧂',
    descripcion: 'Exfoliaciones corporales con ingredientes naturales premium.',
    grupos: [
      { servicios: [{ nombre: 'Sal marina', img: '/servicios/exfoliacion-sal-marina.jpg' }, { nombre: 'Azúcar', img: '/servicios/exfoliacion-azucar.jpg' }, { nombre: 'Café', img: '/servicios/exfoliacion-cafe.jpg' }, { nombre: 'Chocolate', img: '/servicios/exfoliacion-chocolate.jpg' }, { nombre: 'Coco', img: '/servicios/exfoliacion-coco.jpg' }, { nombre: 'Vino', img: '/servicios/exfoliacion-vino.jpg' }, { nombre: 'Oro', img: '/servicios/exfoliacion-oro.jpg' }, { nombre: 'Perlas', img: '/servicios/exfoliacion-perlas.jpg' }, { nombre: 'Sales del Himalaya', img: '/servicios/exfoliacion-sales-himalaya.jpg' }] },
    ],
  },
  {
    id: 'envolturas-corporales',
    nombre: 'Envolturas Corporales',
    icono: '🍫',
    descripcion: 'Envolturas nutritivas y detoxificantes para la piel.',
    grupos: [
      { servicios: [{ nombre: 'Chocolate', img: '/servicios/envoltura-chocolate.jpg' }, { nombre: 'Algas', img: '/servicios/envoltura-algas.jpg' }, { nombre: 'Fango', img: '/servicios/envoltura-fango.jpg' }, { nombre: 'Barro volcánico', img: '/servicios/envoltura-barro-volcanico.jpg' }, { nombre: 'Arcillas', img: '/servicios/envoltura-arcillas.jpg' }, { nombre: 'Vino', img: '/servicios/envoltura-vino.jpg' }, { nombre: 'Oro', img: '/servicios/envoltura-oro.jpg' }, { nombre: 'Café', img: '/servicios/envoltura-cafe.jpg' }, { nombre: 'Aloe vera', img: '/servicios/envoltura-aloe-vera.jpg' }] },
    ],
  },
  {
    id: 'hidroterapia',
    nombre: 'Hidroterapia',
    icono: '💧',
    descripcion: 'Terapias con agua, color y aromas para relajar cuerpo y mente.',
    grupos: [
      { servicios: [{ nombre: 'Hidromasaje', img: '/servicios/hidroterapia-hidromasaje.jpg' }, { nombre: 'Cromoterapia', img: '/servicios/hidroterapia-cromoterapia.jpg' }, { nombre: 'Aromaterapia', img: '/servicios/hidroterapia-aromaterapia.jpg' }, { nombre: 'Baños minerales', img: '/servicios/hidroterapia-banos-minerales.jpg' }, { nombre: 'Baños de leche', img: '/servicios/hidroterapia-banos-leche.jpg' }, { nombre: 'Sales aromáticas', img: '/servicios/hidroterapia-sales-aromaticas.jpg' }] },
    ],
  },
  {
    id: 'manicura',
    nombre: 'Manicura',
    icono: '💅',
    descripcion: 'Técnicas de manicura y decoraciones artísticas a medida.',
    grupos: [
      { titulo: 'Técnicas', servicios: [{ nombre: 'Tradicional', img: '/servicios/manicura-tradicional.jpg' }, { nombre: 'Spa', img: '/servicios/manicura-spa.jpg' }, { nombre: 'Francesa', img: '/servicios/manicura-francesa.jpg' }, { nombre: 'Semipermanente', img: '/servicios/manicura-semipermanente.jpg' }, { nombre: 'Gel', img: '/servicios/manicura-gel.jpg' }, { nombre: 'Polygel', img: '/servicios/manicura-polygel.jpg' }, { nombre: 'Acrílicas', img: '/servicios/manicura-acrilicas.jpg' }, { nombre: 'Soft Gel', img: '/servicios/manicura-soft-gel.jpg' }, { nombre: 'Rubber Base', img: '/servicios/manicura-rubber-base.jpg' }, { nombre: 'Press On', img: '/servicios/manicura-press-on.jpg' }, { nombre: 'Kapping', img: '/servicios/manicura-kapping.jpg' }, { nombre: 'Esculpidas', img: '/servicios/manicura-esculpidas.jpg' }] },
      { titulo: 'Decoraciones', servicios: [{ nombre: 'Nail Art', img: '/servicios/manicura-nail-art.jpg' }, { nombre: 'Cristales Swarovski', img: '/servicios/manicura-cristales-swarovski.jpg' }, { nombre: 'Efecto espejo', img: '/servicios/manicura-efecto-espejo.jpg' }, { nombre: 'Baby Boomer', img: '/servicios/manicura-baby-boomer.jpg' }, { nombre: 'Ojo de gato', img: '/servicios/manicura-ojo-de-gato.jpg' }, { nombre: 'Encapsulados', img: '/servicios/manicura-encapsulados.jpg' }, { nombre: 'Foil', img: '/servicios/manicura-foil.jpg' }, { nombre: 'Acuarela', img: '/servicios/manicura-acuarela.jpg' }, { nombre: '3D', img: '/servicios/manicura-3d.jpg' }] },
    ],
  },
  {
    id: 'pedicura',
    nombre: 'Pedicura',
    icono: '🦶',
    descripcion: 'Pedicura estética, spa y podológica para pies sanos y prolijos.',
    grupos: [
      { servicios: [{ nombre: 'Tradicional', img: '/servicios/pedicura-tradicional.jpg' }, { nombre: 'Spa', img: '/servicios/pedicura-spa.jpg' }, { nombre: 'Podológica', img: '/servicios/pedicura-podologica.jpg' }, { nombre: 'Semipermanente', img: '/servicios/pedicura-semipermanente.jpg' }, { nombre: 'Gel', img: '/servicios/pedicura-gel.jpg' }, { nombre: 'Callosidades', img: '/servicios/pedicura-callosidades.jpg' }, { nombre: 'Talones agrietados', img: '/servicios/pedicura-talones-agrietados.jpg' }, { nombre: 'Parafina', img: '/servicios/pedicura-parafina.jpg' }, { nombre: 'Reflexología podal', img: '/servicios/pedicura-reflexologia-podal.jpg' }] },
    ],
  },
  {
    id: 'cejas',
    nombre: 'Cejas',
    icono: '👁️',
    descripcion: 'Diseño, perfilado y técnicas de pigmentación de cejas.',
    grupos: [
      { servicios: [{ nombre: 'Diseño', img: '/servicios/cejas-diseno.jpg' }, { nombre: 'Perfilado', img: '/servicios/cejas-perfilado.jpg' }, { nombre: 'Depilación', img: '/servicios/cejas-depilacion.jpg' }, { nombre: 'Hilo', img: '/servicios/cejas-hilo.jpg' }, { nombre: 'Pinza', img: '/servicios/cejas-pinza.jpg' }, { nombre: 'Henna', img: '/servicios/cejas-henna.jpg' }, { nombre: 'Laminado', img: '/servicios/cejas-laminado.jpg' }, { nombre: 'Microblading', img: '/servicios/cejas-microblading.jpg' }, { nombre: 'Micropigmentación', img: '/servicios/cejas-micropigmentacion.jpg' }, { nombre: 'Powder Brows', img: '/servicios/cejas-powder-brows.jpg' }] },
    ],
  },
  {
    id: 'pestanas',
    nombre: 'Pestañas',
    icono: '🦋',
    descripcion: 'Lifting, tinte y extensiones para una mirada intensa.',
    grupos: [
      { servicios: [{ nombre: 'Lifting', img: '/servicios/pestanas-lifting.jpg' }, { nombre: 'Permanente', img: '/servicios/pestanas-permanente.jpg' }, { nombre: 'Tinte', img: '/servicios/pestanas-tinte.jpg' }, { nombre: 'Extensiones clásicas', img: '/servicios/pestanas-extensiones-clasicas.jpg' }, { nombre: 'Volumen ruso', img: '/servicios/pestanas-volumen-ruso.jpg' }, { nombre: 'Mega volumen', img: '/servicios/pestanas-mega-volumen.jpg' }, { nombre: 'Híbridas', img: '/servicios/pestanas-hibridas.jpg' }, { nombre: 'Fox Eyes', img: '/servicios/pestanas-fox-eyes.jpg' }, { nombre: 'Wispy', img: '/servicios/pestanas-wispy.jpg' }, { nombre: 'Retoques', img: '/servicios/pestanas-retoques.jpg' }] },
    ],
  },
  {
    id: 'maquillaje',
    nombre: 'Maquillaje',
    icono: '💄',
    descripcion: 'Maquillaje profesional para eventos, novias y producciones.',
    grupos: [
      { servicios: [{ nombre: 'Social', img: '/servicios/maquillaje-social.jpg' }, { nombre: 'Novias', img: '/servicios/maquillaje-novias.jpg' }, { nombre: 'Madrinas', img: '/servicios/maquillaje-madrinas.jpg' }, { nombre: 'Fiesta', img: '/servicios/maquillaje-fiesta.jpg' }, { nombre: 'Editorial', img: '/servicios/maquillaje-editorial.jpg' }, { nombre: 'Fotografía', img: '/servicios/maquillaje-fotografia.jpg' }, { nombre: 'Televisión', img: '/servicios/maquillaje-television.jpg' }, { nombre: 'Corporativo', img: '/servicios/maquillaje-corporativo.jpg' }, { nombre: 'Halloween', img: '/servicios/maquillaje-halloween.jpg' }, { nombre: 'Artístico', img: '/servicios/maquillaje-artistico.jpg' }, { nombre: 'Infantil', img: '/servicios/maquillaje-infantil.jpg' }] },
    ],
  },
  {
    id: 'peluqueria',
    nombre: 'Peluquería',
    icono: '💇‍♀️',
    descripcion: 'Corte, color, tratamientos capilares y peinados de alta gama.',
    grupos: [
      { titulo: 'Corte', servicios: [{ nombre: 'Mujer', img: '/servicios/peluqueria-corte-mujer.jpg' }, { nombre: 'Hombre', img: '/servicios/peluqueria-corte-hombre.jpg' }, { nombre: 'Niño', img: '/servicios/peluqueria-corte-nino.jpg' }] },
      { titulo: 'Color', servicios: [{ nombre: 'Tinte', img: '/servicios/peluqueria-tinte.jpg' }, { nombre: 'Balayage', img: '/servicios/peluqueria-balayage.jpg' }, { nombre: 'Babylights', img: '/servicios/peluqueria-babylights.jpg' }, { nombre: 'Mechas', img: '/servicios/peluqueria-mechas.jpg' }, { nombre: 'Ombre', img: '/servicios/peluqueria-ombre.jpg' }, { nombre: 'Corrección de color', img: '/servicios/peluqueria-correccion-color.jpg' }, { nombre: 'Matización', img: '/servicios/peluqueria-matizacion.jpg' }, { nombre: 'Decoloración', img: '/servicios/peluqueria-decoloracion.jpg' }] },
      { titulo: 'Tratamientos', servicios: [{ nombre: 'Botox capilar', img: '/servicios/peluqueria-botox-capilar.jpg' }, { nombre: 'Keratina', img: '/servicios/peluqueria-keratina.jpg' }, { nombre: 'Hidratación', img: '/servicios/peluqueria-hidratacion.jpg' }, { nombre: 'Colágeno', img: '/servicios/peluqueria-colageno.jpg' }, { nombre: 'Ácido hialurónico capilar', img: '/servicios/peluqueria-acido-hialuronico-capilar.jpg' }, { nombre: 'Reconstrucción', img: '/servicios/peluqueria-reconstruccion.jpg' }, { nombre: 'Células madre', img: '/servicios/peluqueria-celulas-madre.jpg' }, { nombre: 'Ampollas', img: '/servicios/peluqueria-ampollas.jpg' }] },
      { titulo: 'Peinados', servicios: [{ nombre: 'Brushing', img: '/servicios/peluqueria-brushing.jpg' }, { nombre: 'Ondas', img: '/servicios/peluqueria-ondas.jpg' }, { nombre: 'Recogidos', img: '/servicios/peluqueria-recogidos.jpg' }, { nombre: 'Novias', img: '/servicios/peluqueria-peinado-novias.jpg' }, { nombre: 'Trenzas', img: '/servicios/peluqueria-trenzas.jpg' }, { nombre: 'Eventos', img: '/servicios/peluqueria-eventos.jpg' }] },
    ],
  },
  {
    id: 'barberia',
    nombre: 'Barbería',
    icono: '💈',
    descripcion: 'Corte y arreglo de barba con estilo y detalle masculino.',
    grupos: [
      { servicios: [{ nombre: 'Corte', img: '/servicios/barberia-corte.jpg' }, { nombre: 'Barba', img: '/servicios/barberia-barba.jpg' }, { nombre: 'Perfilado', img: '/servicios/barberia-perfilado.jpg' }, { nombre: 'Toallas calientes', img: '/servicios/barberia-toallas-calientes.jpg' }, { nombre: 'Camuflaje de canas', img: '/servicios/barberia-camuflaje-canas.jpg' }, { nombre: 'Limpieza facial masculina', img: '/servicios/barberia-limpieza-facial-masculina.jpg' }] },
    ],
  },
  {
    id: 'bronceado',
    nombre: 'Bronceado',
    icono: '☀️',
    descripcion: 'Bronceado sin sol, uniforme y seguro para tu piel.',
    grupos: [
      { servicios: [{ nombre: 'Spray tan', img: '/servicios/bronceado-spray-tan.jpg' }, { nombre: 'Autobronceado', img: '/servicios/bronceado-autobronceado.jpg' }, { nombre: 'Bronceado DHA', img: '/servicios/bronceado-dha.jpg' }] },
    ],
  },
  {
    id: 'bienestar',
    nombre: 'Bienestar',
    icono: '🕯️',
    descripcion: 'Terapias de relajación profunda para cuerpo y mente.',
    grupos: [
      { servicios: [{ nombre: 'Aromaterapia', img: '/servicios/bienestar-aromaterapia.jpg' }, { nombre: 'Musicoterapia', img: '/servicios/bienestar-musicoterapia.jpg' }, { nombre: 'Cromoterapia', img: '/servicios/bienestar-cromoterapia.jpg' }, { nombre: 'Meditación guiada', img: '/servicios/bienestar-meditacion-guiada.jpg' }, { nombre: 'Mindfulness', img: '/servicios/bienestar-mindfulness.jpg' }, { nombre: 'Relajación profunda', img: '/servicios/bienestar-relajacion-profunda.jpg' }] },
    ],
  },
  {
    id: 'programas-premium',
    nombre: 'Programas Premium',
    icono: '👑',
    descripcion: 'Experiencias completas de spa diseñadas para ocasiones especiales.',
    grupos: [
      { servicios: [{ nombre: 'Spa para parejas', img: '/servicios/programa-spa-parejas.jpg' }, { nombre: 'Día de princesa', img: '/servicios/programa-dia-princesa.jpg' }, { nombre: 'Día de reina', img: '/servicios/programa-dia-reina.jpg' }, { nombre: 'Bridal Spa', img: '/servicios/programa-bridal-spa.jpg' }, { nombre: 'Cumpleaños Spa', img: '/servicios/programa-cumpleanos-spa.jpg' }, { nombre: 'Spa corporativo', img: '/servicios/programa-spa-corporativo.jpg' }, { nombre: 'Spa ejecutivo', img: '/servicios/programa-spa-ejecutivo.jpg' }, { nombre: 'Spa mamá e hija', img: '/servicios/programa-spa-mama-hija.jpg' }, { nombre: 'Spa prenatal', img: '/servicios/programa-spa-prenatal.jpg' }, { nombre: 'Spa postparto', img: '/servicios/programa-spa-postparto.jpg' }, { nombre: 'Spa masculino', img: '/servicios/programa-spa-masculino.jpg' }] },
    ],
  },
  {
    id: 'servicios-vip',
    nombre: 'Servicios VIP',
    icono: '⭐',
    descripcion: 'Membresías, atención exclusiva y beneficios pensados para vos.',
    grupos: [
      { servicios: [{ nombre: 'Membresías', img: '/servicios/vip-membresias.jpg' }, { nombre: 'Gift Cards', img: '/servicios/vip-gift-cards.jpg' }, { nombre: 'Paquetes mensuales', img: '/servicios/vip-paquetes-mensuales.jpg' }, { nombre: 'Planes anuales', img: '/servicios/vip-planes-anuales.jpg' }, { nombre: 'Concierge de belleza', img: '/servicios/vip-concierge-belleza.jpg' }, 'Beauty Coach', 'Diagnóstico facial digital', 'Diagnóstico corporal', 'Seguimiento personalizado', 'Cabinas privadas VIP', 'Servicio a domicilio', 'Atención para eventos'] },
    ],
  },
]
