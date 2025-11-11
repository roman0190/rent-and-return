import { getTranslations, setRequestLocale } from "next-intl/server"; // ← getTranslations import করো

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations(); 

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t("home.title")}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t("home.subtitle")}
          </p>
          <div className="bg-black rounded-lg shadow-md p-8">
            <p className="text-gray-700">{t("home.description")}</p>
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Current Language: {lang.toUpperCase()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
