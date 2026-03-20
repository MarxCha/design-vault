import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** shadcn/ui class merge utility */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format star count: 1234 → "1.2K", 12345 → "12.3K", 123456 → "123K" */
export function formatStars(stars: number): string {
  if (stars >= 1000) {
    const k = stars / 1000;
    return k >= 100
      ? `${Math.round(k)}K`
      : `${k.toFixed(1).replace(/\.0$/, '')}K`;
  }
  return stars.toString();
}

/** Format date to relative time in Spanish */
export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'hoy';
  if (diffDays === 1) return 'ayer';
  if (diffDays < 7) return `hace ${diffDays} días`;
  if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return `hace ${Math.floor(diffDays / 30)} meses`;
  return `hace ${Math.floor(diffDays / 365)} años`;
}

/** Extract GitHub username/repo from URL */
export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

/** Generate a GitHub raw URL for a file */
export function githubRawUrl(repo: string, branch: string, filePath: string): string {
  const parsed = parseGitHubUrl(repo);
  if (!parsed) return '';
  return `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/${branch}/${filePath}`;
}

/** Truncate text with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}
