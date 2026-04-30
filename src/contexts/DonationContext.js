import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

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
  const [donationType, setDonationType] = useState("general");
  const [ref, setRef] = useState(null);
  const [utmParams, setUtmParamsState] = useState(() => {
    try {
      const raw = localStorage.getItem('mtj_utm_params');
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  });

  // Calculate total amount from all donation sources
  // This amount is automatically updated when updateProjectDonation is called
  // because it depends on projectDonations which gets updated
  const amount = useMemo(() => {
    let total = 0;

    // Add donationData amount (old form flow)
    if (donationData) {
      const donationAmount = donationData?.finalAmount || donationData?.amount || donationData?.customAmount || 0;
      const parsedAmount = typeof donationAmount === 'number' ? donationAmount : parseFloat(donationAmount) || 0;
      total += parsedAmount;
    }

    // Add projectDonations total (new flow)
    // This is automatically recalculated when updateProjectDonation updates projectDonations
    if (projectDonations.length > 0) {
      const projectTotal = projectDonations.reduce((sum, donation) => {
        const donationAmount = donation?.totalAmount || 0;
        const parsedAmount = typeof donationAmount === 'number' ? donationAmount : parseFloat(donationAmount) || 0;
        return sum + parsedAmount;
      }, 0);
      total += projectTotal;
    }

    // Amount is calculated from donationData and projectDonations only
    // Quick donate form uses local state and adds to projectDonations when clicked
    return total;
  }, [donationData, projectDonations]);

  const setDonationFormData = useCallback((data) => {
    setDonationData(data);
  }, []);

  const setProjectDonationData = useCallback((donations) => {
    setProjectDonations(donations);
  }, []);

  const updateProjectDonation = useCallback((projectDonation) => {
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
  }, []);

  const clearDonationData = useCallback(() => { 
    setDonationData(null);
    setProjectDonations([]);
    setDonationType("general");
    // Note: We don't clear ref here as it should persist across donation flows
  }, []);

  const setUtmParams = useCallback((next) => {
    setUtmParamsState(prev => {
      if (!next) return prev;
      const merged = { ...(prev || {}), ...(next || {}) };
      return Object.keys(merged).length > 0 ? merged : null;
    });
  }, []);

  const value = useMemo(() => ({
    donationData,
    projectDonations,
    amount, // Total calculated amount from all sources (donationData + projectDonations)
    donationType,
    ref,
    utmParams,
    setDonationFormData,
    setProjectDonationData,
    updateProjectDonation,
    clearDonationData,
    setDonationType,
    setRef,
    setUtmParams
  }), [donationData, projectDonations, amount, donationType, ref, utmParams, setDonationFormData, setProjectDonationData, updateProjectDonation, clearDonationData, setUtmParams]);

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
};

