"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ComponentProps, type ReactNode } from "react"
import gsap from "gsap"
import { resetPageScroll } from "@/lib/page-scroll"
import { captureTransitionSnapshot, clearTransitionSnapshot } from "@/lib/transition-snapshot"

const TransitionContext = createContext<((href: string) => void) | null>(null)
const PageReadyContext = createContext(true)

export function usePageReady() {
  return useContext(PageReadyContext)
}

export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [readyPath, setReadyPath] = useState<string | null>(pathname)
  const pageReady = readyPath === pathname
  const overlay = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const snapshot = useRef<HTMLDivElement>(null)
  const pending = useRef(false)
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previousPath = useRef(pathname)
  const coveredPath = useRef<string | null>(null)
  const historyTransition = useRef<{
    path: string
    timeline: gsap.core.Timeline
    covered: boolean
  } | null>(null)

  useLayoutEffect(() => {
    // The initial load has its own intro; route changes use the page wipe.
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    resetPageScroll()
    // A swipe may start its entrance before React commits the restored route.
    // Keep that entrance running, then release the exit once both are ready.
    const history = historyTransition.current
    if (history?.path === pathname) {
      if (content.current) content.current.style.opacity = "0"
      if (history.covered) history.timeline.play()
      return
    }
    history?.timeline.kill()
    historyTransition.current = null
    const alreadyCovered = coveredPath.current === pathname
    const panels = overlay.current?.querySelectorAll<HTMLElement>("[data-transition-panel]") ?? []
    coveredPath.current = null
    if (fallback.current) clearTimeout(fallback.current)
    gsap.killTweensOf(overlay.current)
    gsap.killTweensOf(panels)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clearTransitionSnapshot(snapshot.current)
      pending.current = false
      if (content.current) content.current.style.opacity = ""
      gsap.set(overlay.current, { visibility: "hidden", pointerEvents: "none" })
      const frame = requestAnimationFrame(() => {
        resetPageScroll()
        setReadyPath(pathname)
      })
      return () => cancelAnimationFrame(frame)
    }
    // Links already animated to the center before navigating. Back/Forward
    // need the entrance too, rather than appearing instantly at the center.
    gsap.set(overlay.current, { visibility: "visible", pointerEvents: "auto" })
    gsap.set(panels, { yPercent: alreadyCovered ? 0 : -100 })
    // The outgoing snapshot remains visible while React commits the new page.
    // Swap the visual layers only once the overlay completely covers them.
    // Opacity preserves layout/scroll measurements and hides visible children too.
    if (content.current) content.current.style.opacity = "0"
    pending.current = true
    fallback.current = setTimeout(() => {
      gsap.killTweensOf(overlay.current)
      pending.current = false
      clearTransitionSnapshot(snapshot.current)
      resetPageScroll()
      setReadyPath(window.location.pathname)
      if (content.current) content.current.style.opacity = ""
      gsap.set(overlay.current, { visibility: "hidden", pointerEvents: "none" })
    }, 8000)
    const timeline = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        if (fallback.current) clearTimeout(fallback.current)
        pending.current = false
        clearTransitionSnapshot(snapshot.current)
        resetPageScroll()
        setReadyPath(pathname)
        if (content.current) content.current.style.opacity = ""
        gsap.set(overlay.current, { visibility: "hidden", pointerEvents: "none" })
        document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true })
      },
    })
    if (!alreadyCovered) {
      timeline.to(panels, {
        yPercent: 0, duration: 0.5, stagger: 0.08,
      })
    }
    timeline.to(panels, {
      yPercent: 100,
      duration: 0.8,
      stagger: 0.08,
      onStart: () => {
        resetPageScroll()
        setReadyPath(pathname)
        if (content.current) content.current.style.opacity = ""
        clearTransitionSnapshot(snapshot.current)
      },
    })
    return () => { timeline.kill() }
  }, [pathname])

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"
    const element = overlay.current
    const panels = element?.querySelectorAll<HTMLElement>("[data-transition-panel]") ?? []
    const pageContent = content.current
    const snapshotHost = snapshot.current
    const onHistoryNavigation = () => {
      const destination = window.location.pathname
      // Hash-only history remains normal section scrolling.
      if (destination === previousPath.current) return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      // Capture the outgoing viewport before Next.js handles the history event.
      // Keep an existing snapshot if another swipe interrupts this transition.
      if (pageContent && snapshotHost && !snapshotHost.hasChildNodes()) {
        captureTransitionSnapshot(pageContent, snapshotHost)
      }
      if (pageContent) pageContent.style.opacity = "0"
      setReadyPath(null)

      historyTransition.current?.timeline.kill()
      gsap.killTweensOf(element)
      gsap.killTweensOf(panels)
      if (fallback.current) clearTimeout(fallback.current)
      coveredPath.current = null
      pending.current = true

      const finish = () => {
        if (fallback.current) clearTimeout(fallback.current)
        historyTransition.current = null
        pending.current = false
        clearTransitionSnapshot(snapshotHost)
        resetPageScroll()
        setReadyPath(window.location.pathname)
        if (pageContent) pageContent.style.opacity = ""
        gsap.set(element, { visibility: "hidden", pointerEvents: "none" })
      }
      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          finish()
          document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true })
        },
      })
      const transition = { path: destination, timeline, covered: false }
      historyTransition.current = transition
      timeline
        .set(element, { visibility: "visible", pointerEvents: "auto" })
        .fromTo(panels,
          { yPercent: -100 },
          { yPercent: 0, duration: 0.5, stagger: 0.08 },
        )
        .addPause(undefined, () => {
          transition.covered = true
          if (previousPath.current === destination) {
            timeline.play()
          }
        })
        .to(panels, {
          yPercent: 100,
          duration: 0.8,
          stagger: 0.08,
          onStart: () => {
            resetPageScroll()
            setReadyPath(destination)
            if (pageContent) pageContent.style.opacity = ""
            clearTransitionSnapshot(snapshotHost)
          },
        })
      fallback.current = setTimeout(() => {
        timeline.kill()
        finish()
      }, 8000)
      timeline.play()
    }
    window.addEventListener("popstate", onHistoryNavigation, true)
    return () => {
      window.history.scrollRestoration = previousRestoration
      window.removeEventListener("popstate", onHistoryNavigation, true)
      if (fallback.current) clearTimeout(fallback.current)
      historyTransition.current?.timeline.kill()
      gsap.killTweensOf(element)
      gsap.killTweensOf(panels)
      clearTransitionSnapshot(snapshotHost)
      if (pageContent) pageContent.style.opacity = ""
    }
  }, [])

  const navigate = (href: string) => {
    if (pending.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href, { scroll: false })
      return
    }
    pending.current = true
    const panels = overlay.current?.querySelectorAll<HTMLElement>("[data-transition-panel]") ?? []
    if (content.current && snapshot.current) {
      captureTransitionSnapshot(content.current, snapshot.current)
    }
    // Start the watchdog before the animation, not only after it finishes.
    fallback.current = setTimeout(() => {
      gsap.killTweensOf(overlay.current)
      pending.current = false
      coveredPath.current = null
      clearTransitionSnapshot(snapshot.current)
      resetPageScroll()
      setReadyPath(window.location.pathname)
      if (content.current) content.current.style.opacity = ""
      gsap.set(overlay.current, { visibility: "hidden", pointerEvents: "none" })
    }, 8000)
    gsap.set(overlay.current, { visibility: "visible", pointerEvents: "auto" })
    gsap.fromTo(panels, { yPercent: -100 }, {
      yPercent: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power4.inOut",
      onComplete: () => {
        coveredPath.current = href.split("#")[0].split("?")[0]
        router.push(href, { scroll: false })
      },
    })
  }

  return (
    <TransitionContext.Provider value={navigate}>
      <PageReadyContext.Provider value={pageReady}>
        <div ref={content} data-transition-content inert={!pageReady} style={{ opacity: pageReady ? undefined : 0 }} className={pageReady ? undefined : "[&_*]:[animation-play-state:paused]"}>{children}</div>
      </PageReadyContext.Provider>
      <div ref={snapshot} data-transition-snapshot aria-hidden="true" inert className="pointer-events-none invisible fixed inset-0 z-[190] overflow-hidden bg-background" />
      <div ref={overlay} data-page-transition aria-hidden="true" className="pointer-events-none invisible fixed inset-0 z-200 grid grid-cols-12 overflow-hidden">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} data-transition-panel className="h-full bg-black" />
        ))}
      </div>
    </TransitionContext.Provider>
  )
}

export function TransitionLink({ href, children, ...props }: Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & { href: string }) {
  const navigate = useContext(TransitionContext)
  const pathname = usePathname()
  return (
    <Link {...props} href={href} onNavigate={(event) => {
      if (!navigate || href.split("#")[0] === pathname || href.startsWith("#")) return
      event.preventDefault()
      navigate(href)
    }}>{children}</Link>
  )
}
