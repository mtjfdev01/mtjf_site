import axiosInstance from '../utils/axios'

async function fetchGoldSilverPrices() {
  try {
    const response = await axiosInstance.get('/gold-silver-price/latest')
    console.log('Gold/Silver Price Response:', response)
    console.log('Response Data:', response.data)
    
    // Handle nested response structure: response.data.data
    if (response.data && response.data.data) {
      return {
        gold_price: response.data.data.gold_price,
        silver_price: response.data.data.silver_price,
        price_date: response.data.data.price_date
      }
    }
    
    // Fallback to direct response.data structure
    return response.data
  } catch (error) {
    console.error('Error fetching gold/silver prices:', error)
    return null
  }
}

export { fetchGoldSilverPrices }

