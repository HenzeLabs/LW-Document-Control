import React, { useRef } from 'react';

interface SignaturePadProps {
    onSave: (signature: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // A real implementation would have drawing logic with mouse/touch events.
    // This is a simplified version for demonstration.

    const handleClear = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
    
    const handleSave = () => {
        // In a real component, this would be canvas.toDataURL() after drawing.
        // We'll use a placeholder data URL to simulate a saved signature.
        const fakeSignature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAABkCAYAAACvgC0DAAAAAXNSR0IArs4c6QAAAs1JREFUeF7t1bFtwkAUAEF9/6EVWKEu0IEO0IEu0IEOoEMdKAI3wY2s7Nzb2c5/d5Kcnz1/7s9/f38/HwAAAAAAAAAAAMBf7ff79fP5/Pi8brfbP+FwOMzX6/Xv6/X6T7fb7R/8m7/fP/n9/o+fTqeP/P7+c39/f/85nU7/AQAAAP9J7+/vLz/96+vrazKZzD/n8/nZbrf/PZ/P/wUAAAAAAAAAAIA/0dfXV9Pp9M/n8/lP5+fnPz6fzz+fz+dPp9MPf/8/AAAAAAAAAAAA4I/0+Xz+8fl8/vT5+flX5+fnZ5PJZF5fX1/m8/kBAAAAAAAAAADAX+r3+33+6/P5/Gn/9evrn0wmk4/P55/P5/Mvp9Ppx/v7+wEAAAAAAAAAAEBfLpfL+Xw+n8/n8/n8+fPnz6d/AAAAAAAAAAAAwHfS6/V6vV4vLy8vX6/X2+32r8vl0uv1+vX19eXl5QMAAAAAAAAAAOCLdLvdbrfbfh8/ffr0+fPnPz4/P+/3+wEAAAAAAAAAAEBfLpfLZrOZzWY/Pn/+/Pnz58/Pz8/n85/P5/MBAAAAAAAAAADAN9LpdDqdTu+vX1/n8/n39/f3+/0BAAAAAAAAAADAX+l0Ov3r/Pnzdv/r11d/Pj8/Pz8/Pz8/n8/n8/kBAAAAAAAAAADAN9Lr9Xq9Xq/X6/X7/f739/cDAAAAAAAAAACAv+j3+337P/58/vz58+fPz8/Pz8/Pz8/Pz8/Pz8/n8/kAAAAAAAAAAADgG+l0Or1er38+n8/n8/n39/fPz88/n88/n88/n8/3+/0BAAAAAAAAAADAX+n3+93u97vdfgEAAAAAAAAAAADAT+j3+/39/f339/f7/f4BAAAAAAAAAADAX+h0Ol+v18vlcnk+n283mwEAAAAAAAAAAAD+D/0H2GgQg/437O0AAAAASUVORK5CYII=';
        onSave(fakeSignature);
    };

    return (
        <div>
            <canvas 
                ref={canvasRef} 
                className="border border-gray-400 bg-gray-50 rounded-md w-full h-32"
            >
            </canvas>
            <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-gray-500">Sign in the box above.</p>
                <div>
                    <button type="button" onClick={handleClear} className="text-sm text-brand-blue hover:underline">Clear</button>
                    <button type="button" onClick={handleSave} className="ml-4 text-sm font-medium text-white bg-brand-blue px-3 py-1 rounded-md">Use Signature</button>
                </div>
            </div>
        </div>
    );
};

export default SignaturePad;
