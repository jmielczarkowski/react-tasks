/**
 * Regex validators.
 */

export function IsPathCorrect (value) {
    const patternRegex = /.*\w\/.*/;      
    return patternRegex.test(value);
}