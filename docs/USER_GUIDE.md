# Dataforge user guide

Use this guide for daily practice and for building a source-backed research library. Button names follow the current interface. APK build/install details belong to the Android release instructions supplied with your APK; this guide does not claim that every Android device has been tested.

## Start safely on a new phone

1. Keep a copy of your original PDF files outside Dataforge.
2. If you already use the website, open **Settings → Export progress** there before moving to Android. Keep the downloaded JSON backup somewhere safe.
3. Install the supplied APK using Android's package installer. Only allow installation for the file-transfer/browser app you are actually using, and turn that permission off afterward if you do not need it.
4. Open Dataforge, then use **Settings → Import backup** to select your exported JSON. Review the replacement prompt. Replacing progress is different from merging cloud data.
5. Reimport PDFs into the Android app. A progress backup does **not** contain PDF bytes or the document index.

The installed app and the website can have separate local storage. Installing an APK does not automatically copy browser progress, sign-in cookies, PDFs or tutor settings. Uninstalling the app or clearing its storage can remove locally stored work. Export before changing builds or resetting storage.

## A useful daily routine

1. Open **Roadmap** and choose the next unfinished milestone or a gap you want to address.
2. Tap the milestone title to expand its explanation, topics, expected capability, exercise and source links.
3. Set **My status** to **Learning**. Use **Pending** for something you plan to revisit, **Done** when you have completed it, and **Not started** to reset it.
4. Record a repository link, a design decision, a failure you reproduced or your next action under **My evidence or next action**.
5. Practice the concept in **Knowledge practice**, **SQL workbench**, **Practice studio** or a relevant **Project**.
6. Read the feedback, explain the mechanism in your own words and return to weak areas later.

Roadmap completion is your self-assessment. It awards no mastery score or certification. Search matches milestone titles, descriptions and topics; the status filter helps you find unfinished work. The existing **Learning tracks** remain available separately.

### Choose the right practice tool

| Area | Use it for |
| --- | --- |
| Today | A short mixed daily practice session. |
| Knowledge practice | Questions with explanations of the answer choices. |
| SQL workbench | Running queries, inspecting errors and checking results against several datasets. |
| Practice studio | Other practice formats, including written reasoning. |
| Incident room | Reading evidence and practicing operational decisions in simulations. |
| Python lab | Browser-based Python practice; runtime loading can need connectivity. |
| Distributed labs | Instructions for work in an external/local runtime, not a cluster running on your phone. |
| Field guide / Resource library | Authored notes and external learning materials. External links need internet access. |
| Projects | Portfolio briefs, acceptance criteria and saved checklists. |
| Certifications | Preparation paths and publisher links. Check the publisher's current terms before booking. |

## Profile and appearance

Open **Settings → Profile picture** to choose **Initial**, **Database**, **Terminal**, **Layers**, **Compass** or **Workflow**. These are bundled minimalist symbols; no personal photo upload or camera permission is needed. The choice appears beside your name and is included in progress backups. You can also change your display name and daily attempt goal. Use the **Color theme** selector at the top of the app for **System**, **Light** or **Dark**. Missing a day does not remove earned XP.

## SQL: run, inspect, then check

1. Open **SQL workbench** and choose a **SQL language** and **Depth**.
2. **PostgreSQL** and **SQLite** are executable. Other dialect choices are clearly labeled reference curricula; their syntax lessons do not run a simulated version of that database.
3. Select a challenge and read the brief. Expand **Schema & sample data**; use **Preview 8 rows** to inspect a table.
4. Write a query and choose **Run query** to explore its output. Running successfully does not yet mean the solution is correct.
5. Choose **Check solution** to compare it against three datasets. If it fails, expand **Inspect the counterexample** and compare missing and unexpected rows.
6. Read **Explanation**. A **Hint** or revealed reference solution marks that attempt as assisted; it still supports learning but does not earn unassisted mastery XP.
7. Try **New data variant** to avoid memorizing one fixture's output.

Pay attention to row grain, duplicate counts, NULL handling, join cardinality and filter placement. Column names/order matter. Row ordering matters when the problem requests it. Passing these fixtures is useful evidence, not proof for every possible dataset. Drafts are saved separately for each challenge and dialect. On a keyboard, Ctrl/Cmd+Enter runs the query.

## Research tutor: import a PDF and find evidence

