const glsl = x => x[0];

export const vertex = glsl`

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export const fragment = glsl`

uniform float uTime;

out vec4 fragColor;
varying vec2 vUv;

float map(vec3 position) {
    vec3 spherePosition = vec3(sin(uTime) * 3., 0, 0);

    float sphere = sphereSDF((position - spherePosition), 1.);

    vec3 positionCopy = position;
    positionCopy.xy *= rotate(uTime);
    float box = boxSDF(positionCopy, vec3(.75));

    float ground = position.y + 1.5;

    return smoothMin(ground, smoothCombination(sphere, box, 2.), 1.);
}

void main() {
    vec2 uv = vUv * 2. - 1.;
    uv.x *= aspect;

    vec3 rayOrigin = vec3(0, 0, -3);
    vec3 rayDirection = normalize(vec3(uv * 1.5, 1));
    vec3 color = vec3(0);

    float t = 0.;

    for (int i = 0; i < 80; i++) {
        vec3 position = rayOrigin + rayDirection * t;
        float d = map(position);
        t += d;

        if (d < .001 || t > 100.) break;
    }

    color = vec3(t * .1);
    color[2] *= 4.;
    color[0] *= 2.;

    fragColor = vec4(color, 1);
}`;
