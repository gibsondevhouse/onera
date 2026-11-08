import Link from "next/link";

export default function PhilosophyPage() {
  return (
    <main className="page-shell interior-page philosophy-page" id="main-content">
      <p className="eyebrow">Onéra / The house</p>
      <h1 className="interior-title">
        A study
        <br />
        in feeling.
      </h1>
      <p className="interior-copy">
        An independent fashion house. Dreams given form.
      </p>
      <Link className="text-link" href="/">
        <span aria-hidden="true">←</span> Return home
      </Link>
    </main>
  );
}
