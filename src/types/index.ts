export type ItemCategory = 
  | 'ID Card' 
  | 'Water Bottle' 
  | 'Books' 
  | 'Wallet' 
  | 'Earphones' 
  | 'Keys' 
  | 'Others';

export type LocationType = 
  | 'Classroom' 
  | 'Library' 
  | 'Canteen' 
  | 'Laboratory' 
  | 'Hostel' 
  | 'Other';

export type ReportType = 'lost' | 'found';

export type ItemStatus = 'Open' | 'Pending' | 'Returned' | 'Claimed';

export interface LostFoundItem {
  id: string;
  type: ReportType;
  title: string;
  category: ItemCategory;
  color: string;
  location: LocationType;
  date: string; // YYYY-MM-DD
  description: string;
  imageUrl?: string;
  status: ItemStatus;
  reporterName: string;
  reporterStudentId: string;
  reporterContactHidden: string; // e.g. masked phone / secure contact
  createdAt: string;
  returnDate?: string;
}

export interface MatchResult {
  lostItem: LostFoundItem;
  foundItem: LostFoundItem;
  matchScore: number; // 0 - 100
  matchedFields: {
    category: boolean;
    color: boolean;
    location: boolean;
    title: boolean;
    dateProximity: boolean;
  };
  reasons: string[];
}

export interface ClaimRequest {
  id: string;
  lostItemId: string;
  foundItemId: string;
  lostItemTitle: string;
  foundItemTitle: string;
  claimantName: string;
  claimantStudentId: string;
  message: string;
  createdAt: string;
  status: 'Pending Verification' | 'Approved' | 'Resolved';
}

export interface DemoProfile {
  name: string;
  studentId: string;
  department: string;
  email: string;
  avatar: string;
}
