// A short-lived, non-interactive visual copy; React still owns the live page.
export function captureTransitionSnapshot(source: HTMLElement, host: HTMLElement) {
  const clone = source.cloneNode(true) as HTMLElement
  const originals = [source, ...source.querySelectorAll<HTMLElement>("*")]
  const copies = [clone, ...clone.querySelectorAll<HTMLElement>("*")]

  originals.forEach((original, index) => {
    const copy = copies[index]
    const computed = getComputedStyle(original)
    // Freeze the actual frame, including in-progress GSAP/CSS transforms.
    for (const property of computed) {
      copy.style.setProperty(property, computed.getPropertyValue(property))
    }
    copy.style.setProperty("animation", "none", "important")
    copy.style.setProperty("transition", "none", "important")
    copy.removeAttribute("id")
    for (const attribute of [...copy.attributes]) {
      if (attribute.name.startsWith("data-") || attribute.name.startsWith("on")) {
        copy.removeAttribute(attribute.name)
      }
    }
    copy.scrollTop = original.scrollTop
    copy.scrollLeft = original.scrollLeft
  })

  const bounds = source.getBoundingClientRect()
  Object.assign(clone.style, {
    position: "absolute", top: `${bounds.top}px`, left: `${bounds.left}px`,
    width: `${bounds.width}px`, margin: "0", opacity: "1",
  })
  clone.inert = true
  clone.setAttribute("aria-hidden", "true")
  host.replaceChildren(clone)
  host.style.visibility = "visible"
}

export function clearTransitionSnapshot(host: HTMLElement | null) {
  if (!host) return
  host.style.visibility = "hidden"
  host.replaceChildren()
}
