import * as fs from 'node:fs';
import * as path from 'node:path';

export type DomainFlaggedParam = {
    domain: string;
    params: string[];
};

type FlaggedParamsMap = Map<string, Set<string>>;

const FLAGGED_PARAMS_FILE = path.resolve(__dirname, 'flagged-params.json');

let params = loadFromFile();

function normalizeDomain(domain: string): string {
    return domain.replace(/^www\./, '');
}

function loadFromFile(): FlaggedParamsMap {
    try {
        const data = fs.readFileSync(FLAGGED_PARAMS_FILE, 'utf-8');
        const parsed = JSON.parse(data) as DomainFlaggedParam[];
        return new Map(
            parsed.map(item => [item.domain, new Set(item.params)] as [string, Set<string>])
        );
    } catch (error) {
        console.error(`Failed to load flagged params: ${error}`);
        return new Map();
    }
}

export function getFlaggedParams(domain: string): string[] {
    const normalized = normalizeDomain(domain);
    return Array.from(params.get(normalized) ?? new Set());
}

/** Commenting to keep for future ticket where commands are added to manage flagged params
function saveToFile(): void {
    try {
        const data: DomainFlaggedParam[] = Array.from(params).map(([domain, paramSet]) => ({
            domain,
            params: Array.from(paramSet),
        }));
        fs.writeFileSync(FLAGGED_PARAMS_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Failed to save flagged params: ${error}`);
    }
}
*/

/** Commenting to keep for future ticket where commands are added to manage flagged params
export function addFlaggedParam(domain: string, param: string): void {
    const normalized = normalizeDomain(domain);
    const existing = params.get(normalized);
    
    if (existing) {
        if (!existing.has(param)) {
            existing.add(param);
            saveToFile();
        }
    } else {
        params.set(normalized, new Set([param]));
        saveToFile();
    }
}

export function removeFlaggedParams(domain: string): void {
    const normalized = normalizeDomain(domain);
    if (params.delete(normalized)) {
        saveToFile();
    }
}
**/
