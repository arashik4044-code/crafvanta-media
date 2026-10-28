import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LeadInquiry,
  ServiceItem,
  PortfolioCategory,
  ClientBrand,
  AgencySettings,
  HeroSlideItem,
} from '../types';
import { initialHeroSlides } from '../data';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadInquiry[];
  setLeads: React.Dispatch<React.SetStateAction<LeadInquiry[]>>;
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  portfolio: PortfolioCategory[];
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioCategory[]>>;
  clients: ClientBrand[];
  setClients: React.Dispatch<React.SetStateAction<ClientBrand[]>>;
  settings: AgencySettings;
  setSettings: React.Dispatch<React.SetStateAction<AgencySettings>>;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  heroSlides?: HeroSlideItem[];
  setHeroSlides?: React.Dispatch<React.SetStateAction<HeroSlideItem[]>>;
}

export default function AdminPanel({
  isOpen,
  onClose,
  leads,
  setLeads,
  services,
  setServices,
  portfolio,
  setPortfolio,
  clients,
  setClients,
  settings,
  setSettings,
  theme,
  toggleTheme,
  heroSlides = initialHeroSlides,
  setHeroSlides,
}: AdminPanelProps) {
  // Authentication State with custom email & password support
  const [savedCredentials, setSavedCredentials] = useState<{ email: string; password: string }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crafvanta_admin_credentials');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return {
      email: 'arashik3456@gmail.com',
      password: 'admin123',
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('crafvanta_admin_auth') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState(() => savedCredentials.email || 'arashik3456@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'reset'>('login');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  // Current Admin Tab
  const [currentTab, setCurrentTab] = useState<
    | 'dashboard'
    | 'inbox'
    | 'deliveries'
    | 'tasks'
    | 'attendance'
    | 'employees'
    | 'expenses'
    | 'payroll'
    | 'content'
    | 'media'
    | 'leads'
    | 'services'
    | 'portfolio'
    | 'clients'
    | 'settings'
    | 'seo'
  >('inbox');
  const [inboxSubTab, setInboxSubTab] = useState<'client_reports' | 'website_enquiries'>('client_reports');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  // Search & Filter state for Leads
  const [leadSearch, setLeadSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals for additions
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [newLead, setNewLead] = useState<Partial<LeadInquiry>>({
    name: '',
    contact: '',
    service: 'Software Development',
    message: '',
    status: 'New',
    budget: '',
  });

  const [isNewServiceOpen, setIsNewServiceOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [serviceFormData, setServiceFormData] = useState<Partial<ServiceItem>>({
    title: '',
    description: '',
    badge: '',
    category: 'Engineering',
    tags: [],
    active: true,
  });

  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [newClient, setNewClient] = useState<Partial<ClientBrand>>({
    name: '',
    sub: '',
    color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
  });
  const [editingPageName, setEditingPageName] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Hero slide modal & form state
  const [editingSlide, setEditingSlide] = useState<HeroSlideItem | null>(null);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [slideFormData, setSlideFormData] = useState<HeroSlideItem>({
    id: '',
    tabNumber: '01',
    tabName: '',
    title: '',
    badge: 'Our services',
    description: '',
    image: '',
  });

  // Hero section settings local inputs
  const [heroSettingsForm, setHeroSettingsForm] = useState({
    heroSmallLabel: settings.heroSmallLabel || 'Our services',
    heroButtonText: settings.heroButtonText || "Let's Work Together",
    heroButtonLink: settings.heroButtonLink || '#contact',
    heroSecondaryButtonText: settings.heroSecondaryButtonText || 'Explore services',
    heroSecondaryButtonLink: settings.heroSecondaryButtonLink || '#services',
  });

  // Videos state with persistence
  const [videos, setVideos] = useState<Array<{ id: string; title: string; category: string; videoUrl: string; thumbnail: string }>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crafvanta_videos');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      {
        id: 'v-1',
        title: 'Crafvanta Brand Reel 2026',
        category: 'Brand Film',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'v-2',
        title: 'Software & Cloud Automation Showcase',
        category: 'Product Demo',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'v-3',
        title: 'Digital Marketing Campaign Case Study',
        category: 'Growth Story',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      },
    ];
  });

  React.useEffect(() => {
    localStorage.setItem('crafvanta_videos', JSON.stringify(videos));
  }, [videos]);

  // Media Assets State & Persistence
  const [mediaAssets, setMediaAssets] = useState<Array<{
    id: string;
    name: string;
    category: 'Hero Visual' | 'Client Logo' | 'Portfolio Photo' | 'Service Cover' | 'Video Asset' | 'Other';
    url: string;
    size: string;
    dimensions: string;
    uploadedAt: string;
  }>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crafvanta_media_assets');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      {
        id: 'm-1',
        name: 'hero_software_3d.jpg',
        category: 'Hero Visual',
        url: '/src/assets/images/hero_software_3d_1792255061429.jpg',
        size: '1.4 MB',
        dimensions: '1920x1080',
        uploadedAt: '2026-10-21 14:20',
      },
      {
        id: 'm-2',
        name: 'hero_marketing_3d.jpg',
        category: 'Hero Visual',
        url: '/src/assets/images/hero_marketing_3d_1792255060437.jpg',
        size: '1.2 MB',
        dimensions: '1920x1080',
        uploadedAt: '2026-10-21 14:25',
      },
      {
        id: 'm-3',
        name: 'ads_campaign_showcase.jpg',
        category: 'Portfolio Photo',
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
        size: '850 KB',
        dimensions: '1000x667',
        uploadedAt: '2026-10-22 09:15',
      },
      {
        id: 'm-4',
        name: 'website_projects_showcase.jpg',
        category: 'Portfolio Photo',
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
        size: '920 KB',
        dimensions: '1000x667',
        uploadedAt: '2026-10-22 09:20',
      },
      {
        id: 'm-5',
        name: 'video_editing_showcase.jpg',
        category: 'Portfolio Photo',
        url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
        size: '780 KB',
        dimensions: '1000x667',
        uploadedAt: '2026-10-22 10:00',
      },
      {
        id: 'm-6',
        name: 'web_design_development.jpg',
        category: 'Service Cover',
        url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
        size: '640 KB',
        dimensions: '800x533',
        uploadedAt: '2026-10-22 11:30',
      },
    ];
  });

  React.useEffect(() => {
    localStorage.setItem('crafvanta_media_assets', JSON.stringify(mediaAssets));
  }, [mediaAssets]);

  const [mediaCategoryFilter, setMediaCategoryFilter] = useState<string>('All');
  const [mediaSearchQuery, setMediaSearchQuery] = useState<string>('');
  const [previewMediaItem, setPreviewMediaItem] = useState<{ name: string; url: string; category: string; size: string } | null>(null);
  const [isUploadMediaOpen, setIsUploadMediaOpen] = useState<boolean>(false);
  const [newMediaData, setNewMediaData] = useState({
    name: '',
    category: 'Portfolio Photo' as 'Hero Visual' | 'Client Logo' | 'Portfolio Photo' | 'Service Cover' | 'Video Asset' | 'Other',
    url: '',
    size: '1.1 MB',
    dimensions: '1024x768',
  });

  const [isNewVideoOpen, setIsNewVideoOpen] = useState(false);
  const [videoFormData, setVideoFormData] = useState({
    title: '',
    category: 'Commercial',
    videoUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
  });

  // Payroll Management State
  const [payrollRecords, setPayrollRecords] = useState<Array<{
    id: string;
    employeeName: string;
    role: string;
    department: string;
    baseSalary: number;
    bonus: number;
    deductions: number;
    netSalary: number;
    status: 'Paid' | 'Pending' | 'Processing';
    paymentMethod: string;
    paymentDate: string;
  }>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crafvanta_payroll_records');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      {
        id: 'pr-101',
        employeeName: 'Tanvir Ahmed',
        role: 'Lead Full-Stack Architect',
        department: 'Engineering',
        baseSalary: 3800,
        bonus: 400,
        deductions: 0,
        netSalary: 4200,
        status: 'Paid',
        paymentMethod: 'Bank Wire',
        paymentDate: '2026-10-01',
      },
      {
        id: 'pr-102',
        employeeName: 'Sabrina Khan',
        role: 'Senior UI/UX & Brand Lead',
        department: 'Creative',
        baseSalary: 3200,
        bonus: 250,
        deductions: 0,
        netSalary: 3450,
        status: 'Paid',
        paymentMethod: 'Bank Wire',
        paymentDate: '2026-10-01',
      },
      {
        id: 'pr-103',
        employeeName: 'Mahmud Hasan',
        role: 'Motion Graphics Specialist',
        department: 'Creative',
        baseSalary: 2800,
        bonus: 200,
        deductions: 50,
        netSalary: 2950,
        status: 'Paid',
        paymentMethod: 'bKash / Mobile',
        paymentDate: '2026-10-01',
      },
      {
        id: 'pr-104',
        employeeName: 'Nusrat Jahan',
        role: 'Growth & Performance Marketer',
        department: 'Marketing',
        baseSalary: 2600,
        bonus: 300,
        deductions: 0,
        netSalary: 2900,
        status: 'Pending',
        paymentMethod: 'Wise / USD',
        paymentDate: '2026-10-25',
      },
      {
        id: 'pr-105',
        employeeName: 'Rifat Hossain',
        role: 'Cloud & DevOps Engineer',
        department: 'Engineering',
        baseSalary: 3500,
        bonus: 300,
        deductions: 0,
        netSalary: 3800,
        status: 'Paid',
        paymentMethod: 'Bank Wire',
        paymentDate: '2026-10-01',
      },
      {
        id: 'pr-106',
        employeeName: 'Ayesha Rahman',
        role: 'Client Success Manager',
        department: 'Operations',
        baseSalary: 2400,
        bonus: 150,
        deductions: 0,
        netSalary: 2550,
        status: 'Processing',
        paymentMethod: 'bKash / Mobile',
        paymentDate: '2026-10-23',
      },
    ];
  });

  React.useEffect(() => {
    localStorage.setItem('crafvanta_payroll_records', JSON.stringify(payrollRecords));
  }, [payrollRecords]);

  // Payroll Filter States & Modals
  const [payrollSearch, setPayrollSearch] = useState('');
  const [payrollStatusFilter, setPayrollStatusFilter] = useState('All');
  const [payrollMonth, setPayrollMonth] = useState('October 2026');
  const [selectedPaySlip, setSelectedPaySlip] = useState<typeof payrollRecords[0] | null>(null);
  const [isNewPayrollOpen, setIsNewPayrollOpen] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState<typeof payrollRecords[0] | null>(null);
  const [payrollFormData, setPayrollFormData] = useState({
    employeeName: '',
    role: '',
    department: 'Engineering',
    baseSalary: 3000,
    bonus: 200,
    deductions: 0,
    status: 'Pending' as 'Paid' | 'Pending' | 'Processing',
    paymentMethod: 'Bank Wire',
    paymentDate: new Date().toISOString().split('T')[0],
  });

  const filteredPayrollRecords = useMemo(() => {
    return payrollRecords.filter((rec) => {
      const matchesStatus = payrollStatusFilter === 'All' || rec.status === payrollStatusFilter;
      const q = payrollSearch.toLowerCase();
      const matchesSearch =
        !q ||
        rec.employeeName.toLowerCase().includes(q) ||
        rec.role.toLowerCase().includes(q) ||
        rec.department.toLowerCase().includes(q) ||
        rec.paymentMethod.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [payrollRecords, payrollStatusFilter, payrollSearch]);

  const handleSavePayrollRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payrollFormData.employeeName.trim() || !payrollFormData.role.trim()) {
      showToast('Please enter employee name and role');
      return;
    }
    const net = Number(payrollFormData.baseSalary) + Number(payrollFormData.bonus) - Number(payrollFormData.deductions);
    if (editingPayroll) {
      setPayrollRecords((prev) =>
        prev.map((r) =>
          r.id === editingPayroll.id
            ? {
                ...r,
                employeeName: payrollFormData.employeeName,
                role: payrollFormData.role,
                department: payrollFormData.department,
                baseSalary: Number(payrollFormData.baseSalary),
                bonus: Number(payrollFormData.bonus),
                deductions: Number(payrollFormData.deductions),
                netSalary: net,
                status: payrollFormData.status,
                paymentMethod: payrollFormData.paymentMethod,
                paymentDate: payrollFormData.paymentDate,
              }
            : r
        )
      );
      showToast(`Updated payroll record for ${payrollFormData.employeeName}`);
    } else {
      const newRec = {
        id: `pr-${Date.now()}`,
        employeeName: payrollFormData.employeeName,
        role: payrollFormData.role,
        department: payrollFormData.department,
        baseSalary: Number(payrollFormData.baseSalary),
        bonus: Number(payrollFormData.bonus),
        deductions: Number(payrollFormData.deductions),
        netSalary: net,
        status: payrollFormData.status,
        paymentMethod: payrollFormData.paymentMethod,
        paymentDate: payrollFormData.paymentDate,
      };
      setPayrollRecords((prev) => [newRec, ...prev]);
      showToast(`Added payroll record for ${payrollFormData.employeeName}`);
    }
    setIsNewPayrollOpen(false);
    setEditingPayroll(null);
  };

  const exportPayrollCSV = () => {
    const headers = ['ID,Employee Name,Role,Department,Base Salary,Bonus,Deductions,Net Pay,Status,Payment Method,Payment Date'];
    const rows = payrollRecords.map((r) =>
      `"${r.id}","${r.employeeName}","${r.role}","${r.department}","${r.baseSalary}","${r.bonus}","${r.deductions}","${r.netSalary}","${r.status}","${r.paymentMethod}","${r.paymentDate}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `crafvanta_payroll_${payrollMonth.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Payroll records exported as CSV');
  };

  // Deliveries State
  const [deliveries, setDeliveries] = useState(() => [
    { id: 'del-1', title: 'Enterprise Web App v2.0 Release', client: 'Apex Global', deadline: '2026-10-28', status: 'In QA', filesCount: 14 },
    { id: 'del-2', title: 'Brand Identity & Motion Graphics Asset Pack', client: 'Crafvanta Partner', deadline: '2026-10-30', status: 'Delivered', filesCount: 28 },
    { id: 'del-3', title: '3D Product Render Video Reel', client: 'Lumiere Vision', deadline: '2026-11-05', status: 'In Progress', filesCount: 8 },
  ]);

  // Tasks State & Persistence
  const [tasks, setTasks] = useState<{
    id: string;
    title: string;
    assignee: string;
    priority: string;
    status: string;
    tag: string;
    dueDate?: string;
    description?: string;
  }[]>(() => {
    try {
      const saved = localStorage.getItem('crafvanta_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { id: 't-1', title: 'Optimize Hero 3D Model Loading Speed', assignee: 'Tanvir Ahmed', priority: 'High', status: 'In Progress', tag: 'Engineering', dueDate: '2026-11-01', description: 'Reduce GLTF asset payload and implement Draco compression.' },
      { id: 't-2', title: 'Finalize Dark Theme Palette for Client Dashboard', assignee: 'Sabrina Khan', priority: 'Medium', status: 'Completed', tag: 'Design', dueDate: '2026-10-28', description: 'Selected slate-900 / emerald accents for UI contrast.' },
      { id: 't-3', title: 'Render Commercial Video Intro in 4K', assignee: 'Mahmud Hasan', priority: 'High', status: 'To Do', tag: 'Video', dueDate: '2026-11-05', description: '3D motion intro sequence for Crafvanta enterprise clients.' },
      { id: 't-4', title: 'Run Facebook & Google Ads Retargeting Campaign', assignee: 'Nusrat Jahan', priority: 'Low', status: 'In Progress', tag: 'Marketing', dueDate: '2026-11-10', description: 'Set up lookalike audiences and conversion pixel tracking.' },
    ];
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('crafvanta_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  // Tasks Filter States & Modals
  const [taskSearch, setTaskSearch] = useState('');
  const [taskStatusFilter, setTaskStatusFilter] = useState('All');
  const [taskTagFilter, setTaskTagFilter] = useState('All');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<{
    id: string;
    title: string;
    assignee: string;
    priority: string;
    status: string;
    tag: string;
    dueDate?: string;
    description?: string;
  } | null>(null);
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    assignee: 'Tanvir Ahmed',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    status: 'To Do' as 'To Do' | 'In Progress' | 'Completed',
    tag: 'Engineering',
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    description: '',
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesStatus = taskStatusFilter === 'All' || t.status === taskStatusFilter;
      const matchesTag = taskTagFilter === 'All' || t.tag === taskTagFilter;
      const q = taskSearch.toLowerCase();
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.assignee.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q));
      return matchesStatus && matchesTag && matchesSearch;
    });
  }, [tasks, taskStatusFilter, taskTagFilter, taskSearch]);

  const handleOpenNewTaskModal = () => {
    setEditingTask(null);
    setTaskFormData({
      title: '',
      assignee: 'Tanvir Ahmed',
      priority: 'Medium',
      status: 'To Do',
      tag: 'Engineering',
      dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      description: '',
    });
    setIsNewTaskOpen(true);
  };

  const handleOpenEditTaskModal = (task: typeof tasks[0]) => {
    setEditingTask(task);
    setTaskFormData({
      title: task.title,
      assignee: task.assignee || 'Tanvir Ahmed',
      priority: (task.priority as any) || 'Medium',
      status: (task.status as any) || 'To Do',
      tag: task.tag || 'Engineering',
      dueDate: task.dueDate || new Date().toISOString().split('T')[0],
      description: task.description || '',
    });
    setIsNewTaskOpen(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskFormData.title.trim()) {
      showToast('Please enter a task title');
      return;
    }
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                title: taskFormData.title.trim(),
                assignee: taskFormData.assignee.trim(),
                priority: taskFormData.priority,
                status: taskFormData.status,
                tag: taskFormData.tag,
                dueDate: taskFormData.dueDate,
                description: taskFormData.description.trim(),
              }
            : t
        )
      );
      showToast(`Updated task: ${taskFormData.title}`);
    } else {
      const newTask = {
        id: `t-${Date.now()}`,
        title: taskFormData.title.trim(),
        assignee: taskFormData.assignee.trim() || 'Tanvir Ahmed',
        priority: taskFormData.priority,
        status: taskFormData.status,
        tag: taskFormData.tag,
        dueDate: taskFormData.dueDate,
        description: taskFormData.description.trim(),
      };
      setTasks((prev) => [newTask, ...prev]);
      showToast(`Task created: ${newTask.title}`);
    }
    setIsNewTaskOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string, title: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast(`Deleted task: ${title}`);
  };

  // Attendance State
  const [attendanceLogs] = useState([
    { id: 'a-1', name: 'Tanvir Ahmed', role: 'Lead Architect', checkIn: '08:52 AM', status: 'Present', mode: 'Office' },
    { id: 'a-2', name: 'Sabrina Khan', role: 'UI/UX Lead', checkIn: '09:05 AM', status: 'Present', mode: 'Remote' },
    { id: 'a-3', name: 'Mahmud Hasan', role: 'Motion Editor', checkIn: '09:12 AM', status: 'Present', mode: 'Office' },
    { id: 'a-4', name: 'Nusrat Jahan', role: 'Marketer', checkIn: '08:45 AM', status: 'Present', mode: 'Remote' },
    { id: 'a-5', name: 'Rifat Hossain', role: 'DevOps Engineer', checkIn: '---', status: 'On Leave', mode: 'Vacation' },
  ]);

  // Employees State & Persistence
  const [employeeList, setEmployeeList] = useState<{
    id: string;
    name: string;
    role: string;
    email: string;
    department: string;
    phone: string;
    status: string;
    avatarUrl?: string;
  }[]>(() => {
    try {
      const saved = localStorage.getItem('crafvanta_employees');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { id: 'e-1', name: 'Tanvir Ahmed', role: 'Lead Full-Stack Architect', email: 'tanvir@crafvanta.com', department: 'Engineering', phone: '+880 1711 000111', status: 'Active' },
      { id: 'e-2', name: 'Sabrina Khan', role: 'Senior UI/UX & Brand Lead', email: 'sabrina@crafvanta.com', department: 'Creative', phone: '+880 1819 222333', status: 'Active' },
      { id: 'e-3', name: 'Mahmud Hasan', role: 'Motion Graphics Specialist', email: 'mahmud@crafvanta.com', department: 'Creative', phone: '+880 1912 333444', status: 'Active' },
      { id: 'e-4', name: 'Nusrat Jahan', role: 'Growth & Performance Marketer', email: 'nusrat@crafvanta.com', department: 'Marketing', phone: '+880 1611 444555', status: 'Active' },
    ];
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('crafvanta_employees', JSON.stringify(employeeList));
    } catch (e) {
      console.error(e);
    }
  }, [employeeList]);

  // Employee Filter & Modal State
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employeeDepartmentFilter, setEmployeeDepartmentFilter] = useState('All');
  const [isNewEmployeeOpen, setIsNewEmployeeOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<{
    id: string;
    name: string;
    role: string;
    email: string;
    department: string;
    phone: string;
    status: string;
    avatarUrl?: string;
  } | null>(null);
  const [employeeFormData, setEmployeeFormData] = useState({
    name: '',
    role: '',
    email: '',
    department: 'Engineering',
    phone: '',
    status: 'Active',
    avatarUrl: '',
  });

  const filteredEmployees = useMemo(() => {
    return employeeList.filter((emp) => {
      const matchesDept =
        employeeDepartmentFilter === 'All' || emp.department === employeeDepartmentFilter;
      const q = employeeSearch.toLowerCase();
      const matchesSearch =
        !q ||
        emp.name.toLowerCase().includes(q) ||
        emp.role.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        emp.phone.toLowerCase().includes(q);
      return matchesDept && matchesSearch;
    });
  }, [employeeList, employeeDepartmentFilter, employeeSearch]);

  const handleOpenNewEmployeeModal = () => {
    setEditingEmployee(null);
    setEmployeeFormData({
      name: '',
      role: '',
      email: '',
      department: 'Engineering',
      phone: '',
      status: 'Active',
      avatarUrl: '',
    });
    setIsNewEmployeeOpen(true);
  };

  const handleOpenEditEmployeeModal = (emp: typeof employeeList[0]) => {
    setEditingEmployee(emp);
    setEmployeeFormData({
      name: emp.name,
      role: emp.role,
      email: emp.email,
      department: emp.department,
      phone: emp.phone,
      status: emp.status,
      avatarUrl: emp.avatarUrl || '',
    });
    setIsNewEmployeeOpen(true);
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeFormData.name.trim() || !employeeFormData.role.trim()) {
      showToast('Please provide full name and role/designation');
      return;
    }

    const email =
      employeeFormData.email.trim() ||
      `${employeeFormData.name.toLowerCase().replace(/\s+/g, '')}@crafvanta.com`;
    const phone = employeeFormData.phone.trim() || '+880 1700 000000';

    if (editingEmployee) {
      setEmployeeList((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployee.id
            ? {
                ...emp,
                name: employeeFormData.name.trim(),
                role: employeeFormData.role.trim(),
                email,
                department: employeeFormData.department,
                phone,
                status: employeeFormData.status,
                avatarUrl: employeeFormData.avatarUrl,
              }
            : emp
        )
      );
      showToast(`Updated team member: ${employeeFormData.name}`);
    } else {
      const newEmp = {
        id: `e-${Date.now()}`,
        name: employeeFormData.name.trim(),
        role: employeeFormData.role.trim(),
        email,
        department: employeeFormData.department,
        phone,
        status: employeeFormData.status,
        avatarUrl: employeeFormData.avatarUrl,
      };
      setEmployeeList((prev) => [...prev, newEmp]);
      showToast(`Added ${newEmp.name} to agency team roster`);
    }

    setIsNewEmployeeOpen(false);
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (empId: string, empName: string) => {
    setEmployeeList((prev) => prev.filter((e) => e.id !== empId));
    showToast(`Removed ${empName} from roster`);
  };

  // Expenses State & Persistence
  const [expenseLogs, setExpenseLogs] = useState<{
    id: string;
    category: string;
    desc: string;
    amount: number;
    vendor: string;
    date: string;
    status: string;
    paymentMethod?: string;
  }[]>(() => {
    try {
      const saved = localStorage.getItem('crafvanta_expenses');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { id: 'exp-1', category: 'Infrastructure', desc: 'AWS & Vercel Cloud Server Hosting', amount: 125000, vendor: 'AWS Cloud Services', date: '2026-10-15', status: 'Paid', paymentMethod: 'Corporate Credit Card' },
      { id: 'exp-2', category: 'Software', desc: 'Adobe Creative Cloud Enterprise Suite', amount: 84000, vendor: 'Adobe Inc.', date: '2026-10-18', status: 'Paid', paymentMethod: 'Bank Transfer' },
      { id: 'exp-3', category: 'Marketing', desc: 'Meta & Google PPC Ad Spend', amount: 240000, vendor: 'Google Ads', date: '2026-10-21', status: 'Paid', paymentMethod: 'bKash / Bank' },
      { id: 'exp-4', category: 'Office', desc: 'Studio High-Speed Fiber Internet', amount: 18000, vendor: 'Dot Internet BD', date: '2026-10-22', status: 'Pending', paymentMethod: 'bKash / Mobile Billing' },
      { id: 'exp-5', category: 'Hardware', desc: 'Apple Mac Studio M3 Upgrade', amount: 399000, vendor: 'Apple Authorized Reseller', date: '2026-10-24', status: 'Paid', paymentMethod: 'Bank Wire' },
    ];
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('crafvanta_expenses', JSON.stringify(expenseLogs));
    } catch (e) {
      console.error(e);
    }
  }, [expenseLogs]);

  // Expenses Filters & Modal State
  const [expenseSearch, setExpenseSearch] = useState('');
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState('All');
  const [expenseStatusFilter, setExpenseStatusFilter] = useState('All');
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<{
    id: string;
    category: string;
    desc: string;
    amount: number;
    vendor: string;
    date: string;
    status: string;
    paymentMethod?: string;
  } | null>(null);

  const [expenseFormData, setExpenseFormData] = useState({
    desc: '',
    category: 'Infrastructure',
    amount: 25000,
    vendor: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Paid',
    paymentMethod: 'Corporate Card',
  });

  const filteredExpenseLogs = useMemo(() => {
    return expenseLogs.filter((exp) => {
      const matchesCategory =
        expenseCategoryFilter === 'All' || exp.category === expenseCategoryFilter;
      const matchesStatus =
        expenseStatusFilter === 'All' || exp.status === expenseStatusFilter;
      const q = expenseSearch.toLowerCase();
      const matchesSearch =
        !q ||
        exp.desc.toLowerCase().includes(q) ||
        exp.vendor.toLowerCase().includes(q) ||
        exp.category.toLowerCase().includes(q) ||
        (exp.paymentMethod && exp.paymentMethod.toLowerCase().includes(q));
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [expenseLogs, expenseCategoryFilter, expenseStatusFilter, expenseSearch]);

  const handleOpenNewExpenseModal = () => {
    setEditingExpense(null);
    setExpenseFormData({
      desc: '',
      category: 'Infrastructure',
      amount: 25000,
      vendor: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      paymentMethod: 'Corporate Card',
    });
    setIsNewExpenseOpen(true);
  };

  const handleOpenEditExpenseModal = (exp: typeof expenseLogs[0]) => {
    setEditingExpense(exp);
    setExpenseFormData({
      desc: exp.desc,
      category: exp.category,
      amount: exp.amount,
      vendor: exp.vendor,
      date: exp.date,
      status: exp.status,
      paymentMethod: exp.paymentMethod || 'Corporate Card',
    });
    setIsNewExpenseOpen(true);
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseFormData.desc.trim() || Number(expenseFormData.amount) <= 0) {
      showToast('Please provide valid expense description and amount');
      return;
    }

    const vendor = expenseFormData.vendor.trim() || 'Direct Vendor';

    if (editingExpense) {
      setExpenseLogs((prev) =>
        prev.map((exp) =>
          exp.id === editingExpense.id
            ? {
                ...exp,
                desc: expenseFormData.desc.trim(),
                category: expenseFormData.category,
                amount: Number(expenseFormData.amount),
                vendor,
                date: expenseFormData.date,
                status: expenseFormData.status,
                paymentMethod: expenseFormData.paymentMethod,
              }
            : exp
        )
      );
      showToast(`Updated expense: ${expenseFormData.desc}`);
    } else {
      const newExp = {
        id: `exp-${Date.now()}`,
        desc: expenseFormData.desc.trim(),
        category: expenseFormData.category,
        amount: Number(expenseFormData.amount),
        vendor,
        date: expenseFormData.date,
        status: expenseFormData.status,
        paymentMethod: expenseFormData.paymentMethod,
      };
      setExpenseLogs((prev) => [newExp, ...prev]);
      showToast(`Logged expense: ৳${newExp.amount.toLocaleString()} BDT`);
    }

    setIsNewExpenseOpen(false);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (expId: string, desc: string) => {
    setExpenseLogs((prev) => prev.filter((e) => e.id !== expId));
    showToast(`Removed expense: ${desc}`);
  };

  const filteredMediaAssets = useMemo(() => {
    return mediaAssets.filter((item) => {
      const matchesCategory =
        mediaCategoryFilter === 'All' || item.category === mediaCategoryFilter;
      const matchesSearch =
        item.name.toLowerCase().includes(mediaSearchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(mediaSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [mediaAssets, mediaCategoryFilter, mediaSearchQuery]);

  const handleCreateMediaAsset = () => {
    if (!newMediaData.name.trim() || !newMediaData.url.trim()) {
      showToast('Please provide an asset title and image');
      return;
    }
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newAsset = {
      id: `m-${Date.now()}`,
      name: newMediaData.name,
      category: newMediaData.category,
      url: newMediaData.url,
      size: newMediaData.size || '980 KB',
      dimensions: newMediaData.dimensions || '1200x800',
      uploadedAt: formatted,
    };
    setMediaAssets((prev) => [newAsset, ...prev]);
    setIsUploadMediaOpen(false);
    setNewMediaData({
      name: '',
      category: 'Portfolio Photo',
      url: '',
      size: '1.1 MB',
      dimensions: '1024x768',
    });
    showToast(`Uploaded asset: ${newAsset.name}`);
  };

  // Slide helper functions
  const handleMoveSlideUp = (idx: number) => {
    if (idx <= 0 || !setHeroSlides) return;
    setHeroSlides((prev) => {
      const updated = [...prev];
      const temp = updated[idx];
      updated[idx] = updated[idx - 1];
      updated[idx - 1] = temp;
      return updated;
    });
    showToast('Slide moved up');
  };

  const handleMoveSlideDown = (idx: number) => {
    if (!setHeroSlides || idx >= heroSlides.length - 1) return;
    setHeroSlides((prev) => {
      const updated = [...prev];
      const temp = updated[idx];
      updated[idx] = updated[idx + 1];
      updated[idx + 1] = temp;
      return updated;
    });
    showToast('Slide moved down');
  };

  const handleDeleteSlide = (slideId: string) => {
    if (!setHeroSlides) return;
    if (heroSlides.length <= 1) {
      showToast('At least one hero slide is required');
      return;
    }
    setHeroSlides((prev) => prev.filter((s) => s.id !== slideId));
    showToast('Slide removed');
  };

  const handleOpenEditSlide = (slide: HeroSlideItem) => {
    setEditingSlide(slide);
    setSlideFormData({ ...slide });
    setIsSlideModalOpen(true);
  };

  const handleOpenAddSlide = () => {
    setEditingSlide(null);
    const nextNum = String(heroSlides.length + 1).padStart(2, '0');
    setSlideFormData({
      id: `slide-${Date.now()}`,
      tabNumber: nextNum,
      tabName: `Service ${nextNum}`,
      title: 'New Service Spotlight',
      badge: `Our services · ${nextNum}/${nextNum}`,
      description: 'Describe the high-impact service capabilities and deliverables here...',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
    });
    setIsSlideModalOpen(true);
  };

  const handleSaveSlideModal = () => {
    if (!setHeroSlides) return;
    if (!slideFormData.title.trim()) {
      showToast('Please provide a slide title');
      return;
    }
    if (editingSlide) {
      setHeroSlides((prev) =>
        prev.map((s) => (s.id === editingSlide.id ? { ...slideFormData, id: editingSlide.id } : s))
      );
      showToast('Hero slide updated');
    } else {
      setHeroSlides((prev) => [...prev, slideFormData]);
      showToast('New hero slide added');
    }
    setIsSlideModalOpen(false);
    setEditingSlide(null);
  };

  const handleSaveHeroSettings = () => {
    setSettings((prev) => ({
      ...prev,
      heroSmallLabel: heroSettingsForm.heroSmallLabel,
      heroButtonText: heroSettingsForm.heroButtonText,
      heroButtonLink: heroSettingsForm.heroButtonLink,
      heroSecondaryButtonText: heroSettingsForm.heroSecondaryButtonText,
      heroSecondaryButtonLink: heroSettingsForm.heroSecondaryButtonLink,
    }));
    showToast('Hero section settings saved');
  };

  const handleResetHeroToDefault = () => {
    if (setHeroSlides) {
      setHeroSlides(initialHeroSlides);
    }
    setHeroSettingsForm({
      heroSmallLabel: 'Our services',
      heroButtonText: "Let's Work Together",
      heroButtonLink: '#contact',
      heroSecondaryButtonText: 'Explore services',
      heroSecondaryButtonLink: '#services',
    });
    setSettings((prev) => ({
      ...prev,
      heroSmallLabel: 'Our services',
      heroButtonText: "Let's Work Together",
      heroButtonLink: '#contact',
      heroSecondaryButtonText: 'Explore services',
      heroSecondaryButtonLink: '#services',
    }));
    showToast('Hero reset to default');
  };

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredEmail = adminEmail.trim().toLowerCase();
    const targetEmail = (savedCredentials.email || 'arashik3456@gmail.com').trim().toLowerCase();

    // Check if email is valid (matches user email arashik3456@gmail.com or admin default)
    const isEmailValid =
      enteredEmail === targetEmail ||
      enteredEmail === 'arashik3456@gmail.com' ||
      enteredEmail === 'admin@crafvantamedia.com';

    // Accepted passwords: saved password, common defaults (admin123, 123456, arashik123, crafvanta2026), or empty for quick test
    const isPasswordValid =
      adminPassword === savedCredentials.password ||
      adminPassword === 'admin123' ||
      adminPassword === '123456' ||
      adminPassword === 'arashik123' ||
      adminPassword === 'crafvanta2026';

    if (isEmailValid && isPasswordValid) {
      setIsAuthenticated(true);
      localStorage.setItem('crafvanta_admin_auth', 'true');
      setAuthError('');
      setAuthSuccess('');
      showToast(`Welcome back, ${adminEmail}!`);
    } else if (!isEmailValid) {
      setAuthError(`Email "${adminEmail}" is not recognized. Please use ${savedCredentials.email}`);
    } else {
      setAuthError('Incorrect password. Default: admin123 or 123456, or click "Set Custom Password" below.');
    }
  };

  const handleSetNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordInput || newPasswordInput.length < 4) {
      setAuthError('Password must be at least 4 characters.');
      setAuthSuccess('');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setAuthError('Passwords do not match.');
      setAuthSuccess('');
      return;
    }

    const updated = {
      email: adminEmail.trim() || 'arashik3456@gmail.com',
      password: newPasswordInput,
    };
    setSavedCredentials(updated);
    localStorage.setItem('crafvanta_admin_credentials', JSON.stringify(updated));
    setAdminPassword(newPasswordInput);
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setAuthError('');
    setAuthSuccess(`Password updated successfully! You can now sign in with your new password.`);
    setAuthMode('login');
    showToast(`Password updated for ${updated.email}`);
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('crafvanta_admin_auth', 'true');
    setAuthError('');
    setAuthSuccess('');
    showToast(`Signed in as ${savedCredentials.email || 'arashik3456@gmail.com'}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('crafvanta_admin_auth');
    showToast('Signed out successfully');
  };

  // Lead Operations
  const handleStatusChange = (leadId: string, newStatus: LeadInquiry['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    showToast(`Lead status updated to ${newStatus}`);
  };

  const handleNoteUpdate = (leadId: string, notes: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, notes } : l))
    );
  };

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      showToast('Lead deleted');
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.contact) return;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const created: LeadInquiry = {
      id: `lead-${Date.now()}`,
      name: newLead.name,
      contact: newLead.contact,
      service: newLead.service || 'General Inquiry',
      message: newLead.message || '',
      status: (newLead.status as LeadInquiry['status']) || 'New',
      budget: newLead.budget || 'Custom Quote',
      timestamp: formattedDate,
    };
    setLeads([created, ...leads]);
    setIsNewLeadOpen(false);
    setNewLead({
      name: '',
      contact: '',
      service: 'Software Development',
      message: '',
      status: 'New',
      budget: '',
    });
    showToast('New lead added to CRM');
  };

  const exportLeadsCSV = () => {
    const headers = ['ID,Name,Contact,Service,Status,Budget,Date,Message,Notes'];
    const rows = leads.map((l) =>
      `"${l.id}","${l.name}","${l.contact}","${l.service}","${l.status}","${l.budget || ''}","${l.timestamp}","${(l.message || '').replace(/"/g, '""')}","${(l.notes || '').replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `crafvanta_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads exported as CSV');
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
      const q = leadSearch.toLowerCase();
      const matchesSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.contact.toLowerCase().includes(q) ||
        l.service.toLowerCase().includes(q) ||
        (l.message && l.message.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [leads, statusFilter, leadSearch]);

  // Service Operations
  const handleToggleService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
    showToast('Service visibility toggled');
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceFormData.title || !serviceFormData.description) return;

    if (editingService) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id
            ? {
                ...s,
                title: serviceFormData.title || s.title,
                description: serviceFormData.description || s.description,
                badge: serviceFormData.badge || s.badge,
                category: serviceFormData.category || s.category,
                imageUrl: serviceFormData.imageUrl !== undefined ? serviceFormData.imageUrl : s.imageUrl,
                tags: typeof serviceFormData.tags === 'string'
                  ? (serviceFormData.tags as string).split(',').map((t) => t.trim())
                  : serviceFormData.tags || s.tags,
                active: serviceFormData.active !== undefined ? serviceFormData.active : s.active,
              }
            : s
        )
      );
      showToast('Service updated successfully');
    } else {
      const newId = serviceFormData.title.toLowerCase().replace(/\s+/g, '-');
      const tagsArray = typeof serviceFormData.tags === 'string'
        ? (serviceFormData.tags as string).split(',').map((t) => t.trim())
        : (serviceFormData.tags as string[]) || ['Enterprise', 'Scale'];

      const created: ServiceItem = {
        id: newId,
        title: serviceFormData.title,
        description: serviceFormData.description,
        badge: serviceFormData.badge || 'Modern · Scalable',
        category: serviceFormData.category || 'Engineering',
        imageUrl: serviceFormData.imageUrl || '',
        tags: tagsArray,
        active: true,
      };
      setServices([...services, created]);
      showToast('New service published');
    }
    setIsNewServiceOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm('Delete this service permanently?')) {
      setServices((prev) => prev.filter((s) => s.id !== id));
      showToast('Service deleted');
    }
  };

  // Client Operations
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name) return;
    const client: ClientBrand = {
      id: `c-${Date.now()}`,
      name: newClient.name,
      sub: newClient.sub || 'Client Partner',
      color: newClient.color || 'bg-emerald-50 text-emerald-900 border-emerald-200',
    };
    setClients([...clients, client]);
    setIsNewClientOpen(false);
    setNewClient({ name: '', sub: '', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' });
    showToast('Client brand added');
  };

  const handleDeleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    showToast('Client brand removed');
  };

  // Stats Calculations
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === 'New').length;
    const inProgressCount = leads.filter((l) => l.status === 'In Progress').length;
    const convertedCount = leads.filter((l) => l.status === 'Converted').length;
    const activeServicesCount = services.filter((s) => s.active).length;
    const conversionRate = total > 0 ? Math.round((convertedCount / total) * 100) : 0;
    return {
      total,
      newCount,
      inProgressCount,
      convertedCount,
      activeServicesCount,
      conversionRate,
    };
  }, [leads, services]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex flex-col font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-950 px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 dark:border-slate-300 text-xs font-semibold flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* If Not Authenticated, Show Sleek Login Modal */}
      {!isAuthenticated ? (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
          >
            {/* Close / Return to Site */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold"
              title="Close and return to site"
            >
              ✕
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-slate-950 dark:bg-white flex items-center justify-center text-white dark:text-slate-950 shadow-sm">
                <span className="font-extrabold text-xl tracking-tighter">C</span>
              </div>
              <div>
                <span className="text-base font-black tracking-widest text-slate-900 dark:text-white uppercase leading-none block">
                  CRAFVANTA
                </span>
                <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-600 dark:text-emerald-400 uppercase leading-tight">
                  ADMIN LOGIN PANEL
                </span>
              </div>
            </div>

            {/* Authorized User Badge */}
            <div className="mb-5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Authorized Administrator</span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 font-mono truncate">{savedCredentials.email || 'arashik3456@gmail.com'}</span>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md shrink-0">
                Active
              </span>
            </div>

            {/* Mode Selector Tabs (Sign In / Set Password) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError('');
                  setAuthSuccess('');
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('reset');
                  setAuthError('');
                  setAuthSuccess('');
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  authMode === 'reset'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Set / Change Password
              </button>
            </div>

            {/* Error Notification */}
            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-300 text-xs flex items-start gap-2">
                <span className="text-sm shrink-0">⚠️</span>
                <span>{authError}</span>
              </div>
            )}

            {/* Success Notification */}
            {authSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2">
                <span className="text-sm shrink-0">✓</span>
                <span>{authSuccess}</span>
              </div>
            )}

            {/* TAB 1: SIGN IN FORM */}
            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="arashik3456@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-emerald-600 transition-colors shadow-xs"
                      required
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400">✉️</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthMode('reset')}
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      Set new password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Enter your password (e.g. admin123)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-emerald-600 transition-colors shadow-xs pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? '👁️' : '🔒'}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Default password: <strong className="text-slate-600 dark:text-slate-300 font-mono">admin123</strong> or <strong className="text-slate-600 dark:text-slate-300 font-mono">123456</strong>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.01]"
                >
                  <span>Sign In as arashik3456@gmail.com</span>
                  <span>→</span>
                </button>
              </form>
            ) : (
              /* TAB 2: SET / RESET PASSWORD FORM */
              <form onSubmit={handleSetNewPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Email Account
                  </label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="arashik3456@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="Enter your new secret password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    placeholder="Re-enter your new password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    Save Password
                  </button>
                </div>
              </form>
            )}

            {/* Bottom Utilities */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>⚡ Quick 1-Click Login (arashik3456@gmail.com)</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-center py-1 transition-colors cursor-pointer"
              >
                ← Return to Public Website
              </button>
            </div>
          </motion.div>
        </div>
      ) : (

        /* Full Authenticated Admin Dashboard Workspace */
        <div className="h-full w-full bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col overflow-hidden">
          {/* Top Navigation Bar */}
          <header className="h-16 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-950 dark:bg-white flex items-center justify-center text-white dark:text-slate-950 shadow-xs">
                  <span className="font-extrabold text-lg tracking-tighter">C</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black tracking-widest text-slate-900 dark:text-white uppercase leading-none">
                      Crafvanta Dashboard
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Dashboard &gt; {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-3">
              {/* Dark/Light Mode */}
              <button
                onClick={toggleTheme}
                type="button"
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Toggle Theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              {/* Return to Live Site Button */}
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <span>🌐 View Live Site</span>
              </button>
            </div>
          </header>

          {/* Main Layout Body: Sidebar + Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-4 shrink-0 overflow-y-auto">
              <div className="space-y-1.5">
                {/* Inbox Tab */}
                <button
                  onClick={() => setCurrentTab('inbox')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'inbox'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <span>Inbox</span>
                  </div>
                  {stats.newCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950">
                      {stats.newCount}
                    </span>
                  )}
                </button>

                {/* Deliveries */}
                <button
                  onClick={() => setCurrentTab('deliveries')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'deliveries' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Deliveries</span>
                </button>

                {/* Task Management */}
                <button
                  onClick={() => setCurrentTab('tasks')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'tasks' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0018 4.5h-2.25m-18 12.75V10.5a2.25 2.25 0 012.25-2.25h13.5M6 9.75V6.75A2.25 2.25 0 018.25 4.5h7.5A2.25 2.25 0 0118 6.75v3" />
                  </svg>
                  <span>Task Management</span>
                </button>

                {/* Attendance */}
                <button
                  onClick={() => setCurrentTab('attendance')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'attendance' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Attendance</span>
                </button>

                {/* Employees */}
                <button
                  onClick={() => setCurrentTab('employees')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'employees' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  <span>Employees</span>
                </button>

                {/* Expenses */}
                <button
                  onClick={() => setCurrentTab('expenses')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'expenses' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h16.5m0 0v1.5m0-1.5v.75A.75.75 0 0119.5 6h-.75m0 0v-.75A.75.75 0 0118.75 4.5h-.75m-15 13.5A3 3 0 016 15h12a3 3 0 013 3v.75m-15 0h15" />
                  </svg>
                  <span>Expenses</span>
                </button>

                {/* My Payroll */}
                <button
                  onClick={() => setCurrentTab('payroll')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'payroll' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  <span>My Payroll</span>
                </button>

                {/* Content Management */}
                <button
                  onClick={() => setCurrentTab('content')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'content' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span>Content Management</span>
                </button>

                {/* Media */}
                <button
                  onClick={() => setCurrentTab('media')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'media' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span>Media</span>
                </button>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 my-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                    Admin Tools
                  </div>
                </div>

                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>📊 Agency Dashboard</span>
                </button>

                <button
                  onClick={() => setCurrentTab('leads')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'leads' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>📋 Leads CRM</span>
                  {stats.newCount > 0 && <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950">{stats.newCount}</span>}
                </button>

                <button
                  onClick={() => setCurrentTab('services')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'services' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>🚀 Services ({services.length})</span>
                </button>

                <button
                  onClick={() => setCurrentTab('portfolio')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'portfolio' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>🎨 Portfolio Work</span>
                </button>

                <button
                  onClick={() => setCurrentTab('clients')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'clients' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>⭐ Client Brands</span>
                </button>

                <button
                  onClick={() => setCurrentTab('seo')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'seo' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>🔍 SEO Metadata</span>
                </button>

                <button
                  onClick={() => setCurrentTab('settings')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    currentTab === 'settings' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>⚙️ Agency Settings</span>
                </button>
              </div>

              {/* Admin Profile Box & Sign Out Button matching screenshot */}
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5 px-1">
                  <div className="w-9 h-9 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center text-xs">
                    A
                  </div>
                  <div className="overflow-hidden flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        Ashik Alam
                      </span>
                      <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        ZEN-TBJ2K
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                      arashik3456@gmail.com
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-3 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  <span>Sign out</span>
                </button>
              </div>
            </aside>

            {/* Dynamic Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {/* TAB 0: INBOX */}
              {currentTab === 'inbox' && (
                <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Inbox</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Problems reported by clients from their dashboard, and enquiries from the website contact form.
                    </p>
                  </div>

                  {/* Subtabs: Client reports & Website enquiries */}
                  <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <button
                      onClick={() => setInboxSubTab('client_reports')}
                      className={`text-xs font-bold pb-3 relative transition-colors cursor-pointer flex items-center gap-2 ${
                        inboxSubTab === 'client_reports'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A1.75 1.75 0 0115 22.75H9A1.75 1.75 0 017.25 21l5.83-5.83a2.5 2.5 0 013.54 0z" />
                      </svg>
                      <span>Client reports</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">0</span>
                      {inboxSubTab === 'client_reports' && (
                        <div className="absolute bottom-[-13px] left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400" />
                      )}
                    </button>

                    <button
                      onClick={() => setInboxSubTab('website_enquiries')}
                      className={`text-xs font-bold pb-3 relative transition-colors cursor-pointer flex items-center gap-2 ${
                        inboxSubTab === 'website_enquiries'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <span>Website enquiries</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{leads.length}</span>
                      {inboxSubTab === 'website_enquiries' && (
                        <div className="absolute bottom-[-13px] left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400" />
                      )}
                    </button>
                  </div>

                  {/* Main Split View: Left List / Right Detail */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-280px)] min-h-[500px]">
                    {/* Left Column */}
                    <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col shadow-xs">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">Open</span>
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer">Resolved</span>
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer">All</span>
                      </div>

                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="Search reports..."
                          value={leadSearch}
                          onChange={(e) => setLeadSearch(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-2">
                        {inboxSubTab === 'client_reports' ? (
                          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                            <p className="text-xs font-semibold">Nothing here.</p>
                          </div>
                        ) : (
                          leads.map((lead) => (
                            <div
                              key={lead.id}
                              onClick={() => setSelectedReportId(lead.id)}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                                selectedReportId === lead.id
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500'
                                  : 'bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{lead.name}</h4>
                                <span className="text-[10px] text-slate-400">{lead.timestamp}</span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 truncate">{lead.service} — {lead.message || 'No message'}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Right Column (Conversation / Detail) */}
                    <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-xs">
                      {selectedReportId ? (
                        (() => {
                          const lead = leads.find((l) => l.id === selectedReportId);
                          if (!lead) return <p className="text-xs text-slate-400">Report not found.</p>;
                          return (
                            <div className="w-full text-left space-y-4">
                              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                                <div>
                                  <h3 className="font-black text-base text-slate-900 dark:text-white">{lead.name}</h3>
                                  <p className="text-xs text-slate-500">{lead.contact} · {lead.service}</p>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                  {lead.status}
                                </span>
                              </div>
                              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Message / Inquiry Details</p>
                                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">{lead.message || 'No additional message provided.'}</p>
                              </div>
                              <div className="pt-4 flex gap-3">
                                <button
                                  onClick={() => handleStatusChange(lead.id, 'Contacted')}
                                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm cursor-pointer"
                                >
                                  Mark Contacted
                                </button>
                                <button
                                  onClick={() => handleStatusChange(lead.id, 'Converted')}
                                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm cursor-pointer"
                                >
                                  Mark Converted
                                </button>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="space-y-3">
                          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-xl">
                            💬
                          </div>
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Pick a report to read the conversation and reply.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* DELIVERIES TAB */}
              {currentTab === 'deliveries' && (
                <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Deliveries</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Every order from your clients' details. Deliver finished work here; the client approves it or asks for a revision from their dashboard.
                    </p>
                  </div>

                  {/* Filter Pills & Search */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button className="px-4 py-2 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm cursor-pointer">
                        To deliver 7
                      </button>
                      <button className="px-4 py-2 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 cursor-pointer">
                        Awaiting client 20
                      </button>
                      <button className="px-4 py-2 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 cursor-pointer">
                        Completed 0
                      </button>
                      <button className="px-4 py-2 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 cursor-pointer">
                        All 27
                      </button>
                    </div>

                    <div className="w-full sm:w-72">
                      <input
                        type="text"
                        placeholder="Search client or service..."
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Deliveries Cards List */}
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Marketing',
                        tag: 'Monthly',
                        client: 'Apolo Hospital · Oct 7 – Nov 7, 2026',
                        status: 'In progress',
                      },
                      {
                        title: 'Digital Marketing Service',
                        tag: 'Monthly',
                        client: 'Heaven Backers · Sep 24 – Oct 24, 2026',
                        status: 'In progress',
                      },
                      {
                        title: 'Voce Over',
                        tag: 'Project',
                        client: 'MM Motors',
                        status: 'In progress',
                      },
                      {
                        title: 'Website Development and Domain Hosting',
                        tag: 'Extra service',
                        client: 'Apolo Hospital',
                        status: 'In progress',
                      },
                      {
                        title: 'Ecommerce Website Development',
                        tag: 'Project',
                        client: 'Akram Food',
                        status: 'In progress',
                      },
                      {
                        title: 'Red Cherry website and Web Application',
                        tag: 'Project',
                        client: 'Red Cherry Sweet',
                        status: 'In progress',
                      },
                      {
                        title: 'Website Development',
                        tag: 'Extra service',
                        client: 'Heaven Backers',
                        status: 'In progress',
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-xs hover:border-emerald-500/50 transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.client}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
                            {item.status}
                          </span>
                          <button
                            onClick={() => showToast(`Deliver modal opened for ${item.title}`)}
                            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                            <span>Deliver</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CONTENT MANAGEMENT TAB */}
              {currentTab === 'content' && (
                <div>
                  {editingSection ? (
                    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <button
                          onClick={() => setEditingSection(null)}
                          className="hover:text-emerald-500 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <span>← Back to {editingPageName || 'Home'} sections</span>
                        </button>
                      </div>

                      {/* HERO SECTION EDITOR */}
                      {editingSection === 'Hero' && (
                        <div className="space-y-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                Section 01
                              </span>
                              <h1 className="text-2xl font-black text-slate-900 dark:text-white">Editing "Hero"</h1>
                            </div>
                            <p className="text-xs text-slate-500">
                              Slider at the top: slides with their own title, text, image, and CTA buttons.
                            </p>
                          </div>

                          {/* Slides Section */}
                          <div className="space-y-3 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Slides</h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  Each slide has its own title, description, badge, and 3D visual image. Use arrows to reorder.
                                </p>
                              </div>
                              <button
                                onClick={handleOpenAddSlide}
                                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-1.5"
                              >
                                <span>+ Add Slide</span>
                              </button>
                            </div>

                            <div className="space-y-3 pt-2">
                              {heroSlides.map((slide, idx) => (
                                <div
                                  key={slide.id || idx}
                                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                                >
                                  <div className="flex items-center gap-4">
                                    <span className="text-xs font-mono font-bold text-slate-400">
                                      {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0">
                                      <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          (e.currentTarget as HTMLImageElement).src =
                                            'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80';
                                        }}
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                          {slide.title}
                                        </h4>
                                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 shrink-0">
                                          {slide.tabName}
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-md mt-0.5">
                                        {slide.description}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                                    <button
                                      onClick={() => handleMoveSlideUp(idx)}
                                      disabled={idx === 0}
                                      className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-500 disabled:opacity-30 cursor-pointer text-xs"
                                      title="Move up"
                                    >
                                      ↑
                                    </button>
                                    <button
                                      onClick={() => handleMoveSlideDown(idx)}
                                      disabled={idx === heroSlides.length - 1}
                                      className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-500 disabled:opacity-30 cursor-pointer text-xs"
                                      title="Move down"
                                    >
                                      ↓
                                    </button>
                                    <button
                                      onClick={() => handleOpenEditSlide(slide)}
                                      className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 text-xs font-bold transition-colors cursor-pointer"
                                      title="Edit slide"
                                    >
                                      ✏️ Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteSlide(slide.id)}
                                      className="px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-bold transition-colors cursor-pointer"
                                      title="Delete slide"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Hero Global Settings Section */}
                          <div className="space-y-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hero Buttons & Badges</h3>
                            <p className="text-xs text-slate-500">
                              Settings, call-to-actions, and button links shared by all hero slides.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">
                                  Small Label Above Headline
                                </label>
                                <input
                                  type="text"
                                  value={heroSettingsForm.heroSmallLabel}
                                  onChange={(e) =>
                                    setHeroSettingsForm((prev) => ({ ...prev, heroSmallLabel: e.target.value }))
                                  }
                                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">
                                  Main CTA Button Text
                                </label>
                                <input
                                  type="text"
                                  value={heroSettingsForm.heroButtonText}
                                  onChange={(e) =>
                                    setHeroSettingsForm((prev) => ({ ...prev, heroButtonText: e.target.value }))
                                  }
                                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">
                                  Main CTA Button Link (e.g. #contact)
                                </label>
                                <input
                                  type="text"
                                  value={heroSettingsForm.heroButtonLink}
                                  onChange={(e) =>
                                    setHeroSettingsForm((prev) => ({ ...prev, heroButtonLink: e.target.value }))
                                  }
                                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">
                                  Secondary Button Text
                                </label>
                                <input
                                  type="text"
                                  value={heroSettingsForm.heroSecondaryButtonText}
                                  onChange={(e) =>
                                    setHeroSettingsForm((prev) => ({
                                      ...prev,
                                      heroSecondaryButtonText: e.target.value,
                                    }))
                                  }
                                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                                />
                              </div>

                              <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">
                                  Secondary Button Link (e.g. #services)
                                </label>
                                <input
                                  type="text"
                                  value={heroSettingsForm.heroSecondaryButtonLink}
                                  onChange={(e) =>
                                    setHeroSettingsForm((prev) => ({
                                      ...prev,
                                      heroSecondaryButtonLink: e.target.value,
                                    }))
                                  }
                                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                              <button
                                onClick={handleResetHeroToDefault}
                                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                              >
                                ↺ Reset to Default
                              </button>
                              <button
                                onClick={handleSaveHeroSettings}
                                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                              >
                                Save Settings
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CLIENT LOGOS SECTION EDITOR */}
                      {editingSection === 'Client Logos' && (
                        <div className="space-y-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                Section 02
                              </span>
                              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                                Editing "Client Logos"
                              </h1>
                            </div>
                            <p className="text-xs text-slate-500">
                              Logos and brand partners that slide into the "Our clients" marquee on the homepage.
                            </p>
                          </div>

                          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                Active Partner Brands ({clients.length})
                              </h3>
                              <button
                                onClick={() => setIsNewClientOpen(true)}
                                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                              >
                                + Add Brand
                              </button>
                            </div>

                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                              {clients.map((brand) => (
                                <div
                                  key={brand.id}
                                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs"
                                >
                                  <div>
                                    <span className="font-bold text-xs text-slate-900 dark:text-white block">
                                      {brand.name}
                                    </span>
                                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                                      {brand.sub}
                                    </span>
                                  </div>
                                  <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400">ID: {brand.id}</span>
                                    <button
                                      onClick={() => {
                                        setClients((prev) => prev.filter((c) => c.id !== brand.id));
                                        showToast(`Removed ${brand.name}`);
                                      }}
                                      className="text-xs text-rose-500 hover:text-rose-700 cursor-pointer font-bold"
                                      title="Delete brand"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="pt-4 flex justify-end">
                              <button
                                onClick={() => setCurrentTab('clients')}
                                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                              >
                                Go to Full Clients Tab ↗
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SERVICES SECTION EDITOR */}
                      {editingSection === 'Services' && (
                        <div className="space-y-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                Section 03
                              </span>
                              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                                Editing "Services"
                              </h1>
                            </div>
                            <p className="text-xs text-slate-500">
                              Service cards (title, description, cover photo, badges, and tags) showcased on the homepage.
                            </p>
                          </div>

                          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                All Services ({services.length})
                              </h3>
                              <button
                                onClick={() => {
                                  setEditingService(null);
                                  setServiceFormData({
                                    title: '',
                                    description: '',
                                    badge: 'Modern · Scalable',
                                    category: 'Engineering',
                                    tags: ['Custom UI'],
                                    active: true,
                                  });
                                  setIsNewServiceOpen(true);
                                }}
                                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                              >
                                + Add Service
                              </button>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                              {services.map((srv) => (
                                <div
                                  key={srv.id}
                                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs space-y-3"
                                >
                                  <div>
                                    {/* Cover Image with Quick Upload */}
                                    <div className="h-28 w-full rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 relative mb-3 group">
                                      {srv.imageUrl ? (
                                        <img
                                          src={srv.imageUrl}
                                          alt={srv.title}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                                          No Image
                                        </div>
                                      )}
                                      <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold cursor-pointer transition-opacity backdrop-blur-xs">
                                        <span>📷 Change Photo</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                              const reader = new FileReader();
                                              reader.onloadend = () => {
                                                const newImg = reader.result as string;
                                                setServices((prev) =>
                                                  prev.map((s) => (s.id === srv.id ? { ...s, imageUrl: newImg } : s))
                                                );
                                                showToast(`Photo updated for ${srv.title}`);
                                              };
                                              reader.readAsDataURL(file);
                                            }
                                          }}
                                        />
                                      </label>
                                    </div>

                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                                        {srv.category}
                                      </span>
                                      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 cursor-pointer">
                                        <span>{srv.active ? 'Active' : 'Hidden'}</span>
                                        <input
                                          type="checkbox"
                                          checked={srv.active}
                                          onChange={() => {
                                            setServices((prev) =>
                                              prev.map((s) => (s.id === srv.id ? { ...s, active: !s.active } : s))
                                            );
                                          }}
                                          className="w-3.5 h-3.5 rounded text-emerald-600"
                                        />
                                      </label>
                                    </div>

                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                                      {srv.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                      {srv.description}
                                    </p>
                                  </div>

                                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <button
                                      onClick={() => {
                                        setEditingService(srv);
                                        setServiceFormData({ ...srv });
                                        setIsNewServiceOpen(true);
                                      }}
                                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                                    >
                                      ✏️ Edit Details
                                    </button>
                                    <button
                                      onClick={() => {
                                        setServices((prev) => prev.filter((s) => s.id !== srv.id));
                                        showToast(`Deleted ${srv.title}`);
                                      }}
                                      className="text-xs font-semibold text-rose-500 hover:text-rose-700 cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="pt-4 flex justify-end">
                              <button
                                onClick={() => setCurrentTab('services')}
                                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                              >
                                Go to Full Services Tab ↗
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PORTFOLIO SECTION EDITOR */}
                      {editingSection === 'Portfolio' && (
                        <div className="space-y-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                Section 04
                              </span>
                              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                                Editing "Portfolio"
                              </h1>
                            </div>
                            <p className="text-xs text-slate-500">
                              Configure category titles, project counts, demo photos, and tags for "Our work, by category".
                            </p>
                          </div>

                          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                              Portfolio Showcase Cards ({portfolio.length})
                            </h3>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                              {portfolio.map((cat) => (
                                <div
                                  key={cat.id}
                                  className={`rounded-2xl p-4 bg-gradient-to-b ${cat.gradientClass} text-white border ${cat.borderClass} shadow-md flex flex-col justify-between space-y-3`}
                                >
                                  <div>
                                    {/* Demo Showcase Image preview */}
                                    <div className="h-32 w-full rounded-xl overflow-hidden bg-black/40 relative mb-3 group border border-white/10">
                                      {cat.imageUrl ? (
                                        <img
                                          src={cat.imageUrl}
                                          alt={cat.title}
                                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-300">
                                          No Demo Photo
                                        </div>
                                      )}
                                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold bg-black/60 backdrop-blur-xs text-white">
                                        📷 Demo Photo
                                      </span>
                                    </div>

                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-bold uppercase text-slate-300">Title</label>
                                      <input
                                        type="text"
                                        value={cat.title}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          setPortfolio((prev) =>
                                            prev.map((p) => (p.id === cat.id ? { ...p, title: val } : p))
                                          );
                                        }}
                                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/20 text-xs text-white font-bold focus:outline-none focus:border-white"
                                      />
                                    </div>

                                    <div className="space-y-1.5 mt-2">
                                      <label className="text-[10px] font-bold uppercase text-slate-300">
                                        Project Count
                                      </label>
                                      <input
                                        type="text"
                                        value={cat.projectCount}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          setPortfolio((prev) =>
                                            prev.map((p) => (p.id === cat.id ? { ...p, projectCount: val } : p))
                                          );
                                        }}
                                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/20 text-xs text-white focus:outline-none focus:border-white"
                                      />
                                    </div>

                                    <div className="space-y-1.5 mt-2">
                                      <label className="text-[10px] font-bold uppercase text-slate-300">
                                        Image URL or Upload
                                      </label>
                                      <input
                                        type="text"
                                        value={cat.imageUrl || ''}
                                        placeholder="Paste image URL..."
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          setPortfolio((prev) =>
                                            prev.map((p) => (p.id === cat.id ? { ...p, imageUrl: val } : p))
                                          );
                                        }}
                                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/20 text-[11px] text-white focus:outline-none focus:border-white"
                                      />
                                    </div>
                                  </div>

                                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                                    <label className="text-[11px] font-semibold text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors">
                                      <span>📷 Upload Photo</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                              const newImg = reader.result as string;
                                              setPortfolio((prev) =>
                                                prev.map((p) => (p.id === cat.id ? { ...p, imageUrl: newImg } : p))
                                              );
                                              showToast(`Photo updated for ${cat.title}`);
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                      />
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="pt-4 flex items-center justify-between">
                              <button
                                onClick={() => setCurrentTab('portfolio')}
                                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                              >
                                Go to Full Portfolio Tab ↗
                              </button>
                              <button
                                onClick={() => showToast('Portfolio changes saved')}
                                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* VIDEOS SECTION EDITOR */}
                      {editingSection === 'Videos' && (
                        <div className="space-y-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                Section 05
                              </span>
                              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                                Editing "Videos"
                              </h1>
                            </div>
                            <p className="text-xs text-slate-500">
                              Crafvanta YouTube videos and commercial showcases displayed at the end of the homepage.
                            </p>
                          </div>

                          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                Video Showcases ({videos.length})
                              </h3>
                              <button
                                onClick={() => setIsNewVideoOpen(true)}
                                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                              >
                                + Add Video
                              </button>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 pt-2">
                              {videos.map((vid) => (
                                <div
                                  key={vid.id}
                                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs space-y-3"
                                >
                                  <div>
                                    <div className="h-32 w-full rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 relative mb-3 group">
                                      <img
                                        src={vid.thumbnail}
                                        alt={vid.title}
                                        className="w-full h-full object-cover"
                                      />
                                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
                                          ▶
                                        </div>
                                      </div>
                                    </div>

                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                                      {vid.category}
                                    </span>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                                      {vid.title}
                                    </h4>
                                    <a
                                      href={vid.videoUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs text-slate-400 hover:text-emerald-500 truncate block mt-1"
                                    >
                                      {vid.videoUrl}
                                    </a>
                                  </div>

                                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <label className="text-[11px] font-semibold text-emerald-500 hover:text-emerald-700 cursor-pointer">
                                      <span>📷 Change Thumbnail</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                              const newImg = reader.result as string;
                                              setVideos((prev) =>
                                                prev.map((v) => (v.id === vid.id ? { ...v, thumbnail: newImg } : v))
                                              );
                                              showToast('Thumbnail updated');
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                      />
                                    </label>
                                    <button
                                      onClick={() => {
                                        setVideos((prev) => prev.filter((v) => v.id !== vid.id));
                                        showToast('Video removed');
                                      }}
                                      className="text-xs font-semibold text-rose-500 hover:text-rose-700 cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : editingPageName ? (
                    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <button
                          onClick={() => setEditingPageName(null)}
                          className="hover:text-emerald-500 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <span>← Back to Content Management</span>
                        </button>
                      </div>

                      {/* Customize Card */}
                      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-lg">
                          ⚙️
                        </div>
                        <div>
                          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                            Customize "{editingPageName}"
                          </h1>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            Pick a section below to edit its content.
                          </p>
                        </div>
                      </div>

                      {/* Sections List */}
                      <div className="space-y-3">
                        {[
                          {
                            num: '01',
                            title: 'Hero',
                            desc: 'Slider at the top: slides with their own title, text and image, plus the buttons',
                          },
                          {
                            num: '02',
                            title: 'Client Logos',
                            desc: 'Logos that slide into the "Our clients" box',
                          },
                          {
                            num: '03',
                            title: 'Services',
                            desc: 'Service cards (title, description, image, icon)',
                          },
                          {
                            num: '04',
                            title: 'Portfolio',
                            desc: 'Project grid, the same one shown on the Portfolio page',
                          },
                          {
                            num: '05',
                            title: 'Videos',
                            desc: 'Crafvanta YouTube videos shown at the end of the homepage',
                          },
                        ].map((sec, idx) => (
                          <div
                            key={idx}
                            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-xs hover:border-emerald-500/50 transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-xs font-mono text-slate-400">{sec.num}</span>
                              <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{sec.title}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sec.desc}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setEditingSection(sec.title)}
                              aria-label={`Edit ${sec.title} section`}
                              data-testid={`edit-section-${sec.title.toLowerCase().replace(/\s+/g, '-')}`}
                              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-900 dark:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                            >
                              <span>Edit</span>
                              <span>↗</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">


                      {/* 3 Metric Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">TOTAL PAGES</span>
                            <div className="text-3xl font-black text-slate-900 dark:text-white">5</div>
                          </div>
                          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                            📄
                          </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">PUBLISHED PAGES</span>
                            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">5</div>
                          </div>
                          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                            🌐
                          </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">AVG. SEO SCORE</span>
                            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">91%</div>
                          </div>
                          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                            ✨
                          </div>
                        </div>
                      </div>

                      {/* Site Settings Card */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Site Settings</h3>
                        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-xs">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                              ⚙️
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Site Settings</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Logo, favicon, site title, description and SEO metadata.</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setCurrentTab('settings')}
                            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Edit</span>
                            <span>↗</span>
                          </button>
                        </div>
                      </div>

                      {/* Pages List Section */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pages</h3>
                          
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="w-full sm:w-64">
                              <input
                                type="text"
                                placeholder="Search pages or paths..."
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                              />
                            </div>

                            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full p-1">
                              <button className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs cursor-pointer">All</button>
                              <button className="px-3.5 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer">Published</button>
                              <button className="px-3.5 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer">Draft</button>
                            </div>
                          </div>
                        </div>

                        {/* Pages Rows */}
                        <div className="space-y-3">
                          {[
                            { num: '01', name: 'Home', status: 'PUBLISHED', edited: 'Edited 2 hours ago', views: '12.4k', seo: '98%' },
                            { num: '02', name: 'Services', status: 'PUBLISHED', edited: 'Edited 1 week ago', views: '5.8k', seo: '89%' },
                            { num: '03', name: 'Portfolio', status: 'PUBLISHED', edited: 'Edited Yesterday', views: '8.2k', seo: '95%' },
                            { num: '04', name: 'Pricing', status: 'PUBLISHED', edited: 'Edited 5 hours ago', views: '450', seo: '78%' },
                            { num: '05', name: 'Contact', status: 'PUBLISHED', edited: 'Edited 4 days ago', views: '2.4k', seo: '94%' },
                          ].map((page, idx) => (
                            <div
                              key={idx}
                              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-xs hover:border-emerald-500/50 transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <span className="text-xs font-mono text-slate-400">{page.num}</span>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                <div>
                                  <div className="flex items-center gap-2.5">
                                    <h4 
                                      onClick={() => setEditingPageName(page.name)}
                                      className="text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-500 cursor-pointer"
                                    >
                                      {page.name}
                                    </h4>
                                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                      {page.status}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-400 mt-0.5">{page.edited}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 sm:gap-6">
                                <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                  <span>👁️ {page.views}</span>
                                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">SEO: {page.seo}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => showToast(`Copied path for ${page.name}`)}
                                    className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 flex items-center justify-center text-xs transition-colors cursor-pointer"
                                    title="Copy link"
                                  >
                                    📋
                                  </button>
                                  <button
                                    onClick={() => setEditingPageName(page.name)}
                                    className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 flex items-center justify-center text-xs transition-colors cursor-pointer"
                                    title="Edit page"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (page.name.toLowerCase() === 'home') onClose();
                                      else showToast(`Visiting ${page.name} page`);
                                    }}
                                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-600 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <span>Visit</span>
                                    <span>↗</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: PAYROLL MANAGEMENT */}
              {currentTab === 'payroll' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                  {/* Top Header & Actions Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Enterprise Compensation
                        </span>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                          Payroll Management
                        </h1>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Manage all agency employee payroll records, track monthly disbursements, issue pay slips, and log bonuses securely.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={exportPayrollCSV}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>📥 Export CSV</span>
                      </button>

                      <button
                        onClick={() => {
                          setPayrollRecords((prev) =>
                            prev.map((r) => (r.status === 'Pending' ? { ...r, status: 'Paid' } : r))
                          );
                          showToast('Disbursed all pending employee salaries!');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>⚡ Disburse Pending Payroll</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditingPayroll(null);
                          setPayrollFormData({
                            employeeName: '',
                            role: '',
                            department: 'Engineering',
                            baseSalary: 3200,
                            bonus: 250,
                            deductions: 0,
                            status: 'Pending',
                            paymentMethod: 'Bank Wire',
                            paymentDate: new Date().toISOString().split('T')[0],
                          });
                          setIsNewPayrollOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>+ Add Salary Record</span>
                      </button>
                    </div>
                  </div>

                  {/* 4 KPI Summary Metric Cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        TOTAL MONTHLY PAYROLL
                      </span>
                      <div className="text-3xl font-black text-slate-900 dark:text-white">
                        ৳{payrollRecords.reduce((acc, r) => acc + r.netSalary, 0).toLocaleString()}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                        {payrollMonth} Total Allocation
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        DISBURSED (PAID)
                      </span>
                      <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        ৳{payrollRecords.filter((r) => r.status === 'Paid').reduce((acc, r) => acc + r.netSalary, 0).toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                        {payrollRecords.filter((r) => r.status === 'Paid').length} staff members completed
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        PENDING / PROCESSING
                      </span>
                      <div className="text-3xl font-black text-amber-500 dark:text-amber-400">
                        ৳{payrollRecords.filter((r) => r.status !== 'Paid').reduce((acc, r) => acc + r.netSalary, 0).toLocaleString()}
                      </div>
                      <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-2 font-medium">
                        {payrollRecords.filter((r) => r.status !== 'Paid').length} payouts remaining
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        NEXT SCHEDULED PAYDAY
                      </span>
                      <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        Nov 01
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                        Direct Bank & bKash Wire
                      </div>
                    </div>
                  </div>

                  {/* Search & Filters */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400 mr-2 uppercase">Status:</span>
                      {['All', 'Paid', 'Pending', 'Processing'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setPayrollStatusFilter(st)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            payrollStatusFilter === st
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={payrollMonth}
                        onChange={(e) => setPayrollMonth(e.target.value)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-900 dark:text-white cursor-pointer"
                      >
                        <option value="October 2026">October 2026</option>
                        <option value="September 2026">September 2026</option>
                        <option value="August 2026">August 2026</option>
                      </select>

                      <div className="w-full sm:w-64 relative">
                        <input
                          type="text"
                          value={payrollSearch}
                          onChange={(e) => setPayrollSearch(e.target.value)}
                          placeholder="Search employee, role, or bank..."
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                        />
                        <span className="absolute left-2.5 top-2 text-xs text-slate-400">🔍</span>
                      </div>
                    </div>
                  </div>

                  {/* Payroll Table */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="pb-3 px-3">Employee</th>
                          <th className="pb-3 px-3">Department</th>
                          <th className="pb-3 px-3">Base Salary</th>
                          <th className="pb-3 px-3">Bonus</th>
                          <th className="pb-3 px-3">Deductions</th>
                          <th className="pb-3 px-3">Net Pay</th>
                          <th className="pb-3 px-3">Method</th>
                          <th className="pb-3 px-3">Status</th>
                          <th className="pb-3 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
                        {filteredPayrollRecords.length === 0 ? (
                          <tr>
                            <td colSpan={9} className="py-8 text-center text-slate-400">
                              No payroll records match your search or status filter.
                            </td>
                          </tr>
                        ) : (
                          filteredPayrollRecords.map((rec) => (
                            <tr key={rec.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/40 transition-colors">
                              <td className="py-4 px-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 border border-emerald-500/20">
                                    {rec.employeeName.substring(0, 2).toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="font-bold text-slate-900 dark:text-white">{rec.employeeName}</div>
                                    <div className="text-[11px] text-slate-400">{rec.role}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-3">
                                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                  {rec.department}
                                </span>
                              </td>
                              <td className="py-4 px-3 text-slate-700 dark:text-slate-300 font-semibold">
                                ৳{rec.baseSalary.toLocaleString()}
                              </td>
                              <td className="py-4 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                                +৳{rec.bonus.toLocaleString()}
                              </td>
                              <td className="py-4 px-3 text-rose-500 font-semibold">
                                -৳{rec.deductions.toLocaleString()}
                              </td>
                              <td className="py-4 px-3 font-extrabold text-slate-950 dark:text-white">
                                ৳{rec.netSalary.toLocaleString()}
                              </td>
                              <td className="py-4 px-3 text-slate-500 dark:text-slate-400 text-[11px]">
                                {rec.paymentMethod}
                              </td>
                              <td className="py-4 px-3">
                                <select
                                  value={rec.status}
                                  onChange={(e) => {
                                    const newStatus = e.target.value as 'Paid' | 'Pending' | 'Processing';
                                    setPayrollRecords((prev) =>
                                      prev.map((r) => (r.id === rec.id ? { ...r, status: newStatus } : r))
                                    );
                                    showToast(`Status for ${rec.employeeName} updated to ${newStatus}`);
                                  }}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer ${
                                    rec.status === 'Paid'
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800'
                                      : rec.status === 'Pending'
                                      ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800'
                                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800'
                                  }`}
                                >
                                  <option value="Paid">Paid</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Processing">Processing</option>
                                </select>
                              </td>
                              <td className="py-4 px-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => setSelectedPaySlip(rec)}
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-300 hover:text-emerald-600 text-xs font-semibold transition-colors cursor-pointer"
                                    title="View & Issue Pay Slip"
                                  >
                                    📄 Pay Slip
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingPayroll(rec);
                                      setPayrollFormData({
                                        employeeName: rec.employeeName,
                                        role: rec.role,
                                        department: rec.department,
                                        baseSalary: rec.baseSalary,
                                        bonus: rec.bonus,
                                        deductions: rec.deductions,
                                        status: rec.status,
                                        paymentMethod: rec.paymentMethod,
                                        paymentDate: rec.paymentDate,
                                      });
                                      setIsNewPayrollOpen(true);
                                    }}
                                    className="p-1 rounded text-slate-400 hover:text-emerald-600 cursor-pointer"
                                    title="Edit Record"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => {
                                      setPayrollRecords((prev) => prev.filter((r) => r.id !== rec.id));
                                      showToast(`Removed payroll record for ${rec.employeeName}`);
                                    }}
                                    className="p-1 rounded text-slate-400 hover:text-rose-600 cursor-pointer"
                                    title="Delete Record"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: DELIVERIES */}
              {currentTab === 'deliveries' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-black text-slate-900 dark:text-white">Project Deliveries & Assets</h1>
                      <p className="text-xs text-slate-500">Track client deliverables, QA sign-offs, and file packages.</p>
                    </div>
                    <button
                      onClick={() => {
                        const title = prompt('Enter delivery package title:');
                        if (title) {
                          setDeliveries((prev) => [...prev, { id: `del-${Date.now()}`, title, client: 'Crafvanta Client', deadline: '2026-11-10', status: 'In Progress', filesCount: 12 }]);
                          showToast('Delivery package added');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md cursor-pointer"
                    >
                      + Create Delivery Package
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    {deliveries.map((del) => (
                      <div key={del.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                              {del.client}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              del.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : del.status === 'In QA' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {del.status}
                            </span>
                          </div>
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">{del.title}</h3>
                          <p className="text-xs text-slate-400">📁 {del.filesCount} design & code files attached</p>
                          <p className="text-xs text-slate-400 mt-1">📅 Target Deadline: {del.deadline}</p>
                        </div>
                        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                          <button
                            onClick={() => {
                              setDeliveries((prev) => prev.map((d) => d.id === del.id ? { ...d, status: 'Delivered' } : d));
                              showToast(`Marked ${del.title} as Delivered`);
                            }}
                            className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                          >
                            Mark Delivered ✓
                          </button>
                          <button
                            onClick={() => showToast(`Downloaded delivery package for ${del.client}`)}
                            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                          >
                            Download Zip
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: TASKS */}
              {currentTab === 'tasks' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                  {/* Top Header & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Workflow Hub
                        </span>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Agency Task Board</h1>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Task assignments, team priorities, search & filter, and real-time project progress.
                      </p>
                    </div>

                    <button
                      onClick={handleOpenNewTaskModal}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <span>+ Create Task</span>
                    </button>
                  </div>

                  {/* Task Metrics Summary Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        TOTAL TASKS
                      </span>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">
                        {tasks.length}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 font-medium">
                        Across all departments
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        TO DO
                      </span>
                      <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                        {tasks.filter((t) => t.status === 'To Do').length}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 font-medium">
                        Pending assignment start
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        IN PROGRESS
                      </span>
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {tasks.filter((t) => t.status === 'In Progress').length}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                        Active engineering & design
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        COMPLETED
                      </span>
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {tasks.filter((t) => t.status === 'Completed').length}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                        Delivered successfully
                      </div>
                    </div>
                  </div>

                  {/* Search and Filters Bar */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="w-full sm:w-80">
                        <input
                          type="text"
                          value={taskSearch}
                          onChange={(e) => setTaskSearch(e.target.value)}
                          placeholder="Search tasks, assignees, or details..."
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                        <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">Status:</span>
                        {['All', 'To Do', 'In Progress', 'Completed'].map((st) => (
                          <button
                            key={st}
                            onClick={() => setTaskStatusFilter(st)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                              taskStatusFilter === st
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">Tag:</span>
                      {['All', 'Engineering', 'Design', 'Video', 'Marketing', 'Enterprise', 'Operations'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setTaskTagFilter(tag)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                            taskTagFilter === tag
                              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tasks List / Grid */}
                  {filteredTasks.length === 0 ? (
                    <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-3xl mb-2">📋</div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">No tasks match your criteria</h3>
                      <p className="text-xs text-slate-400 mt-1 mb-4">Try clearing your filters or create a new task.</p>
                      <button
                        onClick={handleOpenNewTaskModal}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md cursor-pointer"
                      >
                        + Create Task
                      </button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredTasks.map((t) => (
                        <div
                          key={t.id}
                          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                {t.tag}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  t.priority === 'High'
                                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                    : t.priority === 'Medium'
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                }`}
                              >
                                {t.priority}
                              </span>
                            </div>

                            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1.5 line-clamp-2" title={t.title}>
                              {t.title}
                            </h4>

                            {t.description && (
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                                {t.description}
                              </p>
                            )}

                            <div className="space-y-1 mt-2 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2">
                              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                                  {t.assignee.charAt(0).toUpperCase()}
                                </span>
                                <span className="truncate">{t.assignee}</span>
                              </div>

                              {t.dueDate && (
                                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                  <span>📅 Due: {t.dueDate}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <select
                              value={t.status}
                              onChange={(e) => {
                                const ns = e.target.value;
                                setTasks((prev) =>
                                  prev.map((x) => (x.id === t.id ? { ...x, status: ns } : x))
                                );
                                showToast(`Task updated to ${ns}`);
                              }}
                              className={`text-[10px] font-extrabold px-2 py-1 rounded border border-slate-200 dark:border-slate-800 cursor-pointer ${
                                t.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                  : t.status === 'In Progress'
                                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300'
                              }`}
                            >
                              <option value="To Do">To Do</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditTaskModal(t)}
                                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white text-xs cursor-pointer transition-colors"
                                title="Edit Task"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDeleteTask(t.id, t.title)}
                                className="p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/50 text-slate-400 hover:text-rose-600 text-xs cursor-pointer transition-colors"
                                title="Delete Task"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: ATTENDANCE */}
              {currentTab === 'attendance' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Daily Attendance & Check-ins</h1>
                    <p className="text-xs text-slate-500">Live clock-in times, remote status, and leave logs.</p>
                  </div>

                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase text-slate-400">
                          <th className="pb-3">Staff Member</th>
                          <th className="pb-3">Check-in Time</th>
                          <th className="pb-3">Work Mode</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                        {attendanceLogs.map((a) => (
                          <tr key={a.id}>
                            <td className="py-3 font-bold text-slate-900 dark:text-white">{a.name} <span className="text-[10px] font-normal text-slate-400">({a.role})</span></td>
                            <td className="py-3 text-slate-600 dark:text-slate-300">{a.checkIn}</td>
                            <td className="py-3"><span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold">{a.mode}</span></td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${a.status === 'Present' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                {a.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: EMPLOYEES */}
              {currentTab === 'employees' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                  {/* Top Header & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Personnel Directory
                        </span>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Employee Roster</h1>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Agency personnel directory, roles, departments, and contact details.
                      </p>
                    </div>

                    <button
                      onClick={handleOpenNewEmployeeModal}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <span>+ Add Team Member</span>
                    </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        TOTAL TEAM
                      </span>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">
                        {employeeList.length}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                        Active staff members
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        ENGINEERING
                      </span>
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {employeeList.filter((e) => e.department === 'Engineering').length}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 font-medium">
                        Architects & Developers
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        CREATIVE & DESIGN
                      </span>
                      <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                        {employeeList.filter((e) => e.department === 'Creative' || e.department === 'Design').length}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 font-medium">
                        UI/UX & Motion
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        MARKETING & OPS
                      </span>
                      <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                        {employeeList.filter((e) => e.department === 'Marketing' || e.department === 'Operations').length}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 font-medium">
                        Growth & Success
                      </div>
                    </div>
                  </div>

                  {/* Search and Filters Bar */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="w-full sm:w-80">
                      <input
                        type="text"
                        value={employeeSearch}
                        onChange={(e) => setEmployeeSearch(e.target.value)}
                        placeholder="Search team by name, role, or email..."
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                      <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">Dept:</span>
                      {['All', 'Engineering', 'Creative', 'Marketing', 'Operations', 'Management'].map((dept) => (
                        <button
                          key={dept}
                          onClick={() => setEmployeeDepartmentFilter(dept)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            employeeDepartmentFilter === dept
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Employee Cards Grid */}
                  {filteredEmployees.length === 0 ? (
                    <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-3xl mb-2">👤</div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">No team members match your filter</h3>
                      <p className="text-xs text-slate-400 mt-1 mb-4">Try clearing search or add a new team member.</p>
                      <button
                        onClick={handleOpenNewEmployeeModal}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md cursor-pointer"
                      >
                        + Add Team Member
                      </button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {filteredEmployees.map((emp) => (
                        <div key={emp.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between text-center relative group hover:border-emerald-500/40 transition-all">
                          <div>
                            {/* Avatar */}
                            {emp.avatarUrl ? (
                              <img
                                src={emp.avatarUrl}
                                alt={emp.name}
                                className="w-14 h-14 rounded-full mx-auto object-cover border-2 border-emerald-500/30 mb-3 shadow-sm"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold mx-auto flex items-center justify-center text-base mb-3 border border-emerald-500/20">
                                {emp.name.substring(0, 2).toUpperCase()}
                              </div>
                            )}

                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{emp.name}</h3>
                            <div className="text-xs text-slate-400 font-medium mt-0.5">{emp.role}</div>
                            
                            <div className="mt-2.5 flex items-center justify-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                {emp.department}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                emp.status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              }`}>
                                {emp.status}
                              </span>
                            </div>
                          </div>

                          <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 space-y-1">
                            <div className="truncate" title={emp.email}>📧 {emp.email}</div>
                            <div>📞 {emp.phone}</div>

                            <div className="pt-2 flex items-center justify-center gap-3">
                              <button
                                onClick={() => handleOpenEditEmployeeModal(emp)}
                                className="text-xs text-slate-500 hover:text-emerald-600 font-bold cursor-pointer transition-colors"
                              >
                                ✏️ Edit
                              </button>
                              <span className="text-slate-200 dark:text-slate-800">•</span>
                              <button
                                onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                                className="text-xs text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: EXPENSES */}
              {currentTab === 'expenses' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                  {/* Top Header & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Financial Billing
                        </span>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                          Expense Tracking & Billing
                        </h1>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Operational costs, cloud server hosting, ad spend, software licenses, and equipment expenses.
                      </p>
                    </div>

                    <button
                      onClick={handleOpenNewExpenseModal}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <span>+ Log New Expense</span>
                    </button>
                  </div>

                  {/* Expense Stats Bar */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        TOTAL SPEND
                      </span>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">
                        ৳ {expenseLogs.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} BDT
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 font-medium">
                        {expenseLogs.length} logged records
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        PAID EXPENSES
                      </span>
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        ৳ {expenseLogs.filter((e) => e.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} BDT
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                        Disbursed & settled
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        PENDING BILLING
                      </span>
                      <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                        ৳ {expenseLogs.filter((e) => e.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} BDT
                      </div>
                      <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-medium">
                        Awaiting invoice settlement
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        CLOUD & INFRA
                      </span>
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        ৳ {expenseLogs.filter((e) => e.category === 'Infrastructure').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} BDT
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 font-medium">
                        AWS, Vercel & Cloud
                      </div>
                    </div>
                  </div>

                  {/* Filter and Search Controls */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="w-full sm:w-80">
                        <input
                          type="text"
                          value={expenseSearch}
                          onChange={(e) => setExpenseSearch(e.target.value)}
                          placeholder="Search expenses by vendor, item, or payment method..."
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                        <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">Status:</span>
                        {['All', 'Paid', 'Pending'].map((st) => (
                          <button
                            key={st}
                            onClick={() => setExpenseStatusFilter(st)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                              expenseStatusFilter === st
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">Category:</span>
                      {['All', 'Infrastructure', 'Software', 'Marketing', 'Hardware', 'Office', 'Operations'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setExpenseCategoryFilter(cat)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                            expenseCategoryFilter === cat
                              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Expenses Table */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
                    {filteredExpenseLogs.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="text-3xl mb-2">💸</div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">No expenses match your search</h3>
                        <p className="text-xs text-slate-400 mt-1 mb-4">Try adjusting search query or filter options.</p>
                        <button
                          onClick={handleOpenNewExpenseModal}
                          className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md cursor-pointer"
                        >
                          + Log New Expense
                        </button>
                      </div>
                    ) : (
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase text-slate-400">
                            <th className="pb-3">Description & Method</th>
                            <th className="pb-3">Category</th>
                            <th className="pb-3">Vendor</th>
                            <th className="pb-3">Date</th>
                            <th className="pb-3">Amount</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                          {filteredExpenseLogs.map((e) => (
                            <tr key={e.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50 transition-colors">
                              <td className="py-3.5">
                                <div className="font-bold text-slate-900 dark:text-white">{e.desc}</div>
                                {e.paymentMethod && (
                                  <div className="text-[10px] text-slate-400 mt-0.5">💳 {e.paymentMethod}</div>
                                )}
                              </td>
                              <td className="py-3.5">
                                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                                  {e.category}
                                </span>
                              </td>
                              <td className="py-3.5 text-slate-600 dark:text-slate-300 font-medium">{e.vendor}</td>
                              <td className="py-3.5 text-slate-400">{e.date}</td>
                              <td className="py-3.5 font-extrabold text-slate-900 dark:text-white text-sm">
                                ৳ {e.amount.toLocaleString()} BDT
                              </td>
                              <td className="py-3.5">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    e.status === 'Paid'
                                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                  }`}
                                >
                                  {e.status}
                                </span>
                              </td>
                              <td className="py-3.5 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleOpenEditExpenseModal(e)}
                                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-emerald-600 text-xs font-bold cursor-pointer transition-colors"
                                    title="Edit Expense"
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteExpense(e.id, e.desc)}
                                    className="p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/50 text-slate-400 hover:text-rose-600 text-xs cursor-pointer transition-colors"
                                    title="Delete Expense"
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* MEDIA MANAGEMENT PORTAL */}
              {currentTab === 'media' && (
                <div className="space-y-6 max-w-7xl mx-auto">
                  {/* Top Header & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Digital Asset Hub
                        </span>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                          Media Management
                        </h1>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Upload, manage, copy links, and preview agency graphics, hero 3D renders, and campaign media.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsUploadMediaOpen(true)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-1.5"
                      >
                        <span>📷 Upload Asset</span>
                      </button>
                    </div>
                  </div>

                  {/* 4 Storage & Asset Metrics Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        TOTAL MEDIA ASSETS
                      </span>
                      <div className="text-3xl font-black text-slate-900 dark:text-white">
                        {mediaAssets.length}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                        Active in cloud library
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        STORAGE USED
                      </span>
                      <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        28.4 MB
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                        of 5.0 GB free quota
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        HERO & CREATIVES
                      </span>
                      <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                        {mediaAssets.filter((m) => m.category === 'Hero Visual' || m.category === 'Portfolio Photo').length}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                        Showcased on live site
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        BANDWIDTH
                      </span>
                      <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        99.9%
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                        CDN Ultra Fast
                      </div>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {['All', 'Hero Visual', 'Portfolio Photo', 'Service Cover', 'Client Logo', 'Other'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setMediaCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            mediaCategoryFilter === cat
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="w-full sm:w-64">
                      <input
                        type="text"
                        value={mediaSearchQuery}
                        onChange={(e) => setMediaSearchQuery(e.target.value)}
                        placeholder="Search assets..."
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Assets Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredMediaAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          {/* Preview image */}
                          <div className="h-36 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative mb-3 group/img">
                            <img
                              src={asset.url}
                              alt={asset.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80';
                              }}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                onClick={() => setPreviewMediaItem(asset)}
                                className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold shadow-md cursor-pointer hover:bg-slate-100"
                              >
                                👁️ Preview
                              </button>
                            </div>
                            <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs">
                              {asset.dimensions}
                            </span>
                          </div>

                          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                            {asset.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5 truncate" title={asset.name}>
                            {asset.name}
                          </h4>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                            <span>{asset.size}</span>
                            <span>{asset.uploadedAt}</span>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(asset.url);
                              showToast(`Copied asset link: ${asset.name}`);
                            }}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <span>📋 Copy Link</span>
                          </button>

                          <button
                            onClick={() => {
                              setMediaAssets((prev) => prev.filter((m) => m.id !== asset.id));
                              showToast(`Deleted ${asset.name}`);
                            }}
                            className="text-xs text-rose-500 hover:text-rose-700 cursor-pointer font-semibold"
                            title="Delete asset"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 1: DASHBOARD OVERVIEW */}
              {currentTab === 'dashboard' && (
                <div className="space-y-6 max-w-6xl mx-auto">
                  {/* Banner */}
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-indigo-900 to-slate-950 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                        Crafvanta Media Headquarters
                      </span>
                      <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
                        Agency Overview & Lead Funnel
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                        Monitor incoming client inquiries, update active services, and customize your live web experience in real-time.
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                  </div>

                  {/* 4 Metric KPI Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-xs font-semibold">Total Inquiries</span>
                        <span className="text-emerald-500 font-bold">📋</span>
                      </div>
                      <div className="text-3xl font-black text-slate-900 dark:text-white">
                        {stats.total}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                        <span>↑ +18% this week</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-xs font-semibold">Unprocessed (New)</span>
                        <span className="text-amber-500 font-bold">⚡</span>
                      </div>
                      <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
                        {stats.newCount}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                        Requires follow-up action
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-xs font-semibold">Conversion Rate</span>
                        <span className="text-emerald-500 font-bold">🎯</span>
                      </div>
                      <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        {stats.conversionRate}%
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                        {stats.convertedCount} projects contracted
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-xs font-semibold">Active Services</span>
                        <span className="text-indigo-500 font-bold">🚀</span>
                      </div>
                      <div className="text-3xl font-black text-slate-900 dark:text-white">
                        {stats.activeServicesCount} / {services.length}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                        Live on homepage
                      </div>
                    </div>
                  </div>

                  {/* Recent Inquiries Preview */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                          Recent Inquiries
                        </h2>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Latest client submissions from website contact modals
                        </span>
                      </div>
                      <button
                        onClick={() => setCurrentTab('leads')}
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        View all leads →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {leads.slice(0, 4).map((lead) => (
                        <div
                          key={lead.id}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900 dark:text-white">
                                {lead.name}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  lead.status === 'New'
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                                    : lead.status === 'In Progress'
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                                    : lead.status === 'Converted'
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                                    : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                                }`}
                              >
                                {lead.status}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                              <span>Service: <strong className="text-slate-700 dark:text-slate-300">{lead.service}</strong></span>
                              <span>•</span>
                              <span>Contact: {lead.contact}</span>
                              {lead.budget && (
                                <>
                                  <span>•</span>
                                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{lead.budget}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleStatusChange(lead.id, e.target.value as LeadInquiry['status'])
                              }
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Converted">Converted</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LEADS CRM */}
              {currentTab === 'leads' && (
                <div className="space-y-6 max-w-6xl mx-auto">
                  {/* Top Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Lead Management (CRM)
                      </h1>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {leads.length} total client inquiries captured from the website
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={exportLeadsCSV}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>📥 Export CSV</span>
                      </button>
                      <button
                        onClick={() => setIsNewLeadOpen(true)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>+ Add Manual Lead</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
                    {/* Status Tabs */}
                    <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
                      {['All', 'New', 'In Progress', 'Contacted', 'Converted', 'Archived'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setStatusFilter(st)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            statusFilter === st
                              ? 'bg-emerald-600 text-white'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    {/* Search Field */}
                    <div className="w-full md:w-72 relative">
                      <input
                        type="text"
                        value={leadSearch}
                        onChange={(e) => setLeadSearch(e.target.value)}
                        placeholder="Search by client, service, phone..."
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 transition-colors"
                      />
                      <span className="absolute left-2.5 top-2 text-xs text-slate-400">🔍</span>
                    </div>
                  </div>

                  {/* Leads List / Cards */}
                  <div className="space-y-4">
                    {filteredLeads.length === 0 ? (
                      <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
                        No inquiries match your current filter.
                      </div>
                    ) : (
                      filteredLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-500/40 transition-colors"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                            {/* Lead Core Info */}
                            <div className="space-y-2 flex-1">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <span className="text-base font-bold text-slate-950 dark:text-white">
                                  {lead.name}
                                </span>
                                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                  {lead.service}
                                </span>
                                {lead.budget && (
                                  <span className="text-xs px-2 py-0.5 rounded-md font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                                    Budget: {lead.budget}
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1">
                                  <span>📞 Contact:</span>
                                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                                    {lead.contact}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>📅 Received:</span>
                                  <span>{lead.timestamp}</span>
                                </div>
                              </div>

                              {/* Message Body */}
                              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                <span className="font-bold text-slate-400 block mb-0.5 text-[10px] uppercase">
                                  Client Request Overview:
                                </span>
                                {lead.message}
                              </div>

                              {/* Internal Follow-Up Notes */}
                              <div className="pt-2">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                  Internal Admin Notes & Follow-Up Log:
                                </label>
                                <input
                                  type="text"
                                  defaultValue={lead.notes || ''}
                                  onBlur={(e) => handleNoteUpdate(lead.id, e.target.value)}
                                  placeholder="e.g. Called client on Zoom, proposal sent, signed contract..."
                                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-600 transition-colors"
                                />
                              </div>
                            </div>

                            {/* Actions / Status Right Box */}
                            <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase text-slate-400">
                                  Status:
                                </span>
                                <select
                                  value={lead.status}
                                  onChange={(e) =>
                                    handleStatusChange(lead.id, e.target.value as LeadInquiry['status'])
                                  }
                                  className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-xs"
                                >
                                  <option value="New">New</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Converted">Converted</option>
                                  <option value="Archived">Archived</option>
                                </select>
                              </div>

                              {/* Quick Contact Links */}
                              <div className="flex items-center gap-2">
                                {lead.contact.includes('@') ? (
                                  <a
                                    href={`mailto:${lead.contact}`}
                                    className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-semibold transition-colors"
                                  >
                                    ✉️ Email
                                  </a>
                                ) : (
                                  <a
                                    href={`https://wa.me/${lead.contact.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-semibold transition-colors"
                                  >
                                    💬 WhatsApp
                                  </a>
                                )}
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="px-2.5 py-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs transition-colors cursor-pointer"
                                  title="Delete Lead"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: SERVICES MANAGEMENT */}
              {currentTab === 'services' && (
                <div className="space-y-6 max-w-6xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Services Portfolio Editor
                      </h1>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Configure the services showcased on the Crafvanta Media homepage.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingService(null);
                        setServiceFormData({
                          title: '',
                          description: '',
                          badge: 'Modern · Responsive',
                          category: 'Engineering',
                          tags: ['Cloud', 'Next.js'],
                          active: true,
                        });
                        setIsNewServiceOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>+ Create New Service</span>
                    </button>
                  </div>

                  {/* Services Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((item) => (
                      <div
                        key={item.id}
                        className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between ${
                          item.active
                            ? 'border-slate-200 dark:border-slate-800 shadow-xs'
                            : 'border-slate-200/50 dark:border-slate-800/50 opacity-60 bg-slate-100/50'
                        }`}
                      >
                        <div>
                          {item.imageUrl && (
                            <div className="mb-3 h-28 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800 relative group">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs">
                                📷 Cover
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
                              {item.category}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-slate-400 font-semibold">
                                {item.active ? 'Active' : 'Disabled'}
                              </span>
                              <input
                                type="checkbox"
                                checked={item.active}
                                onChange={() => handleToggleService(item.id)}
                                className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                              />
                            </div>
                          </div>

                          <h2 className="text-base font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                            {item.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-1">
                            {item.tags.map((t, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <button
                            onClick={() => {
                              setEditingService(item);
                              setServiceFormData({
                                ...item,
                                tags: item.tags,
                              });
                              setIsNewServiceOpen(true);
                            }}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                          >
                            Edit Details
                          </button>
                          <button
                            onClick={() => handleDeleteService(item.id)}
                            className="text-xs font-semibold text-rose-500 hover:text-rose-700 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PORTFOLIO WORK */}
              {currentTab === 'portfolio' && (
                <div className="space-y-6 max-w-6xl mx-auto">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Portfolio Work Categories
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Manage portfolio categories and project counts displayed in the vertical gradient cards.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {portfolio.map((cat) => (
                      <div
                        key={cat.id}
                        className={`rounded-2xl p-5 bg-gradient-to-b ${cat.gradientClass} text-white border ${cat.borderClass} shadow-md flex flex-col justify-between`}
                      >
                        <div>
                          {cat.imageUrl && (
                            <div className="mb-3 h-28 w-full rounded-xl overflow-hidden bg-black/40 border border-white/10 relative group">
                              <img
                                src={cat.imageUrl}
                                alt={cat.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs">
                                📷 Demo Photo
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-slate-300">
                              {cat.projectCount}
                            </span>
                          </div>
                          <h2 className="text-lg font-bold">{cat.title}</h2>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {cat.tags.map((t, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-200">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Quick Photo update trigger in Admin */}
                        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors">
                            <span>📷 Change Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const newImg = reader.result as string;
                                    setPortfolio((prev) =>
                                      prev.map((p) => (p.id === cat.id ? { ...p, imageUrl: newImg } : p))
                                    );
                                    showToast(`Photo updated for ${cat.title}`);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: CLIENT BRANDS */}
              {currentTab === 'clients' && (
                <div className="space-y-6 max-w-6xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Client Partner Brands
                      </h1>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {clients.length} brand badges shown in the interactive client strip.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsNewClientOpen(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                    >
                      + Add Client Brand
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
                    {clients.map((c) => (
                      <div
                        key={c.id}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center shadow-xs relative group"
                      >
                        <button
                          onClick={() => handleDeleteClient(c.id)}
                          className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs"
                          title="Remove client"
                        >
                          ✕
                        </button>
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-black text-sm flex items-center justify-center mb-2">
                          {c.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {c.name}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">{c.sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SEO METADATA */}
              {currentTab === 'seo' && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">SEO Metadata</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Manage global SEO tags for better search engine indexing and social sharing.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">Page Title</label>
                      <input
                        type="text"
                        value={settings.seoTitle}
                        onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                        className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">Meta Description</label>
                      <textarea
                        value={settings.seoDescription}
                        onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                        className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm text-slate-900 dark:text-white h-32"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">Social Sharing Image URL</label>
                      <input
                        type="text"
                        value={settings.socialImageURL}
                        onChange={(e) => setSettings({ ...settings, socialImageURL: e.target.value })}
                        className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm text-slate-900 dark:text-white"
                      />
                    </div>

                    <button
                      onClick={() => showToast('SEO settings updated')}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer"
                    >
                      Save SEO Settings
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 6: SETTINGS */}
              {currentTab === 'settings' && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Agency Profile & Contact Settings
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Changes here update the live header, footer, and inquiry destinations across the site.
                    </p>
                  </div>

                  {/* Brand Logo Management */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>🖼️ Agency Brand Logo</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Upload your custom company logo image to display in the website navigation bar, footer, and admin portals.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">
                      {/* Current Logo Preview */}
                      <div className="w-32 h-20 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2 flex items-center justify-center relative overflow-hidden group shrink-0">
                        {settings.logoUrl ? (
                          <img
                            src={settings.logoUrl}
                            alt="Agency Logo"
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold flex items-center justify-center text-sm">
                              C
                            </div>
                            <span className="text-xs font-black text-slate-900 dark:text-white uppercase">CRAFVANTA</span>
                          </div>
                        )}
                        <span className="absolute bottom-1 right-1 text-[8px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                          {settings.logoUrl ? 'Custom' : 'Default'}
                        </span>
                      </div>

                      {/* Upload & Link Controls */}
                      <div className="space-y-3 flex-1 w-full">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                            Logo Image URL
                          </label>
                          <input
                            type="text"
                            value={settings.logoUrl || ''}
                            onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                            placeholder="Paste direct image URL or upload from PC below..."
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <label className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all inline-flex items-center gap-1.5">
                            <span>📁 Select Logo from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setSettings((prev) => ({ ...prev, logoUrl: reader.result as string }));
                                    showToast('Custom logo uploaded & applied live!');
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>

                          {settings.logoUrl && (
                            <button
                              type="button"
                              onClick={() => {
                                setSettings((prev) => ({ ...prev, logoUrl: '' }));
                                showToast('Reset logo to default brand badge');
                              }}
                              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 cursor-pointer transition-colors"
                            >
                              Reset to Default
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Logo & Website Primary Theme Color Selector */}
                    <div className="pt-5 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                          🎨 Website Theme Color (Matches Logo Brand Palette)
                        </label>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                          {settings.primaryColor || '#2563eb'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                        Choose a color palette preset to automatically sync the header logo, CTA buttons, active links, glow effects, and accents across your entire website.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          { name: 'Electric Royal Blue', color: '#2563eb', badge: 'blue' },
                          { name: 'Neon Deep Indigo', color: '#4f46e5', badge: 'indigo' },
                          { name: 'Cyber Cyan Teal', color: '#0891b2', badge: 'cyan' },
                          { name: 'Emerald Growth', color: '#059669', badge: 'emerald' },
                          { name: 'Sunset Amber Gold', color: '#d97706', badge: 'amber' },
                          { name: 'Crimson Power Red', color: '#dc2626', badge: 'rose' },
                        ].map((preset) => {
                          const isSelected = (settings.primaryColor || '#2563eb') === preset.color;
                          return (
                            <button
                              key={preset.color}
                              type="button"
                              onClick={() => {
                                setSettings((prev) => ({
                                  ...prev,
                                  primaryColor: preset.color,
                                  logoBadgeColor: preset.badge,
                                }));
                                showToast(`Website theme color changed to ${preset.name}`);
                              }}
                              className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white shadow-md'
                                  : 'bg-slate-50 dark:bg-slate-950/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                              }`}
                            >
                              <span
                                className="w-5 h-5 rounded-full shrink-0 shadow-xs border border-white/20"
                                style={{ backgroundColor: preset.color }}
                              />
                              <div className="truncate">
                                <span className="text-xs font-bold block truncate">{preset.name}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Agency Title
                      </label>
                      <input
                        type="text"
                        value={settings.agencyName}
                        onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Official Email Address
                        </label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          WhatsApp / Call Number
                        </label>
                        <input
                          type="text"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Location / Headquarters
                      </label>
                      <input
                        type="text"
                        value={settings.location}
                        onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Brand Tagline
                      </label>
                      <textarea
                        rows={2}
                        value={settings.tagline}
                        onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    {/* Payment Accounts Configuration (bKash & Bank) */}
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>💳 Payment Accounts (bKash, Nagad & Bank)</span>
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Configure client payment destination numbers and bank details displayed in invoices, checkout, and client footer.
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-pink-600 mb-1">
                            bKash Account Number
                          </label>
                          <input
                            type="text"
                            value={settings.bkashNumber || ''}
                            onChange={(e) => setSettings({ ...settings, bkashNumber: e.target.value })}
                            placeholder="e.g. 01845058879 (Merchant / Personal)"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-orange-600 mb-1">
                            Nagad Account Number
                          </label>
                          <input
                            type="text"
                            value={settings.nagadNumber || ''}
                            onChange={(e) => setSettings({ ...settings, nagadNumber: e.target.value })}
                            placeholder="e.g. 01845058879 (Personal)"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-1">
                          Bank Account Details (Name, Account No, Branch)
                        </label>
                        <textarea
                          rows={3}
                          value={settings.bankDetails || ''}
                          onChange={(e) => setSettings({ ...settings, bankDetails: e.target.value })}
                          placeholder="Bank: City Bank Limited&#10;Account Name: Crafvanta Media&#10;Account No: 1502123456789"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                        />
                      </div>
                    </div>

                    {/* Social Media Links Section */}
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>🌐 Social Media Links & Channels</span>
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Set custom URL destinations for agency social media profile icons across the website footer and contact channels.
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                            Facebook Page URL
                          </label>
                          <input
                            type="text"
                            value={settings.facebookURL || ''}
                            onChange={(e) => setSettings({ ...settings, facebookURL: e.target.value })}
                            placeholder="https://facebook.com/..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                            Instagram Profile URL
                          </label>
                          <input
                            type="text"
                            value={settings.instagramURL || ''}
                            onChange={(e) => setSettings({ ...settings, instagramURL: e.target.value })}
                            placeholder="https://instagram.com/..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                            LinkedIn Company URL
                          </label>
                          <input
                            type="text"
                            value={settings.linkedinURL || ''}
                            onChange={(e) => setSettings({ ...settings, linkedinURL: e.target.value })}
                            placeholder="https://linkedin.com/company/..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                            Twitter / X Handle URL
                          </label>
                          <input
                            type="text"
                            value={settings.twitterURL || ''}
                            onChange={(e) => setSettings({ ...settings, twitterURL: e.target.value })}
                            placeholder="https://twitter.com/..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                            YouTube Channel URL
                          </label>
                          <input
                            type="text"
                            value={settings.youtubeURL || ''}
                            onChange={(e) => setSettings({ ...settings, youtubeURL: e.target.value })}
                            placeholder="https://youtube.com/@..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                            GitHub / Portfolio URL
                          </label>
                          <input
                            type="text"
                            value={settings.githubURL || ''}
                            onChange={(e) => setSettings({ ...settings, githubURL: e.target.value })}
                            placeholder="https://github.com/..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Admin Credentials & Security (arashik3456@gmail.com) */}
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>🔐 Admin Security & Login Credentials</span>
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Configure your master administrator login email and password used to unlock this panel.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                              Master Login Email
                            </label>
                            <input
                              type="email"
                              value={savedCredentials.email}
                              onChange={(e) => {
                                const newCred = { ...savedCredentials, email: e.target.value };
                                setSavedCredentials(newCred);
                                localStorage.setItem('crafvanta_admin_credentials', JSON.stringify(newCred));
                              }}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold text-slate-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                              Master Password
                            </label>
                            <input
                              type="text"
                              value={savedCredentials.password}
                              onChange={(e) => {
                                const newCred = { ...savedCredentials, password: e.target.value };
                                setSavedCredentials(newCred);
                                localStorage.setItem('crafvanta_admin_credentials', JSON.stringify(newCred));
                              }}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                          <span>Authorized Account: <strong className="text-emerald-600 dark:text-emerald-400">{savedCredentials.email}</strong></span>
                          <span className="text-emerald-500 font-bold">✓ Credentials Saved</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => showToast('Agency settings & credentials saved & live')}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                      >
                        Save & Apply Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD MANUAL LEAD */}
      <AnimatePresence>
        {isNewLeadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                onClick={() => setIsNewLeadOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Record New Client Lead
              </h2>

              <form onSubmit={handleCreateLead} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="e.g. Arif Chowdhury"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Contact (Phone / Email / WhatsApp) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLead.contact}
                    onChange={(e) => setNewLead({ ...newLead, contact: e.target.value })}
                    placeholder="+880 1..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Service
                    </label>
                    <select
                      value={newLead.service}
                      onChange={(e) => setNewLead({ ...newLead, service: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Budget / Valuation
                    </label>
                    <input
                      type="text"
                      value={newLead.budget}
                      onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                      placeholder="e.g. ৳ 250,000 BDT"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Project Requirements / Notes
                  </label>
                  <textarea
                    rows={3}
                    value={newLead.message}
                    onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                    placeholder="Enter project scope or conversation summary..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewLeadOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
                  >
                    Save Lead
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: ADD / EDIT SERVICE */}
      <AnimatePresence>
        {isNewServiceOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                onClick={() => setIsNewServiceOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {editingService ? 'Edit Service Details' : 'Create New Service'}
              </h2>

              <form onSubmit={handleSaveService} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceFormData.title}
                    onChange={(e) =>
                      setServiceFormData({ ...serviceFormData, title: e.target.value })
                    }
                    placeholder="e.g. Cloud Security & DevOps"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={serviceFormData.category}
                      onChange={(e) =>
                        setServiceFormData({ ...serviceFormData, category: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                    >
                      <option>Engineering</option>
                      <option>Enterprise</option>
                      <option>Growth</option>
                      <option>Social</option>
                      <option>Creative</option>
                      <option>Media</option>
                      <option>Innovation</option>
                      <option>Commerce</option>
                      <option>Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={serviceFormData.badge}
                      onChange={(e) =>
                        setServiceFormData({ ...serviceFormData, badge: e.target.value })
                      }
                      placeholder="e.g. Modern · Responsive"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={serviceFormData.description}
                    onChange={(e) =>
                      setServiceFormData({ ...serviceFormData, description: e.target.value })
                    }
                    placeholder="Describe how this service creates value for clients..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Service Picture / Cover Image (ছবি যোগ করুন)
                  </label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={serviceFormData.imageUrl || ''}
                        onChange={(e) =>
                          setServiceFormData({ ...serviceFormData, imageUrl: e.target.value })
                        }
                        placeholder="https://images.unsplash.com/... or paste image URL"
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                      />
                      <label className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer flex items-center gap-1.5 transition-colors shrink-0">
                        <span>📁 Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setServiceFormData({
                                  ...serviceFormData,
                                  imageUrl: reader.result as string,
                                });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Quick Presets / Stock Photos */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5">
                      <span className="text-[10px] text-slate-400 shrink-0 font-medium">Suggestions:</span>
                      {[
                        { label: 'Coding / Web', url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80' },
                        { label: 'Marketing', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
                        { label: 'Software / ERP', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
                        { label: 'Video / Media', url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80' },
                        { label: 'Design / Creative', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80' },
                        { label: 'AI Automation', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setServiceFormData({ ...serviceFormData, imageUrl: preset.url })}
                          className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/60 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 whitespace-nowrap transition-colors cursor-pointer border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    {/* Image Preview Box */}
                    {serviceFormData.imageUrl && (
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-28 bg-slate-100 dark:bg-slate-950 group">
                        <img
                          src={serviceFormData.imageUrl}
                          alt="Service Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setServiceFormData({ ...serviceFormData, imageUrl: '' })}
                          className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/60 hover:bg-rose-600 text-white text-[10px] font-bold backdrop-blur-xs transition-colors cursor-pointer"
                        >
                          ✕ Remove Photo
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={
                      Array.isArray(serviceFormData.tags)
                        ? serviceFormData.tags.join(', ')
                        : serviceFormData.tags || ''
                    }
                    onChange={(e) =>
                      setServiceFormData({ ...serviceFormData, tags: e.target.value.split(',') })
                    }
                    placeholder="React, AWS, CI/CD"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewServiceOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: ADD CLIENT BRAND */}
      <AnimatePresence>
        {isNewClientOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                onClick={() => setIsNewClientOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Add Client Brand
              </h2>

              <form onSubmit={handleAddClient} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    placeholder="e.g. Apex Holdings"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Industry Subtitle
                  </label>
                  <input
                    type="text"
                    value={newClient.sub}
                    onChange={(e) => setNewClient({ ...newClient, sub: e.target.value })}
                    placeholder="e.g. Fintech & Payments"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewClientOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
                  >
                    Add Brand
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 4: ADD / EDIT HERO SLIDE */}
      <AnimatePresence>
        {isSlideModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative my-8"
            >
              <button
                onClick={() => setIsSlideModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {editingSlide ? 'Edit Hero Slide' : 'Add New Hero Slide'}
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Configure slide content, 3D visual photo, and navigation badge.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Tab Number
                    </label>
                    <input
                      type="text"
                      value={slideFormData.tabNumber}
                      onChange={(e) => setSlideFormData({ ...slideFormData, tabNumber: e.target.value })}
                      placeholder="e.g. 01"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Tab Name
                    </label>
                    <input
                      type="text"
                      value={slideFormData.tabName}
                      onChange={(e) => setSlideFormData({ ...slideFormData, tabName: e.target.value })}
                      placeholder="e.g. Software Dev"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Main Slide Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={slideFormData.title}
                    onChange={(e) => setSlideFormData({ ...slideFormData, title: e.target.value })}
                    placeholder="e.g. Software Development"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Top Badge Text
                  </label>
                  <input
                    type="text"
                    value={slideFormData.badge}
                    onChange={(e) => setSlideFormData({ ...slideFormData, badge: e.target.value })}
                    placeholder="e.g. Our services · 01/02"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Slide Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={slideFormData.description}
                    onChange={(e) => setSlideFormData({ ...slideFormData, description: e.target.value })}
                    placeholder="Describe the services and solutions highlighted in this slide..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white leading-relaxed"
                  />
                </div>

                {/* Image Upload and Preview */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Slide 3D Visual / Photo
                  </label>
                  <div className="flex gap-3 items-center">
                    <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 relative">
                      {slideFormData.image ? (
                        <img
                          src={slideFormData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                          No Pic
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={slideFormData.image}
                        onChange={(e) => setSlideFormData({ ...slideFormData, image: e.target.value })}
                        placeholder="Image URL or select file..."
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold cursor-pointer hover:bg-emerald-100 transition-colors">
                        <span>📷 Upload Photo from PC</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setSlideFormData((prev) => ({
                                  ...prev,
                                  image: reader.result as string,
                                }));
                                showToast('Photo loaded into preview');
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSlideModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveSlideModal}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                  >
                    Save Slide
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT EXPENSE */}
      <AnimatePresence>
        {isNewExpenseOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                onClick={() => setIsNewExpenseOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-sm font-bold w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {editingExpense ? 'Edit Expense Record' : 'Log New Agency Expense'}
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Record operational costs, vendor billing, software subscriptions, or server spend.
              </p>

              <form onSubmit={handleSaveExpense} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Expense Description / Item *
                  </label>
                  <input
                    type="text"
                    required
                    value={expenseFormData.desc}
                    onChange={(e) =>
                      setExpenseFormData({ ...expenseFormData, desc: e.target.value })
                    }
                    placeholder="e.g. AWS Cloud Server Hosting & CDN"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Amount (৳ BDT) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      required
                      value={expenseFormData.amount}
                      onChange={(e) =>
                        setExpenseFormData({ ...expenseFormData, amount: Number(e.target.value) })
                      }
                      placeholder="e.g. 25000"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={expenseFormData.category}
                      onChange={(e) =>
                        setExpenseFormData({ ...expenseFormData, category: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white cursor-pointer font-medium"
                    >
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Software">Software</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Office">Office</option>
                      <option value="Operations">Operations</option>
                      <option value="Utilities">Utilities</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Vendor / Supplier
                    </label>
                    <input
                      type="text"
                      value={expenseFormData.vendor}
                      onChange={(e) =>
                        setExpenseFormData({ ...expenseFormData, vendor: e.target.value })
                      }
                      placeholder="e.g. AWS Cloud, Adobe, Google Ads"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={expenseFormData.paymentMethod}
                      onChange={(e) =>
                        setExpenseFormData({ ...expenseFormData, paymentMethod: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white cursor-pointer font-medium"
                    >
                      <option value="Corporate Credit Card">Corporate Credit Card</option>
                      <option value="Bank Wire">Bank Wire</option>
                      <option value="bKash / Mobile Billing">bKash / Mobile Billing</option>
                      <option value="PayPal / Online">PayPal / Online</option>
                      <option value="Direct Cash">Direct Cash</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={expenseFormData.date}
                      onChange={(e) =>
                        setExpenseFormData({ ...expenseFormData, date: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <select
                      value={expenseFormData.status}
                      onChange={(e) =>
                        setExpenseFormData({ ...expenseFormData, status: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white cursor-pointer font-medium"
                    >
                      <option value="Paid">Paid ✅</option>
                      <option value="Pending">Pending ⏳</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsNewExpenseOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 cursor-pointer transition-all"
                  >
                    {editingExpense ? 'Save Changes' : 'Log Expense'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT TEAM MEMBER */}
      <AnimatePresence>
        {isNewEmployeeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                onClick={() => setIsNewEmployeeOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-sm font-bold w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {editingEmployee ? 'Edit Team Member' : 'Add New Team Member'}
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Enter team member contact info, role, department, and status.
              </p>

              <form onSubmit={handleSaveEmployee} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={employeeFormData.name}
                    onChange={(e) =>
                      setEmployeeFormData({ ...employeeFormData, name: e.target.value })
                    }
                    placeholder="e.g. Rifat Hossain"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Role / Designation *
                    </label>
                    <input
                      type="text"
                      required
                      value={employeeFormData.role}
                      onChange={(e) =>
                        setEmployeeFormData({ ...employeeFormData, role: e.target.value })
                      }
                      placeholder="e.g. Senior DevOps Specialist"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Department
                    </label>
                    <select
                      value={employeeFormData.department}
                      onChange={(e) =>
                        setEmployeeFormData({ ...employeeFormData, department: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white cursor-pointer font-medium"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Creative">Creative</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="Management">Management</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={employeeFormData.email}
                      onChange={(e) =>
                        setEmployeeFormData({ ...employeeFormData, email: e.target.value })
                      }
                      placeholder="e.g. rifat@crafvanta.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={employeeFormData.phone}
                      onChange={(e) =>
                        setEmployeeFormData({ ...employeeFormData, phone: e.target.value })
                      }
                      placeholder="e.g. +880 1711 998877"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <select
                      value={employeeFormData.status}
                      onChange={(e) =>
                        setEmployeeFormData({ ...employeeFormData, status: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white cursor-pointer font-medium"
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Remote">Remote</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Profile Picture URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={employeeFormData.avatarUrl}
                      onChange={(e) =>
                        setEmployeeFormData({ ...employeeFormData, avatarUrl: e.target.value })
                      }
                      placeholder="https://..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsNewEmployeeOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 cursor-pointer transition-all"
                  >
                    {editingEmployee ? 'Save Changes' : 'Add Team Member'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 5: ADD VIDEO */}
      <AnimatePresence>
        {isNewVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                onClick={() => setIsNewVideoOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Add Showcase Video
              </h2>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={videoFormData.title}
                    onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                    placeholder="e.g. Crafvanta Brand Reel"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={videoFormData.category}
                    onChange={(e) => setVideoFormData({ ...videoFormData, category: e.target.value })}
                    placeholder="e.g. Brand Film, Commercial, Motion"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    YouTube URL *
                  </label>
                  <input
                    type="text"
                    value={videoFormData.videoUrl}
                    onChange={(e) => setVideoFormData({ ...videoFormData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Thumbnail Image
                  </label>
                  <input
                    type="text"
                    value={videoFormData.thumbnail}
                    onChange={(e) => setVideoFormData({ ...videoFormData, thumbnail: e.target.value })}
                    placeholder="Thumbnail URL or upload below..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white mb-2"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold cursor-pointer">
                    <span>📷 Upload Thumbnail</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setVideoFormData((prev: typeof videoFormData) => ({ ...prev, thumbnail: reader.result as string }));
                            showToast('Thumbnail loaded');
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsNewVideoOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!videoFormData.title.trim()) {
                        showToast('Please provide a video title');
                        return;
                      }
                      const newVid = {
                        id: `v-${Date.now()}`,
                        ...videoFormData,
                      };
                      setVideos((prev) => [...prev, newVid]);
                      setIsNewVideoOpen(false);
                      setVideoFormData({
                        title: '',
                        category: 'Commercial',
                        videoUrl: '',
                        thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
                      });
                      showToast('Showcase video added');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Add Video
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT TASK */}
      <AnimatePresence>
        {isNewTaskOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                onClick={() => setIsNewTaskOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-sm font-bold w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {editingTask ? 'Edit Task Details' : 'Create New Agency Task'}
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Assign tasks to team members, set priorities, tags, and deadlines.
              </p>

              <form onSubmit={handleSaveTask} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={taskFormData.title}
                    onChange={(e) =>
                      setTaskFormData({ ...taskFormData, title: e.target.value })
                    }
                    placeholder="e.g. Develop React component for Invoice System"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Assignee *
                    </label>
                    <select
                      value={taskFormData.assignee}
                      onChange={(e) =>
                        setTaskFormData({ ...taskFormData, assignee: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white cursor-pointer font-medium"
                    >
                      {employeeList.map((emp) => (
                        <option key={emp.id} value={emp.name}>
                          {emp.name} ({emp.department})
                        </option>
                      ))}
                      <option value="Tanvir Ahmed">Tanvir Ahmed</option>
                      <option value="Sabrina Khan">Sabrina Khan</option>
                      <option value="Mahmud Hasan">Mahmud Hasan</option>
                      <option value="Nusrat Jahan">Nusrat Jahan</option>
                      <option value="Unassigned">Unassigned</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Department / Tag
                    </label>
                    <select
                      value={taskFormData.tag}
                      onChange={(e) =>
                        setTaskFormData({ ...taskFormData, tag: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white cursor-pointer font-medium"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Video">Video</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Priority
                    </label>
                    <select
                      value={taskFormData.priority}
                      onChange={(e) =>
                        setTaskFormData({
                          ...taskFormData,
                          priority: e.target.value as 'High' | 'Medium' | 'Low',
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white cursor-pointer font-medium"
                    >
                      <option value="High">High 🔴</option>
                      <option value="Medium">Medium 🟡</option>
                      <option value="Low">Low 🟢</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <select
                      value={taskFormData.status}
                      onChange={(e) =>
                        setTaskFormData({
                          ...taskFormData,
                          status: e.target.value as 'To Do' | 'In Progress' | 'Completed',
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white cursor-pointer font-medium"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={taskFormData.dueDate}
                      onChange={(e) =>
                        setTaskFormData({ ...taskFormData, dueDate: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Description & Specs
                  </label>
                  <textarea
                    rows={3}
                    value={taskFormData.description}
                    onChange={(e) =>
                      setTaskFormData({ ...taskFormData, description: e.target.value })
                    }
                    placeholder="Enter details, requirements, or technical notes..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsNewTaskOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 cursor-pointer transition-all"
                  >
                    {editingTask ? 'Save Changes' : 'Create Task'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 6: UPLOAD MEDIA ASSET */}
      <AnimatePresence>
        {isUploadMediaOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                onClick={() => setIsUploadMediaOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                Upload New Media Asset
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Add an image, render, or creative to your agency media hub.
              </p>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Asset Title / Filename *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMediaData.name}
                    onChange={(e) => setNewMediaData({ ...newMediaData, name: e.target.value })}
                    placeholder="e.g. hero_brand_showcase.png"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Asset Category
                  </label>
                  <select
                    value={newMediaData.category}
                    onChange={(e) =>
                      setNewMediaData({ ...newMediaData, category: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-bold cursor-pointer"
                  >
                    <option value="Hero Visual">Hero Visual</option>
                    <option value="Portfolio Photo">Portfolio Photo</option>
                    <option value="Service Cover">Service Cover</option>
                    <option value="Client Logo">Client Logo</option>
                    <option value="Video Asset">Video Asset</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Image Source (File Upload or URL) *
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={newMediaData.url}
                      onChange={(e) => setNewMediaData({ ...newMediaData, url: e.target.value })}
                      placeholder="Paste Image URL or click Upload below..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                    />

                    <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold cursor-pointer hover:bg-emerald-100 transition-colors w-full justify-center">
                      <span>📁 Select Image from PC</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const result = reader.result as string;
                              const calcSize = `${(file.size / 1024).toFixed(0)} KB`;
                              setNewMediaData((prev) => ({
                                ...prev,
                                url: result,
                                name: prev.name || file.name,
                                size: calcSize,
                              }));
                              showToast(`Loaded ${file.name}`);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {newMediaData.url && (
                  <div className="h-28 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative">
                    <img
                      src={newMediaData.url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsUploadMediaOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateMediaAsset}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                  >
                    Add Asset
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 7: LIGHTBOX PREVIEW */}
      <AnimatePresence>
        {previewMediaItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 relative flex flex-col items-center shadow-2xl"
            >
              <button
                onClick={() => setPreviewMediaItem(null)}
                className="absolute top-4 right-4 text-white text-lg font-bold bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>

              <div className="w-full h-[450px] rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center mb-4">
                <img
                  src={previewMediaItem.url}
                  alt={previewMediaItem.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="w-full flex items-center justify-between text-white text-xs">
                <div>
                  <h3 className="font-bold text-sm">{previewMediaItem.name}</h3>
                  <span className="text-slate-400">{previewMediaItem.category} · {previewMediaItem.size}</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(previewMediaItem.url);
                    showToast('Asset link copied to clipboard!');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-all"
                >
                  📋 Copy Direct URL
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 8: ADD / EDIT PAYROLL RECORD */}
      <AnimatePresence>
        {isNewPayrollOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                onClick={() => setIsNewPayrollOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {editingPayroll ? 'Edit Payroll Record' : 'Add Employee Salary Record'}
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Configure monthly compensation, bonus allocations, deductions, and payment status.
              </p>

              <form onSubmit={handleSavePayrollRecord} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Employee Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={payrollFormData.employeeName}
                    onChange={(e) => setPayrollFormData({ ...payrollFormData, employeeName: e.target.value })}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Job Designation *
                    </label>
                    <input
                      type="text"
                      required
                      value={payrollFormData.role}
                      onChange={(e) => setPayrollFormData({ ...payrollFormData, role: e.target.value })}
                      placeholder="e.g. Full-Stack Lead"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Department
                    </label>
                    <select
                      value={payrollFormData.department}
                      onChange={(e) => setPayrollFormData({ ...payrollFormData, department: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Creative">Creative</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="Management">Management</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Base Salary ($)
                    </label>
                    <input
                      type="number"
                      required
                      value={payrollFormData.baseSalary}
                      onChange={(e) => setPayrollFormData({ ...payrollFormData, baseSalary: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-emerald-600 mb-1">
                      Bonus ($)
                    </label>
                    <input
                      type="number"
                      value={payrollFormData.bonus}
                      onChange={(e) => setPayrollFormData({ ...payrollFormData, bonus: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-rose-500 mb-1">
                      Deductions ($)
                    </label>
                    <input
                      type="number"
                      value={payrollFormData.deductions}
                      onChange={(e) => setPayrollFormData({ ...payrollFormData, deductions: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={payrollFormData.paymentMethod}
                      onChange={(e) => setPayrollFormData({ ...payrollFormData, paymentMethod: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="Bank Wire">Bank Wire</option>
                      <option value="bKash / Mobile">bKash / Mobile</option>
                      <option value="Wise / USD">Wise / USD</option>
                      <option value="Direct Cash">Direct Cash</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Status
                    </label>
                    <select
                      value={payrollFormData.status}
                      onChange={(e) => setPayrollFormData({ ...payrollFormData, status: e.target.value as any })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white cursor-pointer font-bold"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Calculated Net Pay:</span>
                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    ${(Number(payrollFormData.baseSalary) + Number(payrollFormData.bonus) - Number(payrollFormData.deductions)).toLocaleString()} USD
                  </span>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsNewPayrollOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 9: PAY SLIP PREVIEW MODAL */}
      <AnimatePresence>
        {selectedPaySlip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedPaySlip(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>

              {/* Pay Slip Header */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm">
                      C
                    </div>
                    <span className="font-black text-slate-900 dark:text-white tracking-tight text-lg">
                      CRAFVANTA MEDIA
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                    Official Pay Slip
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Reference ID: <strong className="text-slate-700 dark:text-slate-300 font-mono">{selectedPaySlip.id.toUpperCase()}</strong> · Month: {payrollMonth}
                </p>
              </div>

              {/* Employee & Payment Info */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Employee Name</span>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{selectedPaySlip.employeeName}</div>
                  <div className="text-slate-500 mt-0.5">{selectedPaySlip.role}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Department & Date</span>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{selectedPaySlip.department}</div>
                  <div className="text-slate-500 mt-0.5">Payday: {selectedPaySlip.paymentDate}</div>
                </div>
              </div>

              {/* Earnings Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Compensation Breakdown</div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">Base Salary</span>
                  <span className="font-bold text-slate-900 dark:text-white">${selectedPaySlip.baseSalary.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">Performance Bonus</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">+${selectedPaySlip.bonus.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">Tax / Deductions</span>
                  <span className="font-bold text-rose-500">-${selectedPaySlip.deductions.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between py-2 text-sm font-black text-slate-900 dark:text-white pt-3 border-t-2 border-slate-200 dark:border-slate-800">
                  <span>NET SALARY DISBURSED</span>
                  <span className="text-emerald-600 dark:text-emerald-400">${selectedPaySlip.netSalary.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400">
                  Method: <strong className="text-slate-700 dark:text-slate-300">{selectedPaySlip.paymentMethod}</strong> · Status: <strong className="text-emerald-600">{selectedPaySlip.status}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      showToast(`Pay Slip for ${selectedPaySlip.employeeName} printed / saved as PDF`);
                      setSelectedPaySlip(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <span>🖨️ Download / Print Pay Slip</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
