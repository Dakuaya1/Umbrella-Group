import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, '../data/properties.json');
const outputPath = path.resolve(__dirname, '../src/data/properties.js');

if (!fs.existsSync(dataPath)) {
  console.error(`❌ Data file not found: ${dataPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const jsContent = `// AUTO-GENERATED - Do not edit manually
// Generated at: ${new Date().toISOString()}

export const DATA_VERSION = '${data.version}';
export const LAST_UPDATED = '${data.lastUpdated}';

export const PROPS = ${JSON.stringify(data.properties, null, 2)};

export default PROPS;
`;

fs.writeFileSync(outputPath, jsContent);
console.log(`✓ Generated ${outputPath} with ${data.properties.length} properties`);