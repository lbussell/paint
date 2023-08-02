
interface Position { x: number, y: number }

// interface Size { height: number, width: number }

// interface PaintCanvas { }

// interface PaintCanvasOptions { }


export const setupPaintCanvas = (/* options: PaintCanvasOptions */) => {

    const canvas = (document.getElementById("canvas") as HTMLCanvasElement)!;
    if (canvas == null) {
        throw new Error('Element with id "canvas" was not found.')
    }

    const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
    if (context == null) {
        throw new Error('Element with id "canvas" did not have a 2d rendering context.')
    }

    var pos: Position = { x: 0, y: 0 };

    const setPosition = (e: MouseEvent) => {
        pos.x = e.clientX;
        pos.y = e.clientY;
    }

    const resize = () => {
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
    }

    const draw = (e: MouseEvent) => {
        // mouse left button must be pressed
        if (e.buttons !== 1) return;

        context.beginPath(); // begin

        context.lineWidth = 3;
        context.lineCap = 'round';
        context.strokeStyle = '#c0392b';

        context.moveTo(pos.x, pos.y); // from
        setPosition(e);
        context.lineTo(pos.x, pos.y); // to

        context.stroke(); // draw it!
    }

    // Set the canvas to exactly the window size to start with.
    resize();

    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', draw);
    document.addEventListener('mousedown', setPosition);
    document.addEventListener('mouseenter', setPosition);
}