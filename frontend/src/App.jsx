import Chatbot from './components/Chatbot.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">migracion.com.mx</h1>
        <p className="mt-2">Trámites migratorios fáciles y claros</p>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">¿En qué te ayudo hoy?</h2>
          <p>Prueba el chatbot abajo o llena un formulario.</p>
        </div>
      </main>
      <Chatbot />
    </div>
  );
}

export default App;
