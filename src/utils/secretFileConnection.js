import axios from 'axios'

export const secretFileConnection = ({ appConfig }) => {
  return axios.create({
    baseURL: appConfig.secretFile.host,
    headers: {
      Authorization: `${appConfig.secretFile.typeAuth} ${appConfig.secretFile.token}`,
      'Content-Type': 'application/json'
    }
  })
}
