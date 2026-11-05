## Verified ingestion update

Two downloads succeeded and are bundled unchanged: PostgreSQL18 manual (15,864,875bytes) and Computer Networks6.1 (22,254,526bytes). Their fetched hashes and attribution are in public/pdfs/manifest.json and ATTRIBUTION.txt. Four other catalog downloads failed (403/network) and remain external links, not indexed sources. The browser indexes only the selected page range and records actual page counts and hashes.

# Open PDF source catalog

Researched: 2026-11-06 (Asia/Manila). This catalog adds six primary references relevant to database design, SQL operations, network failure reasoning, shell pipelines, dependency automation and text ingestion. The app manifest is `src/content/pdf-library.ts`. Entries contain original descriptions and source links; this research task did not download or bundle the books.

## Evidence and rights

| Reference | Official PDF | Primary rights evidence | Ingestion considerations |
|---|---|---|---|
| Database Design, second edition | [Publisher PDF download](https://opentextbc.ca/dbdesign01/open/download?type=pdf) | The [BCcampus publisher page](https://opentextbc.ca/dbdesign01/) explicitly identifies Adrienne Watt/Nelson Eng and CC BY 4.0, except where noted. It specifies attribution and a link to the free BC Open Collection. | Preserve the source attribution/copyright notice. The cover photograph has a separately credited CC BY-SA 2.0 license; do not treat every embedded image as CC BY 4.0. PDF endpoint is dynamically generated. |
| PostgreSQL 18 Documentation | [Official A4 PDF](https://www.postgresql.org/files/documentation/pdf/18/postgresql-18-A4.pdf) | The [PostgreSQL license page](https://www.postgresql.org/about/licence/) explicitly permits use, copying, modification and distribution of the software **and its documentation**, subject to retaining the copyright/license paragraphs. | Version-specific SQL behavior matters. A browser must identify its actual executable engine version separately. Large file; source server reported approximately 15.9 MB during research. |
| Computer Networks: A Systems Approach, open v6.1 | [Pinned release PDF](https://github.com/SystemsApproach/book/releases/download/v6.1/book.pdf) | The [official repository README](https://github.com/SystemsApproach/book) and [license](https://github.com/SystemsApproach/book/blob/master/LICENSE) identify CC BY 4.0. The README asks for title, authors Larry Peterson/Bruce Davie, Elsevier 2012 copyright and source attribution. | Use the pinned open release, not an unlicensed copy of a commercial print edition. Keep the source notices and attribution. The repository's current README also asks derivative-project authors to contact the maintainers; do not silently relabel a modified edition as their original book. |
| GNU Bash Reference Manual | [GNU PDF](https://www.gnu.org/software/bash/manual/bash.pdf) | GNU's [manual site](https://www.gnu.org/software/bash/manual/) and [HTML manual](https://www.gnu.org/s/bash/manual/bash.html) carry the manual's GFDL notice. | Preserve the actual downloaded manual's copyright, GFDL, invariant-section and cover-text notices. The license on a surrounding GNU web page can differ from the manual's license. |
| GNU Make Manual | [GNU PDF](https://www.gnu.org/software/make/manual/make.pdf) | The [official manual](https://www.gnu.org/software/make/manual/make.html) includes its GNU Free Documentation License 1.3 appendix and document notice. | GFDL has attribution, license-copy and potentially invariant/cover-text conditions; keep the unmodified source PDF and its notices. Do not imply Make provides an Airflow/Dagster-equivalent scheduler. |
| GAWK: Effective AWK Programming | [GNU PDF](https://www.gnu.org/software/gawk/manual/gawk.pdf) | The [official download index](https://www.gnu.org/software/gawk/manual/) links the PDF; the [manual itself](https://www.gnu.org/software/gawk/manual/gawk.html) includes its GFDL notice and appendix. | Preserve the downloaded edition's notices, including invariant/cover-text requirements where specified. The index page's own CC BY-ND notice is not the manual's GFDL notice. |

GNU FDL primary reference: [GFDL 1.3](https://www.gnu.org/licenses/fdl-1.3.html). CC BY primary reference: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Do not flatten these distinct licenses into a generic “free PDF” claim. License notices should accompany retained originals and derived excerpts/index metadata; generated app prose should be identified as generated or original app teaching material, not as publisher-authored text.

## Fetch and validation limits

All URLs are exact official links or the official project's pinned release asset. Publisher/source/license pages were inspected through browsing. Binary verification was not universally successful: GNU PDF requests timed out in the research browser; BCcampus's PDF endpoint returned a temporary 530 error; PostgreSQL exceeded the browser extraction size limit; GitHub's release redirect was blocked by the research browser's URL-safety layer. These are **not** proofs that the sources are unreachable from an app or a build worker, but they mean this catalog must not label every PDF as successfully downloaded/indexed.

Do not invent page counts from a web search result. The ingestion worker must read the actual PDF, record `numPages`, retain one-based physical PDF page numbers, and compute a content digest. The six catalog entries intentionally omit unverified page totals. Record extraction library/version, source URL, fetch time, document hash and title; store the actual fetch result as `ready`, `failed` or `not indexed`. A PDF's printed page label may differ from its one-based viewer page index, especially after front matter. Show both if labels can be recovered reliably.

The GNU manual URLs can update in place. Page-level citations must therefore bind to the fetched document digest, not merely the URL. A link of the form `source.pdf#page=N` opens a viewer at that physical page when supported; an in-app excerpt, source title, physical page and digest/version remain necessary when the browser ignores the fragment or the remote PDF changes.

## Browser/CORS and storage

A hyperlink being readable in a browser tab does not imply that JavaScript may fetch it cross-origin. Prefer build/server ingestion of allowlisted sources into immutable versioned artifacts, retaining attribution and license notices. If permitted source PDFs are served from the app's own origin, page-exact source validation becomes reproducible and avoids CORS surprises. Do not introduce an unrestricted URL proxy: enforce source allowlists, HTTPS, redirect checks, response size/time limits and content-type/signature checks. Keep user-uploaded private documents separate from publicly distributable source artifacts.

Several books are much longer than 150 pages. Use bounded page-range indexing for mobile devices and show exactly which pages are available; do not silently claim the whole book is indexed when only a subset is retained. A sensible ingestion budget is selected chapters/page ranges with a per-document extraction limit, cancellation and progress. Preserve page boundaries through chunking; never merge a chunk across pages without retaining all affected page IDs.

## Using the sources in tutoring

Retrieve source passages before generating, display their document title/version/page, and cite only those retrieved passages. A citation is a verifiable location, not an automatic factuality certificate. The model may still misunderstand a passage, omit a qualifier, or apply behavior from the wrong database version. Claims about modern streaming/lakehouse tools require separate contemporary primary documentation; this foundational library should not be represented as exhaustive coverage of those technologies.

No unlicensed copies of commercial data engineering books, certification exam dumps, or redistributed proprietary course PDFs are included.
