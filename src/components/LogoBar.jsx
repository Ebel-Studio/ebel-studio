const clients = [
  { name: 'Vakantiehuisje Schoorl', type: 'Vakantieverhuur' },
  { name: 'Studio Klein Schoorl', type: 'Boutique Verblijf' },
  { name: 'Kappie Bouw & Renovatie', type: 'Lokaal MKB' },
  { name: 'Bakkerij De Kaasboer', type: 'Horeca' },
  { name: 'Wellness Noord', type: 'Dienstverlening' },
  { name: 'Zandmotor B&B', type: 'Vakantieverhuur' },
  { name: 'Hoek & Haak Makelaars', type: 'Lokaal MKB' },
  { name: 'Café De Ruif Bergen', type: 'Horeca' },
]

// Duplicate for seamless loop
const allClients = [...clients, ...clients]

function LogoItem({ name, type }) {
  return (
    <div className="flex-none flex items-center gap-3 px-8 py-4 mx-3 rounded-2xl border border-[#0F0F0E]/08 bg-white/50">
      <div className="w-7 h-7 rounded-lg bg-[#0F0F0E]/08 flex items-center justify-center shrink-0">
        <span className="text-[#0F0F0E]/40 text-xs font-mono font-bold">{name[0]}</span>
      </div>
      <div>
        <p className="text-[#0F0F0E]/60 text-sm font-medium whitespace-nowrap">{name}</p>
        <p className="text-[#0F0F0E]/30 text-xs whitespace-nowrap">{type}</p>
      </div>
    </div>
  )
}

export default function LogoBar() {
  return (
    <section className="py-14 bg-[#F1EFE8] overflow-hidden">
      <div className="text-center mb-8 px-6">
        <p className="text-[#0F0F0E]/40 text-sm font-mono tracking-widest uppercase">
          Vertrouwd door lokale ondernemers
        </p>
      </div>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {allClients.map((c, i) => (
            <LogoItem key={i} name={c.name} type={c.type} />
          ))}
        </div>
      </div>
    </section>
  )
}
