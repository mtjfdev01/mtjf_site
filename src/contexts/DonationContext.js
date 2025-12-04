import React, { createContext, useContext, useState } from 'react';

const DonationContext = createContext();

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonation must be used within a DonationProvider');
  }
  return context;
};

export const DonationProvider = ({ children }) => {
  const [donationData, setDonationData] = useState(null);

  const setDonationFormData = (data) => {
    setDonationData(data);
  };

  const clearDonationData = () => {
    setDonationData(null);
  };

  const value = {
    donationData,
    setDonationFormData,
    clearDonationData
  };

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
};

