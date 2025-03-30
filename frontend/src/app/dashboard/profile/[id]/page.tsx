'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import {
  Loader2, Globe, Github, Linkedin, Link, MapPin, Mail, Phone,
  Plus
} from 'lucide-react'
import ProfileSection from '@/components/profile/ProfileSection'

export default function UserProfilePage() {
  const { id } = useParams()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/profile/${id}`)
        const data = await res.json()
        setProfile(data)
      } catch (error) {
        toast.error('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        Loading profile...
      </div>
    )
  }

  if (!profile) {
    return <div className="text-white text-center mt-10">Profile not found.</div>
  }

  return (
    <div className="min-h-screen pb-10 pt-2 px-4 sm:px-10 bg-black text-white">

      {/* Banner + Profile Card Section */}
      <div className="relative w-full h-48 bg-gradient-to-br from-purple-900 via-[#5D2CA8] to-black rounded-xl mb-20 overflow-hidden">
        <button className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1 rounded shadow">
          Edit banner
        </button>
      </div>

      <div className="relative -mt-[10em] w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-6 py-6 shadow-xl max-w-[80%] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#5D2CA8] flex items-center justify-center text-white font-bold text-xl">
              {profile.name?.slice(0, 2).toUpperCase() || 'ST'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
              <p className="text-sm text-white/70">{profile.email || 'Add email'}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {profile.phoneNumber || 'Add phone'}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {profile.location || 'Add location'}
            </div>
            <a href={profile.linkedin || '#'} target="_blank" className="flex items-center gap-1 hover:text-[#5D2CA8]">
              <Linkedin className="w-4 h-4" />
              {profile.linkedin ? 'LinkedIn' : "Add LinkedIn"}
            </a>
            <a href={profile.portfolio || '#'} target="_blank" className="flex items-center gap-1 hover:text-[#5D2CA8]">
              <Link className="w-4 h-4" />
              {profile.linkedin ? 'Portfolio' : "Add Portfolio"}
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[80%] mx-auto">
        <div className="mt-12 space-y-10">
          <ProfileSection title="Summary" hasContent={!!profile.summary}>
            {profile.summary ? (
              <p className="text-white/80 text-sm">{profile.summary}</p>
            ) : (
              <p className="text-white/40 italic text-sm">No summary added yet.</p>
            )}
          </ProfileSection>

          <ProfileSection title="Skills" hasContent={!!profile.skills?.length}>
            <div className="flex flex-wrap gap-2">
              {profile.skills?.length ? (
                profile.skills.map((skill: string, i: number) => (
                  <span key={i} className="bg-[#5D2CA8]/20 border border-[#5D2CA8] text-white text-sm px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-white/40 italic text-sm">No skills added yet.</p>
              )}
            </div>
          </ProfileSection>

          <ProfileSection title="Work Experience" hasContent={!!profile.workExperiences?.length}>
            {profile.workExperiences?.length ? (
              profile.workExperiences.map((exp: any, idx: number) => (
                <ExperienceCard key={idx} {...exp} />
              ))
            ) : (
              <p className="text-white/40 italic text-sm">No work experience added yet.</p>
            )}
          </ProfileSection>

          <ProfileSection title="Projects" hasContent={!!profile.projects?.length}>
            {profile.projects?.length ? (
              profile.projects.map((proj: any, idx: number) => (
                <div key={idx} className="mb-4">
                  <h4 className="text-lg font-semibold">{proj.name}</h4>
                  <p className="text-white/60 text-sm italic">{proj.duration}</p>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm text-[#5D2CA8] underline">
                      {proj.link}
                    </a>
                  )}
                  <p className="text-white/70 mt-1 text-sm">{proj.description}</p>
                  {proj.technologies?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {proj.technologies.map((tech: string, i: number) => (
                        <span key={i} className="bg-white/10 text-white px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.achievements?.length > 0 && (
                    <ul className="text-sm text-white/70 list-disc list-inside mt-2 space-y-1">
                      {proj.achievements.map((ach: string, i: number) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p className="text-white/40 italic text-sm">No projects added yet.</p>
            )}
          </ProfileSection>

          <ProfileSection title="Volunteer Experience" hasContent={!!profile.volunteerExperiences?.length}>
            {profile.volunteerExperiences?.length ? (
              profile.volunteerExperiences.map((vol: any, idx: number) => (
                <div key={idx} className="mb-4">
                  <h4 className="text-lg font-semibold">{vol.role}</h4>
                  <p className="text-sm text-white/60">{vol.organization} • {vol.location}</p>
                  <p className="text-sm text-white/50">{vol.startDate} – {vol.endDate}</p>
                  {vol.contributions?.length > 0 && (
                    <ul className="text-sm text-white/70 list-disc list-inside mt-2 space-y-1">
                      {vol.contributions.map((point: string, i: number) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p className="text-white/40 italic text-sm">No volunteer experience added yet.</p>
            )}
          </ProfileSection>

          <ProfileSection title="Education" hasContent={!!profile.education?.length}>
            {profile.education?.length ? (
              profile.education.map((edu: any, idx: number) => (
                <ExperienceCard key={idx} {...edu} />
              ))
            ) : (
              <p className="text-white/40 italic text-sm">No education info added yet.</p>
            )}
          </ProfileSection>

          <ProfileSection title="Certifications" hasContent={!!profile.certifications?.length}>
            {profile.certifications?.length ? (
              profile.certifications.map((cert: any, idx: number) => (
                <div key={idx} className="mb-3">
                  <p className="font-semibold">{cert.title}</p>
                  <p className="text-sm text-white/60">{cert.issuer} • {cert.issueDate}</p>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" className="text-xs text-[#5D2CA8] underline">
                      View Credential
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-white/40 italic text-sm">No certifications added yet.</p>
            )}
          </ProfileSection>

          <ProfileSection title="Languages" hasContent={!!profile.languages?.length}>
            <div className="flex flex-wrap gap-2">
              {profile.languages?.length ? (
                profile.languages.map((lang: string, idx: number) => (
                  <span key={idx} className="bg-white/10 text-white px-3 py-1 rounded text-sm">
                    {lang}
                  </span>
                ))
              ) : (
                <p className="text-white/40 italic text-sm">No languages added yet.</p>
              )}
            </div>
          </ProfileSection>
          
        </div>
      </div>
    </div>
  )
}

const ExperienceCard = ({ title, company, institution, location, startDate, endDate, achievements }: any) => (
  <div className="mb-4">
    <h4 className="text-lg font-semibold">{title || '—'}</h4>
    <p className="text-sm text-white/60">{company || institution} • {location}</p>
    <p className="text-sm text-white/50">{startDate} – {endDate}</p>
    {achievements?.length > 0 && (
      <ul className="text-sm text-white/70 list-disc list-inside mt-2 space-y-1">
        {achievements.map((point: string, i: number) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    )}
  </div>
)
