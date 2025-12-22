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
  // State for DonationProjectsMenuForm
  const [amount, setAmount] = useState("");
  const [donationType, setDonationType] = useState("general");

  const setDonationFormData = (data) => {
    setDonationData(data);
  };

  const setProjectDonationData = (donations) => {
    setProjectDonations(donations);
  };

  const updateProjectDonation = (projectDonation) => {
    setProjectDonations(prev => {
      // If totalAmount is 0, remove the donation
      if (projectDonation.totalAmount <= 0) {
        return prev.filter(p => 
          !(p.projectId === projectDonation.projectId && 
            p.initiativeId === projectDonation.initiativeId)
        );
      }
      
      // Otherwise, update or add the donation
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
    setAmount("");
    setDonationType("general");
  };

  const value = {
    donationData,
    projectDonations,
    amount,
    donationType,
    setDonationFormData,
    setProjectDonationData,
    updateProjectDonation,
    clearDonationData,
    setAmount,
    setDonationType
  };

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
};

