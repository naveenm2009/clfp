import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { LostFoundItem, DemoProfile, ClaimRequest, MatchResult, ItemStatus } from '../types';
import { INITIAL_DEMO_PROFILE, INITIAL_SAMPLE_ITEMS, INITIAL_SAMPLE_CLAIMS } from '../utils/sampleData';
import { findAllMatches, findMatchesForItem } from '../utils/matching';

interface ToastInfo {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  items: LostFoundItem[];
  profile: DemoProfile;
  claims: ClaimRequest[];
  matches: MatchResult[];
  addItem: (itemData: Omit<LostFoundItem, 'id' | 'createdAt' | 'status'>) => LostFoundItem;
  updateItemStatus: (id: string, status: ItemStatus) => void;
  deleteItem: (id: string) => void;
  markReturned: (id: string) => void;
  resetDemoData: () => void;
  updateProfile: (profile: DemoProfile) => void;
  submitClaim: (lostItemId: string, foundItemId: string, message: string) => void;
  getItemMatches: (item: LostFoundItem) => MatchResult[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  toasts: ToastInfo[];
  removeToast: (id: string) => void;
  stats: {
    totalLost: number;
    totalFound: number;
    totalReturned: number;
    activeMatchesCount: number;
    myLostCount: number;
    myFoundCount: number;
  };
}

const ITEMS_STORAGE_KEY = 'campus_lost_found_items_v2';
const PROFILE_STORAGE_KEY = 'campus_lost_found_profile_v2';
const CLAIMS_STORAGE_KEY = 'campus_lost_found_claims_v2';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage or fall back to demo data
  const [items, setItems] = useState<LostFoundItem[]>(() => {
    try {
      const saved = localStorage.getItem(ITEMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse items from localStorage', e);
    }
    return INITIAL_SAMPLE_ITEMS;
  });

  const [profile, setProfile] = useState<DemoProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse profile from localStorage', e);
    }
    return INITIAL_DEMO_PROFILE;
  });

  const [claims, setClaims] = useState<ClaimRequest[]>(() => {
    try {
      const saved = localStorage.getItem(CLAIMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse claims from localStorage', e);
    }
    return INITIAL_SAMPLE_CLAIMS;
  });

  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Persist items to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save items to localStorage', e);
    }
  }, [items]);

  // Persist profile
  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  // Persist claims
  useEffect(() => {
    try {
      localStorage.setItem(CLAIMS_STORAGE_KEY, JSON.stringify(claims));
    } catch (e) {
      console.error('Failed to save claims to localStorage', e);
    }
  }, [claims]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Smart Matching calculations
  const matches = useMemo(() => {
    return findAllMatches(items);
  }, [items]);

  const getItemMatches = (item: LostFoundItem): MatchResult[] => {
    return findMatchesForItem(item, items);
  };

  // Add Item Action
  const addItem = (itemData: Omit<LostFoundItem, 'id' | 'createdAt' | 'status'>): LostFoundItem => {
    const newItem: LostFoundItem = {
      ...itemData,
      id: `${itemData.type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'Open',
      createdAt: new Date().toISOString(),
    };

    setItems((prev) => [newItem, ...prev]);

    // Check if new item triggered matches
    const newMatches = findMatchesForItem(newItem, items);
    if (newMatches.length > 0) {
      showToast(
        `Report submitted! ${newMatches.length} possible ${newMatches.length === 1 ? 'match' : 'matches'} detected!`,
        'info'
      );
    } else {
      showToast(
        `${itemData.type === 'lost' ? 'Lost' : 'Found'} report registered successfully!`,
        'success'
      );
    }

    return newItem;
  };

  // Update item status
  const updateItemStatus = (id: string, status: ItemStatus) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status,
            returnDate: status === 'Returned' ? new Date().toISOString().split('T')[0] : item.returnDate,
          };
        }
        return item;
      })
    );
    showToast(`Status updated to "${status}"`, 'info');
  };

  // Mark returned convenience function
  const markReturned = (id: string) => {
    updateItemStatus(id, 'Returned');
  };

  // Delete item
  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    // Also remove any claims related to this item
    setClaims((prev) => prev.filter((c) => c.lostItemId !== id && c.foundItemId !== id));
    showToast('Report removed successfully', 'info');
  };

  // Reset to sample data
  const resetDemoData = () => {
    setItems(INITIAL_SAMPLE_ITEMS);
    setProfile(INITIAL_DEMO_PROFILE);
    setClaims(INITIAL_SAMPLE_CLAIMS);
    try {
      localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_ITEMS));
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_PROFILE));
      localStorage.setItem(CLAIMS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_CLAIMS));
    } catch (e) {
      console.error(e);
    }
    showToast('Demo data reset to clean initial state', 'success');
  };

  // Update profile
  const updateProfile = (newProfile: DemoProfile) => {
    setProfile(newProfile);
    showToast('Demo profile updated', 'success');
  };

  // Submit claim / interest
  const submitClaim = (lostItemId: string, foundItemId: string, message: string) => {
    const lost = items.find((i) => i.id === lostItemId);
    const found = items.find((i) => i.id === foundItemId);

    if (!lost || !found) {
      showToast('Could not link matching items', 'error');
      return;
    }

    const newClaim: ClaimRequest = {
      id: `claim-${Date.now()}`,
      lostItemId,
      foundItemId,
      lostItemTitle: lost.title,
      foundItemTitle: found.title,
      claimantName: profile.name,
      claimantStudentId: profile.studentId,
      message,
      createdAt: new Date().toISOString(),
      status: 'Pending Verification',
    };

    setClaims((prev) => [newClaim, ...prev]);

    // Update item statuses to 'Pending'
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === lostItemId || item.id === foundItemId) {
          return { ...item, status: 'Pending' };
        }
        return item;
      })
    );

    showToast('Interest registered! Campus Desk and reporting student notified.', 'success');
  };

  // Stats calculation
  const stats = useMemo(() => {
    const totalLost = items.filter((i) => i.type === 'lost').length;
    const totalFound = items.filter((i) => i.type === 'found').length;
    const totalReturned = items.filter((i) => i.status === 'Returned').length;
    const myLostCount = items.filter(
      (i) => i.type === 'lost' && (i.reporterName === profile.name || i.reporterStudentId === profile.studentId)
    ).length;
    const myFoundCount = items.filter(
      (i) => i.type === 'found' && (i.reporterName === profile.name || i.reporterStudentId === profile.studentId)
    ).length;

    return {
      totalLost,
      totalFound,
      totalReturned,
      activeMatchesCount: matches.length,
      myLostCount,
      myFoundCount,
    };
  }, [items, matches, profile]);

  return (
    <AppContext.Provider
      value={{
        items,
        profile,
        claims,
        matches,
        addItem,
        updateItemStatus,
        deleteItem,
        markReturned,
        resetDemoData,
        updateProfile,
        submitClaim,
        getItemMatches,
        showToast,
        toasts,
        removeToast,
        stats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
