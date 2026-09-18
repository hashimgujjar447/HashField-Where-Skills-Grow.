"use client";

import React from "react";
import {
  Users,
  BookOpen,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";

const statCards = [
  { label: "Total Users",   value: "12,847", change: "+12.5%", up: true,  icon: Users,         color: "indigo"  },
  { label: "Total Courses", value: "284",     change: "+4.3%",  up: true,  icon: BookOpen,      color: "emerald" },
  { label: "Total Orders",  value: "3,921",   change: "+8.1%",  up: true,  icon: ShoppingCart,  color: "violet"  },
  { label: "Revenue",       value: "$94,210", change: "-2.4%",  up: false, icon: TrendingUp,    color: "amber"   },
];

type ColorKey = "indigo" | "emerald" | "violet" | "amber";

const colorMap: Record<ColorKey, { bg: string; text: string; ring: string }> = {
  indigo:  { bg: "bg-indigo-50 dark:bg-indigo-950/40",  text: "text-indigo-600 dark:text-indigo-400",  ring: "ring-indigo-200 dark:ring-indigo-800"  },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-600 dark:text-emerald-400", ring: "ring-emerald-200 dark:ring-emerald-800" },
  violet:  { bg: "bg-violet-50 dark:bg-violet-950/40",  text: "text-violet-600 dark:text-violet-400",  ring: "ring-violet-200 dark:ring-violet-800"  },
  amber:   { bg: "bg-amber-50 dark:bg-amber-950/40",    text: "text-amber-600 dark:text-amber-400",    ring: "ring-amber-200 dark:ring-amber-800"    },
};

const months   = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const usersData  = [320,480,390,620,540,710,670,820,760,910,850,980];
const ordersData = [90,140,110,195,160,230,210,290,260,340,310,390];

const recentOrders = [
  { id:"ORD-001", user:"Alice Johnson", course:"React Mastery",     amount:"$49", status:"completed", date:"Sep 17, 2026" },
  { id:"ORD-002", user:"Bob Smith",     course:"Node.js Pro",       amount:"$79", status:"pending",   date:"Sep 17, 2026" },
  { id:"ORD-003", user:"Carol White",   course:"TypeScript 101",    amount:"$39", status:"completed", date:"Sep 16, 2026" },
  { id:"ORD-004", user:"David Lee",     course:"MongoDB Deep Dive", amount:"$59", status:"failed",    date:"Sep 15, 2026" },
  { id:"ORD-005", user:"Eva Martinez",  course:"Redux Toolkit",     amount:"$29", status:"completed", date:"Sep 15, 2026" },
];

const topCourses = [
  { title:"React Mastery",     students:1240, rating:4.9, revenue:"$12,400" },
  { title:"Node.js Pro",       students:980,  rating:4.8, revenue:"$9,800"  },
  { title:"TypeScript 101",    students:870,  rating:4.7, revenue:"$7,830"  },
  { title:"MongoDB Deep Dive", students:740,  rating:4.6, revenue:"$6,660"  },
];

const activityFeed = [
  { icon: CheckCircle2, color:"text-emerald-500", msg:"New order from Alice Johnson",        time:"2 min ago"  },
  { icon: Users,        color:"text-indigo-500",  msg:"5 new users registered",              time:"18 min ago" },
  { icon: BookOpen,     color:"text-violet-500",  msg:"Course 'Redux Toolkit' published",    time:"1 hr ago"   },
  { icon: XCircle,      color:"text-red-500",     msg:"Order ORD-004 failed",                time:"3 hr ago"   },
  { icon: Star,         color:"text-amber-500",   msg:"New 5-star review on React Mastery",  time:"5 hr ago"   },
];

const MiniBarChart: React.FC<{ data1: number[]; data2: number[]; labels: string[] }> = ({ data1, data2, labels }) => {
  const max = Math.max(...data1, ...data2);
  const barW = 14; const gap = 4; const groupW = barW * 2 + gap + 10;
  const svgW = groupW * labels.length; const svgH = 140; const padB = 24; const chartH = svgH - padB;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full min-w-[320px]" preserveAspectRatio="none">
        {[0.25,0.5,0.75,1].map((f) => (
          <line key={f} x1={0} x2={svgW} y1={chartH - f*chartH} y2={chartH - f*chartH} stroke="currentColor" strokeOpacity={0.08} strokeWidth={1} />
        ))}
        {labels.map((label, i) => {
          const x = i * groupW;
          const h1 = (data1[i] / max) * chartH;
          const h2 = (data2[i] / max) * chartH;
          return (
            <g key={label}>
              <rect x={x+2} y={chartH-h1} width={barW} height={h1} rx={3} className="fill-indigo-500 dark:fill-indigo-400" opacity={0.85} />
              <rect x={x+2+barW+gap} y={chartH-h2} width={barW} height={h2} rx={3} className="fill-violet-400 dark:fill-violet-300" opacity={0.75} />
              <text x={x+groupW/2-2} y={svgH-4} textAnchor="middle" fontSize={8} className="fill-slate-400 dark:fill-slate-500">{label}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex items-center gap-5 mt-3">
        <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-indigo-500 dark:bg-indigo-400" /> Users
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-violet-400 dark:bg-violet-300" /> Orders
        </span>
      </div>
    </div>
  );
};

type DonutSeg = { label: string; value: number; color: string };

const DonutChart: React.FC<{ segments: DonutSeg[] }> = ({ segments }) => {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const r = 48; const cx = 60; const cy = 60; const circ = 2 * Math.PI * r;
  let offset = 0;
  const arcs = segments.map((seg) => {
    const dash = (seg.value / total) * circ;
    const result = { ...seg, dash, dashOff: circ - offset };
    offset += dash;
    return result;
  });

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
      <svg width={120} height={120} viewBox="0 0 120 120" className="shrink-0">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeOpacity={0.07} strokeWidth={18} />
        {arcs.map((arc) => (
          <circle key={arc.label} cx={cx} cy={cy} r={r} fill="none" stroke={arc.color} strokeWidth={18}
            strokeDasharray={`${arc.dash} ${circ - arc.dash}`} strokeDashoffset={arc.dashOff}
            strokeLinecap="round" style={{ transform:"rotate(-90deg)", transformOrigin:"center" }} />
        ))}
        <text x={cx} y={cy-6} textAnchor="middle" fontSize={11} className="fill-slate-700 dark:fill-slate-200" fontWeight={700}>{total}</text>
        <text x={cx} y={cy+8} textAnchor="middle" fontSize={7} className="fill-slate-400 dark:fill-slate-500">Courses</text>
      </svg>
      <div className="flex flex-col gap-2 pt-1">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-xs text-slate-600 dark:text-slate-300">{seg.label}</span>
            <span className="ml-auto pl-6 text-xs font-semibold text-slate-800 dark:text-white">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, string> = {
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    pending:   "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    failed:    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${map[status] ?? ""}`}>
      {status}
    </span>
  );
};

const DashboardHero: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const c = colorMap[card.color as ColorKey];
          return (
            <div key={card.label} className={`relative overflow-hidden rounded-2xl bg-white dark:bg-[#131e36] p-5 shadow-sm ring-1 ${c.ring} hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
                  <p className="mt-1.5 text-2xl font-bold text-slate-900 dark:text-white">{card.value}</p>
                  <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${card.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                    {card.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {card.change} vs last month
                  </div>
                </div>
                <div className={`rounded-xl p-2.5 ${c.bg} ring-1 ${c.ring}`}>
                  <Icon size={22} className={c.text} />
                </div>
              </div>
              <div className={`pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full ${c.bg} opacity-50`} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2 rounded-2xl bg-white dark:bg-[#131e36] p-5 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Growth Analytics</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">Last 12 months</p>
          </div>
          <MiniBarChart data1={usersData} data2={ordersData} labels={months} />
        </div>
        <div className="rounded-2xl bg-white dark:bg-[#131e36] p-5 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
          <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Course Levels</h2>
          <DonutChart segments={[
            { label:"Beginner",     value:82,  color:"#6366f1" },
            { label:"Intermediate", value:134, color:"#8b5cf6" },
            { label:"Advanced",     value:68,  color:"#10b981" },
          ]} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2 rounded-2xl bg-white dark:bg-[#131e36] shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Recent Orders</h2>
            <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[540px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0f1a30]">
                  {["Order ID","User","Course","Amount","Status","Date"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-[#0f1a30] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{o.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{o.user}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[150px] truncate">{o.course}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-white">{o.amount}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                    <td className="px-4 py-3 text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#131e36] shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Recent Activity</h2>
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {activityFeed.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx} className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-[#0f1a30] transition-colors">
                  <div className="mt-0.5 shrink-0"><Icon size={17} className={item.color} /></div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{item.msg}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                      <Clock size={11} /> {item.time}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#131e36] shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Top Performing Courses</h2>
          <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">See all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0f1a30]">
                {["#","Course Title","Students","Rating","Revenue",""].map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {topCourses.map((course, idx) => (
                <tr key={course.title} className="hover:bg-slate-50 dark:hover:bg-[#0f1a30] transition-colors">
                  <td className="px-4 py-3 text-slate-400 dark:text-slate-500 font-medium">{idx+1}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800 dark:text-white">{course.title}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Users size={13} className="text-indigo-500" />
                      <span className="text-slate-700 dark:text-slate-300">{course.students.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{course.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800 dark:text-white">{course.revenue}</td>
                  <td className="px-4 py-3">
                    <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors">
                      <Eye size={12} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
