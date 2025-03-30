import { Plus, Pencil } from 'lucide-react'

interface ProfileSectionProps {
  title: string
  hasContent?: boolean
  children: React.ReactNode
}

export default function ProfileSection({ title, hasContent = false, children }: ProfileSectionProps) {
  return (
    <section className="border-t border-white/10 pt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button className="text-white/50 hover:text-white transition-colors">
          {hasContent ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>
      <div>
        {children}
      </div>
    </section>
  )
}
