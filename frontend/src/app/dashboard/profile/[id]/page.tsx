'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import UserProfileHeader from '@/components/profile/UserProfileHeader'
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
        <div className=" text-white min-h-screen py-10 px-4 sm:px-10">
            <div className="max-w-5xl mx-auto">
                <UserProfileHeader
                    name={profile.name}
                    location={profile.location}
                    summary={profile.summary}
                />

                {profile.skills?.length > 0 && (
                    <ProfileSection title="Skills">
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="bg-[#5D2CA8]/20 border border-[#5D2CA8] text-white text-sm px-3 py-1 rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </ProfileSection>
                )}

                {profile.workExperiences?.length > 0 && (
                    <ProfileSection title="Work Experience">
                        {profile.workExperiences.map((exp: any, idx: number) => (
                            <ExperienceCard key={idx} {...exp} />
                        ))}
                    </ProfileSection>
                )}

                {profile.education?.length > 0 && (
                    <ProfileSection title="Education">
                        {profile.education.map((edu: any, idx: number) => (
                            <ExperienceCard key={idx} {...edu} />
                        ))}
                    </ProfileSection>
                )}

                {profile.projects?.length > 0 && (
                    <ProfileSection title="Projects">
                        {profile.projects.map((proj: any, idx: number) => (
                            <div key={idx} className="mb-4">
                                <h4 className="text-lg font-semibold">{proj.name}</h4>
                                {proj.link && (
                                    <a
                                        href={proj.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[#5D2CA8] underline"
                                    >
                                        {proj.link}
                                    </a>
                                )}
                                <p className="text-white/70 mt-1">{proj.description}</p>
                            </div>
                        ))}
                    </ProfileSection>
                )}

                {profile.certifications?.length > 0 && (
                    <ProfileSection title="Certifications">
                        {profile.certifications.map((cert: any, idx: number) => (
                            <div key={idx} className="mb-3">
                                <p className="font-semibold">{cert.title}</p>
                                <p className="text-sm text-white/60">{cert.issuer} • {cert.issueDate}</p>
                                {cert.credentialUrl && (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        className="text-xs text-[#5D2CA8] underline"
                                    >
                                        View Credential
                                    </a>
                                )}
                            </div>
                        ))}
                    </ProfileSection>
                )}

                {profile.languages?.length > 0 && (
                    <ProfileSection title="Languages">
                        <div className="flex flex-wrap gap-2">
                            {profile.languages.map((lang: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="bg-white/10 text-white px-3 py-1 rounded text-sm"
                                >
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </ProfileSection>
                )}
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
