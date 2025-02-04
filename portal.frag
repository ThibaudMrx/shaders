#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.502, 0.502, 0.502);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.2235, 0.3529, 0.4745);
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {
    vec2 uv = (2. * gl_FragCoord.xy - u_resolution.xy) /  u_resolution.y ;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    for (float i = 0.0; i < 4.0; i++) {
        uv = fract(2.0*uv) -.5;
        float d = length(uv - 0.0) * exp(-length(uv0)) - 40.;
        vec3 col = palette(length(uv0) + u_time*0.4 + i*4.0);

        d = sin(d*8.0 + u_time)/8.0;
        d = abs(d);
        d = pow(0.01 / d, 1.2);

        finalColor += col *d;
    } 
    gl_FragColor = vec4(finalColor, 1.0);
}


