import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
];

function App() {
  return (
    <div className="app-shell">
      <div className="container py-4 py-md-5">
        <header className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <h1 className="display-6 fw-bold text-primary mb-2">OctoFit Tracker</h1>
            <p className="text-secondary mb-0">Track your activities, teams, users, workouts, and leaderboard results.</p>
          </div>
        </header>

        <nav className="navbar navbar-expand-lg app-nav rounded-4 shadow-sm mb-4 px-3 py-3">
          <span className="navbar-brand text-white fw-semibold mb-0">Navigation</span>
          <div className="nav nav-pills gap-2 ms-lg-3 mt-3 mt-lg-0">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                className={({ isActive }) =>
                  `btn btn-sm ${isActive ? 'btn-light text-primary fw-semibold' : 'btn-outline-light'}`
                }
                to={item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Navigate replace to="/activities" />} />
            <Route element={<Activities />} path="/activities" />
            <Route element={<Leaderboard />} path="/leaderboard" />
            <Route element={<Teams />} path="/teams" />
            <Route element={<Users />} path="/users" />
            <Route element={<Workouts />} path="/workouts" />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
