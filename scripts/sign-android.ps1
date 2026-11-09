param([string]$SdkPath=$env:ANDROID_HOME)
$ErrorActionPreference='Stop'
$projectRoot=Split-Path $PSScriptRoot -Parent
$privateDir=Join-Path $projectRoot '.android-signing'
$outputDir=Join-Path $projectRoot 'releases'
New-Item -ItemType Directory -Force -Path $privateDir,$outputDir | Out-Null
$keyPath=Join-Path $privateDir 'dataforge-release.jks'
$passwordPath=Join-Path $privateDir 'password.txt'
if (!(Test-Path -LiteralPath $keyPath)) {
 $randomBytes=New-Object byte[] 32
 [Security.Cryptography.RandomNumberGenerator]::Fill($randomBytes)
 [Convert]::ToBase64String($randomBytes) | Set-Content -LiteralPath $passwordPath -NoNewline
 $env:DATAFORGE_SIGNING_PASSWORD=Get-Content -LiteralPath $passwordPath -Raw
 & "$env:JAVA_HOME/bin/keytool.exe" -genkeypair -keystore $keyPath -alias dataforge -keyalg RSA -keysize 3072 -validity 10000 -storepass:env DATAFORGE_SIGNING_PASSWORD -keypass:env DATAFORGE_SIGNING_PASSWORD -dname 'CN=Dataforge, OU=Personal App, O=Itscrl'
 if($LASTEXITCODE -ne 0){throw 'Key generation failed'}
}
$env:DATAFORGE_SIGNING_PASSWORD=Get-Content -LiteralPath $passwordPath -Raw
try {
 $signer=Join-Path $SdkPath 'build-tools/36.1.0/apksigner.bat'
 $apk=Join-Path $outputDir 'Dataforge-0.4.0.apk'
 & $signer sign --ks $keyPath --ks-key-alias dataforge --ks-pass env:DATAFORGE_SIGNING_PASSWORD --key-pass env:DATAFORGE_SIGNING_PASSWORD --out $apk (Join-Path $projectRoot 'android/app/build/outputs/apk/release/app-release-unsigned.apk')
 if($LASTEXITCODE -ne 0){throw 'APK signing failed'}
 & $signer verify --verbose --print-certs $apk
 if($LASTEXITCODE -ne 0){throw 'APK signature verification failed'}
 Get-FileHash -Algorithm SHA256 -LiteralPath $apk | Format-List
} finally {Remove-Item Env:DATAFORGE_SIGNING_PASSWORD -ErrorAction SilentlyContinue}