The navigation says **Llama tutor**; the page heading is **Research tutor**. It has three tabs: **Ask & verify**, **Source library** and **Connection**.

### 1. Pick a useful document

Prefer a publisher manual, openly licensed textbook or other source whose edition and provenance you can identify. Choose a text-based PDF: you should normally be able to select/copy its words in a PDF reader. A scanned image of a page needs OCR before this importer can use its text. Dataforge does not perform OCR.

Supported imports are PDF, TXT, MD and CSV. CSV is treated as searchable text here, not loaded as a SQL table. Importing a document does not train Llama or change its weights.

### 2. Import a small, relevant range first

1. Go to **Source library**.
2. Under **PDF pages to index**, choose **From** and **Through**. The default is pages **1–100**. Start with the chapter you need, or 10–30 pages on a memory-constrained phone.
3. Choose **Import PDF or text** and select the file with the system picker.
4. Wait for the reading/indexing status to finish. Check the entry under **Indexed in this browser** and confirm its indexed-page count.
5. Return to **Ask & verify**.

**Physical PDF pages are used.** A textbook's printed “page 18” may be physical PDF page 57 because of its cover and front matter. Set ranges according to the PDF reader's physical page counter.

Current importer limits:

| Setting | Limit / behavior |
| --- | --- |
| File size | 35,000,000 bytes; choose a file smaller than 35 MB. |
| PDF page selection | At most 500 selected pages in one import. It is not automatically the whole book. |
| PDF extracted text | At most 12 million characters for that import. |
| TXT/MD/CSV text | At most 1.2 million characters. |
| Library | Up to 16 distinct documents. |
| Usable text | At least 20 non-whitespace characters after extraction. |

To extend a PDF, change the range and import the **same unchanged file** again, or use **Index more pages** for a bundled reference. Matching SHA-256 document identity merges the newly selected physical pages with the existing page map. For example, import 1–100, then 101–200. Renaming an unchanged file does not change its byte hash; editing or replacing the file produces a new identity. A different edition should be treated as a different source.

The **Primary reference collection** lists both bundled and external references. **Add to research** downloads and indexes a bundled reference using your chosen range. **Download from source** opens an external reference; download it and import the file yourself. A catalog entry or resource link is not already indexed. Preserve each publisher's license and attribution when sharing files.

### 3. Ask a question in evidence mode

1. In **Ask & verify**, enter a specific concept question such as “What makes a transaction atomic?”
2. Set **Sources** to:
   - **PDF documents only** to restrict retrieval to imported PDFs.
   - **Study notes only** for Dataforge's authored guide notes.
   - **All indexed sources** to search imported documents and guide notes together.
3. Leave **Response → Find evidence**, then select **Find evidence**.
4. Read the retrieved passages. Choose **Inspect original page** for a PDF or **Inspect source excerpt** for text/notes.

Evidence mode needs no Llama server. It retrieves excerpts; it does not produce a generated explanation. Search uses lexical BM25 ranking, so words shared with the source matter. Try “late events watermark” rather than a vague “Explain everything about real time.” There is no embedding/model control in this interface.

### 4. Inspect the proof

The verification panel shows the document title, physical PDF page, document hash prefix and excerpt. When the retained original bytes are available, it renders the actual page beside the excerpt. **Full retrieved excerpt** expands the complete chunk. **Open publisher source** is available when a publisher URL was recorded; a manually uploaded file may have no publisher link. **Open original PDF** refers to the locally retained file.

For generated answers, a citation such as **[1] · p. 57** opens its source proof. Check both that the words occur and that they support the claim in context. Exact quote matching verifies text presence, **not** semantic correctness, completeness or freshness. A stable hash identifies the imported edition; it does not prove the publisher's current online edition is unchanged.

### 5. Improve retrieval instead of importing everything

If results are weak:

- Use a distinctive term from the relevant chapter, acronym or table heading.
- Switch to **PDF documents only** if guide notes dominate results.
- Verify the chapter's physical pages were actually indexed.
- Add another relevant range rather than a whole unrelated manual.
- Check the extracted excerpt for OCR/formatting problems.
- Split a very large source into useful chapters if file/text limits are exceeded.

Search returns a bounded selection, currently up to five passages with at most two from one document. Its worker has a 20-second search deadline. These retrieval/chunking limits are implementation settings, not user sliders. Increasing the page range changes your library; it does not increase the model's context window.

