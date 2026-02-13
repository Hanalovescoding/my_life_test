
import { Question, Dimension, ResultContent, SubPersonality } from './types';

export const DIMENSION_NAMES: Record<string, string> = {
  A: '输入依赖 (信息囤积)',
  B: '启动阻力 (高知低行)',
  C: '方向波动 (目标漂浮)',
  D: '能量枯竭 (精力透支)',
  E: '结构优化 (稳健前行)',
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "如果未来一年只能做一件事，你会：",
    options: [
      { label: "A. 还没想清楚", scores: [{ dimension: 'C', value: 2 }] },
      { label: "B. 有几个方向都不错", scores: [{ dimension: 'C', value: 2 }] },
      { label: "C. 已经有明确方向", scores: [{ dimension: 'E', value: 2 }] },
      { label: "D. 有规划但担心变数", scores: [{ dimension: 'B', value: 2 }] },
    ]
  },
  {
    id: 2,
    text: "当别人问你“你想要什么生活”时：",
    options: [
      { label: "A. 很难回答", scores: [{ dimension: 'C', value: 2 }] },
      { label: "B. 有模糊画面", scores: [{ dimension: 'C', value: 1 }, { dimension: 'A', value: 1 }] },
      { label: "C. 能清晰表达", scores: [{ dimension: 'E', value: 2 }] },
      { label: "D. 能拆解成步骤", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 3,
    text: "你最近的焦虑更多来自：",
    options: [
      { label: "A. 不知道方向", scores: [{ dimension: 'C', value: 2 }] },
      { label: "B. 选择太多", scores: [{ dimension: 'C', value: 2 }] },
      { label: "C. 执行压力", scores: [{ dimension: 'B', value: 2 }] },
      { label: "D. 精力不够", scores: [{ dimension: 'D', value: 3 }] },
    ]
  },
  {
    id: 4,
    text: "你换目标的频率：",
    options: [
      { label: "A. 很频繁", scores: [{ dimension: 'C', value: 3 }] },
      { label: "B. 偶尔", scores: [{ dimension: 'C', value: 1 }] },
      { label: "C. 基本稳定", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 很少改变", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 5,
    text: "你做决定时更依赖：",
    options: [
      { label: "A. 情绪感觉", scores: [{ dimension: 'C', value: 2 }] },
      { label: "B. 反复比较", scores: [{ dimension: 'C', value: 2 }] },
      { label: "C. 当前目标", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 长期逻辑", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 6,
    text: "当出现新机会时你通常：",
    options: [
      { label: "A. 容易被吸引", scores: [{ dimension: 'C', value: 2 }] },
      { label: "B. 会先研究很多", scores: [{ dimension: 'A', value: 2 }] },
      { label: "C. 看是否匹配目标", scores: [{ dimension: 'E', value: 2 }] },
      { label: "D. 担心会不会选错", scores: [{ dimension: 'B', value: 2 }] },
    ]
  },
  {
    id: 7,
    text: "当想到一件重要事情：",
    options: [
      { label: "A. 先拖一拖", scores: [{ dimension: 'B', value: 3 }] },
      { label: "B. 先查资料", scores: [{ dimension: 'A', value: 2 }] },
      { label: "C. 立刻开始", scores: [{ dimension: 'E', value: 2 }] },
      { label: "D. 先把计划写完", scores: [{ dimension: 'B', value: 2 }] },
    ]
  },
  {
    id: 8,
    text: "你更常：",
    options: [
      { label: "A. 想很多", scores: [{ dimension: 'B', value: 2 }] },
      { label: "B. 看很多", scores: [{ dimension: 'A', value: 2 }] },
      { label: "C. 做很多", scores: [{ dimension: 'E', value: 2 }] },
      { label: "D. 优化流程", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 9,
    text: "计划执行率：",
    options: [
      { label: "A. 很低", scores: [{ dimension: 'B', value: 2 }, { dimension: 'D', value: 1 }] },
      { label: "B. 一半左右", scores: [{ dimension: 'B', value: 2 }] },
      { label: "C. 比较高", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 非常稳定", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 10,
    text: "你对“开始”的感觉：",
    options: [
      { label: "A. 很难", scores: [{ dimension: 'B', value: 3 }] },
      { label: "B. 容易但坚持难", scores: [{ dimension: 'B', value: 2 }] },
      { label: "C. 容易", scores: [{ dimension: 'E', value: 2 }] },
      { label: "D. 需要确认结构", scores: [{ dimension: 'E', value: 1 }] },
    ]
  },
  {
    id: 11,
    text: "遇到困难时：",
    options: [
      { label: "A. 容易停下", scores: [{ dimension: 'B', value: 2 }] },
      { label: "B. 会犹豫很久", scores: [{ dimension: 'B', value: 2 }] },
      { label: "C. 继续推进", scores: [{ dimension: 'E', value: 2 }] },
      { label: "D. 调整策略", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 12,
    text: "你更像：",
    options: [
      { label: "A. 观察者", scores: [{ dimension: 'A', value: 1 }, { dimension: 'C', value: 1 }] },
      { label: "B. 学习者", scores: [{ dimension: 'A', value: 2 }] },
      { label: "C. 执行者", scores: [{ dimension: 'E', value: 2 }] },
      { label: "D. 设计者", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 13,
    text: "最近身体状态：",
    options: [
      { label: "A. 常疲惫", scores: [{ dimension: 'D', value: 3 }] },
      { label: "B. 波动大", scores: [{ dimension: 'D', value: 2 }] },
      { label: "C. 还不错", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 很稳定", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 14,
    text: "作息时间：",
    options: [
      { label: "A. 比较混乱", scores: [{ dimension: 'D', value: 3 }] },
      { label: "B. 偶尔熬夜", scores: [{ dimension: 'D', value: 2 }] },
      { label: "C. 相对规律", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 严格管理", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 15,
    text: "情绪恢复速度：",
    options: [
      { label: "A. 很慢", scores: [{ dimension: 'D', value: 2 }] },
      { label: "B. 一般", scores: [{ dimension: 'D', value: 1 }] },
      { label: "C. 较快", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 很快", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 16,
    text: "你最常说的口头禅：",
    options: [
      { label: "A. 我好累", scores: [{ dimension: 'D', value: 3 }] },
      { label: "B. 我有点乱", scores: [{ dimension: 'C', value: 2 }] },
      { label: "C. 我还可以", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 我可以更好", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 17,
    text: "休息时你更倾向于：",
    options: [
      { label: "A. 刷刷手机", scores: [{ dimension: 'A', value: 1 }, { dimension: 'D', value: 1 }] },
      { label: "B. 看感兴趣的内容", scores: [{ dimension: 'A', value: 2 }] },
      { label: "C. 彻底放空", scores: [{ dimension: 'D', value: 1 }] },
      { label: "D. 有计划地放松", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 18,
    text: "精力的主要来源：",
    options: [
      { label: "A. 情绪波动", scores: [{ dimension: 'D', value: 2 }] },
      { label: "B. 外界刺激", scores: [{ dimension: 'A', value: 2 }] },
      { label: "C. 目标驱动", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 系统稳定运行", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 19,
    text: "你收藏夹里的内容：",
    options: [
      { label: "A. 挺多的", scores: [{ dimension: 'A', value: 2 }] },
      { label: "B. 非常多", scores: [{ dimension: 'A', value: 3 }] },
      { label: "C. 适中", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 很少", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 20,
    text: "看完书或课之后：",
    options: [
      { label: "A. 很少有行动", scores: [{ dimension: 'A', value: 2 }] },
      { label: "B. 记了很多笔记", scores: [{ dimension: 'A', value: 2 }] },
      { label: "C. 尝试去实践", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 建立起知识系统", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 21,
    text: "是否经常感觉信息过载：",
    options: [
      { label: "A. 经常", scores: [{ dimension: 'A', value: 3 }] },
      { label: "B. 偶尔", scores: [{ dimension: 'A', value: 1 }] },
      { label: "C. 有筛选标准", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 主动过滤筛选", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 22,
    text: "你更偏向的学习方式：",
    options: [
      { label: "A. 持续输入", scores: [{ dimension: 'A', value: 2 }] },
      { label: "B. 参与讨论", scores: [{ dimension: 'C', value: 1 }] },
      { label: "C. 实践输出", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 构建系统框架", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 23,
    text: "当不同观点冲突时：",
    options: [
      { label: "A. 更加焦虑", scores: [{ dimension: 'A', value: 1 }, { dimension: 'C', value: 1 }] },
      { label: "B. 更加犹豫", scores: [{ dimension: 'C', value: 2 }] },
      { label: "C. 选一个去尝试", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 建立判断标准", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 24,
    text: "你对知识的态度：",
    options: [
      { label: "A. 渴望拥有", scores: [{ dimension: 'A', value: 2 }] },
      { label: "B. 渴望理解", scores: [{ dimension: 'A', value: 1 }] },
      { label: "C. 渴望应用", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 渴望整合", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 25,
    text: "你坚持最久的一件事：",
    options: [
      { label: "A. 少于1个月", scores: [{ dimension: 'B', value: 1 }, { dimension: 'C', value: 1 }] },
      { label: "B. 2–3个月", scores: [{ dimension: 'C', value: 1 }] },
      { label: "C. 半年以上", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 持续数年", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 26,
    text: "你对“长期主义”的态度：",
    options: [
      { label: "A. 有点抗拒", scores: [{ dimension: 'C', value: 2 }] },
      { label: "B. 还不确定", scores: [{ dimension: 'C', value: 1 }] },
      { label: "C. 能够接受", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 非常推崇", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 27,
    text: "当事情迟迟没反馈时：",
    options: [
      { label: "A. 直接放弃", scores: [{ dimension: 'B', value: 2 }] },
      { label: "B. 产生自我怀疑", scores: [{ dimension: 'B', value: 2 }] },
      { label: "C. 默默继续", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 寻找优化方法", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 28,
    text: "你是否有长期追踪的项目：",
    options: [
      { label: "A. 暂时没有", scores: [{ dimension: 'C', value: 2 }] },
      { label: "B. 有但经常断续", scores: [{ dimension: 'C', value: 1 }] },
      { label: "C. 有且在持续", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 有且在迭代升级", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 29,
    text: "你觉得自己更容易：",
    options: [
      { label: "A. 开始一件事", scores: [{ dimension: 'B', value: 1 }] },
      { label: "B. 切换新目标", scores: [{ dimension: 'C', value: 2 }] },
      { label: "C. 长期坚持", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 持续迭代优化", scores: [{ dimension: 'E', value: 2 }] },
    ]
  },
  {
    id: 30,
    text: "你最向往的状态：",
    options: [
      { label: "A. 思路清晰", scores: [{ dimension: 'C', value: 1 }] },
      { label: "B. 内心安定", scores: [{ dimension: 'A', value: 1 }] },
      { label: "C. 节奏稳定", scores: [{ dimension: 'E', value: 1 }] },
      { label: "D. 拥有自我成长系统", scores: [{ dimension: 'E', value: 2 }] },
    ]
  }
];

export const RESULT_TYPES: Record<string, ResultContent> = {
  A: {
    title: "信息囤积型焦虑者",
    description: "你习惯通过“获取信息”来缓解焦虑。每当看到干货、课程、方法论，你会本能地收藏，因为那一刻你获得了一种掌控感：仿佛只要知识足够多，未来就不会失控。但问题在于，你的大脑把“获取”误判成了“进步”。在神经层面，收集信息会带来即时奖励（多巴胺刺激），而真正的执行需要面对不确定、失败和自我暴露的风险，因此大脑自然倾向于选择前者。久而久之，你建立了一个模式：输入越多，越安心；行动越少，越安全。但现实的反馈系统并不奖励储备，而奖励产出。当积累没有转化为成果时，焦虑反而加重，于是你更加依赖继续输入，形成闭环。你的问题不是懒，也不是能力不足，而是你把“准备”变成了一种逃避行动的正当理由。",
    mechanism: "回避风险 + 即时奖励依赖",
    books: [
      "《原子习惯》\nAtomic Habits\n作者：詹姆斯·克利尔（James Clear）",
      "《少即是多：去繁从简的精要主义》\nEssentialism: The Disciplined Pursuit of Less\n作者：格雷戈·麦基翁（Greg McKeown）",
      "《深度工作》\nDeep Work\n作者：卡尔·纽波特（Cal Newport）"
    ],
    advice: [
      "限制输入频率。设定明确规则：每新增一条学习内容，必须对应一次实际输出，否则不允许继续学习。",
      "清理收藏夹。删掉那些三个月没打开过的链接，腾出注意力空间。"
    ],
    cognitiveUpgrade: "真正带来安全感的不是储备，而是可验证的成果。"
  },
  B: {
    title: "高认知低行动者",
    description: "你具备清晰的判断力，也能识别正确路径，但你迟迟不启动，是因为你的内部标准过高。你在脑中构建了一个“理想版本”的自己，这个版本效率高、执行稳、结果漂亮，而当现实中的你无法匹配这个形象时，你选择延迟开始。拖延在你这里并非时间管理问题，而是一种自我保护策略：只要没开始，就不会失败；只要没交付，就不会被评价。你反复优化计划，其实是在降低出错概率，但真正阻碍你的不是方法，而是对“不够好”的容忍度过低。你的认知系统已经升级，但执行系统被完美主义卡住。",
    mechanism: "完美主义驱动的启动障碍 + 评价恐惧",
    books: [
      "《一人公司》\nThe War of Art\n作者：史蒂文·普莱斯菲尔德（Steven Pressfield）",
      "《原子习惯》\nAtomic Habits\n作者：詹姆斯·克利尔（James Clear）",
      "《终身成长》\nMindset\n作者：卡罗尔·德韦克（Carol S. Dweck）"
    ],
    advice: [
      "建立“最低可交付版本”规则：任何任务必须在限定时间内输出第一版，不允许因优化而延迟交付。",
      "降低预期。允许自己在刚开始时表现得像个新手。"
    ],
    cognitiveUpgrade: "执行质量来自迭代，而不是来自完美起点。"
  },
  C: {
    title: "目标漂浮型",
    description: "你思考能力很强，信息整合能力也不错，因此你能看到多个方向的潜力与风险。但正因为你能预判路径分叉，你的大脑不断进行成本—收益模拟，每一次选择都像一次重大投资决策。问题在于，你追求“最优路径”，而现实往往只能通过时间验证。当外部出现新的机会或趋势时，你的比较系统重新启动，原有方向开始动摇。频繁切换并非冲动，而是过度理性计算导致的决策瘫痪。长期下来，你的履历呈现为多尝试、少积累，能力横向扩展但缺乏纵向深度。",
    mechanism: "最优解执念 + 决策反复验证",
    books: [
      "《优秀到不能被忽视》\nSo Good They Can't Ignore You\n作者：卡尔·纽波特（Cal Newport）",
      "《纳瓦尔宝典》\nThe Almanack of Naval Ravikant\n作者：埃里克·乔根森（Eric Jorgenson）",
      "《跨界》\nRange\n作者：大卫·爱泼斯坦（David Epstein）"
    ],
    advice: [
      "为选择设定“锁定周期”，例如90天不可更换赛道，只允许在方法层面调整。",
      "接受“次优解”。有时候，坚持一个次优方向比不断寻找最优方向收益更高。"
    ],
    cognitiveUpgrade: "路径的价值不是被计算出来的，而是被时间放大的。"
  },
  D: {
    title: "精力透支型",
    description: "你当前的状态更接近神经系统过载，而非方向迷失。长期睡眠不足、持续信息刺激、频繁情绪波动，会让前额叶功能下降，导致计划执行能力减弱。你给自己定计划时逻辑清晰，但执行两天后崩溃，是因为身体储备无法支撑意志消耗。你开始怀疑自律能力，其实问题在于能量管理失衡。大脑在低能量状态下优先选择短期刺激（刷手机、拖延），因为那是最省力的路径。你不是缺目标，而是缺恢复周期。",
    mechanism: "慢性疲劳 + 自控资源枯竭",
    books: [
      "《我们为什么要睡觉？》\nWhy We Sleep\n作者：马修·沃克（Matthew Walker）",
      "《人生只有四千周》\nFour Thousand Weeks\n作者：奥利弗·伯克曼（Oliver Burkeman）",
      "《数字极简》\nDigital Minimalism\n作者：卡尔·纽波特（Cal Newport）"
    ],
    advice: [
      "优先恢复睡眠节律，减少高频信息输入，两周内不设立新的挑战目标。",
      "开启数字极简。每天固定一段时间远离所有屏幕，让神经系统降温。"
    ],
    cognitiveUpgrade: "自律建立在充足能量之上，而不是意志力之上。"
  },
  E: {
    title: "稳定推进型",
    description: "你已经建立了基本的执行节奏，有持续行为与阶段成果。你的问题不是行动不足，而是结构效率。随着积累增加，你开始感受到时间成本和机会成本的压力：哪些努力真正产生复利，哪些只是重复消耗？你进入了“结构优化阶段”。如果没有清晰的长期系统，你可能会陷入忙碌却增量有限的状态。你需要从“努力型增长”转向“系统型增长”，也就是让决策、资源配置和时间分配具备更高的杠杆效率。",
    mechanism: "成长阶段升级 + 结构优化需求",
    books: [
      "《原则》\nPrinciples\n作者：瑞·达利欧（Ray Dalio）",
      "《金钱心理学》\nThe Psychology of Money\n作者：摩根·豪泽尔（Morgan Housel）",
      "《深度工作》\nDeep Work\n作者：卡尔·纽波特（Cal Newport）"
    ],
    advice: [
      "审视所有投入事项，识别是否具备长期复利与结构沉淀价值。",
      "构建个人系统。将成功的经验模板化，减少重复性的决策开销。"
    ],
    cognitiveUpgrade: "高阶成长来自系统优化，而不是投入加倍。"
  }
};

export const SUB_PERSONALITIES: Record<string, Record<string, SubPersonality>> = {
  A: {
    B: { title: "启动阻力较高", advice: "不仅是学得太多，还在要开始时自动提高标准。限制准备时间，强制进入执行。" },
    C: { title: "方向容易波动", advice: "收藏的不只是知识，而是不同人生路径。先锁定唯一的方向，再针对性筛选信息。" },
    D: { title: "伴随精力透支", advice: "输入有时是逃避疲劳的方式。优先恢复精力，否则再多输入也无法转化。" },
    E: { title: "具备结构意识", advice: "具备升级意识，只是输入比例过高。调低输入频率，调高系统化整理频率。" }
  },
  B: {
    A: { title: "依赖外部信息", advice: "启动前总想寻找“更优方法”。停止搜索，用当前掌握的最基本方法直接开干。" },
    C: { title: "选择过于反复", advice: "犹豫不仅来自完美主义，还来自对方向的不确定。行动会帮你确认方向。" },
    D: { title: "身体支撑不足", advice: "不是怕开始，是身体不支持高强度推进。恢复体能比优化计划更迫切。" },
    E: { title: "系统化倾向", advice: "已经意识到需要系统。允许粗糙的开局，系统会在反馈中自然形成。" }
  },
  C: {
    A: { title: "信息决策迷雾", advice: "通过获取信息来比较路径，但信息越多决策越难。执行产生的反馈才是真实答案。" },
    B: { title: "伴随行动阻力", advice: "担心选错而延迟。接受选错也是成长的代价，选错一个总比什么都不选强。" },
    D: { title: "能量处于低位", advice: "能量不足时更容易怀疑人生方向。先恢复规律作息，再重新评估路径。" },
    E: { title: "具备长期潜质", advice: "具备长期意识，只需锁定周期。强迫自己在一个方向上持续投入足够时长。" }
  },
  D: {
    A: { title: "逃避型输入", advice: "疲惫时容易刷内容，因为这比执行轻松。减少不必要的感官刺激，让大脑彻底放空。" },
    B: { title: "自律错觉阻力", advice: "能量不足会放大拖延。先补充身体资源，不要在疲惫时责备自己不自律。" },
    C: { title: "决策动荡期", advice: "疲劳削弱决策稳定性。不要在能量低点做任何重大决定，先睡觉。" },
    E: { title: "认知底蕴深厚", advice: "具备成熟认知，只是身体在报警。此时的休息不是退步，是必要的重启。" }
  },
  E: {
    A: { title: "输入过载风险", advice: "已经在行动，但过度输入会削弱专注。收窄信息广度，在核心领域扎深。" },
    B: { title: "升级节点卡顿", advice: "偶尔卡在升级节点，担心改变现有稳态。结构升级本身就是一种试错。" },
    C: { title: "高阶决策波动", advice: "有基础，但在更高层级选择上犹豫。记住，在这个阶段，选择比努力更重要。" },
    D: { title: "透支性推进", advice: "执行力掩盖了疲劳。持续增长依赖健康的节律，而不是短期的爆发力。" }
  }
};
