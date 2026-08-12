import { SignalField } from "./SignalField";

export function Quote() {
  return (
    <section className="section quote-band" aria-label="Citat VIDIA">
      <div className="container quote-band-inner">
        <blockquote className="quote-text">
          <span className="quote-mark" aria-hidden="true">
            „
          </span>
          <p>
            Mulți au idei strălucite. Mulți pot spune că ar putea face același
            lucru, poate chiar mai bine. Însă 99% dintre ei se opresc la stadiul
            de intenție, blocați de teama necunoscutului, de scepticism sau de
            momentul «perfect» care nu mai vine. Diferența reală între a visa la
            un business și a-l construi o face acel 1% care are curajul să
            acționeze, să greșească, să riște și să meargă înainte.
          </p>
          <p className="quote-close">
            În antreprenoriat, execuția bate întotdeauna intenția.
          </p>
        </blockquote>
      </div>
      <SignalField variant="quote" />
    </section>
  );
}
