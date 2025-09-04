import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function NotFound() {
  return (
    <div>
      <Header />
      <main className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-neutral-white mb-2">
            Page Not Found
          </h2>
          <p className="text-neutral-gray mb-6">
            The page you're looking for doesn't exist.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary hover:bg-primary-tent-1 text-neutral-white rounded-lg transition-colors duration-300"
          >
            Go Home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
