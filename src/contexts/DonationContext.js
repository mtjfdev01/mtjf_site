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
  const [projectDonations, setProjectDonations] = useState([]);

  const setDonationFormData = (data) => {
    setDonationData(data);
  };

  const setProjectDonationData = (donations) => {
    setProjectDonations(donations);
  };

  const updateProjectDonation = (projectDonation) => {
    setProjectDonations(prev => {
      const existingIndex = prev.findIndex(p => 
        p.projectId === projectDonation.projectId && 
        p.initiativeId === projectDonation.initiativeId
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = projectDonation;
        return updated;
      } else {
        return [...prev, projectDonation];
      }
    });
  };

  const clearDonationData = () => {
    setDonationData(null);
    setProjectDonations([]);
  };

  const value = {
    donationData,
    projectDonations,
    setDonationFormData,
    setProjectDonationData,
    updateProjectDonation,
    clearDonationData
  };

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
};

