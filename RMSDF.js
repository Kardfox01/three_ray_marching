const glsl = x => x[0];


export const SDF = glsl`
float sphereSDF(vec3 position, float s) {
    return length(position) - s;
}

float boxSDF(vec3 position, vec3 b) {
  vec3 q = abs(position) - b;
  return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.);
}

float linkSDF(vec3 position, float le, float r1, float r2) {
  vec3 q = vec3(position.x, max(abs(position.y) - le, 0.), position.z);
  return length(vec2(length(q.xy) - r1, q.z)) - r2;
}`;
