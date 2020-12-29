const COUNTRY = {
  KR: 0,
  US: 1,
  JP: 2,
  CN: 3,
  RU: 4,
  TW: 5,
  UK: 100,
  INTERNATIONAL: 1000
}

const COUNTRY_STR: { [index: number]: string } = {
  0: 'KR',
  1: 'US',
  2: 'JP',
  3: 'CN',
  4: 'RU',
  5: 'TW',
  100: 'UK'
}

const IP_TYPE = {
  GENERAL: 0,
  MOBILE: 1,
  ISP: 2,
  VPN: 1000,
  CLOUD: 1001
}

const IP_TYPE_STR: { [index: number]: string } = {
  0: '',
  1: '',
  2: '',
  1000: 'Proxy',
  1001: 'Cloud'
}

interface ISPInfo {
  name: string
  country: number
  type: number
  detail?: string
}

const DCREF_ISP = {
  SKT_3G: { name: 'SKT 3G', country: COUNTRY.KR, type: IP_TYPE.MOBILE },
  SKT_LTE: { name: 'SKT LTE', country: COUNTRY.KR, type: IP_TYPE.MOBILE },
  KT: { name: 'KT', country: COUNTRY.KR, type: IP_TYPE.MOBILE },
  KT_5G: { name: 'KT 5G', country: COUNTRY.KR, type: IP_TYPE.MOBILE },
  UPLUS_3G: { name: 'U+ 3G', country: COUNTRY.KR, type: IP_TYPE.MOBILE },
  UPLUS_LTE: { name: 'U+ LTE', country: COUNTRY.KR, type: IP_TYPE.MOBILE },
  UPLUS_5G: { name: 'U+ 5G', country: COUNTRY.KR, type: IP_TYPE.MOBILE },
  SOFTBANK: { name: 'Softbank', country: COUNTRY.JP, type: IP_TYPE.MOBILE },
  DOCOMO: { name: 'docomo', country: COUNTRY.JP, type: IP_TYPE.MOBILE },
  AU: { name: 'au', country: COUNTRY.JP, type: IP_TYPE.MOBILE },
  SPRINT: { name: 'Sprint', country: COUNTRY.US, type: IP_TYPE.MOBILE },
  AT_T: { name: 'AT&T', country: COUNTRY.US, type: IP_TYPE.MOBILE },
  VERIZON: { name: 'verizon', country: COUNTRY.US, type: IP_TYPE.MOBILE },
  EE: { name: 'EE', country: COUNTRY.UK, type: IP_TYPE.MOBILE },
  VODAFONE: { name: 'Vodafone', country: COUNTRY.UK, type: IP_TYPE.MOBILE },
  O2: { name: 'O2', country: COUNTRY.UK, type: IP_TYPE.MOBILE },
  AMAZON_WEB: {
    name: 'AWS',
    country: COUNTRY.INTERNATIONAL,
    type: IP_TYPE.CLOUD
  },
  GOOGLE_CLOUD: {
    name: 'GCP',
    country: COUNTRY.INTERNATIONAL,
    type: IP_TYPE.CLOUD
  },
  BETTERNET: {
    name: 'Betternet',
    country: COUNTRY.INTERNATIONAL,
    type: IP_TYPE.VPN
  },
  VPN_CAT: {
    name: 'VPN Cat',
    country: COUNTRY.INTERNATIONAL,
    type: IP_TYPE.VPN
  },
  VPN_MST: {
    name: 'VPN Master',
    country: COUNTRY.INTERNATIONAL,
    type: IP_TYPE.VPN
  },
  VULTR: { name: 'Vultr', country: COUNTRY.INTERNATIONAL, type: IP_TYPE.CLOUD },
  ZENMATE: {
    name: 'Zenmate',
    country: COUNTRY.INTERNATIONAL,
    type: IP_TYPE.VPN
  },
  SKT_UPLUS_3G: { name: 'SKT, U+ 3G', country: COUNTRY.KR },
  CLOUDFLARE_WARP: {
    name: 'Cloudflare',
    country: COUNTRY.INTERNATIONAL,
    type: IP_TYPE.CLOUD
  },
  CLOUDFLARE_GCP: {
    name: 'Cloudflare, GCP',
    country: COUNTRY.INTERNATIONAL,
    type: IP_TYPE.CLOUD
  },
  UNIV: {
    name: '대학교',
    country: COUNTRY.KR,
    type: IP_TYPE.GENERAL
  },
  GENERAL: {
    name: '.',
    country: COUNTRY.KR,
    type: IP_TYPE.GENERAL
  }
}

const detailWrap = (obj: ISPInfo, detail: string) => {
  obj.detail = detail
  return obj
}

