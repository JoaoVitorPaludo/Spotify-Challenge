export const PwaInstaller = () => {
  let deferredPrompt: any = null

  const fecthDeferredPrompt = (e: any) => {
    e.preventDefault()

    deferredPrompt = e
  }

  const handleInstallClick = () => {
    deferredPrompt.prompt()
  }

  return {
    fecthDeferredPrompt,
    handleInstallClick,
  }
}
