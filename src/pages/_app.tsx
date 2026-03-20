import { TinaProvider, TinaCMS } from 'tinacms'

const cms = new TinaCMS({
  enabled: true,
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
})

export default function App({ Component, pageProps }) {
  return (
    <TinaProvider cms={cms}>
      <Component {...pageProps} />
    </TinaProvider>
  )
}
