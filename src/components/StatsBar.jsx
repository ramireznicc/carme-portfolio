import { LuEye, LuBriefcase, LuLayoutGrid, LuTrendingUp } from 'react-icons/lu'

const stats = [
  { Icon: LuEye,        number: '2',   suffix: 'M+', label: 'Views totales' },
  { Icon: LuBriefcase,  number: '15',  suffix: '+',  label: 'Marcas' },
  { Icon: LuLayoutGrid, number: '200', suffix: '+',  label: 'Piezas creadas' },
  { Icon: LuTrendingUp, number: '8',   suffix: '%',  label: 'Engagement promedio' },
]

export default function StatsBar() {
  return (
    <div className="stats-bar hero-anim-4">
      {stats.map(({ Icon, number, suffix, label }) => (
        <div key={label} className="stat-item">
          <Icon size={18} strokeWidth={1.6} className="stat-icon" />
          <div className="stat-number">
            {number}<span>{suffix}</span>
          </div>
          <div className="stat-label">{label}</div>
        </div>
      ))}
    </div>
  )
}
