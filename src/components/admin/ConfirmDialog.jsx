import AdminModal from './AdminModal.jsx'

export default function ConfirmDialog({ open, title = '¿Estás seguro?', message, onConfirm, onCancel, confirmText = 'Eliminar' }) {
  return (
    <AdminModal
      open={open}
      title={title}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn--ghost" onClick={onCancel}>Cancelar</button>
          <button className="btn btn--primary" style={{ background: '#c0392b' }} onClick={onConfirm}>{confirmText}</button>
        </>
      }
    >
      <p style={{ color: 'var(--ink-soft)' }}>{message}</p>
    </AdminModal>
  )
}
