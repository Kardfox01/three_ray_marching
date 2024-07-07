const glsl = x => x[0];

export const smoothOperations = glsl`
float smoothCombination(float d1, float d2, float k) { // smooth union
    float h = clamp(.5 + .5 * (d2 - d1) / k, 0., 1.);
    return mix(d2, d1, h) - k * h * (1. - h);
}

float smoothSubtraction(float d1, float d2, float k) {
    float h = clamp(.5 - .5 * (d2 + d1) / k, 0., 1.);
    return mix(d2, -d1, h) + k * h * (1. - h);
}

float smoothIntersection(float d1, float d2, float k) {
    float h = clamp(.5 - .5 * (d2 - d1) / k, 0., 1.);
    return mix(d2, d1, h) + k * h * (1.0 - h);
}

float smoothMin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.) / k;
    return min(a, b) - h * h * h * k * (1. / 6.);
}`;
