export const PwaInstaller = () => {
  let deferredPrompt: any = null

  const fetchDeferredPrompt = (e: any) => {
    e.preventDefault()

    deferredPrompt = e
  }

  const handleInstallClick = () => {
    deferredPrompt.prompt()
  }

  return {
    fetchDeferredPrompt,
    handleInstallClick,
  }
}
