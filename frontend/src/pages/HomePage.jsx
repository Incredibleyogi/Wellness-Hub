import yogaImg from '../assets/yoga.png'; // Make sure this exists

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Full Background Image */}
      <section
        className="relative h-[85vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${yogaImg})` }}
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> dark overlay */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-md">
            "Wellness is the complete integration of body, mind, and spirit."
          </h1>
          <p className="text-white mt-4 text-lg drop-shadow-sm">Find your balance. Track your sessions. Transform your life.</p>
        </div>
      </section>

{/* Feature Boxes Section */}
<section className="py-12 bg-white">
  <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">Why Choose Wellness Hub?</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
    <div className="bg-indigo-50 p-6 rounded shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">🧘 Guided Yoga Sessions</h3>
      <p className="text-gray-600">Curated yoga routines for flexibility, focus, and stress relief.</p>
    </div>
    <div className="bg-indigo-50 p-6 rounded shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">📈 Progress Tracker</h3>
      <p className="text-gray-600">Track your session history and wellness goals in one place.</p>
    </div>
    <div className="bg-indigo-50 p-6 rounded shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">🌿 Mindfulness Tips</h3>
      <p className="text-gray-600">Stay mentally sharp with daily tips & breathing exercises.</p>
    </div>
  </div>
</section>


{/* Embedded Video Section */}
<section className="bg-gray-100 py-12 px-6">
  <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Watch Our Wellness Guide</h2>
  <div className="max-w-4xl mx-auto">
    <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/COp7BR_Dvps?si=9nJX9flAzT7dBALP"
        title="Yoga Intro"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white text-sm mt-auto">
        <div className="max-w-5xl mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Wellness Hub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:yogeshkawadkar413@gmail.com" className="hover:text-blue-400">📧 contact@wellnesshub.com</a>
            <a href="https://twitter.com" target="_blank" className="hover:text-blue-400">🐦 Twitter</a>
            <a href="https://github.com/Incredibleyogi/Wellness-Hub" target="_blank" className="hover:text-blue-400">💻 GitHub</a>
            <a href="https://www.linkedin.com/in/yogesh-kawadkar-b891a42bb/" target="_blank" className="hover:text-blue-400">🔗 LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
