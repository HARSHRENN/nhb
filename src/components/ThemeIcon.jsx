import React from 'react';
import { UsersRound, TrendingUp, History, Globe2, RefreshCw, BookOpen, ShieldCheck, Columns3, Factory, House, Images, Mail } from 'lucide-react';

const icons = {
  people: UsersRound,
  growth: TrendingUp,
  heritage: History,
  global: Globe2,
  kaizen: RefreshCw,
  learning: BookOpen,
  quality: ShieldCheck,
  kanban: Columns3,
  manufacturing: Factory,
  home: House,
  gallery: Images,
  contact: Mail,
};

export function ThemeIcon({ name, size = 48 }) {
  const Icon = icons[name] || Factory;
  return <span className="theme-icon" aria-hidden="true" style={{ width: size, height: size }}>
    <Icon size={Math.round(size * 0.55)} strokeWidth={1.6} />
  </span>;
}
