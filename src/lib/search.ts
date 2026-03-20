import { type DesignProject } from '@/data/catalog';

/**
 * Simple fuzzy search over project fields.
 * Matches against name, description, stack, highlights, and design elements.
 * Returns projects sorted by relevance score.
 */
export function fuzzySearch(
  projects: DesignProject[],
  query: string
): DesignProject[] {
  if (!query.trim()) return projects;

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const scored = projects.map((project) => {
    let score = 0;

    const fields = {
      name: { text: project.name.toLowerCase(), weight: 10 },
      description: { text: project.description.toLowerCase(), weight: 3 },
      stack: { text: project.stack.join(' ').toLowerCase(), weight: 5 },
      highlights: { text: project.highlights.join(' ').toLowerCase(), weight: 2 },
      elements: { text: project.designElements.join(' ').toLowerCase(), weight: 4 },
      category: { text: project.category.toLowerCase(), weight: 3 },
      subcategory: { text: (project.subcategory || '').toLowerCase(), weight: 2 },
    };

    for (const term of terms) {
      for (const field of Object.values(fields)) {
        if (field.text.includes(term)) {
          score += field.weight;

          // Bonus for exact word match
          if (field.text.split(/\s+/).includes(term)) {
            score += field.weight * 0.5;
          }

          // Bonus for starts-with match
          if (field.text.startsWith(term)) {
            score += field.weight * 2;
          }
        }
      }
    }

    return { project, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.project);
}

/**
 * Get search suggestions based on partial query.
 * Returns unique terms from project names and stacks.
 */
export function getSearchSuggestions(
  projects: DesignProject[],
  query: string,
  limit: number = 5
): string[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  const suggestions = new Set<string>();

  for (const project of projects) {
    // Name matches
    if (project.name.toLowerCase().includes(q)) {
      suggestions.add(project.name);
    }

    // Stack matches
    for (const tech of project.stack) {
      if (tech.toLowerCase().includes(q)) {
        suggestions.add(tech);
      }
    }

    if (suggestions.size >= limit) break;
  }

  return Array.from(suggestions).slice(0, limit);
}
