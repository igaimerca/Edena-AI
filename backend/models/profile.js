const mongoose = require('mongoose')

const UserProfileSchema = new mongoose.Schema({
  // Personal Info
  name: String,
  email: String,
  phoneNumber: String,
  location: String,
  linkedin: String,
  github: String,
  portfolio: String,
  website: String,
  languages: [String],

  // Profile Summary
  summary: String,

  // Skills
  skills: [String],

  // Work Experience
  workExperiences: [
    {
      title: String,
      company: String,
      location: String,
      startDate: String,
      endDate: String,
      achievements: [String],
    }
  ],

  // Education
  education: [
    {
      institution: String,
      location: String,
      degree: String,
      fieldOfStudy: String,
      startDate: String,
      endDate: String,
    }
  ],

  // Projects
  projects: [
    {
      name: String,
      description: String,
      duration: String,
      technologies: [String],
      achievements: [String],
      link: String,
    }
  ],

  // Volunteer Work
  volunteerExperiences: [
    {
      role: String,
      organization: String,
      location: String,
      startDate: String,
      endDate: String,
      contributions: [String],
    }
  ],

  // Certifications
  certifications: [
    {
      title: String,
      issuer: String,
      issueDate: String,
      expiryDate: String,
      credentialId: String,
      credentialUrl: String,
    }
  ],

  // Awards
  awards: [
    {
      title: String,
      issuer: String,
      date: String,
      description: String,
    }
  ],

  // Publications
  publications: [
    {
      title: String,
      publisher: String,
      date: String,
      link: String,
      description: String,
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('UserProfile', UserProfileSchema)
