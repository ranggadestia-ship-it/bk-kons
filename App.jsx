import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck, 
  AlertCircle, 
  LayoutDashboard,
  School,
  Layers,
  GraduationCap,
  Database,
  FileSearch,
  HeartHandshake,
  LogOut,
  Bell,
  ChevronDown,
  User,
  Plus,
  Save,
  X,
  Check,
  Briefcase,
  Calendar,
  FileBadge,
  Activity,
  Lock,
  UserCircle,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';

const App = () => {
  // --- State Autentikasi ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // --- State Navigasi & UI ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isDatabaseExpanded, setIsDatabaseExpanded] = useState(true);
  const [isProgramExpanded, setIsProgramExpanded] = useState(false);
  const [isCounselingExpanded, setIsCounselingExpanded] = useState(true);
  
  const [userName] = useState('Rangga Dahrizal, S.Pd.');
  const [notification, setNotification] = useState(null);

  // --- Data Master (Mock Data) ---
  const [students] = useState([
    { id: 1, nisn: '00567123', name: 'Budi Santoso', class: 'X-IPA-1', gender: 'L', status: 'Stabil' },
    { id: 2, nisn: '00567124', name: 'Siti Aminah', class: 'XI-IPS-2', gender: 'P', status: 'Stabil' },
    { id: 3, nisn: '00567125', name: 'Andi Wijaya', class: 'XII-IPA-3', gender: 'L', status: 'Monitor' },
    { id: 4, nisn: '00567126', name: 'Rina Pratama', class: 'X-IPA-1', gender: 'P', status: 'Stabil' },
    { id: 5, nisn: '00567127', name: 'Dedi Kurniawan', class: 'X-IPA-1', gender: 'L', status: 'Monitor' },
  ]);

  const [counselingRecords, setCounselingRecords] = useState([
    { 
      id: 101, 
      date: '2023-10-25', 
      studentIds: [3], 
      studentNames: 'Andi Wijaya', 
      type: 'Individu', 
      issue: 'Sering terlambat masuk sekolah', 
      solution: 'Pemberian motivasi dan pembuatan jadwal harian', 
      status: 'Proses' 
    }
  ]);
  
  // --- State Form Konseling ---
  const [isAddingCounseling, setIsAddingCounseling] = useState(false);
  const [newCounseling, setNewCounseling] = useState({
    studentIds: [], 
    date: new Date().toISOString().split('T')[0], 
    type: 'Individu', 
    issue: '', 
    solution: '', 
    status: 'Proses'
  });

  // --- Logika Handler ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === 'RDkons' && loginData.password === 'Hajisudin14') {
      setIsLoggedIn(true);
      setLoginError('');
      showNotify("Berhasil masuk. Selamat datang kembali!");
    } else {
      setLoginError('Username atau Password salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
    setActiveTab('dashboard');
  };

  const showNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddCounseling = () => {
    if (newCounseling.studentIds.length === 0 || !newCounseling.issue) {
      showNotify("Pilih siswa dan isi permasalahan");
      return;
    }
    const selectedStudents = students.filter(s => newCounseling.studentIds.includes(s.id));
    const names = selectedStudents.map(s => s.name).join(', ');
    const record = {
      ...newCounseling,
      id: Date.now(),
      studentNames: names,
      type: activeTab === 'layanan-kelompok' ? 'Kelompok' : 'Individu'
    };
    setCounselingRecords([record, ...counselingRecords]);
    setIsAddingCounseling(false);
    setNewCounseling({ studentIds: [], date: new Date().toISOString().split('T')[0], type: 'Individu', issue: '', solution: '', status: 'Proses' });
    showNotify(`Catatan konseling ${record.type} berhasil disimpan`);
  };

  // --- Render UI ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-12">
                <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md">
                  <ShieldCheck size={28} />
                </div>
                <span className="font-black text-2xl tracking-tight">BK-KONS</span>
              </div>
              <h1 className="text-4xl font-black leading-tight mb-4">Sistem Manajemen Bimbingan Konseling</h1>
              <p className="text-blue-100 text-lg font-medium opacity-90">Digitalisasi administrasi BK untuk pelayanan siswa yang lebih profesional.</p>
            </div>
            <div className="relative z-10 mt-12 flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="bg-white/20 p-2 rounded-xl"><Activity size={20}/></div>
              <p className="text-xs font-bold uppercase tracking-wider">Versi 2.1.0 - Digital Transformation</p>
            </div>
          </div>

          <div className="p-12 flex flex-col justify-center bg-white">
            <h2 className="text-2xl font-black text-gray-800 mb-2">Selamat Datang</h2>
            <p className="text-gray-500 font-medium text-sm mb-8">Silakan masuk dengan akun Guru BK Anda.</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Username</label>
                <input 
                  type="text" 
                  className="w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/20 text-sm font-medium"
                  placeholder="RDkons"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="w-full pl-4 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/20 text-sm font-medium"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {loginError && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100">{loginError}</p>}

              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm shadow-xl transition-all">
                Masuk ke Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans overflow-hidden text-slate-900">
      {/* Sidebar & Content Layout */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 transition-all duration-300 z-30 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 flex items-center border-b border-gray-100 h-20 shrink-0 justify-between">
          {isSidebarOpen && <span className="font-bold text-xl text-gray-800 tracking-tight">BK-KONS</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl bg-gray-50 text-gray-500 hover:text-blue-600 transition">
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}>
            <LayoutDashboard size={20} />
            {isSidebarOpen && <span className="text-sm">Dashboard</span>}
          </button>
          {/* Tambahkan Navigasi Lain Sesuai Kebutuhan */}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition font-bold text-sm">
            <LogOut size={18} />{isSidebarOpen && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-8 h-20 flex items-center justify-between z-20 shrink-0">
          <h1 className="text-xl font-black text-gray-800 tracking-tight capitalize">{activeTab}</h1>
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold text-gray-700">{userName}</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-[#F9FBFF]">
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
             <h2 className="text-3xl font-black mb-4">Sistem Siap Digunakan</h2>
             <p className="text-gray-500">Pilih menu di samping untuk memulai manajemen data siswa dan layanan bimbingan konseling.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
