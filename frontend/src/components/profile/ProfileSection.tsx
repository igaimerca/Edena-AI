import { ReactNode } from 'react'

export default function ProfileSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      {children}
    </div>
  )
}
