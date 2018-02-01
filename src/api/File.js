import http from '@/utils/http'

export default {
  sendFile (file) {
    return http.post('/api/system/upload', {file})
  }
}
