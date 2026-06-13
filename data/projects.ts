// ─────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────

export interface Award {
  name: string
  position: string
  year: number
  location: string
}

export interface ProjectLink {
  github?: string
  live?: string
}

export type ProjectType =
  | 'Full Stack'
  | 'Frontend'
  | 'Backend'
  | 'Mobile'
  | 'Comunidade'

export type ProjectStatus = 'completed' | 'in-progress'

export interface Project {
  id: string              // slug da URL: /trabalho/[id]
  title: string           // nome do projeto
  tagline: string         // descrição em uma linha
  type: ProjectType
  year: number
  status: ProjectStatus
  featured: boolean       // aparece na home

  description: string     // descrição expandida
  problem: string         // qual problema resolve
  solution: string        // o que foi construído
  result: string          // impacto / métricas

  stack: string[]
  highlights: string[]    // destaques técnicos

  architecture?: string   // nota sobre a arquitetura
  awards?: Award[]
  links?: ProjectLink
}

// ─────────────────────────────────────────
// DADOS
// ─────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'autocare',
    title: 'AutoCare',
    tagline: 'Monitoramento veicular em tempo real via telemetria OBD2.',
    type: 'Full Stack',
    year: 2026,
    status: 'completed',
    featured: true,

    description:
      'Sistema de telemetria que recebe dados de veículos em tempo real, ' +
      'processa eventos críticos via Rules Engine determinístico e gera ' +
      'diagnósticos automáticos antes que problemas evoluam para falhas graves.',

    problem:
      'Falhas mecânicas e elétricas são imprevisíveis sem monitoramento contínuo ' +
      '— resultando em panes inesperadas e custos altos de manutenção corretiva.',

    solution:
      'Rules Engine determinístico que processa cada payload OBD2, avalia ' +
      'regras de negócio e persiste diagnósticos classificados por severidade ' +
      'na mesma requisição. Arquitetura stateless com suporte a múltiplos ' +
      'veículos via device_id.',

    result:
      'Latência inferior a 5ms na avaliação de regras. Diagnósticos retornados ' +
      'na mesma requisição, sem chamadas adicionais. Cobertura de testes para ' +
      'regras de negócio e endpoints críticos.',

    stack: [
      'FastAPI',
      'SQLAlchemy 2.0',
      'PostgreSQL',
      'Pydantic v2',
      'Pytest',
      'Docker',
    ],

    highlights: [
      'Latência estimada inferior a 5ms para avaliação das regras',
      'Arquitetura stateless com suporte a múltiplos veículos via device_id',
      'Diagnósticos retornados na mesma requisição, sem chamadas adicionais',
      'Cobertura de testes para regras de negócio e endpoints',
      'Detecção automática de superaquecimento, bateria crítica e códigos DTC',
    ],

    architecture:
      'Fluxo baseado em Rules Engine determinístico: cada payload é processado, ' +
      'avaliado por regras de negócio e persistido com os diagnósticos gerados.',

    awards: [
      {
        name: 'Startup Weekend',
        position: '1º lugar',
        year: 2026,
        location: 'Anápolis, GO',
      },
    ],
  },

  {
    id: 'combinas',
    title: 'Combinas',
    tagline: 'Provador digital com IA — veja como a roupa fica antes de comprar.',
    type: 'Full Stack',
    year: 2026,
    status: 'in-progress',
    featured: true,

    description:
      'Plataforma de virtual try-on que permite visualizar como uma peça de roupa ' +
      'ficaria no próprio corpo antes da compra, combinando processamento de imagens, ' +
      'catálogo de produtos e geração assíncrona de avatares.',

    problem:
      'E-commerce de moda perde vendas e acumula devoluções por causa da ' +
      'insegurança do cliente em relação ao caimento e tamanho das peças.',

    solution:
      'Pipeline completo de virtual try-on: upload de foto, geração assíncrona ' +
      'de avatar via Celery, análise de caimento e recomendação de tamanho. ' +
      'Troca de peças sem necessidade de reenviar a foto.',

    result:
      'MVP funcional com modo mock para validação sem custos de inferência. ' +
      'Base tecnológica pronta para integração com Gemini ou Stable Diffusion. ' +
      'Redução potencial de devoluções por tamanho incorreto.',

    stack: [
      'Next.js 14',
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'Django 5',
      'Django REST Framework',
      'PostgreSQL',
      'Redis',
      'Celery',
      'Docker',
      'Pillow',
      'Google GenAI',
    ],

    highlights: [
      'Pipeline completo de virtual try-on, da foto à análise de caimento',
      'Processamento assíncrono com Celery e Redis',
      'Troca de peças reutilizando avatar já gerado — sem reenvio de foto',
      'Pronto para integração com modelos de IA generativa (Gemini, Stable Diffusion)',
      'Modo mock funcional para validação sem custos de inferência',
      'Suporte a imagens HEIC (iPhone)',
    ],

    architecture:
      'Arquitetura desacoplada com processamento assíncrono. Upload dispara ' +
      'tarefa Celery para geração de avatar; frontend acompanha via polling de status.',
  },

  {
    id: 'inovaanapolis',
    title: 'InovAnápolis',
    tagline: 'Hub digital do ecossistema de inovação de Anápolis.',
    type: 'Comunidade',
    year: 2026,
    status: 'in-progress',
    featured: true,

    description:
      'Plataforma que centraliza pessoas, empresas, eventos e oportunidades ' +
      'do ecossistema de inovação de Anápolis — conectando empreendedores, ' +
      'estudantes e instituições em um único ambiente digital.',

    problem:
      'O ecossistema de inovação de Anápolis existia de forma fragmentada, ' +
      'sem um ponto central de conexão entre seus agentes e iniciativas.',

    solution:
      'Atuação como Dev Full Stack responsável pela arquitetura, automações, ' +
      'integrações, modelagem de banco de dados e desenvolvimento da plataforma ' +
      'digital da comunidade.',

    result:
      'Plataforma em desenvolvimento ativo como hub digital de inovação regional. ' +
      'Estrutura escalável para integração contínua de novos serviços e comunidades.',

    stack: [
      'Next.js',
      'TypeScript',
      'Python',
      'PostgreSQL',
      'Docker',
    ],

    highlights: [
      'Arquitetura e planejamento de sistemas do zero',
      'Automações e integrações para gestão da comunidade',
      'Modelagem e estruturação de banco de dados',
      'Desenvolvimento full stack em todas as etapas',
      'Base tecnológica escalável para futuras soluções',
    ],
  },
] as const

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.id === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.id)
}
