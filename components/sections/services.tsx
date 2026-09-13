"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Reveal, ScrollWords } from "@/components/motion/reveal"
import { useLanguage } from "@/contexts/language-context"

export function Services() {
  const [active, setActive] = useState<number | null>(null)
  const { language, t } = useLanguage()

  const quote = language === "vi" 
    ? "Một trải nghiệm số xuất sắc luôn mang lại cảm xúc chân thực. Tôi kết hợp giữa tư duy thiết kế và kỹ thuật lập trình để tạo ra những tác phẩm có góc nhìn rõ rệt. Hãy cùng nhau tạo nên những điều thực sự đáng nhớ."
    : "Good digital experiences make you feel something. I bring design and development together to create work with a clear point of view. From a bold first impression to a thoughtful final detail, every part should feel connected. Let’s make something worth spending time with."

  const outro = language === "vi"
    ? "Tôi là một người luôn tò mò, thích khám phá cả khía cạnh thị giác lẫn kỹ thuật của dự án. Tôi thích lắng nghe, đặt đúng câu hỏi và biến ý tưởng chung thành một sản phẩm chỉn chu từ đầu đến cuối."
    : "I’m a curious maker who enjoys both the visual and technical sides of a project. I like working closely with people, asking the right questions, and turning a shared idea into an experience that feels considered from start to finish."

  return (
    <section aria-labelledby="services-title" className="overflow-hidden px-6 pb-40 md:px-10 md:pb-64">
      <ScrollWords text={quote} className="max-w-[1450px] text-[clamp(1.8rem,3.3vw,4rem)] leading-[1.35] font-medium tracking-[-0.035em]" />
      <Reveal className="mt-32 md:mt-48">
        <h2 id="services-title" className="mb-12 text-sm uppercase">({t.services.heading})</h2>
      </Reveal>
      {t.services.items.map((service, index) => {
        const open = active === index
        return (
          <Reveal key={service.title} className={index % 2 ? "text-right" : index === 2 ? "md:ml-[8%]" : ""}>
            <Button variant="ghost" aria-expanded={open} aria-controls={`service-${index}`} onClick={() => setActive(open ? null : index)} className="group h-auto max-w-full justify-start gap-3 rounded-none px-0 py-4 text-[clamp(2rem,5.5vw,6.5rem)] leading-none font-extrabold tracking-[-0.035em] whitespace-normal uppercase hover:bg-transparent hover:text-primary/65 focus-visible:ring-2 focus-visible:ring-primary md:gap-6">
              {service.title}
              <span className="inline-flex items-center gap-1 font-light">(<Plus aria-hidden="true" className={`size-5! transition-transform duration-500 md:size-10! ${open ? "rotate-45" : ""}`} />)</span>
            </Button>
            <div id={`service-${index}`} inert={!open} onTransitionEnd={(event) => { if (event.propertyName === "grid-template-rows") ScrollTrigger.refresh() }} className={`grid transition-[grid-template-rows,opacity] duration-500 motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden"><p className="pt-2 pb-7 text-sm leading-relaxed font-light md:text-xl">{service.desc}</p></div>
            </div>
          </Reveal>
        )
      })}
      <Reveal className="mt-20 ml-auto max-w-lg md:mt-28">
        <p className="text-lg leading-relaxed font-light tracking-[-0.02em]">{outro}</p>
      </Reveal>
    </section>
  )
}
