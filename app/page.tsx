import RegisterForm from "./register-form";

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-[#f5d67a] font-semibold tracking-wide text-sm uppercase mb-2">
            Vases d&apos;Honneur
          </p>
          <h1 className="text-3xl font-bold mb-2">La Grande Rencontre</h1>
          <p className="text-white/70 text-sm">
            Dimanche 4 Octobre 2026 — Stade Félix Houphouët-Boigny
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-lg font-semibold mb-5">Formulaire d&apos;inscription</h2>
          <RegisterForm />
        </div>

        <p className="text-center text-xs text-white/40 mt-6">
          Distinction Divine
        </p>
      </div>
    </main>
  );
}
