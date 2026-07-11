import { groq } from "next-sanity"
import { sanityClient } from "@/lib/sanity"
import type { PortableTextBlock } from "sanity"

export type ArchNode = {
  label: string
  sub: { id: string; en: string }
}

export type TagRef = {
  _id: string
  name: string
  slug: { current: string }
}

export type ProjectItem = {
  _id: string
  title: { id: string; en: string }
  description: { id: PortableTextBlock[]; en: PortableTextBlock[] }
  tech: TagRef[]
  arch: ArchNode[]
  details: { id: string; en: string }[]
  order: number
}

export async function getProjects(): Promise<ProjectItem[]> {
  return sanityClient.fetch(
    groq`*[_type == "project"] | order(order asc) {
      _id,
      title,
      description,
      tech[]-> {
        _id,
        name,
        slug
      },
      arch[] {
        label,
        sub
      },
      details,
      order
    }`,
    {},
    { next: { revalidate: 60 } },
  )
}
