import { useState, type FormEvent } from 'react';
import { X } from 'lucide-react';

export type Payroll = { id: string; month: string; note: string; createdAt: string };

export function PayrollModal({ onClose, onSave }: { onClose: () => void; onSave: (payroll: Omit<Payroll, 'id' | 'createdAt'>) => void }) {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!month) { setError('Selecione o mês de referência.'); return; }
    onSave({ month, note: note.trim() });
    onClose();
  }

  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="payroll-title">
    <div className="modal-head"><div><span className="eyebrow">FOLHA DE PAGAMENTO</span><h2 id="payroll-title">Nova folha</h2><p>Registre uma folha para acompanhar o período.</p></div><button className="icon-button" onClick={onClose} aria-label="Fechar"><X size={19} /></button></div>
    <form className="employee-form" onSubmit={submit}>
      <label className="field full"><span>Mês de referência</span><input type="month" value={month} onChange={(event) => setMonth(event.target.value)} /></label>
      <label className="field full"><span>Observação <small>(opcional)</small></span><textarea rows={3} placeholder="Ex.: adiantamento e benefícios conferidos" value={note} onChange={(event) => setNote(event.target.value)} /></label>
      {error && <div className="form-error">{error}</div>}
      <div className="modal-actions"><button type="button" className="button button-quiet" onClick={onClose}>Cancelar</button><button className="button button-primary" type="submit">Criar folha</button></div>
    </form>
  </section></div>;
}
