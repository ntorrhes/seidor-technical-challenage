import { useState, type FormEvent } from 'react';
import { ArrowRight, LockKeyhole } from 'lucide-react';

export type User = { name: string; email: string };

export function LoginPage({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState('mariana@folhaclara.com.br');
  const [password, setPassword] = useState('folhaclara');
  const [error, setError] = useState('');

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!email.includes('@') || password.length < 6) {
      setError('Confira seu e-mail e senha.');
      return;
    }
    onLogin({ name: 'Mariana Costa', email });
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <a className="brand login-brand" href="#">
          <span className="brand-mark">
            <span />
          </span>
          <span className="brand-name">
            folha<span>clara</span>
          </span>
        </a>
        <div className="login-copy">
          <span className="eyebrow">BEM-VINDO</span>
          <h1>Vamos cuidar da sua equipe.</h1>
          <p>
            Veja o resumo da folha, acompanhe as pessoas e mantenha o processo
            simples.
          </p>
        </div>
        <form className="login-form" onSubmit={submit}>
          <label className="field">
            <span>E-mail</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>Senha</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <div className="form-error">{error}</div>}
          <button className="button button-primary login-submit" type="submit">
            Entrar <ArrowRight size={16} />
          </button>
        </form>
        <p className="login-demo">
          <LockKeyhole size={13} /> Acesso de demonstração. Use qualquer e-mail
          válido e uma senha com 6 caracteres ou mais.
        </p>
      </section>
      <div className="login-aside">
        <div className="login-art">
          <span>FC</span>
        </div>
        <p>
          Uma rotina de RH
          <br />
          mais leve e mais humana.
        </p>
        <small>Folha Clara · Gestão de equipes</small>
      </div>
    </main>
  );
}
