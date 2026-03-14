import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Users, Wrench, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  subscription_status: string;
  onboarding_completed: boolean;
  created_at: string;
}

interface Tool {
  id: string;
  slug: string;
  title_en: string;
  access_level: string;
  is_active: boolean;
}

interface ScenarioStats {
  tool_id: string;
  tool_slug: string;
  tool_title: string;
  count: number;
}

const AdminDashboard: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [totalScenarios, setTotalScenarios] = useState(0);
  const [scenariosByTool, setScenariosByTool] = useState<ScenarioStats[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    users: true,
    tools: true,
    scenarios: true,
  });

  useEffect(() => {
    if (!profile) return;

    if (!profile.is_admin) {
      navigate('/dashboard');
      return;
    }

    fetchAdminData();
  }, [profile, navigate]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [profilesRes, toolsRes, scenariosRes, scenarioStatsRes] = await Promise.all([
        supabase
          .from('profiles')
          .select('id, email, full_name, subscription_status, onboarding_completed, created_at')
          .order('created_at', { ascending: false }),
        supabase
          .from('tools')
          .select('id, slug, title_en, access_level, is_active')
          .order('sort_order'),
        supabase
          .from('calculator_scenarios')
          .select('id', { count: 'exact', head: true }),
        supabase
          .from('calculator_scenarios')
          .select('tool_id, tools!inner(slug, title_en)')
      ]);

      if (profilesRes.data) setProfiles(profilesRes.data);
      if (toolsRes.data) setTools(toolsRes.data);
      if (scenariosRes.count !== null) setTotalScenarios(scenariosRes.count);

      if (scenarioStatsRes.data) {
        const statsMap = new Map<string, ScenarioStats>();
        scenarioStatsRes.data.forEach((item: any) => {
          const toolId = item.tool_id;
          const toolSlug = item.tools.slug;
          const toolTitle = item.tools.title_en;

          if (!statsMap.has(toolId)) {
            statsMap.set(toolId, {
              tool_id: toolId,
              tool_slug: toolSlug,
              tool_title: toolTitle,
              count: 0,
            });
          }
          statsMap.get(toolId)!.count += 1;
        });

        setScenariosByTool(Array.from(statsMap.values()).sort((a, b) => b.count - a.count));
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleToolActive = async (toolId: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('tools')
        .update({ is_active: !currentValue })
        .eq('id', toolId);

      if (!error) {
        setTools(tools.map(tool =>
          tool.id === toolId ? { ...tool, is_active: !currentValue } : tool
        ));
      }
    } catch (error) {
      console.error('Error updating tool active status:', error);
    }
  };

  const toggleToolAccessLevel = async (toolId: string, currentLevel: string) => {
    const newLevel = currentLevel === 'free' ? 'premium' : 'free';
    try {
      const { error } = await supabase
        .from('tools')
        .update({ access_level: newLevel })
        .eq('id', toolId);

      if (!error) {
        setTools(tools.map(tool =>
          tool.id === toolId ? { ...tool, access_level: newLevel } : tool
        ));
      }
    } catch (error) {
      console.error('Error updating tool access level:', error);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage users, tools, and scenarios</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <button
            onClick={() => toggleSection('users')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-slate-900">Users</h2>
                <p className="text-slate-600">Total: {profiles.length}</p>
              </div>
            </div>
            {expandedSections.users ? (
              <ChevronUp className="w-6 h-6 text-slate-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-slate-400" />
            )}
          </button>

          {expandedSections.users && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Full Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Subscription</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Onboarding</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((profile) => (
                    <tr key={profile.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-slate-900">{profile.email}</td>
                      <td className="py-3 px-4 text-slate-700">{profile.full_name || '-'}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          profile.subscription_status === 'premium'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {profile.subscription_status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          profile.onboarding_completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {profile.onboarding_completed ? 'Complete' : 'Incomplete'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-sm">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <button
            onClick={() => toggleSection('tools')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-slate-900">Tools</h2>
                <p className="text-slate-600">Total: {tools.length}</p>
              </div>
            </div>
            {expandedSections.tools ? (
              <ChevronUp className="w-6 h-6 text-slate-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-slate-400" />
            )}
          </button>

          {expandedSections.tools && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <div key={tool.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <h3 className="font-semibold text-slate-900 mb-2">{tool.title_en}</h3>
                  <p className="text-sm text-slate-600 mb-3">Slug: {tool.slug}</p>

                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => toggleToolActive(tool.id, tool.is_active)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        tool.is_active
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tool.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  <button
                    onClick={() => toggleToolAccessLevel(tool.id, tool.access_level)}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      tool.access_level === 'premium'
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tool.access_level === 'premium' ? 'Premium' : 'Free'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <button
            onClick={() => toggleSection('scenarios')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-slate-900">Scenarios</h2>
                <p className="text-slate-600">Total: {totalScenarios}</p>
              </div>
            </div>
            {expandedSections.scenarios ? (
              <ChevronUp className="w-6 h-6 text-slate-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-slate-400" />
            )}
          </button>

          {expandedSections.scenarios && (
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 mb-3">Scenarios by Tool</h3>
              {scenariosByTool.length === 0 ? (
                <p className="text-slate-600">No scenarios yet</p>
              ) : (
                scenariosByTool.map((stat) => (
                  <div key={stat.tool_id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{stat.tool_title}</p>
                      <p className="text-sm text-slate-600">{stat.tool_slug}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{stat.count}</p>
                      <p className="text-xs text-slate-600">scenarios</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
