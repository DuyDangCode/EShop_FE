import { LoadingOverlay } from '@mantine/core'

export default function Loading() {
  return (
    <LoadingOverlay
      visible
      zIndex={1000}
      overlayProps={{ radius: 'sm', blur: 2 }}
      loaderProps={{ color: 'black', type: 'bars' }}
    />
  )
}
