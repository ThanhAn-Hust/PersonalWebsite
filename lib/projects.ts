export type ProjectData = {
  id: number
  slug: string
  year: string
  role: { en: string; vi: string }
  status: { en: string; vi: string }
  title: { en: string; vi: string }
  description: { en: string; vi: string }
  image_url: string
  tech?: string[]
  vr_support_type?: string
  website_url?: string
  play_web_url?: string
  unity_play_url?: string
  github_url?: string
}

export const projectData: ProjectData[] = [
  {
    id: 1,
    slug: "personal-blog",
    year: "2024 - Present",
    role: { en: "Author & Creator", vi: "Tác giả & Sáng tạo" },
    status: { en: "Active", vi: "Đang hoạt động" },
    title: { en: "Personal Blog", vi: "Blog Cá Nhân" },
    description: {
      en: "Personal website and publication where I share insights, thoughts, and technical stories.",
      vi: "Trang web cá nhân nơi tôi chia sẻ suy nghĩ, câu chuyện và trải nghiệm của bản thân.",
    },
    image_url: "/images/projects/archive.jpg",
    website_url: "https://cachiuusaa.substack.com/profile",
  },
  {
    id: 2,
    slug: "the-last-gatekeeper",
    year: "2026",
    role: { en: "Solo Game Developer", vi: "Nhà phát triển game độc lập" },
    status: { en: "Released", vi: "Đã phát hành" },
    title: {
      en: "The Last Gatekeeper",
      vi: "The Last Gatekeeper (Người Gác Cổng Cuối Cùng)",
    },
    description: {
      en: "A 2D top-down action RPG featuring a 15-hour time loop mechanic. Character progression is driven by knowledge and memory across loops rather than stat scaling.",
      vi: "Game nhập vai hành động 2D với cơ chế vòng lặp thời gian 15 giờ độc đáo. Sức mạnh đến từ tri thức và ký ức qua từng vòng lặp thay vì tăng chỉ số nhân vật.",
    },
    image_url: "/images/projects/TheLastGatekeeper.png",
    tech: ["Unity 6 (URP 2D)", "C#", "Pixel Art", "Procedural World"],
    play_web_url: "https://tlg.thanhanlv.cloud",
    unity_play_url: "https://play.unity.com/en/games/ee2c9876-f6a4-4414-a746-94bfff04b84e/the-last-gatekeeper",
  },
  {
    id: 3,
    slug: "selfmooc",
    year: "2025",
    role: { en: "Fullstack Developer", vi: "Lập trình viên Fullstack" },
    status: { en: "Live", vi: "Đang hoạt động" },
    title: { en: "SelfMOOC", vi: "SelfMOOC" },
    description: {
      en: "A modern MOOC platform empowering students to learn, track progress, and excel online.",
      vi: "Hệ thống MOOC hiện đại giúp học sinh sinh viên học tập trực tuyến và theo dõi tiến độ.",
    },
    image_url: "/images/projects/studio.jpg",
    tech: ["Next.js", "TypeScript", "MongoDB", "PostgreSQL"],
    website_url: "https://lms.thanhanlv.cloud/login",
    github_url: "https://github.com/ThanhAn-Hust/SelfMOOC.git",
  },
  {
    id: 4,
    slug: "multiplayer-framework-for-vr",
    year: "2025",
    role: { en: "XR & Network Engineer", vi: "Kỹ sư XR & Mạng" },
    status: { en: "Open Source", vi: "Mã nguồn mở" },
    title: {
      en: "Multiplayer Framework for VR",
      vi: "Khung Đa người chơi cho VR",
    },
    description: {
      en: "Framework that enables rapid creation of VR multiplayer games, optimized for low latency and physics interactions.",
      vi: "Framework cho phép tạo game VR multiplayer dễ dàng, tối ưu hóa cho tương tác vật lý và độ trễ thấp.",
    },
    image_url: "/images/projects/archive.jpg",
    tech: ["Unity", "C#", "Netcode for GameObjects", "XR Interaction Toolkit"],
    vr_support_type: "Meta Quest 2, 3",
    github_url: "https://github.com/ThanhAn-Hust/MultiplayerFramework4VR.git",
  },
  {
    id: 5,
    slug: "fox-adventure-game",
    year: "2024",
    role: { en: "Game Developer", vi: "Lập trình viên Game" },
    status: { en: "Completed", vi: "Hoàn thành" },
    title: { en: "Fox Adventure Game", vi: "Game Fox Adventure" },
    description: {
      en: "A charming 2D platformer adventure featuring whimsical levels and responsive mechanics.",
      vi: "Tựa game phiêu lưu 2D thú vị với lối chơi giải đố vượt chướng ngại vật vui vẻ.",
    },
    image_url: "/images/projects/Fox_Adventure.webp",
    tech: ["Unity", "C#"],
    unity_play_url: "https://play.unity.com/en/games/df747bac-a611-4ce6-9266-6603ed1d8702/fox-adventure",
    github_url: "https://github.com/ThanhAn-Hust/Fox_Adventure.git",
  },
  {
    id: 6,
    slug: "flight-n-meteor",
    year: "2024",
    role: { en: "Game Developer", vi: "Lập trình viên Game" },
    status: { en: "Completed", vi: "Hoàn thành" },
    title: { en: "Flight n Meteor", vi: "Flight n Meteor" },
    description: {
      en: "Fast-paced space arcade game testing reflexes by dodging hazardous meteor storms.",
      vi: "Game arcade không gian nhịp độ cao thử thách phản xạ né tránh các cơn bão thiên thạch.",
    },
    image_url: "/images/projects/content.webp",
    tech: ["Unity", "C#"],
    unity_play_url: "https://play.unity.com/en/games/ae805ebe-0f43-4f8b-ba08-a54675e56dbf/flight-and-meteor",
    github_url: "https://github.com/ThanhAn-Hust/Flight-n-Meteor.git",
  },
]

export const projects = projectData.map((project) => {
  const links: Array<{ type: "playWeb" | "playUnity" | "website" | "github"; href: string }> = []
  if (project.play_web_url) {
    links.push({ type: "playWeb", href: project.play_web_url })
  }
  if (project.unity_play_url) {
    links.push({ type: "playUnity", href: project.unity_play_url })
  }
  if (project.website_url) {
    links.push({ type: "website", href: project.website_url })
  }
  if (project.github_url) {
    links.push({ type: "github", href: project.github_url })
  }

  return {
    ...project,
    lines: {
      en: project.title.en.match(/\S+(?:\s+\S+)?/g) ?? [project.title.en],
      vi: project.title.vi.match(/\S+(?:\s+\S+)?/g) ?? [project.title.vi],
    },
    category: project.tech?.join(" · ") ?? "Personal project",
    image: project.image_url,
    imageAlt: `Image for ${project.title.en}`,
    tags: project.tech ?? [],
    vrSupport: project.vr_support_type,
    links,
  }
})

export type PortfolioProject = (typeof projects)[number]
