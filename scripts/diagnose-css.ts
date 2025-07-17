import fs from "fs"

console.log("🔍 DIAGNOSTIC CSS - GrooveNomad")
console.log("================================\n")

// 1. Vérifier les fichiers essentiels
const essentialFiles = [
  "tailwind.config.ts",
  "postcss.config.mjs",
  "app/globals.css",
  "package.json",
  "next.config.mjs",
]

console.log("📁 Vérification des fichiers essentiels:")
essentialFiles.forEach((file) => {
  const exists = fs.existsSync(file)
  console.log(`${exists ? "✅" : "❌"} ${file}`)

  if (!exists) {
    console.log(`   ⚠️  Fichier manquant: ${file}`)
  }
})

// 2. Vérifier le contenu de globals.css
console.log("\n🎨 Vérification de app/globals.css:")
if (fs.existsSync("app/globals.css")) {
  const cssContent = fs.readFileSync("app/globals.css", "utf8")
  const hasTailwindBase = cssContent.includes("@tailwind base")
  const hasTailwindComponents = cssContent.includes("@tailwind components")
  const hasTailwindUtilities = cssContent.includes("@tailwind utilities")

  console.log(`${hasTailwindBase ? "✅" : "❌"} @tailwind base`)
  console.log(`${hasTailwindComponents ? "✅" : "❌"} @tailwind components`)
  console.log(`${hasTailwindUtilities ? "✅" : "❌"} @tailwind utilities`)
} else {
  console.log("❌ app/globals.css introuvable")
}

// 3. Vérifier package.json
console.log("\n📦 Vérification des dépendances:")
if (fs.existsSync("package.json")) {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))
  const requiredDeps = ["tailwindcss", "postcss", "autoprefixer", "tailwindcss-animate"]

  requiredDeps.forEach((dep) => {
    const hasInDeps = packageJson.dependencies?.[dep]
    const hasInDevDeps = packageJson.devDependencies?.[dep]
    const exists = hasInDeps || hasInDevDeps
    console.log(`${exists ? "✅" : "❌"} ${dep}`)
  })
}

// 4. Vérifier la configuration Tailwind
console.log("\n⚙️  Vérification de tailwind.config.ts:")
if (fs.existsSync("tailwind.config.ts")) {
  const tailwindConfig = fs.readFileSync("tailwind.config.ts", "utf8")
  const hasContent = tailwindConfig.includes("content:")
  const hasAppPath = tailwindConfig.includes("./app/**/*.{ts,tsx}")
  const hasComponentsPath = tailwindConfig.includes("./components/**/*.{ts,tsx}")

  console.log(`${hasContent ? "✅" : "❌"} Configuration content`)
  console.log(`${hasAppPath ? "✅" : "❌"} Chemin ./app/**/*.{ts,tsx}`)
  console.log(`${hasComponentsPath ? "✅" : "❌"} Chemin ./components/**/*.{ts,tsx}`)
}

console.log("\n🚀 SOLUTIONS RECOMMANDÉES:")
console.log("1. Exécuter: npm install")
console.log("2. Redémarrer le serveur: npm run dev")
console.log("3. Vider le cache: rm -rf .next")
console.log("4. Si problème persiste, utiliser le script de réparation")
