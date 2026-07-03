import PublicNavbar from '../components/PublicNavbar.jsx'
import PublicFooter from '../components/PublicFooter.jsx'

export default function PoliticaPrivacidad() {
  return (
    <>
      <PublicNavbar />
      <section className="section">
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div className="section__eyebrow">Legal</div>
          <h1 style={{ marginBottom: 24 }}>Política de privacidad</h1>
          <p style={{ marginBottom: 16, color: 'var(--ink-soft)' }}>
            En Spa de Uñas Premium respetamos tu privacidad. Esta política describe
            cómo tratamos los datos personales que compartís con nosotros al reservar
            un servicio o contactarnos por WhatsApp.
          </p>

          <h3 style={{ marginTop: 28, marginBottom: 10 }}>Qué datos recolectamos</h3>
          <p style={{ color: 'var(--ink-soft)' }}>
            Solamente los datos necesarios para coordinar tu reserva: nombre, número
            de contacto y preferencias del servicio.
          </p>

          <h3 style={{ marginTop: 28, marginBottom: 10 }}>Para qué los usamos</h3>
          <p style={{ color: 'var(--ink-soft)' }}>
            Únicamente para gestionar la atención, recordarte tu turno y ofrecerte
            promociones si expresamente lo autorizás.
          </p>

          <h3 style={{ marginTop: 28, marginBottom: 10 }}>Con quién los compartimos</h3>
          <p style={{ color: 'var(--ink-soft)' }}>
            Con nadie. No vendemos, ni cedemos, ni transferimos tus datos a terceros.
          </p>

          <h3 style={{ marginTop: 28, marginBottom: 10 }}>Tus derechos</h3>
          <p style={{ color: 'var(--ink-soft)' }}>
            Podés pedirnos actualizar o eliminar tus datos en cualquier momento
            escribiéndonos por WhatsApp.
          </p>
        </div>
      </section>
      <PublicFooter />
    </>
  )
}
