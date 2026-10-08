const fs = require('fs')
const path = require('path')

const tmp = path.join(process.env.TEMP || process.env.TMPDIR || '/tmp', 'pk-locations')
const outPath = path.join(__dirname, '..', 'src', 'data', 'pakistanLocations.js')

const citiesPkg = JSON.parse(fs.readFileSync(path.join(tmp, 'package', 'data', 'cities.json'), 'utf8'))
const dropdown = JSON.parse(fs.readFileSync(path.join(tmp, 'pakistan_dropdown.json'), 'utf8'))
const newFile = JSON.parse(fs.readFileSync(path.join(tmp, 'new_file.json'), 'utf8'))
const pakistan = JSON.parse(fs.readFileSync(path.join(tmp, 'pakistan.json'), 'utf8'))
const cscCities = JSON.parse(fs.readFileSync(path.join(tmp, 'csc', 'package', 'lib', 'cjs', 'assets', 'city.json'), 'utf8'))

const title = (s) =>
  String(s || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[_-]/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bOf\b/g, 'of')
    .replace(/\bAnd\b/g, 'and')
    .replace(/\bThe\b/g, 'the')

const ALIASES = {
  'Ahmedpur East': 'Ahmadpur East',
  'Ahmed Pur East': 'Ahmadpur East',
  'Ali Pur': 'Alipur',
  'Ali Pur Chatta': 'Alipur Chatha',
  'Ali Khan Abad': 'Ali Khanabad',
  'Depalpur': 'Dipalpur',
  'Dipal Pur': 'Dipalpur',
  'Fateh Jhang': 'Fateh Jang',
  'Liaquat Pur': 'Liaquatpur',
  'Kehror Pakka': 'Kahror Pacca',
  'Kahror Pakka': 'Kahror Pacca',
  'Mirpur Bhtoro': 'Mirpur Bathoro',
  'Nawabshah': 'Shaheed Benazirabad',
  'Banigala': 'Bani Gala',
  'New Mirpur': 'Mirpur',
  'Mingora': 'Mingora',
  'Saidu Sharif': 'Saidu Sharif',
  'Rawlakot': 'Rawalakot',
  'Roundu': 'Rondu',
  'Muzaffarabad': 'Muzaffarabad',
}

const mapProvince = (name) => {
  const n = String(name || '')
    .toLowerCase()
    .replace(/[_-]/g, ' ')
    .trim()
  if (n === 'pb' || n.includes('punjab')) return 'Punjab'
  if (n === 'sd' || n.includes('sindh')) return 'Sindh'
  if (
    n === 'kp' ||
    n === 'ta' ||
    n.includes('kpk') ||
    n.includes('khyber') ||
    n.includes('pakhtunkhwa') ||
    n.includes('tribal')
  ) {
    return 'KPK'
  }
  if (n === 'ba' || n.includes('baloch')) return 'Balochistan'
  if (n === 'gb' || n.includes('gilgit')) return 'GB'
  if (n === 'jk' || n.includes('ajk') || n.includes('azad') || n.includes('kashmir')) return 'AJK'
  if (n === 'is' || n.includes('islamabad')) return 'ICT'
  return null
}

const byProv = {
  Punjab: new Set(),
  Sindh: new Set(),
  KPK: new Set(),
  Balochistan: new Set(),
  ICT: new Set(),
  AJK: new Set(),
  GB: new Set(),
}

const isBad = (c) => {
  if (!c || c.length < 2) return true
  if (/^(Other)$/i.test(c)) return true
  if (/\b(Tehsil|District|Division|Valley|River|Desert|Glacier|Lake|Fort|Forts|Bridge|Park|Museum|Airport|Bazar)$/i.test(c)) {
    return true
  }
  if (/lake|glacier|\bfort\b|bridge|nest|cones|suspension|eagle|museum|tourist|cold desert/i.test(c)) {
    return true
  }
  if (/^Chak Two Hundred/i.test(c)) return true
  return false
}

const add = (prov, city) => {
  if (!prov || !city) return
  let c = title(String(city).replace(/\s*\([^)]*\)\s*/g, '').trim())
  c = c.replace(/\bCity\b$/i, '').trim()
  c = c.replace(/\bDistrict\b$/i, '').trim()
  if (ALIASES[c]) c = ALIASES[c]
  if (isBad(c)) return
  // Mirpur without qualifier belongs to AJK, not Balochistan
  if (prov === 'Balochistan' && c === 'Mirpur') return
  byProv[prov].add(c)
}

for (const r of citiesPkg.regions) {
  const p = mapProvince(r.region)
  for (const c of r.cities) add(p, c)
}

for (const prov of Object.values(dropdown)) {
  const p = mapProvince(prov.name)
  for (const dist of Object.values(prov.districts || {})) {
    add(p, dist.name)
    for (const city of dist.cities || []) add(p, city.name)
  }
}

for (const row of newFile) {
  add(mapProvince(row.province), row.city)
  add(mapProvince(row.province), row.district)
}

const data = pakistan.data || {}
for (const key of Object.keys(data)) {
  if (key === 'province') continue
  let prov = null
  if (key.startsWith('districts_')) prov = mapProvince(key.replace('districts_', ''))
  if (key.startsWith('tehsils_')) {
    const dist = key.replace('tehsils_', '')
    for (const pk of Object.keys(data)) {
      if (!pk.startsWith('districts_')) continue
      const list = data[pk]
      if (
        Array.isArray(list) &&
        list.some((d) => d.replace(/\s+/g, '_') === dist || d === dist.replace(/_/g, ' '))
      ) {
        prov = mapProvince(pk.replace('districts_', ''))
        break
      }
    }
  }
  if (!prov) continue
  if (Array.isArray(data[key])) data[key].forEach((x) => add(prov, x))
}

for (const row of cscCities) {
  if (!Array.isArray(row) || row[1] !== 'PK') continue
  add(mapProvince(row[2]), row[0])
}

;[
  'Islamabad',
  'Bhara Kahu',
  'Tarnol',
  'Rawat',
  'Golra',
  'Nilore',
  'Sihala',
  'Chak Shahzad',
  'Bani Gala',
  'Banigala',
  'Koral',
  'Tarlai',
  'Humak',
  'Ghouri Town',
].forEach((c) => add('ICT', c))

const provinceMeta = [
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Sindh', label: 'Sindh' },
  { value: 'KPK', label: 'Khyber Pakhtunkhwa' },
  { value: 'Balochistan', label: 'Balochistan' },
  { value: 'ICT', label: 'Islamabad Capital Territory' },
  { value: 'AJK', label: 'Azad Jammu & Kashmir' },
  { value: 'GB', label: 'Gilgit-Baltistan' },
]

const escape = (c) => c.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

let file = `export const APPLY_COUNTRIES = [
  'Pakistan',
  'UK',
  'US',
  'Canada',
  'Australia',
]

export const PAKISTAN_PROVINCES = [
`

for (const meta of provinceMeta) {
  const list = [...byProv[meta.value]].sort((a, b) => a.localeCompare(b))
  list.push('Other')
  console.log(meta.value, list.length - 1)
  file += `  {
    value: '${meta.value}',
    label: '${meta.label}',
    cities: [
${list.map((c) => `      '${escape(c)}',`).join('\n')}
    ],
  },
`
}

file += `]

export const getPakistanCities = (provinceValue) => {
  const province = PAKISTAN_PROVINCES.find((item) => item.value === provinceValue)
  return province?.cities || []
}
`

fs.writeFileSync(outPath, file)
console.log('TOTAL', Object.values(byProv).reduce((a, s) => a + s.size, 0))
console.log('wrote', outPath)
