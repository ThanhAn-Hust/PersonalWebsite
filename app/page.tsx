import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/project"
import { Services } from "@/components/sections/services"
import { Footer } from "@/components/sections/footer"

export default function Page() {
  return (
    <>
      <main id="top" tabIndex={-1} className="outline-none">
        <About />
        <Projects />
        <Services />
      </main>
      <Footer />
    </>
  )
}
