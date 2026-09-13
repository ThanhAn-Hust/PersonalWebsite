import type Lenis from "lenis"

let scroller: Lenis | null = null

export function setPageScroller(instance: Lenis | null) {
  scroller = instance
}

export function resetPageScroll() {
  // Cancel any remaining smooth-scroll momentum as well as native scrolling.
  scroller?.scrollTo(0, { immediate: true, force: true })
  window.scrollTo({ top: 0, left: 0, behavior: "instant" })
}
