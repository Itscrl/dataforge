# Connected learning setup

Implemented on 2026-11-06. Desktop installers and Android packages are deliberately deferred until the owner approves the experience. The browser app remains usable on both devices.

## Google Drive

Google's Drive app-data folder stores private application records under `drive.appdata`, without access to the rest of the user's files. [Official guide](https://developers.google.com/workspace/drive/api/guides/appdata). The app uses Google's token model, keeping the short-lived access token only in memory. [Token model](https://developers.google.com/identity/oauth2/web/guides/use-token-model).

1. Create a Google Cloud project, enable Google Drive API, and configure Google Auth Platform branding, audience and data access.
2. Select the `https://www.googleapis.com/auth/drive.appdata` scope. For testing, add the owner's Google account as an allowed test user.
3. Create a Web application OAuth client. Add authorized JavaScript origins `https://dataforge-cj-lab.swiftguide8.chatgpt.site` and the exact local origin you use (for example `http://localhost:5173`). Origins have no path/hash. No client secret goes in this browser app.
4. Copy the public client ID into Cloud sync, connect interactively, save a snapshot, then authorize the same client/account on the second device and preview the latest snapshot.
5. Review merge/replace choices before loading. Merge combines attempts by unique ID and saved lists; this device wins conflicting notes, drafts, review schedules and settings. Resource status is stored in notes and follows that policy. Export before replacing.

This is explicit snapshot synchronization while the app is open, not unattended background synchronization or collaborative editing. Each save appends a private snapshot to avoid overwriting another device. Snapshot retention/cleanup is not automated yet; manage app-data storage through Google Drive settings if needed. PDF imports are stored locally in IndexedDB and are excluded from progress sync.

The owner's shared learning folder is [here](https://drive.google.com/drive/folders/1xHOy3gR63mrQ4zHIV7BFDn4ieyIFtq5Z). A sharing URL is neither an OAuth credential nor a guarantee of write access. Its contents were not accessible through available read tools during implementation. This release does not crawl that folder; download authorized material and import it in the tutor. Direct folder import needs Drive file-picker/scopes and an explicit document-permission flow, separate from private progress snapshots.

## Llama and source-grounded tutoring

The companion server is `server/tutor.mjs`. Install Ollama from its official distribution, then download the desired model:

```powershell
ollama pull llama3.1:8b
Copy-Item .env.example .env
node --env-file=.env server/tutor.mjs
```

Llama 3.1 8B is a practical local starting point, not an assertion that it is the highest-quality Llama. [Official Ollama model page](https://ollama.com/library/llama3.1) lists the default quantized download near 4.9 GB. Llama 3.3 70B requires much larger hardware; its listed download is about 43 GB. [Model page](https://ollama.com/library/llama3.3). Choose using measured factuality, supported citations, SQL explanations and latency on this app's evaluation questions rather than model size alone. No Ollama installation or model was found on the build computer, so real-model inference is not verified.

Set APP_ORIGIN to the exact web-app origin and LLAMA_MODEL to an installed tag. The default local endpoint is loopback port8787. Hosted OpenAI-compatible inference can use LLAMA_PROVIDER=compatible, LLAMA_BASE_URL ending in `/v1`, LLAMA_MODEL set to the provider's exact Llama model ID, and LLAMA_API_KEY in server environment variables. This uses a compatible protocol, not a dependency on an OpenAI model.

Do not expose this development server directly to the internet. Phone access needs a deployed HTTPS service with authenticated access, rate limits and infrastructure limits; non-loopback binding requires TUTOR_ACCESS_TOKEN. Put the provider secret only on that server. The browser service access token is session-only. Cross-origin calls allow just APP_ORIGIN. HTTPS-to-loopback requests can be blocked by browser private-network policies; using the local app and server together is the simplest initial setup.

The app chunks curated guide text and uploaded selectable-text PDFs/TXT/MD/CSV, ranks chunks lexically, displays the evidence and sends only those excerpts plus the question to the server after the learner opts in. The generator must cite numbered evidence and abstain when support is insufficient. This is a real retrieval-plus-generation pipeline when connected. Lexical retrieval is intentionally inspectable; embeddings/reranking and persistent document indexing are not yet implemented. The imported document's text is untrusted; system instructions prohibit treating it as commands. This reduces but does not eliminate prompt-injection risk. No tool execution is granted to the model. Citation numbers are range-checked; semantic citation support still needs evaluation.

PDF extraction is bounded to8 MB/150 pages/500,000 characters. Scanned PDFs need separate OCR. Document text is stored in browser IndexedDB, up to10 imported documents, and can be removed per document. Source pages and licensed resources are linked, not indiscriminately scraped or redistributed. The model does not judge SQL correctness; database execution still does.

## Python

The Python lab loads pinned Pyodide0.27.7 from its official CDN distribution on demand in a dedicated worker. It runs actual standard-library code and exercise assertions. Cancellation terminates the worker; a60-second deadline includes initialization. Pyodide assets are not included in the app's offline cache. [Pyodide documentation](https://pyodide.org/en/stable/usage/webworker.html).

This is trusted-user practice, not a hostile-code sandbox. Code can access the browser environment through Python/JS interop and network APIs. No server filesystem or credentials are supplied. Do not run imported code you do not trust. Future multi-user server execution requires an OS/container sandbox with CPU/memory/network limits.

## Distributed practice

`public/labs/kafka-compose.yaml` supplies a local three-node Kafka4.0.2 exercise with replication3/minISR2. Internal-only listeners and ephemeral containers reduce accidental external exposure. Docker must be running and have adequate memory. [Official Kafka image instructions](https://kafka.apache.org/40/getting-started/docker/). The Docker engine was unavailable during the build, so service startup/failover is unverified. The YAML configuration is parsed by Docker Compose checks; do not label the lab runtime validated until you run the exercise and capture its acceptance evidence. Spark/Flink are linked official guided extensions, not provisioned cloud clusters.

## Release gates

Completed local checks are recorded in the upgrade QA report. External gates remain: authorize two-device Drive sync with a real OAuth client; run the installed Llama on gold questions; verify PDF page provenance and difficult tables; run Kafka failure experiments; test Python CDN initialization on physical Android; assess TalkBack and low-memory behavior. These are integration verification needs, not reasons to represent setup-dependent buttons as already-connected services.
