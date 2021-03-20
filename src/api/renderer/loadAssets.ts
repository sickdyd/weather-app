export const syncLoadAssets = (): string => require(process.env.RAZZLE_ASSETS_MANIFEST)

export const cssLinksFromAssets = (assets, entrypoint): string => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css.map((asset) => `<link rel="stylesheet" href="${asset}">`).join('')
      : ''
    : ''
}

export const jsScriptTagsFromAssets = (assets, entrypoint, extra = ''): string => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js.map((asset) => `<script src="${asset}"${extra}></script>`).join('')
      : ''
    : ''
}
