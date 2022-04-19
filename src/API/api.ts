import axios from 'axios'

type loginObject = {
  email: string
  password: string
  rememberMe: boolean
  captcha: boolean
}
type profile = {
  userId: number,
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  fullName: string,
  contacts: {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
  },
  photos: {
    small: string
    large: string
  }
}

const sample = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/auth/me/',
  headers: {
    'API-KEY': '44627c4b-5794-4b20-a670-8b4294e18c81'
  }
})
// 'https://social-network.samuraijs.com/api/1.0'
// https://social-network.samuraijs.com/docs#
export const api = {
  securuty: {
    // getCaptchaUrl: () => sample.get('https://social-network.samuraijs.com/api/1.0/security/get-captcha-url').then(r => r)
  },
  auth: {
    me: () => sample.get('').then(r => {
      return r
    }),
    // loginObject = {email(string), password(string), rememberMe(boolean), captcha(boolean)}
    loginPOST: (loginObject: loginObject) => sample.post('https://social-network.samuraijs.com/api/1.0/auth/login', loginObject).then(r => r),
    loginDELETE: () => sample.delete('https://social-network.samuraijs.com/api/1.0/auth/login').then(r => r)
  },
  // usersObject = {count(page size, default: 10, max: 100)
  //               page(number of page, default 1)
  //               tarm(string, user name string for searching)
  //               friends(boolean, follow/unfollow users)}
  users: (count: number, page: number, term?: boolean, friend?: boolean) => {
    const stringParametrs = '' + (term ? '&term=' + term : '') + (friend ? '&friend=' + 'true' : '')
    return sample.get(`https://social-network.samuraijs.com/api/1.0/users?count=${count}&page=${page}` +
        stringParametrs).then(r => r)
  },
  profile: {
    profile: (profileObject: profile) => sample.put('https://social-network.samuraijs.com/api/1.0/profile', profileObject).then(r => r),
    updateStatus: (status: string) => sample.put('https://social-network.samuraijs.com/api/1.0/profile/status', { status }).then(r => r),
    getStatus: (id: number) => sample.get('https://social-network.samuraijs.com/api/1.0/profile/status/' + id).then(r => r),
    getProfil: (id: number) => sample.get('https://social-network.samuraijs.com/api/1.0/profile/' + id).then(r => r)
  },
  follow: {
    // getFollow: id => sample.get('https://social-network.samuraijs.com/api/1.0/follow/' + id).then(r => r),
    postFollow: (id: number) => sample.post('https://social-network.samuraijs.com/api/1.0/follow/' + id).then(r => r),
    deleteFollow: (id: number) => sample.delete('https://social-network.samuraijs.com/api/1.0/follow/' + id).then(r => r)
  }
}
