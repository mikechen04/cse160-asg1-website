// Helper function to create a color variation
function varyColor(baseColor, variationIndex) {
    // Create subtle variations: ±0.02 to ±0.03 for RGB components
    // Use variationIndex to create different patterns
    const variations = [
        [0.02, 0.015, -0.015],  // Slightly brighter, more red, less blue
        [-0.015, 0.02, 0.015],  // Slightly dimmer, more green, more blue
        [0.015, -0.015, 0.02],  // More red, less green, more blue
        [-0.02, 0.015, 0.015],  // Dimmer, more green, more blue
        [0.015, 0.02, -0.015],  // More red, more green, less blue
        [-0.015, -0.015, 0.02], // Less red, less green, more blue
    ];
    
    const variation = variations[variationIndex % variations.length];
    return [
        Math.max(0, Math.min(1, baseColor[0] + variation[0])),
        Math.max(0, Math.min(1, baseColor[1] + variation[1])),
        Math.max(0, Math.min(1, baseColor[2] + variation[2])),
        baseColor[3] // Keep alpha the same
    ];
}

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
    
    // Thorax section 1 (yellow) - two triangles with variations
    const thorax1Top = 0.35;
    const thorax1Bottom = 0.2;
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.7, thorax1Top, bodyCenterX + bodyWidth * 0.7, thorax1Top, bodyCenterX - bodyWidth, thorax1Bottom], varyColor(YELLOW, 0));
    drawColoredTriangle([bodyCenterX + bodyWidth * 0.7, thorax1Top, bodyCenterX + bodyWidth, thorax1Bottom, bodyCenterX - bodyWidth, thorax1Bottom], varyColor(YELLOW, 1));
    
    // Thorax section 2 (dark grey) - two triangles with variations
    const thorax2Top = 0.2;
    const thorax2Bottom = 0.05;
    drawColoredTriangle([bodyCenterX - bodyWidth, thorax2Top, bodyCenterX + bodyWidth, thorax2Top, bodyCenterX - bodyWidth * 0.8, thorax2Bottom], varyColor(DARK_GRAY, 0));
    drawColoredTriangle([bodyCenterX + bodyWidth, thorax2Top, bodyCenterX + bodyWidth * 0.8, thorax2Bottom, bodyCenterX - bodyWidth * 0.8, thorax2Bottom], varyColor(DARK_GRAY, 1));
    
    // Abdomen stripe 1 (yellow) - two triangles with variations
    const abdomen1Top = 0.05;
    const abdomen1Bottom = -0.1;
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.8, abdomen1Top, bodyCenterX + bodyWidth * 0.8, abdomen1Top, bodyCenterX - bodyWidth * 0.9, abdomen1Bottom], varyColor(YELLOW, 2));
    drawColoredTriangle([bodyCenterX + bodyWidth * 0.8, abdomen1Top, bodyCenterX + bodyWidth * 0.9, abdomen1Bottom, bodyCenterX - bodyWidth * 0.9, abdomen1Bottom], varyColor(YELLOW, 3));
    
    // Abdomen stripe 2 (dark grey) - two triangles with variations
    const abdomen2Top = -0.1;
    const abdomen2Bottom = -0.25;
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.9, abdomen2Top, bodyCenterX + bodyWidth * 0.9, abdomen2Top, bodyCenterX - bodyWidth * 0.85, abdomen2Bottom], varyColor(DARK_GRAY, 2));
    drawColoredTriangle([bodyCenterX + bodyWidth * 0.9, abdomen2Top, bodyCenterX + bodyWidth * 0.85, abdomen2Bottom, bodyCenterX - bodyWidth * 0.85, abdomen2Bottom], varyColor(DARK_GRAY, 3));
    
    // Abdomen stripe 3 (yellow) - two triangles with variations
    const abdomen3Top = -0.25;
    const abdomen3Bottom = -0.35;
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.85, abdomen3Top, bodyCenterX + bodyWidth * 0.85, abdomen3Top, bodyCenterX - bodyWidth * 0.7, abdomen3Bottom], varyColor(YELLOW, 4));
    drawColoredTriangle([bodyCenterX + bodyWidth * 0.85, abdomen3Top, bodyCenterX + bodyWidth * 0.7, abdomen3Bottom, bodyCenterX - bodyWidth * 0.7, abdomen3Bottom], varyColor(YELLOW, 5));
    
    // Abdomen tip (dark grey, pointed)
    const tipTop = -0.35;
    const tipBottom = -0.45;
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.7, tipTop, bodyCenterX + bodyWidth * 0.7, tipTop, bodyCenterX, tipBottom], DARK_GRAY);
    
    // Wings (light blue/cyan, two pairs, extended more outwards) - with variations
    // Upper left wing - two triangles with variations
    drawColoredTriangle([bodyCenterX - bodyWidth * 0.3, 0.25, bodyCenterX - bodyWidth * 2.8, 0.3, bodyCenterX - bodyWidth * 0.5, 0.1], varyColor(WING, 0));
    drawColoredTriangle([bodyCenterX - bodyWidth * 2.8, 0.3, bodyCenterX - bodyWidth * 1.8, 0.15, bodyCenterX - bodyWidth * 0.5, 0.1], varyColor(WING, 1));
    
    // Upper right wing - two triangles with variations
    drawColoredTriangle([bodyCenterX + bodyWidth * 0.3, 0.25, bodyCenterX + bodyWidth * 0.5, 0.1, bodyCenterX + bodyWidth * 2.8, 0.3], varyColor(WING, 2));
    drawColoredTriangle([bodyCenterX + bodyWidth * 2.8, 0.3, bodyCenterX + bodyWidth * 0.5, 0.1, bodyCenterX + bodyWidth * 1.8, 0.15], varyColor(WING, 3));
    
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

