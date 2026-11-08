import Link from "next/link";

export default function CollectionsPage() {
  return (
    <main className="page-shell interior-page" id="main-content">
      <p className="eyebrow">Onéra / Collections</p>
      <h1 className="interior-title">Collections</h1>
      <p className="interior-copy">Collection details are not yet available.</p>
      <Link className="text-link" href="/">
        <span aria-hidden="true">←</span> Return home
      </Link>
    </main>
  );
}
