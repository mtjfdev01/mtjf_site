import axiosInstance from '../utils/axios'

async function getData(path, config) {
  try {
    const response = await axiosInstance.get(path, config)
    const json = response.data
    if (!json?.success) {
      throw new Error(json?.message || 'Request failed')
    }
    return json.data
  } catch (error) {
    if (error.response?.status === 404) {
      return null
    }
    const message =
      error.response?.data?.message || error.message || 'Request failed'
    throw new Error(message)
  }
}

export const fetchAppealsList = () => getData('/public/appeals')
export const fetchFeaturedAppeal = () => getData('/public/appeals/featured')
export const fetchUrgentHeader = (limit = 5) =>
  getData('/public/appeals/urgent/header', { params: { limit } })
export const fetchAppealBySlug = (slug) =>
  getData(`/public/appeals/${encodeURIComponent(slug)}`)