## Enable “Explain with Llama”

Generation requires a separate companion service and a model. The APK does not, by itself, install Ollama or bundle an 8B model. The computer hosting Ollama must stay on and reachable while you ask generated questions. Evidence mode remains useful independently.

### On the computer running the model

From the Dataforge repository directory, after installing its dependencies and Ollama:

```powershell
ollama pull llama3.1:8b
Copy-Item .env.example .env
```

Edit `.env` for your setup, then start the companion:

```powershell
node --env-file=.env server/tutor.mjs
```

For a same-computer development session, the starting configuration is:

```dotenv
APP_ORIGIN=http://localhost:5173
TUTOR_HOST=127.0.0.1
TUTOR_PORT=8787
LLAMA_PROVIDER=ollama
LLAMA_BASE_URL=http://127.0.0.1:11434
LLAMA_MODEL=llama3.1:8b
```

Use the **exact origin** of the app making requests: scheme, hostname and port, without a route/hash. `http://localhost:5173` and `http://127.0.0.1:5173` are different origins. The hosted website uses its HTTPS origin. This Android build serves its bundled files through Android WebViewAssetLoader at **`https://appassets.androidplatform.net`**, so use that value for `APP_ORIGIN` when the companion serves this APK. The app's local HTTPS origin is not the companion's Service address. A different browser/build origin needs its own matching configuration.

`LLAMA_MODEL` must match a model you have actually installed. A larger model may need substantially more RAM/VRAM and take longer; choose according to measured hardware performance. The app cannot switch or download the server model through its Connection screen. For a hosted compatible provider, set `LLAMA_PROVIDER=compatible`, its `/v1` base URL and `LLAMA_API_KEY` on the server. Never put provider secrets into a `VITE_` variable, a commit or a public client bundle.

### Reach the service from your phone

`127.0.0.1` and `localhost` on your phone mean **your phone**, not your computer. The desktop default `http://127.0.0.1:8787` therefore does not reach a computer's Ollama service from Android.

Provide a trusted, reachable **HTTPS** address for the Dataforge companion service using an authenticated reverse proxy/private-access arrangement appropriate to your network. The UI rejects plain HTTP remote addresses. A LAN address such as `http://192.168.x.x:8787` is not an accepted remote endpoint. Do not disable certificate checks or expose an unauthenticated model port as a shortcut.

Keep Ollama itself on loopback. If the Dataforge companion binds off loopback, configure `TUTOR_ACCESS_TOKEN`; the server requires it for a non-loopback bind. Set `APP_ORIGIN` to the actual requesting app origin. A reverse proxy must forward requests to the companion; the phone's Service address is the companion's base address, not Ollama's port 11434 and not an `/api/tutor` URL.

### In the app

1. Open **Research tutor → Connection**.
2. Enter the companion's base **Service address**, for example your real `https://tutor.example.com` address. This example domain is a placeholder, not a supplied service.
3. If configured, enter **Service access token**. Use the companion's `TUTOR_ACCESS_TOKEN`, not a model provider's API key.
4. Choose **Check connection**. Confirm **Model available**; “the HTTP server responds” alone is insufficient if its model inventory is not ready.
5. Enable **Allow sending my question and selected passages to this service** when you are comfortable with that transmission.
6. Return to **Ask & verify**, choose your source scope, set **Response → Explain with Llama**, enter a question and choose **Ask tutor**.
7. Read the explanation, limitations and suggested practice. Open the citations and check the original evidence.

The Service address persists on this device. The access token is session-only; consent and readiness may need to be set/check again after reopening the workspace. Generation sends your question and retrieved excerpts to the configured service. Source retrieval is local; generation is not automatically local merely because the button says Llama.

The service requests structured factual claims with supporting exact quotes. Invalid source numbers, missing quotes and fabricated excerpts are rejected instead of shown as verified claims. A response can abstain when evidence is insufficient. **Answer provenance** shows model, request ID and timing; keep the request ID when reporting a problem, without posting private passages.

## What is saved, backed up and synchronized?

| Data | Local progress JSON / account snapshot | Separate device-local evidence store |
| --- | --- | --- |
| Attempts, XP inputs and review schedules | Yes | No |
| Display name, goal and profile-picture choice | Yes | No |
| Bookmarks, project checklists and SQL drafts | Yes | No |
| Resource status, roadmap status and evidence notes | Yes | No |
| Imported PDF/text bytes and extracted page index | No | Yes |
| Tutor service access token | No; session-only | No |
| Model weights / Ollama | No | No; live on the model computer |

