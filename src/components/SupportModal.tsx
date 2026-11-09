import { Mail, MessageCircle, Phone, X } from 'lucide-react';

export function SupportModal({ onClose }: { onClose: () => void }) {
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="modal support-modal" role="dialog" aria-modal="true" aria-labelledby="support-title">
    <div className="modal-head"><div><span className="eyebrow">CENTRAL DE AJUDA</span><h2 id="support-title">Como podemos ajudar?</h2><p>Nosso time atende de segunda a sexta, das 9h às 18h.</p></div><button className="icon-button" onClick={onClose} aria-label="Fechar"><X size={19} /></button></div>
    <div className="support-options"><a href="mailto:suporte@folhaclara.com.br"><span><Mail size={17} /></span><div><b>Envie um e-mail</b><small>suporte@folhaclara.com.br</small></div><i>↗</i></a><a href="tel:+551140044040"><span><Phone size={17} /></span><div><b>Ligue para a gente</b><small>(11) 4004-4040</small></div><i>↗</i></a><a href="https://wa.me/5511999994040" target="_blank" rel="noreferrer"><span><MessageCircle size={17} /></span><div><b>WhatsApp</b><small>(11) 99999-4040</small></div><i>↗</i></a></div>
    <div className="support-footer">Canais e horários de demonstração. Troque pelos contatos da sua empresa antes de publicar.</div>
  </section></div>;
}
