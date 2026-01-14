function drawBee() {
    const DARK_GRAY = [0.2, 0.2, 0.2, 1.0];
    const YELLOW = [1.0, 0.85, 0.0, 1.0];
    const WING = [0.7, 0.8, 0.95, 0.75];
    
    // Bee centered at origin (0, 0)
    // Body coordinates (vertical, centered horizontally)
    const bodyCenterX = 0.0;
    const bodyWidth = 0.15;
    
    // Head (dark grey, triangle shape pointing up)
    const headTop = 0.5;
    const headBottom = 0.35;
    drawColoredTriangle([bodyCenterX, headTop, bodyCenterX - bodyWidth * 0.8, headBottom, bodyCenterX + bodyWidth * 0.8, headBottom], DARK_GRAY);
    
    // Thorax section 1 (yellow)
    const thorax1Top = 0.35;
    const thorax1Bottom = 0.2;
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.7, thorax1Top, bodyCenterX + bodyWidth * 0.7, thorax1Top, bodyCenterX - bodyWidth, thorax1Bottom], YELLOW);
    drawColoredTriangle([bodyCenterX + bodyWidth * 0.7, thorax1Top, bodyCenterX + bodyWidth, thorax1Bottom, bodyCenterX - bodyWidth, thorax1Bottom], YELLOW);
    
    // Thorax section 2 (dark grey)
    const thorax2Top = 0.2;
    const thorax2Bottom = 0.05;
    drawColoredTriangle([bodyCenterX - bodyWidth, thorax2Top, bodyCenterX + bodyWidth, thorax2Top, bodyCenterX - bodyWidth * 0.8, thorax2Bottom], DARK_GRAY);
    drawColoredTriangle([bodyCenterX + bodyWidth, thorax2Top, bodyCenterX + bodyWidth * 0.8, thorax2Bottom, bodyCenterX - bodyWidth * 0.8, thorax2Bottom], DARK_GRAY);
    
    // Abdomen stripe 1 (yellow)
    const abdomen1Top = 0.05;
    const abdomen1Bottom = -0.1;
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.8, abdomen1Top, bodyCenterX + bodyWidth * 0.8, abdomen1Top, bodyCenterX - bodyWidth * 0.9, abdomen1Bottom], YELLOW);
    drawColoredTriangle([bodyCenterX + bodyWidth * 0.8, abdomen1Top, bodyCenterX + bodyWidth * 0.9, abdomen1Bottom, bodyCenterX - bodyWidth * 0.9, abdomen1Bottom], YELLOW);
    
    // Abdomen stripe 2 (dark grey)
    const abdomen2Top = -0.1;
    const abdomen2Bottom = -0.25;
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.9, abdomen2Top, bodyCenterX + bodyWidth * 0.9, abdomen2Top, bodyCenterX - bodyWidth * 0.85, abdomen2Bottom], DARK_GRAY);
    drawColoredTriangle([bodyCenterX + bodyWidth * 0.9, abdomen2Top, bodyCenterX + bodyWidth * 0.85, abdomen2Bottom, bodyCenterX - bodyWidth * 0.85, abdomen2Bottom], DARK_GRAY);
    
    // Abdomen stripe 3 (yellow)
    const abdomen3Top = -0.25;
    const abdomen3Bottom = -0.35;
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.85, abdomen3Top, bodyCenterX + bodyWidth * 0.85, abdomen3Top, bodyCenterX - bodyWidth * 0.7, abdomen3Bottom], YELLOW);
    drawColoredTriangle([bodyCenterX + bodyWidth * 0.85, abdomen3Top, bodyCenterX + bodyWidth * 0.7, abdomen3Bottom, bodyCenterX - bodyWidth * 0.7, abdomen3Bottom], YELLOW);
    
    // Abdomen tip (dark grey, pointed)
    const tipTop = -0.35;
    const tipBottom = -0.45;
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.7, tipTop, bodyCenterX + bodyWidth * 0.7, tipTop, bodyCenterX, tipBottom], DARK_GRAY);
    
    // Wings (light blue/cyan, two pairs, extended more outwards)
    // Upper left wing
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.3, 0.25, bodyCenterX - bodyWidth * 2.8, 0.3, bodyCenterX - bodyWidth * 0.5, 0.1], WING);
    drawColoredTriangle([bodyCenterX - bodyWidth * 2.8, 0.3, bodyCenterX - bodyWidth * 1.8, 0.15, bodyCenterX - bodyWidth * 0.5, 0.1], WING);
    
    // Upper right wing
    drawColoredTriangle([bodyCenterX + bodyWidth * 0.3, 0.25, bodyCenterX + bodyWidth * 0.5, 0.1, bodyCenterX + bodyWidth * 2.8, 0.3], WING);
    drawColoredTriangle([bodyCenterX + bodyWidth * 2.8, 0.3, bodyCenterX + bodyWidth * 0.5, 0.1, bodyCenterX + bodyWidth * 1.8, 0.15], WING);
    
    /*// Lower left wing (flipped to right side)
    drawColoredTriangle([bodyCenterX + bodyWidth * 0.3, 0.15, bodyCenterX + bodyWidth * 1.8, 0.2, bodyCenterX + bodyWidth * 0.5, 0.0], WING);
    drawColoredTriangle([bodyCenterX + bodyWidth * 1.8, 0.2, bodyCenterX + bodyWidth * 1.1, 0.05, bodyCenterX + bodyWidth * 0.5, 0.0], WING);
    
    // Lower right wing (flipped to left side)
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.3, 0.15, bodyCenterX - bodyWidth * 0.5, 0.0, bodyCenterX - bodyWidth * 1.8, 0.2], WING);
    drawColoredTriangle([bodyCenterX - bodyWidth * 1.8, 0.2, bodyCenterX - bodyWidth * 0.5, 0.0, bodyCenterX - bodyWidth * 1.1, 0.05], WING);
    */
    // Antennae (dark grey, bigger, more triangular)
    // Left antenna
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.3, headTop, bodyCenterX - bodyWidth * 2.0, headTop + 0.12, bodyCenterX - bodyWidth * 1.4, headTop + 0.15], DARK_GRAY);
    // Right antenna (mirrored)
    drawColoredTriangle([bodyCenterX + bodyWidth * 0.3, headTop, bodyCenterX + bodyWidth * 2.0, headTop + 0.12, bodyCenterX + bodyWidth * 1.2, headTop + 0.12], DARK_GRAY);
}




// Helper function to draw a triangle with a specific color
function drawColoredTriangle(vertices, color) {
    gl.uniform4f(u_FragColor, color[0], color[1], color[2], color[3]);
    drawTriangle(vertices);
}
