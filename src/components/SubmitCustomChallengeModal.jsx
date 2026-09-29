import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, Code, Terminal, FileCode, Check } from 'lucide-react';
import { sounds } from '../services/soundEffects';

export function SubmitCustomChallengeModal({ onClose, onAddChallenge }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Git & GitHub',
    difficulty: 'Medium',
    xp: 150,
    timeEst: '15 mins',
    summary: '',
    description: '',
    author: 'Community Solver',
    initialCode: '// Solution starter template\n',
    testName: 'Passes main condition assertion'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.summary) return;

    sounds.victory();

    const newChallenge = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: formData.category,
      difficulty: formData.difficulty,
      xp: Number(formData.xp) || 100,
      timeEst: formData.timeEst,
      solvedCount: 0,
      tags: [formData.category.toLowerCase().replace(/\s+/g, '-'), "community-contributed"],
      author: formData.author,
      summary: formData.summary,
      description: formData.description || `### Objective\n${formData.summary}`,
      hints: ["Read the problem carefully.", "Test your solution step by step."],
      initialFiles: {
        "solution.js": formData.initialCode
      },
      solutionExample: formData.initialCode + "\n// Solution completed",
      suggestedCommands: ["git status", "git commit -m 'resolve challenge'"],
      tests: [
        {
          id: "t1",
          name: formData.testName || "Code includes non-empty solution",
          validate: (content) => content.trim().length > 15
        }
      ]
    };

    onAddChallenge(newChallenge);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D121F] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#0A0D14]/90">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <PlusCircle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-lg text-white">Propose a Community Challenge</h3>
              <p className="text-xs text-slate-400 font-mono">Create and publish an interactive challenge to the arena</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.click();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Challenge Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Stash Stash Stash - Navigating Uncommitted Work"
              className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Git & GitHub">Git & GitHub</option>
                <option value="Frontend">Frontend</option>
                <option value="Algorithmic">Algorithmic</option>
                <option value="System Design">System Design</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Easy">Easy (100 XP)</option>
                <option value="Medium">Medium (150 XP)</option>
                <option value="Hard">Hard (250 XP)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">XP Reward</label>
              <input
                type="number"
                value={formData.xp}
                onChange={(e) => setFormData({ ...formData, xp: e.target.value })}
                className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Short Summary</label>
            <input
              type="text"
              required
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Brief 1-sentence synopsis of what the participant has to accomplish"
              className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Detailed Description & Context</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Explain the background context, problem requirements, and edge case rules..."
              className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Starter Code Template</label>
            <textarea
              rows={3}
              value={formData.initialCode}
              onChange={(e) => setFormData({ ...formData, initialCode: e.target.value })}
              className="w-full bg-[#080B12] border border-slate-800 rounded-xl p-3 text-white font-mono focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Author Name / ID</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Your Name (e.g. 24CS084)"
                className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Primary Test Case Name</label>
              <input
                type="text"
                value={formData.testName}
                onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                placeholder="e.g. Solution matches correct regex assertion"
                className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                sounds.click();
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish to Arena</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
