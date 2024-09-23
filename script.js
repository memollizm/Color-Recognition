function uploadImage() {
    const input = document.getElementById('upload');
    const status = document.getElementById('upload-status');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            status.innerHTML = '';
            status.appendChild(img);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// Renk değişimi animasyonu
function syncButtonWithAnimation() {
    const colorAnimation = document.querySelector('.animation-content');
    const uploadButton = document.querySelector('.custom-upload-button');

    setInterval(() => {
        const computedStyle = getComputedStyle(colorAnimation);
        const bgColor = computedStyle.backgroundImage;
        uploadButton.style.backgroundImage = bgColor;
    }, 100);
}

// İmleç animasyonunu başlatma
function initCursorAnimation() {
    const colorFrame = document.getElementById('color-frame');
    const cursorEffect = document.getElementById('cursor-effect');

    // Fare hareketini izleme
    colorFrame.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        createStar(x, y);
    });

    // Fare çerçeveden çıkınca animasyonu gizleme
    colorFrame.addEventListener('mouseleave', () => {
        cursorEffect.style.opacity = '0';
    });
}

// Yıldız animasyonunu oluşturma
function createStar(x, y) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 1000); // Yıldızın kaybolma süresi
}

// Sayfa yüklendiğinde animasyonları başlat
window.onload = () => {
    initCursorAnimation();
    syncButtonWithAnimation();
};


// Renkler sayfasına yönlendirme fonksiyonu
function navigateToColors() {
    window.location.href = 'renkler.html';
}

// Dark mode'u açıp kapatma fonksiyonu
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    // Dark mode buton simgesini değiştir
    const darkModeButton = document.querySelector('.dark-mode-button');
    if (document.body.classList.contains('dark-mode')) {
        darkModeButton.textContent = '☀️'; // Gündüz modu simgesi
    } else {
        darkModeButton.textContent = '🌙'; // Gece modu simgesi
    }
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        // Eğer kart zaten açıksa, onu kapat
        if (card.classList.contains('flipped')) {
            card.classList.remove('flipped');
            return;
        }
        
        // Eğer başka bir açık kart varsa onu kapat
        document.querySelectorAll('.card.flipped').forEach(openCard => {
            openCard.classList.remove('flipped');
        });
        
        // Tıklanan kartı aç
        card.classList.add('flipped');
    });
});


