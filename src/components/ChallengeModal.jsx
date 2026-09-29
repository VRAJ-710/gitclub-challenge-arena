import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Terminal, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Lightbulb, 
  FileCode, 
  Clock, 
  Zap, 
  Copy, 
  RotateCcw,
  Check,
  Send,
  Loader2,
  AlertTriangle,
  Award
} from 'lucide-react';
import { sounds } from '../services/soundEffects';

export function ChallengeModal({ challenge, isCompleted, onClose, onComplete }) {
  const [activeTab, setActiveTab] = useState('workspace'); // 'details' | 'workspace' | 'tests'
  const [activeFileName, setActiveFileName] = useState('');
  const [fileContents, setFileContents] = useState({});
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([]);
  
  // Test Runner States
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [testsPassedAll, setTestsPassedAll] = useState(isCompleted);
  const [showCelebration, setShowCelebration] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const terminalEndRef = useRef(null);

  // Initialize files and terminal logs on mount
  useEffect(() => {
    if (challenge) {
      const files = { ...challenge.initialFiles };
      setFileContents(files);
      const firstFile = Object.keys(files)[0] || '';
      setActiveFileName(firstFile);

      setTerminalLogs([
        { type: 'system', text: `Git Club CHARUSAT Sandbox initialized.` },
        { type: 'system', text: `Repository: https://github.com/gitclub-charusat/${challenge.slug}.git` },
        { type: 'system', text: `Branch: feature/challenge-${challenge.id} (HEAD)` },
        { type: 'output', text: `Type 'git status' or any git command below. You can also edit ${firstFile} directly.` }
      ]);
    }
  }, [challenge]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  if (!challenge) return null;

  // Handle running simulated git commands
  const handleRunCommand = (cmdToRun) => {
    const cmd = (cmdToRun || terminalInput).trim();
    if (!cmd) return;

    sounds.key();
    const newLogs = [...terminalLogs, { type: 'prompt', text: `$ ${cmd}` }];

    if (cmd === 'git status') {
      newLogs.push({
        type: 'output',
        text: `On branch feature/challenge-${challenge.id}\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n\tmodified:   ${activeFileName}\n\nno changes added to commit (use "git add")`
      });
    } else if (cmd.startsWith('git add')) {
      newLogs.push({
        type: 'output',
        text: `Staged changes for ${activeFileName}. Ready for commit.`
      });
    } else if (cmd.startsWith('git commit')) {
      newLogs.push({
        type: 'success',
        text: `[feature/challenge-${challenge.id} 7f83a1c] ${cmd.replace(/git commit -m\s*"?/, '').replace(/"?$/, '')}\n 1 file changed, 12 insertions(+), 8 deletions(-)`
      });
    } else if (cmd.startsWith('git rebase') || cmd.startsWith('git merge')) {
      newLogs.push({
        type: 'output',
        text: `Simulating commit tree operation... Auto-merging ${activeFileName}\nMerge operation completed without syntax conflicts.`
      });
    } else if (cmd === 'git log' || cmd.startsWith('git log')) {
      newLogs.push({
        type: 'output',
        text: `* 7f83a1c (HEAD -> main) resolve: latest challenge commit\n* 3a10b42 Initial problem scaffold\n* 1e998a1 CHARUSAT Git Club Core init`
      });
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else {
      newLogs.push({
        type: 'output',
        text: `Executed: ${cmd}\nCommand simulated successfully in CHARUSAT sandbox.`
      });
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  // Quick command click
  const handleQuickCommand = (cmd) => {
    sounds.click();
    handleRunCommand(cmd);
  };

  // Load solution into editor for fast demoing
  const handleLoadSolution = () => {
    sounds.click();
    if (challenge.solutionExample) {
      setFileContents(prev => ({
        ...prev,
        [activeFileName]: challenge.solutionExample
      }));
      setTerminalLogs(prev => [
        ...prev,
        { type: 'system', text: `[DEMO MODE] Loaded verified reference solution into ${activeFileName}. Ready to run test runner.` }
      ]);
    }
  };

  // Run Test Suite Runner
  const handleRunTests = async () => {
    sounds.click();
    setIsRunningTests(true);
    setActiveTab('tests');
    setTestResults([]);

    const content = fileContents[activeFileName] || '';
    const results = [];
    let allPassed = true;

    for (let i = 0; i < challenge.tests.length; i++) {
      const test = challenge.tests[i];
      // Simulate asynchronous execution delay
      await new Promise(r => setTimeout(r, 450));

      let passed = false;
      try {
        passed = test.validate(content);
      } catch (err) {
        passed = false;
      }

      if (passed) {
        sounds.check();
      } else {
        sounds.error();
        allPassed = false;
      }

      results.push({
        id: test.id,
        name: test.name,
        passed: passed
      });
      setTestResults([...results]);
    }

    setIsRunningTests(false);
    setTestsPassedAll(allPassed);

    if (allPassed) {
      // Trigger confetti & victory sound
      sounds.victory();
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#10B981', '#F05032', '#F59E0B']
      });

      setShowCelebration(true);
      onComplete(challenge.id, challenge.xp);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0D121F] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-[#0A0D14]/90">
          <div className="flex items-center space-x-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Terminal className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {challenge.title}
                </h2>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {challenge.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                XP: <span className="text-purple-400 font-semibold">+{challenge.xp}</span> • Est: {challenge.timeEst} • ID: {challenge.id}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Demo Fill button */}
            <button
              onClick={handleLoadSolution}
              title="Autofill verified reference solution to demo testing"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Demo Auto-Solve</span>
            </button>

            <button
              onClick={() => {
                sounds.click();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between px-5 border-b border-slate-800/80 bg-[#0A0D14]/50">
          <div className="flex space-x-1">
            <button
              onClick={() => {
                sounds.click();
                setActiveTab('details');
              }}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'details'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Problem Spec & Rules
            </button>
            <button
              onClick={() => {
                sounds.click();
                setActiveTab('workspace');
              }}
              className={`flex items-center space-x-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'workspace'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Interactive Code & Terminal</span>
            </button>
            <button
              onClick={() => {
                sounds.click();
                setActiveTab('tests');
              }}
              className={`flex items-center space-x-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'tests'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Test Runner ({testResults.filter(t => t.passed).length}/{challenge.tests.length})</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-2 py-1.5">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center space-x-1 px-2.5 py-1 text-xs text-amber-400 hover:bg-amber-400/10 rounded-md transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHints ? 'Hide Hints' : 'Hints (3)'}</span>
            </button>
          </div>
        </div>

        {/* Hints Banner if toggled */}
        {showHints && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-5 py-2.5 text-xs text-amber-200">
            <div className="font-semibold mb-1 flex items-center space-x-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Mentor Hints from Git Club:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-300">
              {challenge.hints.map((hint, idx) => (
                <li key={idx}>{hint}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal Main Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* TAB 1: Problem Details */}
          {activeTab === 'details' && (
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-xs uppercase font-mono tracking-wider text-purple-400 font-bold mb-2">Overview</h4>
                <p className="text-slate-200">{challenge.summary}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 whitespace-pre-line font-sans">
                {challenge.description}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    sounds.click();
                    setActiveTab('workspace');
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center space-x-2"
                >
                  <span>Open Code & Terminal Workspace</span>
                  <Terminal className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Interactive Code & Terminal Workspace */}
          {activeTab === 'workspace' && (
            <div className="space-y-4">
              
              {/* File Editor Window */}
              <div className="rounded-xl border border-slate-800 bg-[#080B12] overflow-hidden shadow-inner">
                {/* File Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/80">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="text-xs font-mono text-slate-300 ml-2 font-semibold">
                      {activeFileName}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(fileContents[activeFileName] || '')}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded text-[11px] font-mono text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => {
                        sounds.click();
                        setFileContents({ ...challenge.initialFiles });
                      }}
                      title="Reset File"
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Editor Textarea */}
                <div className="relative">
                  <textarea
                    value={fileContents[activeFileName] || ''}
                    onChange={(e) => {
                      sounds.key();
                      setFileContents({
                        ...fileContents,
                        [activeFileName]: e.target.value
                      });
                    }}
                    rows={9}
                    spellCheck="false"
                    className="w-full bg-[#080B12] text-slate-100 font-mono text-xs sm:text-sm p-4 focus:outline-none resize-none leading-relaxed border-none selection:bg-purple-600/40"
                    placeholder="// Edit and solve the challenge here..."
                  />
                </div>
              </div>

              {/* Quick Git Commands Bar */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                <span className="text-[11px] font-mono uppercase text-slate-500 whitespace-nowrap">Suggested:</span>
                {challenge.suggestedCommands.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleQuickCommand(cmd)}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-[11px] font-mono text-purple-300 whitespace-nowrap transition-colors"
                  >
                    $ {cmd}
                  </button>
                ))}
              </div>

              {/* Simulated Git Terminal Window */}
              <div className="rounded-xl border border-slate-800 bg-[#07090F] overflow-hidden">
                <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-slate-800/80 bg-slate-900/60 text-xs font-mono text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <Terminal className="w-3.5 h-3.5 text-purple-400" />
                    <span>CHARUSAT Git Terminal (Sandbox)</span>
                  </div>
                  <button 
                    onClick={() => setTerminalLogs([])}
                    className="text-[10px] text-slate-500 hover:text-slate-300"
                  >
                    clear
                  </button>
                </div>

                {/* Terminal Output Screen */}
                <div className="p-3.5 h-36 overflow-y-auto font-mono text-xs space-y-1.5 bg-[#06080E]">
                  {terminalLogs.map((log, index) => (
                    <div key={index} className="leading-relaxed">
                      {log.type === 'system' && (
                        <div className="text-slate-500 text-[11px]">[SYSTEM] {log.text}</div>
                      )}
                      {log.type === 'prompt' && (
                        <div className="text-emerald-400 font-semibold">{log.text}</div>
                      )}
                      {log.type === 'output' && (
                        <div className="text-slate-300 whitespace-pre-wrap">{log.text}</div>
                      )}
                      {log.type === 'success' && (
                        <div className="text-purple-300 whitespace-pre-wrap bg-purple-950/20 p-1.5 rounded border border-purple-900/40">{log.text}</div>
                      )}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* Terminal Input Row */}
                <div className="flex items-center px-3 py-2 bg-slate-900/90 border-t border-slate-800 font-mono text-xs">
                  <span className="text-[#F05032] font-bold mr-2">gitclub@charusat:~$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRunCommand();
                    }}
                    placeholder="Type git command (e.g. git add ., git commit -m 'resolve') or press Enter"
                    className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600"
                  />
                  <button
                    onClick={() => handleRunCommand()}
                    className="p-1 text-slate-400 hover:text-purple-400"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Test Runner Panel */}
          {activeTab === 'tests' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Automated Test Suites & AST Linter</h4>
                  <p className="text-xs text-slate-400">Verifying code syntax, commit graph integrity, and edge case specifications.</p>
                </div>

                <button
                  onClick={handleRunTests}
                  disabled={isRunningTests}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30 disabled:opacity-50"
                >
                  {isRunningTests ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Running Suites...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>Run All Tests</span>
                    </>
                  )}
                </button>
              </div>

              {/* Test Cases List */}
              <div className="space-y-2.5">
                {challenge.tests.map((test, index) => {
                  const result = testResults.find(r => r.id === test.id);
                  return (
                    <div 
                      key={test.id} 
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                        result?.passed 
                          ? 'bg-emerald-950/20 border-emerald-500/30' 
                          : result && !result.passed 
                            ? 'bg-rose-950/20 border-rose-500/30'
                            : 'bg-slate-900/40 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {result?.passed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : result && !result.passed ? (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        ) : (
                          <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-500">
                            {index + 1}
                          </span>
                        )}
                        <div>
                          <span className="text-xs font-mono text-slate-200">{test.name}</span>
                          {result && !result.passed && (
                            <p className="text-[11px] text-rose-400 mt-0.5">Assertion failed: Check syntax markers and requirements.</p>
                          )}
                        </div>
                      </div>

                      <span className="text-[11px] font-mono font-semibold text-slate-400">
                        {result?.passed ? 'PASSED' : result && !result.passed ? 'FAILED' : 'PENDING'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Success Celebration Alert */}
              {testsPassedAll && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900/30 via-emerald-900/30 to-slate-900 border border-emerald-500/40 flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center space-x-3">
                    <span className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Challenge Solved Successfully! 🎉</h4>
                      <p className="text-xs text-emerald-300 font-mono">
                        +{challenge.xp} XP credited to your profile • Leaderboard position updated!
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sounds.click();
                      onClose();
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    Done
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer Actions Row */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800 bg-[#0A0D14]/90">
          <div className="text-xs text-slate-400 font-mono flex items-center space-x-2">
            <span>Branch:</span>
            <span className="text-purple-400 font-bold">feature/challenge-{challenge.id}</span>
          </div>

          <div className="flex items-center space-x-3">
            {activeTab !== 'tests' ? (
              <button
                onClick={handleRunTests}
                disabled={isRunningTests}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Run & Test Solution</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  sounds.click();
                  setActiveTab('workspace');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700"
              >
                Back to Code Editor
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
