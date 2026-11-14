import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/project"
import { Services } from "@/components/sections/services"
import { Footer } from "@/components/sections/footer"

export default function Page() {
  return (
    <>
      <main id="top" tabIndex={-1} className="outline-none">
        <h1 className="sr-only">
          Lê Văn Thành An (Le Van Thanh An) — Creative Developer, Hà Nội
        </h1>
        <About />
        <Projects />
        <Services />
      </main>
      <Footer />
    </>
  )
}
