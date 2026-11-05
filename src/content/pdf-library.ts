/**
 * Primary, openly licensed references selected 2026-11-06.
 * Keep source attribution and the source document's own license notices.
 * A catalog entry is not a claim that this browser has indexed the document.
 * Record the fetched PDF hash, page count and extraction version at ingestion.
 */
export interface PdfReference {
  id: string;
  title: string;
  authors: string;
  topic: string;
  url: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  description: string;
}

export const pdfLibrary: PdfReference[] = [
  {
    id: 'database-design-2e',
    title: 'Database Design — 2nd Edition',
    authors: 'Adrienne Watt and Nelson Eng',
    topic: 'Data modeling and SQL',
    url: 'https://opentextbc.ca/dbdesign01/open/download?type=pdf',
    sourceUrl: 'https://opentextbc.ca/dbdesign01/',
    license: 'CC BY 4.0; individual credited materials may differ',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    description: 'Open textbook covering relational models, keys, constraints, normalization, SQL and a database-development process. Use the SQL lab and ERD exercises after reading the relevant chapters.',
  },
  {
    id: 'postgresql-18-manual',
    title: 'PostgreSQL 18 Documentation',
    authors: 'The PostgreSQL Global Development Group',
    topic: 'SQL, transactions and database operations',
    url: 'https://www.postgresql.org/files/documentation/pdf/18/postgresql-18-A4.pdf',
    sourceUrl: 'https://www.postgresql.org/docs/18/',
    license: 'PostgreSQL License (includes documentation)',
    licenseUrl: 'https://www.postgresql.org/about/licence/',
    description: 'Versioned primary reference for SQL semantics, indexes, concurrency, query plans, replication and maintenance. Index selected chapter/page ranges rather than loading the entire large manual on a phone.',
  },
  {
    id: 'computer-networks-6-1',
    title: 'Computer Networks: A Systems Approach — open release 6.1',
    authors: 'Larry Peterson and Bruce Davie',
    topic: 'Networking and distributed-system foundations',
    url: 'https://github.com/SystemsApproach/book/releases/download/v6.1/book.pdf',
    sourceUrl: 'https://github.com/SystemsApproach/book/releases/tag/v6.1',
    license: 'CC BY 4.0; preserve required source attribution',
    licenseUrl: 'https://github.com/SystemsApproach/book/blob/master/LICENSE',
    description: 'A pinned open textbook release for protocols, reliable delivery, congestion, internetworking and network failure reasoning. The open release is distinct from later commercial print editions.',
  },
  {
    id: 'gnu-bash-reference',
    title: 'GNU Bash Reference Manual',
    authors: 'Chet Ramey, Brian Fox and the Free Software Foundation',
    topic: 'Shell pipelines and reliable command-line work',
    url: 'https://www.gnu.org/software/bash/manual/bash.pdf',
    sourceUrl: 'https://www.gnu.org/software/bash/manual/',
    license: 'GNU Free Documentation License 1.3 or later; retain document notices',
    licenseUrl: 'https://www.gnu.org/licenses/fdl-1.3.html',
    description: 'Primary documentation for quoting, expansion, redirection, pipelines, exit status, shell functions and execution behavior. Useful for diagnosing fragile ingestion and operational shell scripts.',
  },
  {
    id: 'gnu-make-manual',
    title: 'GNU Make Manual',
    authors: 'Richard M. Stallman, Roland McGrath, Paul D. Smith and contributors',
    topic: 'Dependency graphs and reproducible automation',
    url: 'https://www.gnu.org/software/make/manual/make.pdf',
    sourceUrl: 'https://www.gnu.org/software/make/manual/',
    license: 'GNU Free Documentation License 1.3 or later; retain document notices',
    licenseUrl: 'https://www.gnu.org/licenses/fdl-1.3.html',
    description: 'Study target/prerequisite graphs, recipes, variables, parallel execution and error handling. Apply these ideas to a reproducible local data project while distinguishing Make from a managed orchestration service.',
  },
  {
    id: 'gnu-gawk-manual',
    title: 'GAWK: Effective AWK Programming',
    authors: 'Arnold D. Robbins and the Free Software Foundation',
    topic: 'Text ingestion, records and field transformations',
    url: 'https://www.gnu.org/software/gawk/manual/gawk.pdf',
    sourceUrl: 'https://www.gnu.org/software/gawk/manual/',
    license: 'GNU Free Documentation License 1.3 or later; retain document notices',
    licenseUrl: 'https://www.gnu.org/licenses/fdl-1.3.html',
    description: 'A primary guide to record/field processing, patterns, associative arrays and formatted output. Practice validation and small streaming text transformations, checking CSV-specific behavior for the documented Gawk version.',
  },
];
