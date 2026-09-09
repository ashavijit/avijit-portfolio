import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { SiLeetcode } from 'react-icons/si'
import Container from './containers'
import { site } from '@/lib/site'

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: site.socials.github,
      icon: Github
    },
    {
      name: 'X',
      url: site.socials.x,
      icon: Twitter
    },
    {
      name: 'LinkedIn',
      url: site.socials.linkedin,
      icon: Linkedin
    },
    {
      name: 'LeetCode',
      url: site.socials.leetcode,
      icon: SiLeetcode
    },
    {
      name: 'Email',
      url: site.socials.email,
      icon: Mail
    },
  ]

  return (
    <footer className="w-full">
      <Container className="flex flex-col items-center justify-between gap-4 py-2  sm:flex-row border border-neutral-200 dark:border-neutral-800">
        <p className="text-neutral-600 dark:text-neutral-400 text-sm font-custom2 tracking-normal transition-colors duration-300 hover:text-neutral-900 dark:hover:text-neutral-100">
          Built with love by {site.shortName}
        </p>
        <div className="flex items-center gap-4 ml-9">
          {socialLinks.map((link) => {
            const IconComponent = link.icon
            return (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 dark:text-neutral-50 opacity-70 hover:opacity-100 transition cursor-pointer "
                title={link.name}
              >
                <IconComponent size={15} />
              </Link>
            )
          })}
        </div>
      </Container>
    </footer>
  )
}

export default Footer;