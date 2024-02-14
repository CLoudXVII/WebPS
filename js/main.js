window.onload = function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const uploadBtn = document.getElementById('upload-btn');
    const infoPanel = document.getElementById('info-panel');
    
    let imgData = null;

    function updateInfoPanel(x, y) {
        const pixel = context.getImageData(x, y, 1, 1).data;
        const rgb = `RGB: ${pixel[0]}, ${pixel[1]}, ${pixel[2]}`;
        const coordinates = `Координаты: ${x}, ${y}`;
        const imageDimensions = `Размеры изображения: ${canvas.width} x ${canvas.height} пикселей`;
        infoPanel.innerHTML = `${rgb}<br>${coordinates}<br>${imageDimensions}`;
    }

    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(e.clientX - rect.left);
        const y = Math.floor(e.clientY - rect.top);
        updateInfoPanel(x, y);
    });

    uploadBtn.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            }
            img.src = event.target.result;
        }
        
        reader.readAsDataURL(file);
    });
};