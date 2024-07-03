export function distanceBetweenTwoPoints (coord1:[number,number], coord2:[number,number]){
    const lat1 = coord1[0];
    const lat2 = coord2[0];
    const lon1 = coord1[1];
    const lon2 = coord2[1];

    const r = 3958; // km
    const p = Math.PI / 180;

    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
        + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
        (1 - Math.cos((lon2 - lon1) * p)) / 2;

    return 2 * r * Math.asin(Math.sqrt(a));
}
