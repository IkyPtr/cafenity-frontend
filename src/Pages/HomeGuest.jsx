export default function HomeGuest() {
  return (
    <div className="min-h-screen bg-[url('/images/coffee.jpg')] bg-cover bg-center flex items-center justify-center p-8">
      <div className="backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center border border-white/20 dark:border-slate-700/30 transition-all">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white drop-shadow-sm">
          Selamat Datang di Cafenity ☕
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Rasakan ketenangan, aroma kopi, dan keindahan desain.
        </p>
      </div>
    </div>
  );
}
