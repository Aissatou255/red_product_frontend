function Icon({ path, className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="white" className={className}>
      <path d={path} />
    </svg>
  );
}

const icons = {
  bag: "M9 2a1 1 0 0 0-1 1v1H5a2 2 0 0 0-2 2v2h18V6a2 2 0 0 0-2-2h-3V3a1 1 0 0 0-1-1H9zm1 2h4V4h-4v0zM3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9H3z",
  send: "M2 21l21-9L2 3v7l15 2-15 2v7z",
  users: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  hotel: "M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z",
  door: "M12 3L4 6v12l8 3 8-3V6l-8-3zm0 2.2L18 7v10l-6 2.25L6 17V7l6-1.8zM11 8v8h2V8h-2z",
};

function Dashboard() {
  const stats = [
    { label: 'Formulaire', value: 125, color: 'bg-purple-400', icon: icons.bag },
    { label: 'Messages', value: 40, color: 'bg-teal-500', icon: icons.send },
    { label: 'Utilisateurs', value: 600, color: 'bg-amber-400', icon: icons.users },
    { label: 'E-mails', value: 25, color: 'bg-red-600', icon: icons.bag },
    { label: 'Hôtels', value: 40, color: 'bg-purple-700', icon: icons.hotel },
    { label: 'Entrée', value: 2, color: 'bg-blue-600', icon: icons.door },
  ];

  return (
    <div>
      <div className="bg-white px-6 py-4 border-b">
        <h1 className="text-lg font-semibold">Bienvenue sur RED Product</h1>
        <p className="text-xs text-gray-400 mt-0.5">Lorem ipsum dolor sit amet consectetur</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded shadow-sm p-4 flex items-center gap-3">
              <div className={`${s.color} rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0`}>
                <Icon path={s.icon} className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold">{s.value} <span className="font-normal">{s.label}</span></span>
                <div className="text-xs text-gray-400">Je ne sais pas quoi mettre</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;