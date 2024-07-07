const glsl = x => x[0];

export const operations = glsl`
float combination(float d1, float d2) { // union
    return min(d1, d2);
}

float subtraction(float d1, float d2) {
    return max(-d1, d2);
}

float intersection(float d1, float d2) {
    return max(d1, d2);
}

float xor(float d1, float d2) {
    return max(min(d1, d2), -max(d1, d2));
}

mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}`;
