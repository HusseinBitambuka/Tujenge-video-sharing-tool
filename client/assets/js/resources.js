document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const resourceGrid = document.getElementById('resourceGrid');
    const uploadBtn = document.getElementById('uploadBtn');
    const modal = document.getElementById('uploadModal');
    const closeBtn = document.querySelector('.close');
    const uploadForm = document.getElementById('uploadForm');
    const typeSelect = document.getElementById('type');
    const fileInput = document.getElementById('fileInput');
    const urlInput = document.getElementById('urlInput');

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

    // Toggle between file and URL input based on resource type
    typeSelect.addEventListener('change', () => {
        if (typeSelect.value === 'pdf') {
            fileInput.style.display = 'block';
            urlInput.style.display = 'none';
        } else {
            fileInput.style.display = 'none';
            urlInput.style.display = 'block';
        }
    });

    // Fetch and display resources
    const fetchResources = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/resources', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const resources = await response.json();
            
            resourceGrid.innerHTML = resources.map(resource => `
                <div class="resource-card">
                    <span class="resource-type ${resource.type}">
                        ${resource.type.toUpperCase()}
                    </span>
                    <h3 class="resource-title">${resource.title}</h3>
                    <p class="resource-description">${resource.description}</p>
                    <div class="resource-actions">
                        ${resource.type === 'pdf' 
                            ? `<button class="resource-button download-btn" 
                                onclick="window.open('${resource.url}', '_blank')">
                                Download PDF
                               </button>`
                            : `<button class="resource-button open-btn" 
                                onclick="window.open('${resource.url}', '_blank')">
                                Open Link
                               </button>`
                        }
                        <button class="resource-button delete-btn admin-only" 
                            onclick="deleteResource('${resource.id}')">
                            Delete
                        </button>
                    </div>
                </div>
            `).join('');

            // Show delete buttons for admin
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.role === 'admin') {
                document.querySelectorAll('.admin-only').forEach(el => {
                    el.style.display = 'block';
                });
            }
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    };

    // Upload resource
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', document.getElementById('title').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('type', typeSelect.value);

        if (typeSelect.value === 'pdf') {
            formData.append('file', document.getElementById('file').files[0]);
        } else {
            formData.append('url', document.getElementById('url').value);
        }

        try {
            const response = await fetch('http://localhost:3000/api/resources/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                modal.style.display = 'none';
                uploadForm.reset();
                fetchResources();
            } else {
                const error = await response.json();
                alert(error.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Error uploading resource:', error);
            alert('Upload failed');
        }
    });

    // Delete resource
    window.deleteResource = async (id) => {
        if (confirm('Are you sure you want to delete this resource?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/resources/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    fetchResources();
                } else {
                    const error = await response.json();
                    alert(error.message || 'Delete failed');
                }
            } catch (error) {
                console.error('Error deleting resource:', error);
                alert('Delete failed');
            }
        }
    };

    // Modal controls
    uploadBtn.onclick = () => modal.style.display = 'block';
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });

    // Initialize
    checkAdmin();
    fetchResources();
});