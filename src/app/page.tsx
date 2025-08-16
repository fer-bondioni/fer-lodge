

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">
          Welcome to the Fer Lodge
        </h1>
        <h2 className="text-2xl text-center mb-12 text-gray-300">
          A Realm of Scripts and Crazy Shit
        </h2>
        
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Si te sobra coraje, escribí tu nombre y apretá enter
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
              <input
                type="text"
                placeholder="Enter your name..."
                className="w-full bg-transparent border-none outline-none text-white text-center text-lg placeholder-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
