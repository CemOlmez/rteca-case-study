export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-semibold">
          Welcome to RTECA CRM Dashboard
        </h1>

        <p className="text-gray-600">
          This application is a case study demonstrating franchise and office
          management features.
        </p>

        <p className="text-gray-500 text-sm">
          To get started, navigate using the sidebar to access the Dashboard,
          Franchises, or Offices sections.
        </p>

        <div className="pt-4">
          <a
            href="https://github.com/CemOlmez/rteca-case-study"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            View project source on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}
