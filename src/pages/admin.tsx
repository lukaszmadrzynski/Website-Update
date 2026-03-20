import { TinaAdmin, wrapTinaAdmin } from 'tinacms'

const App = wrapTinaAdmin(TinaAdmin)

export default function Admin() {
  return <App />
}
