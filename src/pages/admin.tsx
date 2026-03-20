@"
import { TinaAdmin } from 'tinacms'

export default function Admin() {
  return <TinaAdmin />
}
"@ | Out-File -FilePath "src\pages\admin.tsx" -Encoding UTF8
