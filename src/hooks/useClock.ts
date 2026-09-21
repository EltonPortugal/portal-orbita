import { useEffect, useState } from 'react';

function formatTime(date: Date) {
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function greetingFor(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

/**
 * Instante corrente da Home, renovado a cada 30s. Expõe o `now` cru para quem
 * precisa derivar algo dele (a contagem da próxima aula) sem abrir outro timer.
 */
export function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  return { now, time: formatTime(now), greeting: greetingFor(now) };
}
