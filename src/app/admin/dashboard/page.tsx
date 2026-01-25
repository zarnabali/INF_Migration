'use client';

import { useState } from 'react';
import {
  IconRefresh,
  IconSettings,
  IconCurrencyDollar,
  IconShield,
  IconChartBar,
  IconCalendar
} from '@tabler/icons-react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Divider
} from '@mui/material';

// --- Widget Components (Placeholders for now, will implement properly) ---

const StatsCard = ({ title, value, icon: Icon, colorClass, iconBgClass }: any) => (
  <div className={`rounded-xl p-6 text-white shadow-sm relative overflow-hidden ${colorClass}`}>
    <div className="flex items-center gap-4 relative z-10">
      <div className={`p-4 rounded-xl ${iconBgClass} bg-opacity-20 flex items-center justify-center`}>
        <Icon size={26} className="text-white" stroke={1.5} />
      </div>
      <div>
        <h3 className="text-3xl font-bold text-white mb-0 leading-none">{value}</h3>
        <p className="text-sm opacity-90 font-medium mt-1 text-white">{title}</p>
      </div>
    </div>
  </div>
);

// --- Settings Dialog Component ---
const DashboardSettings = ({ open, onClose, widgets, toggleWidget }: any) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="flex items-center gap-2 text-gray-800">
        <IconSettings size={20} />
        Dashboard Settings
      </DialogTitle>
      <Divider />
      <DialogContent>
        <div className="mb-2 text-sm text-gray-500 font-medium uppercase tracking-wide">Widget Visibility</div>
        <List dense>
          {widgets.map((widget: any) => (
            <ListItem key={widget.id} onClick={() => toggleWidget(widget.id)} className="cursor-pointer hover:bg-gray-50 rounded-lg">
              <Checkbox
                edge="start"
                checked={widget.visible}
                tabIndex={-1}
                disableRipple
                sx={{
                  color: '#0078FC',
                  '&.Mui-checked': { color: '#0078FC' }
                }}
              />
              <ListItemText
                primary={widget.title}
                secondary={widget.description}
                primaryTypographyProps={{ className: "font-medium text-gray-900" }}
                secondaryTypographyProps={{ className: "text-gray-500" }}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <Divider />
      <DialogActions className="p-4">
        <Button onClick={onClose} className="text-gray-600 hover:bg-gray-100 normal-case px-4">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default function AdminDashboardPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [widgets, setWidgets] = useState([
    { id: 'stats_cards', title: 'Program Revenue', description: 'Key performance indicators', visible: true },
    { id: 'conversion_analytics', title: 'Conversion Analytics', description: 'Quote to policy conversion rates', visible: true },
    { id: 'coverage_status', title: 'Coverage Status', description: 'Policy status distribution', visible: true }
  ]);

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(w => w.id === id ? { ...w, visible: !w.visible } : w));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-lg font-light text-gray-500 ">
            Admin Dashboard
          </div>
          <div className="text-sm text-gray-500 mb-1">
            Admin <span className="mx-2">›</span> <span className="text-gray-400">Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold text-[#005047] mt-4 md:mt-6">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">System-wide overview and management</p>
        </div>
        <div className="flex gap-2 self-start md:self-auto">
          <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full border border-gray-300 transition-colors">
            <IconRefresh size={20} stroke={1.5} />
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full border border-gray-300 transition-colors"
          >
            <IconSettings size={20} stroke={1.5} />
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      {widgets.find(w => w.id === 'stats_cards')?.visible && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Blue Card */}
          <StatsCard
            title="Total Revenue"
            value="$1,752"
            icon={IconCurrencyDollar}
            colorClass="bg-[#1E88E5]"
            iconBgClass="bg-white"
          />
          {/* Purple Card */}
          <StatsCard
            title="Total Coverages"
            value="6"
            icon={IconShield}
            colorClass="bg-[#8E24AA]"
            iconBgClass="bg-white"
          />
          {/* Green Card */}
          <StatsCard
            title="Revenue 30 Days"
            value="$90"
            icon={IconChartBar}
            colorClass="bg-[#43A047]"
            iconBgClass="bg-white"
          />
          {/* Light Blue Card */}
          <StatsCard
            title="Coverages 30 Days"
            value="1"
            icon={IconCalendar}
            colorClass="bg-[#039BE5]"
            iconBgClass="bg-white"
          />
        </div>
      )}

      {/* Main Widgets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Analytics Widget */}
        {widgets.find(w => w.id === 'conversion_analytics')?.visible && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <IconChartBar size={20} className="text-green-500" />
                  Conversion Analytics
                </h3>
                <p className="text-sm text-gray-500">Quote to Policy conversion rates</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <IconRefresh size={18} />
              </button>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Select Affiliate Organization</label>
                <select className="w-full text-sm border-gray-200 rounded-lg bg-gray-50 p-2 outline-none">
                  <option>All System</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Time Period</label>
                <select className="w-full text-sm border-gray-200 rounded-lg bg-gray-50 p-2 outline-none">
                  <option>30 Days</option>
                </select>
              </div>
            </div>

            {/* Donut Chart Placeholder - Visually mimicking the screenshot */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="w-48 h-48 rounded-full border-[16px] border-[#FB8C00] border-r-[#00C853] border-b-[#00C853] relative flex items-center justify-center">
                <span className="text-xl font-bold text-gray-400">50.0%</span>
              </div>

              <div className="flex justify-between w-full mt-8 px-4 text-center">
                <div>
                  <div className="text-green-500 text-lg font-bold">1</div>
                  <div className="text-xs text-gray-500">Policies</div>
                </div>
                <div>
                  <div className="text-orange-500 text-lg font-bold">2</div>
                  <div className="text-xs text-gray-500">Quotes</div>
                </div>
                <div>
                  <div className="text-blue-500 text-lg font-bold">50.0%</div>
                  <div className="text-xs text-gray-500">Conversion</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Coverage Status Widget */}
        {widgets.find(w => w.id === 'coverage_status')?.visible && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <IconChartBar size={20} className="text-blue-500" />
                  Coverage Status
                </h3>
                <p className="text-sm text-gray-500">Coverage status distribution by time period</p>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <IconRefresh size={18} />
                </button>
              </div>
            </div>
            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Select Affiliate Organization</label>
                <select className="w-full text-sm border-gray-200 rounded-lg bg-gray-50 p-2 outline-none">
                  <option>All System</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Time Period</label>
                <select className="w-full text-sm border-gray-200 rounded-lg bg-gray-50 p-2 outline-none">
                  <option>30 Days</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-center font-semibold text-gray-700 mb-6">Coverage Status (Last 30 days)</h4>
              {/* Bar Chart Mockup */}
              <div className="h-64 flex items-end justify-center gap-4 sm:gap-8 md:gap-16 px-4 sm:px-8 relative border-b border-gray-200 pb-0">
                {/* Background grid lines could go here */}
                <div className="text-center w-16">
                  <div className="h-0 w-full bg-blue-100 rounded-t mb-0"></div>
                  <span className="text-xs text-gray-500 block mt-2">0</span>
                  <span className="text-xs text-gray-400 block mt-1">Pending</span>
                </div>
                <div className="text-center w-16">
                  <span className="text-xs mb-1 block font-bold">1</span>
                  <div className="h-48 w-full bg-[#1E88E5] rounded-t mb-0"></div>
                  <span className="text-xs text-gray-500 block mt-2">0</span> {/* Label is 0? Screenshot shows 1 bar */}
                  <span className="text-xs text-gray-400 block mt-1">Payment Completed</span>
                </div>
                <div className="text-center w-16">
                  <div className="h-0 w-full bg-blue-100 rounded-t mb-0"></div>
                  <span className="text-xs text-gray-500 block mt-2">0</span>
                  <span className="text-xs text-gray-400 block mt-1">Cancelled</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Dialog */}
      <DashboardSettings
        open={showSettings}
        onClose={() => setShowSettings(false)}
        widgets={widgets}
        toggleWidget={toggleWidget}
      />
    </div>
  );
}
