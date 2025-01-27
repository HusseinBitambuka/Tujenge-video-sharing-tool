document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const videoGrid = document.getElementById('videoGrid');
    const uploadBtn = document.getElementById('uploadBtn');
    const modal = document.getElementById('uploadModal');
    const closeBtn = document.querySelector('.close');
    const uploadForm = document.getElementById('uploadForm');

    // Check if user is admin
    const checkAdmin = () => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.role === 'admin') {
                uploadBtn.style.display = 'block';
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
        }
    };

    // Fetch and display videos
    const fetchVideos = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/videos', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const videos = await response.json();
            
            videoGrid.innerHTML = videos.map(video => `
                <div class="video-card">
                    <video class="video-thumbnail" src="${video.url}" controls></video>
                    <div class="video-info">
                        <h3 class="video-title">${video.title}</h3>
                        <p class="video-description">${video.description}</p>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    // Upload video
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', document.getElementById('title').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('video', document.getElementById('video').files[0]);

        try {
            const response = await fetch('http://localhost:3000/api/videos/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                modal.style.display = 'none';
                uploadForm.reset();
                fetchVideos();
            } else {
                const error = await response.json();
                alert(error.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Upload failed');
        }
    });

    // Modal controls
    uploadBtn.onclick = () => modal.style.display = 'block';
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };

    // Initialize
    checkAdmin();
    fetchVideos();
});