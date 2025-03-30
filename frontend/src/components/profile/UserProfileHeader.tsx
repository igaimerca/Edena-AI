interface UserProfileHeaderProps {
    name: string
    location?: string
    summary?: string
  }
  
  export default function UserProfileHeader({
    name,
    location,
    summary,
  }: UserProfileHeaderProps) {
    return (
      <div className="bg-gradient-to-r from-[#5D2CA8] to-black rounded-2xl p-8 mb-6 shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
        {location && <p className="text-white/70 mt-1">{location}</p>}
        {summary && <p className="text-white/90 mt-4 max-w-3xl">{summary}</p>}
      </div>
    )
  }
  