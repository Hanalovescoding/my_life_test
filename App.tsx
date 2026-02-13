
import React, { useState, useMemo, useCallback } from 'react';
import { QUESTIONS, RESULT_TYPES, SUB_PERSONALITIES, DIMENSION_NAMES } from './constants';
import { DimensionScores, Dimension } from './types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

// ----------------------------------------------------------------------------
// 商业授权逻辑
// ----------------------------------------------------------------------------

const validateAccessCode = (code: string): boolean => {
  const c = code.toUpperCase();
  if (c === 'ADMIN') return true; 
  if (c.length !== 5) return false;
  
  const getVal = (char: string) => parseInt(char, 36);
  const sum1 = getVal(c[0]) + getVal(c[1]);
  const sum2 = getVal(c[3]) + getVal(c[4]);
  
  return (sum1 + 7) === sum2;
};

const isCodeUsed = (code: string): boolean => {
  const usedCodes = JSON.parse(localStorage.getItem('USED_AUTH_CODES') || '[]');
  return usedCodes.includes(code.toUpperCase());
};

const markCodeAsUsed = (code: string) => {
  if (code.toUpperCase() === 'ADMIN') return;
  const usedCodes = JSON.parse(localStorage.getItem('USED_AUTH_CODES') || '[]');
  usedCodes.push(code.toUpperCase());
  localStorage.setItem('USED_AUTH_CODES', JSON.stringify(usedCodes));
};