### Account cloud sync

On the signed-in hosted app, open **Cloud sync**:

1. Export local progress first when reconciling devices.
2. **Load account snapshot** to inspect what is stored.
3. Choose **Merge**, **Use account snapshot** or **Keep this device** deliberately.
4. **Save this device to account** publishes the selected local state to your private snapshot.

Merge combines attempts and saved lists; this device wins conflicting notes, drafts, settings and review schedules. **Use account snapshot** replaces local progress. **Keep this device** does not merge; it permits an explicit save of this device's state against the loaded revision. A newer save from another device is rejected instead of silently overwritten: load, review and save again.

Sync is manual while the app is open, not a background service. Native Android local storage is not automatically authenticated to the hosted account API. If the packaged build reports account sync unavailable, use export/import or the signed-in website; do not assume a browser sign-in is shared with the APK. Original PDFs must be transferred and imported separately on every device.

### Optional Google Drive backup

An ordinary shared Drive folder link does not authorize app synchronization. Drive backup requires a Google OAuth web client ID, Drive API configuration, correct authorized app origin and interactive consent. Use the **Optional Google Drive backup** section and the setup instructions there. No client secret belongs in the app. Its snapshots use private Drive app-data storage, not an arbitrary shared folder. Native OAuth support may differ from the hosted browser; use a supported browser flow if the packaged build cannot authorize it.

### Export and restore

**Settings → Export progress** downloads a dated JSON backup. **Import backup** validates a selected file and asks before replacing this device's progress. The import limit is 10 MB. Keep the original file when an import fails; do not edit its version or delete fields to bypass validation. Back up original PDFs separately. Download/file-opening behavior depends on the packaged Android integration and device file manager; verify that the file actually exists before resetting or uninstalling.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| “No usable text found” | The selected range may be scanned or nearly empty. Run OCR externally, export a text PDF and reimport. |
| Invalid PDF range | Use physical pages present in that document and at most 500 pages per import. Through must not precede From. |
| Import too large / storage failure | Start with fewer pages, check 35 MB and text limits, and confirm free device storage. Retain originals before removing indexed entries. |
| A book is listed but cannot be searched | A catalog/resource link is not indexed. Use Add to research or import a downloaded file. |
| No relevant passages | Check source filter, exact indexed page ranges and specific terms shared with the document. |
| Search exceeds 20 seconds | Narrow the library/scope; avoid indexing unrelated pages. Cancel and try a smaller source collection. |
| PDF page differs from printed page number | Citation uses the physical page counter, including cover/front matter. |
| Original page does not render | Open the original PDF if supported; reimport legacy entries that lack original bytes. Do not infer that an excerpt proves a page image was verified. |
| “Could not reach the tutor” | Check computer power/network, HTTPS endpoint, exact allowed origin, access token and companion process. Phone localhost is not desktop localhost. |
| “Model not ready” | Confirm Ollama/provider is running and the exact configured model is installed and supports the structured output requested. |
| Tutor rejects a response / 422 | Model output failed schema or citation checks. Retry a narrower question with clearer evidence; keep the request ID. Do not treat rejected output as a correct answer. |
| Tutor busy / 429 / timeout | One generation runs at a time per service process. Wait or cancel, then check provider load; model calls have a 120-second deadline. |
| Cloud snapshot conflict | Load the latest revision, review the choices and save explicitly. Export both devices first if unsure. |
| Account sync unavailable in APK | Packaged local origin/sign-in differs from the hosted service. Use JSON transfer or the signed-in hosted app until that integration is supported. |
| Data missing after reinstall/clear storage | Restore your progress export and reimport original PDFs. A model server does not hold your local learning library. |
| Offline external links or generation fail | Continue cached/local practice and evidence work, then reconnect. External sources, model services and sync still need connectivity. |

For technical setup and limits, see [RAG operations](RAG_OPERATIONS.md), [RAG architecture](RAG_ARCHITECTURE.md), [roadmap behavior](ROADMAP.md) and [integration setup](INTEGRATION_SETUP.md). Report the device/Android version, exact action, visible error and whether it happened in the APK or website. Avoid including access tokens or private document text in a public issue.
