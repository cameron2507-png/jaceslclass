// Shared lists for levels and game types, used across pages.
import type { CollectionEntry } from 'astro:content';

export const LEVELS = [
  { code: 'A1', label: 'Beginner' },
  { code: 'A2', label: 'Elementary' },
  { code: 'B1', label: 'Intermediate' },
  { code: 'B2', label: 'Upper Intermediate' },
  { code: 'C1', label: 'Advanced' },
] as const;

export type Level = (typeof LEVELS)[number]['code'];
const LEVEL_CODES = LEVELS.map(l => l.code) as readonly string[];

export const levelLabel = (code: string) => LEVELS.find(l => l.code === code)?.label ?? code;

export const TYPES = [
  { name: 'Jeopardy', blurb: 'Team quiz across categories. Works brilliantly for review lessons.' },
  { name: 'Typhoon', blurb: 'Team grid game with hidden points, typhoons and steals. Fun and a little chaotic.' },
  { name: 'Speaking games', blurb: 'Question cards, timed talks and bluffing games that get the whole class talking.' },
  { name: 'Battleships', blurb: 'Answer a grammar question to fire a shot. Sink the fleet before the other team.' },
  { name: 'Blockbusters', blurb: 'Hexagon grid quiz inspired by the British TV show. Great for revision.' },
  { name: 'Hangman', blurb: 'Word-guessing classic. A quick warm-up or vocabulary recap.' },
  { name: 'Taboo', blurb: 'Describe the word without the forbidden words. Pushes paraphrasing skills.' },
  { name: 'Gap-fills', blurb: 'Fill-in-the-blank games, interactive and self-marking.' },
  { name: 'Pronunciation', blurb: 'Tricky words, sounds and stress: say it right to score.' },
  { name: 'Translation', blurb: 'Race to translate sentences from French into English.' },
  { name: 'Card games', blurb: 'Classic card games with a grammar or vocabulary twist.' },
  { name: 'Stories', blurb: 'Choose-your-own-adventure reading with grammar built in.' },
  { name: 'Codenames', blurb: 'One-word clue, multiple targets. Excellent for advanced vocabulary work.' },
  { name: 'Quizzes', blurb: 'Short interactive quizzes on a single skill.' },
] as const;

export type GameType = (typeof TYPES)[number]['name'];
export const TYPE_NAMES = TYPES.map(t => t.name) as unknown as [GameType, ...GameType[]];
// "Jeopardy" -> "Jeopardy games", but "Speaking games" stays as it is.
export const typeLabel = (name: string) => (/games$/i.test(name) ? name : `${name} games`);
export const typeBlurb = (name: string) => TYPES.find(t => t.name === name)?.blurb ?? '';

// URL segment for a type: existing ones are unchanged (Hangman, Gap-fills),
// new two-word types use a hyphen (Speaking-games).
export const typeSlug = (name: string) => name.replace(/\s+/g, '-');
export const typeFromSlug = (slug: string) => TYPE_NAMES.find(t => typeSlug(t) === slug);

// A game's levels: its main level plus any level range in its title or file name,
// e.g. "(A1/A2)" or "typhoon-a1-a2". This lets A1/A2 games show on the A1 page too.
export function gameLevels(game: CollectionEntry<'games'>): Level[] {
  const found = new Set<string>([game.data.level]);
  const t = game.data.title.match(/\(([ABC][12])\s*[\/–-]\s*([ABC][12])\)/);
  if (t) { found.add(t[1]); found.add(t[2]); }
  for (const part of game.id.toLowerCase().split('-')) {
    if (/^([abc][12])+$/.test(part)) part.match(/[abc][12]/g)!.forEach(c => found.add(c.toUpperCase()));
  }
  return LEVEL_CODES.filter(c => found.has(c)) as Level[];
}

export const levelRange = (levels: string[]) =>
  levels.length > 1 ? `${levels[0]}/${levels[levels.length - 1]}` : levels[0];

export function byNewest(a: CollectionEntry<'games'>, b: CollectionEntry<'games'>) {
  return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}

export function countBy<T>(items: T[], keys: (item: T) => string[]) {
  const m = new Map<string, number>();
  for (const it of items) for (const k of keys(it)) m.set(k, (m.get(k) ?? 0) + 1);
  return m;
}