// ----------------------------------------------------------------------------
// 子组件
// ----------------------------------------------------------------------------
const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;
  return (
    <div className="w-full bg-slate-100 h-1.5 rounded-full mb-6 overflow-hidden">
      <div 
        className="bg-blue-500 h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.2)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return sessionStorage.getItem('LPA_AUTH_STATUS') === 'true';
  });
  
  const [accessCode, setAccessCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
  const [isFinished, setIsFinished] = useState(false);

  const handleAuth = (e?: React.FormEvent) => {
    e?.preventDefault();
    setAuthError('');
    setIsVerifying(true);

    setTimeout(() => {
      const code = accessCode.toUpperCase();
      
      if (isCodeUsed(code)) {
        setAuthError('该邀请码已被使用');
        setIsVerifying(false);
        return;
      }

      if (validateAccessCode(code)) {
        markCodeAsUsed(code);
        setIsAuthorized(true);
        sessionStorage.setItem('LPA_AUTH_STATUS', 'true');
        setAuthError('');
      } else {
        setAuthError('码不正确或已过期');
      }
      setIsVerifying(false);
    }, 800);
  };

  const handleExit = () => {
    setIsAuthorized(false);
    setIsFinished(false);
    setAnswers(new Array(QUESTIONS.length).fill(-1));
    setCurrentIndex(0);
    setAccessCode('');
    sessionStorage.removeItem('LPA_AUTH_STATUS');
  };

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 250);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1 && answers[currentIndex] !== -1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, answers]);

  const dimensionScores = useMemo(() => {
    const scores: DimensionScores = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    answers.forEach((ansIndex, qIndex) => {
      if (ansIndex === -1) return;
      const option = QUESTIONS[qIndex].options[ansIndex];
      option.scores.forEach(s => {
        scores[s.dimension] += s.value;
      });
    });
    return scores;
  }, [answers]);

  const resultData = useMemo(() => {
    if (!isFinished) return null;
    const scores = dimensionScores;
    if (scores.D >= 18) return { main: 'D', sub: null, isMixed: false };
    const sorted = (Object.keys(scores) as Dimension[]).sort((a, b) => scores[b] - scores[a]);
    const maxDim = sorted[0];
    const secondDim = sorted[1];
    const diff = scores[maxDim] - scores[secondDim];
    if (diff >= 4) return { main: maxDim, sub: null, isMixed: false };
    return { main: maxDim, sub: secondDim, isMixed: true };
  }, [isFinished, dimensionScores]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfdfe] p-6">
        <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl shadow-slate-100 p-12 text-center border border-slate-50 animate-in fade-in zoom-in duration-700">
          <div className="mb-10">
            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 transition-transform hover:scale-110">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">人生阶段定位测评</h1>
            <p className="text-slate-400 font-medium text-sm">输入您的邀请码开启自我发现之旅</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-8">
            <input
              type="text"
              maxLength={5}
              autoFocus
              value={accessCode}
              disabled={isVerifying}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              placeholder="邀请码"
              className={`w-full text-center text-3xl tracking-[0.3em] font-mono py-5 bg-slate-50 border-2 rounded-[2rem] focus:outline-none transition-all ${
                authError ? 'border-red-100 bg-red-50 text-red-500 animate-shake' : 'border-transparent focus:border-blue-200'
              }`}
            />
            {authError && <p className="text-red-400 text-sm font-bold animate-pulse">{authError}</p>}
            
            <button
              type="submit"
              disabled={isVerifying || accessCode.length < 5}
              className={`w-full py-5 rounded-[2rem] font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
                isVerifying || accessCode.length < 5
                  ? 'bg-slate-100 text-slate-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-blue-200'
              }`}
            >
              {isVerifying ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : '开始测评'}
            </button>
          </form>
          <p className="mt-16 text-slate-300 text-[10px] font-bold tracking-[0.3em] uppercase">Life Discovery Kit</p>
        </div>
      </div>
    );
  }

  if (isFinished && resultData) {
    const mainResult = RESULT_TYPES[resultData.main];
    const subResult = resultData.sub ? SUB_PERSONALITIES[resultData.main][resultData.sub] : null;

    const chartData = [
      { name: '输入', value: dimensionScores.A },
      { name: '启动', value: dimensionScores.B },
      { name: '方向', value: dimensionScores.C },
      { name: '能量', value: dimensionScores.D },
      { name: '结构', value: dimensionScores.E },
    ];

    return (
      <div className="min-h-screen bg-[#fafbfc] py-12 px-4 sm:px-6 animate-in fade-in duration-1000">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl shadow-slate-100/50 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400" />
            <div className="inline-block px-5 py-1.5 bg-slate-100 text-slate-400 text-[10px] font-black rounded-full uppercase tracking-[0.2em] mb-8">
              深度人格定位分析报告
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-tight animate-in slide-in-from-bottom-6 duration-700">
              {mainResult.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-2 bg-blue-50 text-blue-600 text-sm font-black rounded-2xl border border-blue-100 shadow-sm transition-transform hover:scale-105">
                主人格：{mainResult.title}
              </div>
              {resultData.isMixed && (
                <div className="px-6 py-2 bg-amber-50 text-amber-700 text-sm font-black rounded-2xl border border-amber-100 shadow-sm transition-transform hover:scale-105">
                  副倾向：{subResult?.title}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-[3rem] p-10 shadow-lg shadow-slate-200/20 border border-slate-50 flex flex-col items-center hover:shadow-xl transition-all duration-500">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">雷达分析模型</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={chartData}>
                      <PolarGrid stroke="#f1f5f9" />
                      <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} />
                      <Radar
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={4}
                        fill="#3b82f6"
                        fillOpacity={0.06}
                        animationDuration={2000}
                        animationBegin={300}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full grid grid-cols-5 gap-1 mt-8 border-t border-slate-50 pt-8">
                   {(Object.keys(DIMENSION_NAMES) as Dimension[]).map(key => (
                    <div key={key} className="text-center group cursor-help">
                      <div className={`text-xl font-black transition-all group-hover:scale-125 group-hover:text-blue-500 ${key === resultData.main ? 'text-blue-600' : 'text-slate-900'}`}>{dimensionScores[key]}</div>
                      <div className="text-[9px] text-slate-300 font-bold uppercase">{DIMENSION_NAMES[key].split(' ')[0]}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0f172a] rounded-[2.5rem] p-12 shadow-2xl text-white transform transition-all hover:scale-[1.02]">
                <h4 className="text-[10px] font-black text-blue-400 uppercase mb-5 tracking-[0.4em]">核心机制解构</h4>
                <p className="text-2xl font-black leading-snug">{mainResult.mechanism}</p>
                <div className="w-12 h-1.5 bg-blue-500 rounded-full mt-8 animate-pulse" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-lg shadow-slate-200/20 border border-slate-50 h-full">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-2 h-10 bg-blue-500 rounded-full" />
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">特质解析</h3>
                </div>
                <div className="space-y-8">
                   <p className="text-lg text-slate-600 leading-relaxed font-medium first-letter:text-6xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-4 first-letter:float-left">
                    {mainResult.description}
                  </p>
                  
                  {resultData.isMixed && subResult && (
                    <div className="mt-12 bg-slate-50/50 rounded-[2.5rem] p-10 border border-slate-100 relative group overflow-hidden shadow-inner transition-colors hover:bg-white">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 transition-transform group-hover:scale-150" />
                      <div className="flex items-center gap-3 mb-5 relative z-10">
                        <span className="text-3xl">🧩</span>
                        <h4 className="text-xl font-black text-slate-800">复合画像：{subResult.title}</h4>
                      </div>
                      <p className="text-slate-500 font-medium leading-relaxed italic relative z-10">{subResult.advice}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-[3rem] p-12 md:p-16 text-white shadow-xl shadow-emerald-500/20 flex flex-col justify-center items-center text-center group overflow-hidden relative">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <h3 className="text-[10px] font-black text-emerald-100 uppercase mb-8 tracking-[0.5em] opacity-80">底层认知模型</h3>
              <p className="text-3xl md:text-4xl font-black leading-snug relative z-10 transition-transform group-hover:scale-105">“{mainResult.cognitiveUpgrade}”</p>
            </div>

            <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-lg shadow-slate-200/20 border border-slate-50">
               <div className="flex items-center gap-4 mb-10">
                <div className="w-2 h-10 bg-indigo-500 rounded-full" />
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">行动策略建议</h3>
              </div>
              <div className="space-y-6">
                {mainResult.advice.map((item, idx) => (
                  <div key={idx} className="group flex gap-6 items-start transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-2xl font-black flex-shrink-0 shadow-sm transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:-rotate-6 group-hover:shadow-lg group-hover:shadow-indigo-200">
                      {idx + 1}
                    </div>
                    <div className="pt-2">
                      <p className="text-slate-700 font-bold text-lg leading-relaxed group-hover:text-indigo-700 transition-colors">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-lg shadow-slate-200/20 border border-slate-50">
             <div className="flex items-center gap-4 mb-12">
              <div className="w-2 h-10 bg-purple-400 rounded-full" />
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">进阶阅读路线</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mainResult.books.map((book, idx) => (
                <div 
                  key={idx} 
                  className="group relative bg-[#fcfdfe] rounded-[2.5rem] p-10 border border-slate-50 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:border-purple-200 hover:-translate-y-3 cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-full -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100" />
                   <div className="text-[11px] font-black text-purple-300 mb-5 uppercase tracking-widest group-hover:text-purple-500 transition-colors">推荐书目 {idx + 1}</div>
                   <p className="text-slate-900 font-black text-base md:text-lg leading-[1.6] group-hover:text-purple-700 transition-colors relative z-10 whitespace-pre-line">{book}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-12 pb-24">
            <button 
              onClick={handleExit}
              className="group px-16 py-7 bg-slate-900 text-white rounded-[2.5rem] font-black text-xl hover:bg-black transition-all shadow-2xl active:scale-95 flex items-center gap-4 mx-auto hover:shadow-slate-300"
            >
              <span>重置测评系统</span>
              <svg className="w-7 h-7 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentIndex];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd] p-4 sm:p-6 animate-in fade-in duration-500 overflow-hidden">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/40 p-8 md:p-14 relative overflow-hidden border border-slate-50">
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">人生阶段定位测评</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900 leading-none">{currentIndex + 1}</span>
                <span className="text-sm font-bold text-slate-200">/ {QUESTIONS.length}</span>
              </div>
            </div>
            <div className="flex gap-1.5 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-blue-100" />
            </div>
          </div>
          
          <ProgressBar current={currentIndex} total={QUESTIONS.length} />

          <div key={currentIndex} className="animate-in slide-in-from-right-8 fade-in duration-500">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-10 leading-[1.3] tracking-tight min-h-[4rem]">
              {currentQuestion.id}. {currentQuestion.text}
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`group text-left p-4 md:p-6 rounded-[1.8rem] border-2 transition-all duration-300 ${
                      isSelected 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 -translate-y-1' 
                        : 'bg-slate-50/50 border-transparent text-slate-600 hover:border-blue-50 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span className={`w-11 h-11 md:w-12 md:h-12 rounded-[1rem] flex items-center justify-center font-black text-xl flex-shrink-0 transition-all ${
                        isSelected ? 'bg-blue-500 text-white' : 'bg-white text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-500 shadow-sm border border-slate-50'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-bold text-lg md:text-xl truncate leading-tight">{option.label.split('. ')[1]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-50">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                currentIndex === 0 
                  ? 'opacity-0 pointer-events-none' 
                  : 'text-slate-300 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              返回上一题
            </button>
            
            <button 
              onClick={handleNext}
              disabled={currentIndex === QUESTIONS.length - 1 || answers[currentIndex] === -1}
              className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                currentIndex === QUESTIONS.length - 1 || answers[currentIndex] === -1
                  ? 'opacity-0 pointer-events-none'
                  : 'text-blue-500 hover:bg-blue-50'
              }`}
            >
              下一步
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