// Function to draw initials "M.C." in white triangles at bottom left
function drawInitials() {
    const WHITE = [1.0, 1.0, 1.0, 1.0];
    
    // Position in bottom left corner
    const startX = -0.9;
    const startY = -0.9;
    const letterHeight = 0.2;
    const letterWidth = 0.15;
    const lineThickness = 0.025;
    const spacing = 0.08; // Space between M and C
    
    // Draw "M"
    const mLeft = startX;
    const mRight = startX + letterWidth;
    const mTop = startY + letterHeight;
    const mBottom = startY;
    const mMidX = (mLeft + mRight) / 2;
    const mMidY = mBottom + letterHeight * 0.6; // Point of the V in M
    
    // Left vertical line of M (thick line made of triangles)
    drawColoredTriangle([mLeft, mTop, mLeft, mBottom, mLeft + lineThickness, mTop], WHITE);
    drawColoredTriangle([mLeft, mBottom, mLeft + lineThickness, mBottom, mLeft + lineThickness, mTop], WHITE);
    
    // Left diagonal of M (from top left to middle point)
    drawColoredTriangle([mLeft, mTop, mMidX, mMidY, mLeft + lineThickness, mTop], WHITE);
    drawColoredTriangle([mLeft, mTop, mMidX, mMidY, mMidX - lineThickness * 0.5, mMidY + lineThickness * 0.5], WHITE);
    
    // Right diagonal of M (from middle point to top right)
    drawColoredTriangle([mMidX, mMidY, mRight, mTop, mMidX + lineThickness * 0.5, mMidY + lineThickness * 0.5], WHITE);
    drawColoredTriangle([mMidX, mMidY, mRight, mTop, mRight - lineThickness, mTop], WHITE);
    
    // Right vertical line of M
    drawColoredTriangle([mRight, mTop, mRight, mBottom, mRight - lineThickness, mTop], WHITE);
    drawColoredTriangle([mRight, mBottom, mRight - lineThickness, mBottom, mRight - lineThickness, mTop], WHITE);
    
    // Draw "C"
    const cLeft = mRight + spacing;
    const cRight = cLeft + letterWidth;
    const cTop = startY + letterHeight;
    const cBottom = startY;
    
    // Left vertical line of C
    drawColoredTriangle([cLeft, cTop, cLeft, cBottom, cLeft + lineThickness, cTop], WHITE);
    drawColoredTriangle([cLeft, cBottom, cLeft + lineThickness, cBottom, cLeft + lineThickness, cTop], WHITE);
    
    // Top horizontal line of C (curved inward)
    drawColoredTriangle([cLeft, cTop, cRight - lineThickness * 1.5, cTop, cLeft, cTop - lineThickness], WHITE);
    drawColoredTriangle([cLeft, cTop, cRight - lineThickness * 1.5, cTop, cRight - lineThickness * 1.5, cTop - lineThickness], WHITE);
    
    // Bottom horizontal line of C (curved inward)
    drawColoredTriangle([cLeft, cBottom, cRight - lineThickness * 1.5, cBottom, cLeft, cBottom + lineThickness], WHITE);
    drawColoredTriangle([cLeft, cBottom, cRight - lineThickness * 1.5, cBottom, cRight - lineThickness * 1.5, cBottom + lineThickness], WHITE);
}