const DCREF_COMMON_IP: { [index: string]: object } = {
  '211.234': DCREF_ISP.SKT_UPLUS_3G,
  '203.226': DCREF_ISP.SKT_3G,
  '223.32': DCREF_ISP.SKT_LTE,
  '223.33': DCREF_ISP.SKT_LTE,
  '223.34': DCREF_ISP.SKT_LTE,
  '223.35': DCREF_ISP.SKT_LTE,
  '223.36': DCREF_ISP.SKT_LTE,
  '223.37': DCREF_ISP.SKT_LTE,
  '223.38': DCREF_ISP.SKT_LTE,
  '223.39': DCREF_ISP.SKT_LTE,
  '223.40': DCREF_ISP.SKT_LTE,
  '223.41': DCREF_ISP.SKT_LTE,
  '223.42': DCREF_ISP.SKT_LTE,
  '223.43': DCREF_ISP.SKT_LTE,
  '223.44': DCREF_ISP.SKT_LTE,
  '223.45': DCREF_ISP.SKT_LTE,
  '223.46': DCREF_ISP.SKT_LTE,
  '223.47': DCREF_ISP.SKT_LTE,
  '223.48': DCREF_ISP.SKT_LTE,
  '223.49': DCREF_ISP.SKT_LTE,
  '223.50': DCREF_ISP.SKT_LTE,
  '223.51': DCREF_ISP.SKT_LTE,
  '223.52': DCREF_ISP.SKT_LTE,
  '223.53': DCREF_ISP.SKT_LTE,
  '223.54': DCREF_ISP.SKT_LTE,
  '223.55': DCREF_ISP.SKT_LTE,
  '223.56': DCREF_ISP.SKT_LTE,
  '223.57': DCREF_ISP.SKT_LTE,
  '223.58': DCREF_ISP.SKT_LTE,
  '223.59': DCREF_ISP.SKT_LTE,
  '223.60': DCREF_ISP.SKT_LTE,
  '223.61': DCREF_ISP.SKT_LTE,
  '223.62': DCREF_ISP.SKT_LTE,
  '223.63': DCREF_ISP.SKT_LTE,
  '39.7': DCREF_ISP.KT,
  '110.70': DCREF_ISP.KT,
  '175.223': DCREF_ISP.KT,
  '175.252': DCREF_ISP.KT,
  '211.246': DCREF_ISP.KT,
  '118.235': DCREF_ISP.KT_5G,
  '61.43': DCREF_ISP.UPLUS_3G,
  '117.111': DCREF_ISP.UPLUS_LTE,
  '211.36': DCREF_ISP.UPLUS_LTE,
  '106.102': DCREF_ISP.UPLUS_LTE,
  '106.101': DCREF_ISP.UPLUS_5G,
  '60.100': DCREF_ISP.SOFTBANK,
  '60.106': DCREF_ISP.SOFTBANK,
  '60.107': DCREF_ISP.SOFTBANK,
  '60.108': DCREF_ISP.SOFTBANK,
  '60.109': DCREF_ISP.SOFTBANK,
  '60.110': DCREF_ISP.SOFTBANK,
  '60.111': DCREF_ISP.SOFTBANK,
  '60.112': DCREF_ISP.SOFTBANK,
  '60.113': DCREF_ISP.SOFTBANK,
  '60.114': DCREF_ISP.SOFTBANK,
  '60.115': DCREF_ISP.SOFTBANK,
  '60.116': DCREF_ISP.SOFTBANK,
  '60.117': DCREF_ISP.SOFTBANK,
  '60.118': DCREF_ISP.SOFTBANK,
  '60.119': DCREF_ISP.SOFTBANK,
  '60.120': DCREF_ISP.SOFTBANK,
  '60.121': DCREF_ISP.SOFTBANK,
  '60.122': DCREF_ISP.SOFTBANK,
  '60.123': DCREF_ISP.SOFTBANK,
  '60.124': DCREF_ISP.SOFTBANK,
  '60.125': DCREF_ISP.SOFTBANK,
  '60.126': DCREF_ISP.SOFTBANK,
  '60.127': DCREF_ISP.SOFTBANK,
  '60.128': DCREF_ISP.SOFTBANK,
  '60.129': DCREF_ISP.SOFTBANK,
  '60.130': DCREF_ISP.SOFTBANK,
  '60.131': DCREF_ISP.SOFTBANK,
  '60.132': DCREF_ISP.SOFTBANK,
  '60.133': DCREF_ISP.SOFTBANK,
  '60.134': DCREF_ISP.SOFTBANK,
  '60.135': DCREF_ISP.SOFTBANK,
  '60.136': DCREF_ISP.SOFTBANK,
  '60.137': DCREF_ISP.SOFTBANK,
  '60.138': DCREF_ISP.SOFTBANK,
  '60.139': DCREF_ISP.SOFTBANK,
  '60.140': DCREF_ISP.SOFTBANK,
  '60.141': DCREF_ISP.SOFTBANK,
  '60.142': DCREF_ISP.SOFTBANK,
  '60.143': DCREF_ISP.SOFTBANK,
  '60.144': DCREF_ISP.SOFTBANK,
  '60.146': DCREF_ISP.SOFTBANK,
  '60.147': DCREF_ISP.SOFTBANK,
  '60.148': DCREF_ISP.SOFTBANK,
  '60.149': DCREF_ISP.SOFTBANK,
  '60.150': DCREF_ISP.SOFTBANK,
  '60.40': DCREF_ISP.SOFTBANK,
  '60.80': DCREF_ISP.SOFTBANK,
  '60.86': DCREF_ISP.SOFTBANK,
  '60.90': DCREF_ISP.SOFTBANK,
  '60.91': DCREF_ISP.SOFTBANK,
  '60.94': DCREF_ISP.SOFTBANK,
  '60.96': DCREF_ISP.SOFTBANK,
  '60.97': DCREF_ISP.SOFTBANK,
  '126.204': DCREF_ISP.SOFTBANK,
  '126.206': DCREF_ISP.SOFTBANK,
  '126.234': DCREF_ISP.SOFTBANK,
  '126.235': DCREF_ISP.SOFTBANK,
  '126.236': DCREF_ISP.SOFTBANK,
  '126.237': DCREF_ISP.SOFTBANK,
  '126.238': DCREF_ISP.SOFTBANK,
  '126.239': DCREF_ISP.SOFTBANK,
  '126.240': DCREF_ISP.SOFTBANK,
  '126.241': DCREF_ISP.SOFTBANK,
  '126.242': DCREF_ISP.SOFTBANK,
  '126.33': DCREF_ISP.SOFTBANK,
  '126.40': DCREF_ISP.SOFTBANK,
  '126.43': DCREF_ISP.SOFTBANK,
  '117.46': DCREF_ISP.SOFTBANK,
  '1.66': DCREF_ISP.DOCOMO,
  '1.72': DCREF_ISP.DOCOMO,
  '1.73': DCREF_ISP.DOCOMO,
  '1.75': DCREF_ISP.DOCOMO,
  '1.76': DCREF_ISP.DOCOMO,
  '1.77': DCREF_ISP.DOCOMO,
  '1.78': DCREF_ISP.DOCOMO,
  '1.79': DCREF_ISP.DOCOMO,
  '49.96': DCREF_ISP.DOCOMO,
  '49.97': DCREF_ISP.DOCOMO,
  '49.98': DCREF_ISP.DOCOMO,
  '49.99': DCREF_ISP.DOCOMO,
  '49.100': DCREF_ISP.DOCOMO,
  '49.102': DCREF_ISP.DOCOMO,
  '49.101': DCREF_ISP.DOCOMO,
  '49.103': DCREF_ISP.DOCOMO,
  '49.104': DCREF_ISP.DOCOMO,
  '49.105': DCREF_ISP.DOCOMO,
  '49.106': DCREF_ISP.DOCOMO,
  '49.110': DCREF_ISP.DOCOMO,
  '49.111': DCREF_ISP.DOCOMO,
  '110.158': DCREF_ISP.DOCOMO,
  '110.160': DCREF_ISP.DOCOMO,
  '110.163': DCREF_ISP.DOCOMO,
  '146.99': DCREF_ISP.DOCOMO,
  '146.160': DCREF_ISP.DOCOMO,
  '146.67': DCREF_ISP.DOCOMO,
  '146.68': DCREF_ISP.DOCOMO,
  '157.112': DCREF_ISP.DOCOMO,
  '220.159': DCREF_ISP.DOCOMO,
  '27.228': DCREF_ISP.DOCOMO,
  '27.230': DCREF_ISP.DOCOMO,
  '183.72': DCREF_ISP.DOCOMO,
  '183.73': DCREF_ISP.DOCOMO,
  '183.74': DCREF_ISP.DOCOMO,
  '183.75': DCREF_ISP.DOCOMO,
  '63.160': DCREF_ISP.SPRINT,
  '63.161': DCREF_ISP.SPRINT,
  '63.162': DCREF_ISP.SPRINT,
  '63.163': DCREF_ISP.SPRINT,
  '63.164': DCREF_ISP.SPRINT,
  '63.165': DCREF_ISP.SPRINT,
  '63.166': DCREF_ISP.SPRINT,
  '63.167': DCREF_ISP.SPRINT,
  '63.168': DCREF_ISP.SPRINT,
  '63.169': DCREF_ISP.SPRINT,
  '63.170': DCREF_ISP.SPRINT,
  '63.171': DCREF_ISP.SPRINT,
  '63.172': DCREF_ISP.SPRINT,
  '63.173': DCREF_ISP.SPRINT,
  '63.174': DCREF_ISP.SPRINT,
  '63.175': DCREF_ISP.SPRINT,
  '66.1': DCREF_ISP.SPRINT,
  '68.24': DCREF_ISP.SPRINT,
  '68.25': DCREF_ISP.SPRINT,
  '68.26': DCREF_ISP.SPRINT,
  '68.27': DCREF_ISP.SPRINT,
  '68.28': DCREF_ISP.SPRINT,
  '68.29': DCREF_ISP.SPRINT,
  '68.30': DCREF_ISP.SPRINT,
  '68.31': DCREF_ISP.SPRINT,
  '198.68': DCREF_ISP.SPRINT,
  '198.70': DCREF_ISP.SPRINT,
  '144.224': DCREF_ISP.SPRINT,
  '144.228': DCREF_ISP.SPRINT,
  '144.232': DCREF_ISP.SPRINT,
  '204.117': DCREF_ISP.SPRINT,
  '204.118': DCREF_ISP.SPRINT,
  '204.212': DCREF_ISP.SPRINT,
  '204.248': DCREF_ISP.SPRINT,
  '204.94': DCREF_ISP.SPRINT,
  '204.96': DCREF_ISP.SPRINT,
  '12.0': DCREF_ISP.AT_T,
  '12.66': DCREF_ISP.AT_T,
  '12.67': DCREF_ISP.AT_T,
  '12.128': DCREF_ISP.AT_T,
  '12.129': DCREF_ISP.AT_T,
  '12.130': DCREF_ISP.AT_T,
  '107.72': DCREF_ISP.AT_T,
  '107.77': DCREF_ISP.AT_T,
  '107.80': DCREF_ISP.AT_T,
  '107.81': DCREF_ISP.AT_T,
  '107.84': DCREF_ISP.AT_T,
  '107.85': DCREF_ISP.AT_T,
  '107.87': DCREF_ISP.AT_T,
  '107.89': DCREF_ISP.AT_T,
  '107.90': DCREF_ISP.AT_T,
  '107.91': DCREF_ISP.AT_T,
  '107.92': DCREF_ISP.AT_T,
  '107.93': DCREF_ISP.AT_T,
  '107.94': DCREF_ISP.AT_T,
  '107.95': DCREF_ISP.AT_T,
  '107.106': DCREF_ISP.AT_T,
  '107.107': DCREF_ISP.AT_T,
  '107.112': DCREF_ISP.AT_T,
  '107.118': DCREF_ISP.AT_T,
  '107.125': DCREF_ISP.AT_T,
  '107.228': DCREF_ISP.AT_T,
  '107.229': DCREF_ISP.AT_T,
  '107.230': DCREF_ISP.AT_T,
  '107.231': DCREF_ISP.AT_T,
  '107.232': DCREF_ISP.AT_T,
  '107.233': DCREF_ISP.AT_T,
  '107.234': DCREF_ISP.AT_T,
  '107.235': DCREF_ISP.AT_T,
  '107.241': DCREF_ISP.AT_T,
  '107.242': DCREF_ISP.AT_T,
  '107.247': DCREF_ISP.AT_T,
  '107.250': DCREF_ISP.AT_T,
  '108.147': DCREF_ISP.AT_T,
  '108.153': DCREF_ISP.AT_T,
  '135.211': DCREF_ISP.AT_T,
  '32.177': DCREF_ISP.AT_T,
  '32.178': DCREF_ISP.AT_T,
  '76.242': DCREF_ISP.AT_T,
  '199.176': DCREF_ISP.AT_T,
  '45.16': DCREF_ISP.AT_T,
  '63.192': DCREF_ISP.AT_T,
  '64.148': DCREF_ISP.AT_T,
  '65.12': DCREF_ISP.AT_T,
  '65.13': DCREF_ISP.AT_T,
  '65.15': DCREF_ISP.AT_T,
  '65.5': DCREF_ISP.AT_T,
  '65.6': DCREF_ISP.AT_T,
  '65.80': DCREF_ISP.AT_T,
  '65.81': DCREF_ISP.AT_T,
  '65.82': DCREF_ISP.AT_T,
  '65.83': DCREF_ISP.AT_T,
  '65.136': DCREF_ISP.AT_T,
  '65.156': DCREF_ISP.AT_T,
  '68.153': DCREF_ISP.AT_T,
  '68.157': DCREF_ISP.AT_T,
  '68.158': DCREF_ISP.AT_T,
  '68.16': DCREF_ISP.AT_T,
  '68.17': DCREF_ISP.AT_T,
  '70.252': DCREF_ISP.AT_T,
  '71.128': DCREF_ISP.AT_T,
  '71.130': DCREF_ISP.AT_T,
  '70.242': DCREF_ISP.AT_T,
  '70.228': DCREF_ISP.AT_T,
  '69.236': DCREF_ISP.AT_T,
  '74.172': DCREF_ISP.AT_T,
  '74.173': DCREF_ISP.AT_T,
  '74.174': DCREF_ISP.AT_T,
  '74.175': DCREF_ISP.AT_T,
  '74.180': DCREF_ISP.AT_T,
  '74.181': DCREF_ISP.AT_T,
  '74.182': DCREF_ISP.AT_T,
  '74.183': DCREF_ISP.AT_T,
  '74.184': DCREF_ISP.AT_T,
  '74.185': DCREF_ISP.AT_T,
  '74.186': DCREF_ISP.AT_T,
  '74.187': DCREF_ISP.AT_T,
  '74.188': DCREF_ISP.AT_T,
  '74.189': DCREF_ISP.AT_T,
  '74.190': DCREF_ISP.AT_T,
  '74.228': DCREF_ISP.AT_T,
  '74.229': DCREF_ISP.AT_T,
  '74.232': DCREF_ISP.AT_T,
  '100.75': DCREF_ISP.VERIZON,
  '100.99': DCREF_ISP.VERIZON,
  '100.100': DCREF_ISP.VERIZON,
  '66.174': DCREF_ISP.VERIZON,
  '69.82': DCREF_ISP.VERIZON,
  '69.96': DCREF_ISP.VERIZON,
  '70.192': DCREF_ISP.VERIZON,
  '70.193': DCREF_ISP.VERIZON,
  '70.194': DCREF_ISP.VERIZON,
  '70.195': DCREF_ISP.VERIZON,
  '70.196': DCREF_ISP.VERIZON,
  '70.197': DCREF_ISP.VERIZON,
  '70.198': DCREF_ISP.VERIZON,
  '70.199': DCREF_ISP.VERIZON,
  '70.200': DCREF_ISP.VERIZON,
  '70.201': DCREF_ISP.VERIZON,
  '70.202': DCREF_ISP.VERIZON,
  '70.203': DCREF_ISP.VERIZON,
  '70.204': DCREF_ISP.VERIZON,
  '70.205': DCREF_ISP.VERIZON,
  '70.206': DCREF_ISP.VERIZON,
  '70.207': DCREF_ISP.VERIZON,
  '70.208': DCREF_ISP.VERIZON,
  '70.209': DCREF_ISP.VERIZON,
  '70.210': DCREF_ISP.VERIZON,
  '70.211': DCREF_ISP.VERIZON,
  '70.212': DCREF_ISP.VERIZON,
  '70.213': DCREF_ISP.VERIZON,
  '70.214': DCREF_ISP.VERIZON,
  '70.215': DCREF_ISP.VERIZON,
  '70.216': DCREF_ISP.VERIZON,
  '70.217': DCREF_ISP.VERIZON,
  '70.218': DCREF_ISP.VERIZON,
  '70.219': DCREF_ISP.VERIZON,
  '70.220': DCREF_ISP.VERIZON,
  '70.221': DCREF_ISP.VERIZON,
  '70.222': DCREF_ISP.VERIZON,
  '70.223': DCREF_ISP.VERIZON,
  '97.0': DCREF_ISP.VERIZON,
  '97.63': DCREF_ISP.VERIZON,
  '97.128': DCREF_ISP.VERIZON,
  '97.129': DCREF_ISP.VERIZON,
  '97.130': DCREF_ISP.VERIZON,
  '97.131': DCREF_ISP.VERIZON,
  '97.132': DCREF_ISP.VERIZON,
  '97.133': DCREF_ISP.VERIZON,
  '97.134': DCREF_ISP.VERIZON,
  '97.135': DCREF_ISP.VERIZON,
  '97.136': DCREF_ISP.VERIZON,
  '97.137': DCREF_ISP.VERIZON,
  '97.138': DCREF_ISP.VERIZON,
  '97.139': DCREF_ISP.VERIZON,
  '97.140': DCREF_ISP.VERIZON,
  '97.141': DCREF_ISP.VERIZON,
  '97.142': DCREF_ISP.VERIZON,
  '97.143': DCREF_ISP.VERIZON,
  '97.144': DCREF_ISP.VERIZON,
  '97.145': DCREF_ISP.VERIZON,
  '97.146': DCREF_ISP.VERIZON,
  '97.147': DCREF_ISP.VERIZON,
  '97.148': DCREF_ISP.VERIZON,
  '97.149': DCREF_ISP.VERIZON,
  '97.150': DCREF_ISP.VERIZON,
  '97.151': DCREF_ISP.VERIZON,
  '97.152': DCREF_ISP.VERIZON,
  '97.153': DCREF_ISP.VERIZON,
  '97.154': DCREF_ISP.VERIZON,
  '97.155': DCREF_ISP.VERIZON,
  '97.156': DCREF_ISP.VERIZON,
  '97.157': DCREF_ISP.VERIZON,
  '97.158': DCREF_ISP.VERIZON,
  '97.159': DCREF_ISP.VERIZON,
  '97.160': DCREF_ISP.VERIZON,
  '97.161': DCREF_ISP.VERIZON,
  '97.162': DCREF_ISP.VERIZON,
  '97.163': DCREF_ISP.VERIZON,
  '97.164': DCREF_ISP.VERIZON,
  '97.165': DCREF_ISP.VERIZON,
  '97.166': DCREF_ISP.VERIZON,
  '97.167': DCREF_ISP.VERIZON,
  '97.168': DCREF_ISP.VERIZON,
  '97.255': DCREF_ISP.VERIZON,
  '174.192': DCREF_ISP.VERIZON,
  '174.193': DCREF_ISP.VERIZON,
  '174.194': DCREF_ISP.VERIZON,
  '174.195': DCREF_ISP.VERIZON,
  '174.196': DCREF_ISP.VERIZON,
  '174.197': DCREF_ISP.VERIZON,
  '174.198': DCREF_ISP.VERIZON,
  '174.199': DCREF_ISP.VERIZON,
  '174.200': DCREF_ISP.VERIZON,
  '174.201': DCREF_ISP.VERIZON,
  '174.202': DCREF_ISP.VERIZON,
  '174.203': DCREF_ISP.VERIZON,
  '174.204': DCREF_ISP.VERIZON,
  '174.205': DCREF_ISP.VERIZON,
  '174.206': DCREF_ISP.VERIZON,
  '174.207': DCREF_ISP.VERIZON,
  '174.208': DCREF_ISP.VERIZON,
  '174.209': DCREF_ISP.VERIZON,
  '174.210': DCREF_ISP.VERIZON,
  '174.211': DCREF_ISP.VERIZON,
  '174.212': DCREF_ISP.VERIZON,
  '174.213': DCREF_ISP.VERIZON,
  '174.214': DCREF_ISP.VERIZON,
  '174.215': DCREF_ISP.VERIZON,
  '174.216': DCREF_ISP.VERIZON,
  '174.217': DCREF_ISP.VERIZON,
  '174.218': DCREF_ISP.VERIZON,
  '174.219': DCREF_ISP.VERIZON,
  '174.220': DCREF_ISP.VERIZON,
  '174.221': DCREF_ISP.VERIZON,
  '174.222': DCREF_ISP.VERIZON,
  '174.223': DCREF_ISP.VERIZON,
  '174.224': DCREF_ISP.VERIZON,
  '174.225': DCREF_ISP.VERIZON,
  '174.226': DCREF_ISP.VERIZON,
  '174.227': DCREF_ISP.VERIZON,
  '174.228': DCREF_ISP.VERIZON,
  '174.229': DCREF_ISP.VERIZON,
  '174.230': DCREF_ISP.VERIZON,
  '174.231': DCREF_ISP.VERIZON,
  '174.232': DCREF_ISP.VERIZON,
  '174.233': DCREF_ISP.VERIZON,
  '174.234': DCREF_ISP.VERIZON,
  '174.235': DCREF_ISP.VERIZON,
  '174.236': DCREF_ISP.VERIZON,
  '174.237': DCREF_ISP.VERIZON,
  '174.238': DCREF_ISP.VERIZON,
  '174.239': DCREF_ISP.VERIZON,
  '174.240': DCREF_ISP.VERIZON,
  '174.241': DCREF_ISP.VERIZON,
  '174.242': DCREF_ISP.VERIZON,
  '174.243': DCREF_ISP.VERIZON,
  '174.244': DCREF_ISP.VERIZON,
  '174.245': DCREF_ISP.VERIZON,
  '174.246': DCREF_ISP.VERIZON,
  '174.247': DCREF_ISP.VERIZON,
  '174.248': DCREF_ISP.VERIZON,
  '174.249': DCREF_ISP.VERIZON,
  '174.250': DCREF_ISP.VERIZON,
  '174.251': DCREF_ISP.VERIZON,
  '174.252': DCREF_ISP.VERIZON,
  '174.253': DCREF_ISP.VERIZON,
  '174.254': DCREF_ISP.VERIZON,
  '174.255': DCREF_ISP.VERIZON,
  '111.239': DCREF_ISP.AU,
  '35.180': DCREF_ISP.AMAZON_WEB,
  '52.4': DCREF_ISP.AMAZON_WEB,
  '64.252': DCREF_ISP.AMAZON_WEB,
  '50.16': DCREF_ISP.AMAZON_WEB,
  '13.236': DCREF_ISP.AMAZON_WEB,
  '15.193': DCREF_ISP.AMAZON_WEB,
  '13.125': DCREF_ISP.AMAZON_WEB,
  '54.180': DCREF_ISP.AMAZON_WEB,
  '52.92': DCREF_ISP.AMAZON_WEB,
  '52.93': DCREF_ISP.AMAZON_WEB,
  '52.94': DCREF_ISP.AMAZON_WEB,
  '52.95': DCREF_ISP.AMAZON_WEB,
  '52.79': DCREF_ISP.AMAZON_WEB,
  '13.124': DCREF_ISP.AMAZON_WEB,
  '13.209': DCREF_ISP.AMAZON_WEB,
  '52.78': DCREF_ISP.AMAZON_WEB,
  '15.164': DCREF_ISP.AMAZON_WEB,
  '15.177': DCREF_ISP.AMAZON_WEB,
  '15.185': DCREF_ISP.AMAZON_WEB,
  '54.148': DCREF_ISP.AMAZON_WEB,
  '99.78': DCREF_ISP.AMAZON_WEB,
  '54.193': DCREF_ISP.AMAZON_WEB,
  '54.238': DCREF_ISP.AMAZON_WEB,
  '54.168': DCREF_ISP.AMAZON_WEB,
  '52.74': DCREF_ISP.AMAZON_WEB,
  '52.18': DCREF_ISP.AMAZON_WEB,
  '52.219': DCREF_ISP.AMAZON_WEB,
  '52.144': DCREF_ISP.AMAZON_WEB,
  '52.61': DCREF_ISP.AMAZON_WEB,
  '52.58': DCREF_ISP.AMAZON_WEB,
  '18.230': DCREF_ISP.AMAZON_WEB,
  '184.72': DCREF_ISP.AMAZON_WEB,
  '52.29': DCREF_ISP.AMAZON_WEB,
  '13.231': DCREF_ISP.AMAZON_WEB,
  '3.34': DCREF_ISP.AMAZON_WEB,
  '99.82': DCREF_ISP.AMAZON_WEB,
  '52.239': DCREF_ISP.AMAZON_WEB,
  '52.180': DCREF_ISP.AMAZON_WEB,
  '150.222': DCREF_ISP.AMAZON_WEB,
  '34.64': DCREF_ISP.GOOGLE_CLOUD,
  '34.96': DCREF_ISP.GOOGLE_CLOUD,
  '34.98': DCREF_ISP.GOOGLE_CLOUD,
  '35.184': DCREF_ISP.GOOGLE_CLOUD,
  '35.188': DCREF_ISP.GOOGLE_CLOUD,
  '35.190': DCREF_ISP.GOOGLE_CLOUD,
  '35.192': DCREF_ISP.GOOGLE_CLOUD,
  '35.196': DCREF_ISP.GOOGLE_CLOUD,
  '35.199': DCREF_ISP.GOOGLE_CLOUD,
  '35.198': DCREF_ISP.GOOGLE_CLOUD,
  '35.200': DCREF_ISP.GOOGLE_CLOUD,
  '35.202': DCREF_ISP.GOOGLE_CLOUD,
  '35.203': DCREF_ISP.GOOGLE_CLOUD,
  '35.204': DCREF_ISP.GOOGLE_CLOUD,
  '35.206': DCREF_ISP.GOOGLE_CLOUD,
  '35.208': DCREF_ISP.GOOGLE_CLOUD,
  '35.216': DCREF_ISP.GOOGLE_CLOUD,
  '35.220': DCREF_ISP.GOOGLE_CLOUD,
  '35.224': DCREF_ISP.GOOGLE_CLOUD,
  '35.234': DCREF_ISP.GOOGLE_CLOUD,
  '35.235': DCREF_ISP.GOOGLE_CLOUD,
  '35.236': DCREF_ISP.GOOGLE_CLOUD,
  '35.240': DCREF_ISP.GOOGLE_CLOUD,
  '35.242': DCREF_ISP.GOOGLE_CLOUD,
  '35.244': DCREF_ISP.GOOGLE_CLOUD,
  '104.154': DCREF_ISP.GOOGLE_CLOUD,
  '104.196': DCREF_ISP.GOOGLE_CLOUD,
  '146.148': DCREF_ISP.GOOGLE_CLOUD,
  '108.170': DCREF_ISP.GOOGLE_CLOUD,
  '107.167': DCREF_ISP.GOOGLE_CLOUD,
  '107.179': DCREF_ISP.GOOGLE_CLOUD,
  '130.211': DCREF_ISP.GOOGLE_CLOUD,
  '162.222': DCREF_ISP.GOOGLE_CLOUD,
  '173.255': DCREF_ISP.GOOGLE_CLOUD,
  '192.158': DCREF_ISP.GOOGLE_CLOUD,
  '199.192': DCREF_ISP.GOOGLE_CLOUD,
  '199.223': DCREF_ISP.GOOGLE_CLOUD,
  '208.68': DCREF_ISP.GOOGLE_CLOUD,
  '8.34': DCREF_ISP.GOOGLE_CLOUD,
  '23.236': DCREF_ISP.GOOGLE_CLOUD,
  '23.251': DCREF_ISP.GOOGLE_CLOUD,
  '34.100': DCREF_ISP.GOOGLE_CLOUD,
  '34.102': DCREF_ISP.GOOGLE_CLOUD,
  '34.104': DCREF_ISP.GOOGLE_CLOUD,
  '34.124': DCREF_ISP.GOOGLE_CLOUD,
  '34.125': DCREF_ISP.GOOGLE_CLOUD,
  '35.219': DCREF_ISP.GOOGLE_CLOUD,
  '35.232': DCREF_ISP.GOOGLE_CLOUD,
  '107.178': DCREF_ISP.GOOGLE_CLOUD,
  '108.59': DCREF_ISP.GOOGLE_CLOUD,
  '139.28': DCREF_ISP.BETTERNET,
  '185.209': DCREF_ISP.BETTERNET,
  '76.164': DCREF_ISP.BETTERNET,
  '64.188': DCREF_ISP.BETTERNET,
  '108.61': DCREF_ISP.VULTR,
  '173.199': DCREF_ISP.VULTR,
  '103.10': DCREF_ISP.ZENMATE,
  '31.171': DCREF_ISP.ZENMATE,
  '37.120': DCREF_ISP.ZENMATE,
  '27.50': DCREF_ISP.ZENMATE,
  '185.242': DCREF_ISP.ZENMATE,
  '27.255': DCREF_ISP.ZENMATE,
  '154.6': DCREF_ISP.ZENMATE,
  '193.7': DCREF_ISP.ZENMATE,
  '8.38': DCREF_ISP.CLOUDFLARE_WARP,
  '8.6': DCREF_ISP.CLOUDFLARE_WARP,
  '8.9': DCREF_ISP.CLOUDFLARE_WARP,
  '8.10': DCREF_ISP.CLOUDFLARE_WARP,
  '8.14': DCREF_ISP.CLOUDFLARE_WARP,
  '8.17': DCREF_ISP.CLOUDFLARE_WARP,
  '8.18': DCREF_ISP.CLOUDFLARE_WARP,
  '8.19': DCREF_ISP.CLOUDFLARE_WARP,
  '8.20': DCREF_ISP.CLOUDFLARE_WARP,
  '8.21': DCREF_ISP.CLOUDFLARE_WARP,
  '8.31': DCREF_ISP.CLOUDFLARE_WARP,
  '8.36': DCREF_ISP.CLOUDFLARE_WARP,
  '8.37': DCREF_ISP.CLOUDFLARE_WARP,
  '8.39': DCREF_ISP.CLOUDFLARE_WARP,
  '8.40': DCREF_ISP.CLOUDFLARE_WARP,
  '8.41': DCREF_ISP.CLOUDFLARE_WARP,
  '8.42': DCREF_ISP.CLOUDFLARE_WARP,
  '8.43': DCREF_ISP.CLOUDFLARE_WARP,
  '8.44': DCREF_ISP.CLOUDFLARE_WARP,
  '8.45': DCREF_ISP.CLOUDFLARE_WARP,
  '8.46': DCREF_ISP.CLOUDFLARE_WARP,
  '8.47': DCREF_ISP.CLOUDFLARE_WARP,
  '8.48': DCREF_ISP.CLOUDFLARE_WARP,
  '8.35': DCREF_ISP.CLOUDFLARE_GCP,
  '103.21': DCREF_ISP.CLOUDFLARE_WARP,
  '103.22': DCREF_ISP.CLOUDFLARE_WARP,
  '104.16': DCREF_ISP.CLOUDFLARE_WARP,
  '104.17': DCREF_ISP.CLOUDFLARE_WARP,
  '104.18': DCREF_ISP.CLOUDFLARE_WARP,
  '104.19': DCREF_ISP.CLOUDFLARE_WARP,
  '104.20': DCREF_ISP.CLOUDFLARE_WARP,
  '104.22': DCREF_ISP.CLOUDFLARE_WARP,
  '104.23': DCREF_ISP.CLOUDFLARE_WARP,
  '104.24': DCREF_ISP.CLOUDFLARE_WARP,
  '104.25': DCREF_ISP.CLOUDFLARE_WARP,
  '104.26': DCREF_ISP.CLOUDFLARE_WARP,
  '104.27': DCREF_ISP.CLOUDFLARE_WARP,
  '104.28': DCREF_ISP.CLOUDFLARE_WARP,
  '104.31': DCREF_ISP.CLOUDFLARE_WARP,
  '108.162': DCREF_ISP.CLOUDFLARE_WARP,
  '141.101': DCREF_ISP.CLOUDFLARE_WARP,
  '162.158': DCREF_ISP.CLOUDFLARE_WARP,
  '162.159': DCREF_ISP.CLOUDFLARE_WARP,
  '172.64': DCREF_ISP.CLOUDFLARE_WARP,
  '172.65': DCREF_ISP.CLOUDFLARE_WARP,
  '172.67': DCREF_ISP.CLOUDFLARE_WARP,
  '172.68': DCREF_ISP.CLOUDFLARE_WARP,
  '172.69': DCREF_ISP.CLOUDFLARE_WARP,
  '173.245': DCREF_ISP.CLOUDFLARE_WARP,
  '188.114': DCREF_ISP.CLOUDFLARE_WARP,
  '197.234': DCREF_ISP.CLOUDFLARE_WARP,
  '198.41': DCREF_ISP.CLOUDFLARE_WARP,
  '2.24': DCREF_ISP.EE,
  '2.25': DCREF_ISP.EE,
  '2.26': DCREF_ISP.EE,
  '2.27': DCREF_ISP.EE,
  '2.28': DCREF_ISP.EE,
  '2.29': DCREF_ISP.EE,
  '2.30': DCREF_ISP.EE,
  '2.31': DCREF_ISP.EE,
  '31.64': DCREF_ISP.EE,
  '31.96': DCREF_ISP.EE,
  '31.123': DCREF_ISP.EE,
  '31.124': DCREF_ISP.EE,
  '31.126': DCREF_ISP.EE,
  '31.127': DCREF_ISP.EE,
  '46.68': DCREF_ISP.EE,
  '91.110': DCREF_ISP.EE,
  '95.144': DCREF_ISP.EE,
  '109.180': DCREF_ISP.EE,
  '109.181': DCREF_ISP.EE,
  '109.249': DCREF_ISP.EE,
  '149.254': DCREF_ISP.EE,
  '178.96': DCREF_ISP.EE,
  '84.64': DCREF_ISP.VODAFONE,
  '90.240': DCREF_ISP.VODAFONE,
  '90.244': DCREF_ISP.VODAFONE,
  '90.248': DCREF_ISP.VODAFONE,
  '90.252': DCREF_ISP.VODAFONE,
  '82.132': DCREF_ISP.O2,
  '82.194': DCREF_ISP.O2,
  '93.97': DCREF_ISP.O2,
  '158.230': DCREF_ISP.O2,
  '147.46': detailWrap(DCREF_ISP.UNIV, '서울대'),
  '147.47': detailWrap(DCREF_ISP.UNIV, '서울대'),
  '163.152': detailWrap(DCREF_ISP.UNIV, '고려대'),
  '165.132': detailWrap(DCREF_ISP.UNIV, '연세대'),
  '164.125': detailWrap(DCREF_ISP.UNIV, '부산대'),
  '165.194': detailWrap(DCREF_ISP.UNIV, '중앙대'),
  '168.115': detailWrap(DCREF_ISP.UNIV, '동아대'),
  '165.229': detailWrap(DCREF_ISP.UNIV, '영남대'),
  '137.68': detailWrap(DCREF_ISP.UNIV, 'KAIST'),
  '143.248': detailWrap(DCREF_ISP.UNIV, 'KAIST'),
  '166.104': detailWrap(DCREF_ISP.UNIV, '한양대'),
}

export const ISPData = (ip: number | string, replace: any) =>
  DCREF_COMMON_IP[ip] || replace || {}

export const format = (data: ISPInfo) => {
  if (!data.name) {
    return ''
  }

  return (
    `${
      typeof data.country !== 'undefined' &&
      data.country !== COUNTRY.KR &&
      data.country !== COUNTRY.INTERNATIONAL
        ? `${COUNTRY_STR[data.country]} `
        : ''
    }
    ${data.detail ? data.detail : data.name}` +
    (data.type && IP_TYPE_STR[data.type] ? ` (${IP_TYPE_STR[data.type]})` : '')
  )
}
