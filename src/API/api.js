import axios from 'axios'

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
    me: () => sample.get().then(r => {
      return r
    }),
    // loginObject = {email(string), password(string), rememberMe(boolean), captcha(boolean)}
    loginPOST: loginObject => sample.post('https://social-network.samuraijs.com/api/1.0/auth/login', loginObject).then(r => r),
    loginDELETE: () => sample.delete('https://social-network.samuraijs.com/api/1.0/auth/login').then(r => r)
  },
  // usersObject = {count(page size, default: 10, max: 100)
  //               page(number of page, default 1)
  //               tarm(string, user name string for searching)
  //               friends(boolean, follow/unfollow users)}
  users: (count, page, term, friend) => {
    const stringParametrs = '' + (term ? '&term=' + term : '') + (friend ? '&friend=' + 'true' : '')
    return sample.get(`https://social-network.samuraijs.com/api/1.0/users?count=${count}&page=${page}` + stringParametrs).then(r => r)
  },
  profile: {
    // Properties
    // userId: required(integer)
    // lookingForAJob: required(boolean)
    // lookingForAJobDescription: required(string)
    // fullName: required(string)
    //
    // contacts: required(object)
    //   *github: required(string)
    //   *vk: required(string)
    //   *facebook: required(string)
    //   *instagram: required(string)
    //   *twitter: required(string)
    //   *website: required(string)
    //   *youtube: required(string)
    //   *mainLink: required(string)
    //
    // photos: required(object)
    //   *small: (string)
    //   *large: (string)
    profile: profileObject => sample.put('https://social-network.samuraijs.com/api/1.0/profile', profileObject).then(r => r),
    // Body
    // Media type: multipart/form-data
    // photo: photo => sample.put('https://social-network.samuraijs.com/api/1.0/profile/photo', photo).then(r => r),
    // status = {status: 'text'}
    updateStatus: status => sample.put('https://social-network.samuraijs.com/api/1.0/profile/status', { status }).then(r => r),
    getStatus: id => sample.get('https://social-network.samuraijs.com/api/1.0/profile/status/' + id).then(r => r),
    getProfil: id => sample.get('https://social-network.samuraijs.com/api/1.0/profile/' + id).then(r => r)
  },
  follow: {
    // getFollow: id => sample.get('https://social-network.samuraijs.com/api/1.0/follow/' + id).then(r => r),
    postFollow: id => sample.post('https://social-network.samuraijs.com/api/1.0/follow/' + id).then(r => r),
    deleteFollow: id => sample.delete('https://social-network.samuraijs.com/api/1.0/follow/' + id).then(r => r)
  }
}
