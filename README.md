import React, { useState } from 'react';
import { 
  Users, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck, 
  AlertCircle, 
  LayoutDashboard,
  Database,
  FileSearch,
  HeartHandshake,
  LogOut,
  Bell,
  Plus,
  Lock,
  UserCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Activity
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
  const [userName] = useState('Rangga Dahrizal, S.Pd.');
  const [notification, setNotification] = useState(null);

  // --- Data Master Sederhana ---
  const [students] = useState([
    { id: 1, name: 'Budi Santoso', class: 'X-IPA-1', status: 'Stabil' },
    { id: 2, name: 'Siti Aminah', class: 'XI-IPS-2', status: 'Stabil' },
    { id: 3, name: 'Andi Wijaya', class: 'XII-IPA-3', status: 'Monitor' },
  ]);

  // --- Logika Login ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === 'RDkons' && loginData.password === 'Hajisudin14') {
      setIsLoggedIn(true);
      setLoginError('');
      showNotify("Berhasil masuk. Selamat datang!");
    } else {
      setLoginError('Username atau Password salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
  };

  const showNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // --- Tampilan Login ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-12 text-white flex flex-col justify-between relative">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <ShieldCheck size={28} />
                <span className="font-black text-2xl tracking-tight">BK-KONS</span>
              </div>
              <h1 className="text-4xl font-black leading-tight mb-4">Digitalisasi Administrasi BK</h1>
              <p className="text-blue-100 opacity-90">Sistem manajemen bimbingan konseling profesional untuk masa depan sekolah.</p>
            </div>
            <div className="mt-8 flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <Activity size={20}/>
              <p className="text-xs font-bold uppercase tracking-wider">Versi 2.1.0</p>
            </div>
          </div>

          <div className="p-12 flex flex-col justify-center bg-white">
            <h2 className="text-2xl font-black text-gray-800 mb-2">Selamat Datang</h2>
            <p className="text-gray-500 text-sm mb-8">Masuk dengan akun Guru BK Anda.</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Username</label>
                <div className="relative">
                  <UserCircle className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/20 text-sm font-medium"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/20 text-sm font-medium"
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
                Masuk Sekarang
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // --- Tampilan Dashboard Utama ---
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-900">
      {/* Notifikasi Pop-up */}
      {notification && (
        <div className="fixed top-8 right-8 z-[200] animate-bounce">
           <div className="bg-white border-l-4 border-blue-600 shadow-2xl rounded-2xl p-5 flex items-center gap-4 min-w-[300px]">
              <CheckCircle2 className="text-blue-600" size={20} />
              <p className="text-sm font-bold text-gray-700">{notification}</p>
           </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 flex items-center border-b border-gray-100 h-20 shrink-0 justify-between">
          {isSidebarOpen && <span className="font-bold text-xl text-blue-600 tracking-tight">BK-KONS</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:text-blue-600">
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}>
            <LayoutDashboard size={20} />
            {isSidebarOpen && <span className="text-sm">Dashboard</span>}
          </button>
          <button onClick={() => setActiveTab('siswa')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'siswa' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}>
            <Users size={20} />
            {isSidebarOpen && <span className="text-sm">Data Siswa</span>}
          </button>
          <button onClick={() => setActiveTab('konseling')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'konseling' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}>
            <HeartHandshake size={20} />
            {isSidebarOpen && <span className="text-sm">Layanan BK</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition font-bold text-sm">
            <LogOut size={18} />{isSidebarOpen && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-100 px-8 h-20 flex items-center justify-between">
          <h1 className="text-xl font-black text-gray-800 tracking-tight capitalize">{activeTab}</h1>
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold text-gray-700">{userName}</p>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">R</div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto bg-slate-50">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-blue-600 text-white p-10 rounded-[32px] shadow-xl">
                <h2 className="text-3xl font-black mb-2">Halo, Pak {userName.split(',')[0]}!</h2>
                <p className="opacity-80">Sistem manajemen BK Anda sudah siap digunakan untuk hari ini.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Total Siswa</p>
                  <p className="text-3xl font-black">{students.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Kasus Aktif</p>
                  <p className="text-3xl font-black text-orange-500">1</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Status Sistem</p>
                  <p className="text-3xl font-black text-green-500">Aktif</p>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && (
            <div className="bg-white p-12 rounded-[32px] shadow-sm border border-gray-100 text-center">
               <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                 <Plus size={32} />
               </div>
               <h2 className="text-2xl font-black mb-2">Modul {activeTab} Segera Hadir</h2>
               <p className="text-gray-500 max-w-md mx-auto">Kami sedang menyiapkan fitur lengkap untuk pencatatan data dan layanan di bagian ini.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
