import { TinaProvider, TinaCMS } from 'tinacms'
import { GithubClient } from '@tinacms/github'

const cms = new TinaCMS({
  enabled: true,
  github: new GithubClient({
    proxy: '/api/proxy/github',
    authProvider: function() {
      return Promise.resolve('')
    },
  }),
  sidebar: {
    position: 'disclaimer',
  },
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
