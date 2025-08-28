// Trigger-based routing configuration
export const triggerRoutes = {
  Control: {
    path: '/triggers/control',
    title: 'Control Trigger',
    description: 'When you feel your autonomy is threatened',
    color: '#DC2626', // Red
    icon: '🎯',
    content: {
      overview: 'You have a deep need for autonomy and self-determination. When you feel controlled or restricted, it triggers a powerful response.',
      symptoms: [
        'Feeling trapped or constrained',
        'Resisting authority or rules',
        'Need for independence',
        'Frustration with micromanagement'
      ],
      strategies: [
        'Practice setting clear boundaries',
        'Focus on what you can control',
        'Develop healthy assertiveness',
        'Create personal autonomy zones'
      ]
    }
  },
  Rejection: {
    path: '/triggers/rejection',
    title: 'Rejection Trigger',
    description: 'When you feel excluded or not accepted',
    color: '#EA580C', // Orange
    icon: '🚫',
    content: {
      overview: 'You are highly sensitive to social exclusion and rejection. This trigger activates when you feel left out or not valued by others.',
      symptoms: [
        'Fear of being left out',
        'Over-sensitivity to criticism',
        'People-pleasing behavior',
        'Social anxiety'
      ],
      strategies: [
        'Build self-worth independent of others',
        'Practice self-compassion',
        'Develop healthy social boundaries',
        'Focus on genuine connections'
      ]
    }
  },
  Shame: {
    path: '/triggers/shame',
    title: 'Shame Trigger',
    description: 'When you feel fundamentally flawed or unworthy',
    color: '#7C3AED', // Purple
    icon: '😔',
    content: {
      overview: 'You carry deep feelings of inadequacy and unworthiness. This trigger activates when you feel exposed or judged.',
      symptoms: [
        'Feeling fundamentally flawed',
        'Hiding true self from others',
        'Perfectionism',
        'Self-sabotage'
      ],
      strategies: [
        'Practice vulnerability safely',
        'Challenge perfectionist thoughts',
        'Develop self-acceptance',
        'Seek supportive relationships'
      ]
    }
  },
  Overwhelm: {
    path: '/triggers/overwhelm',
    title: 'Overwhelm Trigger',
    description: 'When you feel unable to handle current demands',
    color: '#059669', // Green
    icon: '🌊',
    content: {
      overview: 'You become easily overwhelmed by too many demands or stimuli. This trigger activates when you feel unable to cope.',
      symptoms: [
        'Feeling paralyzed by choices',
        'Difficulty prioritizing',
        'Sensory overload',
        'Avoidance behavior'
      ],
      strategies: [
        'Break tasks into smaller steps',
        'Practice mindfulness',
        'Set realistic expectations',
        'Create calm environments'
      ]
    }
  },
  Neglect: {
    path: '/triggers/neglect',
    title: 'Neglect Trigger',
    description: 'When you feel unseen or unimportant',
    color: '#0891B2', // Cyan
    icon: '👻',
    content: {
      overview: 'You have a deep fear of being forgotten or overlooked. This trigger activates when you feel invisible or unimportant.',
      symptoms: [
        'Seeking constant attention',
        'Fear of being forgotten',
        'Over-explaining yourself',
        'Difficulty being alone'
      ],
      strategies: [
        'Practice self-validation',
        'Develop healthy independence',
        'Build meaningful connections',
        'Learn to enjoy solitude'
      ]
    }
  },
  Responsibility: {
    path: '/triggers/responsibility',
    title: 'Responsibility Trigger',
    description: 'When you feel burdened by others\' needs',
    color: '#1E40AF', // Blue
    icon: '��️',
    content: {
      overview: 'You feel responsible for everyone and everything around you. This trigger activates when others depend on you.',
      symptoms: [
        'Taking on others\' problems',
        'Feeling guilty saying no',
        'Burnout from over-giving',
        'Difficulty receiving help'
      ],
      strategies: [
        'Set healthy boundaries',
        'Practice saying no',
        'Allow others to be responsible',
        'Learn to receive support'
      ]
    }
  },
  Uncertainty: {
    path: '/triggers/uncertainty',
    title: 'Uncertainty Trigger',
    description: 'When you lack clarity or predictability',
    color: '#6B7280', // Gray
    icon: '❓',
    content: {
      overview: 'You need clarity and predictability to feel secure. This trigger activates when situations are ambiguous or unclear.',
      symptoms: [
        'Anxiety about the future',
        'Need for constant reassurance',
        'Difficulty with change',
        'Over-planning'
      ],
      strategies: [
        'Practice acceptance of uncertainty',
        'Focus on what you can control',
        'Develop flexibility',
        'Build tolerance for ambiguity'
      ]
    }
  },
  Invalidation: {
    path: '/triggers/invalidation',
    title: 'Invalidation Trigger',
    description: 'When your feelings or experiences are dismissed',
    color: '#F59E0B', // Amber
    icon: '🎭',
    content: {
      overview: 'You are deeply affected when your feelings or experiences are dismissed or minimized by others.',
      symptoms: [
        'Seeking external validation',
        'Doubting your own feelings',
        'Over-explaining',
        'People-pleasing'
      ],
      strategies: [
        'Trust your own experience',
        'Practice self-validation',
        'Set boundaries with invalidators',
        'Build confidence in your feelings'
      ]
    }
  },
  Invisibility: {
    path: '/triggers/invisibility',
    title: 'Invisibility Trigger',
    description: 'When you feel unseen or unheard',
    color: '#374151', // Dark Gray
    icon: '��️',
    content: {
      overview: 'You feel invisible and unheard in social situations. This trigger activates when you feel overlooked or ignored.',
      symptoms: [
        'Feeling invisible in groups',
        'Difficulty speaking up',
        'Being easily interrupted',
        'Feeling unheard'
      ],
      strategies: [
        'Practice assertive communication',
        'Find your voice',
        'Build confidence',
        'Seek supportive environments'
      ]
    }
  },
  Guilt: {
    path: '/triggers/guilt',
    title: 'Guilt Trigger',
    description: 'When you feel you\'ve done something wrong',
    color: '#DC2626', // Red
    icon: '⚖️',
    content: {
      overview: 'You carry a heavy burden of guilt and responsibility. This trigger activates when you feel you\'ve failed or hurt others.',
      symptoms: [
        'Constant self-blame',
        'Difficulty accepting compliments',
        'Over-apologizing',
        'Feeling undeserving'
      ],
      strategies: [
        'Practice self-forgiveness',
        'Challenge guilt thoughts',
        'Learn from mistakes without dwelling',
        'Develop self-compassion'
      ]
    }
  },
  Isolation: {
    path: '/triggers/isolation',
    title: 'Isolation Trigger',
    description: 'When you feel disconnected from others',
    color: '#7C3AED', // Purple
    icon: '��️',
    content: {
      overview: 'You fear being alone and disconnected from others. This trigger activates when you feel isolated or lonely.',
      symptoms: [
        'Fear of being alone',
        'Difficulty with solitude',
        'Over-dependence on others',
        'Social anxiety'
      ],
      strategies: [
        'Learn to enjoy your own company',
        'Build meaningful connections',
        'Practice healthy independence',
        'Develop self-reliance'
      ]
    }
  },
  Injustice: {
    path: '/triggers/injustice',
    title: 'Injustice Trigger',
    description: 'When you witness unfairness or inequality',
    color: '#059669', // Green
    icon: '⚖️',
    content: {
      overview: 'You are deeply affected by unfairness and inequality. This trigger activates when you witness or experience injustice.',
      symptoms: [
        'Strong sense of fairness',
        'Anger at injustice',
        'Desire to fight for others',
        'Difficulty with unfair situations'
      ],
      strategies: [
        'Channel anger into positive action',
        'Practice acceptance of what you can\'t change',
        'Focus on areas where you can make a difference',
        'Build resilience to unfairness'
      ]
    }
  }
}

export type TriggerType = keyof typeof triggerRoutes 