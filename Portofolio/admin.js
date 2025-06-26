document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.admin-section');

    // Menampilkan section pertama saat halaman dimuat
    const firstSectionId = navLinks[0].getAttribute('href').substring(1);
    document.getElementById(firstSectionId).classList.add('active');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Jangan lakukan apa-apa untuk tombol logout
            if (this.id === 'logout') return;

            // Hapus kelas active dari semua link dan section
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Tambah kelas active ke link yang diklik dan section yang sesuai
            this.classList.add('active');
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Simulasi logout
    document.getElementById('logout').addEventListener('click', function(e){
        e.preventDefault();
        alert('Anda telah logout!');
        // Idealnya, ini akan mengarahkan kembali ke halaman login
        window.location.href = 'admin-login.html';
    });
});