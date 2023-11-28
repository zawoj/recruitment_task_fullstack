import { HistoryRate } from "../types/common"
/**
 * Generates a height value for each rate in the provided array, 
 * scaling them between a defined maximum and minimum height.
 * 
 * @param {HistoryRate[]} rates - An array of historical rate objects.
 * @returns {HistoryRate[]} An array of historical rate objects,
 */
export const genHeight = (rates: HistoryRate[]) => {
    const max = Math.max(...rates.map(rate => rate.mid));
    const min = Math.min(...rates.map(rate => rate.mid));
    const maxH = 150;  // Maximum height for a rate bar.
    const minH = 20;   // Minimum height for a rate bar.
    const range = max !== min ? max - min : 1; // Prevents division by zero.
    const step = (maxH - minH) / range; // Height increment per rate unit.

    return rates.map(rate => {
        const height = (rate.mid - min) * step + minH;
        return {
            ...rate,
            height  // Scaled height based on rate value.
        };
    });
}