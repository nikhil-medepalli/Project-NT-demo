const HowItWorks = () => {
  return (
    <section className="px-8 py-24 border-t border-[#1A1D24]" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Intelligent Planning Protocol.</h2>
            <p className="text-gray-400 max-w-xl text-lg">A streamlined system designed to take you from a vague idea to a fully actionable strategy in minutes.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Select State", desc: "Interact with our dedicated India map." },
              { step: "02", title: "Input Parameters", desc: "Log your leave balance, budget, and travel style." },
              { step: "03", title: "Expert Curation", desc: "A specialist builds your personalized strategy." },
              { step: "04", title: "Execute", desc: "Receive your clean, actionable itinerary." }
            ].map((item, idx) => (
              <div key={idx} className="relative p-6 bg-[#0B0E14] border border-[#1A1D24] rounded-lg">
                <div className="text-[#00E5FF] font-mono text-sm mb-4">{item.step}</div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
                
                {/* Visual connector for desktop */}
                {idx !== 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-[1px] bg-[#1A1D24]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
export default HowItWorks