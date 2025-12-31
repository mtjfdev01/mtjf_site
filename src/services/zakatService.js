import axiosInstance from '../utils/axios'

async function fetchGoldSilverPrices() {
  try {
    const response = await axiosInstance.get('/gold-silver-price/latest')
    console.log('Gold/Silver Price Response:', response)
    console.log('Response Data:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching gold/silver prices:', error)
    return null
  }
}

export { fetchGoldSilverPrices }

