export default function InterviewSidebar({ title, role }: { title: string; role: string }) {
  return (
    <aside className="w-64 bg-[#111] p-4 border-r border-white/10">
      <h2 className="text-lg font-bold mb-1">{title}</h2>
      <p className="text-sm text-white/60">{role}</p>
    </aside>
  )
}
