import { 
  LayoutDashboard, 
  CalendarDays,
  Activity, 
  Package, 
  DollarSign, 
  Calculator, 
  FileText, 
  CreditCard, 
  Users 
} from 'lucide-react';

export interface MenuItem {
  id: string;
  path: string;
  name: string;
  icon: any;
  isConfidential: boolean;
  subItems?: { id: string; name: string; isConfidential?: boolean }[];
}

export const MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', path: '/', name: 'Dashboard', icon: LayoutDashboard, isConfidential: false },
  { id: 'calendar', path: '/calendar', name: 'Calendar', icon: CalendarDays, isConfidential: false },
  { id: 'production', path: '/production', name: 'Production Tracking', icon: Activity, isConfidential: false },
  { id: 'warehouse', path: '/warehouse', name: 'Warehouse', icon: Package, isConfidential: false },
  { id: 'financial', path: '/financial', name: 'Financial', icon: DollarSign, isConfidential: true },
  { id: 'cost-control', path: '/cost-control', name: 'Cost Control', icon: Calculator, isConfidential: true },
  { id: 'quotation', path: '/quotation', name: 'Quotation', icon: FileText, isConfidential: true },
  { id: 'credit-analysis', path: '/credit-analysis', name: 'Credit Analysis', icon: CreditCard, isConfidential: true },
  { id: 'permissions', path: '/permissions', name: 'User Permissions', icon: Users, isConfidential: true },
];
