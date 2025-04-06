// This service handles fetching economic calendar data from external APIs
// For demo purposes, we'll use a free API or simulate API calls

/**
 * Fetch economic calendar events for a date range
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @param {string[]} currencies - Array of currency codes to filter by
 * @returns {Promise<Array>} - Promise that resolves to an array of economic events
 */
export const fetchEconomicCalendar = async (startDate, endDate, currencies = []) => {
  try {
    // In a real implementation, this would make an actual API call
    // For demo purposes, we'll simulate an API call with a delay
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, return sample data
    // In a real app, you would parse the API response
    return getSampleEvents(startDate, endDate, currencies);
  } catch (error) {
    console.error('Error fetching economic calendar data:', error);
    // Return sample data as fallback
    return getSampleEvents(startDate, endDate, currencies);
  }
};

/**
 * Get sample economic calendar events
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @param {string[]} currencies - Array of currency codes to filter by
 * @returns {Array} - Array of economic events
 */
const getSampleEvents = (startDate, endDate, currencies = []) => {
  // Base sample events
  const baseEvents = [
    {
      id: 1,
      date: '2024-03-20',
      time: '08:30',
      currency: 'USD',
      event: 'Federal Reserve Interest Rate Decision',
      impact: 'High',
      forecast: '5.50%',
      previous: '5.50%',
      actual: '5.50%',
    },
    {
      id: 2,
      date: '2024-03-20',
      time: '10:00',
      currency: 'EUR',
      event: 'ECB President Lagarde Speech',
      impact: 'Medium',
      forecast: '-',
      previous: '-',
      actual: '-',
    },
    {
      id: 3,
      date: '2024-03-20',
      time: '12:30',
      currency: 'GBP',
      event: 'CPI m/m',
      impact: 'High',
      forecast: '0.5%',
      previous: '0.4%',
      actual: '-',
    },
    {
      id: 4,
      date: '2024-03-20',
      time: '14:00',
      currency: 'JPY',
      event: 'Trade Balance',
      impact: 'Medium',
      forecast: '-¥800B',
      previous: '-¥1,200B',
      actual: '-',
    },
    {
      id: 5,
      date: '2024-03-21',
      time: '09:00',
      currency: 'AUD',
      event: 'Employment Change',
      impact: 'High',
      forecast: '25K',
      previous: '20K',
      actual: '-',
    },
    {
      id: 6,
      date: '2024-03-21',
      time: '11:30',
      currency: 'CAD',
      event: 'Retail Sales m/m',
      impact: 'Medium',
      forecast: '0.3%',
      previous: '0.2%',
      actual: '-',
    },
    {
      id: 7,
      date: '2024-03-21',
      time: '13:00',
      currency: 'NZD',
      event: 'GDP q/q',
      impact: 'High',
      forecast: '0.5%',
      previous: '0.4%',
      actual: '-',
    },
    {
      id: 8,
      date: '2024-03-22',
      time: '08:00',
      currency: 'CHF',
      event: 'SNB Monetary Policy Assessment',
      impact: 'High',
      forecast: '-',
      previous: '-',
      actual: '-',
    },
    {
      id: 9,
      date: '2024-03-22',
      time: '10:30',
      currency: 'EUR',
      event: 'ECB Economic Bulletin',
      impact: 'Medium',
      forecast: '-',
      previous: '-',
      actual: '-',
    },
    {
      id: 10,
      date: '2024-03-22',
      time: '12:00',
      currency: 'GBP',
      event: 'Retail Sales m/m',
      impact: 'Medium',
      forecast: '0.3%',
      previous: '0.2%',
      actual: '-',
    },
    {
      id: 11,
      date: '2024-03-23',
      time: '09:30',
      currency: 'JPY',
      event: 'National CPI y/y',
      impact: 'High',
      forecast: '2.1%',
      previous: '2.0%',
      actual: '-',
    },
    {
      id: 12,
      date: '2024-03-23',
      time: '14:00',
      currency: 'USD',
      event: 'Fed Chair Powell Speech',
      impact: 'High',
      forecast: '-',
      previous: '-',
      actual: '-',
    },
  ];

  // Filter by date range if provided
  let filteredEvents = baseEvents;
  
  if (startDate && endDate) {
    filteredEvents = baseEvents.filter(event => 
      event.date >= startDate && event.date <= endDate
    );
  }
  
  // Filter by currencies if provided
  if (currencies && currencies.length > 0) {
    filteredEvents = filteredEvents.filter(event => 
      currencies.includes(event.currency)
    );
  }
  
  return filteredEvents;
};

/**
 * Get available currencies for the economic calendar
 * @returns {Array} - Array of currency codes
 */
export const getAvailableCurrencies = () => {
  return ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'NZD', 'CHF', 'CNY', 'INR', 'BRL', 'ZAR'];
};

/**
 * Get impact levels for the economic calendar
 * @returns {Array} - Array of impact levels
 */
export const getImpactLevels = () => {
  return ['High', 'Medium', 'Low'];
}; 