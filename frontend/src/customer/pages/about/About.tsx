export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-maroon mb-2">
          The Taste of Tradition,
        </h1>
        <h1 className="text-4xl md:text-5xl font-bold">
          Since <span className="text-gold">2002</span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Point 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-maroon/10">
                <span className="text-maroon text-xl">👥</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed">
                Since 2002, Kalyani Ghee Sweets has been bringing the <span className="font-semibold text-maroon">authentic taste of Telangana</span> to homes across India. Rooted in tradition and inspired by generations of family recipes, we specialize in traditional sweets, pickles, and snacks crafted with <span className="font-semibold">pure ghee and carefully selected ingredients.</span>
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-maroon/10">
                <span className="text-maroon text-xl">👑</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed">
                What began as a passion for preserving the rich flavors of Telangana has grown into a trusted family brand. Every product is prepared in small batches using traditional methods, allowing us to maintain the freshness, authentic taste, and quality our customers have come to love.
              </p>
            </div>
          </div>

          {/* Point 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-maroon/10">
                <span className="text-maroon text-xl">🏠</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed">
                From our kitchen in <span className="font-semibold text-maroon">Hanamkonda to homes across India</span>, we are committed to delivering food that feels homemade. We take pride in maintaining high standards of hygiene, using quality ingredients, and preparing our products <span className="font-semibold text-maroon">without preservatives or artificial additives.</span>
              </p>
            </div>
          </div>

          {/* Point 4 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-maroon/10">
                <span className="text-maroon text-xl">❤️</span>
              </div>
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed">
                At Kalyani Ghee Sweets, we believe that every bite should carry the warmth of tradition and the care of a family kitchen. <span className="font-semibold text-maroon">For us, every customer is a part of the Kalyani family.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src="/src/assets/images/about us.jpg"
              alt="Kalyani Ghee Sweets"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Made with Pure Ghee Badge */}
          <div className="absolute top-6 right-6 bg-maroon rounded-full p-4 text-center text-white w-24 h-24 flex flex-col items-center justify-center shadow-lg">
            <span className="text-2xl">🫗</span>
            <p className="text-xs font-bold mt-2 leading-tight">MADE WITH<br/>PURE GHEE</p>
          </div>
        </div>
      </div>
    </div>
  );
}
