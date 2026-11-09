# Dataforge Android 0.4.0

The installable, signed release is `releases/Dataforge-0.4.0.apk` (about 40 MB). It supports Android 9/API 28 or newer and needs a current Android System WebView. Copy it to your phone, open it in Files and follow Android's package installer. The app is personally signed, not published through Google Play. See [USER_GUIDE.md](USER_GUIDE.md) for importing progress, PDFs and using the tutor.

## What is included

The APK embeds the built client, learning content, PostgreSQL/PGlite and SQLite engines, self-hosted fonts, the two licensed PDF references and a flat vector launcher mark based on Dataforge's connected blocks. Six profile picture presets are available in Settings. Remote pages, Python runtime downloads and generated Llama answers still require the relevant network/service. The APK does not include a Llama model or run Ollama on your phone.

The native origin is `https://appassets.androidplatform.net`. PDF imports use the system document picker; progress and PDF exports use Android's create-document save dialog. Broad file-system/storage permissions and cleartext network traffic are disabled. External HTTPS links open outside the app. Account and Drive sync are not authenticated inside this local APK: the Cloud sync screen explains JSON transfer instead. Uninstalling/clearing app storage removes local progress and imported documents.

## Build and signing

1. Install Node, project dependencies, JDK 17, Android SDK platform 35 and build-tools 36.1.0. Set `JAVA_HOME` and `ANDROID_HOME` to their installations.
2. Run `node node_modules/typescript/bin/tsc -b` and `node node_modules/vitest/vitest.mjs run`.
3. Run `node node_modules/vite/bin/vite.js build`, then `node scripts/prepare-android.mjs`.
4. Run `android/gradlew.bat -p android assembleRelease lintRelease` (or `android/gradlew -p android assembleRelease lintRelease` on Unix).
5. On PowerShell, run `./scripts/sign-android.ps1`. It creates a signing key once, then reuses it for future builds. Keep `.android-signing/` backed up privately: losing the key prevents compatible signed updates. Never commit that directory or its password. Generated APKs and signing sidecars are also ignored by Git.

The signing script checks the APK signature and prints its SHA-256. Version code must increase for future releases. Keep the same package ID and key when upgrading; export progress first. The Gradle wrapper pins Gradle 8.10.2; the project pins Android Gradle Plugin 8.7.3 and AndroidX WebKit 1.12.1. These are build choices, not claims to be the newest versions.

## Verification and remaining limits

- TypeScript, 23 Vitest tests, Android release compilation and lint passed. Lint reported no errors; warnings cover target/dependency freshness, required JavaScript, backup rules and launcher refinements. These warnings were not represented as a warning-free build.
- APK signature verified with Android `apksigner`; package installed successfully on an Android API 36 emulator. Launch returned `Status: ok`, and the process remained running. Startup logs showed no Java fatal exception for Dataforge; WebView emitted environment/component warnings.
- Full native visual/file-picker/SQL/PDF interaction testing is **not established**. The emulator window could not be captured because its crop lay outside the monitor, and subsequent user input interrupted UI recovery. Installation/startup checks do not prove the screen rendered or every feature worked.
- The web engine/citation/sync tests remain useful checks of shared code, but do not replace physical phone testing. Real Llama generation still requires your configured model service. Export a backup and test PDF import, SQL execution and export on your phone before relying on the app as your only copy.

## Technical references

- [Android local web content guidance](https://developer.android.com/develop/ui/views/layout/webapps/load-local-content) and [WebViewAssetLoader](https://developer.android.com/reference/androidx/webkit/WebViewAssetLoader).
- [Android app signing](https://developer.android.com/studio/publish/app-signing).
- AndroidX WebKit is distributed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). Bundled PDF publishers' notices remain in `public/pdfs/ATTRIBUTION.txt` and `manifest.json`.
